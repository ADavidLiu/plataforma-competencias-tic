import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import preguntas from "../../models/preentrevista-new";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class Preentrevista extends Component {
    constructor() {
        super();
        this.state = {
            tipoUsuario: "",
            respuestas: [],
            preguntas: preguntas,
            preguntasVisibles: [],
            visibilityClasses: []
        }

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
            tipoUsuario: infoCargada.tipoUsuario
        });
        
        this.crearCuestionario();
    }

    handlePreguntaChange = (e, preguntaID, groupID, typeOfLevel, triggerID, index) => {
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

            switch (evento.type) {
                case "radio":
                    condicion = evento.value === "0";
                    if (evento.value === "0") {
                        newRespuestas[index] = {
                            group: groupID,
                            value: "Sí"
                        };
                    } else {
                        newRespuestas[index] = {
                            group: groupID,
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
                        const selected = [];
                        checkboxes = checkboxes.forEach(input => {
                            if (input.checked) {
                                selected.push(input.name);
                            }
                        });
                        newRespuestas[index] = {
                            group: groupID,
                            value: selected
                        };
                    } else {
                        newRespuestas[index].splice(selectedOptionID.split(".")[1], 1, null);
                        if (newRespuestas[index].every(respuesta => respuesta === null)) {
                            newRespuestas.splice(index, 1);
                        }
                    }
                    break;
                case "textarea":
                case "input":
                    condicion = true;
                    newRespuestas[index] = {
                        group: groupID,
                        value: evento.value
                    };
                    break;
                default:
                    break;
            }

            if (condicion) {
                indicesMostrados.forEach(indice => {
                    this.preguntasDivs[indice].classList.remove("d-none");
                });
            } else {
                this.preguntasDivs.forEach(preguntaDiv => {
                    if (indicesMostrados.length === 0 && preguntaDiv.getAttribute("typeoflevel") !== "ROOT" || indicesMostrados.includes(preguntaDiv.getAttribute("index"))) {
                        preguntaDiv.classList.add("d-none");

                        /* Eliminar del array las respuestas ahora ocultas */
                        /* console.log(newRespuestas);
                        console.log(groupID, index); */
                        let count = 0;
                        newRespuestas.forEach(respuesta => {
                            console.log(respuesta);
                            /* if (respuesta.group === groupID || respuesta === undefined) {
                                count += 1;
                            } */
                        });
                        newRespuestas.splice(index + 1, count);

                        /* Reiniciar la parte visual de cada opción de respuesta. */
                        switch (preguntaDiv.getAttribute("typeofanswer")) {
                            case "CHECKBOX":
                                const checkboxes = preguntaDiv.querySelectorAll(".preentrevista-checkbox input[type='checkbox']");
                                checkboxes.forEach(input => {
                                    input.checked = false;
                                    /* const parentLabel = input.closest(".PrivateSwitchBase-checked-246.Mui-checked");
                                    if (parentLabel !== null) {
                                        console.log(parentLabel);
                                        parentLabel.classList.remove("PrivateSwitchBase-checked-246");
                                        parentLabel.classList.remove("Mui-checked");
                                    } */


                                });
                                break;
                            case "INPUT":
                                const textarea = preguntaDiv.querySelector("textarea");
                                textarea.value = "";
                                break;
                            default:
                                break;
                        }
                    }
                });
            }

            this.setState({
                respuestas: newRespuestas
            });

            clearTimeout(timeout);
        }, 100);
    }

    crearCuestionario = () => {
        const newPreguntasVisibles = [...this.state.preguntasVisibles];
        const newVisibilityClasses = [...this.state.visibilityClasses];

        this.state.preguntas.map((pregunta, i) => {
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
                        onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.group, pregunta.typeOfLevel, pregunta.isTriggerFor, i)}
                    >
                        <FormControlLabel
                            key="Sí"
                            value="0"
                            control={<Radio required name={pregunta.label} color="primary" />}
                            label="Sí"
                        />
                        <FormControlLabel
                            key="No"
                            value="1"
                            control={<Radio required name={pregunta.label} color="primary" />}
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
                                control={<Checkbox onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.group, pregunta.typeOfLevel, triggeredBy, i)} color="primary" 
                                value={j} name={option} />}
                                label={option}
                            />
                        );
                    });
                    opcionesRespuesta = opciones;
                    break;
                case "INPUT":
                    opcionesRespuesta = (
                        <TextField
                            key={pregunta.label}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            multiline
                            inputProps={{ maxLength: 400 }}
                            rows="5"
                            label="Escriba su respuesta..."
                            name={pregunta.label}
                            onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.group, pregunta.typeOfLevel, triggeredBy, i)}
                        />
                    );
                    break;
            }

            newVisibilityClasses[i] = "mb-4";

            if (pregunta.typeOfLevel !== "ROOT") {
                newVisibilityClasses[i] = "mb-4 d-none";
            }

            this.setState({
                visibilityClasses: newVisibilityClasses
            });

            /* Pequeño delay para alcanzar a que las clases de visibilidad de inicialicen */
            const timeout = setTimeout(() => {
                const newPregunta = (
                    <div key={i} index={pregunta.id} group={pregunta.group} typeofanswer={pregunta.typeOfAnswer} typeoflevel={pregunta.typeOfLevel} triggerid={!triggeredBy ? pregunta.isTriggerFor : triggeredBy} className={this.state.visibilityClasses[i]} ref={elem => {
                        this.preguntasDivs.push(elem);
                    }}>
                        <Typography variant="body1"><strong>{pregunta.label}</strong></Typography>
                        {opcionesRespuesta}
                    </div>
                );
                newPreguntasVisibles.push(newPregunta);

                this.setState({
                    preguntasVisibles: newPreguntasVisibles
                });

                clearTimeout(timeout);
            }, 100);
        });
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-5">
                            <Typography variant="h5" className="mb-5 text-center">Pre-entrevista</Typography>
                            <Typography variant="body1" className="mb-3">Por favor conteste las preguntas que a continuación encontrará. Éstas buscan ahondar en su apropiación de compentencias TIC clave de su proceso docente.</Typography>
                        </div>
                        <hr className="mb-5" />
                        {this.state.preguntasVisibles}
                        <Button type="submit" fullWidth className="mt-3" color="primary" variant="contained" size="large">Enviar</Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default Preentrevista;