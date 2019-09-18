import React, { Component } from "react";

import { Translation } from "react-i18next";

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
import AccountBalance from "@material-ui/icons/AccountBalance";
import School from "@material-ui/icons/School";
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import Layers from "@material-ui/icons/Layers";
import Assignment from "@material-ui/icons/Assignment";

import Registro from "../registro/registro";
import Login from "../login/login";
import Prueba from "../prueba/prueba";
import Dashboard from "../dashboard/dashboard";
import DashboardSuperadmin from "../dashboard/dashboardSuperadmin";
import DashboardAdmin from "../dashboard/dashboardAdmin";
import DashboardGobierno from "../dashboard/dashboardGobierno";
import DashboardInstitucionEducativa from "../dashboard/dashboardInstitucionEducativa";
import DashboardEstablecimientoEducativo from "../dashboard/dashboardEstablecimientoEducativo";
import DashboardDocente from "../dashboard/dashboardDocente";
import Practica from "../practica/practica";
import Preentrevista from "../preentrevista/preentrevista";
import Entrevista from "../entrevista/entrevista";
import Configuracion from "../configuracion/configuracion";
import Usuarios from "../usuarios/usuarios";
import Procesos from "../procesos/procesos";
import Pagina404 from "../pagina404/pagina404";
import PracticaRevision from "../practica/practicaRevision";
import PreentrevistaRevision from "../preentrevista/preentrevistaRevision";
import EntrevistaRevision from "../entrevista/entrevistaRevision";
import EncuestaRevision from "../encuesta/encuestaRevision";
import Calificaciones from "../calificaciones/calificaciones";
import Territorios from "../territorios/territorios";
import PrimerIngreso from "../primerIngreso/primerIngreso";

class LoginCheck extends Component {
    constructor() {
        super();

        /* Aquí se debe verificar el login pasado y la configuración del usuario */
        this.state = {
            isLogeado: true,
            isPrimerIngreso: true,
            locale: "es",
            tipo: "ESTABLECIMIENTO",
            id: "loremipsum",
            roles: ["ESTABLECIMIENTO", "EVALUADOR"]
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
            case "EVALUADOR":
                this.datosPerfil = {
                    nombre: "Jane Doe",
                    imgSrc: ""
                }
                break;
            case "SUPERADMIN":
                
                break;
            case "ADMIN":

                break;
            default:
                break;
        }

        this.links = {};
    }

    actualizarLogeado = nuevoEstado => {
        this.setState({
            isLogeado: nuevoEstado
        });
    }

    actualizarIsPrimerIngreso = nuevoEstado => {
        this.setState({
            isPrimerIngreso: nuevoEstado
        });
    }

