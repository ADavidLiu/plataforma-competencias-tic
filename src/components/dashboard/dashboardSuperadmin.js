import React, { Component } from "react";

import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { Bar, Doughnut, Radar } from "react-chartjs-2";

import VisorPerfiles from "../visorPerfiles/visorperfiles";

class DashboardSuperadmin extends Component {
    constructor() {
        super();

        this.state = {
            ubicacionActual: "0",
            subdivisionesActuales: [],
            territorios: [
                {
                    id: "0",
                    nombre: "Todos",
                    numGobiernos: 127,
                    numInstituciones: 935,
                    numEstablecimientos: 1308,
                    numDocentes: 10293,
                    numEvaluadores: 341,
                    data: {
                        niveles: [
                            {
                                label: "Integracion",
                                estado: "Bajo",
                                porcentaje: 80
                            },
                            {
                                label: "Reorientación",
                                estado: "Medio",
                                porcentaje: 15
                            },
                            {
                                label: "Evolución",
                                estado: "Alto",
                                porcentaje: 5
                            }
                        ],
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
                        ]
                    }
                },
                {
                    id: "1",
                    nombre: "Colombia",
                    numGobiernos: 18,
                    numInstituciones: 33,
                    numEstablecimientos: 153,
                    numDocentes: 362,
                    numEvaluadores: 53,
                    data: {
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
                        ],
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
                        ]

                    },
                    subdivisiones: ["2", "3"]
                },
                {
                    id: "2",
                    nombre: "Valle del Cauca",
                    numGobiernos: 9,
                    numInstituciones: 40,
                    numEstablecimientos: 64,
                    numDocentes: 132,
                    numEvaluadores: 25,
                    data: {
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
                        ],
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
                        ]
                    },
                    subdivisiones: ["4"]
                },
                {
                    id: "3",
                    nombre: "Caldas",
                    numGobiernos: 9,
                    numInstituciones: 40,
                    numEstablecimientos: 64,
                    numDocentes: 132,
                    numEvaluadores: 25,
                    data: {
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
                        ],
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
                        ]
                    }
                },
                {
                    id: "4",
                    nombre: "Cali",
                    numGobiernos: 1,
                    numInstituciones: 23,
                    numEstablecimientos: 45,
                    numDocentes: 56,
                    numEvaluadores: 15,
                    data: {
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
                        ],
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
                        ]
                    }
                }
            ]
        }
    }

    handleUbicacionChange = e => {
        this.crearSubdivisionDropdown(e);
    }

    getSubdivisiones = territorioEncontrado => {
        const subdivisionesEncontradas = [];
        if (territorioEncontrado.subdivisiones) {
            territorioEncontrado.subdivisiones.forEach((subdivisionID, i) => {
                this.state.territorios.forEach((territorio, j) => {
                    if (subdivisionID === territorio.id) {
                        subdivisionesEncontradas.push(territorio);
                    }
                });
            });
        }
        return subdivisionesEncontradas;
    }

    crearSubdivisionDropdown = e => {
        let arrayTerritoriosEncontrados = [];
        const territorioEncontrado = this.state.territorios.find(territorio => territorio.id === e.target.value);

        const subdivisionesEncontradas = this.getSubdivisiones(territorioEncontrado);
        arrayTerritoriosEncontrados = [subdivisionesEncontradas];

        this.setState({
            ubicacionActual: e.target.value,
            subdivisionesActuales: arrayTerritoriosEncontrados
        });
    }

    render() {
        const subDropdowns = [];

        if (this.state.subdivisionesActuales.length > 0) {
            this.state.subdivisionesActuales.forEach((subdivision, i) => {
                const menuItems = [];
                subdivision.forEach((territorio, j) => {
                    menuItems.push(
                        <MenuItem key={j} value={territorio.id}>{territorio.nombre}</MenuItem>
                    );
                });

                if (menuItems.length > 0) {
                    subDropdowns.push(
                        <Select
                            key={i}
                            value={this.state.subdivisionesActuales[i][0].id}
                            className="ml-3"
                            onChange={this.handleUbicacionChange}
                            input={<OutlinedInput required/>}
                        >
                            { menuItems }
                        </Select>
                    );
                }
            });
        }
        
        return (
            <Translation>
                {
                    t => (
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <div className="d-flex align-items-center justify-content-start">
                                    <Typography variant="body1">{t("dashboardSuperadmin.viendo-datos")}</Typography>
                                    <Select
                                        className="ml-3"
                                        value={this.state.ubicacionActual}
                                        onChange={this.handleUbicacionChange}
                                        input={<OutlinedInput required name="ubicacionActual"/>}
                                    >
                                        {
                                            this.state.territorios.map(territorio => (
                                                <MenuItem key={territorio.id} value={territorio.id}>{territorio.nombre}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    { subDropdowns }
                                </div>
                                <hr/>
                            </Grid>
                            <Grid item xs={12} md={6}>

                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default DashboardSuperadmin;