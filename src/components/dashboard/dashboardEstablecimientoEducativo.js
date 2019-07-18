import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut } from "react-chartjs-2";

import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";
import VisorPerfiles from "../visorPerfiles/visorperfiles";
import moment from "moment";
import pasos from "../../models/pasos";

class DashboardExtablecimientoEducativo extends Component {
    constructor() {
        super();
        
        this.state = {
            datosID: "establecimiento-1",
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
            cuentaNoIngreso: 0
        }

        /* Conectarse al backend para traer el índice de apropiación y los perfiles asociados a este EE por su datosID */
        this.mockPerfiles = [
            {
                perfilID: "docente-1",
                nombre: "Pariatur ea excepteur elit",
                pasoActual: 2,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-2",
                nombre: "Nulla labore velit est id",
                pasoActual: 0,
                imgSrc: "",
                ultimoIngreso: ""
            },
            {
                perfilID: "docente-3",
                nombre: "Laborum adipisicing enim",
                pasoActual: 3,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-4",
                nombre: "Incididunt cupidatat irure",
                pasoActual: 1,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-5",
                nombre: "Sunt quis aute",
                pasoActual: 4,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-6",
                nombre: "Laborum culpa in",
                pasoActual: 5,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-7",
                nombre: "Pariatur ea excepteur elit",
                pasoActual: 2,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-8",
                nombre: "Pariatur ea excepteur elit",
                pasoActual: 2,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-9",
                nombre: "Pariatur ea excepteur elit",
                pasoActual: 2,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            },
            {
                perfilID: "docente-10",
                nombre: "Pariatur ea excepteur elit",
                pasoActual: 5,
                imgSrc: "",
                ultimoIngreso: moment().unix()
            }
        ];
    }

    componentDidMount() {
        this.setState({
            didPerfilesLoad: true,
            perfiles: [...this.mockPerfiles],
            indiceApropiacion: 2
        });

        this.cargarRuta();
        this.calcularNoIngresos();
        this.calcularNumDivisionesPerfiles();
        this.dividirPerfiles();
    }

    calcularNumDivisionesPerfiles = () => {
        const numDivisiones = Math.ceil(this.mockPerfiles.length/4);
        
        this.setState({
            numDivisionesPerfiles: numDivisiones
        });

        if (numDivisiones > 1) {
            this.setState({
                hasNextPerfiles: true
            });
        }
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

    dividirPerfiles = () => {
        const numDivisiones = Math.ceil(this.mockPerfiles.length/4);
        for (let i = 0; i < numDivisiones; i++) {
            const divisionArray = this.mockPerfiles.slice(0, 4);
            this.state.perfilesDivididos.push(divisionArray);
            this.mockPerfiles.splice(0, 4);
        }

        this.setState({
            perfilesMostrados: this.state.perfilesDivididos[0]
        });
    }

    calcularNoIngresos = () => {
        this.mockPerfiles.forEach(perfil => {
			if (perfil.ultimoIngreso === "") {
				this.setState({
                    cuentaNoIngreso: this.state.cuentaNoIngreso += 1
                });
			}
		});
    }

    checkCurrentDivisionPerfiles = () => {
        if (this.state.currentDivisionPerfiles > 0) {
            this.setState({
                hasPreviousPerfiles: true
            });
        } else {
            this.setState({
                hasPreviousPerfiles: false
            });
        }
        if (this.state.currentDivisionPerfiles === this.state.numDivisionesPerfiles - 1) {
            this.setState({
                hasNextPerfiles: false
            });
        } else {
            this.setState({
                hasNextPerfiles: true
            });
        }
        /* console.log(this.state.currentDivisionPerfiles, this.state.numDivisionesPerfiles);
        console.log(this.state.perfilesDivididos); */
    }

    cargarAnterioresPerfiles = () => {
        if (this.state.currentDivisionPerfiles > 0) {
            this.setState({
                perfilesMostrados: this.state.perfilesDivididos[this.state.currentDivisionPerfiles -= 1]
            });
        }

        this.checkCurrentDivisionPerfiles();
    }
    
    cargarSiguientesPerfiles = () => {
        if (this.state.currentDivisionPerfiles < this.state.numDivisionesPerfiles - 1) {
            this.setState({
                perfilesMostrados: this.state.perfilesDivididos[this.state.currentDivisionPerfiles += 1]
            });
        }

        this.checkCurrentDivisionPerfiles();
    }

    render() {
        return (
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<Typography variant="h5">
						Estado de docentes
					</Typography>
                    <hr/>
				</Grid>
				<Grid item xs={12} md={7}>
					{this.state.didPerfilesLoad ? (
                        <React.Fragment>
                            <VisorPerfiles perfiles={this.state.perfilesMostrados} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    {
                                        this.state.perfiles.length > 4 ? (
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                color="primary"
                                                className="mt-3"
                                                size="medium"
                                            >Ver todos</Button>
                                        ) : ""
                                    }
                                </Grid>
                                <Grid item xs={6} className="text-right">
                                    {
                                        this.state.hasPreviousPerfiles ? (
                                            <Button
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                className="mt-3"
                                                size="medium"
                                                onClick={this.cargarAnterioresPerfiles}
                                            >◀ Anteriores</Button>
                                        ) : ""
                                    }
                                    {
                                        this.state.hasNextPerfiles ? (
                                            <Button
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                className="mt-3 ml-3"
                                                size="medium"
                                                onClick={this.cargarSiguientesPerfiles}
                                            >Siguientes ▶</Button>
                                        ) : ""
                                    }
                                </Grid>
                            </Grid>
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
                                <Typography component="p">Índice de apropiación TIC</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className="p-4 text-center mb-5">
                                <Typography variant="h3" component="p" className="mb-2">{this.state.perfiles.length}</Typography>
                                <Typography component="p">Docentes</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className="p-4 text-center mb-5">
                                <Typography variant="h3" component="p" className="mb-2">{this.state.cuentaNoIngreso}</Typography>
                                <Typography component="p">Nunca han ingresado</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
					{this.state.didPerfilesLoad ? (
                        <React.Fragment>
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
                                            backgroundColor: ["#3f51b5"]
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
                            <div className="mt-5">
                                <Doughnut height={200} data={() => {
                                    const numPerfilesPasos = [0, 0, 0, 0, 0, 0];
                                    this.state.perfiles.forEach((perfil, i) => {
                                        numPerfilesPasos[perfil.pasoActual] += 1;
                                    });

                                    const doughnutDatasets = [{
                                        data: [],
                                        backgroundColor: ["#5f77ff", "#546bf0", "#4b60d6", "#4357c5", "#4154c0", "#3f51b5"]
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
					<Typography variant="h5">Ruta de aprendizaje sugerida</Typography>
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
		);
    }
}

export default DashboardExtablecimientoEducativo;