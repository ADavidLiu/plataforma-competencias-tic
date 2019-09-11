import React, { Component } from "react";

import { Translation } from "react-i18next";
import locationData from "countrycitystatejson";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Edit from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import OpenInNew from "@material-ui/icons/OpenInNewOutlined";

import { CircularProgress } from "@material-ui/core";

class ListaUsuarios extends Component {
	constructor(props) {
        super(props);
        
        this.formularioPlaceholder = {};
        switch (props.userType) {
            case "GOBIERNO":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    pais: "",
                    departamento: "",
                    municipio: ""
                };
                break;
            case "INSTITUCION":
                this.formularioPlaceholder = {
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
                };
                break;
            case "ESTABLECIMIENTO":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombreCompleto: "",
                    idEstablecimiento: ""
                };
                break;
            default:
                break;
        }

		this.state = {
            isLoading: true,
            isEditing: false,
            isDeleting: false,
            activeID: "",
            usuarios: [
                {
                    idNacional: "1234567890",
                    nombre: "Colegio John Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "Jane Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                }
            ],
            editingForm: this.formularioPlaceholder,
            departamentos: [],
            municipios: []
        };
    }

    /* static getDerivedStateFromProps = (props, state) => {
        
    } */
    
    componentDidMount = () => {
        /* Simulando el delay al traer la información del backend */
        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 500);
    }

    toggleDeleting = () => {
        this.setState({
            isDeleting: !this.state.isDeleting
        });
    }

    deleteUser = id => {
        this.setState({
            isDeleting: true,
            activeID: id
        });
    }

    confirmUserDeletion = () => {
        this.toggleDeleting();

        /* Conectarse al backend para hacer los cambios */

        /* Luego, eliminarlo visualmente de la interfaz */
        let newUsuarios = [...this.state.usuarios];
        newUsuarios = newUsuarios.filter(usuario => usuario.idNacional !== this.state.activeID);

        this.setState({
            usuarios: newUsuarios
        });
    }

    toggleEditor = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    editUser = id => {
        this.toggleEditor();

        const encontrado = this.state.usuarios.find(usuario => usuario.idNacional === id);
        
        switch (this.props.userType) {
            case "GOBIENRO":
                const codigoPais = encontrado.pais.split("-")[0];

                const states = locationData.getStatesByShort(codigoPais);
                const cities = locationData.getCities(codigoPais, encontrado.departamento);
                const statesMenuItems = [];
                const citiesMenuItems = [];
        
                states.forEach(state => {
                    statesMenuItems.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });
                cities.forEach(city => {
                    citiesMenuItems.push(<MenuItem key={city} value={city}>{city}</MenuItem>);
                });
        
                this.setState({
                    activeID: id,
                    editingForm: {
                        idNacional: encontrado.idNacional,
                        nombre: encontrado.nombre,
                        pais: encontrado.pais,
                        departamento: encontrado.departamento,
                        municipio: encontrado.municipio
                    },
                    departamentos: statesMenuItems,
                    municipios: citiesMenuItems
                });
                break;
            case "INSTITUCION":
                const pais = encontrado.pais;
                const codigoPaisDpto = pais.split("-")[0];
                const statesDpto = locationData.getStatesByShort(codigoPaisDpto);
                
                const statesMenuItemsDptos = [];
                statesDpto.forEach(state => {
                    statesMenuItemsDptos.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });
            
                this.setState({
                    activeID: id,
                    editingForm: {
                        nombre: encontrado.nombre,
                        pais: encontrado.pais,
                        departamento: encontrado.departamento,
                        direccion: encontrado.direccion,
                        tipoUbicacion: encontrado.tipoUbicacion,
                        nombreUbicacion: encontrado.nombreUbicacion,
                        zona: encontrado.zona,
                        regimen: encontrado.regimen,
                        telefono: encontrado.telefono,
                        emailInstitucional: encontrado.emailInstitucional,
                        sitioWeb: encontrado.sitioWeb,
                        idNacional: encontrado.idNacional
                    },
                    departamentos: statesMenuItemsDptos
                });
                break;
            case "ESTABLECIMIENTO":
                this.setState({
                    activeID: id,
                    editingForm: {
                        idNacional: encontrado.idNacional,
                        nombreCompleto: encontrado.nombreCompleto,
                        idEstablecimiento: encontrado.idEstablecimiento
                    }
                });
                break;
            default:
                break;
        }
    }

    saveUpdatedUser = () => {
        this.toggleEditor();

        const updatedUsers = [...this.state.usuarios];
        let updatedUser = updatedUsers.find(user => user.idNacional === this.state.activeID);
        const updatedUserIndex = updatedUsers.findIndex(user => user.idNacional === this.state.activeID);
        updatedUser = this.state.editingForm;
        updatedUsers[updatedUserIndex] = updatedUser;

        this.setState({
            usuarios: updatedUsers
        });
    }

    handleEdicionChange = e => {
        this.setState({
            editingForm: {
                ...this.state.editingForm,
                [e.target.name]: e.target.value
            }
        });
    }

    handleChangeLocationDropdown = e => {
        this.setState({
            editingForm: {
                ...this.state.editingForm,
                [e.target.name]: e.target.value
            }
        });

        switch (e.target.name) {
            case "pais":
                this.setState({
                    departamentos: [],
                    municipios: []
                });

                const codigoPais = e.target.value.split("-")[0];
                const states = locationData.getStatesByShort(codigoPais);
                const statesMenuItems = [];

                states.forEach(state => {
                    statesMenuItems.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });

                this.setState({
                    departamentos: statesMenuItems
                });
                break;
            case "departamento":
                this.setState({
                    municipios: []
                });

                const codigoPais2 = this.state.editingForm.pais.split("-")[0];
                const cities = locationData.getCities(codigoPais2, e.target.value);
                const citiesMenuItems = [];

                cities.forEach(city => {
                    citiesMenuItems.push(<MenuItem key={city} value={city}>{city}</MenuItem>);
                });

                this.setState({
                    municipios: citiesMenuItems
                });
                break;
            case "municipio":
            default:
                break;
        }
    }

	render() {
        let tabla;
        let formularioEdicion;

        switch (this.props.userType) {
            case "GOBIERNO":
                tabla = (
                    <Translation>
                    {
                        t => (
                            <Paper className="scrolling-table-outer">
                                <div className="scrolling-table-wrapper">
                                    <Table className="scrolling-table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{t("usuarios.registro-idNacional")}</TableCell>
                                                <TableCell>{t("usuarios.registro-nombre-ie")}</TableCell>
                                                <TableCell>{t("usuarios.registro-pais")}</TableCell>
                                                <TableCell>{t("usuarios.registro-departamento")}</TableCell>
                                                <TableCell>{t("usuarios.registro-municipio")}</TableCell>
                                                <TableCell>{t("usuarios.acciones")}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {
                                            this.state.usuarios.length > 0 ? (
                                                <TableBody>
                                                    {
                                                        this.state.usuarios.map(usuario => {
                                                            return (
                                                                <TableRow key={usuario.idNacional}>
                                                                    <TableCell>{usuario.idNacional}</TableCell>
                                                                    <TableCell>{usuario.nombre}</TableCell>
                                                                    <TableCell>{usuario.pais.split("-")[1]}</TableCell>
                                                                    <TableCell>{usuario.departamento}</TableCell>
                                                                    <TableCell>{usuario.municipio}</TableCell>
                                                                    <TableCell>
                                                                        <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(usuario.idNacional); }}/>
                                                                        <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(usuario.idNacional); }}/>
                                                                        <Link to={{
                                                                            pathname: "/dashboard-institucion",
                                                                            state: {
                                                                                institucionID: usuario.idNacional
                                                                            }
                                                                        }} style={{textDecoration: "none"}}>
                                                                            <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                        </Link>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })
                                                    }
                                                </TableBody>
                                            ) : (
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell colSpan="6" align="center">{t("usuarios.no-datos")}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            )
                                        }
                                    </Table>
                                </div>
                            </Paper>
                        )
                    }
                    </Translation>
                );

                formularioEdicion = (
                    <Translation>
                        {
                            t => (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-idNacional")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idNacional"
                                            value={this.state.editingForm.idNacional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="body1">{t("usuarios.registro-nombre-ie")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombre"
                                            value={this.state.editingForm.nombre}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-pais")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.pais}
                                            onChange={this.handleChangeLocationDropdown}
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
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-departamento")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.departamento}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="departamento"/>}
                                        >
                                            { this.state.departamentos }
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-municipio")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.municipio}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="municipio"/>}
                                        >
                                            { this.state.municipios }
                                        </Select>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case "INSTITUCION":
                tabla = (
                    <Translation>
                        {
                            t => (
                                <Paper className="scrolling-table-outer">
                                    <div className="scrolling-table-wrapper">
                                        <Table className="scrolling-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{t("usuarios.registro-ee-id")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-nombre")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-departamento")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-direccion")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-tipo-ubicacion")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-nombre-ubicacion")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-zona")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-regimen")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-telefono")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-email")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-ee-web")}</TableCell>
                                                    <TableCell>{t("usuarios.acciones")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                this.state.usuarios.length > 0 ? (
                                                    <TableBody>
                                                        {
                                                            this.state.usuarios.map(usuario => {
                                                                return (
                                                                    <TableRow key={usuario.idNacional}>
                                                                        <TableCell>{usuario.idNacional}</TableCell>
                                                                        <TableCell>{usuario.nombre}</TableCell>
                                                                        <TableCell>{usuario.departamento}</TableCell>
                                                                        <TableCell>{usuario.direccion}</TableCell>
                                                                        <TableCell>{usuario.tipoUbicacion}</TableCell>
                                                                        <TableCell>{usuario.nombreUbicacion}</TableCell>
                                                                        <TableCell>{usuario.zona}</TableCell>
                                                                        <TableCell>{usuario.regimen}</TableCell>
                                                                        <TableCell><a href={"tel:" + usuario.telefono} style={{textDecoration: "none", color: "rgba(0,0,0,0.87)"}}>{usuario.telefono}</a></TableCell>
                                                                        <TableCell><a href={"mailto:" + usuario.emailInstitucional} style={{textDecoration: "none", color: "rgba(0,0,0,0.87)"}}>{usuario.emailInstitucional}</a></TableCell>
                                                                        <TableCell><a href={"https://" + usuario.sitioWeb} style={{textDecoration: "none", color:"rgba(0,0,0,0.87)"}}>{usuario.sitioWeb}</a></TableCell>
                                                                        <TableCell>
                                                                            <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(usuario.idNacional); }}/>
                                                                            <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(usuario.idNacional); }}/>
                                                                            <Link to={{
                                                                                pathname: "/dashboard-docente",
                                                                                state: {
                                                                                    docenteID: usuario.idNacional
                                                                                }
                                                                            }} style={{textDecoration: "none"}}>
                                                                                <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                            </Link>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })
                                                        }
                                                    </TableBody>
                                                ) : (
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell colSpan="12" align="center">{t("usuarios.no-datos")}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                )
                                            }
                                        </Table>
                                    </div>
                                </Paper>
                            )
                        }
                    </Translation>
                );

                formularioEdicion = (
                    <Translation>
                        {
                            t => (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-id")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idNacional"
                                            value={this.state.editingForm.idNacional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-nombre")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombre"
                                            value={this.state.editingForm.nombre}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-departamento")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.departamento}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="departamento"/>}
                                        >
                                            { this.state.departamentos }
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-direccion")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="direccion"
                                            value={this.state.editingForm.direccion}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-tipo-ubicacion")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.tipoUbicacion}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="tipoUbicacion"/>}
                                        >
                                            <MenuItem value="Barrio">{t("barrio")}</MenuItem>
                                            <MenuItem value="Localidad">{t("localidad")}</MenuItem>
                                            <MenuItem value="Vereda">{t("vereda")}</MenuItem>
                                            <MenuItem value="Corregimiento">{t("corregimiento")}</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-nombre-ubicacion")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombreUbicacion"
                                            value={this.state.editingForm.nombreUbicacion}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-zona")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.zona}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="zona"/>}
                                        >
                                            <MenuItem value="Rural">{t("rural")}</MenuItem>
                                            <MenuItem value="Urbana">{t("urbana")}</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-regimen")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.regimen}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="regimen"/>}
                                        >
                                            <MenuItem value="Oficial">{t("oficial")}</MenuItem>
                                            <MenuItem value="Privado">{t("privado")}</MenuItem>
                                            <MenuItem value="Concesión">{t("concesion")}</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-telefono")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="telefono"
                                            type="tel"
                                            value={this.state.editingForm.telefono}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-email")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="emailInstitucional"
                                            type="email"
                                            value={this.state.editingForm.emailInstitucional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-web")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="sitioWeb"
                                            value={this.state.editingForm.sitioWeb}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case "ESTABLECIMIENTO":
                tabla = (
                    <Translation>
                        {
                            t => (
                                <Paper className="scrolling-table-outer">
                                    <div className="scrolling-table-wrapper">
                                        <Table className="scrolling-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{t("usuarios.registro-idNacional")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-nombre-docente")}</TableCell>
                                                    <TableCell>{t("usuarios.registro-idEstablecimiento")}</TableCell>
                                                    <TableCell>{t("usuarios.acciones")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                this.state.usuarios.length > 0 ? (
                                                    <TableBody>
                                                        {
                                                            this.state.usuarios.map(usuario => {
                                                                return (
                                                                    <TableRow key={usuario.idNacional}>
                                                                        <TableCell>{usuario.idNacional}</TableCell>
                                                                        <TableCell>{usuario.nombreCompleto}</TableCell>
                                                                        <TableCell>{usuario.idEstablecimiento}</TableCell>
                                                                        <TableCell>
                                                                            <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(usuario.idNacional); }}/>
                                                                            <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(usuario.idNacional); }}/>
                                                                            <Link to={{
                                                                                pathname: "/dashboard-docente",
                                                                                state: {
                                                                                    docenteID: usuario.idNacional
                                                                                }
                                                                            }} style={{textDecoration: "none"}}>
                                                                                <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                            </Link>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })
                                                        }
                                                    </TableBody>
                                                ) : (
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell colSpan="4" align="center">{t("usuarios.no-datos")}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                )
                                            }
                                        </Table>
                                    </div>
                                </Paper>
                            )
                        }
                    </Translation>
                );

                formularioEdicion = (
                    <Translation>
                        {
                            t => (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-idNacional")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idNacional"
                                            value={this.state.editingForm.idNacional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-nombre-docente")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombreCompleto"
                                            value={this.state.editingForm.nombreCompleto}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Typography variant="body1">{t("usuarios.registro-idEstablecimiento")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idEstablecimiento"
                                            value={this.state.editingForm.idEstablecimiento}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                </Grid>
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
                            { this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto" /> : tabla }

                            <Dialog open={this.state.isEditing} onClose={this.toggleEditor} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
                                <DialogTitle id="form-dialog-title">{t("usuarios.editar")}</DialogTitle>
                                <DialogContent>
                                    { formularioEdicion }
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.saveUpdatedUser}>{t("usuarios.btn-guardar")}</Button>
                                </DialogActions>
                            </Dialog>
                            
                            <Dialog open={this.state.isDeleting} onClose={this.toggleDeleting} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{t("usuarios.borrar")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <strong>{t("usuarios.ayuda-borrar-0")}</strong>
                                        <br/>
                                        {t("usuarios.ayuda-borrar-1")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.confirmUserDeletion}>{t("usuarios.btn-borrar")}</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
	}
}

export default ListaUsuarios;