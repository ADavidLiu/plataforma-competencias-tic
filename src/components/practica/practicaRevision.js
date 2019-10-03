import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import { StickyContainer, Sticky } from 'react-sticky';

import GetApp from "@material-ui/icons/GetApp";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Paper } from "@material-ui/core";

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmacionSalir from "../modales/confirmacionSalir";

class PracticaRevision extends Component {
    constructor() {
        super();

        this.state = {
            docenteID: "",
            docenteNombre: "",
            docenteImg: "",
            info: {},
            calificacion: "",
            isEnviado: false
        }
    }

    cargarDatos = () => {
        /* Conectarse al backend para traer las preguntas de este docenteID */
        const infoCargada = {
            nombre: "Lorem ipsum dolor sit amet adipiscing",
            resenia: "Ad aliquip excepteur anim veniam est nostrud pariatur consequat ex ad. Irure irure id do et in. Elit cillum reprehenderit ad pariatur non quis proident pariatur dolor cupidatat cupidatat non est Lorem. Cillum mollit fugiat minim irure enim eiusmod magna fugiat exercitation exercitation in.",
            palabrasClave: ["palabra-1", "palabra-2", "palabra-3"],
            nivelesEducativos: ["Media académica", "Media técnica"],
            cantidadPersonas: 50,
            cantidadGrupos: 2,
            personasPorGrupo: 25,
            selectedRangoEdadParticipantes: "Entre 13 y 15 años",
            selectedGenero: "Mixto",
            hasNecesidadesEspeciales: true,
            selectedNecesidadesEspeciales: "Otras",
            otrasNecesidadesEspeciales: "Sint excepteur sunt nisi incididunt est mollit quis proident magna est elit adipisicing.",
            areasDisciplinares: ["Ciencias naturales y educación ambiental", "Ciencias sociales, historia, geografía y constitución política y democracia"],
            necesidadOProblema: "Sit occaecat sunt ea veniam labore ad anim adipisicing magna aliquip excepteur. Officia amet nisi quis ipsum ipsum. Nulla incididunt ex ad Lorem occaecat eiusmod pariatur incididunt mollit aute labore.",
            objetivoPrincipal: "Id et laboris mollit ut et sunt labore nisi do. Laborum fugiat velit tempor aute est cupidatat adipisicing nisi occaecat pariatur minim et. Id commodo ut mollit magna. In occaecat Lorem duis nisi. Proident ad ullamco culpa eu incididunt non duis adipisicing ad minim.",
            resultadosEsperados: "Mollit quis magna nisi nostrud veniam enim nostrud consectetur. Consectetur laborum tempor esse ut esse esse cillum id sit enim. Excepteur aliqua reprehenderit ea voluptate elit est est cupidatat esse mollit. Minim qui laboris minim do do labore ad elit nisi adipisicing eiusmod anim sunt incididunt. Eu magna incididunt id ipsum laboris cupidatat pariatur. Amet do excepteur do eu labore labore excepteur eiusmod pariatur irure ad Lorem voluptate.",
            numActividades: 1,
            actividades: [
                {
                    nombre: "Actividad 1",
                    proposito: "Nisi velit voluptate qui dolore. Ex laborum labore consequat aliqua nulla cupidatat velit adipisicing consectetur non cupidatat. Commodo ea non est consequat officia anim nulla cillum id aliqua minim sunt magna amet.",
                    modalidadTrabajo: "Grupal",
                    numMateriales: 2,
                    materiales: ["material-1", "material-2"],
                    numEscenarios: 1,
                    escenarios: ["escenario-1"],
                    numProcedimientos: 1,
                    procedimientos: ["procedimiento-1"],
                    consigna: "Lorem velit fugiat laborum proident pariatur minim enim. Mollit nostrud aute excepteur aliquip magna deserunt nisi et laboris dolor proident reprehenderit. Mollit fugiat quis cillum voluptate ullamco consequat occaecat tempor culpa. Veniam ullamco eu sunt proident velit quis dolor eiusmod ut sunt in quis exercitation laborum.",
                    evalua: true,
                    comoEvalua: "Sint irure reprehenderit amet Lorem ullamco dolore velit ex excepteur aliquip sit sint pariatur id. Laborum veniam sunt eiusmod dolore ullamco enim ex sint et mollit aliqua.",
                    numEvidencias: 2,
                    evidencias: [
                        {
                            archivo: {
                                linkDescarga: "https://www.google.com/",
                                nombre: "In voluptate adipisicing ex quis.pdf"
                            },
                            descripcion: "Do mollit cupidatat reprehenderit sit veniam anim pariatur sit irure et officia quis consectetur."
                        },
                        {
                            archivo: {
                                linkDescarga: "https://www.google.com/",
                                nombre: "Magna elit non est deserunt quis.mp4"
                            },
                            descripcion: "Incididunt Lorem sunt esse enim."
                        }
                    ],
                    retroalimentacion: {
                        archivo: {
                            linkDescarga: "https://www.google.com/",
                            nombre: "Do minim ea laboris sunt.docx"
                        },
                        descripcion: "Qui minim culpa ad laborum id ut occaecat et ut adipisicing laboris ipsum deserunt quis. Do veniam officia cupidatat exercitation in sunt laborum veniam occaecat ullamco labore."
                    }
                }
            ]
        }

        let newData = {};

        if (this.props[0].location.state === undefined) {
            newData = {
                docenteID: "",
                docenteNombre: "",
                docenteImg: ""
            }
        } else {
            newData = {
                docenteID: this.props[0].location.state.docenteID,
                docenteNombre: this.props[0].location.state.docenteNombre,
                docenteImg: this.props[0].location.state.docenteImg
            }
        }

        if (newData.docenteImg === "") {
            newData.docenteImg = "https://via.placeholder.com/500";
        }

        this.setState({
            docenteID: newData.docenteID,
            docenteNombre: newData.docenteNombre,
            docenteImg: newData.docenteImg,
            info: infoCargada
        });
    }

