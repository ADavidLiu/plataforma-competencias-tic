import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import preguntas from "../../models/encuestas";
import { Link, Redirect } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmacionSalir from "../modales/confirmacionSalir";

class Encuesta extends Component {
    constructor(props) {
        super(props);

        preguntas.splice(2, 0, null);

        this.state = {
            factor: "",
            respuestas: [],
            isFinished: false,
            isEnviado: false,
            formatosAceptados: ".pdf,.jpg,.png,.xlsx,.xlsm,.doc,.docx,.ppt,.pptx,.mp3,.mp4",
            tipoUsuario: "",
        }
    }

    componentDidMount = () => {
        /* Conectarse al backend para traer el JSON de las preguntas */
        let infoCargada = {};

        if (this.props[0].location && this.props[0].location.state !== undefined) {
            const placeholders = [];
            for (let i = 0; i < preguntas[this.props[0].location.state.factor - 1].length; i++) {
                placeholders.push({
                    nivel: 1,
                    evidencia: {
                        nombre: "",
                        file: ""
                    }
                });
            }
            infoCargada = {
                factor: this.props[0].location.state.factor,
                respuestas: placeholders
            }
        } else {
            infoCargada = {
                factor: "",
                respuestas: []
            }
        }

        this.setState({
            factor: infoCargada.factor,
            respuestas: infoCargada.respuestas
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.respuestas !== this.state.respuestas) {
            let didFinish = true;
            this.state.respuestas.forEach(respuesta => {
                if (respuesta.evidencia.nombre === "") {
                    didFinish = false;
                }
            });
            this.setState({
                isFinished: didFinish
            });
        }
    }

    handleRespuesta = (e, index) => {
        const newRespuestas = [...this.state.respuestas];
        newRespuestas[index].nivel = e.target.value;

        this.setState({
            respuestas: newRespuestas
        });
    }

    actualizarEvidencias = (e, index) => {
        const fileReader = new FileReader();
        const file = e.target.files[0];
        const newRespuestas = [...this.state.respuestas];

        fileReader.onloadend = e => {
            newRespuestas[index] = {
                ...newRespuestas[index],
                evidencia: {
                    nombre: file.name,
                    binaryString: fileReader.result
                }
            }

            this.setState({
                respuestas: newRespuestas
            });
        };

        if (file) {
            fileReader.readAsBinaryString(file);
        }
    }

    enviar = () => {
        /* Enviar respustas al backend, y asignar a un evaluador */
        console.log("Enviado");
        this.setState({
            isEnviado: true
        });
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
                                <title>{`${t("titulo.encuesta")} | ${this.props.userProfile.nombre}`}</title>
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
                                <Grid item xs={12} md={8}>
                                    <Typography variant="h5" className="mb-4 text-center">{t("encuestas.titulo")}</Typography>
                                    <Typography variant="body1">{t("encuestas.ayuda")}</Typography>
                                    <hr className="my-4"/>
                                    {
                                        this.state.factor !== "" ? (
                                            preguntas[this.state.factor - 1].map((pregunta, i) => (
                                                <Paper className="p-4 mb-4" key={i}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={!this.props[0].location.state.shouldActivateViewingMode ? 8 : 12} lg={!this.props[0].location.state.shouldActivateViewingMode ? 9 : 12}>
                                                            <Typography className="w-100 pr-4" variant="body1">{pregunta}</Typography>
                                                            {
                                                                !this.props[0].location.state.shouldActivateViewingMode ? (
                                                                    <React.Fragment>
                                                                        <hr/>
                                                                        {
                                                                            this.state.respuestas[i].evidencia.nombre !== "" ? (
                                                                                <Typography variant="body2" className="mb-3">{t("encuestas.subido")}: <strong>{this.state.respuestas[i].evidencia.nombre}</strong></Typography>
                                                                            ) : null
                                                                        }
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="primary"
                                                                            component="label"
                                                                            fullWidth
                                                                        >
                                                                            {t("encuestas.adjuntar")}
                                                                            <input type="file" accept={this.state.formatosAceptados} onChange={e => { this.actualizarEvidencias(e, i); }} style={{ display: "none" }} />
                                                                        </Button>
                                                                    </React.Fragment>
                                                                ) : null
                                                            }
                                                        </Grid>
                                                        {
                                                            !this.props[0].location.state.shouldActivateViewingMode ? (
                                                                <Grid item xs={12} md={4} lg={3}>
                                                                    <Typography variant="body1" className="mb-2"><strong>{t("encuestas.asignar")}</strong></Typography>
                                                                    <FormControl variant="outlined" className="w-100">
                                                                        <Select
                                                                            value={this.state.respuestas[i].nivel}
                                                                            onChange={e => { this.handleRespuesta(e, i); }}
                                                                            input={<OutlinedInput required 
                                                                            name="rolSeleccionado"/>}
                                                                        >
                                                                            <MenuItem value={1}>{t("encuestas.no-iniciado")}</MenuItem>
                                                                            <MenuItem value={2}>{t("encuestas.estado-inicial")}</MenuItem>
                                                                            <MenuItem value={3}>{t("encuestas.desarrollo")}</MenuItem>
                                                                            <MenuItem value={4}>{t("encuestas.establecido")}</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                            ) : null
                                                        }
                                                    </Grid>
                                                </Paper>
                                            ))
                                         ) : null
                                    }
                                    {
                                        !this.props[0].location.state.shouldActivateViewingMode ? (
                                            <Button variant="contained" color="primary" onClick={this.enviar} size="large" fullWidth className="mt-4" disabled={!this.state.isFinished}>{t("enviar")}</Button>
                                        ) : null
                                    }
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.isEnviado}>
                                <DialogTitle>{t("encuestas.enviada")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>{t("encuestas.enviada-ayuda")}</DialogContentText>
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

export default Encuesta;