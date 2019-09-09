import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ListaUsuarios from "../listaUsuarios/listaUsuarios";
import AgregarUsuarios from "../agregarUsuarios/agregarUsuarios";

class Usuarios extends Component {
    constructor() {
        super();

        this.state = {
            datosID: "",
            divisionMostrada: 0
        }
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue
        });
    }

    componentDidMount() {
        this.cargarDatos(this.state.datosID);
    }

    cargarDatos = datosID => {
        let infoCargada = {};

        if (this.props.location && this.props.location.state !== undefined) {
            infoCargada = {
                tipoUsuario: this.props.location.state.tipoUsuario
            }
        } else {
            infoCargada = {
                tipoUsuario: ""
            }
        }
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }
        
        let tabs;
        switch (this.props.userType) {
            case "SUPERADMIN":
            case "ADMIN":
                tabs = (
                    <Tabs
                        variant="scrollable"
						indicatorColor="primary"
						textColor="primary"
						value={this.state.divisionMostrada}
						onChange={this.handleTabChange}
					>
                        <Tab label={<T phrase="usuarios.label-registro-admins"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-gobiernos"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-instituciones"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-establecimientos"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-docentes"/>}/>
					</Tabs>
                );
                break;
            case "GOBIERNO":
                tabs = (
                    <Tabs
                        variant="scrollable"
						indicatorColor="primary"
						textColor="primary"
						value={this.state.divisionMostrada}
						onChange={this.handleTabChange}
					>
                        <Tab label={<T phrase="usuarios.label-registro-instituciones"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-instituciones"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-establecimientos"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-docentes"/>}/>
					</Tabs>
                );
                break;
            case "INSTITUCION":
                tabs = (
                    <Tabs
                        variant="scrollable"
                        indicatorColor="primary"
                        textColor="primary"
                        value={this.state.divisionMostrada}
                        onChange={this.handleTabChange}
                    >
                        <Tab label={<T phrase="usuarios.label-registro-establecimientos"/>}/>
                        <Tab label={<T phrase="usuarios.label-usuarios-establecimientos"/>}/>
                        <Tab label={<T phrase="usuarios.label-usuarios-docentes"/>}/>
                    </Tabs>
                );
                break;
            case "ESTABLECIMIENTO":
                tabs = (
                    <Tabs
                        variant="scrollable"
                        indicatorColor="primary"
                        textColor="primary"
                        value={this.state.divisionMostrada}
                        onChange={this.handleTabChange}
                    >
                        <Tab label={<T phrase="usuarios.label-registro-docentes"/>}/>
                        <Tab label={<T phrase="usuarios.label-usuarios-docentes"/>}/>
                    </Tabs>
                );
                break;
            default:
                break;
        }

        let divisionMostrada;
        switch (this.state.divisionMostrada) {
            case 0:
                divisionMostrada = (
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <AgregarUsuarios userType={this.props.userType} />
                        </Grid>
                    </Grid>
                );
                break;
            case 1:
                divisionMostrada = (
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <ListaUsuarios userType={this.props.userType} />
                        </Grid>
                    </Grid>
                );
                break;
            case 2:
                divisionMostrada = (
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            {
                                this.props.userType === "GOBIERNO" ? (
                                    <ListaUsuarios userType="INSTITUCION" />
                                ) : this.props.userType === "INSTITUCION" ? (
                                    <ListaUsuarios userType="ESTABLECIMIENTO" />
                                ) : ""
                            }
                        </Grid>
                    </Grid>
                );
                break;
            case 3:
                divisionMostrada = (
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            {
                                this.props.userType === "GOBIERNO" ? (
                                    <ListaUsuarios userType="ESTABLECIMIENTO" />
                                ) : this.props.userType === "INSTITUCION" ? (
                                    <ListaUsuarios userType="DOCENTE" />
                                ) : ""
                            }
                        </Grid>
                    </Grid>
                );
                break;
            default:
                divisionMostrada = "";
                break;
        }

        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Paper>
                        { tabs }
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    { divisionMostrada }
                </Grid>
            </Grid>
        );
    }
}

export default Usuarios;