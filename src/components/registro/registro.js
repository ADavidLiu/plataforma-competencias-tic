import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Checkbox from '@material-ui/core/Checkbox';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

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
            isCompletado: false
        }

        this.state = this.initialState;
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
        this.setState({
            ...this.state,
            isCompletado: true
        });

        console.log("Enviar al backend!");
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }

        let formulario;
        let infoSedes = [];

        for (let i = 0; i < this.state.perfilInstitucional.numSedes; i++) {
            infoSedes.push(<Establecimiento actualizarInfoSedes={this.actualizarInfoSedes} isCompletado={this.state.isCompletado} key={"sede-" + i} id={(i + 1).toString()} />);
        }

        if (this.state.tipoPerfil === "Institucional") {
            formulario = (
                <React.Fragment>
                    <Typography variant="body1" className="mb-md-2"><strong>Datos de la Institución Educativa</strong></Typography>
                    <form onSubmit={this.registrar}>
                        <Grid container spacing={2} className="mb-2">
                            <Grid item xs={12} md={4} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="pais">País*</InputLabel>
                                    <Select
                                        value={this.state.perfilInstitucional.pais}
                                        onChange={this.handleProfileInfoChange}
                                        input={<OutlinedInput required name="perfilInstitucional.pais" id="pais"/>}
                                    >
                                        <MenuItem value="Colombia">Colombia</MenuItem>
                                        <MenuItem value="Venezuela">Venezuela</MenuItem>
                                        <MenuItem value="Panamá">Panamá</MenuItem>
                                        <MenuItem value="Perú">Perú</MenuItem>
                                        <MenuItem value="Ecuador">Ecuador</MenuItem>
                                        <MenuItem value="Bolivia">Bolivia</MenuItem>
                                        <MenuItem value="Paraguay">Paraguay</MenuItem>
                                        <MenuItem value="Uruguay">Uruguay</MenuItem>
                                        <MenuItem value="Chile">Chile</MenuItem>
                                        <MenuItem value="Brasil">Brasil</MenuItem>
                                        <MenuItem value="Argentina">Argentina</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="departamento"
                                    label="Departamento"
                                    name="perfilInstitucional.departamento"
                                    value={this.state.perfilInstitucional.departamento}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="municipio"
                                    label="Municipio"
                                    name="perfilInstitucional.municipio"
                                    value={this.state.perfilInstitucional.municipio}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="nombreIE"
                                    label="Nombre de la Institución Educativa"
                                    name="perfilInstitucional.nombreIE"
                                    value={this.state.perfilInstitucional.nombreIE}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="numSedes"
                                    label="Número de sedes"
                                    name="perfilInstitucional.numSedes"
                                    type="number"
                                    inputProps={{"min": 1}}
                                    value={this.state.perfilInstitucional.numSedes}
                                    onInput={this.handleProfileInfoChange}
                                />
                            </Grid>
                        </Grid>
                        {infoSedes}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-2"
                            size="large"
                        >
                            Registrar Insitución Educativa
                        </Button>
                    </form>
                </React.Fragment>
			);
        } else {
            formulario = (
                <React.Fragment>
                    <Typography variant="body1" className="mb-2"><strong><T phrase="registro.titulo"/></strong></Typography>
                    <form onSubmit={this.registrar}>
                        <Grid container spacing={2} className="mb-2">
                            <Grid item xs={12} md={6} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="nombres"
                                    label={<T phrase="registro.nombres"/>}
                                    name="perfilIndividual.nombres"
                                    value={this.state.perfilIndividual.nombres}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="apellidos"
                                    label={<T phrase="registro.apellidos"/>}
                                    name="perfilIndividual.apellidos"
                                    value={this.state.perfilIndividual.apellidos}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fechaNacimiento"
                                    label={<T phrase="registro.fecha-nacimiento"/>}
                                    name="perfilIndividual.fechaNacimiento"
                                    type="date"
                                    value={this.state.perfilIndividual.fechaNacimiento}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    inputProps={{ maxLength: 400 }}
                                    rows="5"
                                    id="descripcionPersonal"
                                    label={<T phrase="registro.descripcion-personal"/>}
                                    name="perfilIndividual.descripcionPersonal"
                                    type="text"
                                    value={this.state.perfilIndividual.descripcionPersonal}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="educacionMaxima"><T phrase="registro.label-educacion"/></InputLabel>
                                    <Select
                                        value={this.state.perfilIndividual.educacionMaxima}
                                        onChange={this.handleProfileInfoChange}
                                        input={<OutlinedInput required name="perfilIndividual.educacionMaxima" id="educacionMaxima"/>}
                                    >
                                        <MenuItem value="Bachiller"><T phrase="registro.educacion-bachiller"/></MenuItem>
                                        <MenuItem value="Técnico"><T phrase="registro.educacion-tecnico"/></MenuItem>
                                        <MenuItem value="Tecnólogo"><T phrase="registro.educacion-tecnologo"/></MenuItem>
                                        <MenuItem value="Profesional"><T phrase="registro.educacion-profesional"/></MenuItem>
                                        <MenuItem value="Especialista"><T phrase="registro.educacion-especialista"/></MenuItem>
                                        <MenuItem value="Magister"><T phrase="registro.educacion-magister"/></MenuItem>
                                        <MenuItem value="Doctorado"><T phrase="registro.educacion-doctorado"/></MenuItem>
                                        <MenuItem value="Postdoctorado"><T phrase="registro.educacion-postdoctorado"/></MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="aniosExperiencia"><T phrase="registro.label-anios-experiencia"/></InputLabel>
                                    <Select
                                        value={this.state.perfilIndividual.aniosExperiencia}
                                        onChange={this.handleProfileInfoChange}
                                        input={<OutlinedInput required name="perfilIndividual.aniosExperiencia" id="aniosExperiencia"/>}
                                    >
                                        <MenuItem value="No tengo experiencia"><T phrase="registro.experiencia-0"/></MenuItem>
                                        <MenuItem value="Entre 1 y 5"><T phrase="registro.experiencia-1"/></MenuItem>
                                        <MenuItem value="Entre 5 y 10"><T phrase="registro.experiencia-2"/></MenuItem>
                                        <MenuItem value="Entre 10 y 15"><T phrase="registro.experiencia-3"/></MenuItem>
                                        <MenuItem value="Más de 15 años"><T phrase="registro.experiencia-4"/></MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="representaInstitucionEducativa"><T phrase="registro.representa-ie"/></InputLabel>
                                    <Select
                                        value={this.state.perfilIndividual.representaInstitucionEducativa}
                                        onChange={this.handleProfileInfoChange}
                                        input={<OutlinedInput required name="perfilIndividual.representaInstitucionEducativa" id="representaInstitucionEducativa"/>}
                                    >
                                        <MenuItem value={true}><T phrase="si"/></MenuItem>
                                        <MenuItem value={false}><T phrase="no"/></MenuItem>
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

                                            <MenuItem value="Otra"><T phrase="registro.cual-label-otra"/></MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : ""}
                                {this.state.perfilIndividual.cualInstitucionRepresenta === "Otra" ? (
                                    <Typography variant="body2" color="secondary"><T phrase="registro.directivo-otra-error"/></Typography>
                                ) : ""}
                            </Grid>
                            {this.state.perfilIndividual.cualInstitucionRepresenta !== "Otra" ? (
                                <React.Fragment>
                                    <Grid item xs={12} className="py-0">
                                        <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                            <InputLabel htmlFor="esDirectivo"><T phrase="registro.label-directivo"/></InputLabel>
                                            <Select
                                                value={this.state.perfilIndividual.esDirectivo}
                                                onChange={this.handleProfileInfoChange}
                                                input={<OutlinedInput required name="perfilIndividual.esDirectivo" id="esDirectivo"/>}
                                            >
                                                <MenuItem value={true}><T phrase="si"/></MenuItem>
                                                <MenuItem value={false}><T phrase="no"/></MenuItem>
                                            </Select>
                                        </FormControl>
                                        {this.state.perfilIndividual.esDirectivo ? (
                                            <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                                <InputLabel htmlFor="tipoDirectivo"><T phrase="registro.label-tipo-directivo"/></InputLabel>
                                                <Select
                                                    value={this.state.perfilIndividual.tipoDirectivo}
                                                    onChange={this.handleProfileInfoChange}
                                                    input={<OutlinedInput required name="perfilIndividual.tipoDirectivo" id="tipoDirectivo"/>}
                                                >
                                                    <MenuItem value="Rector"><T phrase="registro.rector"/></MenuItem>
                                                    <MenuItem value="Director"><T phrase="registro.director"/></MenuItem>
                                                    <MenuItem value="Coordinador"><T phrase="registro.coordinador"/></MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : ""}
                                    </Grid>
                                    <Grid item xs={12} className="mt-2">
                                        <FormLabel component="legend" className="mb-4"><T phrase="registro.label-niveles"/></FormLabel>
                                        <FormGroup>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.noAplica} value="noAplica" />}
                                                        label={<T phrase="registro.no-aplica"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.preescolar} value="preescolar" />}
                                                        label={<T phrase="registro.preescolar"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.basicaPrimaria} value="basicaPrimaria" />}
                                                        label={<T phrase="registro.primaria"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.basicaSecundaria} value="basicaSecundaria" />}
                                                        label={<T phrase="registro.secundaria"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.mediaAcademica} value="mediaAcademica" />}
                                                        label={<T phrase="registro.academica"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.mediaTecnica} value="mediaTecnica" />}
                                                        label={<T phrase="registro.tecnica"/>}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} className="mt-2">
                                        <FormLabel component="legend" className="mb-4"><T phrase="registro.label-areas"/></FormLabel>
                                        <FormGroup>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.naturales} value="naturales" />}
                                                        label={<T phrase="registro.naturales"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.sociales} value="sociales" />}
                                                        label={<T phrase="registro.sociales"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.arte} value="arte" />}
                                                        label={<T phrase="registro.arte"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.etica} value="etica" />}
                                                        label={<T phrase="registro.etica"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.deporte} value="deporte" />}
                                                        label={<T phrase="registro.deporte"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.religion} value="religion" />}
                                                        label={<T phrase="registro.religion"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.humanidades} value="humanidades" />}
                                                        label={<T phrase="registro.humanidades"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.matematicas} value="matematicas" />}
                                                        label={<T phrase="registro.matematicas"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.informatica} value="informatica" />}
                                                        label={<T phrase="registro.informatica"/>}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.otras} value="otras" />}
                                                        label={<T phrase="registro.label-areas-otras"/>}
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
                                                            label={<T phrase="registro.areas-otras"/>}
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
                                <Typography variant="body1" className="mb-2"><strong><T phrase="registro.label-datos-perfil"/></strong></Typography>
                                <Grid container spacing={2} className="mb-2">
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <Grid container>
                                                    <Grid item xs={12} className="py-0">
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="usuario"
                                                            label={<T phrase="registro.usuario"/>}
                                                            name="perfilIndividual.usuario"
                                                            value={this.state.perfilIndividual.usuario}
                                                            onChange={this.handleProfileInfoChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} className="py-0">
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="contrasenia"
                                                            label={<T phrase="registro.contrasenia"/>}
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
                                                        {this.state.perfilIndividual.imgPerfil.src === "" ? <Typography variant="body2" className="mb-3"><T phrase="registro.label-img-perfil"/> <em><T phrase="opcional"/></em></Typography> : ""}
                                                        {this.state.perfilIndividual.imgPerfil.src !== "" ? (
                                                            <img src={this.state.perfilIndividual.imgPerfil.src} className="w-100 mb-3"/>
                                                        ) : ""}
                                                        <Button
                                                            variant="contained"
                                                            component="label"
                                                            fullWidth
                                                        >
                                                            <T phrase="seleccionar-archivo"/>
                                                            <input type="file" accept="image/*" onChange={this.actualizarImgPerfil} style={{ display: "none" }} />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="correo"
                                            label={<T phrase="registro.email"/>}
                                            name="perfilIndividual.correo"
                                            value={this.state.perfilIndividual.correo}
                                            onChange={this.handleProfileInfoChange}
                                            type="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="numContacto"
                                            label={<T phrase="registro.num-contacto"/>}
                                            name="perfilIndividual.numContacto"
                                            value={this.state.perfilIndividual.numContacto}
                                            onChange={this.handleProfileInfoChange}
                                            type="tel"
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="py-0">
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="webPersonal"
                                            label={<T phrase="registro.web-personal"/>}
                                            name="perfilIndividual.webPersonal"
                                            value={this.state.perfilIndividual.webPersonal}
                                            onChange={this.handleProfileInfoChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="mt-2"
                                    size="large"
                                >
                                    <T phrase="registro.btn-guardar"/>
                                </Button>
                            </React.Fragment>
                        ) : ""}
                    </form>
                </React.Fragment>
            );
        }

		return (
			<div className="mb-2 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
				<Typography
					component="h1"
					variant="h5"
					className="mb-4 text-center"
				>
					<strong><T phrase="registro.titulo-principal"/></strong>
                    <hr className="mt-5"/>
				</Typography>
				<FormControl
					component="fieldset"
					className="w-100 text-center"
				>
					{/* <Grid container>
						<Grid item xs={12}>
							<hr />
						</Grid>
						<Grid item xs={12}>
							<Typography
								variant="body1"
								className="mb-2"
							>
								<strong>
									Seleccione su tipo de perfil
								</strong>
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<RadioGroup
								aria-label="Perfil institucional"
								name="tipoPerfil"
								value={this.state.tipoPerfil}
								onChange={this.handleChange}
							>
								<Grid container>
									<Grid item xs={6}>
										<FormControlLabel
											className="mb-0"
											value="Institucional"
											control={
												<Radio color="primary" />
											}
											label="Institucional"
											labelPlacement="end"
										/>
									</Grid>
									<Grid item xs={6}>
										<FormControlLabel
											className="mb-0"
											value="Individual"
											control={
												<Radio color="primary" />
											}
											label="Individual"
											labelPlacement="end"
										/>
									</Grid>
								</Grid>
							</RadioGroup>
						</Grid>
						<Grid item xs={12}>
							<hr />
						</Grid>
					</Grid> */}
				</FormControl>
				{formulario}
                {/* <Link to="/login">
                    <Typography variant="body2" className="mt-3 text-center" color="primary">¿Ya está registrado? Inicie sesión aquí.</Typography>
                </Link> */}
			</div>
		);
	};
}

export default Registro;