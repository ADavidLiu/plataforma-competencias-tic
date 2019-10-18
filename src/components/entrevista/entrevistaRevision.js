import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmacionSalir from "../modales/confirmacionSalir";

class EntrevistaRevision extends Component {
    constructor() {
        super();

        this.state = {
            docenteID: "",
            docenteNombre: "",
            docenteImg: "",
            preguntas: [],
            calificaciones: [],
            isGraded: false,
            isEnviado: false
        }
    }

    cargarDatos = () => {
        /* Conectarse al backend */
        const dataCargada = [
            {
                descriptores: ["E1ub"],
                definicion: "Como consecuencia de la incorporación de las TIC propone cambios significativos en otros escenarios educativos replicando contenidos, actividades y/o evaluaciones.",
                respuestaOriginal: "Ipsum culpa laboris sit pariatur sunt aliqua id esse consequat ut commodo. Ad nostrud magna proident non voluptate magna ullamco. Non sit aliquip aute consectetur Lorem culpa. Laborum culpa amet et est voluptate adipisicing. Ex minim nulla in labore cupidatat amet voluptate sunt eu eu. Consectetur ullamco esse dolore elit deserunt et.",
                evidencia: "Ejemplo de modificaciones de otros escenarios educativos."
            },
            {
                descriptores: ["I1ta"],
                definicion: "Durante el diseño de escenarios educativos adiciona, suprime y reorganiza las herramientas TIC para facilitar la presentación de contenidos, el almacenamiento, la comunicación, la transmisión e intercambio de información y el acceso y búsqueda de información de calidad, considerando sugerencias (grupos de apoyo, colegas y estudiantes, etc.).",
                respuestaOriginal: "Ipsum laborum esse aliqua esse occaecat id dolor enim deserunt tempor aliqua aliqua labore. Qui pariatur ut mollit sit labore mollit cillum sint eiusmod. Dolor cupidatat minim labore est.",
                evidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad."
            }
        ]

        let infoCargada = {};

        if (this.props[0].location.state === undefined) {
            infoCargada = {
                docenteID: "",
                docenteNombre: "",
                docenteImg: "",
            }
        } else {
            infoCargada = {
                docenteID: this.props[0].location.state.docenteID,
                docenteNombre: this.props[0].location.state.docenteNombre,
                docenteImg: this.props[0].location.state.docenteImg,
            }
        }

        if (infoCargada.docenteImg === "") {
            infoCargada.docenteImg = "https://via.placeholder.com/500";
        }

        this.setState({
            docenteID: infoCargada.docenteID,
            docenteNombre: infoCargada.docenteNombre,
            docenteImg: infoCargada.docenteImg,
            preguntas: [
                ...this.state.preguntas,
                ...dataCargada
            ]
        });
    }

    componentDidMount = () => {
        this.cargarDatos();
    }

    handleChange = (e, index, descriptores) => {
        const nuevasCalificaciones = [...this.state.calificaciones];
        let newState = false;

        nuevasCalificaciones[index] = {
            descriptores: descriptores,
            calificacion: e.target.value
        }

        if (nuevasCalificaciones.length === this.state.preguntas.length) {
            newState = true;
        }

        this.setState({
            calificaciones: nuevasCalificaciones,
            isGraded: newState
        });
    }

    enviar = () => {
        if (this.state.calificaciones.length === this.state.preguntas.length) {
            this.setState({
                isEnviado: true
            });
            console.log("Enviado");
        }
    }