    render() {
        let tituloLabelUsuarios = "";
        let iconUsers;
        switch (this.state.tipo) {
            case "GOBIERNO":
                tituloLabelUsuarios = <Translation>{ t => t("instituciones-corto") }</Translation>;
                iconUsers = <AccountBalance />;
                break;
            case "INSTITUCION":
                tituloLabelUsuarios = <Translation>{ t => t("establecimientos-corto") }</Translation>;
                iconUsers = <AccountBalance />;
                break;
            case "ESTABLECIMIENTO":
                tituloLabelUsuarios = <Translation>{ t => t("docentes") }</Translation>;
                iconUsers = <School />;
                break;
            case "SUPERADMIN":
            case "ADMIN":
                tituloLabelUsuarios = <Translation>{ t => t("gobiernos") }</Translation>;
                iconUsers = <HowToReg />;
                break;
            case "EVALUADOR":
            case "DOCENTE":
            default:
                break;
        }

        return (
            <Translation>
                {
                    t => (
                        <Router>
                            <CssBaseline />
                            {
                                this.state.isLogeado ? (
                                    <AppBar position="fixed" color="primary" id="header-top">
                                        <Toolbar>
                                            <Avatar alt="Imagen de perfil" src={this.datosPerfil.imgSrc !== "" ? this.datosPerfil.imgSrc : "https://via.placeholder.com/200"} className="mr-3" />
                                            <Typography variant="h6" color="inherit" className="text-ellipsis mr-2">{this.datosPerfil.nombre}</Typography>
                                            {
                                                !this.state.isPrimerIngreso ? (
                                                    <div className="d-flex align-items-center justify-content-end flex-grow-1">
                                                        <Tooltip title="Inicio" placement="bottom">
                                                            <Link to="/">
                                                                <IconButton style={{ color: "#ffffff" }}>
                                                                    <Home />
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                        <Tooltip title="Configuración" placement="bottom">
                                                            <Link to={`/${t("link.configuracion")}`}>
                                                                <IconButton style={{ color: "#ffffff" }}>
                                                                    <SettingsApplications />
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                        {
                                                            this.state.tipo === "DOCENTE" ? (
                                                                <Tooltip title={t("procesos.titulo-alt")}>
                                                                    <Link to={`/${t("link.procesos")}`}>
                                                                        <IconButton style={{
                                                                            color: "#ffffff"
                                                                        }}>
                                                                            <Assignment/>
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "GOBIERNO" ? (
                                                                <Tooltip title={t("territorios.titulo")} placement="bottom">
                                                                    <Link to={`/${t("link.territorios")}`}>
                                                                        <IconButton style={{color: "#ffffff"}}>
                                                                            <Layers/>
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "SUPERADMIN" || this.state.tipo === "ADMIN" || this.state.tipo === "GOBIERNO" || this.state.tipo === "INSTITUCION" || this.state.tipo === "ESTABLECIMIENTO" ? (
                                                                <Tooltip title={tituloLabelUsuarios} placement="bottom">
                                                                    <Link to={`/${t("link.usuarios")}`}>
                                                                        <IconButton style={{ color: "#ffffff" }}>
                                                                            { iconUsers }
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "EVALUADOR" ? (
                                                                <Tooltip title="Calificaciones" placement="bottom">
                                                                    <Link to={`/${t("link.calificaciones")}`}>
                                                                        <IconButton style={{ color: "#ffffff" }}>
                                                                            <PlaylistAddCheck />
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                        <Tooltip title="Cerrar sesión" placement="bottom">
                                                            <Link to="/">
                                                                <IconButton style={{ color: "#ffffff" }} onClick={() => this.actualizarLogeado(false)}>
                                                                    <ExitToApp />
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                ) : ""
                                            }
                                        </Toolbar>
                                    </AppBar>
                                ) : (
                                    <AppBar position="static" color="primary" id="header-top">
                                        <Toolbar>
                                            <Typography variant="h6" color="inherit">{t("loginCheck.mensaje-navbar")}</Typography>
                                        </Toolbar>
                                    </AppBar>
                                )
                            }
                            <Container component="main" className="pt-5">
                                <div className="py-5">
                                    <Switch>
                                        <Route path="/" exact render={(...routeProps) => {
                                            if (this.state.isLogeado) {
                                                if (this.state.isPrimerIngreso) {
                                                    return <PrimerIngreso actualizarIsPrimerIngreso={this.actualizarIsPrimerIngreso} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil}/>;
                                                } else {
                                                    return <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />;
                                                }
                                            } else {
                                                return <Login actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />
                                            }
                                        }} />
                                        <Route path={`/${t("link.login")}`} render={(...routeProps) => <Login actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />} />
                                        <Route path={`/${t("link.registro")}`} render={(...routeProps) => <Registro {...routeProps} userProfile={this.datosPerfil} />} />
                                        {
                                            this.state.isLogeado ? (
                                                this.state.isPrimerIngreso ? (
                                                    <Route path={`/${t("link.primer-ingreso")}`} render={(...routeProps) => <PrimerIngreso userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil}/>}/>
                                                ) : (
                                                    <Switch>
                                                        <Route path={`/${t("link.dashboard")}`} render={(...routeProps) => <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />} />
                                                        <Route path={`/${t("link.dashboard-docente")}`} component={DashboardDocente} />
                                                        <Route path={`/${t("link.dashboard-ie")}`} component={DashboardInstitucionEducativa} />
                                                        <Route path={`/${t("link.dashboard-ee")}`} component={DashboardEstablecimientoEducativo} />
                                                        <Route path={`/${t("link.dashboard-gobierno")}`} component={DashboardGobierno} />
                                                        <Route path={`/${t("link.prueba")}`} render={(...routeProps) => <Prueba {...routeProps} userProfile={this.datosPerfil} />} />
                                                        <Route path={`/${t("link.practica")}`} component={Practica} />
                                                        <Route path={`/${t("link.preentrevista")}`} render={(...routeProps) => <Preentrevista {...routeProps} userProfile={this.datosPerfil} />} />
                                                        <Route path={`/${t("link.entrevista")}`} render={(...routeProps) => <Entrevista {...routeProps} userProfile={this.datosPerfil} />} />
                                                        <Route path={`/${t("link.configuracion")}`} render={(...routeProps) => <Configuracion userProfile={this.datosPerfil} {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} roles={this.state.roles} />}/>
                                                        {
                                                            this.state.tipo !== "DOCENTE" && this.state.tipo !== "EVALUADOR" ? (
                                                                <Route path={`/${t("link.usuarios")}`} render={(...routeProps) => <Usuarios userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "DOCENTE" ? (
                                                                <Route path={`/${t("link.procesos")}`} render={(...routeProps) => <Procesos userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "GOBIERNO" ? (
                                                                <Route path={`/${t("link.territorios")}`} render={(...routeProps) => <Territorios userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "EVALUADOR" ? (
                                                                <React.Fragment>
                                                                    <Route path={`/${t("link.practica-revision")}`} render={(...routeProps) => <PracticaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                    <Route path={`/${t("link.preentrevista-revision")}`} render={(...routeProps) => <PreentrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                    <Route path={`/${t("link.entrevista-revision")}`} render={(...routeProps) => <EntrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                    <Route path={`/${t("link.encuesta-revision")}`} render={(...routeProps) => <EncuestaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                    <Route path={`/${t("link.calificaciones")}`} render={(...routeProps) => <Calificaciones {...routeProps} userType={this.state.tipo} userID={this.state.id} />} userProfile={this.datosPerfil} />
                                                                </React.Fragment>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "SUPERADMIN" ? (
                                                                <Route path={`/${t("link.dashboard-superadmin")}`} component={DashboardSuperadmin} />
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "SUPERADMIN" || this.state.tipo === "ADMIN" ? (
                                                                <Route path={`/${t("link.dashboard-admin")}`} component={DashboardAdmin} />
                                                            ) : ""
                                                        }
                                                        <Route component={Pagina404} />
                                                    </Switch>
                                                )
                                            ) : ""
                                        }
                                        <Route component={Pagina404} />
                                    </Switch>
                                </div>
                            </Container>
                        </Router>
                    )
                }
            </Translation>
        );
    };
}

export default LoginCheck;