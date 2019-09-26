import React, { Component } from "react";

import { Translation } from "react-i18next";
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut, Radar } from "react-chartjs-2";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import cursos from "../../models/cursos";
import { docentesCargados, institucionesCargadas } from "../../models/perfiles";

import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";
import VisorPerfiles from "../visorPerfiles/visorperfiles";

class DashboardGobierno extends Component {
    constructor() {
        super();

        /* Sólo hay 3 divisiones. 0 es el nivel más alto, y 2 es el más bajo. */
        this.state = {
            gobiernoID: "",
            divisiones: [],
            divisionMostrada: 0,
            subdivisionesDisponibles: [],
            subdivisionSeleccionada: "",
            subdivisionSeleccionadaIndex: 0,
            cursosSugeridos: [],
            didRutaLoad: false,
            didDocentesLoad: false,
            didEstablecimientosLoad: false,
            docentesSubdivision: [],
            institucionesSubdivision: [],
            isLoading: true
        }

        this.timeouts = [];
        this.intervals = [];
        this.currentData = {};
    }

    componentDidMount = () => {
        let infoCargada = {};

        if (this.props.location && this.props.location.state !== undefined) {
            infoCargada = {
                gobiernoID: this.props.location.state.gobiernoID
            }
        } else {
            infoCargada = {
                gobiernoID: ""
            }
        }

        this.setState({
            institucionID: infoCargada.institucionID,
        });

        /* Conectarse al backend para traer la información general de las divisiones */
        this.setState({
            gobiernoID: infoCargada.gobiernoID,
            divisiones: [
                {
                    nombre: "Nacional",
                    data: [
                        {
                            titulo: "Colombia",
                            indiceApropiacion: 1,
                            numEE: 547,
                            numDocentes: 9571,
                            descriptores: [
                                {
                                    label: "Incipiente",
                                    items: ["I1c", "I3c", "R2c", "E3c"]
                                },
                                {
                                    label: "En Desarrollo",
                                    items: ["I2c", "R1c", "R3c"]
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
                                    porcentaje: 40
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio",
                                    porcentaje: 50
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio",
                                    porcentaje: 10
                                }
                            ]
                        }
                    ]
                },
                {
                    nombre: "Departamental",
                    data: [
                        {
                            titulo: "Valle del Cauca",
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
                            titulo: "Antioquia",
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
                            titulo: "Cundinamarca",
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
                },
                {
                    nombre: "Municipal",
                    data: [
                        {
                            titulo: "Cali",
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
                            ]
                        },
                        {
                            titulo: "Medellín",
                            indiceApropiacion: 2,
                            numEE: 38,
                            numDocentes: 2184,
                            descriptores: [
                                {
                                    label: "Incipiente",
                                    items: ["I2c", "R1c", "R3c"]
                                },
                                {
                                    label: "En Desarrollo",
                                    items: ["E1c", "E2c"]
                                    
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
                                    porcentaje: 50
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio",
                                    porcentaje: 25
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio",
                                    porcentaje: 25
                                }
                            ]
                        },
                        {
                            titulo: "Bogotá",
                            indiceApropiacion: 3,
                            numEE: 51,
                            numDocentes: 3470,
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
                                    porcentaje: 33
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio",
                                    porcentaje: 33
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio",
                                    porcentaje: 34
                                }
                            ]
                        }
                    ]
                }
            ],
            didDocentesLoad: true,
            docentesSubdivision: [...docentesCargados],
            didEstablecimientosLoad: true,
            institucionesSubdivision: [...institucionesCargadas]
        });

        this.cargarDatosDivision(0);
        this.cargarRuta();
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

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue,
            isLoading: true
        });

        this.timeouts.forEach(timeout => {
            clearTimeout(timeout);
        });

        this.cargarDatosDivision(newValue);
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <Translation>
                {
                    t => (
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Paper>
                                    <Tabs
                                        indicatorColor="primary"
                                        textColor="primary"
                                        value={this.state.divisionMostrada}
                                        onChange={this.handleTabChange}
                                    >
                                        {this.state.divisiones.map(division => {
                                            return (
                                                <Tab
                                                    key={division.nombre}
                                                    label={division.nombre}
                                                />
                                            );
                                        })}
                                    </Tabs>
                                </Paper>
                            </Grid>
                            {!this.state.isLoading ? (
                                <React.Fragment>
                                    <Grid item xs={12}>
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
                                        <hr/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" className="mb-4">{t("dashboardGobierno.general")}</Typography>
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
                                                            backgroundColor: ["#3f51b5"]
                                                        },
                                                        {
                                                            label: `${t("en-desarrollo")}`,
                                                            data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[1].items.length],
                                                            borderWidth: 0,
                                                            backgroundColor: ["#3f51b5"]
                                                        },
                                                        {
                                                            label: `${t("establecido")}`,
                                                            data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[2].items.length],
                                                            borderWidth: 0,
                                                            backgroundColor: ["#3f51b5"]
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
                                                                backgroundColor: ["#5f77ff", "#4b60d6", "#3f51b5"]
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
                                                    backgroundColor: "rgba(63,81,181, .5)",
                                                    pointBackgroundColor: "#3f51b5",
                                                    borderColor: "#3f51b5"
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
                                                        <VisorPerfiles tipo="INSTITUCIONES" numPorPagina={6} perfiles={this.state.institucionesSubdivision} />
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
                                                        <VisorPerfiles tipo="DOCENTES" numPorPagina={2} perfiles={this.state.docentesSubdivision} />
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

export default DashboardGobierno;