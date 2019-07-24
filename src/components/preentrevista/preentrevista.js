import React, { Component } from "react";

import { Redirect } from "react-router-dom";

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
            tipoUsuario: "",
            respuestas: [],
            preguntasVisibles: []
        }
    }

    componentDidMount = () => {
        /* Conectarse al backend para traer el JSON de las preguntas */
        /* Pre-rellenar el estado con la **cantidad** correcta de preguntas */
        /* const respuestasArrayTemplate = new Array(preguntas.length);
        this.setState({
            respuestas: respuestasArrayTemplate
        }); */

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
        
        this.prepararPreguntas();
    }

    prepararPreguntas = () => {
        const nuevasPreguntas = this.state.preguntasVisibles;
        
        preguntas.forEach(pregunta => {
            this.setState({
                preguntasVisibles: [
                    ...this.state.preguntasVisibles,
                    this.crearPregunta(pregunta)
                ]
            });
        });
    }

    crearPregunta = pregunta => {
        console.log(pregunta)
        if (!pregunta.typeOfAnswer) {
            return (
                <Typography key={pregunta.label} variant="body1">{pregunta.label}</Typography>
            );
        } else {
            switch (pregunta.typeOfAnswer) {
                case "RADIO":
                    return (
                        <RadioGroup
                            key={pregunta.label}
                            name={pregunta.label}
                        >
                            <FormControlLabel
                                key={pregunta.label}
                                value={pregunta.label}
                                control={<Radio required color="primary" />}
                                label={pregunta.label}
                            />
                        </RadioGroup>
                    );
                    break;
                case "INPUT":
                    break;
                case "CHECKBOX":
                    break;
                default:
                    break;
            }
        }

        if (pregunta.options) {
            this.crearPregunta(pregunta.options[0].options);
        }
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