import React, { Component } from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from '@material-ui/core/Checkbox';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Redirect, Link } from "react-router-dom";

import Reaptcha from "reaptcha";
import CircularProgress from "@material-ui/core/CircularProgress";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Establecimiento from "../establecimiento/establecimiento";

class Registro extends Component {
    constructor() {
        super();
        this.initialState = {
            tipoUsuario: "",
            tipoPerfil: "Individual",
            perfilIndividual: {
                nombres: "",
                apellidos: "",
                fechaNacimiento: "1950-05-24",
                educacionMaxima: "",
                descripcionPersonal: "",
                aniosExperiencia: "",
                representaInstitucionEducativa: "",
                cualInstitucionRepresenta: "",
                esDirectivo: "",
                tipoDirectivo: "",
                niveles: {
                    noAplica: false,
                    preescolar: false,
                    basicaPrimaria: false,
                    basicaSecundaria: false,
                    mediaAcademica: false,
                    mediaTecnica: false
                },
                areasDisciplinares: {
                    naturales: false,
                    sociales: false,
                    arte: false,
                    etica: false,
                    deporte: false,
                    religion: false,
                    humanidades: false,
                    matematicas: false,
                    informatica: false,
                    otras: false,
                    otrasCuales: ""
                },
                usuario: "",
                constrasenia: "",
                imgPerfil: {
                    file: "",
                    src: "",
                    name: ""
                },
                correo: "",
                numContacto: "",
                webPersonal: ""
            },
            perfilInstitucional: {
                pais: "",
                departamento: "",
                municipio: "",
                nombreIE: "",
                numSedes: "",
                sedes: []
            },
            isCompletado: false,
            isCaptchaRendered: false,
            isCaptchaSolved: false,
            submittedWithoutCaptcha: false
        }

        this.state = this.initialState;
    }

    reinitDialogCaptcha = () => {
        this.setState({
            submittedWithoutCaptcha: false
        });
    }

    onCaptchaVerify = () => {
        this.setState({
            isCaptchaSolved: true
        });
    }

    onCaptchaRender = () => {
        this.setState({
            isCaptchaRendered: true
        });
    }