    render() {
        if (this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("titulo.entrevista-revision")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            {
                                !this.props[0].location.state.shouldActivateViewingMode ? (
                                    <NavigationPrompt when={!this.state.isEnviado}>
                                        {
                                            ({ onConfirm, onCancel }) => (
                                                <ConfirmacionSalir onConfirm={onConfirm} onCancel={onCancel}/>
                                            )
                                        }
                                    </NavigationPrompt>
                                ) : null
                            }
                            <Grid container spacing={5} justify="center">
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <Avatar alt={t("imagen-perfil")} src={this.state.docenteImg} className="mr-3" style={{height: "60px", width: "60px"}} />
                                                <div>
                                                    <Typography variant="h5" className="mb-2">{t("revision.entrevista-titulo")}</Typography>
                                                    <Typography variant="body1">{t("revision.nombre-evaluado")}: <strong>{this.state.docenteNombre}</strong></Typography>
                                                </div>
                                            </div>
                                            <hr className="mb-4" />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} className="mb-4">
                                        <Grid item xs={12} sm={8} md={9}>
                                            <Typography variant="body1" className="mb-3">{t("revision.entrevista-ayuda")}.</Typography>
                                            <Typography variant="body1">{t("revision.entrevista-ayuda-2")}.</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3}>
                                            <Typography variant="body1" className="mb-2"><strong>{t("revision.calificacion-ayuda")}</strong></Typography>
                                            <Typography variant="body1" className="mb-2"><strong>1: {t("revision.calificacion-nulo-titulo")}</strong> - {t("revision.calificacion-nulo-ayuda")}.</Typography>
                                            <Typography variant="body1" className="mb-2"><strong>2: {t("revision.calificacion-parcial-titulo")}</strong> - {t("revision.calificacion-parcial-ayuda")}.</Typography>
                                            <Typography variant="body1"><strong>3: {t("revision.calificacion-totalmente-titulo")}</strong> - {t("revision.calificacion-totalmente-ayuda")}.</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {
                                                this.state.preguntas.map((pregunta, i) => {
                                                    return (
                                                        <Paper key={i} className="p-4 mb-4">
                                                            <Grid container spacing={5}>
                                                                <Grid item xs={12} sm={!this.props[0].location.state.shouldActivateViewingMode ? 8 : 12} md={!this.props[0].location.state.shouldActivateViewingMode ? 9 : 12}>
                                                                    <Typography variant="body1" className="mb-3"><strong>{t("descriptores")}:</strong> {pregunta.descriptores.map(descriptor => "• " + descriptor)}</Typography>
                                                                    <Typography variant="body1" className="mb-3"><strong>{t("definicion")}:</strong> {pregunta.definicion}</Typography>
                                                                    <Typography variant="body1" className="mb-3"><strong>{t("revision.entrevista-respuesta-original")}:</strong> {pregunta.respuestaOriginal}</Typography>
                                                                    <Typography variant="body1"><strong>{t("revision.entrevista-evidencia")}:</strong> {pregunta.evidencia}</Typography>
                                                                </Grid>
                                                                <Grid item xs={12} className="d-sm-none py-0">
                                                                    <hr/>
                                                                </Grid>
                                                                {
                                                                    !this.props[0].location.state.shouldActivateViewingMode ? (
                                                                        <Grid item xs={12} sm={4} md={3}>
                                                                            <Typography variant="body1" className="mb-3"><strong>{t("revision.entrevista-calificacion")}</strong></Typography>
                                                                            <FormControl variant="outlined" className="w-100">
                                                                                <InputLabel htmlFor={`calificacion-${i}`}>{t("revision.seleccione-valor")}</InputLabel>
                                                                                <Select
                                                                                    required
                                                                                    value={
                                                                                        this.state.calificaciones[i] ? (
                                                                                            this.state.calificaciones[i].calificacion
                                                                                        ) : ""
                                                                                    }
                                                                                    onChange={e => { this.handleChange(e, i, pregunta.descriptores); }}
                                                                                    input={<OutlinedInput name={`calificaciones-${i}`} id="calificacion"/>}
                                                                                >
                                                                                    <MenuItem value={1}>1</MenuItem>
                                                                                    <MenuItem value={2}>2</MenuItem>
                                                                                    <MenuItem value={3}>3</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>
                                                                    ) : null
                                                                }
                                                            </Grid>
                                                        </Paper>
                                                    );
                                                })
                                            }
                                        </Grid>
                                    </Grid>
                                    {
                                        !this.props[0].location.state.shouldActivateViewingMode ? (
                                            <Button variant="contained" color="primary" size="large" fullWidth onClick={this.enviar} disabled={!this.state.isGraded}>{t("enviar")}</Button>
                                        ) : null
                                    }
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.isEnviado}>
                                <DialogTitle>{t("revision.enviada")}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>{t("revision.enviada-ayuda")}.</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Link to="/" style={{textDecoration: "none"}}>
                                        <Button color="primary">{t("volver-inicio")}</Button>
                                    </Link>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default EntrevistaRevision;