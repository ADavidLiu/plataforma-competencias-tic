import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";

class DashboardEvaluador extends Component {
    constructor() {
        super();

        this.state = {
            evaluadorID: "",
            practicas: [],
            preentrevistas: [],
            entrevistas: []
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
            <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                    <Grid container>
                        <Grid item xs={12} className="mb-3">
                            <Typography variant="h5">Prácticas educativas</Typography>
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
                                            <Typography color="textPrimary" variant="body2">Asignado para revisión el: {practica.fechaAsignacion}</Typography>
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
                            <Typography variant="h5">Pre-entrevistas</Typography>
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
                                            <Typography color="textPrimary" variant="body2">Asignado para revisión el: {preentrevista.fechaAsignacion}</Typography>
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
                            <Typography variant="h5">Entrevistas</Typography>
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
                                            <Typography color="textPrimary" variant="body2">Asignado para revisión el: {entrevista.fechaAsignacion}</Typography>
                                            <hr/>
                                            <Typography variant="subtitle2" className="mb-2">Datos de contacto</Typography>
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
                        <Grid item xs={12}>
                            <Typography variant="h5">Mi actividad</Typography>
                            <hr/>
                        </Grid>
                        <Grid item xs={12}>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default DashboardEvaluador;