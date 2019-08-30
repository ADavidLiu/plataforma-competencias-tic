import React, { Component } from "react";

import locationData from "countrycitystatejson";

import { T } from "react-polyglot-hooks";

import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class AgregarUsuarios extends Component {
    constructor() {
        super();

        this.state = {
            numNuevosUsuarios: 1,
            nuevosUsuarios: [],
            nuevaInstitucion: {
                pais: "",
                departamento: "",
                municipio: "",
                nombre: "",
                idNacional: ""
            },
            nuevoEstablecimiento: {
                nombre: "",
                departamento: "",
                direccion: "",
                tipoUbicacion: "",
                nombreUbicacion: "",
                zona: "",
                regimen: "",
                telefono: "",
                emailInstitucional: "",
                sitioWeb: "",
                idNacional: ""
            },
            nuevoDocente: {
                idNacional: "",
                nombreCompleto: "",
                idEstablecimiento: ""
            },
            paisSeleccionado: {
                nombre: "",
                codigo: ""
            },
            departamentosEncontrados: [],
            municipiosEncontrados: []
        }
    }

    agregarPosicion = () => {
        
    }

    eliminarPosicion = i => {
        this.state.nuevosUsuarios.splice(i, 1);
    }

    crearUsuario = () => {

    }

    actualizarDatosNuevos = (e, tipoUsuarioCreado) => {
        switch (tipoUsuarioCreado) {
            case "INSTITUCION":
                this.setState({
                    nuevaInstitucion: {
                        ...this.state.nuevaInstitucion,
                        [e.target.name]: e.target.value
                    }
                });

                switch (e.target.name) {
                    case "pais":
                        const value = e.target.value.split("-");
                        const states = locationData.getStatesByShort(value[0]);

                        this.setState({
                            paisSeleccionado: {
                                nombre: value[1],
                                codigo: value[0]
                            },
                            departamentosEncontrados: states
                        });
                        break;
                    case "departamento":
                        const cities = locationData.getCities(this.state.nuevaInstitucion.pais.split("-")[0], e.target.value);
                        console.log(this.state.nuevaInstitucion.pais.split("-")[0], e.target.value);

                        console.log(cities);

                        this.setState({
                            municipiosEncontrados: cities
                        });
                        break;
                    default:
                        break;
                }
                break;
            case "ESTABLECIMEINTO":
                
                break;
            case "DOCENTE":

                break;
            default:
                break;
        }
    }

    render() {
        let formulario;
        let states = [];
        let cities = [];
        this.state.departamentosEncontrados.forEach(dpto => {
            states.push(<MenuItem key={dpto} value={dpto}>{dpto}</MenuItem>);
        });
        this.state.municipiosEncontrados.forEach(municipio => {
            cities.push(<MenuItem key={municipio} value={municipio}>{municipio}</MenuItem>);
        });
        
        switch (this.props.userType) {
            case "GOBIERNO":
                formulario = (
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container spacing={5}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-nombre-ie"/></strong></Typography>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        inputProps={{ maxLength: 400 }}
                                        rows="5"
                                        name="nombre"
                                        value={this.state.nuevaInstitucion.nombre}
                                        onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION"); }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-pais"/></strong></Typography>
                                    <Select
                                        className="w-100"
                                        value={this.state.nuevaInstitucion.pais}
                                        onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION"); }}
                                        input={<OutlinedInput required name="pais"/>}
                                    >
                                        <MenuItem value="CO-Colombia">Colombia</MenuItem>
                                        <MenuItem value="VE-Venezuela">Venezuela</MenuItem>
                                        <MenuItem value="PA-Panamá">Panamá</MenuItem>
                                        <MenuItem value="PE-Perú">Perú</MenuItem>
                                        <MenuItem value="EC-Ecuador">Ecuador</MenuItem>
                                        <MenuItem value="BO-Bolivia">Bolivia</MenuItem>
                                        <MenuItem value="PY-Paraguay">Paraguay</MenuItem>
                                        <MenuItem value="UY-Uruguay">Uruguay</MenuItem>
                                        <MenuItem value="CL-Chile">Chile</MenuItem>
                                        <MenuItem value="BR-Brasil">Brasil</MenuItem>
                                        <MenuItem value="AR-Argentina">Argentina</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-departamento"/></strong></Typography>
                                    <Select
                                        className="w-100"
                                        value={this.state.nuevaInstitucion.departamento}
                                        onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION"); }}
                                        input={<OutlinedInput required name="departamento"/>}
                                    >
                                        { states }
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-municipio"/></strong></Typography>
                                    <Select
                                        className="w-100"
                                        value={this.state.nuevaInstitucion.municipio}
                                        onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION"); }}
                                        input={<OutlinedInput required name="municipio"/>}
                                    >
                                        { cities }
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <hr/>
                        </Grid>
                    </Grid>
                );
                break;
            case "INSTITUCION":
                formulario = (
                    ""
                );
                break;
            case "ESTABLECIMIENTO":
                formulario = (
                    ""
                );
                break;
            case "DOCENTE":
            default:
                break;
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    { formulario }
                </Grid>
                <Grid item xs={12} md={6}>
                    {
                        this.state.numNuevosUsuarios > 1 ? (
                            <Button color="primary" variant="outlined" size="large" className="mr-3"><Remove/></Button>
                        ) : ""
                    }
                    <Button color="primary" variant="outlined" size="large"><Add/></Button>
                </Grid>
                <Grid item xs={12} md={6} className="text-md-right">
                    <Button color="primary" variant="contained" size="large"><T phrase="usuarios.registro-btn-agregar"/></Button>
                </Grid>
            </Grid>
        );
    }

}

export default AgregarUsuarios;