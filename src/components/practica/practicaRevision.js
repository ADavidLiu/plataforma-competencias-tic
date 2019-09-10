import React, { Component } from "react";

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

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Paper } from "@material-ui/core";

class PracticaRevision extends Component {
    constructor() {
        super();

        this.state = {
            docenteID: "",
            docenteNombre: "",
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
                docenteNombre: ""
            }
        } else {
            newData = {
                docenteID: this.props[0].location.state.docenteID,
                docenteNombre: this.props[0].location.state.docenteNombre
            }
        }

        this.setState({
            docenteID: newData.docenteID,
            docenteNombre: newData.docenteNombre,
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
            <React.Fragment>
                <Grid container justify="center" spacing={5}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5" className="mb-2">Revisión de práctica educativa</Typography>
                                <Typography variant="body1">Nombre del(a) docente evaluado(a): <strong>{this.state.docenteNombre}</strong></Typography>
                                <hr className="mb-5" />
                            </Grid>
                        </Grid>
                        <StickyContainer>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Typography variant="h6">Información general</Typography>
                                    <hr/>
                                    <div>
                                        <Typography variant="body1" className="mb-2"><strong>Nombre: </strong>{this.state.info.nombre}</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Reseña: </strong>{this.state.info.resenia}</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Palabras clave: </strong>{
                                            this.state.info.palabrasClave !== undefined ? (
                                                this.state.info.palabrasClave.map((palabra, i) => {
                                                    return <Typography key={i} component="span" className="d-block">• {palabra}</Typography>
                                                })
                                            ) : ""
                                        }</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Niveles educativos a los que está dirigida: </strong>{
                                            this.state.info.nivelesEducativos !== undefined ? (
                                                this.state.info.nivelesEducativos.map((nivel, i) => {
                                                    return <Typography key={i} component="span" className="d-block">• {nivel}</Typography>
                                                })
                                            ) : ""
                                        }</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Cantidad de personas: </strong>{this.state.info.cantidadPersonas}</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Cantidad de grupos: </strong>{this.state.info.cantidadGrupos}</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Cantidad de personas por grupo: </strong>{this.state.info.personasPorGrupo}</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Rango de edad promedia de los participantes: </strong>{this.state.info.selectedRangoEdadParticipantes}</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>Género de los participantes: </strong>{this.state.info.selectedGenero}</Typography>
                                        {
                                            this.state.info.hasNecesidadesEspeciales ? (
                                                <div className="mb-2">
                                                    <Typography variant="body1" className="mb-2"><strong>¿La práctica atiende a población con necesidades educativas especiales?: </strong>Sí</Typography>
                                                    <Typography variant="body1" className="pl-5 mb-2"><strong>¿A qué necesidades educativas especiales atiende la práctica?: </strong>{this.state.info.selectedNecesidadesEspeciales}</Typography>
                                                    {
                                                        this.state.info.selectedNecesidadesEspeciales === "Otras" ? (
                                                            <Typography variant="body1" className="pl-5 ml-5">
                                                            <strong>¿Cuál(es)?: </strong>{this.state.info.otrasNecesidadesEspeciales}</Typography>
                                                        ) : ""
                                                    }
                                                </div>
                                            ) : (
                                                <Typography variant="body1" className="mb-2"><strong>¿La práctica atiende a población con necesidades educativas especiales?: </strong>No</Typography>
                                            )
                                        }
                                        <Typography variant="body1" className="mb-2"><strong>¿En qué áreas disciplinares hace énfasis su práctica educativa?: </strong>{
                                            this.state.info.areasDisciplinares !== undefined ? (
                                                this.state.info.areasDisciplinares.map((area, i) => {
                                                    return <span key={i} className="d-block">• {area}</span>
                                                })
                                            ) : ""
                                        }</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>¿A qué necesidad o problema atiende su práctica educativa apoyada en TIC?: </strong>{this.state.info.necesidadOProblema}</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>¿Cuál es el principal objetivo de aprendizaje de la práctica educativa?: </strong>{this.state.info.objetivoPrincipal}</Typography>
                                        <Typography variant="body1" className="mb-4"><strong>¿Cuáles son los resultados de aprendizaje esperados a partir de la práctica educativa?: </strong>{this.state.info.resultadosEsperados}</Typography>
                                        <Typography variant="h6">Actividades</Typography>
                                        <hr/>
                                        {
                                            this.state.info.actividades !== undefined ? (
                                                <Grid container spacing={5}>
                                                    {this.state.info.actividades.map((actividad, i) => {
                                                        return (
                                                            <Grid item xs={12} key={i}>
                                                                <Paper className="p-4 mb-3">
                                                                    <Typography className="mb-2"><strong>Nombre: </strong>{actividad.nombre}</Typography>
                                                                    <Typography className="mb-2"><strong>Propósito: </strong>{actividad.proposito}</Typography>
                                                                    <Typography className="mb-2"><strong>Modalidad de trabajo: </strong>{actividad.modalidadTrabajo}</Typography>
                                                                    <Typography className="mb-2"><strong>Materiales educativos:</strong>
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
                                                                    <Typography className="mb-2"><strong>Consigna: </strong>{actividad.consigna}</Typography>
                                                                    {
                                                                        actividad.evalua ? (
                                                                            <div className="mb-2">
                                                                                <Typography className="mb-2"><strong>¿Evalúa las producciones de los estudiantes?: </strong>Sí</Typography>
                                                                                <Typography><strong>¿Qué hace para evaluar los desempeños de los estudiantes?: </strong>{actividad.comoEvalua}</Typography>
                                                                            </div>
                                                                        ) : (
                                                                            <Typography className="mb-2"><strong>¿Evalúa las producciones de los estudiantes?: </strong>No</Typography>
                                                                        )
                                                                    }
                                                                    <Typography variant="body1" className="mb-3"><strong>Archivos de evidencias</strong></Typography>
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
                                                                                <Typography variant="body1" className="mb-3"><strong>Producción de un estudiante retroalimentada</strong></Typography>
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
                                        <Typography variant="h6" className="mb-3">Asignar calificación</Typography>
                                        <FormControl variant="outlined" className="w-100 mb-4">
                                            <InputLabel htmlFor="calificacion">Seleccione un valor *</InputLabel>
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
                                        <Typography variant="body1" className="mb-2"><strong>1: Nulo</strong> - No se cuenta con evidencias.</Typography>
                                        <Typography variant="body1" className="mb-2"><strong>2: Parcial</strong> - Se cuenta con evidencias de manera incipiente, parcial, o desordenada.</Typography>
                                        <Typography variant="body1"><strong>3: Totalmente</strong> - Se cuenta con evidencia clara y consolidada.</Typography>
                                        <Button fullWidth type="submit" variant="contained" size="large" color="primary" className="mt-4">Enviar</Button>
                                    </form>
                                </Grid>
                            </Grid>
                        </StickyContainer>
                    </Grid>
                </Grid>
                <Dialog open={this.state.isEnviado}>
                    <DialogTitle>Revisión enviada</DialogTitle>
                    <DialogContent>
                    <DialogContentText>La calificación ha sido asignada exitosamente.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/" style={{textDecoration: "none"}}>
                            <Button color="primary">Volver a inicio</Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default PracticaRevision;