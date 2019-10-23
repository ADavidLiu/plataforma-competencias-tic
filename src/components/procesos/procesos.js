import React, { Component } from "react";

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from "react-router-dom";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import sortBy from "sort-by";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Chip from "@material-ui/core/Chip";

import Avatar from '@material-ui/core/Avatar';
import Today from "@material-ui/icons/Today";
import Event from "@material-ui/icons/Event";
import Launch from "@material-ui/icons/Launch";
import Build from "@material-ui/icons/Build";
import Done from "@material-ui/icons/Done";

import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import RutaAprendizaje from "../rutaAprendizaje/rutaAprendizaje";

class Procesos extends Component {
    constructor() {
        super();

        this.state = {
            procesos: [
                {
                    version: "1.0.1",
                    currentTab: 0,
                    fecha: "2019-08-03",
                    fechaInicio: "29-06-2019",
                    fechaFinal: "03-08-2019",
                    vez: 2,
                    prueba: {
                        correctas: 15,
                        incorrectas: 16
                    },
                    practica: {
                        calificacion: 1,
                    },
                    preentrevista: [
                        {
                            descriptor: "I2a",
                            calificacion: 1,
                        },
                        {
                            descriptor: "I1b",
                            calificacion: 1,
                        }
                    ],
                    entrevista: [
                        {
                            descriptor: "R1tb",
                            calificacion: 1,
                        },
                        {
                            descriptor: "E2ub",
                            calificacion: 2,
                        }
                    ],
                    reporte: {
                        indiceTic: "1-1-1",
                        descripcion: "Proident magna esse elit laboris laborum in amet ut adipisicing. Adipisicing dolor duis et amet laborum commodo nulla esse eu anim commodo nostrud fugiat nisi. Et officia proident mollit sit enim minim mollit et qui dolore. Sunt magna sint nostrud pariatur quis consectetur aliqua anim reprehenderit reprehenderit. In culpa reprehenderit Lorem Lorem officia irure veniam laborum adipisicing officia veniam nisi aute."
                    },
                    cursos: [
                        {
                            nombre: "Nombre curso 4",
                            descripcion: "In ex eu culpa cupidatat do aute do irure ad enim. Reprehenderit anim ipsum aliquip velit tempor id ad eiusmod cillum reprehenderit sint velit quis aute. Proident non deserunt id magna consectetur excepteur magna aliquip.",
                            imgSrc: "https://via.placeholder.com/400",
                            link: "https://www.google.com"
                        },
                        {
                            nombre: "Nombre curso 5",
                            descripcion: "Amet ut occaecat nostrud veniam velit aliquip proident ullamco. Aliqua commodo velit nisi do consectetur cupidatat incididunt ea laboris eiusmod et voluptate veniam incididunt. Et eiusmod fugiat adipisicing ut. Eu est minim in pariatur. Enim voluptate ipsum labore ad enim ex velit commodo cillum aute velit cillum in.",
                            imgSrc: "https://via.placeholder.com/400",
                            link: "https://www.google.com"
                        },
                        {
                            nombre: "Nombre curso 6",
                            descripcion: "In deserunt ex do aliquip pariatur cupidatat velit nisi nostrud eiusmod et labore sit. Duis eu adipisicing ad ut incididunt ea Lorem. Sit Lorem consequat cillum ullamco minim cupidatat adipisicing aute amet. Est commodo est est voluptate aute. In non consectetur mollit sunt aute velit est aute.",
                            imgSrc: "https://via.placeholder.com/400",
                            link: "https://www.google.com"
                        }
                    ]
                },
                {
                    version: "1.0.0",
                    currentTab: 0,
                    fecha: "2018-11-20",
                    fechaInicio: "15-10-2018",
                    fechaFinal: "20-11-2018",
                    vez: 1,
                    prueba: {
                        correctas: 28,
                        incorrectas: 3
                    },
                    practica: {
                        calificacion: 2,
                    },
                    preentrevista: [
                        {
                            descriptor: "I2a",
                            calificacion: 2,
                        },
                        {
                            descriptor: "I1b",
                            calificacion: 1,
                        }
                    ],
                    entrevista: [
                        {
                            descriptor: "R1tb",
                            calificacion: 1,
                        },
                        {
                            descriptor: "E2ub",
                            calificacion: 3,
                        }
                    ],
                    reporte: {
                        indiceTic: "2-2-1",
                        descripcion: "Quis minim laborum duis velit quis ullamco irure est sunt cupidatat qui et in. Cupidatat deserunt eu aliquip in elit aliquip incididunt sit reprehenderit magna voluptate veniam. Proident quis deserunt dolor sunt. Aliqua ex aliqua tempor anim occaecat deserunt mollit aliqua in velit."
                    },
                    cursos: [
                        {
                            nombre: "Nombre curso 1",
                            descripcion: "Dolore pariatur mollit exercitation eiusmod veniam qui commodo. Eu reprehenderit exercitation cupidatat fugiat occaecat consequat consequat incididunt non.",
                            imgSrc: "https://via.placeholder.com/400",
                            link: "https://www.google.com"
                        },
                        {
                            nombre: "Nombre curso 2",
                            descripcion: "Officia deserunt do ipsum sit enim consectetur ipsum ullamco non. Officia eiusmod aute dolor velit tempor amet labore aliquip velit incididunt. Irure minim aute quis anim ullamco minim voluptate sint.",
                            imgSrc: "https://via.placeholder.com/400",
                            link: "https://www.google.com"
                        },
                        {
                            nombre: "Nombre curso 3",
                            descripcion: "Nostrud id officia in ipsum ullamco ex pariatur. Nostrud ullamco adipisicing et ex officia nisi esse ullamco. Deserunt adipisicing ea dolor fugiat. Excepteur commodo dolore non dolor tempor commodo irure ipsum.",
                            imgSrc: "https://via.placeholder.com/400",
                            link: "https://www.google.com"
                        }
                    ]
                }
            ],
            filtros: {
                categoria: "fecha",
                orden: "descendente"
            }
        }
    }

