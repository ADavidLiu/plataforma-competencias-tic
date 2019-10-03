import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmacionSalir from "../modales/confirmacionSalir";

class PreentrevistaRevision extends Component {
    constructor() {
        super();

        this.state = {
            docenteID: "",
            docenteNombre: "",
            docenteImg: "",
            preguntas: [],
            preguntasPreparadas: [],
            calificaciones: [],
            isEnviado: false
        }
    }

    cargarDatos = () => {
        /* Conectarse al backend para traer las preguntas de este docenteID */
        const preguntasCargadas = [
            {
                descriptores: ["E1ub", "E1ue"],
                label: "¿Ha propuesto cambios en otros escenarios educativos como consecuencia del uso de las TIC en su práctica educativa?",
                respuestas: ["Sí"],
                subPregunta: {
                    label: "¿Cuáles? (Máximo 400 caracteres)",
                    respuestas: ["Ex excepteur quis amet fugiat voluptate ut do nostrud aliqua. Amet pariatur nulla sunt adipisicing ut consectetur. Elit commodo enim aliquip irure."]
                }
            },
            {
                descriptores: ["I1ta", "R1tc"],
                label: "¿Ha realizado modificaciones al diseño de la práctica educativa apoyada en TIC que presentó?",
                evidencia: "https://www.google.com",
                respuestas: ["Sí"],
                subPregunta: {
                    label: "¿Para qué ha modificado el diseño de su práctica educativa apoyada en TIC? Puede elegir más de una opción.",
                    respuestas: ["Para facilitar la presentación, almacenamiento, transmisión o intercambio de información.", "Para utilizar herramientas TIC novedosas, estéticas o accesibles."],
                    subPregunta: {
                        label: "Explique (Máximo 400 caracteres)",
                        respuestas: ["Dolor sit consequat magna culpa quis pariatur magna magna eiusmod deserunt eu. Qui quis cillum consectetur nulla elit cupidatat. Consequat aliqua cupidatat irure voluptate. Deserunt officia duis nostrud reprehenderit occaecat id id aliqua non labore.", "Reprehenderit fugiat reprehenderit minim eiusmod consequat. Velit enim Lorem cillum anim deserunt consectetur dolore ipsum id. Aliqua dolore veniam sit dolor eu eiusmod deserunt magna non adipisicing sunt elit dolore. Proident magna amet dolor non do est ea exercitation anim culpa aute."]
                    }
                }
            },
            {
                descriptores: ["E2uc"],
                label: "¿Ha utilizado su práctica educativa en diferentes contextos (grados/niveles - instituciones)?",
                respuestas: ["Sí"],
                subPregunta: {
                    label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                    respuestas: ["Ea incididunt et occaecat laboris. Incididunt exercitation incididunt exercitation amet anim consectetur tempor ullamco nisi enim qui qui occaecat. Veniam dolore minim eiusmod enim nisi in et cillum nulla ad. Qui duis incididunt cupidatat veniam nulla reprehenderit ipsum."]
                }
            }
        ];

        let infoCargada = {};

        if (this.props[0].location.state === undefined) {
            infoCargada = {
                docenteID: "",
                docenteNombre: "",
                imgSrc: ""
            }
        } else {
            infoCargada = {
                docenteID: this.props[0].location.state.docenteID,
                docenteNombre: this.props[0].location.state.docenteNombre,
                imgSrc: this.props[0].location.state.docenteImg
            }
        }

        if (infoCargada.imgSrc === "") {
            infoCargada.imgSrc = "https://via.placeholder.com/500";
        }

        this.setState({
            docenteID: infoCargada.docenteID,
            docenteNombre: infoCargada.docenteNombre,
            docenteImg: infoCargada.imgSrc,
            preguntas: preguntasCargadas
        });

        preguntasCargadas.forEach(pregunta => {
            this.prepararPreguntas(pregunta, []);
        });
    }

    componentDidMount = () => {
        this.cargarDatos();
    }

    enviar = () => {
        if (this.state.calificaciones.length === this.state.preguntas.length) {
            this.setState({
                isEnviado: true
            });
            console.log("Enviado");
        }
    }

    handleChange = (e, index, descriptores) => {
        const nuevasCalificaciones = [...this.state.calificaciones];

        nuevasCalificaciones[index] = {
            descriptores: descriptores,
            calificacion: e.target.value
        }

        this.setState({
            calificaciones: nuevasCalificaciones
        });
    }

