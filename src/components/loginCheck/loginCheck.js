import React, { Component } from "react";

import { Translation } from "react-i18next";
import { StickyContainer, Sticky } from "react-sticky";
import { Route, Link, Switch } from "react-router-dom";
import { isMobile } from "react-device-detect";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import YoutubeSearchedFor from "@material-ui/icons/YoutubeSearchedFor";
import Help from "@material-ui/icons/Help";
import CollectionsBookmark from "@material-ui/icons/CollectionsBookmark";

import Registro from "../registro/registro";
import Login from "../login/login";
import Prueba from "../prueba/prueba";
import Dashboard from "../dashboard/dashboard";
import DashboardSuperadmin from "../dashboard/dashboardSuperadmin";
import DashboardAdmin from "../dashboard/dashboardAdmin";
import DashboardEvaluador from "../dashboard/dashboardEvaluador";
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
import Auditoria from "../auditoria/auditoria";
import Instrumento from "../instrumento/instrumento";
import Ayuda from "../ayuda/ayuda";
import Encuesta from "../encuesta/encuesta";
import Cursos from "../cursos/cursos";
import RecuperacionDatos from "../recuperacionDatos/recuperacionDatos";

class LoginCheck extends Component {
    constructor() {
        super();

        /* Aquí se debe verificar el login pasado y la configuración del usuario */
        this.tipoPerfil = "SUPERADMIN";
        this.state = {
            isLogeado: true,
            isPrimerIngreso: false,
            locale: "es",
            tipo: this.tipoPerfil,
            id: "loremipsum",
            roles: ["SUPERADMIN", "ADMIN", "EVALUADOR"],
            isInViewingMode: false,
            viewingModeUserType: ""
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
                this.datosPerfil = {
                    nombre: "Súper Admin",
                    imgSrc: ""
                }
                break;
            case "ADMIN":
                this.datosPerfil = {
                    nombre: "Adam Admin",
                    imgSrc: ""
                }
                break;
            default:
                break;
        }

        this.links = {};
    }

    actualizarIsInViewingMode = (nuevoEstado, nuevoViewingModeUserType) => {
        if (!nuevoEstado) {
            switch (window.location.pathname) {
                case "/":
                    nuevoEstado = false;
                    nuevoViewingModeUserType = this.tipoPerfil;
                    break;
                default:
                    nuevoEstado = true;
                    break;
            }
        }
        
        this.setState({
            tipo: nuevoViewingModeUserType,
            isInViewingMode: nuevoEstado,
            viewingModeUserType: nuevoViewingModeUserType
        });
    }

    resetViewingMode = () => {
        this.setState({
            tipo: this.tipoPerfil,
            isInViewingMode: false,
            viewingModeUserType: ""
        });
    }

