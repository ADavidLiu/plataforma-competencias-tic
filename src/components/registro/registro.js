import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

import Establecimiento from "../establecimiento/establecimiento";

class Registro extends Component {
    constructor() {
        super();
        this.state = {
            tipoPerfil: "Institucional",
            pais: "",
            departamento: "",
            municipio: "",
            nombreIE: "",
            numSedes: "",
            sedes: [],
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

    /* Simulando cuando el registro se haya completado, para traer los datos de cada sede al estado */
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
            formulario = "";
        }

		return (
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<div className="py-5">
                    <div className="text-center mb-2">
					    <Typography component="h1" variant="h5" className="mb-4"><strong>Formulario de registro</strong></Typography>
                        <FormControl component="fieldset" className="w-100">
                            <Grid container>
                                <Grid item xs={12}>
                                    <hr/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" className="mb-2"><strong>Seleccione su tipo de perfil</strong></Typography>
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