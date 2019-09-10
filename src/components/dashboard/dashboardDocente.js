import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Bar, Radar } from "react-chartjs-2";
import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";

import moment from "moment";

class DashboardDocente extends Component {
    constructor() {
        super();

        this.state = {
            datosID: "",
            pasoActual: 4,
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
            cursosSugeridos: []
        }
        
        this.pasosRoutes = ["registro", "prueba", "practicas", "preentrevista", "entrevista"];
        this.pasosNames = ["Registro de datos", "Prueba de conocimiento", "Práctica educativa", "Pre-entrevista", "Entrevista"];
    }

    componentDidMount() {
        /* Conexión al backend para almacenar timestamp del último ingreso */
        const timestamp = moment.now();
        console.log(timestamp);

        let infoCargada = {};

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
        const cursos = [
            {
                nombre: "Curso 1",
                descripcion: "Sunt deserunt mollit aliquip culpa id duis esse commodo laboris irure ex reprehenderit occaecat. Minim sunt esse esse laborum eiusmod reprehenderit do consequat. Anim esse amet do enim dolor laborum labore irure culpa Lorem esse cupidatat consectetur. Incididunt qui esse dolor eu fugiat Lorem. Nisi commodo enim aliquip consectetur Lorem laborum labore laborum do duis ullamco sit officia sit. Tempor irure sit Lorem sint velit cillum exercitation occaecat enim. Esse occaecat voluptate incididunt consequat et aliqua consectetur cupidatat adipisicing.",
                imgSrc: ""
            },
            {
                nombre: "Curso 2",
                descripcion: "Incididunt fugiat ad voluptate sunt incididunt. Excepteur labore ea consequat voluptate excepteur consequat veniam reprehenderit veniam officia sunt eu velit ex. Consequat velit aliqua dolore exercitation laboris cupidatat veniam magna magna. Consequat qui nisi dolor nisi dolore laboris tempor deserunt enim eu voluptate sint commodo quis. Consequat sit excepteur aliquip quis laboris. Consectetur fugiat cupidatat exercitation sunt dolore duis ullamco exercitation consectetur.",
                imgSrc: ""
            },
            {
                nombre: "Curso 3",
                descripcion: "Dolore in mollit irure eu excepteur ullamco Lorem. Exercitation quis et cillum aliquip adipisicing eu exercitation proident id et amet. Do eu aliqua magna exercitation anim. Velit exercitation tempor veniam cupidatat minim ut aliqua mollit.",
                imgSrc: ""
            },
            {
                nombre: "Curso 4",
                descripcion: "Elit commodo aute sint ex id mollit occaecat do non anim ad ullamco. Ullamco qui ut ipsum ea velit proident irure exercitation ipsum in ea. Nostrud ea voluptate nostrud enim tempor ad qui aliqua officia voluptate cupidatat commodo.",
                imgSrc: ""
            },
            {
                nombre: "Curso 5",
                descripcion: "Est tempor laboris cupidatat consequat. Laboris dolore cupidatat tempor nulla qui consequat enim labore sit laboris laboris voluptate. Velit commodo elit dolore aute laboris enim esse. Consequat commodo mollit nostrud magna pariatur esse mollit pariatur exercitation excepteur nostrud nostrud cupidatat.",
                imgSrc: ""
            }
        ];
        cursos.forEach(curso => {
            this.state.cursosSugeridos.push(curso);
        });
        this.setState({
            didRutaLoad: true
        });
    }

