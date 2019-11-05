import React, { Component } from "react";

import { Helmet } from "react-helmet";
import  { Translation } from "react-i18next";

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
                        case "SUPERADMIN":
                            divisionInicial = 6;
                            break;
                        case "ADMIN":
                            divisionInicial = 5;
                            break;
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
                        case "SUPERADMIN":
                            divisionInicial = 5;
                            break;
                        case "ADMIN":
                            divisionInicial = 4;
                            break;
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
                        case "SUPERADMIN":
                            divisionInicial = 4;
                            break;
                        case "ADMIN":
                            divisionInicial = 3;
                            break;
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
                case "SUPERADMIN":

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

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/"/>
        }
        
        let tabs;
        let tituloPagina = "";
        let tipoUsuariosMostrados = {};
        switch (this.props.userType) {
            case "SUPERADMIN":
                tituloPagina = <Translation>{ t => t("usuarios") }</Translation>;
                tipoUsuariosMostrados = {
                    0: "admins",
                    1: "evaluadores",
                    2: "gobiernos",
                    3: "instituciones",
                    4: "establecimientos",
                    5: "docentes"
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
                                    <Tab label={t("usuarios.label-registro-admins")}/>
                                    <Tab label={t("usuarios.label-usuarios-admins")}/>
                                    <Tab label={t("usuarios.label-usuarios-evaluadores")}/>
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
            case "ADMIN":
                tituloPagina = <Translation>{ t => t("usuarios") }</Translation>;
                tipoUsuariosMostrados = {
                    0: "evaluadores",
                    1: "gobiernos",
                    2: "instituciones",
                    3: "establecimientos",
                    4: "docentes"
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
                                    <Tab label={t("usuarios.label-registro-evaluadores")}/>
                                    <Tab label={t("usuarios.label-usuarios-evaluadores")}/>
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
                            <ListaUsuarios tipoUsuariosMostrados={tipoUsuariosMostrados[0]} userType={this.props.userType} accountType={this.props.userType} />
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
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[1]} userType="INSTITUCION" />
                                ) : this.props.userType === "INSTITUCION" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[1]} userType="ESTABLECIMIENTO" />
                                ) : this.props.userType === "ADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[1]} userType="ADMIN" />
                                ) : this.props.userType === "SUPERADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[1]} userType="ADMIN" />
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
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[2]} userType="ESTABLECIMIENTO" />
                                ) : this.props.userType === "INSTITUCION" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[2]} userType="DOCENTE" />
                                ) : this.props.userType === "ADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[2]} userType="GOBIERNO" />
                                ) : this.props.userType === "SUPERADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[2]} userType="ADMIN" />
                                ) : ""
                            }
                        </Grid>
                    </Grid>
                );
                break;
            case 4:
                divisionMostrada = (
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            {
                                this.props.userType === "SUPERADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[3]} userType="GOBIERNO" />
                                ) : this.props.userType === "ADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[3]} userType="INSTITUCION" />
                                ) : ""
                            }
                        </Grid>
                    </Grid>
                );
                break;
            case 5:
                divisionMostrada = (
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            {
                                this.props.userType === "SUPERADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[4]} userType="INSTITUCION" />
                                ) : this.props.userType === "ADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[4]} userType="ESTABLECIMIENTO" />
                                ) : ""
                            }
                        </Grid>
                    </Grid>
                );
                break;
            case 6:
                divisionMostrada = (
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            {
                                this.props.userType === "SUPERADMIN" ? (
                                    <ListaUsuarios accountType={this.props.userType} tipoUsuariosMostrados={tipoUsuariosMostrados[5]} userType="ESTABLECIMIENTO" />
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
                                <Typography variant="h5">{t("usuarios.titulo")}</Typography>
                                <hr className="mb-4"/>
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