import React, { Component } from "react";

import { Helmet } from "react-helmet";
import  { Translation } from "react-i18next";

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
    constructor(props) {
        super(props);
        let divisionInicial = 0;
        if (props[0].location.state !== undefined) {
            switch (props[0].location.state.verCategoriaInicial) {
                case "DOCENTES":
                    switch (this.props.userType) {
                        case "GOBIERNO":
                            divisionInicial = 3
                            break;
                        case "INSTITUCION":
                            divisionInicial = 2
                            break;
                        case "ESTABLECIMIENTO":
                            divisionInicial = 1
                            break;
                        default:
                            break;
                    }
                    break;
                case "ESTABLECIMIENTOS":
                    switch (this.props.userType) {
                        case "GOBIERNO":
                            divisionInicial = 2
                            break;
                        case "INSTITUCION":
                            divisionInicial = 1
                            break;
                        default:
                            break;
                    }
                    break;
                case "INSTITUCIONES":
                    switch (this.props.userType) {
                        case "GOBIERNO":
                            divisionInicial = 1
                            break;
                        default:
                            break;
                    }
                    break;
                case "GOBIERNOS":
                    break;
                case "ADMINS":
                    break;
                default:
                    break;
            }
        }

        this.state = {
            datosID: "",
            divisionMostrada: divisionInicial
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
        let tituloPagina = "";
        let tipoUsuariosMostrados = {
            0: "",
            1: "",
            2: ""
        };
        switch (this.props.userType) {
            case "SUPERADMIN":
            case "ADMIN":
                tituloPagina = <Translation>{ t => t("usuarios") }</Translation>;
                tabs = (
                    <Translation>
                        {
                            t => (
                                <Tabs
                                    variant="scrollable"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    value={this.state.divisionMostrada}
                                    onChange={this.handleTabChange}
                                >
                                    <Tab label={t("usuarios.label-registro-admins")}/>
                                    <Tab label={t("usuarios.label-usuarios-gobiernos")}/>
                                    <Tab label={t("usuarios.label-usuarios-instituciones")}/>
                                    <Tab label={t("usuarios.label-usuarios-establecimientos")}/>
                                    <Tab label={t("usuarios.label-usuarios-docentes")}/>
                                </Tabs>
                            )
                        }
                    </Translation>
                );
                break;
            case "GOBIERNO":
                tituloPagina = <Translation>{ t => t("instituciones") }</Translation>;
                tipoUsuariosMostrados = {
                    0: "instituciones",
                    1: "establecimientos",
                    2: "docentes"
                };
                tabs = (
                    <Translation>
                        {
                            t => (
                                <Tabs
                                    variant="scrollable"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    value={this.state.divisionMostrada}
                                    onChange={this.handleTabChange}
                                >
                                    <Tab label={t("usuarios.label-registro-instituciones")}/>
                                    <Tab label={t("usuarios.label-usuarios-instituciones")}/>
                                    <Tab label={t("usuarios.label-usuarios-establecimientos")}/>
                                    <Tab label={t("usuarios.label-usuarios-docentes")}/>
                                </Tabs>
                            )
                        }
                    </Translation>
                );
                break;
            case "INSTITUCION":
                tituloPagina = <Translation>{ t => t("establecimientos") }</Translation>;
                tipoUsuariosMostrados = {
                    0: "establecimientos",
                    1: "docentes"
                };
                tabs = (
                    <Translation>
                        {
                            t => (
                                <Tabs
                                    variant="scrollable"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    value={this.state.divisionMostrada}
                                    onChange={this.handleTabChange}
                                >
                                    <Tab label={t("usuarios.label-registro-establecimientos")}/>
                                    <Tab label={t("usuarios.label-usuarios-establecimientos")}/>
                                    <Tab label={t("usuarios.label-usuarios-docentes")}/>
                                </Tabs>
                            )
                        }
                    </Translation>
                );
                break;
            case "ESTABLECIMIENTO":
                tituloPagina = <Translation>{ t => t("docentes") }</Translation>;
                tipoUsuariosMostrados = {
                    0: "docentes"
                };
                tabs = (
                    <Translation>
                        {
                            t => (
                                <Tabs
                                    variant="scrollable"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    value={this.state.divisionMostrada}
                                    onChange={this.handleTabChange}
                                >
                                    <Tab label={t("usuarios.label-registro-docentes")}/>
                                    <Tab label={t("usuarios.label-usuarios-docentes")}/>
                                </Tabs>
                            )
                        }
                    </Translation>
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
                            <ListaUsuarios tipoUsuariosMostrados={tipoUsuariosMostrados[0]} userType={this.props.userType} />
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
                                    <ListaUsuarios tipoUsuariosMostrados={tipoUsuariosMostrados[1]} userType="INSTITUCION" />
                                ) : this.props.userType === "INSTITUCION" ? (
                                    <ListaUsuarios tipoUsuariosMostrados={tipoUsuariosMostrados[1]} userType="ESTABLECIMIENTO" />
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
                                    <ListaUsuarios tipoUsuariosMostrados={tipoUsuariosMostrados[2]} userType="ESTABLECIMIENTO" />
                                ) : this.props.userType === "INSTITUCION" ? (
                                    <ListaUsuarios tipoUsuariosMostrados={tipoUsuariosMostrados[2]} userType="DOCENTE" />
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
            <Translation>
                {
                    t => {
                        switch (this.props.userType) {
                            case "SUPERADMIN":
                            case "ADMIN":
                                tituloPagina = t("usuarios");
                                break;
                            case "GOBIERNO":
                                tituloPagina = t("instituciones");
                                break;
                            case "INSTITUCION":
                                tituloPagina = t("establecimientos");
                                break;
                            case "ESTABLECIMIENTO":
                                tituloPagina = t("docentes");
                                break;
                            default:
                                break;
                        }

                        return <Grid container spacing={5}>
                            <Helmet>
                                <title>{`${tituloPagina} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid item xs={12}>
                                <Paper>
                                    { tabs }
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                { divisionMostrada }
                            </Grid>
                        </Grid>
                    }
                }
            </Translation>
        );
    }
}

export default Usuarios;