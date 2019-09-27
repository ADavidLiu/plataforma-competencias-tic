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
import TextField from "@material-ui/core/TextField";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class EncuestaRevision extends Component {
    constructor() {
        super();

        this.state = {
            respondidoPor: "Jane Doe",
            establecimientoID: "",
            establecimientoNombre: "",
            establecimientoImg: "",
            preguntas: [],
            preguntasPreparadas: [],
            calificaciones: [],
            isEnviado: false,
            isCompletado: false,
            numPreguntas: 0
        }
    }

    cargarDatos = () => {
        /* Conectarse al backend para traer las preguntas de este establecimientoID */
        const preguntasCargadas = [
            {
                factor: 4,
                criterio: 1,
                label: "Reflexiones y discusiones colectivas sobre el uso de las TIC en la educación",
                respuesta: "Magna ipsum Lorem aliquip incididunt enim amet laboris quis magna dolore sint esse sunt. Minim incididunt Lorem duis cillum. Enim id labore reprehenderit proident voluptate eiusmod sit. Quis amet sunt do magna fugiat consequat anim magna irure id. Veniam labore ea ipsum amet sunt ex."
            },
            {
                factor: 4,
                criterio: 2,
                evidencia: "https://www.google.com",
                label: "Estudios de impacto sobre el uso de las TIC en la educación y su aplicación al plan de desarrollo de la Institución",
                respuesta: "Fugiat amet aliqua nostrud pariatur quis mollit eiusmod eu irure. Quis ad est elit irure laboris ad eiusmod proident. Ullamco ullamco officia ea duis quis deserunt ipsum cillum commodo. Veniam ad voluptate incididunt veniam. Ex quis ut enim elit laboris tempor. Anim dolore qui cupidatat cupidatat."
            },
            {
                factor: 4,
                criterio: 3,
                evidencia: "https://www.google.com",
                label: "Comparaciones de desempeño entre estudiantes que utilizan las TIC y los que no las utilizan",
                respuesta: "Do nisi quis duis occaecat duis magna ipsum tempor velit. Quis exercitation aute fugiat tempor fugiat voluptate incididunt excepteur cupidatat laborum veniam enim aliquip sunt. Nostrud dolor duis magna ad Lorem. Nostrud aliqua fugiat qui exercitation fugiat esse aliqua veniam officia elit labore excepteur deserunt esse."
            },
            {
                factor: 4,
                criterio: 4,
                label: "Cambio en las prácticas pedagógicas a partir de la incorporación de las TIC",
                respuesta: "Excepteur aliqua laborum occaecat ad nulla do sunt non quis labore nostrud non elit. Nostrud quis veniam cupidatat aute sint dolore consequat eu adipisicing id est. Eiusmod exercitation laborum id commodo Lorem. Lorem ad veniam eiusmod mollit. Duis qui nulla irure dolore voluptate dolor."
            }
        ];

        let infoCargada = {};

        if (this.props[0].location.state === undefined) {
            infoCargada = {
                establecimientoID: "",
                establecimientoNombre: "",
                establecimientoImg: ""
            }
        } else {
            infoCargada = {
                establecimientoID: this.props[0].location.state.establecimientoID,
                establecimientoNombre: this.props[0].location.state.establecimientoNombre,
                establecimientoImg: this.props[0].location.state.userImg
            }
        }

        if (infoCargada.establecimientoImg === "") {
            infoCargada.establecimientoImg = "https://via.placeholder.com/500";
        }

        this.setState({
            establecimientoID: infoCargada.establecimientoID,
            establecimientoNombre: infoCargada.establecimientoNombre,
            establecimientoImg: infoCargada.establecimientoImg,
            preguntas: preguntasCargadas,
            numPreguntas: preguntasCargadas.length
        });

        preguntasCargadas.forEach(pregunta => {
            this.prepararPreguntas(pregunta, []);
        });
    }

    componentDidMount = () => {
        this.cargarDatos();
    }

    enviar = () => {
        if (this.state.calificaciones.length === this.state.preguntas.length) {
            this.setState({
                isEnviado: true
            });
            console.log("Enviado");
        }
    }

    asignarFeedback = (e, index) => {
        const nuevasCalificaciones = [...this.state.calificaciones];

        nuevasCalificaciones[index] = {
            ...nuevasCalificaciones[index],
            feedback: e.target.value
        }
    }

    handleChange = (e, index, factor, criterio) => {
        const nuevasCalificaciones = [...this.state.calificaciones];

        nuevasCalificaciones[index] = {
            ...nuevasCalificaciones[index],
            factor: factor,
            criterio: criterio,
            calificacion: e.target.value
        }

        this.setState({
            calificaciones: nuevasCalificaciones
        });

        if (nuevasCalificaciones.length === this.state.numPreguntas) {
            this.setState({
                isCompletado: true
            });
        }
    }

    prepararPreguntas = (pregunta, arrayBase) => {
        let preguntaArray = [...arrayBase];

        preguntaArray.push(
            <Translation key={pregunta.label}>
                {
                    t => (
                        <React.Fragment>
                            {
                                pregunta.descriptores ? (
                                    <React.Fragment>
                                        <Typography variant="body1"><strong>{t("revision.descriptores-asociados")}: </strong>{pregunta.descriptores.map((descriptor, i) => {
                                            return <Typography key={i} component="span" className="mr-2">• {descriptor}</Typography>
                                        })}</Typography>
                                        <hr/>
                                    </React.Fragment>
                                ) : ""
                            }
                            <Typography variant="body1"><strong>{t("pregunta")}: </strong>{pregunta.label}</Typography>
                            <hr/>
                            <Typography variant="body1"><strong>{t("respuesta")}: </strong>{pregunta.respuesta}</Typography>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
        
        if (pregunta.subPregunta) {
            this.prepararPreguntas(pregunta.subPregunta, preguntaArray);
        } else {
            /* Llegó al nivel final. Detenerse y actualizar el estado. */
            /* this.setState({
                preguntasPreparadas: [
                    ...this.state.preguntasPreparadas,
                    preguntaArray
                ]
            }); */
            this.state.preguntasPreparadas.push(preguntaArray);
        }
    }

    render() {
        if (this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }

        console.log(this.state.calificaciones);

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("titulo.encuesta-revision")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={5} justify="center">
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <Avatar alt={t("imagen-perfil")} src={this.state.establecimientoImg} className="mr-3" style={{height: "60px", width: "60px"}} />
                                                <div>
                                                    <Typography variant="h5" className="mb-2">{t("revision.encuesta-titulo")}</Typography>
                                                    <Typography variant="body1">{t("revision.encuesta-evaluado")} <strong>{this.state.establecimientoNombre}</strong></Typography>
                                                </div>
                                            </div>
                                            <hr className="mb-4" />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} className="mb-4">
                                        <Grid item xs={12} sm={8} className="mb-5">
                                            <Typography variant="body1" className="mb-3">{t("revision.encuesta-ayuda")}: <strong>{this.state.respondidoPor}</strong></Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3}>
                                            <Typography variant="body1" className="mb-2"><strong>{t("revision.calificacion-ayuda")}</strong></Typography>
                                            <Typography variant="body1" className="mb-2"><strong>1: </strong>{t("revision.calificacion-no-iniciado")}</Typography>
                                            <Typography variant="body1" className="mb-2"><strong>2: </strong>{t("revision.calificacion-inicial")}</Typography>
                                            <Typography variant="body1" className="mb-2"><strong>3: </strong>{t("revision.calificacion-desarrollo")}</Typography>
                                            <Typography variant="body1" className="mb-2"><strong>4: </strong>{t("revision.calificacion-establecido")}</Typography>
                                        </Grid>
                                    </Grid>
                                    {
                                        this.state.preguntas.map((pregunta, i) => {
                                            return (
                                                <Paper key={i} className="p-4 mb-4">
                                                    <Grid container spacing={5}>
                                                        <Grid item xs={12} sm={8}>
                                                            {this.state.preguntasPreparadas[i]}
                                                        </Grid>
                                                        <Grid item xs={12} sm={4} className="d-md-flex flex-column">
                                                            <div className="order-md-2 mt-md-4">
                                                                {
                                                                    pregunta.evidencia ? (
                                                                        <a href={pregunta.evidencia}>
                                                                            <Button color="primary" variant="contained"
                                                                            fullWidth>{t("revision.descargar-evidencia")}</Button>
                                                                        </a>
                                                                    ) : ""
                                                                }
                                                            </div>
                                                            <div className="order-md-1">
                                                                <Typography variant="body1" className="mb-3"><strong>{t("calificacion")}</strong></Typography>
                                                                <FormControl variant="outlined" className="w-100">
                                                                    <InputLabel htmlFor={`calificacion-${i}`}>{t("revision.seleccione-valor")}</InputLabel>
                                                                    <Select
                                                                        required
                                                                        value={
                                                                            this.state.calificaciones[i] ? (
                                                                                this.state.calificaciones[i].calificacion
                                                                            ) : ""
                                                                        }
                                                                        onChange={e => { this.handleChange(e, i, pregunta.factor, pregunta.criterio); }}
                                                                        input={<OutlinedInput name={`calificaciones-${i}`} id="calificacion"/>}
                                                                    >
                                                                        <MenuItem value={1}>1</MenuItem>
                                                                        <MenuItem value={2}>2</MenuItem>
                                                                        <MenuItem value={3}>3</MenuItem>
                                                                        <MenuItem value={4}>4</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <hr className="mt-0"/>
                                                            <Typography className="mb-3" variant="body1"><strong>{t("revision.feedback")}</strong></Typography>
                                                            <FormControl variant="outlined" className="w-100">
                                                                <TextField
                                                                    variant="outlined"
                                                                    multiline
                                                                    fullWidth
                                                                    name="feedback"
                                                                    value={
                                                                        this.state.calificaciones[i] ? (
                                                                            this.state.calificaciones[i].feedback
                                                                        ) : ""
                                                                    }
                                                                    onInput={e => { this.asignarFeedback(e, i); }}
                                                                />
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            );
                                        })
                                    }
                                    <Button variant="contained" color="primary" size="large" fullWidth onClick={this.enviar} disabled={!this.state.isCompletado}>{t("enviar")}</Button>
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.isEnviado}>
                                <DialogTitle>{t("revision.enviada")}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>{t("revision.enviada-ayuda")}</DialogContentText>
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

export default EncuestaRevision;