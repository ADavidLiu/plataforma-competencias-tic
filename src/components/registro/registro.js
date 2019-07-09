import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
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

import Establecimiento from "../establecimiento/establecimiento";

class Registro extends Component {
    constructor() {
        super();
        this.state = {
            tipoPerfil: "Individual",
            pais: "",
            departamento: "",
            municipio: "",
            nombreIE: "",
            numSedes: "",
            sedes: [],
            nombres: "",
            apellidos: "",
            fechaNacimiento: "",
            educacionMaxima: "",
            descriptionPersonal: "",
            aniosExperiencia: 0,
            representaInstitucionEducativa: "",
            cualInstitucionRepresenta: "",
            esDirectivo: "",
            tipoDirectivo: "",
            isCompletado: false
        }
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    actualizarNumSedes = e => {
        this.setState({
            ...this.state,
            numSedes: e.target.value
        });
    }

    actualizarInfoSedes = nuevaInfoSede => {
        // Con setState sólo agrega los datos del último establecimiento si hay más de uno
        this.state.sedes.push(nuevaInfoSede);
    }

    /* Simulando cuando el registro se haya completado, para traer los datos de cada sede al estado. Debe quedar dentro del método "registrar" */
    handleClick = () => {
        this.setState({
            ...this.state,
            isCompletado: true
        });
    }

    registrar = e => {
        e.preventDefault();
        console.log("Enviar al backend!");
    }

    render() {
        let formulario;
        let infoSedes = [];

        for (let i = 0; i < this.state.numSedes; i++) {
            infoSedes.push(<Establecimiento actualizarInfoSedes={this.actualizarInfoSedes} isCompletado={this.state.isCompletado} key={"ee-" + i} id={(i + 1).toString()} />);
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
                                        value={this.state.pais}
                                        onChange={this.handleChange}
                                        input={<OutlinedInput required name="pais" id="pais"/>}
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
                                    name="departamento"
                                    onChange={this.handleChange}
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
                                    name="municipio"
                                    onChange={this.handleChange}
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
                                    name="nombreIE"
                                    onChange={this.handleChange}
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
                                    name="numSedes"
                                    type="number"
                                    min="1"
                                    value={this.state.numSedes}
                                    onInput={this.actualizarNumSedes}
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
                            onClick={this.handleClick}
                        >
                            Registrar Establecimiento Educativo
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
                                    name="nombres"
                                    onChange={this.handleChange}
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
                                    name="apellidos"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fechaNacimiento"
                                    label="Fecha de Nacimiento"
                                    name="fechaNacimiento"
                                    type="date"
                                    defaultValue="1950-05-24"
                                    onChange={this.handleChange}
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
                                    id="descriptionPersonal"
                                    label="Descripción personal"
                                    name="descriptionPersonal"
                                    type="text"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="educacionMaxima">Educación formal máxima (alcanzada o en curso) *</InputLabel>
                                    <Select
                                        value={this.state.educacionMaxima}
                                        onChange={this.handleChange}
                                        input={<OutlinedInput required name="educacionMaxima" id="educacionMaxima"/>}
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
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="aniosExperiencia"
                                    label="¿Cuántos años tiene de experiencia docente?"
                                    name="aniosExperiencia"
                                    type="number"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} className="py-0">
                                <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                    <InputLabel htmlFor="representaInstitucionEducativa">¿Representa a una institución educativa? *</InputLabel>
                                    <Select
                                        value={this.state.representaInstitucionEducativa}
                                        onChange={this.handleChange}
                                        input={<OutlinedInput required name="representaInstitucionEducativa" id="representaInstitucionEducativa"/>}
                                    >
                                        <MenuItem value={true}>Sí</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                </FormControl>
                                {this.state.representaInstitucionEducativa ? (
                                    <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                        <InputLabel htmlFor="cualInstitucionRepresenta">¿Cuál? *</InputLabel>
                                        <Select
                                            value={this.state.cualInstitucionRepresenta}
                                            onChange={this.handleChange}
                                            input={<OutlinedInput required name="cualInstitucionRepresenta" id="cualInstitucionRepresenta"/>}
                                        >
                                            <MenuItem value="Item 1">Item 1</MenuItem>
                                            <MenuItem value="Otra">Otra</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : ""}
                                {this.state.cualInstitucionRepresenta === "Otra" ? (
                                    <Typography variant="body2">Por favor consulte con su Insitución Educativa para que primero se realice el registro de ésta, o realícelo usted mismo.</Typography>
                                ) : ""}
                            </Grid>
                            {this.state.cualInstitucionRepresenta !== "Otra" ? (
                                <React.Fragment>
                                    <Grid item xs={12} className="py-0">
                                        <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                            <InputLabel htmlFor="esDirectivo">¿Es directivo docente? *</InputLabel>
                                            <Select
                                                value={this.state.esDirectivo}
                                                onChange={this.handleChange}
                                                input={<OutlinedInput required name="esDirectivo" id="esDirectivo"/>}
                                            >
                                                <MenuItem value={true}>Sí</MenuItem>
                                                <MenuItem value={false}>No</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {this.state.esDirectivo ? (
                                            <FormControl variant="outlined" className="w-100 mt-4 mt-md-3 mb-2">
                                                <InputLabel htmlFor="tipoDirectivo">Tipo de directivo docente *</InputLabel>
                                                <Select
                                                    value={this.state.tipoDirectivo}
                                                    onChange={this.handleChange}
                                                    input={<OutlinedInput required name="tipoDirectivo" id="tipoDirectivo"/>}
                                                >
                                                    <MenuItem value="Rector">Rector</MenuItem>
                                                    <MenuItem value="Director">Director</MenuItem>
                                                    <MenuItem value="Coordinador">Coordinador</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : ""}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLabel component="legend">¿En qué niveles enseña?</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleChange} color="primary" value="No aplica" />}
                                                label="No aplica"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleChange} color="primary" value="Preescolar" />}
                                                label="Preescolar"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleChange} color="primary" value="Básica primaria" />}
                                                label="Básica primaria"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleChange} color="primary" value="Básica secundaria" />}
                                                label="Básica secundaria"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleChange} color="primary" value="Media académica" />}
                                                label="Media académica"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox onChange={this.handleChange} color="primary" value="Media técnica" />}
                                                label="Media técnica"
                                            />
                                        </FormGroup>
                                    </Grid>
                                </React.Fragment>
                            ) : ""}
                        </Grid>
                        {this.state.cualInstitucionRepresenta !== "Otra" ? (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="mt-2"
                                size="large"
                                onClick={this.handleClick}
                            >
                                Registrarme
                            </Button>
                        ) : ""}
                    </form>
                </React.Fragment>
            );
        }

		return (
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className="py-5">
                    <div className="text-center mb-2">
					    <Typography component="h1" variant="h5" className="mb-4"><strong>Registro</strong></Typography>
                        <FormControl component="fieldset" className="w-100">
                            <Grid container>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" className="mb-2"><strong>¿Qué tipo de perfil desea registrar?</strong></Typography>
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
                                                    control={<Radio color="primary" />}
                                                    label="Institucional"
                                                    labelPlacement="end"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControlLabel
                                                    className="mb-0"
                                                    value="Individual"
                                                    control={<Radio color="primary" />}
                                                    label="Individual"
                                                    labelPlacement="end"
                                                />
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </div>
					{formulario}
				</div>
			</Container>
		);
	};
}

export default Registro;