import React, { Component } from "react";

import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { Translation, getI18n } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Chip from '@material-ui/core/Chip';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Edit from '@material-ui/icons/Edit';
import AddCircle from "@material-ui/icons/AddCircle";
import Cancel from "@material-ui/icons/Cancel";

class Configuracion extends Component {
    constructor(props) {
        super(props);

        /* Conectarse al backend para traer la información verdadera de la configuración actual */
        this.state = {
            rolActual: props.userType,
            rolSeleccionado: props.userType,
            versionActual: "1.0.0",
            versionSeleccionada: "1.0.0",
            versionesDisponibles: ["1.0.0", "1.0.1"],
            idiomaActual: "es",
            idiomaSeleccionado: "es",
            idiomasDisponibles: [
                {
                    codigo: "es",
                    label: "Español"
                },
                {
                    codigo: "en",
                    label: "English"
                }
            ],
            parametrosPlataforma: {
                nuevoFormato: "",
                formatosActuales: [".pdf", ".jpg", ".png", ".xlsx", ".xlsm", ".doc", ".docx", ".mp4", ".mp3"],
                tamanioArchivosBytes: 5000,
                recaptchaSitekey: "Officiaelitveniamcommodoeiusmodaliquip",
            },
            mostrarRecaptchaSitekey: false,
            imgPerfil: {
                file: "",
                src: "https://via.placeholder.com/500",
                name: ""
            },
            usuario: "usuario-1",
            contrasenia: "loremipsum123",
            mostrarContrasenia: false,
            isEditandoInfoCuenta: false,
            isEditandoInfoPersonal: false,
            isEditandoInfoPlataforma: false,
            isEliminarChecked: false,
            isCuentaEliminada: false,
            docente: {
                nombres: "John",
                apellidos: "Doe",
                fechaNacimiento: "29-06-1958",
                educacionMaxima: "Magister",
                descripcionPersonal: "Fugiat eiusmod consectetur sint ipsum minim pariatur. Elit qui culpa do qui Lorem nulla quis. Ut esse labore irure quis adipisicing sit voluptate veniam laborum anim velit laboris reprehenderit. Officia consequat culpa sit nostrud elit eu consectetur laboris amet elit do consectetur voluptate.",
                aniosExperiencia: "Más de 15 años",
                representaIE: "no",
                cualIErepresenta: "",
                isDirectivo: "no",
                tipoDirectivo: "",
                niveles: [
                    {
                        label: "registro.no-aplica",
                        isSelected: false
                    },
                    {
                        label: "registro.preescolar",
                        isSelected: false
                    },
                    {
                        label: "registro.primaria",
                        isSelected: false
                    },
                    {
                        label: "registro.secundaria",
                        isSelected: true
                    },
                    {
                        label: "registro.academica",
                        isSelected: true
                    },
                    {
                        label: "registro.tecnica",
                        isSelected: true
                    },
                ],
                areas: [
                    {
                        label: "registro.naturales",
                        isSelected: true
                    },
                    {
                        label: "registro.sociales",
                        isSelected: false
                    },
                    {
                        label: "registro.arte",
                        isSelected: false
                    },
                    {
                        label: "registro.etica",
                        isSelected: false
                    },
                    {
                        label: "registro.deporte",
                        isSelected: false
                    },
                    {
                        label: "registro.religion",
                        isSelected: false
                    },
                    {
                        label: "registro.humanidades",
                        isSelected: false
                    },
                    {
                        label: "registro.matematicas",
                        isSelected: true
                    },
                    {
                        label: "registro.informatica",
                        isSelected: false
                    },
                    {
                        label: "registro.label-areas-otras",
                        isSelected: false
                    }
                ],
                isOtrasAreas: false,
                otrasAreasCuales: ""
            },
            tipoEncuestas: "institucion"
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        /* Actualizar el backend de acuerdo con la configuración cambiada */
        switch (e.target.name) {
            case "rolSeleccionado":
                this.props.actualizarRol(e.target.value);
                break;
            case "versionSeleccionada":

                break;
            case "idiomaSeleccionado":
                getI18n().changeLanguage(e.target.value);
                break;
            case "tipoEncuestas":

                break;
            default:
                break;
        }
    }

    toggleEditingAccountData = () => {
        this.setState({
            isEditandoInfoCuenta: !this.state.isEditandoInfoCuenta
        });
    }

    toggleEditingPersonalData = () => {
        this.setState({
            isEditandoInfoPersonal: !this.state.isEditandoInfoPersonal
        });
    }
    
    toggleEditingPlatformData = () => {
        this.setState({
            isEditandoInfoPlataforma: !this.state.isEditandoInfoPlataforma
        });
    }

    actualizarInfoCuenta = () => {
        this.toggleEditingAccountData();

        /* Enviar al backend los datos nuevos del estado correspondiente */
    }

    actualizarInfoPersonal = () => {
        this.toggleEditingPersonalData();

        /* Enviar al backend los datos nuevos del estado correspondiente */
    }
    
    actualizarInfoPlataforma = () => {
        this.toggleEditingPlatformData();

        /* Enviar al backend los datos nuevos del estado correspondiente */
    }

    handleClickMostrarContrasenia = () => {
        this.setState({
            mostrarContrasenia: !this.state.mostrarContrasenia
        });
    }

    handleMouseDownMostrarContrasenia = e => {
        e.preventDefault();
    }
    
    handleClickMostrarRecaptchaSitekey = () => {
        this.setState({
            mostrarRecaptchaSitekey: !this.state.mostrarRecaptchaSitekey
        });
    }

    handleMouseDownMostrarRecaptchaSitekey = e => {
        e.preventDefault();
    }

    actualizarImgPerfil = e => {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.onloadend = e => {
            const newSrc = fileReader.result;

            this.setState({
                imgPerfil: {
                    ...this.state.imgPerfil,
                    src: newSrc,
                    name: file.name
                }
            });
        };

        if (file) {
            this.setState({
                imgPerfil: {
                    ...this.state.imgPerfil,
                    file: file
                }
            });
            fileReader.readAsDataURL(file);
        }
    }

    handleEliminarCheck = e => {
        this.setState({
            isEliminarChecked: e.target.checked
        });
    }

    eliminarCuenta = () => {
        this.setState({
            isCuentaEliminada: true
        });
        
        /* Enviar solicitud al backend */
    }

    handleDocenteChange = e => {
        this.setState({
            docente: {
                ...this.state.docente,
                [e.target.name]: e.target.value
            }
        });
    }

    handleDocenteCheckboxChange = (e, i) => {
        let newElements = [...this.state.docente[e.target.name]];
        let isOtrasSelected = false;
        newElements[i] = {
            label: e.target.value,
            isSelected: e.target.checked
        }

        if (e.target.value === "registro.label-areas-otras") {
            if (e.target.checked) {
                isOtrasSelected = true;
            } else {
                isOtrasSelected = false;
            }
        }

        this.setState({
            docente: {
                ...this.state.docente,
                [e.target.name]: newElements,
                isOtrasAreas: isOtrasSelected
            }
        });
    }

    handleChangeParametrosPlataforma = e => {
        this.setState({
            parametrosPlataforma: {
                ...this.state.parametrosPlataforma,
                [e.target.name]: e.target.value
            }
        });
    }

    agregarFormato = () => {
        let nuevoFormato = this.state.parametrosPlataforma.nuevoFormato;
        if (nuevoFormato !== "" && nuevoFormato !== null && nuevoFormato !== undefined) {  
            if (nuevoFormato.charAt(0) !== ".") {
                nuevoFormato = "." + nuevoFormato;
            }

            let isNew = true;
            this.state.parametrosPlataforma.formatosActuales.forEach(formato => {
                if (formato === nuevoFormato) {
                    isNew = false;
                }
            });

            if (isNew) {
                const nuevosFormatos = [...this.state.parametrosPlataforma.formatosActuales];
                nuevosFormatos.push(nuevoFormato);
        
                this.setState({
                    parametrosPlataforma: {
                        ...this.state.parametrosPlataforma,
                        formatosActuales: nuevosFormatos,
                        nuevoFormato: ""
                    }
                });
            } else {
                this.setState({
                    parametrosPlataforma: {
                        ...this.state.parametrosPlataforma,
                        nuevoFormato: ""
                    }
                });
            }
        }
    }

    borrarFormato = index => {
        if (this.state.isEditandoInfoPlataforma) {
            const nuevosFormatos = [...this.state.parametrosPlataforma.formatosActuales];
            nuevosFormatos.splice(index, 1);
    
            this.setState({
                parametrosPlataforma: {
                    ...this.state.parametrosPlataforma,
                    formatosActuales: nuevosFormatos
                }
            });   
        }
    }

    render() {
        if (this.state.isCuentaEliminada) {
            this.props.actualizarLogeado(false);
            return <Redirect to="/"/>
        }
        if (this.state.rolSeleccionado !== this.state.rolActual) {
            return <Redirect to="/"/>;
        }

        return (
            <Translation>
                {
                    (t, i18n) => (
                        <Grid container>
                            <Helmet>
                                <title>{`${t("titulo.configuracion")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid item xs={12} className="mb-5">
                                <Typography variant="h5" component="h1">
                                    {t("configuracion.titulo")}
                                </Typography>
                                <hr/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className="mr-4">
                                    {t("configuracion.ajustes-plataforma")}
                                </Typography>
                                <hr/>
                            </Grid>
                            <Grid item xs={12} className="mb-5">
                                {
                                    this.props.roles.length > 1 ? (
                                        <Grid container spacing={5} alignItems="center">
                                            <Grid item xs={6}>
                                                <Typography variant="subtitle2" className="mr-4">
                                                    {t("configuracion.label-rol")}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl variant="outlined" className="w-100">
                                                    <Select
                                                        value={this.state.rolSeleccionado}
                                                        onChange={this.handleChange}
                                                        input={<OutlinedInput required 
                                                        name="rolSeleccionado"/>}
                                                    >
                                                        {
                                                            this.props.roles.map((rol, i) => (
                                                                <MenuItem key={i} value={rol}>{rol.charAt(0) + rol.slice(1).toLowerCase()}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    ) : ""
                                }
                                <Grid container spacing={5} alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" className="mr-4">
                                            {t("configuracion.label-version")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className="w-100">
                                            <Select
                                                value={this.state.versionSeleccionada}
                                                onChange={this.handleChange}
                                                input={<OutlinedInput required 
                                                name="versionSeleccionada" id="version-instrumento"/>}
                                            >
                                                {
                                                    this.state.versionesDisponibles.map((version, i) => {
                                                        return (
                                                            <MenuItem key={i} value={version}>{version}</MenuItem>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" className="mr-4">
                                            {t("configuracion.label-idioma")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className="w-100">
                                            <Select
                                                value={this.state.idiomaSeleccionado}
                                                onChange={this.handleChange}
                                                input={<OutlinedInput required name="idiomaSeleccionado" id="idioma"/>}
                                            >
                                                {
                                                    this.state.idiomasDisponibles.map((language, i) => {
                                                        return (
                                                            <MenuItem key={i} value={language.codigo}>{language.label}</MenuItem>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <Typography variant="h6" className="mr-4">
                                        {t("configuracion.ajustes-cuenta")}
                                    </Typography>
                                    <IconButton aria-label={t("aria.activar-edicion")} color="primary" onClick={this.toggleEditingAccountData}>
                                        <Edit color="primary"/>
                                    </IconButton>
                                </div>
                                <hr/>
                            </Grid>
                            <Grid item xs={12} className="mb-5">
                                <Grid container spacing={5} alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" className="mr-4">
                                            {t("configuracion.label-imagen")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img src={this.state.imgPerfil.src} alt="" className="d-block configuracion-img mx-auto mb-3"/>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            color="primary"
                                            fullWidth
                                            size="large"
                                            disabled={!this.state.isEditandoInfoCuenta}
                                            className="text-center"
                                        >
                                            {t("seleccionar-archivo")}
                                            <input type="file" accept="image/*" onChange={this.actualizarImgPerfil} style={{ display: "none" }} />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" className="mr-4">
                                            {t("configuracion.label-usuario")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.usuario")}`
                                            }}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="usuario"
                                            name="usuario"
                                            value={this.state.usuario}
                                            onInput={this.handleChange}
                                            disabled={!this.state.isEditandoInfoCuenta}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} alignItems="center">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" className="mr-4">
                                            {t("configuracion.label-contrasenia")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl className="w-100">
                                            <OutlinedInput
                                                inputProps={{
                                                    "aria-label": `${t("aria.contrasenia")}`
                                                }}
                                                id="contrasenia"
                                                type={this.state.mostrarContrasenia ? 'text' : 'password'}
                                                value={this.state.contrasenia}
                                                onChange={this.handleChange}
                                                disabled={!this.state.isEditandoInfoCuenta}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={t("aria.switch-visibilidad")}
                                                            hidden={!this.state.isEditandoInfoCuenta}
                                                            onClick={this.handleClickMostrarContrasenia}
                                                            onMouseDown={this.handleMouseDownMostrarContrasenia}
                                                        >
                                                            {this.state.mostrarContrasenia ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <div className="d-flex align-items-center justify-content-end">
                                            {
                                                this.state.isEditandoInfoCuenta ? (
                                                    <Button size="large" color="primary" variant="contained" onClick={this.actualizarInfoCuenta}>{t("usuarios.btn-guardar")}</Button>
                                                ) : ""
                                            }
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {
                                this.props.userType === "DOCENTE" ? (
                                    <React.Fragment>
                                        <Grid item xs={12}>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <Typography variant="h6" className="mr-4">
                                                    {t("configuracion.label-personal")}
                                                </Typography>
                                                <IconButton aria-label={t("aria.activar-edicion")} color="primary" onClick={this.toggleEditingPersonalData}>
                                                    <Edit color="primary"/>
                                                </IconButton>
                                            </div>
                                            <hr/>
                                        </Grid>
                                        <Grid item xs={12} className="mb-5">
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.nombres")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{
                                                                "aria-label": `${t("aria.nombres")}`
                                                            }}
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            id="docente.nombres"
                                                            name="nombres"
                                                            value={this.state.docente.nombres}
                                                            onInput={this.handleDocenteChange}
                                                            disabled={!this.state.isEditandoInfoPersonal}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.apellidos")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{
                                                                "aria-label": `${t("aria.appelidos")}`
                                                            }}
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            id="docente.apellidos"
                                                            name="apellidos"
                                                            value={this.state.docente.apellidos}
                                                            onInput={this.handleDocenteChange}
                                                            disabled={!this.state.isEditandoInfoPersonal}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.fecha-nacimiento")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{
                                                                "aria-label": `${t("aria.fecha-nacimiento")}`
                                                            }}
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            id="docente.fecha-nacimiento"
                                                            name="fechaNacimiento"
                                                            placeholder="DD/MM/AAAA"
                                                            value={this.state.docente.fechaNacimiento}
                                                            onInput={this.handleDocenteChange}
                                                            disabled={!this.state.isEditandoInfoPersonal}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.educacion-maxima")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <Select
                                                            value={this.state.docente.educacionMaxima}
                                                            disabled={!this.state.isEditandoInfoPersonal}
                                                            onChange={this.handleDocenteChange}
                                                            input={<OutlinedInput required name="educacionMaxima" id="docente.educacion-maxima"/>}
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
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.descripcion-personal")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{
                                                                "aria-label": `${t("aria.descripcion-personal")}`
                                                            }}
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            multiline
                                                            rows="5"
                                                            id="docente.descripcion-personal"
                                                            name="descripcionPersonal"
                                                            value={this.state.docente.descripcionPersonal}
                                                            onInput={this.handleDocenteChange}
                                                            disabled={!this.state.isEditandoInfoPersonal}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.anios-experiencia")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <Select
                                                            value={this.state.docente.aniosExperiencia}
                                                            disabled={!this.state.isEditandoInfoPersonal}
                                                            onChange={this.handleDocenteChange}
                                                            input={<OutlinedInput required name="aniosExperiencia" id="docente.anios-experiencia"/>}
                                                        >
                                                            <MenuItem value="No tengo experiencia">{t("registro.experiencia-0")}</MenuItem>
                                                            <MenuItem value="Entre 1 y 5">{t("registro.experiencia-1")}</MenuItem>
                                                            <MenuItem value="Entre 5 y 10">{t("registro.experiencia-2")}</MenuItem>
                                                            <MenuItem value="Entre 10 y 15">{t("registro.experiencia-3")}</MenuItem>
                                                            <MenuItem value="Más de 15 años">{t("registro.experiencia-4")}</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.representa-ie")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <RadioGroup name="representaIE" value={this.state.docente.representaIE} onChange={this.handleDocenteChange} row>
                                                            <FormControlLabel
                                                                value="si"
                                                                control={<Radio color="primary" />}
                                                                label="Sí"
                                                                labelPlacement="end"
                                                                disabled={!this.state.isEditandoInfoPersonal}
                                                            />
                                                            <FormControlLabel
                                                                value="no"
                                                                control={<Radio color="primary" />}
                                                                label="No"
                                                                labelPlacement="end"
                                                                className="ml-3"
                                                                disabled={!this.state.isEditandoInfoPersonal}
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            {
                                                this.state.docente.representaIE === "si" ? (
                                                    <Grid container spacing={5} alignItems="center">
                                                        <Grid item xs={6}>
                                                            <Typography variant="subtitle2" className="mr-4">
                                                                {t("configuracion.representa-ie-cual")}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl variant="outlined" className="w-100">
                                                                <Select
                                                                    value={this.state.docente.cualIErepresenta}
                                                                    disabled={!this.state.isEditandoInfoPersonal}
                                                                    onChange={this.handleDocenteChange}
                                                                    input={<OutlinedInput required name="cualIErepresenta" id="docente.cual-ie-representa"/>}
                                                                >
                                                                    {/* Cargar la lista de IE disponibles */}
                                                                    <MenuItem value="item 1">Item 1</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                ) : ""
                                            }
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.es-directivo")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <RadioGroup name="isDirectivo" value={this.state.docente.isDirectivo} onChange={this.handleDocenteChange} row>
                                                            <FormControlLabel
                                                                value="si"
                                                                control={<Radio color="primary" />}
                                                                label="Sí"
                                                                labelPlacement="end"
                                                                disabled={!this.state.isEditandoInfoPersonal}
                                                            />
                                                            <FormControlLabel
                                                                value="no"
                                                                control={<Radio color="primary" />}
                                                                label="No"
                                                                labelPlacement="end"
                                                                className="ml-3"
                                                                disabled={!this.state.isEditandoInfoPersonal}
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            {
                                                this.state.docente.isDirectivo === "si" ? (
                                                    <Grid container spacing={5} alignItems="center">
                                                        <Grid item xs={6}>
                                                            <Typography variant="subtitle2" className="mr-4">
                                                                {t("configuracion.tipo-directivo")}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <FormControl variant="outlined" className="w-100">
                                                                <Select
                                                                    value={this.state.docente.tipoDirectivo}
                                                                    disabled={!this.state.isEditandoInfoPersonal}
                                                                    onChange={this.handleDocenteChange}
                                                                    input={<OutlinedInput required name="tipoDirectivo" id="docente.tipo-directivo"/>}
                                                                >
                                                                    <MenuItem value="Rector">{t("registro.rector")}</MenuItem>
                                                                    <MenuItem value="Director">{t("registro.director")}</MenuItem>
                                                                    <MenuItem value="Coordinador">{t("registro.coordinador")}</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                ) : ""
                                            }
                                            <Grid container spacing={5} alignItems="flex-start">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.niveles")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        {
                                                            this.state.docente.niveles.map((nivel, i) => (
                                                                <FormControlLabel
                                                                    key={i}
                                                                    control={<Checkbox checked={this.state.docente.niveles[i].isSelected} onChange={e => {
                                                                        this.handleDocenteCheckboxChange(e, i);
                                                                    }} color="primary" 
                                                                    value={nivel.label} name="niveles" disabled={!this.state.isEditandoInfoPersonal}/>}
                                                                    label={t(nivel.label)}
                                                                />
                                                            ))
                                                        }
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="flex-start">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4">
                                                        {t("configuracion.areas")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        {
                                                            this.state.docente.areas.map((area, i) => (
                                                                <FormControlLabel
                                                                    key={i}
                                                                    control={<Checkbox checked={this.state.docente.areas[i].isSelected} onChange={e => {
                                                                        this.handleDocenteCheckboxChange(e, i);
                                                                    }} color="primary" 
                                                                    value={area.label} name="areas" disabled={!this.state.isEditandoInfoPersonal}/>}
                                                                    label={t(area.label)}
                                                                />
                                                            ))
                                                        }
                                                    </FormControl>
                                                    {
                                                        this.state.docente.isOtrasAreas ? (
                                                            <FormControl variant="outlined" className="w-100">
                                                                <TextField
                                                                    inputProps={{
                                                                        "aria-label": `${t("aria.otras-areas")}`
                                                                    }}
                                                                    variant="outlined"
                                                                    required
                                                                    fullWidth
                                                                    label={t("registro.areas-otras")}
                                                                    id="docente.otras-areas-cuales"
                                                                    name="otrasAreasCuales"
                                                                    value={this.state.docente.otrasAreasCuales}
                                                                    onInput={this.handleDocenteChange}
                                                                    disabled={!this.state.isEditandoInfoPersonal}
                                                                />
                                                            </FormControl>
                                                        ) : ""
                                                    }
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5}>
                                                <Grid item xs={12}>
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        {
                                                            this.state.isEditandoInfoPersonal ? (
                                                                <Button size="large" color="primary" variant="contained" onClick={this.actualizarInfoPersonal}>{t("usuarios.btn-guardar")}</Button>
                                                            ) : ""
                                                        }
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                ) : ""
                            }
                            {
                                this.props.userType === "SUPERADMIN" ? (
                                    <React.Fragment>
                                        <Grid item xs={12}>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <Typography variant="h6" className="mr-4">
                                                    {t("configuracion.parametros-plataforma")}
                                                </Typography>
                                                <IconButton aria-label={t("aria.activar-edicion")} color="primary" onClick={this.toggleEditingPlatformData}>
                                                    <Edit color="primary"/>
                                                </IconButton>
                                            </div>
                                            <hr/>
                                        </Grid>
                                        <Grid item xs={12} className="mb-5">
                                            <Grid container spacing={5} alignItems="flex-start">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4 mt-1 mt-md-3">
                                                        {t("configuracion.formatos")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl className="w-100">
                                                        <OutlinedInput
                                                            inputProps={{
                                                                "aria-label": `${t("aria.nuevo-formato")}`
                                                            }}
                                                            className="mb-3"
                                                            name="nuevoFormato"
                                                            required
                                                            fullWidth
                                                            value={this.state.parametrosPlataforma.nuevoFormato}
                                                            onInput={this.handleChangeParametrosPlataforma}
                                                            disabled={!this.state.isEditandoInfoPlataforma}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label={t("aria.agregar-elemento")}
                                                                        hidden={!this.state.isEditandoInfoPlataforma}
                                                                        onClick={this.agregarFormato}
                                                                    >
                                                                        <AddCircle color="primary"/>
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </FormControl>
                                                    <Typography className="mb-2" variant="body2"><strong>{t("configuracion.formatos-actuales")}</strong></Typography>
                                                    {
                                                        this.state.parametrosPlataforma.formatosActuales.map((formato, i) => {
                                                            return <Chip
                                                                deleteIcon={<Cancel aria-label={t("aria.eliminar-elemento")} hidden={!this.state.isEditandoInfoPlataforma} />}
                                                                key={i}
                                                                label={formato}
                                                                onDelete={() => {this.borrarFormato(i)}}
                                                                className="m-1"
                                                            />
                                                        })
                                                    }
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4 mt-1 mt-md-3">
                                                        {t("configuracion.tamanio-archivos")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <TextField
                                                            inputProps={{
                                                                "aria-label": `${t("aria.tamanio-archivos")}`
                                                            }}
                                                            disabled={!this.state.isEditandoInfoPlataforma}
                                                            type="number"
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="tamanioArchivosBytes"
                                                            value={this.state.parametrosPlataforma.tamanioArchivosBytes}
                                                            onInput={this.handleChangeParametrosPlataforma}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5} alignItems="center">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4 mt-1 mt-md-3">
                                                        {t("configuracion.sitekey")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <OutlinedInput
                                                            inputProps={{
                                                                "aria-label": `${t("aria.key-recaptcha")}`
                                                            }}
                                                            id="recaptchaSitekey"
                                                            type={this.state.mostrarRecaptchaSitekey ? 'text' : 'password'}
                                                            value={this.state.parametrosPlataforma.recaptchaSitekey}
                                                            onChange={this.handleChangeParametrosPlataforma}
                                                            disabled={!this.state.isEditandoInfoPlataforma}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label={t("aria.switch-visibilidad")}
                                                                        hidden={!this.state.isEditandoInfoPlataforma}
                                                                        onClick={this.handleClickMostrarRecaptchaSitekey}
                                                                        onMouseDown={this.handleMouseDownMostrarRecaptchaSitekey}
                                                                    >
                                                                        {this.state.mostrarRecaptchaSitekey ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5}>
                                                <Grid item xs={12}>
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        {
                                                            this.state.isEditandoInfoPlataforma ? (
                                                                <Button size="large" color="primary" variant="contained" onClick={this.actualizarInfoPlataforma}>{t("usuarios.btn-guardar")}</Button>
                                                            ) : ""
                                                        }
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                ) : null
                            }
                            {
                                this.props.userType === "INSTITUCION" ? (
                                    <React.Fragment>
                                        <Grid item xs={12}>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <Typography variant="h6" className="mr-4">
                                                    {t("configuracion.parametros-plataforma")}
                                                </Typography>
                                                <IconButton aria-label={t("aria.activar-edicion")} color="primary" onClick={this.toggleEditingPlatformData}>
                                                    <Edit color="primary"/>
                                                </IconButton>
                                            </div>
                                            <hr/>
                                        </Grid>
                                        <Grid item xs={12} className="mb-5">
                                            <Grid container spacing={5} alignItems="flex-start">
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle2" className="mr-4 mt-1 mt-md-3">
                                                        {t("configuracion.encuestas")}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl variant="outlined" className="w-100">
                                                        <Select
                                                            disabled={!this.state.isEditandoInfoPlataforma}
                                                            value={this.state.tipoEncuestas}
                                                            onChange={this.handleChange}
                                                            input={<OutlinedInput required 
                                                            name="tipoEncuestas"/>}
                                                        >
                                                            <MenuItem value="institucion">{t("configuracion.encuestas-institucion")}</MenuItem>
                                                            <MenuItem value="sedes">{t("configuracion.encuestas-sedes")}</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={5}>
                                                <Grid item xs={12}>
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        {
                                                            this.state.isEditandoInfoPlataforma ? (
                                                                <Button size="large" color="primary" variant="contained" onClick={this.actualizarInfoPlataforma}>{t("usuarios.btn-guardar")}</Button>
                                                            ) : ""
                                                        }
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                ) : null
                            }
                            {
                                !this.props.isInViewingMode ? (
                                    <React.Fragment>
                                        <Grid item xs={12} className="mb-5">
                                            <hr />
                                        </Grid>
                                        <Paper className="p-5 w-100">
                                            <Grid item xs={12}>
                                                <Typography variant="h6" className="mr-4" color="secondary">
                                                    {t("configuracion.label-eliminar")}
                                                </Typography>
                                                <hr/>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={5} alignItems="center">
                                                        <Grid item xs={12} md={6}>
                                                            <Typography variant="body1" className="mr-4 mb-2">
                                                                <strong>{t("configuracion.label-eliminar-confirmacion")}</strong>
                                                            </Typography>
                                                            <Typography variant="body1" className="mr-4">
                                                                {t("configuracion.label-eliminar-confirmacion-2")}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} md={6} className="d-flex flex-column justify-content-end">
                                                            <FormControlLabel
                                                                control={<Checkbox style={{color: "#e53935"}} onChange={this.handleEliminarCheck} color="primary" 
                                                                checked={this.state.isEliminarChecked} name="isEliminarChecked" />}
                                                                label={<Typography variant="subtitle2" color="secondary">{t("configuracion.label-radio")}</Typography>}
                                                            />
                                                            <Button disabled={!this.state.isEliminarChecked} onClick={this.eliminarCuenta} fullWidth color="secondary" variant="outlined">
                                                                {t("configuracion.label-btn-eliminar")}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </React.Fragment>
                                ) : null
                            }
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default Configuracion;