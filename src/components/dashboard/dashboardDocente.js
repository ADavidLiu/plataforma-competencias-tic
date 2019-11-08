import React, { Component } from "react";

import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from "@material-ui/core/Paper";

import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import Stars from "@material-ui/icons/Stars";

import { Bar, Radar } from "react-chartjs-2";
import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from "moment";

import cursos from "../../models/cursos";

class DashboardDocente extends Component {
    constructor() {
        super();

        this.state = {
            datosID: "",
            pasoActual: 2,
            irSiguientePaso: false,
            didEstadisticasLoad: false,
            estadisticas: {
                pruebaConocimiento: {
                    correctas: 0,
                    incorrectas: 0
                },
                dimensiones: [
                    {
                        nombre: "Dimensión 1",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Dimensión 2",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Dimensión 3",
                        porcentajeAfinidad: 0
                    }
                ],
                perfiles: [
                    {
                        nombre: "Perfil 1",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 2",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 3",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 4",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 5",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 6",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 7",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 8",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 9",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 10",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 11",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 12",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 13",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 14",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 15",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 16",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 17",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 18",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 19",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 20",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 21",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 22",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 23",
                        porcentajeAfinidad: 0
                    },
                    {
                        nombre: "Perfil 24",
                        porcentajeAfinidad: 0
                    }
                ]
            },
            didRutaLoad: false,
            cursosSugeridos: [],
            encuestasAsignadas: [
                {
                    factor: 1,
                    nombre: "Incorporación de las TIC dentro de la misión, proyecto educativo institucional y plan estratégico de desarrollo de la institución educativa"
                }
            ],
            shouldAlertProcessCancellation: false
        }
        
        this.pasosRoutes = ["registro", "prueba", "practica", "preentrevista", "entrevista"];
        this.pasosNames = ["Registro de datos", "Prueba de conocimiento", "Práctica educativa", "Pre-entrevista", "Entrevista"];
    }

    componentDidMount = () => {
        /* Conexión al backend para almacenar timestamp del último ingreso */
        const timestamp = moment.now();
        /* console.log(timestamp); */

        let infoCargada = {};

        if (this.props[0] && this.props[0].location.state) {
            if (this.props[0].location.state.shouldActivateViewingMode) {
                this.props.updateIsInViewingMode(true, "DOCENTE");
            }
        }

        if (this.props.location && this.props.location.state !== undefined) {
            infoCargada = {
                docenteID: this.props.location.state.docenteID
            }
        } else {
            infoCargada = {
                docenteID: ""
            }
        }

        this.setState({
            datosID: infoCargada.docenteID
        });

        if (this.state.pasoActual > 1) {
            this.cargarEstadisticas();
            this.cargarRuta();
        }
    }

    siguientePaso = () => {
        this.setState({
            ...this.state,
            irSiguientePaso: true
        });
    }

    cargarEstadisticas = () => {
        /* Conexión al backend para recuperar datos reales del usuario "datosID" y poblar gráficas */
        this.setState({
            didEstadisticasLoad: true,
            estadisticas: {
                pruebaConocimiento: {
                    correctas: 24,
                    incorrectas: 7
                },
                dimensiones: [
                    {
                        nombre: "Dimensión 1",
                        porcentajeAfinidad: 50
                    },
                    {
                        nombre: "Dimensión 2",
                        porcentajeAfinidad: 35
                    },
                    {
                        nombre: "Dimensión 3",
                        porcentajeAfinidad: 90
                    }
                ],
                perfiles: [
                    {
                        nombre: "Perfil 1",
                        porcentajeAfinidad: 80
                    },
                    {
                        nombre: "Perfil 2",
                        porcentajeAfinidad: 15
                    },
                    {
                        nombre: "Perfil 3",
                        porcentajeAfinidad: 50
                    },
                    {
                        nombre: "Perfil 4",
                        porcentajeAfinidad: 10
                    },
                    {
                        nombre: "Perfil 5",
                        porcentajeAfinidad: 50
                    },
                    {
                        nombre: "Perfil 6",
                        porcentajeAfinidad: 80
                    },
                    {
                        nombre: "Perfil 7",
                        porcentajeAfinidad: 40
                    },
                    {
                        nombre: "Perfil 8",
                        porcentajeAfinidad: 22
                    },
                    {
                        nombre: "Perfil 9",
                        porcentajeAfinidad: 60
                    },
                    {
                        nombre: "Perfil 10",
                        porcentajeAfinidad: 90
                    },
                    {
                        nombre: "Perfil 11",
                        porcentajeAfinidad: 12
                    },
                    {
                        nombre: "Perfil 12",
                        porcentajeAfinidad: 43
                    },
                    {
                        nombre: "Perfil 13",
                        porcentajeAfinidad: 77
                    },
                    {
                        nombre: "Perfil 14",
                        porcentajeAfinidad: 23
                    },
                    {
                        nombre: "Perfil 15",
                        porcentajeAfinidad: 10
                    },
                    {
                        nombre: "Perfil 16",
                        porcentajeAfinidad: 90
                    },
                    {
                        nombre: "Perfil 17",
                        porcentajeAfinidad: 100
                    },
                    {
                        nombre: "Perfil 18",
                        porcentajeAfinidad: 34
                    },
                    {
                        nombre: "Perfil 19",
                        porcentajeAfinidad: 100
                    },
                    {
                        nombre: "Perfil 20",
                        porcentajeAfinidad: 67
                    },
                    {
                        nombre: "Perfil 21",
                        porcentajeAfinidad: 46
                    },
                    {
                        nombre: "Perfil 22",
                        porcentajeAfinidad: 67
                    },
                    {
                        nombre: "Perfil 23",
                        porcentajeAfinidad: 85
                    },
                    {
                        nombre: "Perfil 24",
                        porcentajeAfinidad: 19
                    }
                ]
            }
        });
    }

