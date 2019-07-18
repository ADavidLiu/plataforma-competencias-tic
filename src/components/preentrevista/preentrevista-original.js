import React, { Component } from "react";

import preguntas from "../../models/preentrevista";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class Preentrevista extends Component {
    constructor() {
        super();
        this.state = {
            respuestas: [],
            preguntasVisibles: []
        }

        this.parentLabel = "";
    }

    componentDidMount = () => {
        /* Conectarse al backend para traer el JSON de las preguntas */
        /* Pre-rellenar el estado con la **cantidad** correcta de preguntas */
        const respuestasArrayTemplate = new Array(preguntas.length);
        this.setState({
            respuestas: respuestasArrayTemplate
        });
        this.prepararPreguntas();
    }

    handlePreguntaChange = (e, rootIndex, innerIndex) => {
        const newRespuestas = this.state.respuestas;

        /* console.log(rootIndex, innerIndex); */

        if (newRespuestas[rootIndex]) {
            if (innerIndex !== null) {
                /* Si es un cambio de una pregunta interna */
                /* innerIndex + 1 porque la primera posición es el "Sí/No" */
                /* console.log("1"); */
                if (newRespuestas[rootIndex][innerIndex + 1]) {
                    console.log(rootIndex, innerIndex);
                    newRespuestas[rootIndex].splice(innerIndex + 2, 0, {
                        pregunta: e.target.name,
                        respuesta: e.target.value
                    });
                    /* newRespuestas[rootIndex].pop(); */
                } else {
                    newRespuestas[rootIndex][innerIndex + 1] = {
                        pregunta: e.target.name,
                        respuesta: e.target.value
                    };
                }
            } else {
                /* Si es el **cambio** del "Sí/No" inicial. Reinicia todos los niveles internos */
                /* console.log("2"); */
                newRespuestas[rootIndex] = [{
                    pregunta: e.target.name,
                    respuesta: e.target.value
                }];
            }
        } else {
            /* Es la primera vez. Crea y asigna inicialmente la pregunta base de "Sí/No" */
            /* console.log("3"); */
            newRespuestas[rootIndex] = [{
                label: e.target.name,
                respuesta: e.target.value
            }];
        }

        this.setState({
            respuestas: newRespuestas
        });

        /* this.state.respuestas.forEach(respuesta => {
            console.log(respuesta);
            console.log("----------------------------");
        }); */
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.respuestas);
    }

    prepararPreguntas = () => {
        const preguntasPreparadas = [];

        preguntas.forEach((pregunta, i) => {
            /* Nivel inicial de "Sí" o "No" */
            preguntasPreparadas.push(
                <div key={i}>
                    <Typography variant="body1" className="mb-3">{pregunta.label}</Typography>
                    <FormControl key={i} variant="outlined" className="w-100">
                        <RadioGroup
                            name={pregunta.label}
                            value={this.state.respuestas[i] === undefined ? "" : this.state.respuestas[i][0].respuesta}
                            onChange={e => { this.handlePreguntaChange(e, i, null) }}
                        >
                            <FormControlLabel
                                key="Sí"
                                value="Sí"
                                control={<Radio required color="primary" />}
                                label="Sí"
                            />
                            <FormControlLabel
                                key="No"
                                value="No"
                                control={<Radio required color="primary" />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            );
            /*  Creación de preguntas internas
                Sólo se le pasan las opciones del siguiente nivel del "Sí" actual
            */
            this.createInnerQuestions(preguntasPreparadas, pregunta.options[0].options, i, null);

            preguntasPreparadas.push(<hr key={`${pregunta.label}-hr`} className="my-5" />);
        });

        let tempArray = preguntasPreparadas;
        console.log(tempArray);
        /* tempArray = tempArray.filter(elem => elem.type === "div" || elem.type === "hr"); */

        this.setState({
            preguntasVisibles: tempArray
        });
    }

    createInnerQuestions = (preguntasArray, options, rootIndex) => {
        options.forEach((option, i) => {
            /* Este es el nivel padre de cada subnivel */
            if (option.typeOfAnswer) {
                switch (option.typeOfAnswer) {
                    case "INPUT":
                        preguntasArray.push(
                            <TextField
                                key={`${option.label}-${preguntasArray.length}-input`}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                inputProps={{ maxLength: 400 }}
                                rows="5"
                                label={option.label}
                                name={option.label}
                                onChange={e => this.handlePreguntaChange(e, rootIndex, i)}
                            />
                        );
                        break;
                    case "CHECKBOX":
                        preguntasArray.push(
                            <FormControlLabel
                                key={`${option.label}-${preguntasArray.length}-checkbox`}
                                className="mt-3"
                                control={<Checkbox onChange={e => this.handlePreguntaChange(e, rootIndex, i)} color="primary" 
                                value={option.label} name={this.parentLabel} />}
                                label={option.label}
                            />
                        );
                        break;
                    case "RADIO":
                        preguntasArray.push(
                            <RadioGroup
                                key={`${option.label}-${preguntasArray.length}-radio`}
                                name={option.label}
                                onChange={e => this.handlePreguntaChange(e, rootIndex, i)}
                            >
                                <FormControlLabel
                                    key="Sí"
                                    value="Sí"
                                    control={<Radio required color="primary" />}
                                    label="Sí"
                                />
                                <FormControlLabel
                                    key="No"
                                    value="No"
                                    control={<Radio required color="primary" />}
                                    label="No"
                                />
                            </RadioGroup>
                        );
                        break;
                    default:
                        console.log("Missing typeOfAnswer");
                        break;
                }
            } else {
                if (option.label) {
                    this.parentLabel = option.label;

                    preguntasArray.push(
                        <Typography key={`${option.label}-${i}`} variant="body1" className="mt-3 mb-4">{option.label}</Typography>
                    );
                }
            }

            if (options[0].options[0].descriptoresEvaluados === undefined) {
                /* Repetir hasta que se llegue al nivel final de cada pregunta */
                this.createInnerQuestions(preguntasArray, option.options, rootIndex);
            }
        });
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-5">
                            <Typography variant="h5" className="mb-5 text-center">Pre-entrevista</Typography>
                            <Typography variant="body1" className="mb-3">Por favor conteste las preguntas que a continuación encontrará. Éstas buscan ahondar en su apropiación de compentencias TIC clave de su proceso docente.</Typography>
                        </div>
                        <hr/>
                        {this.state.preguntasVisibles}
                        <Button type="submit" fullWidth className="mt-2" color="primary" variant="contained" size="large">Enviar</Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default Preentrevista;