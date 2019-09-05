import React, { Component } from "react";

import { I18n } from "react-polyglot-hooks";
import frases from "../../phrases/main";
import { T } from 'react-polyglot-hooks';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import HowToReg from '@material-ui/icons/HowToReg';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';

import Registro from "../registro/registro";
import Login from "../login/login";
import Prueba from "../prueba/prueba";
import Dashboard from "../dashboard/dashboard";
import DashboardDocente from "../dashboard/dashboardDocente";
import DashboardEstablecimientoEducativo from "../dashboard/dashboardEstablecimientoEducativo";
import DashboardGobierno from "../dashboard/dashboardGobierno";
import Practicas from "../practicas/practicas";
import Preentrevista from "../preentrevista/preentrevista";
import Entrevista from "../entrevista/entrevista";
import Configuracion from "../configuracion/configuracion";
import Usuarios from "../usuarios/usuarios";
import Pagina404 from "../pagina404/pagina404";

class LoginCheck extends Component {
    constructor() {
        super();

        /* Aquí se debe verificar el login pasado y la configuración del usuario */
        this.state = {
            isLogeado: true,
            locale: "es",
            tipo: "INSTITUCION",
            id: "loremipsum"
        }

        /* Pruebas de integración con backend */
        /* this.state = {
            isLogeado: false,
            locale: "es",
            tipo: "",
            id: ""
        } */

        /* Conectarse al backend para obtener los datos personales del usuario, IE o EE */
        this.datosPerfil = {};

        switch (this.state.tipo) {
            case "DOCENTE":
                this.datosPerfil = {
                    nombre: "John Doe",
                    imgSrc: ""
                }
                break;
            case "INSTITUCION":
                this.datosPerfil = {
                    nombre: "Universidad Javeriana",
                    imgSrc: ""
                }
                break;
            case "ESTABLECIMIENTO":
                this.datosPerfil = {
                    nombre: "Universidad Javeriana - Cali",
                    imgSrc: ""
                }
                break;
            case "GOBIERNO":
                this.datosPerfil = {
                    nombre: "Ministerio de Educación Nacional",
                    imgSrc: ""
                }
                break;
            default:
                break;
        }
    }

    actualizarLogeado = nuevoEstado => {
        this.setState({
            isLogeado: nuevoEstado
        });
    }

    render() {
        return (
            <I18n locale={this.state.locale} phrases={frases[this.state.locale]}>
                <Router>
                    <CssBaseline />
                    {
                        this.state.isLogeado ? (
                            <AppBar position="static" color="primary">
                                <Toolbar>
                                    <Avatar alt="Imagen de perfil" src={this.datosPerfil.imgSrc !== "" ? this.datosPerfil.imgSrc : "https://via.placeholder.com/200"} className="mr-3" />
                                    <Typography variant="h6" color="inherit" className="text-ellipsis mr-2">{this.datosPerfil.nombre}</Typography>
                                    <div className="d-flex align-items-center justify-content-end flex-grow-1">
                                        <Tooltip title="Configuración" placement="bottom">
                                            <Link to="/configuracion">
                                                <IconButton style={{ color: "#ffffff" }}>
                                                    <SettingsApplications />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                        {
                                            this.state.tipo !== "DOCENTE" ? (
                                                <Tooltip title="Usuarios" placement="bottom">
                                                    <Link to="/usuarios">
                                                        <IconButton style={{ color: "#ffffff" }}>
                                                            <HowToReg />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                            ) : ""
                                        }
                                        <Tooltip title="Inicio" placement="bottom">
                                            <Link to="/">
                                                <IconButton style={{ color: "#ffffff" }}>
                                                    <Home />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                        <Tooltip title="Cerrar sesión" placement="bottom">
                                            <Link to="/">
                                                <IconButton style={{ color: "#ffffff" }} onClick={() => this.actualizarLogeado(false)}>
                                                    <ExitToApp />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </Toolbar>
                            </AppBar>
                        ) : (
                            <AppBar position="static" color="primary">
                                <Toolbar>
                                    <Typography variant="h6" color="inherit"><T phrase="loginCheck.mensaje-navbar" /></Typography>
                                </Toolbar>
                            </AppBar>       
                        )
                    }
                    <Container component="main">
                        <div className="py-5">
                            <Switch>
                                <Route path="/" exact render={(...routeProps) => {
                                    if (this.state.isLogeado) {
                                        return <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} />;
                                    } else {
                                        return <Login actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />
                                    }
                                }} />
                                <Route path="/login/" render={(...routeProps) => <Login actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />} />
                                <Route path="/registro/" component={Registro} />
                                {
                                    this.state.isLogeado ? (
                                        <Switch>
                                            <Route path="/prueba/" component={Prueba} />
                                            <Route path="/dashboard/" render={(...routeProps) => <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} />} />
                                            <Route path="/dashboard-docente/" component={DashboardDocente} />
                                            <Route path="/dashboard-ee/" component={DashboardEstablecimientoEducativo} />
                                            <Route path="/dashboard-gobierno/" component={DashboardGobierno} />
                                            <Route path="/practicas/" component={Practicas} />
                                            <Route path="/preentrevista/" component={Preentrevista} />
                                            <Route path="/entrevista/" component={Entrevista} />
                                            <Route path="/configuracion/" render={(...routeProps) => <Configuracion {...routeProps} actualizarLogeado={this.actualizarLogeado} />}/>
                                            <Route path="/usuarios/" render={(...routeProps) => <Usuarios {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                            <Route component={Pagina404} />
                                        </Switch>
                                    ) : ""
                                }
                                <Route component={Pagina404} />
                            </Switch>
                        </div>
                    </Container>
                </Router>
            </I18n>
        );
    };
}

export default LoginCheck;