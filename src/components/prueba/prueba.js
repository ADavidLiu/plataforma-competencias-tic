import React, { Component } from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import SweetScroll from "sweet-scroll";

import moment from "moment";

import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import LinearProgress from '@material-ui/core/LinearProgress';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';

import Save from "@material-ui/icons/Save";

import preguntasPrueba from "../../models/preguntasPrueba";
import shuffleArray from "../../utils/shuffleArray";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmacionSalir from "../modales/confirmacionSalir";

class Prueba extends Component {
    constructor() {
        super();

        this.scroller = new SweetScroll();
        
        this.state = {
            tipoUsuario: "",
            isPruebaIniciada: false,
            isPruebaTerminada: false,
            progreso: 0,
            seccionActual: 0,
            preguntas: preguntasPrueba,
            preguntasDivididas: [],
            respuestas: [],
            revision: {},
            totalPreguntas: preguntasPrueba.length,
            preguntasRespondidas: 0,
            isRespondidoCompleto: false,
            tiempoDisponible: 5400 * 1000,
            tiempoRestante: "calculando...",
            shouldRedirect: false,
        }

        this.countdown = "";
        this.tiempoLimite = "";

        this.domPreguntas = [];
        this.domRadios = [];

        /* Para hacer las preguntas y el orden random */
        this.dividedQuestions = [];
        this.shuffledQuestions = shuffleArray(this.state.preguntas);
        this.codigosDescriptores = [];
        this.selectedQuestions = [];
        this.finalQuestions = [];
        this.finalJSXquestions = [];
    }

    componentDidMount = () => {
        let infoCargada = {};
        if (this.props.location && this.props.location.state !== undefined) {
            infoCargada = {
                tipoUsuario: this.props.location.state.tipoUsuario
            }
        } else {
            infoCargada = {
                tipoUsuario: ""
            }
        }

        /* Se obtienen los códigos de los descriptores */
        this.shuffledQuestions.forEach(question => {
            this.codigosDescriptores.push(question.codigoDescriptor);
        });
        /* Se eliminan duplicados */
        this.codigosDescriptores = [...new Set(this.codigosDescriptores)];

        /* Se agrupan todas las preguntas por descriptor en un array por cada uno */
        this.codigosDescriptores.forEach(codigo => {
            const codigoArray = this.shuffledQuestions.filter(question => question.codigoDescriptor === codigo);
            this.finalQuestions.push(codigoArray);
        });
        
        /* Se selecciona una pregunta random de cada descriptor */
        this.finalQuestions.forEach(questionsArray => {
            if (questionsArray.length > 1) {
                const randomIndex = Math.floor(Math.random() * Math.floor(questionsArray.length));
                questionsArray.splice(randomIndex, 1);
                const selectedQuestion = questionsArray.pop();
                this.selectedQuestions.push(selectedQuestion);   
            }
        });

        /* Se copian las preguntas seleccionadas al arreglo de preguntas finales */
        this.finalQuestions = [...this.selectedQuestions];
        for (let i = 0; i < this.finalQuestions.length; i+=4) {
            this.dividedQuestions.push(this.finalQuestions.slice(i, i+4));
        }

        /* Se renderizan las preguntas de cada sección */
        this.dividedQuestions.forEach((section, i) => {
            this.finalJSXquestions[i] = [];
            this.state.respuestas[i] = [];

            section.forEach((question, j) => {
                this.state.respuestas[i][j] = {
                    id: question.id,
                    respuestaSeleccionada: ""
                };

                this.finalJSXquestions[i].push(
                    <React.Fragment key={question.id}>
                        <Typography variant="body1" className="mb-4"><strong>{question.enunciado}</strong></Typography>
                        <FormControl component="fieldset" className="mb-4">
                            <RadioGroup
                                ref={elem => { this.domPreguntas.push(elem); }}
                                aria-label="Respuesta Seleccionada"
                                name={`respuestaSeleccionada-${question.codigoDescriptor}-${question.id}-${i}-${j}`}
                                onChange={this.actualizarRespuestas}
                            >
                                {shuffleArray(question.opciones).map((opcion, k) => {
                                    return <FormControlLabel
                                        ref={elem => { this.domRadios.push(elem); }}
                                        key={k}
                                        value={opcion}
                                        control={<Radio color="primary" />}
                                        label={opcion}
                                    />;
                                })}
                            </RadioGroup>
                        </FormControl>
                        <hr className="mb-5"/>
                    </React.Fragment>
                );
            });
        });

        this.setState({
            tipoUsuario: infoCargada.tipoUsuario,
            preguntasDivididas: this.finalJSXquestions,
            progreso: 100/this.dividedQuestions.length,
            totalPreguntas: this.finalQuestions.length
        });
    }

    componentWillUnmount() {
        clearTimeout(this.tiempoLimite);
        clearInterval(this.countdown);
    }

