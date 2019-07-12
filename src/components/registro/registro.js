import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from "@material-ui/core/Radio";
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Checkbox from '@material-ui/core/Checkbox';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Establecimiento from "../establecimiento/establecimiento";

class Registro extends Component {
    constructor() {
        super();
        this.initialState = {
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
                    <Typography variant="body1" className="mb-2"><strong>Datos personales</strong></Typography>
                    <form onSubmit={this.registrar}>
                        <Grid container spacing={2} className="mb-2">
                            <Grid item xs={12} md={6} className="py-0">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="nombres"
                                    label="Nombres"
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
                                    label="Apellidos"
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
                                    label="Fecha de Nacimiento"
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
                                    label="Descripción personal"
                                    name="perfilIndividual.descripcionPersonal"
                                    type="text"
                                    value={this.state.perfilIndividual.descripcionPersonal}
                                    onChange={this.handleProfileInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="educacionMaxima">Educación formal máxima (alcanzada o en curso) *</InputLabel>
                                    <Select
                                        value={this.state.perfilIndividual.educacionMaxima}
                                        onChange={this.handleProfileInfoChange}
                                        input={<OutlinedInput required name="perfilIndividual.educacionMaxima" id="educacionMaxima"/>}
                                    >
                                        <MenuItem value="Bachiller">Bachiller</MenuItem>
                                        <MenuItem value="Técnico">Técnico</MenuItem>
                                        <MenuItem value="Tecnólogo">Tecnólogo</MenuItem>
                                        <MenuItem value="Profesional">Profesional</MenuItem>
                                        <MenuItem value="Especialista">Especialista</MenuItem>
                                        <MenuItem value="Magister">Magister</MenuItem>
                                        <MenuItem value="Doctorado">Doctorado</MenuItem>
                                        <MenuItem value="Postdoctorado">Postdoctorado</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="aniosExperiencia">¿Cuántos años tiene de experiencia docente?</InputLabel>
                                    <Select
                                        value={this.state.perfilIndividual.aniosExperiencia}
                                        onChange={this.handleProfileInfoChange}
                                        input={<OutlinedInput required name="perfilIndividual.aniosExperiencia" id="aniosExperiencia"/>}
                                    >
                                        <MenuItem value="No tengo experiencia">No tengo experiencia</MenuItem>
                                        <MenuItem value="Entre 1 y 5">Entre 1 y 5</MenuItem>
                                        <MenuItem value="Entre 5 y 10">Entre 5 y 10</MenuItem>
                                        <MenuItem value="Entre 10 y 15">Entre 10 y 15</MenuItem>
                                        <MenuItem value="Más de 15 años">Más de 15 años</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="representaInstitucionEducativa">¿Representa a una institución educativa? *</InputLabel>
                                    <Select
                                        value={this.state.perfilIndividual.representaInstitucionEducativa}
                                        onChange={this.handleProfileInfoChange}
                                        input={<OutlinedInput required name="perfilIndividual.representaInstitucionEducativa" id="representaInstitucionEducativa"/>}
                                    >
                                        <MenuItem value={true}>Sí</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
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
                                            <MenuItem value="Item 1">Item 1</MenuItem>
                                            <MenuItem value="Otra">Otra</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : ""}
                                {this.state.perfilIndividual.cualInstitucionRepresenta === "Otra" ? (
                                    <Typography variant="body2" color="secondary">Por favor consulte con su Insitución Educativa para que primero se realice el registro de ésta, o realícelo usted mismo.</Typography>
                                ) : ""}
                            </Grid>
                            {this.state.perfilIndividual.cualInstitucionRepresenta !== "Otra" ? (
                                <React.Fragment>
                                    <Grid item xs={12} className="py-0">
                                        <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                            <InputLabel htmlFor="esDirectivo">¿Es directivo docente? *</InputLabel>
                                            <Select
                                                value={this.state.perfilIndividual.esDirectivo}
                                                onChange={this.handleProfileInfoChange}
                                                input={<OutlinedInput required name="perfilIndividual.esDirectivo" id="esDirectivo"/>}
                                            >
                                                <MenuItem value={true}>Sí</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {this.state.perfilIndividual.esDirectivo ? (
                                            <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                                <InputLabel htmlFor="tipoDirectivo">Tipo de directivo docente *</InputLabel>
                                                <Select
                                                    value={this.state.perfilIndividual.tipoDirectivo}
                                                    onChange={this.handleProfileInfoChange}
                                                    input={<OutlinedInput required name="perfilIndividual.tipoDirectivo" id="tipoDirectivo"/>}
                                                >
                                                    <MenuItem value="Rector">Rector</MenuItem>
                                                    <MenuItem value="Director">Director</MenuItem>
                                                    <MenuItem value="Coordinador">Coordinador</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : ""}
                                    </Grid>
                                    <Grid item xs={12} className="mt-2">
                                        <FormLabel component="legend" className="mb-4">¿En qué niveles enseña?</FormLabel>
                                        <FormGroup>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.noAplica} value="noAplica" />}
                                                        label="No aplica"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.preescolar} value="preescolar" />}
                                                        label="Preescolar"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.basicaPrimaria} value="basicaPrimaria" />}
                                                        label="Básica primaria"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.basicaSecundaria} value="basicaSecundaria" />}
                                                        label="Básica secundaria"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.mediaAcademica} value="mediaAcademica" />}
                                                        label="Media académica"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarNiveles} color="primary" checked={this.state.perfilIndividual.niveles.mediaTecnica} value="mediaTecnica" />}
                                                        label="Media técnica"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} className="mt-2">
                                        <FormLabel component="legend" className="mb-4">Señale en qué áreas disciplinares trabaja en el establecimiento educativo - puede elegir más de una opción.</FormLabel>
                                        <FormGroup>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.naturales} value="naturales" />}
                                                        label="Ciencias naturales y educación ambiental"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.sociales} value="sociales" />}
                                                        label="Ciencias sociales, historia, geografía y constitución política y democracia"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.arte} value="arte" />}
                                                        label="Educación artística y cultural"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.etica} value="etica" />}
                                                        label="Educación ética y en valores humanos"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.deporte} value="deporte" />}
                                                        label="Educación física, recreación y deporte"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.religion} value="religion" />}
                                                        label="Educación Religiosa"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.humanidades} value="humanidades" />}
                                                        label="Humanidades (lengua castellana e idiomas extranjeros)"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.matematicas} value="matematicas" />}
                                                        label="Matemáticas"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.informatica} value="informatica" />}
                                                        label="Tecnología e informática"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} className="py-0">
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={this.actualizarAreasDisciplinares} color="primary" checked={this.state.perfilIndividual.areasDisciplinares.otras} value="otras" />}
                                                        label="Otra(s)"
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
                                                            label="¿Cuál(es)?"
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
                                <Typography variant="body1" className="mb-2"><strong>Datos de perfil</strong></Typography>
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
                                                            label="Usuario"
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
                                                            label="Contraseña"
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
                                                        {this.state.perfilIndividual.imgPerfil.src === "" ? <Typography variant="body2" className="mb-3">Adjunte una imagen de perfil <em>(opcional)</em></Typography> : ""}
                                                        {this.state.perfilIndividual.imgPerfil.src !== "" ? (
                                                            <img src={this.state.perfilIndividual.imgPerfil.src} alt="Imagen de perfil seleccionada" className="w-100 mb-3"/>
                                                        ) : ""}
                                                        <Button
                                                            variant="contained"
                                                            component="label"
                                                            fullWidth
                                                        >
                                                            Seleccionar archivo
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
                                            label="Correo electrónico"
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
                                            label="Número de contacto"
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
                                            label="Página web personal"
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
                                    Guardar datos
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
					<strong>Registro de datos</strong>
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