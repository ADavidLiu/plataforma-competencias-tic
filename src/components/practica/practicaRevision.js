import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import { StickyContainer, Sticky } from 'react-sticky';

import GetApp from "@material-ui/icons/GetApp";
import PlaylistAddCheck from "@material-ui/icons/PlaylistAddCheck";

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

import Drawer from '@material-ui/core/Drawer';
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Tooltip from '@material-ui/core/Tooltip';
import Fab from "@material-ui/core/Fab";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

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
            isGraded: false,
            isEnviado: false,
            isGradingOpen: false,
            descriptoresEvaluados: []
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
            info: infoCargada,
            descriptoresEvaluados: [
                {
                    codigo: "I1UA",
                    contenido: "Plantea la organización general del escenario educativo utilizando TIC y privilegiando la presentación de sus contenidos.",
                    calificacion: 0
                },
                {
                    codigo: "I1UB",
                    contenido: "Diseña evaluaciones a través de herramientas TIC para mayor flexibilidad de espacio, tiempo y manejo de recursos.",
                    calificacion: 0
                },
                {
                    codigo: "I1UC",
                    contenido: "Plantea instrucciones para comunicar y transmitir información de manera efectiva a través de las TIC.",
                    calificacion: 0
                },
                {
                    codigo: "R1UA",
                    contenido: "Plantea actividades de construcción colaborativa de conocimiento.",
                    calificacion: 0
                },
                {
                    codigo: "R1UB",
                    contenido: "Plantea el uso de las TIC como herramientas para proveer a los estudiantes múltiples representaciones de los contenidos: multimedia, hipermedia.",
                    calificacion: 0
                },
                {
                    codigo: "R1UC",
                    contenido: "Plantea el uso de herramientas TIC que faciliten la organización semántica del conocimiento, como mapas conceptuales, esquemas y cuadros, para apoyar presentaciones y para que los estudiantes analicen y organicen lo que saben o lo que están aprendiendo.",
                    calificacion: 0
                },
                {
                    codigo: "R1UD",
                    contenido: "Plantea el uso de herramientas TIC que permitan el modelamiento dinámico (simulaciones, hojas de cálculo, micromundos, etc.) para establecer relaciones dinámicas entre fenómenos complejos y abstractos.",
                    calificacion: 0
                },
                {
                    codigo: "R1UE",
                    contenido: "Propone evaluaciones apoyadas en TIC que permitan evidenciar la construcción de conocimiento del estudiante.",
                    calificacion: 0
                },
                {
                    codigo: "E1UA",
                    contenido: "Estructura escenarios educativos donde se evidencia la relación entre los contenidos, las actividades y la evaluación.",
                    calificacion: 0
                },
                {
                    codigo: "E1UC",
                    contenido: "Configura escenarios educativos que no serían posibles sin el uso intencional de las TIC.",
                    calificacion: 0
                },
                {
                    codigo: "E1UD1",
                    contenido: "Propone situaciones educativas a partir de las TIC que favorecen el aprendizaje colaborativo.",
                    calificacion: 0
                },
                {
                    codigo: "E1UD2",
                    contenido: "Propone situaciones educativas a partir de las TIC que favorecen la solución de problemas reales y auténticos.",
                    calificacion: 0
                },
                {
                    codigo: "E1UD3",
                    contenido: "Propone situaciones educativas a partir de las TIC que favorecen la comprensión y aplicación de contenidos.",
                    calificacion: 0
                },
                {
                    codigo: "E1UF1",
                    contenido: "Identifica los tipos de evaluación con TIC que permiten evaluar un escenario educativo según los objetivos de aprendizaje.",
                    calificacion: 0
                },
                {
                    codigo: "E1UF2",
                    contenido: "Identifica las herramientas TIC que permiten evaluar un escenario educativo según los objetivos de aprendizaje.",
                    calificacion: 0
                },
                {
                    codigo: "I2UC",
                    contenido: "Realiza evaluaciones apoyadas en TIC para optimizar el tiempo y manejo de recursos en un escenario educativo.",
                    calificacion: 0
                },
                {
                    codigo: "I2UD",
                    contenido: "Promueve y usa las TIC para el acceso y búsqueda de información de calidad para un escenario educativo.",
                    calificacion: 0
                },
                {
                    codigo: "R2UA1",
                    contenido: "Utiliza diversas aplicaciones y/o herramientas TIC para alcanzar objetivos de aprendizaje y/o razonamiento específico para favorecer las múltiples representaciones de un fenómeno (pág 42-a1)",
                    calificacion: 0
                },
                {
                    codigo: "R2UA2",
                    contenido: "Utiliza diversas aplicaciones y/o herramientas TIC para alcanzar objetivos de aprendizaje y/o razonamiento específico para favorecer la organización del conocimiento (pág 42-a2)",
                    calificacion: 0
                },
                {
                    codigo: "R2UA3",
                    contenido: "Utiliza diversas aplicaciones y/o herramientas TIC para alcanzar objetivos de aprendizaje y/o razonamiento específico para favorecer y establecer relaciones dinámicas entre fenómenos complejos y abstractos (pág 42-a3)",
                    calificacion: 0
                },
                {
                    codigo: "R2UA4",
                    contenido: "Utiliza diversas aplicaciones y/o herramientas TIC para alcanzar objetivos de aprendizaje y/o razonamiento específico para favorecer la cosntrucción colaborativa de conocimiento (pág 42-a4)",
                    calificacion: 0
                },
                {
                    codigo: "R2UB",
                    contenido: "Realiza evaluaciones apoyadas en TIC que permitan evidenciar la construcción de conocimiento de los estudiantes en coherencia con los objetivos de aprendizaje.",
                    calificacion: 0
                },
                {
                    codigo: "R2UC",
                    contenido: "Utiliza las TIC para proveer retroalimentación a los estudiantes a partir de su proceso de evaluación.",
                    calificacion: 0
                },
                {
                    codigo: "E2UD",
                    contenido: "Utiliza las TIC para proponer situaciones de enseñanza y aprendizaje que implican la solución de problemas reales y auténticos.",
                    calificacion: 0
                },
                {
                    codigo: "E2UE",
                    contenido: "Utiliza las TIC para promover aprendizajes profundos (comprensión y aplicación de contenidos).",
                    calificacion: 0
                }
            ]
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

    toggleGrading = () => {
        this.setState({
            isGradingOpen: !this.state.isGradingOpen
        });
    }

    handleCalificacionChange = (e, index) => {
        let newState = true;
        const newDescriptores = [...this.state.descriptoresEvaluados];
        newDescriptores[index].calificacion = e.target.value;

        newDescriptores.forEach(descriptor => {
            if (descriptor.calificacion === 0) {
                newState = false;
            }
        });

        this.setState({
            descriptoresEvaluados: newDescriptores,
            isGraded: newState
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
                                    <Grid container spacing={5}>
                                        <Grid item xs={12}>
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
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Drawer anchor="right" variant="temporary" open={this.state.isGradingOpen} onClose={this.toggleGrading}>
                                <form onSubmit={this.enviarCalificacion} className="formato-calificacion pt-4 pb-5 px-5">
                                    <Typography variant="h6" className="mb-3">{t("revision.produccion-asignar-calificacion")}</Typography>
                                    <Typography variant="body1" className="mb-2"><strong>1: {t("revision.calificacion-nulo-titulo")}</strong> - {t("revision.calificacion-nulo-ayuda")}.</Typography>
                                    <Typography variant="body1" className="mb-2"><strong>2: {t("revision.calificacion-parcial-titulo")}</strong> - {t("revision.calificacion-parcial-ayuda")}.</Typography>
                                    <Typography variant="body1"><strong>3: {t("revision.calificacion-totalmente-titulo")}</strong> - {t("revision.calificacion-totalmente-ayuda")}.</Typography>
                                    <Typography variant="body1"><strong>4: {t("revision.calificacion-entrevista")}</strong> - {t("revision.calificacion-entrevista-ayuda")}.</Typography>
                                    <hr/>
                                    {
                                        this.state.descriptoresEvaluados.map((descriptor, i) => (
                                            <div key={i}>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <Typography variant="body1" className="w-75 mr-3"><strong>{descriptor.codigo}</strong></Typography>
                                                    <FormControl className="w-25" variant="outlined">
                                                        <Select
                                                            required
                                                            value={this.state.descriptoresEvaluados[i].calificacion}
                                                            onChange={e => { this.handleCalificacionChange(e, i); }}
                                                            input={<OutlinedInput name="calificacion" id="calificacion"/>}
                                                        >
                                                            <MenuItem value={1}>1</MenuItem>
                                                            <MenuItem value={2}>2</MenuItem>
                                                            <MenuItem value={3}>3</MenuItem>
                                                            <MenuItem value={4}>4</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <Typography className="mt-2 mb-3" variant="body1">{descriptor.contenido}</Typography>
                                                <hr/>
                                            </div>
                                        ))
                                    }
                                    <Button fullWidth type="submit" variant="contained" size="large" color="primary" className="mt-4" disabled={!this.state.isGraded}>{t("enviar")}</Button>
                                </form>
                            </Drawer>

                            <Tooltip title={t("revision.practica-calificar")} placement="left">
                                <Fab color="primary" className="fab prueba-fab" onClick={this.toggleGrading}>
                                    <PlaylistAddCheck/>
                                </Fab>
                            </Tooltip>

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