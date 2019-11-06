import React, { Component } from "react";

import { Translation } from "react-i18next";
import Helmet from "react-helmet";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import IconButton from "@material-ui/core/IconButton";
import DeleteOutlined from "@material-ui/icons/DeleteOutline";
import Add from "@material-ui/icons/Add";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import { CircularProgress } from "@material-ui/core";

import { equals } from "equally";

import ListaUsuarios from "../listaUsuarios/listaUsuarios";

class Cursos extends Component {
    constructor() {
        super();

        this.placeholderCurso = {
            nombre: "",
            resumen: "",
            mediacion: "false",
            modalidad: "",
            dedicacion: "",
            ubicacion: "",
            institucion: "",
            enlace: "",
            nivel: "",
            competencias: {
                disenio: false,
                implementacion: false,
                evaluacion: false
            },
            requerimientos: {
                internet: false,
                computador: false,
                mobile: false,
                lms: false
            },
            descripcion: "",
            objetivo: {
                general: "",
                especificos: [""]
            },
            descriptores: [""],
            contenidos: [""],
            metodologia: "",
            procedimiento: [""],
            evidencias: "",
            criterios: [""],
            observaciones: ""
        };

        this.state = {
            cursos: {
                actuales: [],
                nuevos: [JSON.parse(JSON.stringify(this.placeholderCurso))]
            },
            isNewInfoAdded: false,
            divisionMostrada: 0,
            isLoading: true,
            shouldConfirmCreated: false
        }
    }

