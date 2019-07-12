import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';

import Registro from "../registro/registro";
import Login from "../login/login";
import Prueba from "../prueba/prueba";
import Dashboard from "../dashboard/dashboard";
import DashboardDocente from "../dashboard/dashboardDocente";
import DashboardEstablecimientoEducativo from "../dashboard/dashboardEstablecimientoEducativo";

class LoginCheck extends Component {
    constructor() {
        super();

        /* Aquí se debe verificar el login del usuario */

        this.state = {
            isLogeado: true,
            tipo: "establecimiento",
            id: "loremipsum"
        }

        /* Conectarse al backend para obtener los datos personales del usuario o EE */
        this.datosPerfil = {};

        if (this.state.tipo === "docente") {
            this.datosPerfil = {
                nombre: "Lorem Ipsum",
                imgSrc: ""
            }
        } else {
            this.datosPerfil = {
                nombre: "Lorem Ipsum Dolor Sit Amet",
                imgSrc: ""
            }
        }
    }

    actualizarLogeado = nuevoEstado => {
        this.setState({
            isLogeado: nuevoEstado
        });
    }

    render() {
        return (
            <Router>
                <CssBaseline />
                {
                    this.state.isLogeado ? (
                        <AppBar position="static" color="primary">
                            <Toolbar>
                                <Avatar alt="Imagen de perfil" src={this.datosPerfil.imgSrc !== "" ? this.datosPerfil.imgSrc : "https://via.placeholder.com/200"} className="mr-3" />
                                <Typography variant="h6" color="inherit">{this.datosPerfil.nombre}</Typography>
                                <div className="d-flex align-items-center justify-content-end flex-grow-1">
                                    <Link to="/" className="mr-4">
                                        <IconButton style={{ color: "#ffffff" }} edge="start">
                                            <Home />
                                        </IconButton>
                                    </Link>
                                    <Link to="/">
                                        <IconButton style={{ color: "#ffffff" }} edge="start" onClick={() => this.actualizarLogeado(false)}>
                                            <ExitToApp />
                                        </IconButton>
                                    </Link>
                                </div>
                            </Toolbar>
                        </AppBar>
                    ) : (
                        <AppBar position="static" color="primary">
                            <Toolbar>
                                <Typography variant="h6" color="inherit">Plataforma de competencias TIC</Typography>
                            </Toolbar>
                        </AppBar>       
                    )
                }
                <Container component="main">
                    <div className="py-5">
                        <Route path="/" exact render={(...routeProps) => {
                            if (this.state.isLogeado) {
                                return <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} />;
                            } else {
                                return <Login actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />
                            }
                        }} />
                        <Route path="/login/" render={(...routeProps) => <Login actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />} />
                        <Route path="/registro/" component={Registro} />
                        <Route path="/prueba/" component={Prueba} />
                        <Route path="/dashboard/" render={(...routeProps) => <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} />} />
                        <Route path="/dashboarddocente/" component={DashboardDocente} />
                        <Route path="/dashboardee/" component={DashboardEstablecimientoEducativo} />
                    </div>
                </Container>
            </Router>
        );
    };
}

export default LoginCheck;