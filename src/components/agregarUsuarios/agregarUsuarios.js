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
    constructor(props) {
        super(props);

        this.intialState = {
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
                pais: "",
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
            paisCodigoInstitucion: "CO",
            paisesSeleccionados: [],
            departamentosEncontrados: [],
            municipiosEncontrados: []
        }

        this.state = this.intialState;

        this.crearPlaceholderUsuario();
    }

    crearPlaceholderUsuario = () => {
        switch (this.props.userType) {
            case "GOBIERNO":
                this.state.nuevosUsuarios.push({
                    nombre: "",
                    pais: "",
                    departamento: "",
                    municipio: "",
                    idNacional: ""
                });
                break;
            case "INSTITUCION":
                this.state.nuevosUsuarios.push({
                    nombre: "",
                    pais: "",
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
                });
                break;
            case "ESTABLECIMIENTO":
                this.state.nuevosUsuarios.push({
                    idNacional: "",
                    nombreCompleto: "",
                    idEstablecimiento: ""
                });
                break;
            default:
                break;
        }
    }

    agregarPosicion = () => {
        this.crearPlaceholderUsuario();
        this.state.paisesSeleccionados.push({
            nombre: "",
            codigo: ""
        });
        this.state.departamentosEncontrados.push([]);
        this.state.municipiosEncontrados.push([]);

        this.setState({
            numNuevosUsuarios: this.state.numNuevosUsuarios + 1
        });
    }

    eliminarPosicion = () => {
        this.state.nuevosUsuarios.splice(this.state.nuevosUsuarios.length - 1, 1);
        this.state.paisesSeleccionados.splice(this.state.paisesSeleccionados.length - 1, 1);
        this.state.departamentosEncontrados.splice(this.state.departamentosEncontrados.length - 1, 1);
        this.state.municipiosEncontrados.splice(this.state.municipiosEncontrados.length - 1, 1);

        this.setState({
            numNuevosUsuarios: this.state.numNuevosUsuarios - 1
        });
    }

    crearUsuarios = () => {
        console.log("Creados!");
        /* Enviar la información al backend */

        /* Después de que se reciba la notificación 200, borrar todo */
        this.setState({
            ...this.intialState
        });
    }

    actualizarDatosNuevos = (e, tipoUsuarioCreado, index) => {
        const copiaNuevosUsuarios = [...this.state.nuevosUsuarios];
        copiaNuevosUsuarios[index] = {
            ...this.state.nuevosUsuarios[index],
            [e.target.name]: e.target.value
        };

        this.setState({
            nuevosUsuarios: copiaNuevosUsuarios
        });

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
                        const copiaDptos = [...this.state.departamentosEncontrados];
                        const copiaMuns = [...this.state.municipiosEncontrados];
                        copiaDptos[index] = [];
                        copiaMuns[index] = [];

                        this.setState({
                            departamentosEncontrados: copiaDptos,
                            municipiosEncontrados: copiaMuns
                        });

                        const value = e.target.value.split("-");
                        const states = locationData.getStatesByShort(value[0]);

                        let newStateStates = [...this.state.departamentosEncontrados];
                        newStateStates[index] = states;

                        let newStatePaisesSeleccionados = [...this.state.paisesSeleccionados];
                        newStatePaisesSeleccionados[index] = {
                            nombre: value[1],
                            codigo: value[0]
                        };

                        this.setState({
                            paisesSeleccionados: newStatePaisesSeleccionados,
                            departamentosEncontrados: newStateStates
                        });
                        break;
                    case "departamento":
                        const cities = locationData.getCities(this.state.paisesSeleccionados[index].codigo, e.target.value);
                        
                        let newStateCities = [...this.state.municipiosEncontrados];
                        newStateCities[index] = cities;

                        this.setState({
                            municipiosEncontrados: newStateCities
                        });
                        break;
                    default:
                        break;
                }
                break;
            case "ESTABLECIMEINTO":
                this.setState({
                    nuevoEstablecimiento: {
                        ...this.state.nuevoEstablecimiento,
                        [e.target.name]: e.target.value
                    }
                });
                break;
            case "DOCENTE":
                this.setState({
                    nuevoDocente: {
                        ...this.state.nuevoDocente,
                        [e.target.name]: e.target.value
                    }
                });
                break;
            default:
                break;
        }
    }

    render() {
        const itemsUsers = [];
        let states = [];
        let cities = [];

        if (this.props.userType === "INSTITUCION") {
            const dptosEncontrados = locationData.getStatesByShort(this.state.paisCodigoInstitucion);

            this.state.departamentosEncontrados.push(dptosEncontrados);
        }

        this.state.departamentosEncontrados.forEach((item, i) => {
            states[i] = [];
            item.forEach((dpto, j) => {
                states[i].push(<MenuItem key={dpto} value={dpto}>{dpto}</MenuItem>);
            });
        });
        this.state.municipiosEncontrados.forEach((item, i) => {
            cities[i] = [];
            item.forEach((municipio, j) => {
                cities[i].push(<MenuItem key={municipio} value={municipio}>{municipio}</MenuItem>);
            });
        });
        
        switch (this.props.userType) {
            case "GOBIERNO":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Paper className="p-4 mb-3" key={i}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={3} alignItems="flex-end">
                                        <Grid item xs={6} md={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-idNacional"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="idNacional"
                                                value={this.state.nuevosUsuarios[i].idNacional}
                                                onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={3}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-nombre-ie"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="nombre"
                                                value={this.state.nuevosUsuarios[i].nombre}
                                                onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-pais"/></strong></Typography>
                                            <Select
                                                className="w-100"
                                                value={this.state.nuevosUsuarios[i].pais}
                                                onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
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
                                        <Grid item xs={6} md={3}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-departamento"/></strong></Typography>
                                            <Select
                                                className="w-100"
                                                value={this.state.nuevosUsuarios[i].departamento}
                                                onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                                input={<OutlinedInput required name="departamento"/>}
                                            >
                                                { states[i] }
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-municipio"/></strong></Typography>
                                            <Select
                                                className="w-100"
                                                value={this.state.nuevosUsuarios[i].municipio}
                                                onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                                input={<OutlinedInput required name="municipio"/>}
                                            >
                                                { cities[i] }
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                }
                break;
            case "INSTITUCION":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Paper className="p-4 mb-3" key={i}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={3} alignItems="flex-end">
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-id"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="idNacional"
                                                value={this.state.nuevosUsuarios[i].idNacional}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-nombre"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="nombre"
                                                value={this.state.nuevosUsuarios[i].nombre}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="text-center"><strong><T phrase="usuarios.registro-ee-departamento"/></strong></Typography>
                                            <Select
                                                className="w-100 mt-3"
                                                value={this.state.nuevosUsuarios[i].departamento}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                input={<OutlinedInput required name="departamento"/>}
                                            >
                                                { states[i] }
                                            </Select>
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-direccion"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="direccion"
                                                value={this.state.nuevosUsuarios[i].direccion}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-tipo-ubicacion"/></strong></Typography>
                                            <Select
                                                className="w-100"
                                                value={this.state.nuevosUsuarios[i].tipoUbicacion}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                input={<OutlinedInput required name="tipoUbicacion"/>}
                                            >
                                                <MenuItem value="Barrio">{<T phrase="barrio"/>}</MenuItem>
                                                <MenuItem value="Localidad">{<T phrase="localidad"/>}</MenuItem>
                                                <MenuItem value="Vereda">{<T phrase="vereda"/>}</MenuItem>
                                                <MenuItem value="Corregimiento">{<T phrase="corregimiento"/>}</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-nombre-ubicacion"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="nombreUbicacion"
                                                value={this.state.nuevosUsuarios[i].nombreUbicacion}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-zona"/></strong></Typography>
                                            <Select
                                                className="w-100"
                                                value={this.state.nuevosUsuarios[i].zona}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                input={<OutlinedInput required name="zona"/>}
                                            >
                                                <MenuItem value="Rural">{<T phrase="rural"/>}</MenuItem>
                                                <MenuItem value="Urbana">{<T phrase="urbana"/>}</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={6} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-regimen"/></strong></Typography>
                                            <Select
                                                className="w-100"
                                                value={this.state.nuevosUsuarios[i].regimen}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                input={<OutlinedInput required name="regimen"/>}
                                            >
                                                <MenuItem value="Oficial">{<T phrase="oficial"/>}</MenuItem>
                                                <MenuItem value="Privado">{<T phrase="privado"/>}</MenuItem>
                                                <MenuItem value="Concesión">{<T phrase="concesion"/>}</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} md={3} lg={2}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-telefono"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="telefono"
                                                value={this.state.nuevosUsuarios[i].telefono}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5} lg={3}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-email"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="emailInstitucional"
                                                value={this.state.nuevosUsuarios[i].emailInstitucional}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-ee-web"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="sitioWeb"
                                                value={this.state.nuevosUsuarios[i].sitioWeb}
                                                onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                }
                break;
            case "ESTABLECIMIENTO":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Paper className="p-4 mb-3" key={i}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={3} alignItems="flex-end">
                                        <Grid item xs={6} md={4}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-idNacional"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="idNacional"
                                                value={this.state.nuevosUsuarios[i].idNacional}
                                                onChange={e => { this.actualizarDatosNuevos(e, "DOCENTE", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={4}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-nombre-docente"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="nombreCompleto"
                                                value={this.state.nuevosUsuarios[i].nombreCompleto}
                                                onChange={e => { this.actualizarDatosNuevos(e, "DOCENTE", i); }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body1" className="mb-3 text-center"><strong><T phrase="usuarios.registro-idEstablecimiento"/></strong></Typography>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="idEstablecimiento"
                                                value={this.state.nuevosUsuarios[i].idEstablecimiento}
                                                onChange={e => { this.actualizarDatosNuevos(e, "DOCENTE", i); }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                }
                break;
            case "DOCENTE":
            default:
                break;
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    { itemsUsers }
                </Grid>
                <Grid item xs={6} className="mt-4">
                    {
                        this.state.numNuevosUsuarios > 1 ? (
                            <Button color="primary" variant="outlined" size="large" className="mr-3" onClick={this.eliminarPosicion}><Remove/></Button>
                        ) : ""
                    }
                    <Button color="primary" variant="outlined" size="large" onClick={this.agregarPosicion}><Add/></Button>
                </Grid>
                <Grid item xs={6} className="text-right mt-4">
                    <Button color="primary" variant="contained" size="large" onClick={this.crearUsuarios}><T phrase="usuarios.registro-btn-agregar"/></Button>
                </Grid>
            </Grid>
        );
    }

}

export default AgregarUsuarios;