    componentDidMount = () => {
        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 1000);
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue,
            isLoading: true
        });

        /* Simulando el delay al traer los datos del backend */
        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 1500);
    }

    checkNewCourseDataChanged = () => {
        let newState = false;
        if (!equals(...this.state.cursos.nuevos, this.placeholderCurso)) {
            newState = true;
        }

        this.setState({
            isNewInfoAdded: newState
        });
    }

    handleInputChange = (e, categoria, index) => {
        const updatedCourses = {...this.state.cursos};
        
        if (e.target.name.includes(".")) {
            const key = e.target.name.split(".")[0];
            const value = e.target.name.split(".")[1];
            
            switch (key) {
                case "competencias":
                case "requerimientos":
                    updatedCourses[categoria][index][key][value] = e.target.checked;
                    break;
                case "objetivo":
                    switch (value) {
                        case "general":
                            updatedCourses[categoria][index][key][value] = e.target.value;
                            break;
                        case "especificos":
                            updatedCourses[categoria][index.i][key][value][index.j] = e.target.value;
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (e.target.name) {
                case "descriptores":
                    updatedCourses[categoria][index.i][e.target.name][index.j] = e.target.value.toUpperCase();
                    break;
                case "contenidos":
                case "procedimiento":
                case "criterios":
                    updatedCourses[categoria][index.i][e.target.name][index.j] = e.target.value;
                    break;
                case "mediacion":
                    updatedCourses[categoria][index][e.target.name] = e.target.value;
                    break;
                default:
                    updatedCourses[categoria][index][e.target.name] = e.target.value;
                    break;
            }
        }

        this.setState({
            cursos: updatedCourses
        }, () => { this.checkNewCourseDataChanged(); });
    }

    createNewCourseElement = (categoria, index) => {
        const newCursosNuevos = [...this.state.cursos.nuevos];
        newCursosNuevos[index][categoria].push("");

        this.setState({
            cursos: {
                ...this.state.cursos,
                nuevos: newCursosNuevos
            }
        }, () => { this.checkNewCourseDataChanged(); });
    }

    deleteNewCourseElement = (categoria, index) => {
        const newCursosNuevos = [...this.state.cursos.nuevos];
        newCursosNuevos[index.i][categoria].splice(index.j, 1);
        this.setState({
            cursos: {
                ...this.state.cursos,
                nuevos: newCursosNuevos
            }
        }, () => { this.checkNewCourseDataChanged(); });
    }

    createNewObjetivoEspecifico = index => {
        const newCursosNuevos = [...this.state.cursos.nuevos];
        newCursosNuevos[index].objetivo.especificos.push("");

        this.setState({
            cursos: {
                ...this.state.cursos,
                nuevos: newCursosNuevos
            }
        }, () => { this.checkNewCourseDataChanged(); });
    }

    deleteObjetivoEspecifico = index => {
        const newCursosNuevos = [...this.state.cursos.nuevos];
        newCursosNuevos[index.i].objetivo.especificos.splice(index.j, 1);
        this.setState({
            cursos: {
                ...this.state.cursos,
                nuevos: newCursosNuevos
            }
        }, () => { this.checkNewCourseDataChanged(); });
    }

    crearCurso = () => {
        /* Enviar al backend */
        this.toggleConfirmationDialog();

        /* Reiniciar los campos */
        this.setState({
            cursos: {
                ...this.state.cursos,
                nuevos: [JSON.parse(JSON.stringify(this.placeholderCurso))]
            },
            isNewInfoAdded: false
        });
    }

    toggleConfirmationDialog = () => {
        this.setState({
            shouldConfirmCreated: !this.state.shouldConfirmCreated
        });
    }

    render() {
        let division;
        switch (this.state.divisionMostrada) {
            case 0:
                division = (
                    <Translation>
                        {
                            t => (
                                this.state.cursos.nuevos.map((curso, i) => (
                                    <React.Fragment key={i}>
                                        <Paper className="p-4 mb-4">
                                            <Grid container alignItems="stretch" spacing={3}>
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{"aria-label": `${t("aria.nombre")}`}}
                                                            variant="outlined"
                                                            fullWidth
                                                            label={t("cursos.new-nombre")}
                                                            name="nombre"
                                                            value={curso.nombre}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{"aria-label": `${t("aria.resumen")}`}}
                                                            variant="outlined"
                                                            fullWidth
                                                            label={t("cursos.new-resumen")}
                                                            multiline
                                                            rows={5}
                                                            name="resumen"
                                                            value={curso.resumen}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend">{t("cursos.new-mediacion")}</FormLabel>
                                                        <RadioGroup row name="mediacion" value={curso.mediacion} onChange={e => { this.handleInputChange(e, "nuevos", i); }}>
                                                            <FormControlLabel value="true" control={<Radio color="primary" />} label={t("si")} />
                                                            <FormControlLabel value="false" control={<Radio color="primary" />} label={t("no")} />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <InputLabel>{t("cursos.new-modalidad")}</InputLabel>
                                                        <Select
                                                            value={curso.modalidad}
                                                            onChange={e => { this.handleInputChange(e, "nuevos", i); }}
                                                            input={<OutlinedInput required name="modalidad"/>}
                                                        >
                                                            <MenuItem value="presencial">{t("cursos.modalidad-presencial")}</MenuItem>
                                                            <MenuItem value="virtual">{t("cursos.modalidad-virtual")}</MenuItem>
                                                            <MenuItem value="blended">{t("cursos.modalidad-blended")}</MenuItem>
                                                            <MenuItem value="cualquiera">{t("cursos.modalidad-cualquiera")}</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            variant="outlined"
                                                            label={t("cursos.new-dedicacion")}
                                                            fullWidth
                                                            inputProps={{
                                                                "type": "number",
                                                                "aria-label": `${t("aria.horas-dedicacion")}`
                                                            }}
                                                            name="dedicacion"
                                                            value={curso.dedicacion}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{"aria-label": `${t("aria.ubicacion")}`}}
                                                            variant="outlined"
                                                            label={t("cursos.new-ubicacion")}
                                                            fullWidth
                                                            name="ubicacion"
                                                            value={curso.ubicacion}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{"aria-label": `${"aria.institucion"}`}}
                                                            variant="outlined"
                                                            label={t("cursos.new-institucion")}
                                                            fullWidth
                                                            name="institucion"
                                                            value={curso.institucion}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{"aria-label": `${t("aria.enlace")}`}}
                                                            variant="outlined"
                                                            label={t("cursos.new-enlace")}
                                                            fullWidth
                                                            name="enlace"
                                                            value={curso.enlace}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <InputLabel>{t("cursos.new-nivel")}</InputLabel>
                                                        <Select
                                                            value={curso.nivel}
                                                            onChange={e => { this.handleInputChange(e, "nuevos", i); }}
                                                            input={<OutlinedInput required name="nivel"/>}
                                                        >
                                                            <MenuItem value="integracion-basico">{t("cursos.niveles-ib")}</MenuItem>
                                                            <MenuItem value="integracion-avanzado">{t("cursos.niveles-ia")}</MenuItem>
                                                            <MenuItem value="integracion-actualizacion">{t("cursos.niveles-iact")}</MenuItem>
                                                            <MenuItem value="reorientacion-basico">{t("cursos.niveles-rb")}</MenuItem>
                                                            <MenuItem value="reorientacion-avanzado">{t("cursos.niveles-ra")}</MenuItem>
                                                            <MenuItem value="reorientacion-actualizacion">{t("cursos.niveles-ract")}</MenuItem>
                                                            <MenuItem value="evolucion-basico">{t("cursos.niveles-eb")}</MenuItem>
                                                            <MenuItem value="evolucion-avanzado">{t("cursos.niveles-ea")}</MenuItem>
                                                            <MenuItem value="evolucion-actualizacion">{t("cursos.niveles-eact")}</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend"><strong>{t("cursos.new-competencias")}</strong></FormLabel>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                name="competencias.disenio"
                                                                control={<Checkbox color="primary" checked={curso.competencias.disenio} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="disenio" />}
                                                                label={t("cursos.new-descriptores-disenio")}
                                                            />
                                                            <FormControlLabel
                                                                name="competencias.implementacion"
                                                                control={<Checkbox color="primary" checked={curso.competencias.implementacion} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="implementacion" />}
                                                                label={t("cursos.new-descriptores-implementacion")}
                                                            />
                                                            <FormControlLabel
                                                                name="competencias.evaluacion"
                                                                control={<Checkbox color="primary" checked={curso.competencias.evaluacion} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="evaluacion" />}
                                                                label={t("cursos.new-descriptores-evaluacion")}
                                                            />
                                                        </FormGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend"><strong>{t("cursos.new-requerimientos")}</strong></FormLabel>
                                                        <FormGroup row>
                                                            <FormControlLabel
                                                                name="requerimientos.internet"
                                                                control={<Checkbox color="primary" checked={curso.requerimientos.internet} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="internet" />}
                                                                label={t("cursos.requerimientos-internet")}
                                                            />
                                                            <FormControlLabel
                                                                name="requerimientos.computador"
                                                                control={<Checkbox color="primary" checked={curso.requerimientos.computador} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="computador" />}
                                                                label={t("cursos.requerimientos-computador")}
                                                            />
                                                            <FormControlLabel
                                                                name="requerimientos.mobile"
                                                                control={<Checkbox color="primary" checked={curso.requerimientos.mobile} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="mobile" />}
                                                                label={t("cursos.requerimientos-mobile")}
                                                            />
                                                            <FormControlLabel
                                                                name="requerimientos.lms"
                                                                control={<Checkbox color="primary" checked={curso.requerimientos.lms} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="lms" />}
                                                                label={t("cursos.requerimientos-lms")}
                                                            />
                                                        </FormGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{"aria-label": `${t("aria.descripcion")}`}}
                                                            variant="outlined"
                                                            label={t("cursos.new-descripcion")}
                                                            fullWidth
                                                            multiline
                                                            rows={5}
                                                            name="descripcion"
                                                            value={curso.descripcion}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                                        <TextField
                                                            inputProps={{
                                                                "className": "h-100",
                                                                "aria-label": `${t("aria.objetivo-general")}`
                                                            }}
                                                            className="h-100"
                                                            variant="outlined"
                                                            label={t("cursos.new-objetivo-general")}
                                                            fullWidth
                                                            multiline
                                                            rows={5}
                                                            name="objetivo.general"
                                                            value={curso.objetivo.general}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-objetivos-especificos")}</strong></Typography>
                                                    <FormControl variant="outlined" className="w-100">
                                                        {
                                                            curso.objetivo.especificos.map((objetivo, j) => (
                                                                <div key={j} className="d-flex align-items-center justify-content-between mb-2">
                                                                    <TextField
                                                                        inputProps={{"aria-label": `${t("aria.objetivo-especifico")}`}}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        name="objetivo.especificos"
                                                                        value={curso.objetivo.especificos[j]}
                                                                        onInput={e => { this.handleInputChange(e, "nuevos", {i: i, j: j}) }}
                                                                    />
                                                                    <IconButton aria-label={`${t("aria.eliminar-elemento")}`} className="ml-3" color="primary" onClick={() => { this.deleteObjetivoEspecifico({ i: i, j: j }); }}>
                                                                        <DeleteOutlined color="primary"/>
                                                                    </IconButton>
                                                                </div>
                                                            ))
                                                        }
                                                        <Button aria-label={`${t("aria.agregar-elemento")}`} className="w-auto mt-3"
                                                        size="small" variant="outlined" color="primary" onClick={() => { this.createNewObjetivoEspecifico(i); }}>
                                                            <Add className="d-block mx-auto"/>
                                                        </Button>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("descriptores")}</strong></Typography>
                                                    {
                                                        curso.descriptores.map((descriptor, j) => (
                                                            <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                                                <TextField
                                                                    inputProps={{"aria-label": `${t("aria.descriptor")}`}}
                                                                    variant="outlined"
                                                                    label={t("instrumento.descriptores-codigo")}
                                                                    fullWidth
                                                                    name="descriptores"
                                                                    value={descriptor}
                                                                    onInput={e => { this.handleInputChange(e, "nuevos", {i: i, j: j}) }}
                                                                />
                                                                <IconButton aria-label={`${t("aria.eliminar-elemento")}`} className="ml-3" color="primary" onClick={() => { this.deleteNewCourseElement("descriptores", { i: i, j: j }); }}>
                                                                    <DeleteOutlined color="primary"/>
                                                                </IconButton>
                                                            </div>
                                                        ))
                                                    }
                                                    <Button aria-label={`${t("aria.agregar-elemento")}`} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { this.createNewCourseElement("descriptores", i); }}>
                                                        <Add className="d-block mx-auto"/>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-contenidos")}</strong></Typography>
                                                        {
                                                            curso.contenidos.map((contenido, j) => (
                                                                <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                                                    <Typography
                                                                    component="p" variant="subtitle1" className="mr-3"><strong>{j + 1}</strong></Typography>
                                                                    <TextField
                                                                        inputProps={{"aria-label": `${t("aria.contenido")}`}}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        name="contenidos"
                                                                        value={contenido}
                                                                        onInput={e => { this.handleInputChange(e, "nuevos", {i: i, j: j}) }}
                                                                    />
                                                                    <IconButton aria-label={`${t("aria.eliminar-elemento")}`} className="ml-3" color="primary" onClick={() => { this.deleteNewCourseElement("contenidos", { i: i, j: j }); }}>
                                                                        <DeleteOutlined color="primary"/>
                                                                    </IconButton>
                                                                </div>
                                                            ))
                                                        }
                                                        <Button aria-label={`${t("aria.agregar-elemento")}`} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { this.createNewCourseElement("contenidos", i); }}>
                                                            <Add className="d-block mx-auto"/>
                                                        </Button>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                                        <TextField
                                                            className="h-100"
                                                            variant="outlined"
                                                            label={t("cursos.new-metodologia")}
                                                            inputProps={{
                                                                "className":"h-100",
                                                                "aria-label": `${t("aria.metodologia")}`
                                                            }}
                                                            fullWidth
                                                            multiline
                                                            rows={5}
                                                            name="metodologia"
                                                            value={curso.metodologia}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-procedimiento")}</strong></Typography>
                                                    {
                                                        curso.procedimiento.map((procedimiento, j) => (
                                                            <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                                                <Typography component="p" variant="subtitle1" className="mr-3"><strong>{j + 1}</strong></Typography>
                                                                <TextField
                                                                    inputProps={{"aria-label": `${t("aria.procedimiento")}`}}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    name="procedimiento"
                                                                    value={procedimiento}
                                                                    onInput={e => { this.handleInputChange(e, "nuevos", {i: i, j: j}) }}
                                                                />
                                                                <IconButton aria-label={`${t("aria.eliminar-elemento")}`} className="ml-3" color="primary" onClick={() => { this.deleteNewCourseElement("procedimiento", { i: i, j: j }); }}>
                                                                    <DeleteOutlined color="primary"/>
                                                                </IconButton>
                                                            </div>
                                                        ))
                                                    }
                                                    <Button aria-label={`${t("aria.agregar-elemento")}`} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { this.createNewCourseElement("procedimiento", i); }}>
                                                        <Add className="d-block mx-auto"/>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                                        <TextField
                                                            className="h-100"
                                                            inputProps={{
                                                                "className": "h-100",
                                                                "aria-label": `${t("aria.evidencias")}`
                                                            }}
                                                            variant="outlined"
                                                            label={t("cursos.new-evidencias")}
                                                            fullWidth
                                                            multiline
                                                            rows={5}
                                                            name="evidencias"
                                                            value={curso.evidencias}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-criterios")}</strong></Typography>
                                                    {
                                                        curso.criterios.map((criterio, j) => (
                                                            <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                                                <Typography component="p" variant="subtitle1" className="mr-3"><strong>{j + 1}</strong></Typography>
                                                                <TextField
                                                                    inputProps={{"aria-label": `${t("aria.criterio")}`}}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    name="criterios"
                                                                    value={criterio}
                                                                    onInput={e => { this.handleInputChange(e, "nuevos", {i: i, j: j}) }}
                                                                />
                                                                <IconButton aria-label={`${t("aria.eliminar-elemento")}`} className="ml-3" color="primary" onClick={() => { this.deleteNewCourseElement("criterios", { i: i, j: j }); }}>
                                                                    <DeleteOutlined color="primary"/>
                                                                </IconButton>
                                                            </div>
                                                        ))
                                                    }
                                                    <Button aria-label={`${t("aria.agregar-elemento")}`} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { this.createNewCourseElement("criterios", i); }}>
                                                        <Add className="d-block mx-auto"/>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                                        <TextField
                                                            className="h-100"
                                                            inputProps={{
                                                                "className": "h-100",
                                                                "aria-label": `${t("aria.observaciones")}`
                                                            }}
                                                            variant="outlined"
                                                            label={t("cursos.new-observaciones")}
                                                            fullWidth
                                                            multiline
                                                            rows={5}
                                                            name="observaciones"
                                                            value={curso.observaciones}
                                                            onInput={e => { this.handleInputChange(e, "nuevos", i) }}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        <Button disabled={!this.state.isNewInfoAdded} onClick={this.crearCurso} fullWidth size="large" variant="contained" color="primary">{t("cursos.crear-btn")}</Button>
                                    </React.Fragment>
                                ))
                            )
                        }
                    </Translation>
                );
                break;
            case 1:
                division = <ListaUsuarios userType="CURSOS" tipoUsuariosMostrados="cursos"/>;
                break;
            default:
                break;
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("titulo.cursos")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={3} justify="center">
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5">{t("cursos.title")}</Typography>
                                    <hr className="mb-4"/>
                                    <Paper>
                                        <Tabs
                                            variant="scrollable"
                                            indicatorColor="primary"
                                            textColor="primary"
                                            value={this.state.divisionMostrada}
                                            onChange={this.handleTabChange}
                                        >
                                            <Tab label={t("cursos.label-agregar")}/>
                                            <Tab label={t("cursos.label-actuales")}/>
                                        </Tabs>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto"/> : division
                                    }
                                </Grid>
                            </Grid>
                            <Dialog open={this.state.shouldConfirmCreated} onClose={this.toggleConfirmationDialog}>
                                <DialogTitle>{t("cursos.creado")}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>{t("cursos.creado-ayuda")}</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.toggleConfirmationDialog} color="primary">{t("cursos.creado-btn")}</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Cursos;