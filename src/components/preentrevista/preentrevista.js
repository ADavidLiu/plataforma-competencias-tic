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

        this.parentLabel = "";
        this.arrayPreguntas = [];
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

    handlePreguntaChange = (e, rootIndex) => {

    }

    prepararPreguntas = () => {
        preguntas.map((pregunta, rootIndex) => {
            /* Sólo para el primer nivel de cada pregunta. */
            this.arrayPreguntas.push(
                <div key={pregunta.label}>
                    <Typography><strong>{pregunta.label}</strong></Typography>
                    <RadioGroup
                        name={pregunta.label}
                        onChange={e => this.handlePreguntaChange(e, rootIndex)}
                    >
                        <FormControlLabel
                            key="Sí"
                            value="Sí"
                            control={<Radio required name={`${pregunta.label}-radio`} color="primary" />}
                            label="Sí"
                        />
                        <FormControlLabel
                            key="No"
                            value="No"
                            control={<Radio required name={`${pregunta.label}-radio`} color="primary" />}
                            label="No"
                        />
                    </RadioGroup>
                </div>
            );

            /* Se crean las preguntas internas. */
            if (pregunta.options[0].options) {
                /* Sólo tomar en cuenta los "Sí" para seguir renderizando. */
                this.crearPregunta(pregunta.options[0].options[0], []);
            }
        });

        this.setState({
            preguntasVisibles: this.arrayPreguntas
        });
    }

    crearPregunta = (pregunta, arrayBase) => {
        const arrayPregunta = [...arrayBase];
        let enunciado = "";
        let opciones = "";

        switch (pregunta.typeOfAnswer) {
            case "RADIO":
                break;
            case "CHECKBOX":
                enunciado = <Typography key={this.parentLabel}>{this.parentLabel}</Typography>;
                opciones = <FormControlLabel
                    className="mt-3"
                    control={<Checkbox onChange={e => this.handlePreguntaChange(e)} color="primary" 
                    value={pregunta.label} name={pregunta.label} />}
                    label={pregunta.label}
                />;
                break;
            case "INPUT":
                enunciado = <Typography key={pregunta.label}>{pregunta.label}</Typography>;
                opciones = <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    inputProps={{ maxLength: 400 }}
                    rows="5"
                    label="Digite su respuesta..."
                    name={pregunta.label}
                    onChange={e => this.handlePreguntaChange(e)}
                />;
                break;
        }

        this.parentLabel = pregunta.label;

        arrayPregunta.push(
            <React.Fragment>
                {enunciado}
                {opciones}
            </React.Fragment>
        );

        if (pregunta.options) {
            pregunta.options.forEach(subpregunta => {
                this.crearPregunta(subpregunta, arrayPregunta);
            });
        } else {
            /* console.log("Final");
            console.log(arrayPregunta); */
            arrayPregunta.push(<hr/>);
            this.arrayPreguntas.push(arrayPregunta);
            /* return arrayPregunta; */
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