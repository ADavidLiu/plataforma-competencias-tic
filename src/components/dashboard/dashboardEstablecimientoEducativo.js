import React, { Component } from "react";

import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut } from "react-chartjs-2";

import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";

import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";
import VisorPerfiles from "../visorPerfiles/visorperfiles";

import pasos from "../../models/pasos";
import cursos from "../../models/cursos";
import { docentesCargados } from "../../models/perfiles";

class DashboardExtablecimientoEducativo extends Component {
    constructor() {
        super();
        
        this.state = {
            datosID: "",
            didPerfilesLoad: false,
            perfiles: [],
            perfilesDivididos: [],
            perfilesMostrados: [],
            numDivisionesPerfiles: 0,
            currentDivisionPerfiles: 0,
            hasPreviousPerfiles: false,
            hasNextPerfiles: false,
            didRutaLoad: false,
            cursosSugeridos: [],
            indiceApropiacion: 0,
            cuentaNoIngreso: 0,
            encuestasNoRespondidas: [
                {
                    id: "123asd",
                    factor: 1,
                    nombre: "Incorporación de las TIC dentro de la misión, proyecto educativo institucional y plan estratégico de desarrollo de la institución educativa",
                    asignado: "no-asignado"
                },
                {
                    id: "456qwe",
                    factor: 2,
                    nombre: "Recursos humanos y tecnológicos con que cuenta la institución para integrar las TIC en los procesos de enseñanza y aprendizaje",
                    asignado: "no-asignado"
                },
                {
                    id: "789zxc",
                    factor: 4,
                    nombre: "Monitoreo y evaluación sobre el papel de las TIC en los procesos de enseñanza y aprendizaje",
                    asignado: "no-asignado"
                }
            ]
        }
    }

    componentWillUnmount = () => {
        if (this.props[0].location.state) {
            this.props.updateIsInViewingMode(false);
        }
    }

    componentDidMount() {
        /* Conectarse al backend para traer el índice de apropiación y los perfiles asociados a este EE por su datosID */
        let infoCargada = {};

        if (this.props[0].location.state) {
            if (this.props[0].location.state.shouldActivateViewingMode) {
                this.props.updateIsInViewingMode(true);
            }
        }

        if (this.props.location && this.props.location.state !== undefined) {
            infoCargada = {
                datosID: this.props.location.state.establecimientoID
            }
        } else {
            infoCargada = {
                datosID: ""
            }
        }

        this.setState({
            datosID: infoCargada.datosID,
            didPerfilesLoad: true,
            perfiles: [...docentesCargados],
            indiceApropiacion: 2
        });

        this.cargarRuta();
        this.calcularNoIngresos();
    }

    cargarRuta = () => {
        /* Realmente, conexión al backend */
        const nuevosCursos = [];
        cursos.forEach(curso => {
            nuevosCursos.push(curso);
        });

        this.setState({
            cursosSugeridos: nuevosCursos,
            didRutaLoad: true
        });
    }

    calcularNoIngresos = () => {
        let cuentaNoIngreso = this.state.cuentaNoIngreso;

        docentesCargados.forEach(perfil => {
			if (perfil.ultimoIngreso === "") {
				this.setState({
                    cuentaNoIngreso: cuentaNoIngreso += 1
                });
			}
		});
    }

    handleEncuestaAsignacion = (e, index) => {
        const newEncuestas = [...this.state.encuestasNoRespondidas];
        newEncuestas[index].asignado = e.target.value;

        /* Actualizar la asignación en el Backend */
        
        /* Actualización visual */
        this.setState({
            encuestasNoRespondidas: newEncuestas
        });
    }

