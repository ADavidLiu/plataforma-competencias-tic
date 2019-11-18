import React, { Component } from "react";

import { Translation } from "react-i18next";

import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut, Radar } from "react-chartjs-2";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import { docentesCargados, institucionesCargadas, establecimientosCargados, evaluadoresCargados, adminsCargados, gobiernosCargados } from "../../models/perfiles";

import VisorPerfiles from "../visorPerfiles/visorperfiles";

class DashboardAdmin extends Component {
    constructor() {
        super();

        /* Sólo hay 3 divisiones. 0 es el nivel más alto, y 2 es el más bajo. */
        this.state = {
            divisiones: [],
            divisionMostrada: 0,
            subdivisionesDisponibles: [],
            subdivisionSeleccionada: "",
            subdivisionSeleccionadaIndex: 0,
            cursosSugeridos: [],
            didRutaLoad: false,
            didUsersLoad: false,
            docentesSubdivision: [],
            institucionesSubdivision: [],
            establecimientosSubdivision: [],
            adminsSubdivision: [],
            evaluadoresSubdivision: [],
            gobiernosSubdivision: [],
            isLoading: true
        }

        this.timeouts = [];
        this.intervals = [];
        this.currentData = {};
    }

    componentDidMount = () => {
        if (this.props[0] && this.props[0].location.state) {
            if (this.props[0].location.state.shouldActivateViewingMode) {
                this.props.updateIsInViewingMode(true, "ADMIN");
            }
        }

        /* Conectarse al backend para traer la información general de las divisiones */
        this.setState({
            divisiones: [
                {
                    nombre: "Departamental",
                    data: [
                        {
                            titulo: "Colombia",
                            indiceApropiacion: 1,
                            numEE: 108,
                            numDocentes: 4165,
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
                                    porcentaje: 20
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio",
                                    porcentaje: 70
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio",
                                    porcentaje: 10
                                }
                            ]
                        },
                        {
                            titulo: "Valle del Cauca",
                            indiceApropiacion: 1,
                            numEE: 123,
                            numDocentes: 1005,
                            descriptores: [
                                {
                                    label: "Incipiente",
                                    items: ["E1c", "E2c"]
                                },
                                {
                                    label: "En Desarrollo",
                                    items: ["I2c", "R1c", "R3c"]
                                },
                                {
                                    label: "Establecido",
                                    items: ["I1c", "I3c", "R2c", "E3c"]
                                }
                            ],
                            niveles: [
                                {
                                    label: "Integracion",
                                    estado: "Bajo",
                                    porcentaje: 35
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio",
                                    porcentaje: 50
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio",
                                    porcentaje: 15
                                }
                            ]
                        },
                        {
                            titulo: "Cali",
                            indiceApropiacion: 2,
                            numEE: 241,
                            numDocentes: 5612,
                            descriptores: [
                                {
                                    label: "Incipiente",
                                    items: ["I1c", "I3c", "R2c", "E3c"],
                                },
                                {
                                    label: "En Desarrollo",
                                    items: ["E1c", "E2c"]
                                },
                                {
                                    label: "Establecido",
                                    items: ["I2c", "R1c", "R3c"]
                                }
                            ],
                            niveles: [
                                {
                                    label: "Integracion",
                                    estado: "Bajo",
                                    porcentaje: 20
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio",
                                    porcentaje: 75
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio",
                                    porcentaje: 5
                                }
                            ]
                        }
                    ]
                }
            ],
            didUsersLoad: true,
            docentesSubdivision: [...docentesCargados],
            institucionesSubdivision: [...institucionesCargadas],
            establecimientosSubdivision: [...establecimientosCargados],
            gobiernosSubdivision: [...gobiernosCargados],
            adminsSubdivision: [...adminsCargados],
            evaluadoresSubdivision: [...evaluadoresCargados]
        });

        this.cargarDatosDivision(0);
    }

    componentDidUpdate = () => {
        this.updateCurrentData();
    }

    componentWillUnmount = () => {
        this.timeouts.forEach(timeout => {
            clearTimeout(timeout);
        });
        this.intervals.forEach(interval => {
            clearInterval(interval);
        });
    }

    updateCurrentData = () => {
        this.currentData = this.state.divisiones[this.state.divisionMostrada].data;
    }

    handleSubdivisionChange = e => {
        let newIndex = 0;
        this.currentData.forEach((subdivision, i) => {
            if (subdivision.titulo === e.target.value) {
                newIndex = i;
            }
        });

        /* Conectarse al backend para traer los establecimientos y docentes */
        this.setState({
            subdivisionSeleccionada: e.target.value,
            subdivisionSeleccionadaIndex: newIndex
        });
    }

    cargarDatosDivision = nuevaDivisionIndex => {
        /* Simulando un delay al traer los datos del backend, para ver la animación de carga. */
        const timeout = setTimeout(() => {
            const newSubdivisionesDisponibles = this.currentData.map(subdivision => {
                return subdivision.titulo;
            });

            this.setState({
                isLoading: false,
                subdivisionesDisponibles: newSubdivisionesDisponibles,
                subdivisionSeleccionada: this.state.divisiones[nuevaDivisionIndex].data[0].titulo,
                subdivisionSeleccionadaIndex: 0,
            });

            clearTimeout(timeout);
        }, 500);
        this.timeouts.push(timeout);
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
                            {!this.state.isLoading ? (
                                <React.Fragment>
                                    <Grid item xs={12}>
                                    <Paper className="p-3 p-md-5">
                                    <Grid container spacing={5}>

                                    <Grid item xs={12}>
                                        <Typography component="h1" variant="h5" className="mb-4">{t("dashboardSuperadmin.datos")}</Typography>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <Typography variant="body1" className="mr-3">{t("dashboardGobierno.division")}</Typography>
                                            <FormControl variant="filled" className="col-6 col-md-auto">
                                                <Select
                                                    value={this.state.subdivisionSeleccionada}
                                                    onChange={this.handleSubdivisionChange}
                                                    variant="filled"
                                                    input={<OutlinedInput required name="subdivisionSeleccionada" id="modalidadTrabajoActividad"/>}
                                                >
                                                    {
                                                        this.state.subdivisionesDisponibles.map((subdivision, i) => {
                                                            return (
                                                                <MenuItem key={i} value={subdivision}>{subdivision}</MenuItem>
                                                            );
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <hr className="my-4"/>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={4}>
                                                <Paper className="p-4 text-center">
                                                    <Typography variant="h3" component="p" className="mb-2">{this.currentData[this.state.subdivisionSeleccionadaIndex].indiceApropiacion}</Typography>
                                                    <Typography component="p">{t("dashboardGobierno.indice")}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Paper className="p-4 text-center">
                                                    <Typography variant="h3" component="p" className="mb-2">{this.currentData[this.state.subdivisionSeleccionadaIndex].numEE}</Typography>
                                                    <Typography component="p">{t("dashboardGobierno.establecimientos")}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Paper className="p-4 text-center">
                                                    <Typography variant="h3" component="p" className="mb-2">{this.currentData[this.state.subdivisionSeleccionadaIndex].numDocentes}</Typography>
                                                    <Typography component="p">{t("dashboardGobierno.docentes")}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" className="mb-3">{t("dashboardGobierno.descriptores")}</Typography>
                                        {
                                            this.currentData.forEach((division, i) => {
                                                if (division.titulo === this.state.subdivisionSeleccionada) {
                                                    const descriptores = [];
                                                    division.descriptores.forEach(descriptor => {
                                                        descriptores.push(
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
                                                        );
                                                    });
                                                    return descriptores;
                                                }
                                            })
                                        }
                                        <div className="mt-5">
                                            <Typography variant="body1" className="mb-3"><strong>{t("dashboardGobierno.frecuencia-absoluta")}</strong></Typography>
                                            <Bar 
                                                data={{
                                                    labels: [t("dashboardGobierno.descriptores")],
                                                    datasets: [
                                                        {
                                                            label: `${t("incipiente")}`,
                                                            data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[0].items.length],
                                                            borderWidth: 0,
                                                            backgroundColor: ["#009A9C"]
                                                        },
                                                        {
                                                            label: `${t("en-desarrollo")}`,
                                                            data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[1].items.length],
                                                            borderWidth: 0,
                                                            backgroundColor: ["#009A9C"]
                                                        },
                                                        {
                                                            label: `${t("establecido")}`,
                                                            data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[2].items.length],
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
                                                                data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[0].items.length, this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[1].items.length, this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[2].items.length],
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
                                            this.currentData.forEach((division, i) => {
                                                if (division.titulo === this.state.subdivisionSeleccionada) {
                                                    const niveles = [];
                                                    division.niveles.forEach(nivel => {
                                                        niveles.push(
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
                                                        );
                                                    });
                                                    return niveles;
                                                }
                                            })
                                        }
                                        <div className="mt-5">
                                            <Typography variant="body1" className="mb-3"><strong>{t("dashboardGobierno.distribucion-relativa")}</strong></Typography>
                                            <Radar height={300} data={{
                                                labels: [`${t("integracion")}`, `${t("reorientacion")}`, `${t("evolucion")}`],
                                                datasets: [{
                                                    label: `${t("estado-actual")}`,
                                                    data: [this.currentData[this.state.subdivisionSeleccionadaIndex].niveles[0].porcentaje, this.currentData[this.state.subdivisionSeleccionadaIndex].niveles[1].porcentaje, this.currentData[this.state.subdivisionSeleccionadaIndex].niveles[2].porcentaje],
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
                                    
                                    </Grid>
                                    </Paper>
                                    </Grid>

                                    <Grid item xs={12}>
                                    <Paper className="p-3 p-md-5">
                                    <Grid container spacing={5}>

                                    <Grid item xs={12}>
                                        <Typography variant="h5" className="mb-4">{t("dashboardSuperadmin.usuarios")}</Typography>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" className="mb-1">{t("evaluadores")}</Typography>
                                                <hr className="mb-3" />
                                                {
                                                    this.state.didUsersLoad ? (
                                                        <VisorPerfiles tipo="EVALUADORES" numPorPagina={6} perfiles={this.state.evaluadoresSubdivision} />
                                                    ) : (
                                                        <CircularProgress color="primary" />
                                                    )
                                                }
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" className="mb-1">{t("gobiernos")}</Typography>
                                                <hr className="mb-3" />
                                                {
                                                    this.state.didUsersLoad ? (
                                                        <VisorPerfiles tipo="GOBIERNOS" numPorPagina={6} perfiles={this.state.gobiernosSubdivision} />
                                                    ) : (
                                                        <CircularProgress color="primary" />
                                                    )
                                                }
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" className="mb-1">{t("instituciones")}</Typography>
                                                <hr className="mb-3" />
                                                {
                                                    this.state.didUsersLoad ? (
                                                        <VisorPerfiles tipo="INSTITUCIONES" numPorPagina={6} perfiles={this.state.institucionesSubdivision} />
                                                    ) : (
                                                        <CircularProgress color="primary" />
                                                    )
                                                }
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" className="mb-1">{t("establecimientos")}</Typography>
                                                <hr className="mb-3" />
                                                {
                                                    this.state.didUsersLoad ? (
                                                        <VisorPerfiles tipo="ESTABLECIMIENTOS" numPorPagina={6} perfiles={this.state.establecimientosSubdivision} />
                                                    ) : (
                                                        <CircularProgress color="primary" />
                                                    )
                                                }
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h6" className="mb-1">{t("dashboardGobierno.docentes")}</Typography>
                                                <hr className="mb-3" />
                                                {
                                                    this.state.didUsersLoad ? (
                                                        <VisorPerfiles tipo="DOCENTES" numPorPagina={2} perfiles={this.state.docentesSubdivision} />
                                                    ) : (
                                                        <CircularProgress color="primary" />
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    </Grid>
                                    </Paper>
                                    </Grid>
                                </React.Fragment>
                            ) : (
                                <Grid item xs={12} className="text-center">
                                    <CircularProgress color="primary" />
                                </Grid>
                            )}
                        </Grid>
                    )
                }
            </Translation>
		);
    }
}

export default DashboardAdmin;