    prepararPreguntas = (pregunta, arrayBase) => {
        let preguntaArray = [...arrayBase];

        preguntaArray.push(
            <Translation key={pregunta.label}>
                {
                    t => (
                        <React.Fragment>
                            {
                                pregunta.descriptores ? (
                                    <React.Fragment>
                                        <Typography variant="body1"><strong>{t("revision.descriptores-asociados")}: </strong>{pregunta.descriptores.map((descriptor, i) => {
                                            return <Typography key={i} component="span" className="mr-2">• {descriptor}</Typography>
                                        })}</Typography>
                                        <hr/>
                                    </React.Fragment>
                                ) : ""
                            }
                            <Typography variant="body1"><strong>{t("pregunta")}: </strong>{pregunta.label}</Typography>
                            <Typography variant="body1"><strong>{t("respuestas")}: </strong>{pregunta.respuestas.map((respuesta, i) => {
                                return <Typography key={i} component="span" className="d-block">• {respuesta}</Typography>
                            })}</Typography>
                            <hr/>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
        
        if (pregunta.subPregunta) {
            this.prepararPreguntas(pregunta.subPregunta, preguntaArray);
        } else {
            /* Llegó al nivel final. Detenerse y actualizar el estado. */
            /* this.setState({
                preguntasPreparadas: [
                    ...this.state.preguntasPreparadas,
                    preguntaArray
                ]
            }); */
            this.state.preguntasPreparadas.push(preguntaArray);
        }
    }

    render() {
        if (this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }

        console.log(this.state.calificaciones);

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("titulo.preentrevista-revision")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <NavigationPrompt when={!this.state.isEnviado}>
                                {
                                    ({ onConfirm, onCancel }) => (
                                        <ConfirmacionSalir onConfirm={onConfirm} onCancel={onCancel}/>
                                    )
                                }
                            </NavigationPrompt>
                            <Grid container spacing={5} justify="center">
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <Avatar alt={t("imagen-perfil")} src={this.state.docenteImg} className="mr-3" style={{height: "60px", width: "60px"}} />
                                                <div>
                                                    <Typography variant="h5" className="mb-2">{t("revision.preentrevista-titulo")}</Typography>
                                                    <Typography variant="body1">{t("revision.nombre-evaluado")} <strong>{this.state.docenteNombre}</strong></Typography>
                                                </div>
                                            </div>
                                            <hr className="mb-4" />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} className="mb-4">
                                        <Grid item xs={12} sm={8} md={9} className="mb-5">
                                            <Typography variant="body1" className="mb-3">{t("revision.preentrevista-ayuda-1")}</Typography>
                                            <Typography variant="body1">{t("revision.preentrevista-ayuda-2")}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3}>
                                            <Typography variant="body1" className="mb-2"><strong>{t("revision.calificacion-ayuda")}</strong></Typography>
                                            <Typography variant="body1" className="mb-2"><strong>1: {t("revision.calificacion-nulo-titulo")}</strong> - {t("revision.calificacion-nulo-ayuda")}.</Typography>
                                            <Typography variant="body1" className="mb-2"><strong>2: {t("revision.calificacion-parcial-titulo")}</strong> - {t("revision.calificacion-parcial-ayuda")}.</Typography>
                                            <Typography variant="body1" className="mb-2"><strong>3: {t("revision.calificacion-totalmente-titulo")}</strong> - {t("revision.calificacion-totalmente-ayuda")}.</Typography>
                                            <Typography variant="body1"><strong>4: {t("revision.calificacion-enviar-titulo")}</strong> - {t("revision.calificacion-enviar-ayuda")}.</Typography>
                                        </Grid>
                                    </Grid>
                                    {
                                        this.state.preguntas.map((pregunta, i) => {
                                            return (
                                                <Paper key={i} className="p-4 mb-4">
                                                    <Grid container spacing={5}>
                                                        <Grid item xs={12} sm={8} md={9}>
                                                            {this.state.preguntasPreparadas[i]}
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} md={3} className="d-md-flex flex-column">
                                                            <div className="order-md-2 mt-md-4">
                                                                {
                                                                    pregunta.evidencia ? (
                                                                        <a href={pregunta.evidencia}>
                                                                            <Button color="primary" variant="contained"
                                                                            fullWidth>{t("revision.descargar-evidencia")}</Button>
                                                                        </a>
                                                                    ) : ""
                                                                }
                                                            </div>
                                                            <div className="order-md-1">
                                                                <Typography variant="body1" className="mb-3"><strong>{t("calificacion")}</strong></Typography>
                                                                <FormControl variant="outlined" className="w-100">
                                                                    <InputLabel htmlFor={`calificacion-${i}`}>{t("revision.seleccione-valor")}</InputLabel>
                                                                    <Select
                                                                        required
                                                                        value={
                                                                            this.state.calificaciones[i] ? (
                                                                                this.state.calificaciones[i].calificacion
                                                                            ) : ""
                                                                        }
                                                                        onChange={e => { this.handleChange(e, i, pregunta.descriptores); }}
                                                                        input={<OutlinedInput name={`calificaciones-${i}`} id="calificacion"/>}
                                                                    >
                                                                        <MenuItem value={1}>1</MenuItem>
                                                                        <MenuItem value={2}>2</MenuItem>
                                                                        <MenuItem value={3}>3</MenuItem>
                                                                        <MenuItem value={4}>4</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            );
                                        })
                                    }
                                    <Button variant="contained" color="primary" size="large" fullWidth onClick={this.enviar}>{t("enviar")}</Button>
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.isEnviado}>
                                <DialogTitle>{t("revision.enviada")}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>{t("revision.enviada-ayuda")}</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Link to="/" style={{textDecoration: "none"}}>
                                        <Button color="primary">{t("volver-inicio")}</Button>
                                    </Link>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default PreentrevistaRevision;