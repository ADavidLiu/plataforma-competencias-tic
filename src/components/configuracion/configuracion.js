import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import FormGroup from '@material-ui/core/FormGroup';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class Configuracion extends Component {
    constructor() {
        super();

        /* Conectarse al backend para traer la información de la configuración actual */
        this.state = {
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
            imgPerfil: {
                file: "",
                src: "https://via.placeholder.com/500",
                name: ""
            },
            usuario: "usuario-1",
            contrasenia: "loremipsum123",
            mostrarContrasenia: false,
            isEditandoInfoCuenta: false
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    toggleEditingAccountData = () => {
        this.setState({
            isEditandoInfoCuenta: !this.state.isEditandoInfoCuenta
        });
    }

    actualizarInfoCuenta = () => {
        this.toggleEditingAccountData();

        /* Enviar al backend los datos nuevos del estado */
    }

    handleClickMostrarContrasenia = () => {
        this.setState({
            mostrarContrasenia: !this.state.mostrarContrasenia
        });
    }

    handleMouseDownMostrarContrasenia = e => {
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

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12} className="mb-5">
                        <Typography variant="h5">
                            <T phrase="configuracion.titulo"/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className="mr-4">
                            <T phrase="configuracion.ajustes-plataforma"/>
                        </Typography>
                        <hr/>
                    </Grid>
                    <Grid item xs={12} className="mb-5">
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mr-4">
                                    <T phrase="configuracion.label-version"/>
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
                                    <T phrase="configuracion.label-idioma"/>
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
                        <Typography variant="h6" className="mr-4">
                            <T phrase="configuracion.ajustes-cuenta"/>
                        </Typography>
                        <hr/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mr-4">
                                    <T phrase="configuracion.label-imagen"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <img src={this.state.imgPerfil.src} className="d-block w-50 mx-auto mb-3"/>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    disabled={!this.state.isEditandoInfoCuenta}
                                >
                                    <T phrase="seleccionar-archivo"/>
                                    <input type="file" accept="image/*" onChange={this.actualizarImgPerfil} style={{ display: "none" }} />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mr-4">
                                    <T phrase="configuracion.label-usuario"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
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
                                    <T phrase="configuracion.label-contrasenia"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className="w-100">
                                    <OutlinedInput
                                        id="contrasenia"
                                        type={this.state.mostrarContrasenia ? 'text' : 'password'}
                                        value={this.state.contrasenia}
                                        onChange={this.handleChange}
                                        disabled={!this.state.isEditandoInfoCuenta}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
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
                                            <Button size="large" color="primary" variant="contained" onClick={this.actualizarInfoCuenta}>Guardar</Button>
                                        ) : (
                                            <Button size="large" color="primary" variant="contained" onClick={this.toggleEditingAccountData}>Actualizar datos</Button>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Configuracion;