import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut } from "react-chartjs-2";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class DashboardGobierno extends Component {
    constructor() {
        super();

        /* Sólo hay 3 divisiones. 0 es el nivel más alto, y 3 es el más bajo. */
        this.state = {
            divisiones: [],
            divisionMostrada: 0,
            subdivisionesDisponibles: [],
            subdivisionSeleccionada: "",
            subdivisionSeleccionadaIndex: 0,
            isLoading: true
        }

        this.timeouts = [];
        this.currentData = {};
    }

    componentDidMount = () => {
        /* Conectarse al backend para traer la información general de las divisiones */
        this.setState({
            divisiones: [
                {
                    nombre: "Nacional",
                    data: [
                        {
                            titulo: "Colombia",
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
                                    estado: "Bajo"
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio"
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio"
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
                                    estado: "Bajo"
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio"
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio"
                                }
                            ]
                        },
                        {
                            titulo: "Antioquia",
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
                                    estado: "Bajo"
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio"
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio"
                                }
                            ]
                        },
                        {
                            titulo: "Cundinamarca",
                            descriptores: [
                                {
                                    label: "Incipiente",
                                    items: ["I1c", "I3c", "R2c", "E3c"]
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
                                    estado: "Bajo"
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio"
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio"
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
                                    estado: "Bajo"
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio"
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio"
                                }
                            ]
                        },
                        {
                            titulo: "Medellín",
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
                                    estado: "Bajo"
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio"
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio"
                                }
                            ]
                        },
                        {
                            titulo: "Bogotá",
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
                                    estado: "Bajo"
                                },
                                {
                                    label: "Reorientación",
                                    estado: "Medio"
                                },
                                {
                                    label: "Evolución",
                                    estado: "Medio"
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        this.cargarDatosDivision(0);
    }

    componentDidUpdate = () => {
        this.updateCurrentData();
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
                subdivisionSeleccionada: this.state.divisiones[nuevaDivisionIndex].data[0].titulo
            });

            clearTimeout(timeout);
        }, 1000);
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
        return (
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
                                <Typography variant="body1" className="mr-3">Actualmente viendo datos de:</Typography>
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
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" className="mb-3">Estado de descriptores</Typography>
                            {
                                this.currentData.map((division, i) => {
                                    if (division.titulo === this.state.subdivisionSeleccionada) {
                                        const descriptores = [];
                                        division.descriptores.map(descriptor => {
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
                                                                {descriptor.items.map(item => item + ", ")}
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
                            <Bar 
                                data={{
                                    labels: ["Estado de descriptores"],
                                    datasets: [
                                        {
                                            label: "Incipiente",
                                            data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[0].items.length],
                                            borderWidth: 0,
                                            backgroundColor: ["#3f51b5"]
                                        },
                                        {
                                            label: "En Desarrollo",
                                            data: [this.currentData[this.state.subdivisionSeleccionadaIndex].descriptores[1].items.length],
                                            borderWidth: 0,
                                            backgroundColor: ["#3f51b5"]
                                        },
                                        {
                                            label: "Establecido",
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" className="mb-3">Estado de niveles</Typography>
                            {
                                this.currentData.map((division, i) => {
                                    if (division.titulo === this.state.subdivisionSeleccionada) {
                                        const niveles = [];
                                        division.niveles.map(nivel => {
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
                        </Grid>
                    </React.Fragment>
				) : (
					<Grid item xs={12} className="text-center">
						<CircularProgress color="primary" />
					</Grid>
				)}
			</Grid>
		);
    }
}

export default DashboardGobierno;