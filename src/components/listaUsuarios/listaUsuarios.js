import React, { Component } from "react";

import { T } from "react-polyglot-hooks";
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
                    idNacional: "1234",
                    nombre: "Institución Educativa John Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    municipio: "Abejorral"
                },
                {
                    idNacional: "5678",
                    nombre: "Universidad Jane Doe",
                    pais: "PE-Perú",
                    departamento: "Arequipa",
                    municipio: "Acari"
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
    }

    saveUpdatedUser = () => {
        this.toggleEditor();
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
                    <Paper className="scrolling-table-outer">
                        <div className="scrolling-table-wrapper">
                            <Table className="scrolling-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><T phrase="usuarios.registro-idNacional"/></TableCell>
                                        <TableCell><T phrase="usuarios.registro-nombre-ie"/></TableCell>
                                        <TableCell><T phrase="usuarios.registro-pais"/></TableCell>
                                        <TableCell><T phrase="usuarios.registro-departamento"/></TableCell>
                                        <TableCell><T phrase="usuarios.registro-municipio"/></TableCell>
                                        <TableCell><T phrase="usuarios.acciones"/></TableCell>
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
                                                <TableCell colSpan="6" align="center"><T phrase="usuarios.no-datos"/></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )
                                }
                            </Table>
                        </div>
                    </Paper>
                );

                formularioEdicion = (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1"><T phrase="usuarios.registro-idNacional"/></Typography>
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
                            <Typography variant="body1"><T phrase="usuarios.registro-nombre-ie"/></Typography>
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
                            <Typography variant="body1"><T phrase="usuarios.registro-pais"/></Typography>
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
                            <Typography variant="body1"><T phrase="usuarios.registro-departamento"/></Typography>
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
                            <Typography variant="body1"><T phrase="usuarios.registro-municipio"/></Typography>
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
                );
                break;
            default:
                break;
        }

		return (
            <React.Fragment>
                { this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto" /> : tabla }

                <Dialog open={this.state.isEditing} onClose={this.toggleEditor} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
                    <DialogTitle id="form-dialog-title"><T phrase="usuarios.editar"/></DialogTitle>
                    <DialogContent>
                        { formularioEdicion }
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.saveUpdatedUser}><T phrase="usuarios.btn-guardar"/></Button>
                    </DialogActions>
                </Dialog>
                
                <Dialog open={this.state.isDeleting} onClose={this.toggleDeleting} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><T phrase="usuarios.borrar"/></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong><T phrase="usuarios.ayuda-borrar-0"/></strong>
                            <br/>
                            <T phrase="usuarios.ayuda-borrar-1"/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.confirmUserDeletion}><T phrase="usuarios.btn-borrar"/></Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
	}
}

export default ListaUsuarios;