    cargarRuta = () => {
        /* Realmente, conexión al backend */
        cursos.forEach(curso => {
            this.state.cursosSugeridos.push(curso);
        });
        this.setState({
            didRutaLoad: true
        });
    }

    confirmarCancelacion = () => {
        this.setState({
            shouldAlertProcessCancellation: !this.state.shouldAlertProcessCancellation
        });
    }

    cancelarProcesoActual = () => {
        /* Conectarse al backend para cancelar el proceso actual */
        console.log("Cancelado!");
        this.confirmarCancelacion();
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }
        if (this.props[0] && this.props[0].location && this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Grid container spacing={4} justify="center">
                                {
                                    this.state.encuestasAsignadas.length > 0 ? (
                                        <Grid item xs={12}>
                                            <Typography variant="h5">{t("dashboardDocente.encuestas-asignadas")}</Typography>
                                            <hr/>
                                            {
                                                this.state.encuestasAsignadas.map((encuesta, i) => (
                                                    <Paper className="p-4 mb-4 d-md-flex align-items-center justify-content-between" key={i}>
                                                        <div className="mb-4 mb-md-0 pr-md-4">
                                                            <Typography variant="subtitle2">{t("dashboardEE.factor")} {encuesta.factor}</Typography>
                                                            <Typography variant="body1"><strong>{encuesta.nombre}</strong></Typography>
                                                        </div>
                                                        <Link to={{
                                                            pathname: `/${t("link.encuesta")}`,
                                                            state: {
                                                                factor: encuesta.factor,
                                                                shouldActivateViewingMode: this.props.isInViewingMode ? true : false
                                                            }
                                                        }} style={{"textDecoration": "none"}}>
                                                            <Button color="primary" variant="contained" size="large">{t("dashboardEE.responder")}</Button>
                                                        </Link>
                                                    </Paper>
                                                ))
                                            }
                                        </Grid>
                                    ) : null
                                }
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5">{t("dashboardDocente.proceso-actual")}</Typography>
                                    <Paper className="my-4" style={{
                                        overflow: "hidden"
                                    }}>
                                        <Stepper activeStep={this.state.pasoActual} alternativeLabel>
                                            <Step key="Prueba de conocimiento">
                                                <StepLabel>{this.pasosNames[1]}</StepLabel>
                                            </Step>
                                            <Step key="Práctica educativa">
                                                <StepLabel>{this.pasosNames[2]}</StepLabel>
                                            </Step>
                                            <Step key="Preentrevista">
                                                <StepLabel>{this.pasosNames[3]}</StepLabel>
                                            </Step>
                                            <Step key="Entrevista">
                                                <StepLabel>{this.pasosNames[4]}</StepLabel>
                                            </Step>
                                        </Stepper>
                                    </Paper>
                                    {
                                        this.state.pasoActual < 5 ? (
                                            <div className="d-md-flex align-items-center justify-content-between">
                                                <Button size="large" variant="outlined" color="primary" onClick={this.confirmarCancelacion} className="w-100 w-md-auto">{t("dashboardDocente.cancelar-proceso-actual")}</Button>
                                                <Link to={{
                                                    pathname: `${t(`link.${this.pasosRoutes[this.state.pasoActual + 1]}`)}`,
                                                    state: {
                                                        tipoUsuario: "DOCENTE"
                                                    }
                                                }} style={{textDecoration: "none"}}>
                                                    <Button variant="contained" size="large" color="primary" onClick={this.siguientePaso} className="mt-3 mt-md-0 w-100 w-md-auto">{t("dashboardDocente.label-continuar")}&nbsp;<strong>{this.pasosNames[this.state.pasoActual + 1]}</strong></Button>
                                                </Link>
                                            </div>
                                        )
                                        : <Typography variant="body1" color="primary"><strong>{t("dashboardDocente.mensaje-terminado")}</strong></Typography>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <hr className="my-3"/>
                                </Grid>
                                <Grid item xs={12} sm={8} lg={9}>
                                    <Typography variant="h5" className="mb-4">{t("dashboardDocente.diagnostico")}</Typography>
                                    <hr/>
                                    <div className="d-lg-flex align-items-center justify-content-start">
                                        <a href="#" className="d-block d-lg-inline-block w-100 w-lg-auto" style={{textDecoration: "none"}}>
                                            <Button className="w-100 w-lg-auto" variant="contained" color="primary"><Stars className="mr-2" fontSize="small"/>{t("descargar-certificado")}</Button>
                                        </a>
                                        <a href="#" className="d-block d-lg-inline-block w-100 w-lg-auto mt-3 mt-lg-0 ml-lg-3" style={{textDecoration: "none"}}>
                                            <Button className="w-100 w-lg-auto" variant="contained" color="primary"><InsertChartOutlined className="mr-2" fontSize="small"/>{t("descargar-resultados")}</Button>
                                        </a>
                                    </div>
                                    <hr/>
                                    {
                                        this.state.pasoActual > 1 ? (
                                            <Grid container>
                                                {
                                                    this.state.didEstadisticasLoad ? (
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="h6" className="mb-4">{t("dashboardDocente.resultados-pruebas")}</Typography>
                                                                <Bar height={80} data={{
                                                                    labels: ["Prueba de conocimiento"],
                                                                    datasets: [
                                                                        {
                                                                            label: "Correctas",
                                                                            data: [this.state.estadisticas.pruebaConocimiento.correctas],
                                                                            borderWidth: 0,
                                                                            backgroundColor: [
                                                                                "#009A9C"
                                                                            ]
                                                                        },
                                                                        {
                                                                            label: "Incorrectas",
                                                                            data: [this.state.estadisticas.pruebaConocimiento.incorrectas],
                                                                            borderWidth: 0,
                                                                            backgroundColor: [
                                                                                "#e53935"
                                                                            ]
                                                                        }
                                                                    ]
                                                                }} options={{
                                                                    scales: {
                                                                        yAxes: [{
                                                                            ticks: {
                                                                                beginAtZero: true,
                                                                                stepSize: 5
                                                                            }
                                                                        }]
                                                                    }
                                                                }} />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <Radar height={200} data={() => {
                                                                    const dimensionesLabels = [];
                                                                    const dimensionesDatasets = [];

                                                                    this.state.estadisticas.dimensiones.forEach(dimension => {
                                                                        dimensionesLabels.push(dimension.nombre);
                                                                        dimensionesDatasets.push(dimension.porcentajeAfinidad);
                                                                    });

                                                                    return {
                                                                        labels: dimensionesLabels,
                                                                        datasets: [{
                                                                            label: "Porcentaje de afinidad a dimensiones",
                                                                            data: dimensionesDatasets,
                                                                            backgroundColor: "rgba(0, 154, 156, .5)",
                                                                            pointBackgroundColor: "#009A9C",
                                                                            borderColor: "#009A9C"
                                                                        }]
                                                                    }
                                                                }} options={{
                                                                    scale: {
                                                                        ticks: {
                                                                            stepSize: 20
                                                                        }
                                                                    },
                                                                    tooltips: {
                                                                        enabled: true,
                                                                        callbacks: {
                                                                            label: (tooltipItem, data) => {
                                                                                return data.datasets[tooltipItem.datasetIndex].label + ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
                                                                            }
                                                                        }
                                                                    }
                                                                }} />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <Radar height={200} data={() => {
                                                                    const perfilesLabels = [];
                                                                    const perfilesDatasets = [];

                                                                    this.state.estadisticas.perfiles.forEach(perfil => {
                                                                        perfilesLabels.push(perfil.nombre);
                                                                        perfilesDatasets.push(perfil.porcentajeAfinidad);
                                                                    });

                                                                    return {
                                                                        labels: perfilesLabels,
                                                                        datasets: [{
                                                                            label: "Porcentaje de afinidad a perfiles",
                                                                            data: perfilesDatasets,
                                                                            backgroundColor: "rgba(0, 154, 156, .5)",
                                                                            pointBackgroundColor: "#009A9C",
                                                                            borderColor: "#009A9C"
                                                                        }]
                                                                    }
                                                                }} options={{
                                                                    scale: {
                                                                        ticks: {
                                                                            stepSize: 20
                                                                        }
                                                                    },
                                                                    tooltips: {
                                                                        enabled: true,
                                                                        callbacks: {
                                                                            label: (tooltipItem, data) => {
                                                                                return data.datasets[tooltipItem.datasetIndex].label + ": " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "%";
                                                                            }
                                                                        }
                                                                    }
                                                                }} />
                                                            </Grid>
                                                        </Grid>
                                                    ) : (
                                                        <CircularProgress color="primary" className="mx-auto" />
                                                    )
                                                }
                                                {
                                                    this.state.didRutaLoad ? (
                                                        <Grid item xs={12} className="mt-5">
                                                            <Typography variant="h6" className="mb-4">{t("dashboardDocente.ruta")}</Typography>
                                                            <RutaAprendizaje cursos={this.state.cursosSugeridos} />
                                                        </Grid>
                                                    ) : (
                                                        <CircularProgress color="primary" className="mx-auto" />
                                                    )
                                                }
                                            </Grid>
                                        ) : (
                                            <Typography variant="body1" color="primary"><strong>{t("dashboardDocente.no-data")}</strong></Typography>
                                        )
                                    }
                                </Grid>
                                <Grid item xs={12} sm={4} lg={3}>
                                    <Typography variant="h5" className="mb-1">{t("dashboardDocente.acciones")}</Typography>
                                    <Link to={{
                                        pathname: `/${t("link.registro")}`,
                                        state: {
                                            tipoUsuario: "DOCENTE",
                                            shouldActivateViewingMode: this.props[0] && this.props[0].location.state.shouldActivateViewingMode  ? true : false,
                                            forceShow: true
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            className="mt-3"
                                            size="medium"
                                        >{t("dashboardDocente.btn-registro")}</Button>
                                    </Link>
                                    <Link to={{
                                        pathname: `/${t("link.prueba")}`,
                                        state: {
                                            tipoUsuario: "DOCENTE",
                                            shouldActivateViewingMode: this.props[0] && this.props[0].location.state.shouldActivateViewingMode  ? true : false
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            className="mt-3"
                                            size="medium"
                                        >{t("dashboardDocente.btn-prueba")}</Button>
                                    </Link>
                                    <Link to={{
                                        pathname: `/${t("link.practica")}`,
                                        state: {
                                            tipoUsuario: "DOCENTE",
                                            shouldActivateViewingMode: this.props[0] && this.props[0].location.state.shouldActivateViewingMode  ? true : false
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            className="mt-3"
                                            size="medium"
                                        >{t("dashboardDocente.btn-practica")}</Button>
                                    </Link>
                                    <Link to={{
                                        pathname: `/${t("link.preentrevista")}`,
                                        state: {
                                            tipoUsuario: "DOCENTE",
                                            shouldActivateViewingMode: this.props[0] && this.props[0].location.state.shouldActivateViewingMode  ? true : false
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            className="mt-3"
                                            size="medium"
                                        >{t("dashboardDocente.btn-preentrevista")}</Button>
                                    </Link>
                                    <Link to={{
                                        pathname: `/${t("link.entrevista")}`,
                                        state: {
                                            tipoUsuario: "DOCENTE",
                                            shouldActivateViewingMode: this.props[0] && this.props[0].location.state.shouldActivateViewingMode  ? true : false
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            className="mt-3"
                                            size="medium"
                                        >{t("dashboardDocente.btn-entrevista")}</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.shouldAlertProcessCancellation} onClose={this.confirmarCancelacion}>
                                <DialogTitle>{t("dashboardDocente.cancelar-proceso-actual-titulo")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText className="mb-3">
                                        {t("dashboardDocente.cancelar-proceso-actual-ayuda")}
                                    </DialogContentText>
                                    <DialogContentText>
                                        {t("dashboardDocente.cancelar-proceso-actual-ayuda-2")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions className="p-3 pt-0 d-block d-md-flex">
                                    <Button color="primary" variant="outlined" onClick={this.cancelarProcesoActual} className="w-100 w-md-auto">{t("dashboardDocente.cancelar-confirmacion")}</Button>
                                    <Button color="primary" variant="contained" onClick={this.confirmarCancelacion} className="ml-0 ml-md-3 mt-3 mt-md-0 w-100 w-md-auto">{t("dashboardDocente.cancelar-no")}</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default DashboardDocente;