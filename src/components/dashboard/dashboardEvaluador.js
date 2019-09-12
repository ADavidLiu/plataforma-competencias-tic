import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { Translation } from "react-i18next";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Bar, Radar, Pie } from "react-chartjs-2";

import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";

class DashboardEvaluador extends Component {
    constructor() {
        super();

        this.state = {
            evaluadorID: "",
            practicas: [],
            preentrevistas: [],
            entrevistas: [],
            estadisticas: {
                asignaciones: [
                    {
                        type: "practicas",
                        percentage: 15
                    },
                    {
                        type: "preentrevistas",
                        percentage: 25
                    },
                    {
                        type: "entrevistas",
                        percentage: 60
                    }
                ]
            }
        }
    }

    componentDidMount = () => {
        /* Conectarse al backend para traer los datos de las prácticas, preentrevistas y entrevistas */
        this.setState({
            evaluadorID: this.props.userID,
            practicas: [
                ...this.state.practicas,
                {
                    docenteID: "docente-1",
                    nombre: "Jane Doe",
                    establecimientoEducativo: "Lorem Ipsum Dolor Sit Amet",
                    imgSrc: "",
                    fechaAsignacion: "22-07-2019"
                },
                {
                    docenteID: "docente-2",
                    nombre: "John Doe",
                    establecimientoEducativo: "Lorem Ipsum Dolor Sit Amet",
                    imgSrc: "",
                    fechaAsignacion: "22-07-2019"
                }
            ],
            preentrevistas: [
                {
                    docenteID: "docente-1",
                    nombre: "Jane Doe",
                    establecimientoEducativo: "Lorem Ipsum Dolor Sit Amet",
                    imgSrc: "",
                    fechaAsignacion: "22-07-2019"
                },
                {
                    docenteID: "docente-2",
                    nombre: "John Doe",
                    establecimientoEducativo: "Lorem Ipsum Dolor Sit Amet",
                    imgSrc: "",
                    fechaAsignacion: "22-07-2019"
                },
                {
                    docenteID: "docente-2",
                    nombre: "Mike Doe",
                    establecimientoEducativo: "Lorem Ipsum Dolor Sit Amet",
                    imgSrc: "",
                    fechaAsignacion: "22-07-2019"
                }
            ],
            entrevistas: [
                {
                    docenteID: "docente-1",
                    nombre: "Jane Doe",
                    establecimientoEducativo: "Lorem Ipsum Dolor Sit Amet",
                    imgSrc: "",
                    fechaAsignacion: "22-07-2019",
                    contacto: {
                        tel: "1234567890",
                        email: "jane.doe@universidad.edu.co"
                    }
                }
            ]
        });
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}>
                                <Grid container>
                                    <Grid item xs={12} className="mb-3">
                                        <Typography variant="h5">{t("procesoPaso.2")}</Typography>
                                        <hr/>
                                    </Grid>
                                    {
                                        this.state.practicas.map((practica, i) => {
                                            return (
                                                <Link key={i} to={{
                                                    pathname: "/practica-revision",
                                                    state: {
                                                        docenteID: practica.docenteID,
                                                        docenteNombre: practica.nombre
                                                    }
                                                }} className="d-block w-100 mb-3" style={{textDecoration: "none"}}>
                                                    <Paper className="p-4">
                                                        <Typography color="textPrimary" variant="body1"><strong>{practica.nombre}</strong></Typography>
                                                        <Typography color="textPrimary" variant="body2" className="my-1">{practica.establecimientoEducativo}</Typography>
                                                        <Typography color="textPrimary" variant="body2">{t("dashboardEvaluador.asignado-revision")} {practica.fechaAsignacion}</Typography>
                                                    </Paper>
                                                </Link>
                                            );
                                        })
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container>
                                    <Grid item xs={12} className="mb-3">
                                        <Typography variant="h5">{t("procesoPaso.3-plural")}</Typography>
                                        <hr/>
                                    </Grid>
                                    {
                                        this.state.preentrevistas.map((preentrevista, i) => {
                                            return (
                                                <Link key={i} to={{
                                                    pathname: "/preentrevista-revision",
                                                    state: {
                                                        docenteID: preentrevista.docenteID,
                                                        docenteNombre: preentrevista.nombre
                                                    }
                                                }} className="d-block w-100 mb-3" style={{textDecoration: "none"}}>
                                                    <Paper className="p-4">
                                                        <Typography color="textPrimary" variant="body1"><strong>{preentrevista.nombre}</strong></Typography>
                                                        <Typography color="textPrimary" variant="body2" className="my-1">{preentrevista.establecimientoEducativo}</Typography>
                                                        <Typography color="textPrimary" variant="body2">{t("dashboardEvaluador.asignado-revision")} {preentrevista.fechaAsignacion}</Typography>
                                                    </Paper>
                                                </Link>
                                            );
                                        })
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container>
                                    <Grid item xs={12} className="mb-3">
                                        <Typography variant="h5">{t("procesoPaso.4-plural")}</Typography>
                                        <hr/>
                                    </Grid>
                                    {
                                        this.state.entrevistas.map((entrevista, i) => {
                                            return (
                                                <Link key={i} to={{
                                                    pathname: "/entrevista-revision",
                                                    state: {
                                                        docenteID: entrevista.docenteID,
                                                        docenteNombre: entrevista.nombre
                                                    }
                                                }} className="d-block w-100 mb-3" style={{textDecoration: "none"}}>
                                                    <Paper className="p-4">
                                                        <Typography color="textPrimary" variant="body1"><strong>{entrevista.nombre}</strong></Typography>
                                                        <Typography color="textPrimary" variant="body2" className="my-1">{entrevista.establecimientoEducativo}</Typography>
                                                        <Typography color="textPrimary" variant="body2">{t("dashboardEvaluador.asignado-revision")} {entrevista.fechaAsignacion}</Typography>
                                                        <hr/>
                                                        <Typography variant="subtitle2" className="mb-2">{t("dashboardEvaluador.datos-contacto")}</Typography>
                                                        <Typography variant="body2" className="mb-2">
                                                            <span style={{color: "#3f51b5", textDecoration: "none"}}><Phone fontSize="inherit" className="mr-2" />{entrevista.contacto.tel}</span>
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            <span style={{color: "#3f51b5", textDecoration: "none"}}><Email fontSize="inherit" className="mr-2" />{entrevista.contacto.email}</span>
                                                        </Typography>
                                                    </Paper>
                                                </Link>
                                            );
                                        })
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12} className="mb-4">
                                        <Typography variant="h5">{t("calificaciones.titulo-actividad")}</Typography>
                                        <hr/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6">{t("dashboardEvaluador.distribucion-asignaciones")}</Typography>
                                                <hr/>
                                                <Pie height={125} data={() => {
                                                    const dataPercentages = [];

                                                    this.state.estadisticas.asignaciones.forEach(asignacion => {
                                                        dataPercentages.push(asignacion.percentage);
                                                    });

                                                    return {
                                                        datasets: [
                                                            {
                                                                data: dataPercentages,backgroundColor: ["#5f77ff", "#4b60d6", "#3f51b5"],
                                                                borderColor: "#FFFFFF"
                                                            }
                                                        ],
                                                        labels: [t("procesoPaso.2"), t("procesoPaso.3-plural"), t("procesoPaso.4-plural")]
                                                    }
                                                }} options={{
                                                    tooltips: {
                                                        enabled: true,
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

                                                                return `${label}: ${percentage}%`;
                                                            }
                                                        }
                                                    },
                                                }} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default DashboardEvaluador;