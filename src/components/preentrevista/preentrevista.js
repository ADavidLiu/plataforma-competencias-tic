import React, { Component } from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import { Redirect, Link } from "react-router-dom";

import preguntas from "../../models/preentrevista-new";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from "@material-ui/core/Paper";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmacionSalir from "../modales/confirmacionSalir";

class Preentrevista extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            tipoUsuario: "",
            respuestas: [],
            preguntas: preguntas,
            preguntasVisibles: [],
            visibilityClasses: [],
            isCompletado: false,
            isEnviado: false
        }

        this.preguntasRoot = preguntas.filter(pregunta => pregunta.typeOfLevel === "ROOT");

        this.parentLabel = "";
        this.subniveles = [];
        this.arrayPreguntas = [];
        this.preguntasDivs = [];
    }

    componentDidMount = () => {
        /* Conectarse al backend para traer el JSON de las preguntas */
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

        this.setState({
            tipoUsuario: infoCargada.tipoUsuario,
            respuestas: new Array(this.state.preguntas.length)
        });
        
        this.crearCuestionario();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.respuestas !== this.state.respuestas) {
            const respondidas = this.state.respuestas.filter(respuesta => respuesta !== null && respuesta !== undefined);
            let newState = false;
            if (respondidas.length === this.preguntasRoot.length) {
                newState = true;
            }
            this.setState({
                isCompletado: newState
            });
        }
    }

    handlePreguntaChange = (e, preguntaID, groupID, subgroupID, typeOfLevel, triggerID, index) => {
        const selectedOptionID = `${preguntaID}.${e.target.value}`;
        const newRespuestas = [...this.state.respuestas];     
        const evento = e.target;

        /* console.log(selectedOptionID); */

        const newPreguntasVisibles = [...this.state.preguntasVisibles];
        const newVisibilityClasses = [...this.state.visibilityClasses];
        const indicesMostrados = [];

        /* Seleccionar las preguntas correctas */
        newPreguntasVisibles.forEach(pregunta => {
            if (pregunta.props.triggerid === selectedOptionID) {
                indicesMostrados.push(pregunta.props.index);
            }
        });

        this.setState({
            preguntasVisibles: newPreguntasVisibles,
            visibilityClasses: newVisibilityClasses
        });

        const timeout = setTimeout(() => {
            let condicion = false;

            /* Para asignar el valor seleccionado. */
            switch (evento.type) {
                case "radio":
                    condicion = evento.value === "0";
                    if (evento.value === "0") {
                        newRespuestas[index] = {
                            group: groupID,
                            subgroup: subgroupID,
                            value: "Sí"
                        };
                    } else {
                        newRespuestas[index] = {
                            group: groupID,
                            subgroup: subgroupID,
                            value: "No"
                        };
                    }
                    break;
                case "checkbox":
                    condicion = evento.checked;
                    
                    /* Para posicionar el textarea debajo del checkbox seleccionado. Tiene que hacerse manipulando el DOM debido al formato del JSON. */
                    evento.parentNode.parentNode.parentNode.parentNode.insertBefore(this.preguntasDivs[indicesMostrados[0]], evento.parentNode.parentNode.parentNode.nextSibling);

                    /* Para determinar los valores seleccionados y asignarlos al arreglo de respuestas. */
                    if (condicion) {
                        let checkboxes = evento.parentNode.parentNode.parentNode.parentNode.querySelectorAll("input[type='checkbox']");
                        const selected = new Array(checkboxes.length);
                        checkboxes = checkboxes.forEach((input, i) => {
                            if (input.checked) {
                                selected[i] = input.name;
                            }
                        });
                        newRespuestas[index] = {
                            group: groupID,
                            subgroup: subgroupID,
                            value: selected
                        };
                    } else {
                        /* Eliminarlo si se deselecciona */
                        newRespuestas[index].value.splice(evento.value, 1, null);

                        /* Si el arreglo de valores en esta posición quedó vacío, elimine toda la posición e inserte null en el arreglo general de respuestas */
                        let isNull = true;
                        newRespuestas[index].value.forEach(respuesta => {
                            if (respuesta !== null) {
                                isNull = false;
                            }
                        });
                        if (isNull) {
                            newRespuestas.splice(index, 1, null);
                        }
                    }
                    break;
                case "textarea":
                case "input":
                    condicion = true;
                    newRespuestas[index] = {
                        group: groupID,
                        subgroup: subgroupID,
                        value: evento.value
                    };
                    break;
                default:
                    break;
            }

            this.setState({
                respuestas: newRespuestas
            });

            /* Para mostrar/ocultar y reiniciar/eliminar los valores deseleccionados. */
            if (condicion) {
                /* Mostrar */
                indicesMostrados.forEach(indice => {
                    this.preguntasDivs[indice].classList.remove("d-none");
                });
            } else {
                /* Ocultar, y reiniciar estado sólo con lo que queda visible */
                this.preguntasDivs.forEach(preguntaDiv => {
                    /* console.log(preguntaDiv); */
                    const newRespuestas = [...this.state.respuestas];

                    /* Reiniciar sólo los campos correspondientes */
                    if (preguntaDiv.getAttribute("index") === index.toString()) {
                        const selectedGroupID = preguntaDiv.getAttribute("group");
                        const selectedDivs = [];
    
                        /* Determinar el nuevo estado a partir de lo que se haya ocultado y qué quede visible */
                        switch (evento.type) {
                            case "radio":
                                /* Puede ser el ROOT o un elemento MIDDLE */
                                if (preguntaDiv.getAttribute("typeoflevel") === "ROOT") {
                                    /* Es el ROOT. Debe reiniciar todo lo que haya en el grupo */

                                    /* Empezar ocultando visualmente los campos de niveles inferiores */
                                    this.preguntasDivs.forEach(div => {
                                        if (div.getAttribute("group") === selectedGroupID) {
                                            if (div.getAttribute("typeoflevel") !== "ROOT") {
                                                div.classList.add("d-none");
                                                selectedDivs.push(div);
                                            }
                                        }
                                    });

                                    /* Para ajustar el estado */
                                    if (preguntaDiv.getAttribute("group") === groupID) {
                                        const paraEliminarDelEstado = [];
                                        newRespuestas.forEach((respuesta, i) => {
                                            if (respuesta !== undefined && respuesta !== null && respuesta.group === groupID && respuesta.value.length > 0) {
                                                paraEliminarDelEstado.push(newRespuestas[i]);
                                            }
                                        });

                                        paraEliminarDelEstado.forEach((respuesta, i) => {
                                            /* Eliminar todo el grupo, excepto el primer elemento (ROOT) */
                                            if (i !== 0) {
                                                console.log("Eliminar esto... ", respuesta);
                                                const indexParaEliminar = this.state.respuestas.findIndex(respuestaEnArray => respuestaEnArray === respuesta);
                                                newRespuestas[indexParaEliminar] = null;
                                            }
                                        });
        
                                        /* Reinicio visual de los input values y checkboxes */
                                        const textareas = [];
                                        const checkboxes = [];

                                        selectedDivs.forEach(div => {
                                            const foundTextareas = div.querySelectorAll("textarea");
                                            const foundCheckboxes = div.querySelectorAll(".preentrevista-checkbox input[type='checkbox']");
                                            textareas.push(foundTextareas);
                                            checkboxes.push(foundCheckboxes);
                                        });

                                        if (textareas[0].length > 0) {
                                            textareas[0].forEach(textarea => {
                                                textarea.value = "";
                                            });
                                        }
                                        if (checkboxes[0].length > 0) {
                                            checkboxes[0].forEach(checkbox => {
                                                checkbox.checked = false;
                                                checkbox.classList.remove("Mui-checked");
                                            });
                                        }
                                    }
                                } else {
                                    /* Es MIDDLE. Sólo deben reiniciar los niveles inferiores a él */
                                    const subgroupID = preguntaDiv.getAttribute("subgroupid");

                                    if (subgroupID !== "") {
                                        const preguntasDivsEncontrados = this.preguntasDivs.filter(div => div.getAttribute("subgroupid") === subgroupID);

                                        /* Empezar ocultando visualmente los campos de niveles inferiores */
                                        preguntasDivsEncontrados.forEach((div, i) => {
                                            if (i !== 0) {
                                                div.classList.add("d-none");
                                            }
                                        });

                                        /* Reinicio del estado */
                                        const paraEliminarDelEstado = [];
                                        newRespuestas.forEach((respuesta, i) => {
                                            if (respuesta !== undefined && respuesta !== null && respuesta.subgroup === subgroupID && respuesta.value.length > 0) {
                                                paraEliminarDelEstado.push(newRespuestas[i]);
                                            }
                                        });

                                        paraEliminarDelEstado.forEach((respuesta, i) => {
                                            /* Eliminar todo el grupo, excepto el primer elemento (ROOT) */
                                            if (i !== 0) {
                                                console.log("Eliminar esto... ", respuesta);
                                                const indexParaEliminar = this.state.respuestas.findIndex(respuestaEnArray => respuestaEnArray === respuesta);
                                                newRespuestas[indexParaEliminar] = null;
                                            }
                                        });

                                        /* Reinicio visual de inputs */
                                        let textareas = [];
                                        let checkboxes = [];

                                        preguntasDivsEncontrados.forEach(divEncontrado => {
                                            textareas.push(divEncontrado.querySelectorAll("textarea"));
                                            checkboxes.push(divEncontrado.querySelectorAll(".preentrevista-checkbox input[type='checkbox']"));
                                        });

                                        textareas = textareas.filter(nodelist => nodelist.length > 0);
                                        checkboxes = checkboxes.filter(nodelist => nodelist.length > 0);

                                        textareas.forEach(nodelist => {
                                            nodelist.forEach(textarea => {
                                                textarea.value = "";
                                            });
                                        });

                                        checkboxes.forEach(nodelist => {
                                            nodelist.forEach(checkbox => {
                                                checkbox.checked = false;
                                                checkbox.classList.remove("Mui-checked");
                                            });
                                        });
                                    }
                                }
                                break;
                            case "checkbox":
                                const encontrados = this.state.preguntas.filter(pregunta => pregunta.isTriggeredBy === selectedOptionID);
                                
                                encontrados.forEach(encontrado => {
                                    switch (encontrado.typeOfAnswer) {
                                        case "INPUT":
                                            /* Se remueve del estado */
                                            const preguntasReinicio = this.state.preguntas.filter(pregunta => pregunta.isTriggeredBy === selectedOptionID);
                                            preguntasReinicio.forEach(pregunta => {
                                                newRespuestas[pregunta.id] = null;
                                            });
    
                                            /* Se reinicia el input value */
                                            const preguntaDivEncontrado = this.preguntasDivs.filter(preguntaDiv => preguntaDiv.getAttribute("triggerid") === encontrado.isTriggeredBy);
                                            preguntaDivEncontrado.forEach(div => {
                                                const textarea = div.querySelector("textarea");
                                                textarea.value = "";
                                                textarea.closest(".mb-4").classList.add("d-none");
                                            });
                                            break;
                                        default:
                                            /* Después de un checkbox siempre sigue un INPUT en el JSON */
                                            break;
                                    }
                                });
                                break;
                            case "textarea":
                            case "input":
                            default:
                                /* Estos son siempre los últimos niveles. No se deberían ocultar aún si se dejan vacíos ("") */
                                break;
                        }
    
                        /* Eliminar del array de respuestas */
                        this.setState({
                            respuestas: newRespuestas
                        });
                    }
                });
            }

            clearTimeout(timeout);
        }, 100);
    }

    crearCuestionario = () => {
        const newVisibilityClasses = [...this.state.visibilityClasses];
        const tempArray = [];

        this.state.preguntas.forEach((pregunta, i) => {
            let opcionesRespuesta = "";
            let triggeredBy;

            if (pregunta.isTriggeredBy) {
                triggeredBy = pregunta.isTriggeredBy;
            }

            switch (pregunta.typeOfAnswer) {
                case "RADIO":
                    opcionesRespuesta = <RadioGroup
                        className="mt-2"
                        name={pregunta.label}
                        value={this.state.respuestas[i]}
                        onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.group, pregunta.subgroup, pregunta.typeOfLevel, pregunta.isTriggerFor, i)}
                    >
                        <FormControlLabel
                            key="Sí"
                            value="0"
                            control={<Radio required={pregunta.typeOfLevel === "ROOT" ? true : false} name={pregunta.label} color="primary" />}
                            label="Sí"
                        />
                        <FormControlLabel
                            key="No"
                            value="1"
                            control={<Radio required={pregunta.typeOfLevel === "ROOT" ? true : false} name={pregunta.label} color="primary" />}
                            label="No"
                        />
                    </RadioGroup>
                    break;
                case "CHECKBOX":
                    const opciones = [];
                    pregunta.options.forEach((option, j) => {
                        opciones.push(
                            <FormControlLabel
                                className="preentrevista-checkbox"
                                key={option}
                                istriggeredby={triggeredBy}
                                control={<Checkbox onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.group, pregunta.subgroup, pregunta.typeOfLevel, triggeredBy, i)} color="primary" 
                                value={j} name={option} />}
                                label={option}
                            />
                        );
                    });
                    opcionesRespuesta = opciones;
                    break;
                case "INPUT":
                    opcionesRespuesta = (
                        <Translation>
                            {
                                t => (
                                    <TextField
                                        key={pregunta.label}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        multiline
                                        inputProps={{
                                            maxLength: 400,
                                            "aria-label": `${t("aria.escriba-respuesta")}`
                                        }}
                                        rows="5"
                                        label="Escriba su respuesta..."
                                        name={pregunta.label}
                                        onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.group, pregunta.subgroup, pregunta.typeOfLevel, triggeredBy, i)}
                                    />
                                )
                            }
                        </Translation>
                    );
                    break;
                default:
                    break;
            }

            newVisibilityClasses[i] = "mb-4";

            if (pregunta.typeOfLevel !== "ROOT") {
                newVisibilityClasses[i] = "mb-4 d-none";
            }

            this.setState({
                visibilityClasses: newVisibilityClasses
            });

            /* Pequeño delay para alcanzar a que las clases de visibilidad se inicialicen */
            const timeout = setTimeout(() => {
                const newPregunta = (
                    <Paper
                        key={i}
                        index={pregunta.id}
                        group={pregunta.group}
                        subgroupid={pregunta.subgroup ? pregunta.subgroup : ""}
                        typeofanswer={pregunta.typeOfAnswer}
                        typeoflevel={pregunta.typeOfLevel}
                        triggerid={!triggeredBy ? pregunta.isTriggerFor : triggeredBy}
                        className={this.state.visibilityClasses[i] + " p-4"}
                        ref={elem => { this.preguntasDivs.push(elem); }}
                    >
                        <Typography variant="body1"><strong>{pregunta.label}</strong></Typography>
                        {opcionesRespuesta}
                    </Paper>
                );
                tempArray.push(newPregunta);

                clearTimeout(timeout);
            }, 100);
        });

        const timeout2 = setTimeout(() => {
            this.setState({
                isLoading: false,
                preguntasVisibles: [...tempArray]
            });
            clearTimeout(timeout2);
        }, 200);
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log("Enviar al backend");

        this.setState({
            isEnviado: true
        });
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Grid container justify="center">
                                <Helmet>
                                    <title>{`${t("procesoPaso.3")} | ${this.props.userProfile.nombre}`}</title>
                                </Helmet>
                                <NavigationPrompt when={!this.state.isEnviado}>
                                    {
                                        ({ onConfirm, onCancel }) => (
                                            <ConfirmacionSalir onConfirm={onConfirm} onCancel={onCancel}/>
                                        )
                                    }
                                </NavigationPrompt>
                                <Grid item xs={12} md={8}>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="mb-5">
                                            <Typography component="h1" variant="h5" className="mb-5 text-center">{t("preentrevista.titulo")}</Typography>
                                            <Typography variant="body1" className="mb-3">{t("preentrevista.ayuda")}</Typography>
                                        </div>
                                        {
                                            this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto" /> : (
                                                <div className="preentrevista-preguntas">
                                                    {this.state.preguntasVisibles}
                                                    <Button type="submit" fullWidth className="mt-3" color="primary" variant="contained" size="large" disabled={!this.state.isCompletado}>{t("enviar")}</Button>
                                                </div>
                                            )
                                        }
                                    </form>
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.isEnviado}>
                                <DialogTitle>{t("preentrevista.enviada")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>{t("preentrevista.enviada-ayuda")}</DialogContentText>
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

export default Preentrevista;