    actualizarRespuestas = e => {
        e.target.parentNode.firstChild.lastChild.style.transform = "none";
        const domNode = e.target.parentNode.parentNode.parentNode.parentNode;
        const labels = domNode.childNodes;
        labels.forEach(label => {
            const labelInputChecked = label.querySelector(".Mui-checked");
            if (labelInputChecked !== null) {
                labelInputChecked.classList.remove("Mui-checked");
                labelInputChecked.firstChild.firstChild.lastChild.style.transform = "scale(0)";
            }
        });

        const copiaRespuestas = [...this.state.respuestas];
        const respondidas = this.state.preguntasRespondidas;
        const i = e.target.name.split("-")[3];
        const j = e.target.name.split("-")[4];

        const preguntaRespondida = {
            id: e.target.name.split("-")[2],
            respuestaSeleccionada: e.target.value
        };

        this.state.respuestas.forEach(seccionRespuestas => {
            let encontrado = seccionRespuestas.find(respuesta => respuesta.id === preguntaRespondida.id);

            if (encontrado) {
                copiaRespuestas[i][j] = preguntaRespondida;
                this.setState({
                    respuestas: copiaRespuestas
                });

                if (encontrado.respuestaSeleccionada === "") {
                    this.setState({
                        preguntasRespondidas: respondidas + 1
                    });

                    if (respondidas + 1 === this.state.totalPreguntas) {
                        this.setState({
                            isRespondidoCompleto: true
                        });
                    }
                }
            }
        });
    }

    revisarRespuestas = e => {
        if (e) {
            e.preventDefault();
            this.setState({
                ...this.state,
                isPruebaTerminada: true
            });
        }
        
        const revision = {
            numCorrectas: 0,
            numIncorrectas: 0,
            correctas: [],
            incorrectas: []
        }

        this.state.respuestas.forEach(preguntasSeccion => {
            preguntasSeccion.forEach(pregunta => {
                const encontrada = this.state.preguntas.find(preguntaCuestionario => pregunta.id === preguntaCuestionario.id);
                const preguntaRevisada = {
                    id: encontrada.id,
                    codigoDescriptor: encontrada.codigoDescriptor
                };
                
                if (encontrada.respuesta === pregunta.respuestaSeleccionada) {
                    revision.numCorrectas++;
                    revision.correctas.push(preguntaRevisada);
                } else {
                    revision.numIncorrectas++;
                    revision.incorrectas.push(preguntaRevisada);
                }
            });
        });

        this.setState({
            ...this.state,
            isPruebaTerminada: true,
            revision: revision
        });

        console.log(revision);
        /* Enviar al backend aquí! */

    }

    iniciarPrueba = () => {
        this.setState({
            ...this.state,
            isPruebaIniciada: true
        });

        let duracion = this.state.tiempoDisponible;

        this.countdown = setInterval(() => {
            const tempTime = moment.duration(duracion);
            const nuevoTiempoRestante = `${tempTime.hours()}:${tempTime.minutes()}:${tempTime.seconds()}`;

            this.setState({
                tiempoRestante: nuevoTiempoRestante
            });

            duracion -= 1000;
        }, 1000);

        this.tiempoLimite = setTimeout(() => {
            this.revisarRespuestas();
            this.setState({
                ...this.state,
                isPruebaTerminada: true
            });
            clearTimeout(this.tiempoLimite);
            clearInterval(this.countdown);
        }, this.state.tiempoDisponible);
    }

    terminarPrueba = () => {
        this.scroller.to("#top");
        this.setState({
            shouldRedirect: true
        });
    }

    cambiarSeccion = direccion => {
        this.domPreguntas = [];
        this.domRadios = [];
        let nuevaSeccionActual;
        let nuevoProgreso;
        let seccionActual = this.state.seccionActual;
        let siguienteSeccion = seccionActual + 1;
        let anteriorSeccion = seccionActual - 1;
        if (anteriorSeccion < 0) {
            anteriorSeccion = 0;
        }

        if (direccion === "SIGUIENTE") {
            nuevaSeccionActual = seccionActual += 1;
            nuevoProgreso = (100/this.state.preguntasDivididas.length) * (siguienteSeccion + 1);
        } else {
            nuevaSeccionActual = seccionActual -= 1;
            nuevoProgreso = (100/this.state.preguntasDivididas.length) * (anteriorSeccion + 1);
        }

        this.setState({
            seccionActual: nuevaSeccionActual,
            progreso: nuevoProgreso
        });

        this.scroller.to("#top");

        const timeout = setTimeout(() => {
            const seccionRespuestasSeleccionadas = [...this.state.respuestas[this.state.seccionActual]];
            this.domPreguntas = this.domPreguntas.filter(pregunta => pregunta !== null);
            this.domRadios = this.domRadios.filter(radio => radio !== null);
            
            const radiosArray = [];
            for (let i = 0; i < this.domRadios.length; i+=4) {
                radiosArray.push(this.domRadios.slice(i, i+4));
            }
            /* console.log(seccionRespuestasSeleccionadas);
            console.log(radiosArray); */
            radiosArray.forEach((labels, i) => {
                labels.forEach((label, j) => {
                    const respuestaLabel = label.lastChild.textContent;
                    if (seccionRespuestasSeleccionadas[i].respuestaSeleccionada !== "" && seccionRespuestasSeleccionadas[i].respuestaSeleccionada === respuestaLabel) {
                        label.firstChild.classList.add("Mui-checked")
                        label.firstChild.firstChild.firstChild.lastChild.style.transform = "none";
                    }
                });
            });

            clearTimeout(timeout);
        }, 500);
    }