    actualizarLogeado = nuevoEstado => {
        let newIsInViewingMode = this.state.isInViewingMode;
        if (!nuevoEstado) {
            newIsInViewingMode = false;
        }

        this.setState({
            isInViewingMode: newIsInViewingMode,
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
            case "SUPERADMIN":
            case "ADMIN":
                tituloLabelUsuarios = <Translation>{ t => t("usuarios") }</Translation>;
                iconUsers = <HowToReg />;
                break;
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
            case "EVALUADOR":
            case "DOCENTE":
            default:
                break;
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <CssBaseline />
                            {
                                this.state.isLogeado ? (
                                    <AppBar position="fixed" color="primary">
                                        <Toolbar className="px-md-0">
                                            <Avatar alt="Imagen de perfil" src={this.datosPerfil.imgSrc !== "" ? this.datosPerfil.imgSrc : "https://via.placeholder.com/200"} className="mr-3 mr-md-0 profile-avatar"/>
                                            <Typography variant="h6" color="inherit" className="text-ellipsis mr-2 mr-md-0 text-md-center d-md-none">{this.datosPerfil.nombre}</Typography>
                                            {
                                                !this.state.isPrimerIngreso ? (
                                                    <React.Fragment>
                                                    <div className="d-flex align-items-center justify-content-end flex-grow-1 flex-md-column justify-content-md-center navbar-icons">
                                                        <Tooltip title="Inicio" placement="right">
                                                            <Link to="/">
                                                                <IconButton aria-label="Ir a página de inicio" style={{ color: "#ffffff" }}>
                                                                    <Home/>
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                        {
                                                            !this.state.isInViewingMode ? (
                                                                <Tooltip title="Configuración" placement="right">
                                                                    <Link to={`/${t("link.configuracion")}`}>
                                                                        <IconButton aria-label="Ir a página de configuración" style={{ color: "#ffffff" }}>
                                                                            <SettingsApplications />
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : null
                                                        }
                                                        {
                                                            this.state.tipo === "SUPERADMIN" ? (
                                                                <Tooltip title={t("instrumento.titulo-alt")} placement="right">
                                                                    <Link to={`/${t("link.instrumento")}`}>
                                                                        <IconButton aria-label="Ir a página del instrumento" style={{
                                                                            color: "#ffffff"
                                                                        }}>
                                                                            <LibraryBooks fontSize="small"/>
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "SUPERADMIN" || this.state.tipo === "ADMIN" ? (
                                                                <React.Fragment>
                                                                    <Tooltip title={t("auditoria.titulo-alt")} placement="right">
                                                                        <Link to={`/${t("link.auditoria")}`}>
                                                                            <IconButton aria-label="Ir a página de auditoría" style={{
                                                                                color: "#ffffff"
                                                                            }}>
                                                                                <YoutubeSearchedFor/>
                                                                            </IconButton>
                                                                        </Link>
                                                                    </Tooltip>
                                                                    <Tooltip title={t("cursos.titulo")} placement="right">
                                                                        <Link to={`/${t("link.cursos")}`}>
                                                                            <IconButton aria-label="Ir a página de cursos" style={{
                                                                                color: "#ffffff"
                                                                            }}>
                                                                                <CollectionsBookmark fontSize="small"/>
                                                                            </IconButton>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </React.Fragment>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "DOCENTE" ? (
                                                                <Tooltip title={t("procesos.titulo-alt")} placement="right">
                                                                    <Link to={{
                                                                        pathname: `/${t("link.procesos")}`,
                                                                        state: {
                                                                            userType: this.state.tipo,
                                                                            userID: this.state.id
                                                                        }
                                                                    }}>
                                                                        <IconButton aria-label="Ir a página de procesos" style={{
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
                                                                <Tooltip title={t("territorios.titulo")} placement="right">
                                                                    <Link to={{
                                                                        pathname: `/${t("link.territorios")}`,
                                                                        state: {
                                                                            userType: this.state.tipo,
                                                                            userID: this.state.id
                                                                        }
                                                                    }}>
                                                                        <IconButton aria-label="Ir a página de territorios" style={{color: "#ffffff"}}>
                                                                            <Layers/>
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "SUPERADMIN" || this.state.tipo === "ADMIN" || this.state.tipo === "GOBIERNO" || this.state.tipo === "INSTITUCION" || this.state.tipo === "ESTABLECIMIENTO" ? (
                                                                <Tooltip title={tituloLabelUsuarios} placement="right">
                                                                    <Link to={`/${t("link.usuarios")}`}>
                                                                        <IconButton aria-label="Ir a página de usuarios" style={{ color: "#ffffff" }}>
                                                                            { iconUsers }
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                        {
                                                            this.state.tipo === "EVALUADOR" ? (
                                                                <Tooltip title="Calificaciones" placement="right">
                                                                    <Link to={{
                                                                        pathname: `/${t("link.calificaciones")}`,
                                                                        state: {
                                                                            userType: this.state.tipo,
                                                                            userID: this.state.id,
                                                                            isInViewingMode: this.state.isInViewingMode
                                                                        }
                                                                    }}>
                                                                        <IconButton aria-label="Ir a página de calificaciones" style={{ color: "#ffffff" }}>
                                                                            <PlaylistAddCheck />
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            ) : ""
                                                        }
                                                    </div>
                                                    <Tooltip title="Cerrar sesión" placement="right">
                                                        <Link to="/">
                                                            <IconButton aria-label="Cerrar sesión" style={{ color: "#ffffff" }} onClick={() => this.actualizarLogeado(false)}>
                                                                <ExitToApp />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    </React.Fragment>
                                                ) : ""
                                            }
                                        </Toolbar>
                                    </AppBar>
                                ) : (
                                    <AppBar position="static" color="primary">
                                        <Toolbar>
                                            <Typography variant="h6" color="inherit">{t("loginCheck.mensaje-navbar")}</Typography>
                                        </Toolbar>
                                    </AppBar>
                                )
                            }
                            <StickyContainer>
                                <Container component="main" className="pt-5" id="top">
                                    {
                                        this.state.isInViewingMode ? (
                                            isMobile ? (
                                                <Paper className="p-3 mt-5" style={{backgroundColor: "#009A9C"}}>
                                                    <div className="d-md-flex align-items-center justify-content-between text-center text-md-left">
                                                        <Typography variant="body1" className="mb-3 mb-md-0" style={{color: "#ffffff"}}><strong>{t("visualizacion.titulo")}</strong></Typography>
                                                        <Link to="/" style={{textDecoration: "none"}} onClick={this.resetViewingMode}>
                                                            <Button className="w-100 w-md-auto" size="medium" variant="contained" style={{color: "#009A9C", backgroundColor: "#ffffff"}}><strong>{t("visualizacion.btn")}</strong></Button>
                                                        </Link>
                                                    </div>
                                                </Paper>
                                            ) : (
                                                <Sticky>
                                                    {
                                                        ({style}) => (
                                                            <div style={{
                                                                ...style,
                                                                zIndex: 2
                                                            }} className="mt-5 mt-md-0 pt-5">
                                                                <Paper className="p-3" style={{backgroundColor: "#009A9C"}}>
                                                                    <div className="d-md-flex align-items-center justify-content-between text-center text-md-left">
                                                                        <Typography variant="body1" className="mb-3 mb-md-0" style={{color: "#ffffff"}}><strong>{t("visualizacion.titulo")}</strong></Typography>
                                                                        <Link to="/" style={{textDecoration: "none"}} onClick={this.resetViewingMode}>
                                                                            <Button className="w-100 w-md-auto" size="medium" variant="contained" style={{color: "#009A9C", backgroundColor: "#ffffff"}}><strong>{t("visualizacion.btn")}</strong></Button>
                                                                        </Link>
                                                                    </div>
                                                                </Paper>
                                                            </div>
                                                        )
                                                    }
                                                </Sticky>
                                            )
                                        ) : null
                                    }
                                    <div className="py-5 pb-md-5 pt-md-0">
                                        <Switch>
                                            <Route path="/" exact render={(...routeProps) => {
                                                if (this.state.isLogeado) {
                                                    if (this.state.isPrimerIngreso && this.state.tipo !== "SUPERADMIN") {
                                                        return <PrimerIngreso actualizarIsPrimerIngreso={this.actualizarIsPrimerIngreso} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil}/>;
                                                    } else {
                                                        return <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />;
                                                    }
                                                } else {
                                                    return <Login actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />
                                                }
                                            }} />
                                            <Route path={`/${t("link.login")}`} render={(...routeProps) => <Login {...routeProps} actualizarLogeado={this.actualizarLogeado} isLogeado={this.state.isLogeado} />} />
                                            <Route path={`/${t("link.registro")}`} render={(...routeProps) => <Registro {...routeProps} userProfile={this.datosPerfil} isLogeado={this.state.isLogeado} />} />
                                            <Route path={`/${t("link.ayuda")}`} component={Ayuda}/>
                                            <Route path={`/${t("link.recuperacion-datos")}`} render={(...routeProps) => <RecuperacionDatos userType={this.state.tipo} userID={this.state.id} isLogeado={this.state.isLogeado} />}/>
                                            {
                                                this.state.isLogeado ? (
                                                    this.state.isPrimerIngreso ? (
                                                        <Route path={`/${t("link.primer-ingreso")}`} render={(...routeProps) => <PrimerIngreso {...routeProps} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil}/>}/>
                                                    ) : (
                                                        <Switch>
                                                            <Route path={`/${t("link.dashboard")}`} render={(...routeProps) => <Dashboard {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                            <Route path={`/${t("link.dashboard-docente")}`} render={(...routeProps) => <DashboardDocente {...routeProps} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                            <Route path={`/${t("link.dashboard-ie")}`} render={(...routeProps) => <DashboardInstitucionEducativa {...routeProps} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                            <Route path={`/${t("link.dashboard-ee")}`} render={(...routeProps) => <DashboardEstablecimientoEducativo {...routeProps} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                            <Route path={`/${t("link.dashboard-gobierno")}`} render={(...routeProps) => <DashboardGobierno {...routeProps} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                            <Route path={`/${t("link.dashboard-evaluador")}`} render={(...routeProps) => <DashboardEvaluador {...routeProps} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                            <Route path={`/${t("link.encuesta")}`} render={(...routeProps) => <Encuesta {...routeProps} userProfile={this.datosPerfil} />} />
                                                            <Route path={`/${t("link.prueba")}`} render={(...routeProps) => <Prueba {...routeProps} userProfile={this.datosPerfil} />} />
                                                            <Route path={`/${t("link.practica")}`} render={(...routeProps) => <Practica {...routeProps} userProfile={this.datosPerfil}/>} />
                                                            <Route path={`/${t("link.preentrevista")}`} render={(...routeProps) => <Preentrevista {...routeProps} userProfile={this.datosPerfil} />} />
                                                            <Route path={`/${t("link.entrevista")}`} render={(...routeProps) => <Entrevista {...routeProps} userProfile={this.datosPerfil} />} />
                                                            <Route path={`/${t("link.configuracion")}`} render={(...routeProps) => <Configuracion isInViewingMode={this.state.isInViewingMode} userProfile={this.datosPerfil} {...routeProps} actualizarLogeado={this.actualizarLogeado} userType={this.state.tipo} roles={this.state.roles} />}/>
                                                            {
                                                                this.state.tipo !== "DOCENTE" && this.state.tipo !== "EVALUADOR" ? (
                                                                    <Route path={`/${t("link.usuarios")}`} render={(...routeProps) => <Usuarios userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                                ) : ""
                                                            }
                                                            {
                                                                this.state.tipo === "DOCENTE"  ? (
                                                                    <Route path={`/${t("link.procesos")}`} render={(...routeProps) => <Procesos  updateIsInViewingMode={this.actualizarIsInViewingMode} userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                                ) : ""
                                                            }
                                                            {
                                                                this.state.tipo === "GOBIERNO" ? (
                                                                    <Route path={`/${t("link.territorios")}`} render={(...routeProps) => <Territorios updateIsInViewingMode={this.actualizarIsInViewingMode} userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                                ) : ""
                                                            }
                                                            {
                                                                this.state.tipo === "EVALUADOR" ? (
                                                                    <Switch>
                                                                        <Route path={`/${t("link.practica-revision")}`} render={(...routeProps) => <PracticaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.preentrevista-revision")}`} render={(...routeProps) => <PreentrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.entrevista-revision")}`} render={(...routeProps) => <EntrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.encuesta-revision")}`} render={(...routeProps) => <EncuestaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.calificaciones")}`} render={(...routeProps) => <Calificaciones {...routeProps} updateIsInViewingMode={this.actualizarIsInViewingMode} userType={this.state.tipo} userID={this.state.id} />} userProfile={this.datosPerfil} />
                                                                        <Route component={Pagina404} />
                                                                    </Switch>
                                                                ) : ""
                                                            }
                                                            {
                                                                this.state.tipo === "SUPERADMIN" ? (
                                                                    <Switch>
                                                                        <Route path={`/${t("link.dashboard-superadmin")}`} component={DashboardSuperadmin} />
                                                                        <Route path={`/${t("link.dashboard-admin")}`} render={(...routeProps) => <DashboardAdmin {...routeProps} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                                        <Route path={`/${t("link.instrumento")}`} render={(...routeProps) => <Instrumento {...routeProps} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />} />
                                                                        <Route path={`/${t("link.auditoria")}`} component={(...routeProps) => <Auditoria {...routeProps} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />} />
                                                                        <Route path={`/${t("link.cursos")}`} component={(...routeProps) => <Cursos {...routeProps} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />} />
                                                                        <Route path={`/${t("link.procesos")}`} render={(...routeProps) => <Procesos  updateIsInViewingMode={this.actualizarIsInViewingMode} userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.territorios")}`} render={(...routeProps) => <Territorios updateIsInViewingMode={this.actualizarIsInViewingMode} userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.practica-revision")}`} render={(...routeProps) => <PracticaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.preentrevista-revision")}`} render={(...routeProps) => <PreentrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.entrevista-revision")}`} render={(...routeProps) => <EntrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.encuesta-revision")}`} render={(...routeProps) => <EncuestaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.calificaciones")}`} render={(...routeProps) => <Calificaciones {...routeProps} updateIsInViewingMode={this.actualizarIsInViewingMode} userType={this.state.tipo} userID={this.state.id} />} userProfile={this.datosPerfil} />
                                                                        <Route component={Pagina404} />
                                                                    </Switch>
                                                                ) : ""
                                                            }
                                                            {
                                                                this.state.tipo === "ADMIN" ? (
                                                                    <Switch>
                                                                        <Route path={`/${t("link.dashboard-admin")}`} render={(...routeProps) => <DashboardAdmin {...routeProps} isInViewingMode={this.state.isInViewingMode} updateIsInViewingMode={this.actualizarIsInViewingMode} />} />
                                                                        <Route path={`/${t("link.auditoria")}`} component={(...routeProps) => <Auditoria {...routeProps} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />} />
                                                                        <Route path={`/${t("link.cursos")}`} component={(...routeProps) => <Cursos {...routeProps} userType={this.state.tipo} userID={this.state.id} userProfile={this.datosPerfil} />} />
                                                                        <Route path={`/${t("link.procesos")}`} render={(...routeProps) => <Procesos updateIsInViewingMode={this.actualizarIsInViewingMode} userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.territorios")}`} render={(...routeProps) => <Territorios updateIsInViewingMode={this.actualizarIsInViewingMode} userProfile={this.datosPerfil} {...routeProps} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.practica-revision")}`} render={(...routeProps) => <PracticaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.preentrevista-revision")}`} render={(...routeProps) => <PreentrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.entrevista-revision")}`} render={(...routeProps) => <EntrevistaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.encuesta-revision")}`} render={(...routeProps) => <EncuestaRevision {...routeProps} userProfile={this.datosPerfil} userType={this.state.tipo} userID={this.state.id} />} />
                                                                        <Route path={`/${t("link.calificaciones")}`} render={(...routeProps) => <Calificaciones {...routeProps} updateIsInViewingMode={this.actualizarIsInViewingMode} userType={this.state.tipo} userID={this.state.id} />} userProfile={this.datosPerfil} />
                                                                        <Route component={Pagina404} />
                                                                    </Switch>
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
                            </StickyContainer>
                            <Link to={t("link.ayuda")}>
                                <Tooltip title={t("titulo.ayuda")} placement="left">
                                    <Fab aria-label={t("aria.ayuda")} color="primary" className={window.location.pathname === `/${t("link.prueba")}` ? "fab fab--alt" : "fab"}>
                                        <Help/>
                                    </Fab>
                                </Tooltip>
                            </Link>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    };
}

export default LoginCheck;