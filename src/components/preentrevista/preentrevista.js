import React, { Component } from "react";

import preguntas from "../../models/preentrevista";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import FormGroup from '@material-ui/core/FormGroup';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class Preentrevista extends Component {
    constructor() {
        super();
        this.state = {
            respuestas: []
        }
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    prepararPreguntas = () => {
        /* return preguntas.map((pregunta, rootIndex) => {
            let optionsPrimerNivel = [];
            let optionsSegundoNivel = [];
            let optionsTercerNivel = [];
            let optionsCuartoNivel = [];

            if (pregunta.options) {
                for (let i = 0; i < pregunta.options.length; i++) {
                    optionsPrimerNivel.push(
                        <FormControl key={i} variant="outlined" className="w-100">
                            <RadioGroup
                                name={pregunta.label}
                                onChange={e => { this.handleRadioChange(e, i) }}
                            >
                                <FormControlLabel
                                    key={pregunta.options[i].label}
                                    value={pregunta.options[i].label}
                                    control={<Radio required color="primary" />}
                                    label={pregunta.options[i].label}
                                />
                            </RadioGroup>
                        </FormControl>
                    );

                    if (pregunta.options[i].options) {
                        for (let j = 0; j < pregunta.options[i].options.length; j++) {
                            if (pregunta.options[i].options.length > 1) {
                                optionsSegundoNivel.push(
                                    <div key={`${rootIndex}, ${i}, ${j}`}>
                                        <FormControlLabel
                                            control={<Checkbox color="primary" 
                                            value={pregunta.options[i].options[j].label} />}
                                            label={pregunta.options[i].options[j].label}
                                        />
                                    </div>
                                );
                            }
                            
                            if (pregunta.options[i].options[j].options) {
                                for (let k = 0; k < pregunta.options[i].options[j].options.length; k++) {
                                    if (pregunta.options[i].options[j].options[k].label === "INPUT") {
                                        optionsTercerNivel.push(
                                            <div key={`${rootIndex}, ${i}, ${j}`}>
                                                <Typography variant="body1">{pregunta.options[i].options[j].label}</Typography>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    multiline
                                                    inputProps={{ maxLength: 400 }}
                                                    rows="5"
                                                    label="Detalle aquí..."
                                                />
                                            </div>
                                        );
                                    } else {
                                        optionsTercerNivel.push(
                                            <FormControlLabel
                                                key={`${rootIndex}, ${i}, ${j}, ${k}`}
                                                required
                                                control={<Checkbox color="primary" value={pregunta.options[i].options[j].options[k].label} />}
                                                label={pregunta.options[i].options[j].options[k].label}
                                            />
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return (
                <div key={pregunta.label} className="mb-4">
                    <Typography variant="body1" className="mb-2">{pregunta.label}</Typography>
                    {optionsPrimerNivel}
                    {optionsSegundoNivel}
                    {optionsTercerNivel}
                    {optionsCuartoNivel}
                    <hr/>
                </div>
            );
        }); */

        const preguntasPreparadas = [];

        preguntas.forEach((pregunta, i) => {
            /* Primer nivel de las preguntas */
            /* const nuevaPregunta = this.crearPregunta(pregunta.label, pregunta.options);
            preguntasPreparadas.push(nuevaPregunta); */
            preguntasPreparadas.push(
                <div key={i}>
                    <Typography variant="body1">{pregunta.label}</Typography>
                    <FormControl key={i} variant="outlined" className="w-100">
                        <RadioGroup
                            name={pregunta.label}
                            value={this.state.respuestas[i].respuesta}
                            onChange={e => { this.handlePreguntaChange(e, i) }}
                        >
                            <FormControlLabel
                                key="Sí"
                                value={true}
                                control={<Radio required color="primary" />}
                                label="Sí"
                            />
                            <FormControlLabel
                                key="No"
                                value={false}
                                control={<Radio required color="primary" />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
            );
        });

        return preguntasPreparadas;
    }

    handlePreguntaChange = (e, i) => {
        const newRespuestas = this.state.respuestas;
        if (newRespuestas[i]) {

        } else {
            /* newRespuestas[i] = {
                label: e.target.name,
                respuesta: 
            } */
        }

        this.setState({
            respuestas: newRespuestas
        });
    }

    crearPregunta = (label, options) => {
        const preguntaArray = [
            <Typography variant="body1">{label}</Typography>
        ];

        options.forEach(option => {
            if (option.options) {
                /* console.log(option); */
                /* Primero, volver a ejecutar la función con los nuevos datos nesteados de esta pregunta */
                this.crearPregunta(option.label, option.options);

                /* Luego, crear esta pregunta */
                if (option.label === "Sí") {
                    preguntaArray.push(
                        <RadioGroup
                            name={option.label}
                            onChange={this.handleRadioChange}
                        >
                            <FormControlLabel
                                key={option.label}
                                value={option.label}
                                control={<Radio required color="primary" />}
                                label={option.label}
                            />
                        </RadioGroup>
                    );
                } else {
                    console.log(option.label);
                }
            } else {
                /* Estamos en los últimos niveles: "No" e "INPUT" */
                if (option.label === "No") {
                    preguntaArray.push(
                        <RadioGroup
                            name={option.label}
                            onChange={this.handleRadioChange}
                        >
                            <FormControlLabel
                                key={option.label}
                                value={option.label}
                                control={<Radio required color="primary" />}
                                label={option.label}
                            />
                        </RadioGroup>
                    );
                } else if (option.label === "INPUT") {
                    preguntaArray.push(
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                inputProps={{ maxLength: 400 }}
                                rows="5"
                                label="Detalle aquí..."
                            />
                        </div>
                    );
                }
            }
        });

        return preguntaArray;
    }

    render() {
        const preguntasMostradas = this.prepararPreguntas();

        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-5">
                            <Typography variant="h5" className="mb-5 text-center">Pre-entrevista</Typography>
                            <Typography variant="body1" className="mb-3">Por favor conteste las preguntas que a continuación encontrará. Éstas buscan ahondar en su apropiación de compentencias TIC clave de su proceso docente.</Typography>
                        </div>
                        <hr/>
                        {preguntasMostradas}
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default Preentrevista;