    asignarDelegado = index => {
        const encuestaSeleccionada = this.state.encuestasNoRespondidas[index];
        console.log(encuestaSeleccionada.id, encuestaSeleccionada.factor, encuestaSeleccionada.nombre, encuestaSeleccionada.asignado);
        /* Enviar al backend */
        console.log("Asignado!");

        /* Eliminar visualmente una vez llegue la confirmación 200 */
        const newEncuestas = [...this.state.encuestasNoRespondidas];
        newEncuestas.splice(index, 1);
        this.setState({
            encuestasNoRespondidas: newEncuestas
        });
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }
        if (this.props[0].location && this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <Translation>
                {
                    t => (
                        <Grid container spacing={5}>
                            {
                                this.state.encuestasNoRespondidas.length > 0 ? (
                                    <React.Fragment>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">{t("dashboardEE.label-encuestas")}</Typography>
                                            <hr/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {
                                                this.state.encuestasNoRespondidas.map((encuesta, i) => (
                                                    <Paper className="p-4 mb-4 d-lg-flex align-items-center justify-content-between" key={i}>
                                                        <div className="mb-4 mb-md-3 mb-lg-0 pr-lg-4">
                                                            <Typography variant="subtitle2">{t("dashboardEE.factor")} {encuesta.factor}</Typography>
                                                            <Typography variant="body1"><strong>{encuesta.nombre}</strong></Typography>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-start justify-content-lg-end">
                                                            <Link to={{
                                                                pathname: "/encuesta",
                                                                state: {
                                                                    factor: encuesta.factor
                                                                }
                                                            }}>
                                                                <Button color="primary" variant="contained" size="large">{t("dashboardEE.responder")}</Button>
                                                            </Link>
                                                            <Typography variant="body1" className="mx-3">{t("o")}</Typography>
                                                            <FormControl variant="outlined">
                                                                <Select
                                                                    value={this.state.encuestasNoRespondidas[i].asignado}
                                                                    onChange={e => { this.handleEncuestaAsignacion(e, i); }}
                                                                    input={<OutlinedInput required 
                                                                    name="asignado"/>}
                                                                >
                                                                    <MenuItem value="no-asignado">{t("dashboardEE.encuesta-no-asignada")}</MenuItem>
                                                                    {/* Traer los verdaderos Docentes directivos desde el backend */}
                                                                    <MenuItem value="123456">John Doe</MenuItem>
                                                                    <MenuItem value="789012">Jane Doe</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <Button variant="outlined" size="large" className="ml-3" color="primary" hidden={this.state.encuestasNoRespondidas[i].asignado === "no-asignado" ? true : false} onClick={() => this.asignarDelegado(i)}>{t("encuestas.asignar-delegado")}</Button>
                                                        </div>
                                                    </Paper>
                                                ))
                                            }
                                        </Grid>
                                    </React.Fragment>
                                ) : null
                            }
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    {t("dashboardEE.label-docentes")}
                                </Typography>
                                <hr/>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                {this.state.didPerfilesLoad ? (
                                    <React.Fragment>
                                        <VisorPerfiles tipo="DOCENTES" numPorPagina={4} perfiles={this.state.perfiles} />
                                    </React.Fragment>
                                ) : (
                                    <CircularProgress color="primary" />
                                )}
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper className="p-4 text-center">
                                            <Typography variant="h3" component="p" className="mb-2">{this.state.indiceApropiacion}</Typography>
                                            <Typography component="p">{t("indice-tic")}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper className="p-4 text-center mb-5">
                                            <Typography variant="h3" component="p" className="mb-2">{this.state.perfiles.length}</Typography>
                                            <Typography component="p">{t("dashboardEE.docentes")}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper className="p-4 text-center mb-5">
                                            <Typography variant="h3" component="p" className="mb-2">{this.state.cuentaNoIngreso}</Typography>
                                            <Typography component="p">{t("dashboardEE.nunca-ingreso")}</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                {this.state.didPerfilesLoad ? (
                                    <React.Fragment>
                                        <Typography variant="h6" className="mb-3">{t("dashboardEE.label-estado-general")}</Typography>
                                        <Typography variant="body1"><strong>{t("dashboardEE.label-frecuencia-absoluta")}</strong></Typography>
                                        <hr className="mt-2 mb-4"/>
                                        <Bar
                                            data={() => {
                                                const numPerfilesPasos = [0, 0, 0, 0, 0, 0];

                                                this.state.perfiles.forEach((perfil, i) => {
                                                    numPerfilesPasos[perfil.pasoActual] += 1;
                                                });

                                                const barDatasets = [];
                                                pasos.avanzado.forEach(paso => {
                                                    barDatasets.push({
                                                        label: paso.nombre,
                                                        data: [numPerfilesPasos[paso.index]],
                                                        borderWidth: 0,
                                                        backgroundColor: ["#009A9C"]
                                                    });
                                                });

                                                return {
                                                    labels: ["Paso actual"],
                                                    datasets: barDatasets
                                                }
                                            }}
                                            options={{
                                                scales: {
                                                    yAxes: [
                                                        {
                                                            ticks: {
                                                                beginAtZero: true,
                                                                stepSize: 5
                                                            }
                                                        }
                                                    ]
                                                }
                                            }}
                                        />
                                        <div className="mt-4">
                                            <Typography variant="body1"><strong>{t("dashboardEE.label-frecuencia-relativa")}</strong></Typography>
                                            <hr className="mt-2 mb-4"/>
                                            <Doughnut height={200} data={() => {
                                                const numPerfilesPasos = [0, 0, 0, 0, 0, 0];
                                                this.state.perfiles.forEach((perfil, i) => {
                                                    numPerfilesPasos[perfil.pasoActual] += 1;
                                                });

                                                const doughnutDatasets = [{
                                                    data: [],
                                                    backgroundColor: ["#5f77ff", "#546bf0", "#4b60d6", "#4357c5", "#4154c0", "#009A9C"]
                                                }];
                                                pasos.avanzado.forEach(paso => {
                                                    doughnutDatasets[0].data.push(numPerfilesPasos[paso.index]);
                                                });

                                                const labelsArray = [];
                                                pasos.avanzado.forEach(paso => {
                                                    labelsArray.push(paso.nombre);
                                                });

                                                return {
                                                    labels: labelsArray,
                                                    datasets: [doughnutDatasets[0]]
                                                }
                                            }} options={{
                                                tooltips: {
                                                    callbacks: {
                                                        label: (tooltipItem, data) => {
                                                            const dataset = data.datasets[tooltipItem.datasetIndex];
                                                            const label = data.labels[tooltipItem.index];
                                                            const absoluteValue = dataset.data[tooltipItem.index];
                                                            const total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                                                return previousValue + currentValue;
                                                            });
                                                            const currentValue = dataset.data[tooltipItem.index];
                                                            const percentage = Math.floor(((currentValue/total) * 100)+0.5);

                                                            return `${label}: ${absoluteValue} (${percentage}%)`;
                                                        }
                                                    }
                                                }
                                            }} />
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <CircularProgress color="primary" />
                                )}
                            </Grid>
                            <Grid item xs={12} className="mt-4">
                                <Typography variant="h5">{t("dashboardEE.ruta")}</Typography>
                                <hr/>
                            </Grid>
                            {
                                this.state.didRutaLoad ? (
                                    <Grid item xs={12}>
                                        <RutaAprendizaje cursos={this.state.cursosSugeridos} />
                                    </Grid>
                                ) : <CircularProgress color="primary" className="mx-auto" />
                            }
                        </Grid>
                    )
                }
            </Translation>
		);
    }
}

export default DashboardExtablecimientoEducativo;