    componentDidMount = () => {
        if (this.props[0] && this.props[0].location.state) {
            if (this.props[0].location.state.shouldActivateViewingMode) {
                this.props.updateIsInViewingMode(true, "DOCENTE");
            }
        }

        this.setState({
            elementosMostrados: this.state.procesos
        });
    }

    handleTabChange = (e, newTabIndex, index) => {
        const copiaProcesos = [...this.state.procesos];
        copiaProcesos[index].currentTab = newTabIndex;

        this.setState({
            procesos: copiaProcesos
        });
    }

    handleFiltroChange = e => {
        const copiaProcesos = [...this.state.procesos];

        switch (e.target.name) {
            case "categoria":
                const dash = this.state.filtros.orden === "descendente" ? "-" : "";

                switch (e.target.value) {
                    case "fecha":
                        copiaProcesos.sort(sortBy(`${dash}fecha`));
                        break;
                    case "version":
                        copiaProcesos.sort(sortBy(`${dash}version`));
                        break;
                    default:
                        break;
                }
                break;
            case "orden":
                switch (e.target.value) {
                    case "descendente":
                        copiaProcesos.sort(sortBy(`-${this.state.filtros.categoria}`));
                        break;
                    case "ascendente":
                        copiaProcesos.sort(sortBy(this.state.filtros.categoria));
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        this.setState({
            procesos: copiaProcesos,
            filtros: {
                ...this.state.filtros,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }
        if (this.props[0].location && this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }

        return(
            <Translation>
                {
                    t => (
                        <Grid container spacing={2}>
                            <Helmet>
                                <title>{`${t("procesos.titulo")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid item xs={12} className="mb-4">
                                <Typography variant="h5">
                                    {t("procesos.titulo")}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={5} alignItems="center">
                                    <Grid item xs={12} md={6} className="py-0">
                                        <Chip color="primary" label={`${t("procesos.total")} ${this.state.procesos.length}`} avatar={<Avatar><Done /></Avatar>} variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12} md={6} className="d-flex align-items-center justify-content-between">
                                        <FormControl className="w-50">
                                            <Select
                                                value={this.state.filtros.categoria}
                                                onChange={this.handleFiltroChange}
                                                input={<OutlinedInput required name="categoria"/>}
                                            >
                                                <MenuItem value="fecha">{t("filtros.fecha-finalizacion")}</MenuItem>
                                                <MenuItem value="version">{t("filtros.version")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl className="ml-3 w-50">
                                            <Select
                                                value={this.state.filtros.orden}
                                                onChange={this.handleFiltroChange}
                                                input={<OutlinedInput required name="orden"/>}
                                            >
                                                <MenuItem value="descendente">{t("filtros.descendente")}</MenuItem>
                                                <MenuItem value="ascendente">{t("filtros.ascendente")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                            {
                                this.state.procesos.map((proceso, i) => (
                                    <Grid item xs={12} key={proceso.vez}>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <div className="d-flex align-items-center">
                                                    <Avatar className="mr-3" style={{backgroundColor: "#009A9C"}}><Typography><strong>{proceso.vez}</strong></Typography></Avatar>
                                                    <div className="d-md-flex align-items-center">
                                                        <Typography className="d-flex align-items-center justify-content-start"><Today className="mr-2" fontSize="small" /><strong>{t("procesos.fecha-inicio")}</strong>&nbsp;{proceso.fechaInicio}</Typography>
                                                        <Typography className="ml-md-3 d-flex align-items-center justify-content-start"><Event className="mr-2" fontSize="small" /><strong>{t("procesos.fecha-final")}</strong>&nbsp;{proceso.fechaFinal}</Typography>
                                                        <Typography className="ml-md-3 d-flex align-items-center justify-content-start"><Build className="mr-2" fontSize="small" /><strong>{t("procesos.version")}</strong>&nbsp;{proceso.version}</Typography>
                                                    </div>
                                                </div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails className="d-block">
                                                <Typography variant="h6" className="mb-2">{t("indice-tic")}: {proceso.reporte.indiceTic}</Typography>
                                                <Typography variant="body1" className="mb-3">{proceso.reporte.descripcion}</Typography>
                                                <a href="#" style={{textDecoration: "none"}}>
                                                    <Button variant="contained" color="primary">{t("descargar-certificado")}</Button>
                                                </a>
                                                <hr/>
                                                <Typography variant="h6" className="mb-2">{t("procesos.resultados")}</Typography>
                                                <Tabs
                                                    indicatorColor="primary"
                                                    variant="scrollable"
                                                    className="mb-4"
                                                    value={this.state.procesos[i].currentTab}
                                                    onChange={(e, newValue) => { this.handleTabChange(e, newValue, i); }}>
                                                        <Tab label={t("procesoPaso.1")} />
                                                        <Tab label={t("practicas.titulo")} />
                                                        <Tab label={t("procesoPaso.3")} />
                                                        <Tab label={t("procesoPaso.4")} />
                                                        <Tab label={t("dashboardGobierno.ruta")} />
                                                </Tabs>
                                                {
                                                    this.state.procesos[i].currentTab === 0 ? (
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <Link to={{
                                                                    pathname: `/${t("link.prueba")}`,
                                                                    state: {
                                                                        tipoUsuario: "DOCENTE",
                                                                        shouldActivateViewingMode: true
                                                                    }
                                                                }} style={{textDecoration: "none"}}>
                                                                    <Button color="primary" variant="contained" className="d-inline-flex align-items-center justify-content-start">
                                                                        <Typography style={{color: "#ffffff", textTransform: "none"}} variant="body1">{t("perfil.ver-detalles")}</Typography>
                                                                        <Launch className="ml-2" style={{color: "#ffffff"}}/>
                                                                    </Button>
                                                                </Link>
                                                            </Grid>
                                                            <Grid item xs={6} md={4}>
                                                                <Paper className="p-3">
                                                                    <Typography variant="h4" color="primary"><strong>{proceso.prueba.correctas}</strong></Typography>
                                                                    <Typography variant="subtitle2">{t("procesos.prueba-correctas")}</Typography>
                                                                </Paper>
                                                            </Grid>
                                                            <Grid item xs={6} md={4}>
                                                                <Paper className="p-3">
                                                                    <Typography variant="h4" color="primary"><strong>{proceso.prueba.incorrectas}</strong></Typography>
                                                                    <Typography variant="subtitle2">{t("procesos.prueba-incorrectas")}</Typography>
                                                                </Paper>
                                                            </Grid>
                                                        </Grid>
                                                    ) : this.state.procesos[i].currentTab === 1 ? (
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <Link to={{
                                                                    pathname: `/${t("link.practica")}`,
                                                                    state: {
                                                                        tipoUsuario: "DOCENTE",
                                                                        shouldActivateIsInViewingMode: true
                                                                    }
                                                                }} style={{textDecoration: "none"}}>
                                                                    <Button color="primary" variant="contained" className="d-inline-flex align-items-center justify-content-start">
                                                                        <Typography style={{color: "#ffffff", textTransform: "none"}} variant="body1">{t("perfil.ver-detalles")}</Typography>
                                                                        <Launch className="ml-2" style={{color: "#ffffff"}}/>
                                                                    </Button>
                                                                </Link>
                                                            </Grid>
                                                            <Grid item xs={6} md={4}>
                                                                <Paper className="p-3">
                                                                    <Typography variant="h4" color="primary"><strong>{proceso.practica.calificacion}</strong></Typography>
                                                                    <Typography variant="subtitle2">{t("calificacion")}</Typography>
                                                                </Paper>
                                                            </Grid>
                                                        </Grid>
                                                    ) : this.state.procesos[i].currentTab === 2 ? (
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <Link to={{
                                                                    pathname: `/${t("link.preentrevista")}`,
                                                                    state: {
                                                                        tipoUsuario: "DOCENTE",
                                                                        shouldActivateIsInViewingMode: true
                                                                    }
                                                                }} style={{textDecoration: "none"}}>
                                                                    <Button color="primary" variant="contained" className="d-inline-flex align-items-center justify-content-start">
                                                                        <Typography style={{color: "#ffffff", textTransform: "none"}} variant="body1">{t("perfil.ver-detalles")}</Typography>
                                                                        <Launch className="ml-2" style={{color: "#ffffff"}}/>
                                                                    </Button>
                                                                </Link>
                                                            </Grid>
                                                            {
                                                                proceso.preentrevista.map(item => (
                                                                    <Grid item xs={6} md={3} lg={2} key={item.descriptor}>
                                                                        <Paper className="p-3">
                                                                            <Typography variant="h4" color="primary"><strong>{item.calificacion}</strong></Typography>
                                                                            <Typography variant="subtitle2">{t("descriptor")} <strong>{item.descriptor}</strong></Typography>
                                                                        </Paper>
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </Grid>
                                                    ) : this.state.procesos[i].currentTab === 3 ? (
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <Link to={{
                                                                    pathname: `/${t("link.entrevista")}`,
                                                                    state: {
                                                                        tipoUsuario: "DOCENTE",
                                                                        shouldActivateIsInViewingMode: true
                                                                    }
                                                                }} style={{textDecoration: "none"}}>
                                                                    <Button color="primary" variant="contained" className="d-inline-flex align-items-center justify-content-start">
                                                                        <Typography style={{color: "#ffffff", textTransform: "none"}} variant="body1">{t("perfil.ver-detalles")}</Typography>
                                                                        <Launch className="ml-2" style={{color: "#ffffff"}}/>
                                                                    </Button>
                                                                </Link>
                                                            </Grid>
                                                            {
                                                                proceso.entrevista.map(item => (
                                                                    <Grid item xs={6} md={3} lg={2} key={item.descriptor}>
                                                                        <Paper className="p-3">
                                                                            <Typography variant="h4" color="primary"><strong>{item.calificacion}</strong></Typography>
                                                                            <Typography variant="subtitle2">{t("descriptor")} <strong>{item.descriptor}</strong></Typography>
                                                                        </Paper>
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </Grid>
                                                    ) : this.state.procesos[i].currentTab === 4 ? (
                                                        <RutaAprendizaje cursos={proceso.cursos} />
                                                    ) : ""
                                                }
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default Procesos;