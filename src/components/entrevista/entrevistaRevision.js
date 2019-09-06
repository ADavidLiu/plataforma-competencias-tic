import React, { Component } from "react";

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

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";

class EntrevistaRevision extends Component {
    constructor() {
        super();

        this.state = {
            docenteID: "",
            docenteNombre: "",
            preguntas: [],
            calificaciones: [],
            isEnviado: false
        }
    }

    cargarDatos = () => {
        /* Conectarse al backend */
        const dataCargada = [
            {
                descriptores: ["E1ub"],
                definicion: "Como consecuencia de la incorporación de las TIC propone cambios significativos en otros escenarios educativos replicando contenidos, actividades y/o evaluaciones.",
                evidencia: "Ejemplo de modificaciones de otros escenarios educativos."
            },
            {
                descriptores: ["I1ta"],
                definicion: "Durante el diseño de escenarios educativos adiciona, suprime y reorganiza las herramientas TIC para facilitar la presentación de contenidos, el almacenamiento, la comunicación, la transmisión e intercambio de información y el acceso y búsqueda de información de calidad, considerando sugerencias (grupos de apoyo, colegas y estudiantes, etc.).",
                evidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad."
            }
        ]

        let infoCargada = {};

        if (this.props[0].location.state === undefined) {
            infoCargada = {
                docenteID: "",
                docenteNombre: ""
            }
        } else {
            infoCargada = {
                docenteID: this.props[0].location.state.docenteID,
                docenteNombre: this.props[0].location.state.docenteNombre
            }
        }

        this.setState({
            docenteID: infoCargada.docenteID,
            docenteNombre: infoCargada.docenteNombre,
            preguntas: [
                ...this.state.preguntas,
                ...dataCargada
            ]
        });
    }

    componentDidMount = () => {
        this.cargarDatos();
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

    enviar = () => {
        if (this.state.calificaciones.length === this.state.preguntas.length) {
            this.setState({
                isEnviado: true
            });
            console.log("Enviado");
        }
    }

    render() {
        if (this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <React.Fragment>
                <Grid container spacing={5} justify="center">
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5" className="mb-2">Sesión de entrevista</Typography>
                                <Typography variant="body1">Nombre del(a) docente evaluado(a): <strong>{this.state.docenteNombre}</strong></Typography>
                                <hr className="mb-4" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} className="mb-4">
                            <Grid item xs={12} sm={8} md={9}>
                                <Typography variant="body1" className="mb-3">Señor(a) evaluador(a), a continuación se relacionan los descriptores que deben ser profundizados en la entrevista.</Typography>
                                <Typography variant="body1">Tenga presente explorar las evidencias que el(la) docente preparará para la sesión de entrevista.</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant="body1" className="mb-2"><strong>Definición de valores</strong></Typography>
                                <Typography variant="body1" className="mb-2"><strong>1: Nulo</strong> - No se cuenta con evidencias.</Typography>
                                <Typography variant="body1" className="mb-2"><strong>2: Parcial</strong> - Se cuenta con evidencias de manera incipiente, parcial, o desordenada.</Typography>
                                <Typography variant="body1"><strong>3: Totalmente</strong> - Se cuenta con evidencia clara y consolidada.</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                {
                                    this.state.preguntas.map((pregunta, i) => {
                                        return (
                                            <Paper key={i} className="p-4 mb-4">
                                                <Grid container spacing={5}>
                                                    <Grid item xs={12} sm={8} md={9}>
                                                        <Typography variant="body1" className="mb-3"><strong>Descriptores:</strong> {pregunta.descriptores.map(descriptor => "• " + descriptor)}</Typography>
                                                        <Typography variant="body1" className="mb-3"><strong>Definición:</strong> {pregunta.definicion}</Typography>
                                                        <Typography variant="body1"><strong>Evidencia requerida:</strong> {pregunta.evidencia}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} className="d-sm-none py-0">
                                                        <hr/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={3}>
                                                        <Typography variant="body1" className="mb-3"><strong>Calificación final</strong></Typography>
                                                        <FormControl variant="outlined" className="w-100">
                                                            <InputLabel htmlFor={`calificacion-${i}`}>Seleccione un valor *</InputLabel>
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
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        );
                                    })
                                }
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" size="large" fullWidth onClick={this.enviar}>Enviar</Button>
                    </Grid>
                </Grid>
                <Dialog open={this.state.isEnviado}>
                    <DialogTitle>Revisión enviada</DialogTitle>
                    <DialogContent>
                    <DialogContentText>La calificación ha sido asignada exitosamente.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/" style={{textDecoration: "none"}}>
                            <Button color="primary">Volver a inicio</Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default EntrevistaRevision;