    pausarPrueba = () => {
        /* Conectarse al backend para guardar el estado de la prueba */
        console.log("Prueba guardada!");
        this.scroller.to("#top");
        this.setState({
            shouldRedirect: true
        });
    }

    render() {
        if ((this.props.location && this.props.location.state === undefined) || this.state.shouldRedirect) {
            return <Redirect to="/" />
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("procesoPaso.1")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <NavigationPrompt when={!this.state.isPruebaTerminada}>
                                {
                                    ({ onConfirm, onCancel }) => (
                                        <ConfirmacionSalir guardar onConfirm={onConfirm} onCancel={onCancel}/>
                                    )
                                }
                            </NavigationPrompt>
                            <Grid container justify="center" className="pb-5">
                                <Grid item xs={12} sm={10} md={8}>
                                    <form>
                                        {!this.state.isPruebaIniciada ? (
                                            <React.Fragment>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5" className="mb-5 text-center">{t("prueba.titulo")}</Typography>
                                                    <Typography variant="h6" className="mb-2">{t("prueba.label-introduccion")}</Typography>
                                                    <Typography variant="body1" className="mb-4">{t("prueba.introduccion")}</Typography>
                                                    <Typography variant="h6" className="mb-2">{t("prueba.label-instrucciones")}</Typography>
                                                    <Typography variant="body1">{t("prueba.instrucciones")}</Typography>
                                                </Grid>
                                                <Grid item xs={12} className="mt-5">
                                                    <Button
                                                        type="button"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className="mt-2"
                                                        size="large"
                                                        onClick={this.iniciarPrueba}
                                                    >
                                                        {t("prueba.btn-iniciar")}
                                                    </Button>
                                                </Grid>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5" className="text-center">{t("prueba.titulo-cuestionario")}</Typography>
                                                    <LinearProgress variant="determinate" value={this.state.progreso} className="mt-5"/>
                                                    <hr className="my-5" />
                                                    <Paper className="pt-3 pr-3 pl-3 pt-5 pr-5 pl-5">
                                                        { this.state.preguntasDivididas[this.state.seccionActual] }
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={12} className="mb-3 pb-1">
                                                    <Grid container>
                                                        <Grid item xs={6}>
                                                            {
                                                                this.state.seccionActual !== 0 ? <Button type="button" onClick={() => {
                                                                    this.cambiarSeccion("ANTERIOR");
                                                                }} color="primary" variant="contained">{t("visorPerfiles.anteriores")}</Button> : ""
                                                            }
                                                        </Grid>
                                                        <Grid item xs={6} className="text-right">
                                                            {
                                                                this.state.seccionActual !== this.state.preguntasDivididas.length - 1 ? <Button type="button" onClick={() => {
                                                                    this.cambiarSeccion("SIGUIENTE");
                                                                }} color="primary" variant="contained">{t("visorPerfiles.siguientes")}</Button> : ""
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className="mt-2"
                                                        size="large"
                                                        onClick={this.revisarRespuestas}
                                                        disabled={!this.state.isRespondidoCompleto}
                                                    >
                                                        {t("prueba.btn-enviar")}
                                                    </Button>
                                                </Grid>
                                            </React.Fragment>
                                        )}
                                    </form>
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.isPruebaTerminada} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{t("prueba.label-resultados")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {t("prueba.label-ayuda-resultados")}
                                        <br/><br/>
                                        <strong>{t("prueba.label-correctas")}</strong> {this.state.revision.numCorrectas}
                                        <br/>
                                        <strong>{t("prueba.label-correctas")}</strong> {this.state.revision.numIncorrectas}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.terminarPrueba}>{t("prueba.btn-volver-inicio")}</Button>
                                </DialogActions>
                            </Dialog>
                            <Snackbar
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                key="tiempo-restante"
                                open={!this.state.isPruebaTerminada && this.state.isPruebaIniciada}
                                ContentProps={{ 'aria-describedby': 'message-id' }}
                                message={<span>{t("prueba.label-tiempo")} {this.state.tiempoRestante}</span>}
                            />
                            {
                                this.state.isPruebaIniciada ? (
                                    <Tooltip title={t("prueba.pausar")} placement="left">
                                        <Fab color="primary" onClick={this.pausarPrueba} className="prueba-fab fab">
                                            <Save fontSize="small"/>
                                        </Fab>
                                    </Tooltip>
                                ) : ""
                            }
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Prueba;