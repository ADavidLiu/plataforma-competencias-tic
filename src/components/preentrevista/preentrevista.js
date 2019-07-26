import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import preguntas from "../../models/preentrevista-new";

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
            preguntas: preguntas,
            preguntasVisibles: [],
            visibilityClasses: []
        }

        this.parentLabel = "";
        this.subniveles = [];
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
        
        /* this.prepararPreguntas(); */
        /* this.crearPreguntas(); */
        this.crearCuestionario();
    }

    handlePreguntaChange = (e, preguntaID, typeOfLevel, triggerID, index) => {
        /* console.log(preguntaID, e.target.value); */
        const selectedOptionID = `${preguntaID}.${e.target.value}`;
        /* console.log("Buscando... ", selectedOptionID); */
        const newRespuestas = [...this.state.respuestas];

        newRespuestas[index] = e.target.value;

        const newPreguntasVisibles = [...this.state.preguntasVisibles];
        const newVisibilityClasses = [...this.state.visibilityClasses];
        const encontrados = [];

        /* Primero, reiniciar ocultando todo excepto los niveles root */
        newPreguntasVisibles.forEach(pregunta => {
            if (pregunta.props.typeoflevel !== "ROOT") {
                newVisibilityClasses[pregunta.props.index] = "mb-4 d-none";
            } else {
                newVisibilityClasses[pregunta.props.index] = "mb-4";
            }
        });

        /* Después, mostrar la selección correcta */
        newPreguntasVisibles.forEach(pregunta => {
            if (pregunta.props.triggerid === selectedOptionID) {
                encontrados.push(pregunta.props);
            }
        });

        encontrados.forEach(pregunta => {
            newVisibilityClasses[pregunta.index] = "mb-4";
        });

        this.setState({
            respuestas: newRespuestas,
            preguntasVisibles: newPreguntasVisibles,
            visibilityClasses: newVisibilityClasses
        });

        /* Después del cambio. Ya hay que seguir carrying el delay del inicio */
        const timeout = setTimeout(() => {
            console.log(this.state.preguntasVisibles);
            console.log(this.state.visibilityClasses);
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
                        name={pregunta.label}
                        value={this.state.respuestas[i]}
                        onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.typeOfLevel, pregunta.isTriggerFor, i)}
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
                                key={option}
                                istriggeredby={triggeredBy}
                                control={<Checkbox onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.typeOfLevel, triggeredBy)} color="primary" 
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
                            required
                            fullWidth
                            multiline
                            inputProps={{ maxLength: 400 }}
                            rows="5"
                            label="Escriba su respuesta..."
                            name={pregunta.label}
                            onChange={e => this.handlePreguntaChange(e, pregunta.id, pregunta.typeOfLevel, triggeredBy)}
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
                    <div key={i} index={pregunta.id} typeoflevel={pregunta.typeOfLevel} triggerid={!triggeredBy ? pregunta.isTriggerFor : triggeredBy} className={this.state.visibilityClasses[i]}>
                        <Typography variant="body1" className="mb-3"><strong>{pregunta.label}</strong></Typography>
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

    crearNiveles = (pregunta, arrayBase) => {
        console.log("----- NUEVO NIVEL -----");
        console.log(pregunta);
        const preguntaArray = [...arrayBase];

        /* console.log("****PREGUNTA_ARRAY****");
        console.log(preguntaArray);
        console.log("****PREGUNTA_ARRAY****"); */

        if (Array.isArray(pregunta)) {
            console.log("Es array");
            pregunta.forEach(subpregunta => {
                let opcionesInternas;
                let subpreguntaArray = [];
    
                if (!subpregunta.typeOfAnswer) {
                    console.log("Sólo imprimir label");
                    opcionesInternas = (
                        <Typography variant="body1">{subpregunta.label}</Typography>
                    );
                } else {
                    console.log("Crear opciones de respuesta");
                    
                    switch (subpregunta.typeOfAnswer) {
                        case "RADIO":
                            console.log("Creó RADIO");
                            opcionesInternas = (
                                <div>
                                    <Typography variant="body1">{subpregunta.label}</Typography>
                                    <RadioGroup
                                        name={subpregunta.label}
                                        onChange={e => this.handlePreguntaChange(e)}
                                    >
                                        <FormControlLabel
                                            key="Sí"
                                            value="Sí"
                                            control={<Radio required name={`${subpregunta.label}-radio`} color="primary" />}
                                            label="Sí"
                                        />
                                        <FormControlLabel
                                            key="No"
                                            value="No"
                                            control={<Radio required name={`${subpregunta.label}-radio`} color="primary" />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </div>
                            );
                            break;
                        case "CHECKBOX":
                            console.log("Creó CHECKBOX");
                            opcionesInternas = (
                                <div>
                                    {/* <Typography variant="body1">{subpregunta.label}</Typography> */}
                                    <FormControlLabel
                                        key={`${subpregunta.label}-checkbox`}
                                        className="mt-3"
                                        control={<Checkbox onChange={e => this.handlePreguntaChange(e)} color="primary" 
                                        value={subpregunta.label} name={subpregunta.label} />}
                                        label={subpregunta.label}
                                    />
                                </div>
                            );
                            break;
                        case "INPUT":
                            console.log("Creó INPUT");
                            opcionesInternas = (
                                <div>
                                    <Typography variant="body1">{subpregunta.label}</Typography>
                                    <TextField
                                        key={`${subpregunta.label}-input`}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline
                                        inputProps={{ maxLength: 400 }}
                                        rows="5"
                                        label="Escriba su respuesta..."
                                        name={subpregunta.label}
                                        onChange={e => this.handlePreguntaChange(e)}
                                    />
                                </div>
                            );
                            break;
                        default:
                            console.log("Creó NADA");
                            opcionesInternas = null;
                            break;
                    }

                    subpreguntaArray.push(
                        <div key={subpregunta.label}>
                            {opcionesInternas}
                        </div>
                    );
    
                    /* preguntaArray.push(
                        <div key={subpregunta.label}>
                            {opcionesInternas}
                        </div>
                    ); */
                }
    
                if (subpregunta.options) {
                    console.log("Sigue subdividido");
                    return this.crearNiveles(subpregunta, preguntaArray);
                } else {
                    console.log("Ya terminó");
                    preguntaArray.push(subpreguntaArray);
                    return preguntaArray;
                }
            });
        } else {
            console.log("No es array. Sigue subdividido. Leer opciones.");
            return this.crearNiveles(pregunta.options, preguntaArray);
        }

        this.subniveles.push(preguntaArray);
    }

    crearPreguntas = () => {
        const nuevasPreguntasVisibles = [...this.state.preguntasVisibles];

        /* Esto crea sólo el nivel root de cada pregunta */
        this.state.preguntas.map((pregunta, rootIndex) => {
            console.log("---------- NUEVA PREGUNTA ----------");

            if (pregunta.options) {
                /* Esto crea a partir del tercer nivel, después del Sí/No inicial */
                this.crearNiveles(pregunta.options[0].options, []);
            }

            const rootPregunta = (
                <React.Fragment key={pregunta.label}>
                    <Typography variant="body1" className="mb-2"><strong>{pregunta.label}</strong></Typography>
                    <RadioGroup
                        name={pregunta.label}
                        onChange={e => this.handlePreguntaChange(e)}
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
                    {this.subniveles}
                    <hr/>
                </React.Fragment>
            );

            nuevasPreguntasVisibles.push(rootPregunta);
        });

        this.setState({
            preguntasVisibles: nuevasPreguntasVisibles
        });
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
                    key={`${pregunta.label}-checkbox`}
                    className="mt-3"
                    control={<Checkbox onChange={e => this.handlePreguntaChange(e)} color="primary" 
                    value={pregunta.label} name={pregunta.label} />}
                    label={pregunta.label}
                />;
                break;
            case "INPUT":
                enunciado = <Typography key={pregunta.label}>{pregunta.label}</Typography>;
                opciones = <TextField
                    key={`${pregunta.label}-input`}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    inputProps={{ maxLength: 400 }}
                    rows="5"
                    label="Escriba su respuesta..."
                    name={pregunta.label}
                    onChange={e => this.handlePreguntaChange(e)}
                />;
                break;
        }

        this.parentLabel = pregunta.label;

        arrayPregunta.push(
            <React.Fragment key={pregunta.label}>
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