    onCaptchaExpire = () => {
        this.setState({
            isCaptchaSolved: false
        });
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });

        switch (e.target.name) {
            /* Reiniciar los campos al cambiar el tipo de perfil */
            case "tipoPerfil":
                this.setState({
                    perfilIndividual: this.initialState.perfilIndividual,
                    perfilInstitucional: this.initialState.perfilInstitucional
                });
                break;
            default:
                break;
        }
    }

    handleProfileInfoChange = e => {
        const tipoPerfil = e.target.name.split(".")[0];
        const propiedad = e.target.name.split(".")[1];

        this.setState({
            ...this.state,
            [tipoPerfil]: {
                ...this.state[tipoPerfil],
                [propiedad]: e.target.value
            }
        });
    }

    actualizarInfoSedes = nuevaInfoSede => {
        this.state.perfilInstitucional.sedes.push(nuevaInfoSede);
    }

    actualizarNiveles = e => {
        this.setState({
            ...this.state,
            perfilIndividual: {
                ...this.state.perfilIndividual,
                niveles: {
                    ...this.state.perfilIndividual.niveles,
                    [e.target.value]: e.target.checked
                }
            }
        });
    }
    
    actualizarAreasDisciplinares = e => {
        this.setState({
            ...this.state,
            perfilIndividual: {
                ...this.state.perfilIndividual,
                areasDisciplinares: {
                    ...this.state.perfilIndividual.areasDisciplinares,
                    [e.target.value]: e.target.checked
                }
            }
        });
    }

    actualizarOtrasAreasDisciplinares = e => {
        this.setState({
            ...this.state,
            perfilIndividual: {
                ...this.state.perfilIndividual,
                areasDisciplinares: {
                    ...this.state.perfilIndividual.areasDisciplinares,
                    otrasCuales: e.target.value
                }
            }
        });
    }

    actualizarImgPerfil = e => {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.onloadend = e => {
            const newSrc = fileReader.result;

            this.setState({
                ...this.state,
                perfilIndividual: {
                    ...this.state.perfilIndividual,
                    imgPerfil: {
                        ...this.state.perfilIndividual.imgPerfil,
                        src: newSrc,
                        name: file.name
                    }
                }
            });
        };

        if (file) {
            this.setState({
                ...this.state,
                perfilIndividual: {
                    ...this.state.perfilIndividual,
                    imgPerfil: {
                        ...this.state.perfilIndividual.imgPerfil,
                        file: file
                    }
                }
            });
            fileReader.readAsDataURL(file);
        }
    }

    registrar = e => {
        e.preventDefault();

        if (!this.state.isCaptchaSolved) {
            this.setState({
                submittedWithoutCaptcha: true
            });
        } else {
            this.setState({
                ...this.state,
                isCompletado: true
            });
    
            console.log("Enviar al backend!");
        }
    }

    render() {
        if (this.props.isLogeado) {
            if (!this.props[0].location.state.forceShow) {
                return <Redirect to="/"/>
            }
        }
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }

        let infoSedes = [];
        for (let i = 0; i < this.state.perfilInstitucional.numSedes; i++) {
            infoSedes.push(<Establecimiento actualizarInfoSedes={this.actualizarInfoSedes} isCompletado={this.state.isCompletado} key={"sede-" + i} id={(i + 1).toString()} />);
        }

        const formulario = (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("procesoPaso.0")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Typography variant="body1" className="mb-2"><strong>{t("registro.titulo")}</strong></Typography>
                            <form onSubmit={this.registrar}>
                                <Grid container spacing={2} className="mb-2">
                                    <Grid item xs={12} md={6} className="py-0">
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.nombres")}`
                                            }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="nombres"
                                            label={t("registro.nombres")}
                                            name="perfilIndividual.nombres"
                                            value={this.state.perfilIndividual.nombres}
                                            onChange={this.handleProfileInfoChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} className="py-0">
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.apellidos")}`
                                            }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="apellidos"
                                            label={t("registro.apellidos")}
                                            name="perfilIndividual.apellidos"
                                            value={this.state.perfilIndividual.apellidos}
                                            onChange={this.handleProfileInfoChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.fecha-nacimiento")}`
                                            }}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="fechaNacimiento"
                                            label={t("registro.fecha-nacimiento")}
                                            name="perfilIndividual.fechaNacimiento"
                                            type="date"
                                            value={this.state.perfilIndividual.fechaNacimiento}
                                            onChange={this.handleProfileInfoChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.descripcion-personal")}`,
                                                "maxLength": 400
                                            }}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            multiline
                                            rows="5"
                                            id="descripcionPersonal"
                                            label={t("registro.descripcion-personal")}
                                            name="perfilIndividual.descripcionPersonal"
                                            type="text"
                                            value={this.state.perfilIndividual.descripcionPersonal}
                                            onChange={this.handleProfileInfoChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                            <InputLabel htmlFor="educacionMaxima">{t("registro.label-educacion")}</InputLabel>
                                            <Select
                                                value={this.state.perfilIndividual.educacionMaxima}
                                                onChange={this.handleProfileInfoChange}
                                                input={<OutlinedInput required name="perfilIndividual.educacionMaxima" id="educacionMaxima"/>}
                                            >
                                                <MenuItem value="Bachiller">{t("registro.educacion-bachiller")}</MenuItem>
                                                <MenuItem value="Técnico">{t("registro.educacion-tecnico")}</MenuItem>
                                                <MenuItem value="Tecnólogo">{t("registro.educacion-tecnologo")}</MenuItem>
                                                <MenuItem value="Profesional">{t("registro.educacion-profesional")}</MenuItem>
                                                <MenuItem value="Especialista">{t("registro.educacion-especialista")}</MenuItem>
                                                <MenuItem value="Magister">{t("registro.educacion-magister")}</MenuItem>
                                                <MenuItem value="Doctorado">{t("registro.educacion-doctorado")}</MenuItem>
                                                <MenuItem value="Postdoctorado">{t("registro.educacion-postdoctorado")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                            <InputLabel htmlFor="aniosExperiencia">{t("registro.label-anios-experiencia")}</InputLabel>
                                            <Select
                                                value={this.state.perfilIndividual.aniosExperiencia}
                                                onChange={this.handleProfileInfoChange}
                                                input={<OutlinedInput required name="perfilIndividual.aniosExperiencia" id="aniosExperiencia"/>}
                                            >
                                                <MenuItem value="No tengo experiencia">{t("registro.experiencia-0")}</MenuItem>
                                                <MenuItem value="Entre 1 y 5">{t("registro.experiencia-1")}</MenuItem>
                                                <MenuItem value="Entre 5 y 10">{t("registro.experiencia-2")}</MenuItem>
                                                <MenuItem value="Entre 10 y 15">{t("registro.experiencia-3")}</MenuItem>
                                                <MenuItem value="Más de 15 años">{t("registro.experiencia-4")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                            <InputLabel htmlFor="representaInstitucionEducativa">{t("registro.representa-ie")}</InputLabel>
                                            <Select
                                                value={this.state.perfilIndividual.representaInstitucionEducativa}
                                                onChange={this.handleProfileInfoChange}
                                                input={<OutlinedInput required name="perfilIndividual.representaInstitucionEducativa" id="representaInstitucionEducativa"/>}
                                            >
                                                <MenuItem value={true}>{t("si")}</MenuItem>
                                                <MenuItem value={false}>{t("no")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {this.state.perfilIndividual.representaInstitucionEducativa ? (
                                            <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                                <InputLabel htmlFor="cualInstitucionRepresenta">¿Cuál? *</InputLabel>
                                                <Select
                                                    value={this.state.perfilIndividual.cualInstitucionRepresenta}
                                                    onChange={this.handleProfileInfoChange}
                                                    input={<OutlinedInput required name="perfilIndividual.cualInstitucionRepresenta" id="cualInstitucionRepresenta"/>}
                                                >
                                                    {/* Aquí hacer un foreach con el array de los EE que ya hayan */}
                                                    <MenuItem value="Item 1">Item 1</MenuItem>

                                                    <MenuItem value="Otra">{t("registro.cual-label-otra")}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : ""}
                                        {this.state.perfilIndividual.cualInstitucionRepresenta === "Otra" ? (
                                            <Typography variant="body2" color="secondary">{t("registro.directivo-otra-error")}</Typography>
                                        ) : ""}
                                    </Grid>
                                    {this.state.perfilIndividual.cualInstitucionRepresenta !== "Otra" ? (
                                        <React.Fragment>
                                            <Grid item xs={12} className="py-0">
                                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                                    <InputLabel htmlFor="esDirectivo">{t("registro.label-directivo")}</InputLabel>
                                                    <Select
                                                        value={this.state.perfilIndividual.esDirectivo}
                                                        onChange={this.handleProfileInfoChange}
                                                        input={<OutlinedInput required name="perfilIndividual.esDirectivo" id="esDirectivo"/>}
                                                    >
                                                        <MenuItem value={true}>{t("si")}</MenuItem>
                                                        <MenuItem value={false}>{t("no")}</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                {this.state.perfilIndividual.esDirectivo ? (
                                                    <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                                        <InputLabel htmlFor="tipoDirectivo">{t("registro.label-tipo-directivo")}</InputLabel>
                                                        <Select
                                                            value={this.state.perfilIndividual.tipoDirectivo}
                                                            onChange={this.handleProfileInfoChange}
                                                            input={<OutlinedInput required name="perfilIndividual.tipoDirectivo" id="tipoDirectivo"/>}
                                                        >
                                                            <MenuItem value="Rector">{t("registro.rector")}</MenuItem>
                                                            <MenuItem value="Director">{t("registro.director")}</MenuItem>
                                                            <MenuItem value="Coordinador">{t("registro.coordinador")}</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                ) : ""}
                                            </Grid>
                                            <Grid item xs={12} className="mt-2">
                                                <FormLabel component="legend" className="mb-4">{t("registro.label-niveles")}</FormLabel>
                                                <FormGroup>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.noAplica} value="noAplica" />}
                                                                label={t("registro.no-aplica")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.preescolar} value="preescolar" />}
                                                                label={t("registro.preescolar")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.basicaPrimaria} value="basicaPrimaria" />}
                                                                label={t("registro.primaria")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.basicaSecundaria} value="basicaSecundaria" />}
                                                                label={t("registro.secundaria")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.mediaAcademica} value="mediaAcademica" />}
                                                                label={t("registro.academica")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.mediaTecnica} value="mediaTecnica" />}
                                                                label={t("registro.tecnica")}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </FormGroup>
                                            </Grid>
                                            <Grid item xs={12} className="mt-2">
                                                <FormLabel component="legend" className="mb-4">{t("registro.label-areas")}</FormLabel>
                                                <FormGroup>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.naturales} value="naturales" />}
                                                                label={t("registro.naturales")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.sociales} value="sociales" />}
                                                                label={t("registro.sociales")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.arte} value="arte" />}
                                                                label={t("registro.arte")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.etica} value="etica" />}
                                                                label={t("registro.etica")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.deporte} value="deporte" />}
                                                                label={t("registro.deporte")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.religion} value="religion" />}
                                                                label={t("registro.religion")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.humanidades} value="humanidades" />}
                                                                label={t("registro.humanidades")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.matematicas} value="matematicas" />}
                                                                label={t("registro.matematicas")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.informatica} value="informatica" />}
                                                                label={t("registro.informatica")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} className="py-0">
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.otras} value="otras" />}
                                                                label={t("registro.label-areas-otras")}
                                                            />
                                                        </Grid>
                                                        {this.state.perfilIndividual.areasDisciplinares.otras ? (
                                                            <Grid item xs={12} className="py-0">
                                                                <TextField
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                    fullWidth
                                                                    id="areasDisciplinaresOtras"
                                                                    label={t("registro.areas-otras")}
                                                                    name="otrasCuales"
                                                                    value={this.state.perfilIndividual.areasDisciplinares.otrasCuales}
                                                                    onChange={this.actualizarOtrasAreasDisciplinares}
                                                                />
                                                            </Grid>
                                                        ) : ""}
                                                    </Grid>
                                                </FormGroup>
                                            </Grid>
                                        </React.Fragment>
                                    ) : ""}
                                </Grid>
                                {this.state.perfilIndividual.cualInstitucionRepresenta !== "Otra" ? (
                                    <React.Fragment>
                                        <hr/>
                                        <Typography variant="body1" className="mb-2"><strong>{t("registro.label-datos-perfil")}</strong></Typography>
                                        <Grid container spacing={2} className="mb-2">
                                            <Grid item xs={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid container>
                                                            <Grid item xs={12} className="py-0">
                                                                <TextField
                                                                    inputProps={{
                                                                        "aria-label": `${t("aria.usuario")}`
                                                                    }}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                    fullWidth
                                                                    id="usuario"
                                                                    label={t("registro.usuario")}
                                                                    name="perfilIndividual.usuario"
                                                                    value={this.state.perfilIndividual.usuario}
                                                                    onChange={this.handleProfileInfoChange}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} className="py-0">
                                                                <TextField
                                                                    inputProps={{
                                                                        "aria-label": `${t("aria.contrasenia")}`
                                                                    }}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    required
                                                                    fullWidth
                                                                    id="contrasenia"
                                                                    label={t("registro.contrasenia")}
                                                                    name="perfilIndividual.contrasenia"
                                                                    value={this.state.perfilIndividual.constrasenia}
                                                                    onChange={this.handleProfileInfoChange}
                                                                    type="password"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid container>
                                                            <Grid item xs={12} className="py-0 my-md-3">
                                                                {this.state.perfilIndividual.imgPerfil.src === "" ? <Typography variant="body2" className="mb-3">{t("registro.label-img-perfil")} <em>{t("opcional")}</em></Typography> : ""}
                                                                {this.state.perfilIndividual.imgPerfil.src !== "" ? (
                                                                    <img src={this.state.perfilIndividual.imgPerfil.src} alt="" className="w-100 mb-3"/>
                                                                ) : ""}
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    component="label"
                                                                    fullWidth
                                                                >
                                                                    {t("seleccionar-archivo")}
                                                                    <input type="file" accept="image/*" onChange={this.actualizarImgPerfil} style={{ display: "none" }} />
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} className="py-0">
                                                <TextField
                                                    inputProps={{
                                                        "aria-label": `${t("aria.email")}`
                                                    }}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="correo"
                                                    label={t("registro.email")}
                                                    name="perfilIndividual.correo"
                                                    value={this.state.perfilIndividual.correo}
                                                    onChange={this.handleProfileInfoChange}
                                                    type="email"
                                                />
                                            </Grid>
                                            <Grid item xs={12} className="py-0">
                                                <TextField
                                                    inputProps={{
                                                        "aria-label": `${t("aria.num-contacto")}`
                                                    }}
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="numContacto"
                                                    label={t("registro.num-contacto")}
                                                    name="perfilIndividual.numContacto"
                                                    value={this.state.perfilIndividual.numContacto}
                                                    onChange={this.handleProfileInfoChange}
                                                    type="tel"
                                                />
                                            </Grid>
                                            <Grid item xs={12} className="py-0">
                                                <TextField
                                                    inputProps={{
                                                        "aria-label": `${t("aria.web-personal")}`
                                                    }}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="webPersonal"
                                                    label={t("registro.web-personal")}
                                                    name="perfilIndividual.webPersonal"
                                                    value={this.state.perfilIndividual.webPersonal}
                                                    onChange={this.handleProfileInfoChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Reaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onVerify={this.onCaptchaVerify} onRender={this.onCaptchaRender} onExpire={this.onCaptchaExpire} className="my-4 d-flex align-items-center justify-content-center"/>
                                        {
                                            !this.state.isCaptchaRendered ? <CircularProgress color="primary" className="d-block mx-auto my-4"/> : ""
                                        }
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className="mt-2"
                                            size="large"
                                        >
                                            {t("registro.btn-guardar")}
                                        </Button>
                                    </React.Fragment>
                                ) : ""}
                            </form>
                        </React.Fragment>
                    )
                }
            </Translation>
        );

		return (
            <Translation>
                {
                    t => (
                        <div className="mb-2 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                            <Typography
                                component="h1"
                                variant="h5"
                                className="mb-4 text-center"
                            >
                                <strong>{t("registro.titulo-principal")}</strong>
                                <hr className="mt-5"/>
                            </Typography>
                            <FormControl
                                component="fieldset"
                                className="w-100 text-center"
                            >
                            </FormControl>
                            {formulario}
                            <hr className="my-4"/>
                            <div className="text-center">
                                <Typography variant="body2">{t("registro.login")}</Typography>
                                <Link to={`/${t("link.login")}`} color="primary" style={{color:"#009A9C"}}>
                                    <Typography variant="body2" color="primary"><strong>{t("registro.login-link")}</strong></Typography>
                                </Link>
                            </div>
                            <Dialog open={this.state.submittedWithoutCaptcha} onClose={this.reinitDialogCaptcha} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{t("captcha.sin-resolver")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {t("captcha.sin-resolver-ayuda")}
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )
                }
            </Translation>
		);
	};
}

export default Registro;