import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

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

import Edit from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import OpenInNew from "@material-ui/icons/OpenInNewOutlined";

import { CircularProgress } from "@material-ui/core";

class ListaUsuarios extends Component {
	constructor() {
		super();

		this.state = {
            isLoading: true,
            isEditing: false,
            isDeleting: false,
            activeID: "",
            usuarios: [
                {
                    idNacional: "1234",
                    nombre: "Institución Educativa John Doe",
                    pais: "Colombia",
                    departamento: "Valle del Cauca",
                    municipio: "Cali"
                },
                {
                    idNacional: "5678",
                    nombre: "Universidad Jane Doe",
                    pais: "Perú",
                    departamento: "Arequipa",
                    municipio: "Acarí"
                }
            ]
        };
    }
    
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
        
        this.setState({
            activeID: id
        });
    }

    handleEdicionChange = e => {
        
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
                                                            <TableCell>{usuario.pais}</TableCell>
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

                const index = this.state.usuarios.findIndex(usuario => usuario.idNacional === this.state.activeID);

                formularioEdicion = (
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="idNacional"
                                value={this.state.usuarios[index].idNacional}
                                onChange={this.handleEdicionChange}
                            />
                        </Grid>
                    </Grid>
                );
                break;
        }

		return (
            <React.Fragment>
                { this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto" /> : tabla }

                <Dialog open={this.state.isEditing} onClose={this.toggleEditor} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><T phrase="usuarios.editar"/></DialogTitle>
                    <DialogContent>
                        { formularioEdicion }
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.toggleEditor}><T phrase="usuarios.btn-guardar"/></Button>
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