    render() {
        if (this.state.irSiguientePaso) {
            return <Redirect to={{
                pathname: `/${this.pasosRoutes[this.state.pasoActual]}`,
                state: {
                    tipoUsuario: "DOCENTE"
                }
            }} />;
        }

        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <Grid container spacing={4} justify="center">
                <Grid item xs={12}>
                    <Typography variant="h5"><T phrase="dashboardDocente.proceso-actual"/></Typography>
                    <Stepper activeStep={this.state.pasoActual} alternativeLabel className="my-4">
                        <Step key="Registro">
                            <StepLabel>{this.pasosNames[0]}</StepLabel>
                        </Step>
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
                    {
                        this.state.pasoActual < 5 ? 
                            <Button variant="contained" size="large" color="primary" onClick={this.siguientePaso}><T phrase="dashboardDocente.label-continuar"/>&nbsp;<strong>{this.pasosNames[this.state.pasoActual]}</strong></Button>
                        : <Typography variant="body1" color="primary"><strong><T phrase="dashboardDocente.mensaje-terminado"/></strong></Typography>
                    }
                </Grid>
                <Grid item xs={12}>
                    <hr className="my-3"/>
                </Grid>
                <Grid item xs={12} sm={8} lg={9}>
                    <Typography variant="h5" className="mb-4"><T phrase="dashboardDocente.diagnostico"/></Typography>
                    {
                        this.state.pasoActual > 1 ? (
                            <Grid container>
                                {
                                    this.state.didEstadisticasLoad ? (
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6" className="mb-4"><T phrase="dashboardDocente.resultados-pruebas"/></Typography>
                                                <Bar height={80} data={{
                                                    labels: ["Prueba de conocimiento"],
                                                    datasets: [
                                                        {
                                                            label: "Correctas",
                                                            data: [this.state.estadisticas.pruebaConocimiento.correctas],
                                                            borderWidth: 0,
                                                            backgroundColor: [
                                                                "#3f51b5"
                                                            ]
                                                        },
                                                        {
                                                            label: "Incorrectas",
                                                            data: [this.state.estadisticas.pruebaConocimiento.incorrectas],
                                                            borderWidth: 0,
                                                            backgroundColor: [
                                                                "#f44336"
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
                                                            backgroundColor: "rgba(63,81,181, .5)",
                                                            pointBackgroundColor: "#3f51b5",
                                                            borderColor: "#3f51b5"
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
                                                            backgroundColor: "rgba(63,81,181, .5)",
                                                            pointBackgroundColor: "#3f51b5",
                                                            borderColor: "#3f51b5"
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
                                            <Typography variant="h6" className="mb-4"><T phrase="dashboardDocente.ruta"/></Typography>
                                            <RutaAprendizaje cursos={this.state.cursosSugeridos} />
                                        </Grid>
                                    ) : (
                                        <CircularProgress color="primary" className="mx-auto" />
                                    )
                                }
                            </Grid>
                        ) : (
                            <Typography variant="body1" color="primary"><strong><T phrase="dashboardDocente.no-data"/></strong></Typography>
                        )
                    }
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                    <Typography variant="h5" className="mb-1"><T phrase="dashboardDocente.acciones"/></Typography>
                    <Link to={{
                        pathname: "/registro",
                        state: {
                            tipoUsuario: "DOCENTE"
                        }
                    }} style={{textDecoration: "none"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            className="mt-3"
                            size="medium"
                        ><T phrase="dashboardDocente.btn-registro"/></Button>
                    </Link>
                    <Link to={{
                        pathname: "/prueba",
                        state: {
                            tipoUsuario: "DOCENTE"
                        }
                    }} style={{textDecoration: "none"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            className="mt-3"
                            size="medium"
                        ><T phrase="dashboardDocente.btn-prueba"/></Button>
                    </Link>
                    <Link to={{
                        pathname: "/practicas",
                        state: {
                            tipoUsuario: "DOCENTE"
                        }
                    }} style={{textDecoration: "none"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            className="mt-3"
                            size="medium"
                        ><T phrase="dashboardDocente.btn-practica"/></Button>
                    </Link>
                    <Link to={{
                        pathname: "/preentrevista",
                        state: {
                            tipoUsuario: "DOCENTE"
                        }
                    }} style={{textDecoration: "none"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            className="mt-3"
                            size="medium"
                        ><T phrase="dashboardDocente.btn-preentrevista"/></Button>
                    </Link>
                    <Link to={{
                        pathname: "/entrevista",
                        state: {
                            tipoUsuario: "DOCENTE"
                        }
                    }} style={{textDecoration: "none"}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="default"
                            className="mt-3"
                            size="medium"
                        ><T phrase="dashboardDocente.btn-entrevista"/></Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}

export default DashboardDocente;