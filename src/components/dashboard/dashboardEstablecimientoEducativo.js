import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut } from "react-chartjs-2";

import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";
import VisorPerfiles from "../visorPerfiles/visorperfiles";

import pasos from "../../models/pasos";
import cursos from "../../models/cursos";
import { docentesCargados } from "../../models/perfiles";

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
    }

    componentDidMount() {
        /* Conectarse al backend para traer el índice de apropiación y los perfiles asociados a este EE por su datosID */
        this.setState({
            didPerfilesLoad: true,
            perfiles: [...docentesCargados],
            indiceApropiacion: 2
        });

        this.cargarRuta();
        this.calcularNoIngresos();
        this.calcularNumDivisionesPerfiles();
        this.dividirPerfiles();
    }

    calcularNumDivisionesPerfiles = () => {
        const numDivisiones = Math.ceil(docentesCargados.length/4);
        
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
        const nuevosCursos = [];
        cursos.forEach(curso => {
            nuevosCursos.push(curso);
        });

        this.setState({
            cursosSugeridos: nuevosCursos,
            didRutaLoad: true
        });
    }

    dividirPerfiles = () => {
        const copiaDocentes = [...docentesCargados];
        const numDivisiones = Math.ceil(docentesCargados.length/4);
        for (let i = 0; i < numDivisiones; i++) {
            const divisionArray = docentesCargados.slice(0, 4);
            this.state.perfilesDivididos.push(divisionArray);
            copiaDocentes.splice(0, 4);
        }

        this.setState({
            perfilesMostrados: this.state.perfilesDivididos[0]
        });
    }

    calcularNoIngresos = () => {
        docentesCargados.forEach(perfil => {
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
                            <Typography variant="h6" className="mb-3">Estado general de procesos</Typography>
                            <Typography variant="body1"><strong>Frecuencia absoluta</strong></Typography>
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
                            <div className="mt-4">
                                <Typography variant="body1"><strong>Frecuencia relativa</strong></Typography>
                                <hr className="mt-2 mb-4"/>
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