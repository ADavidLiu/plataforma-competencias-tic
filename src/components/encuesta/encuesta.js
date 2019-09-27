import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import preguntas from "../../models/encuestas";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class Encuesta extends Component {
    constructor(props) {
        super(props);

        const placeholders = [];
        preguntas[props[0].location.state.factor - 1].forEach(pregunta => {
            placeholders.push({
                nivel: 1,
                evidencia: {
                    nombre: "",
                    file: ""
                }
            });
        });

        this.state = {
            factor: props[0].location.state.factor,
            respuestas: placeholders,
            isFinished: false,
            formatosAceptados: ".pdf,.jpg,.png,.xlsx,.xlsm,.doc,.docx,.ppt,.pptx,.mp3,.mp4"
        }
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
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("titulo.encuesta")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={5} justify="center">
                                <Grid item xs={12} sm={10} md={8}>
                                    <Typography variant="h5" className="mb-4 text-center">{t("encuestas.titulo")}</Typography>
                                    <Typography variant="body1">{t("encuestas.ayuda")}</Typography>
                                    <hr className="my-4"/>
                                    {
                                        preguntas[this.state.factor - 1].map((pregunta, i) => (
                                            <Paper className="p-4 mb-4" key={i}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={8} lg={9}>
                                                        <Typography className="w-100 pr-4" variant="body1">{pregunta}</Typography>
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
                                                    </Grid>
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
                                                </Grid>
                                            </Paper>
                                        ))
                                    }
                                    <Button variant="contained" color="primary" onClick={this.enviar} size="large" fullWidth className="mt-4" disabled={!this.state.isFinished}>{t("enviar")}</Button>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Encuesta;