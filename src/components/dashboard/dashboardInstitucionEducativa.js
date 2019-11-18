import React, { Component } from "react";

import { Translation } from "react-i18next";
import { Redirect } from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut, Radar } from "react-chartjs-2";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import cursos from "../../models/cursos";
import { docentesCargados, establecimientosCargados } from "../../models/perfiles";

import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";
import VisorPerfiles from "../visorPerfiles/visorperfiles";

class DashboardInstitucionEducativa extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institucionID: "",
            cursosSugeridos: [],
            didRutaLoad: false,
            didDocentesLoad: true,
            didEstablecimientosLoad: true,
            isLoading: false,
            numEE: 35,
            numDocentes: 1789,
            indiceApropiacion: 1,
            descriptores: [
                {
                    label: "Incipiente",
                    items: ["I2c", "R1c", "R3c"]
                },
                {
                    label: "En Desarrollo",
                    items: ["I1c", "I3c", "R2c", "E3c"]
                },
                {
                    label: "Establecido",
                    items: ["E1c", "E2c"]
                }
            ],
            niveles: [
                {
                    label: "Integracion",
                    estado: "Bajo",
                    porcentaje: 30
                },
                {
                    label: "Reorientación",
                    estado: "Medio",
                    porcentaje: 30
                },
                {
                    label: "Evolución",
                    estado: "Medio",
                    porcentaje: 40
                }
            ],
            docentes: [...docentesCargados],
            establecimientos: [...establecimientosCargados],
        }
    }

    componentDidMount = () => {
        let infoCargada = {};

        if (this.props[0] && this.props[0].location.state) {
            if (this.props[0].location.state.shouldActivateViewingMode) {
                this.props.updateIsInViewingMode(true, "INSTITUCION");
            }
        }

        if (this.props.location && this.props.location.state !== undefined) {
            infoCargada = {
                institucionID: this.props.location.state.institucionID
            }
        } else {
            infoCargada = {
                institucionID: ""
            }
        }

        this.setState({
            institucionID: infoCargada.institucionID,
        });

        this.cargarRuta();
    }

    cargarRuta = () => {
        const nuevosCursos = [];
        cursos.forEach(curso => {
            nuevosCursos.push(curso);
        });

        this.setState({
            cursosSugeridos: nuevosCursos,
            didRutaLoad: true
        });
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
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5" className="mb-4">{t("dashboardGobierno.general")}</Typography>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={4}>
                                        <Paper className="p-4 text-center">
                                            <Typography variant="h3" component="p" className="mb-2">{this.state.indiceApropiacion}</Typography>
                                            <Typography component="p">{t("dashboardGobierno.indice")}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Paper className="p-4 text-center">
                                            <Typography variant="h3" component="p" className="mb-2">{this.state.numEE}</Typography>
                                            <Typography component="p">{t("dashboardGobierno.establecimientos")}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Paper className="p-4 text-center">
                                            <Typography variant="h3" component="p" className="mb-2">{this.state.numDocentes}</Typography>
                                            <Typography component="p">{t("dashboardGobierno.docentes")}</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" className="mb-3">{t("dashboardGobierno.descriptores")}</Typography>
                                {
                                    this.state.descriptores.map(descriptor => (
                                        <Paper
                                            className="p-3 mb-3"
                                            key={descriptor.label}
                                        >
                                            <Grid container spacing={5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">
                                                        {descriptor.label}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">
                                                        {descriptor.items.map(item => " • " + item)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    ))
                                }
                                <div className="mt-5">
                                    <Typography variant="body1" className="mb-3"><strong>{t("dashboardGobierno.frecuencia-absoluta")}</strong></Typography>
                                    <Bar 
                                        data={{
                                            labels: [t("dashboardGobierno.descriptores")],
                                            datasets: [
                                                {
                                                    label: `${t("incipiente")}`,
                                                    data: [this.state.descriptores[0].items.length],
                                                    borderWidth: 0,
                                                    backgroundColor: ["#009A9C"]
                                                },
                                                {
                                                    label: `${t("en-desarrollo")}`,
                                                    data: [this.state.descriptores[1].items.length],
                                                    borderWidth: 0,
                                                    backgroundColor: ["#009A9C"]
                                                },
                                                {
                                                    label: `${t("establecido")}`,
                                                    data: [this.state.descriptores[2].items.length],
                                                    borderWidth: 0,
                                                    backgroundColor: ["#009A9C"]
                                                }
                                            ]
                                        }}
                                        options={{
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                        beginAtZero: true,
                                                        stepSize: 1
                                                    }
                                                }]
                                            }
                                        }}
                                    />
                                </div>
                                <div className="mt-5">
                                    <Typography variant="body1" className="mb-3"><strong>{t("dashboardGobierno.frecuencia-relativa")}</strong></Typography>
                                    <Doughnut
                                        data={() => {
                                            return {
                                                labels: [`${t("incipiente")}`, `${t("en-desarrollo")}`, `${t("establecido")}`],
                                                datasets: [
                                                    {
                                                        data: [this.state.descriptores[0].items.length, this.state.descriptores[1].items.length, this.state.descriptores[2].items.length],
                                                        backgroundColor: ["#00bdbf", "#00a9ab", "#009A9C"]
                                                    }
                                                ]
                                            }
                                        }}
                                        options={{
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
                                        }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" className="mb-3">{t("dashboardGobierno.niveles")}</Typography>
                                {
                                    this.state.niveles.forEach(nivel => (
                                        <Paper
                                            className="p-3 mb-3"
                                            key={nivel.label}
                                        >
                                            <Grid container spacing={5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">
                                                        {nivel.label}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">
                                                        {nivel.estado}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    ))
                                }
                                <div className="mt-5">
                                    <Typography variant="body1" className="mb-3"><strong>{t("dashboardGobierno.distribucion-relativa")}</strong></Typography>
                                    <Radar height={300} data={{
                                        labels: [`${t("integracion")}`, `${t("reorientacion")}`, `${t("evolucion")}`],
                                        datasets: [{
                                            label: `${t("estado-actual")}`,
                                            data: [this.state.niveles[0].porcentaje, this.state.niveles[1].porcentaje, this.state.niveles[2].porcentaje],
                                            backgroundColor: "rgba(0, 154, 156, .5)",
                                            pointBackgroundColor: "#009A9C",
                                            borderColor: "#009A9C"
                                        }]
                                    }}
                                        options={{
                                            scale: {
                                                ticks: {
                                                    stepSize: 20,
                                                    min: 0,
                                                    max: 100,
                                                    beginAtZero: false
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
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="mb-5" />
                                <Typography variant="h5" className="mb-4">{t("dashboardGobierno.detallada")}</Typography>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" className="mb-1">{t("dashboardGobierno.establecimientos")}</Typography>
                                        <hr className="mb-3" />
                                        {
                                            this.state.didEstablecimientosLoad ? (
                                                <VisorPerfiles tipo="ESTABLECIMIENTOS" numPorPagina={6} perfiles={this.state.establecimientos} />
                                            ) : (
                                                <CircularProgress color="primary" />
                                            )
                                        }
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" className="mb-1">{t("dashboardGobierno.docentes")}</Typography>
                                        <hr className="mb-3" />
                                        {
                                            this.state.didDocentesLoad ? (
                                                <VisorPerfiles tipo="DOCENTES" numPorPagina={2} perfiles={this.state.docentes} />
                                            ) : (
                                                <CircularProgress color="primary" />
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="mb-5" />
                                <Typography variant="h5" className="mb-4">{t("dashboardGobierno.ruta")}</Typography>
                                <RutaAprendizaje cursos={cursos} />
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default DashboardInstitucionEducativa;