    componentDidMount = () => {
        this.cargarDatos();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    enviarCalificacion = e => {
        e.preventDefault();
        if (this.state.calificacion !== "") {
            /* Enviar la calificación al backend */
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
                                <title>{`${t("titulo.practica-revision")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <NavigationPrompt when={!this.state.isEnviado}>
                                {
                                    ({ onConfirm, onCancel }) => (
                                        <ConfirmacionSalir onConfirm={onConfirm} onCancel={onCancel}/>
                                    )
                                }
                            </NavigationPrompt>
                            <Grid container justify="center" spacing={5}>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <Avatar alt={t("imagen-perfil")} src={this.state.docenteImg} className="mr-3" style={{height: "60px", width: "60px"}} />
                                                <div>
                                                    <Typography variant="h5" className="mb-2">{t("titulo.practica-revision")}</Typography>
                                                    <Typography variant="body1">{t("revision.nombre-evaluado")} <strong>{this.state.docenteNombre}</strong></Typography>
                                                </div>
                                            </div>
                                            <hr className="mb-5" />
                                        </Grid>
                                    </Grid>
                                    <StickyContainer>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={8} md={9}>
                                                <Typography variant="h6">{t("practicas.label-informacion-general")}</Typography>
                                                <hr/>
                                                <div>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("nombre")}: </strong>{this.state.info.nombre}</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("practicas.resenia")}: </strong>{this.state.info.resenia}</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("practicas.tags")}: </strong>{
                                                        this.state.info.palabrasClave !== undefined ? (
                                                            this.state.info.palabrasClave.map((palabra, i) => {
                                                                return <Typography key={i} component="span" className="d-block">• {palabra}</Typography>
                                                            })
                                                        ) : ""
                                                    }</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("revision.practica-niveles")}: </strong>{
                                                        this.state.info.nivelesEducativos !== undefined ? (
                                                            this.state.info.nivelesEducativos.map((nivel, i) => {
                                                                return <Typography key={i} component="span" className="d-block">• {nivel}</Typography>
                                                            })
                                                        ) : ""
                                                    }</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("practicas.num-personas")}: </strong>{this.state.info.cantidadPersonas}</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("practicas.num-grupos")}: </strong>{this.state.info.cantidadGrupos}</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("practicas.num-personas-grupo")}: </strong>{this.state.info.personasPorGrupo}</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("revision.practica-rango-edad")}: </strong>{this.state.info.selectedRangoEdadParticipantes}</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("revision.practica-genero")}: </strong>{this.state.info.selectedGenero}</Typography>
                                                    {
                                                        this.state.info.hasNecesidadesEspeciales ? (
                                                            <div className="mb-2">
                                                                <Typography variant="body1" className="mb-2"><strong>{t("practicas.necesidades-especiales")} </strong>{t("si")}</Typography>
                                                                <Typography variant="body1" className="pl-5 mb-2"><strong>¿A qué necesidades educativas especiales atiende la práctica?: </strong>{this.state.info.selectedNecesidadesEspeciales}</Typography>
                                                                {
                                                                    this.state.info.selectedNecesidadesEspeciales === "Otras" ? (
                                                                        <Typography variant="body1" className="pl-5 ml-5">
                                                                        <strong>{t("registro.areas-otras")}: </strong>{this.state.info.otrasNecesidadesEspeciales}</Typography>
                                                                    ) : ""
                                                                }
                                                            </div>
                                                        ) : (
                                                            <Typography variant="body1" className="mb-2"><strong>{t("practicas.necesidades-especiales")}: </strong>{t("no")}</Typography>
                                                        )
                                                    }
                                                    <Typography variant="body1" className="mb-2"><strong>{t("revision.practica-areas")}: </strong>{
                                                        this.state.info.areasDisciplinares !== undefined ? (
                                                            this.state.info.areasDisciplinares.map((area, i) => {
                                                                return <span key={i} className="d-block">• {area}</span>
                                                            })
                                                        ) : ""
                                                    }</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("practicas.necesidad-problema")}: </strong>{this.state.info.necesidadOProblema}</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>{t("practicas.principal-objetivo")}: </strong>{this.state.info.objetivoPrincipal}</Typography>
                                                    <Typography variant="body1" className="mb-4"><strong>{t("practicas.label-resultados")}: </strong>{this.state.info.resultadosEsperados}</Typography>
                                                    <Typography variant="h6">{t("actividades")}</Typography>
                                                    <hr/>
                                                    {
                                                        this.state.info.actividades !== undefined ? (
                                                            <Grid container spacing={5}>
                                                                {this.state.info.actividades.map((actividad, i) => {
                                                                    return (
                                                                        <Grid item xs={12} key={i}>
                                                                            <Paper className="p-4 mb-3">
                                                                                <Typography className="mb-2"><strong>{t("nombre")}: </strong>{actividad.nombre}</Typography>
                                                                                <Typography className="mb-2"><strong>{t("practicas.actividad-proposito")}: </strong>{actividad.proposito}</Typography>
                                                                                <Typography className="mb-2"><strong>{t("practicas.actividad-modalidad-trabajo")}: </strong>{actividad.modalidadTrabajo}</Typography>
                                                                                <Typography className="mb-2"><strong>{t("practicas.actividad-materiales-educativos")}:</strong>
                                                                                {
                                                                                    actividad.materiales.map((material, i) => {
                                                                                        return <Typography key={i} variant="body1" className="d-block" component="span">• {material}</Typography>
                                                                                    })
                                                                                }
                                                                                </Typography>
                                                                                <Typography className="mb-2"><strong>Escenarios:</strong>
                                                                                {
                                                                                    actividad.escenarios.map((escenario, i) => {
                                                                                        return <Typography key={i} variant="body1" className="d-block" component="span">• {escenario}</Typography>
                                                                                    })
                                                                                }
                                                                                </Typography>
                                                                                <Typography className="mb-2"><strong>Procedimiento:</strong>
                                                                                {
                                                                                    actividad.procedimientos.map((procedimiento, i) => {
                                                                                        return <Typography key={i} variant="body1" component="span" className="d-block">• {procedimiento}</Typography>
                                                                                    })
                                                                                }
                                                                                </Typography>
                                                                                <Typography className="mb-2"><strong>{t("practicas.actividad-consigna")}: </strong>{actividad.consigna}</Typography>
                                                                                {
                                                                                    actividad.evalua ? (
                                                                                        <div className="mb-2">
                                                                                            <Typography className="mb-2"><strong>{t("practicas.actividad-evalua")}: </strong>{t("si")}</Typography>
                                                                                            <Typography><strong>{t("practicas.actividad-label-evaluar-desempenio")}: </strong>{actividad.comoEvalua}</Typography>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <Typography className="mb-2"><strong>{t("practicas.actividad-evalua")}: </strong>{t("no")}</Typography>
                                                                                    )
                                                                                }
                                                                                <Typography variant="body1" className="mb-3"><strong>{t("revision.evidencias")}</strong></Typography>
                                                                                {
                                                                                    actividad.evidencias.map((evidencia, i) => {
                                                                                        return (
                                                                                            <React.Fragment key={i}>
                                                                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                                                                    <Typography><em>{evidencia.archivo.nombre}</em></Typography>
                                                                                                    <a href={evidencia.archivo.linkDescarga}>
                                                                                                        <GetApp color="primary" />
                                                                                                    </a>
                                                                                                </div>
                                                                                                <Typography variant="body2">{evidencia.descripcion}</Typography>
                                                                                                <hr/>
                                                                                            </React.Fragment>
                                                                                        );
                                                                                    })
                                                                                }
                                                                                {
                                                                                    actividad.retroalimentacion !== undefined ? (
                                                                                        <React.Fragment>
                                                                                            <Typography variant="body1" className="mb-3"><strong>{t("revision.produccion-retroalimentada")}</strong></Typography>
                                                                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                                                                <Typography><em>{actividad.retroalimentacion.archivo.nombre}</em></Typography>
                                                                                                <a href={actividad.retroalimentacion.archivo.linkDescarga}>
                                                                                                    <GetApp color="primary" />
                                                                                                </a>
                                                                                            </div>
                                                                                            <Typography variant="body2">{actividad.retroalimentacion.descripcion}</Typography>
                                                                                        </React.Fragment>
                                                                                    ) : ""
                                                                                }
                                                                            </Paper>
                                                                        </Grid>
                                                                    );
                                                                })}
                                                            </Grid>
                                                        ) : ""
                                                    }
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={3}>
                                                <form onSubmit={this.enviarCalificacion}>
                                                    <Typography variant="h6" className="mb-3">{t("revision.produccion-asignar-calificacion")}</Typography>
                                                    <FormControl variant="outlined" className="w-100 mb-4">
                                                        <InputLabel htmlFor="calificacion">{t("revision.seleccione-valor")}</InputLabel>
                                                        <Select
                                                            required
                                                            value={this.state.calificacion}
                                                            onChange={this.handleChange}
                                                            input={<OutlinedInput name="calificacion" id="calificacion"/>}
                                                        >
                                                            <MenuItem value={1}>1</MenuItem>
                                                            <MenuItem value={2}>2</MenuItem>
                                                            <MenuItem value={3}>3</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <Typography variant="body1" className="mb-2"><strong>1: {t("revision.calificacion-nulo-titulo")}</strong> - {t("revision.calificacion-nulo-ayuda")}.</Typography>
                                                    <Typography variant="body1" className="mb-2"><strong>2: {t("revision.calificacion-parcial-titulo")}</strong> - {t("revision.calificacion-parcial-ayuda")}.</Typography>
                                                    <Typography variant="body1"><strong>3: {t("revision.calificacion-totalmente-titulo")}</strong> - {t("revision.calificacion-totalmente-ayuda")}.</Typography>
                                                    <Button fullWidth type="submit" variant="contained" size="large" color="primary" className="mt-4">{t("enviar")}</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </StickyContainer>
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

export default PracticaRevision;