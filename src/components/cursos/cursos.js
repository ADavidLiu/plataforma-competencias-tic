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

import { CircularProgress } from "@material-ui/core";

class Cursos extends Component {
    constructor() {
        super();

        this.placeholderCurso = {
            nombre: "",
            resumen: "",
            mediacion: "",
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
                especificos: []
            },
            descriptores: {
                disenio: {
                    conoce: [],
                    utiliza: [],
                    transforma: []
                },
                implementacion: {
                    conoce: [],
                    utiliza: [],
                    transforma: []
                },
                evaluacion: {
                    conoce: [],
                    utiliza: [],
                    transforma: []
                }
            },
            contenidos: [],
            metodologia: "",
            procedimiento: "",
            evidencias: "",
            criterios: "",
            observaciones: ""
        };

        this.state = {
            cursos: {
                actuales: [],
                nuevos: [JSON.parse(JSON.stringify(this.placeholderCurso))]
            },
            divisionMostrada: 0,
            isLoading: true
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
            divisionMostrada: newValue
        });
    }

    handleInputChange = (e, categoria, index) => {
        const updatedCourses = {...this.state.cursos};
        
        if (e.target.name.includes(".")) {
            const key = e.target.name.split(".")[0];
            const value = e.target.name.split(".")[1];

            switch (key) {
                case "competencias":
                    updatedCourses[categoria][index].competencias[value] = e.target.checked;
                    break;
                default:
                    break;
            }
        } else {
            updatedCourses[categoria][index][e.target.name] = e.target.value;
        }

        this.setState({
            cursos: updatedCourses
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
                                    <Paper className="p-4 mb-4" key={i}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl variant="outlined" className="w-100">
                                                    <TextField
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
                                            <Grid item xs={12} md={4}>
                                                <FormControl variant="outlined" className="w-100">
                                                    <TextField
                                                        variant="outlined"
                                                        label={t("cursos.new-dedicacion")}
                                                        fullWidth
                                                        inputProps={{
                                                            type: "number"
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
                                                    <FormLabel component="legend">{t("cursos.new-competencias")}</FormLabel>
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
                                                    <FormLabel component="legend">{t("cursos.new-requerimientos")}</FormLabel>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            name="requerimientos.internet"
                                                            control={<Checkbox color="primary" checked={curso.requerimientos.internet} onChange={e => { this.handleInputChange(e, "nuevos", i); }} value="internet" />}
                                                            label={t("cursos.requerimientos-internet")}
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>    
                                    </Paper>
                                ))
                            )
                        }
                    </Translation>
                );
                break;
            case 1:
                division = (
                    <Translation>
                        {
                            t => (
                                ""
                            )
                        }
                    </Translation>
                );
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
                                    <Typography variant="h5">{t("cursos.title")}</Typography>
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
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Cursos;