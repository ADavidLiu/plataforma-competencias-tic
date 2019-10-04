import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import CircularProgress from "@material-ui/core/CircularProgress";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from "@material-ui/core/TextField";

import descriptores from "../../models/descriptores";
import encuestas from "../../models/encuestas";

class Instrumento extends Component {
    constructor() {
        super();

        this.state = {
            descriptores: {
                originales: descriptores,
                actuales: descriptores
            },
            encuestas: {
                originales: encuestas,
                actuales: encuestas
            },
            prueba: {
                originales: "",
                actuales: ""
            },
            preentrevista: {
                originales: "",
                actuales: ""
            },
            shouldConfirmCreateVersion: false,
            divisionMostrada: 0,
            isLaoding: true
        }
    }

    componentDidMount = () => {
        const timeout = setTimeout(() => {
            this.setState({
                isLaoding: false
            });
            clearTimeout(timeout);
        }, 2000);
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue,
            isLaoding: true
        });

        const timeout = setTimeout(() => {
            this.setState({
                isLaoding: false
            });
            clearTimeout(timeout);
        }, 2000);
    }

    confirmarCrearVersion = () => {
        this.setState({
            shouldConfirmCreateVersion: !this.state.shouldConfirmCreateVersion
        });
    }

    crearVersion = () => {
        /* Conectarse al backend */
        console.log("Creada!");
    }

    handleChange = (e, categoria, index) => {
        const elementosActualizados = [...this.state[categoria].actuales];
        elementosActualizados[index] = {
            ...elementosActualizados[index],
            [e.target.name]: e.target.value
        }
        this.setState({
            [categoria]: {
                originales: this.state[categoria].originales,
                actuales: elementosActualizados
            }
        });
    }

    render() {
        let tabMostrado;
        switch (this.state.divisionMostrada) {
            case 0:
                tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        {
                                            this.state.descriptores.actuales.map((descriptor, i) => (
                                                <Grid key={descriptor.codigo} item xs={12} sm={6} md={4} lg={3}>
                                                    <Paper className="p-4">
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            label={t("instrumento.descriptores-codigo")}
                                                            name="codigo"
                                                            value={this.state.descriptores.actuales[i].codigo}
                                                            onChange={e => { this.handleChange(e, "descriptores", i) }}
                                                        />
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            multiline
                                                            rows={5}
                                                            label={t("instrumento.descriptores-contenido")}
                                                            name="contenido"
                                                            value={this.state.descriptores.actuales[i].contenido}
                                                            onChange={e => { this.handleChange(e, "descriptores", i) }}
                                                        />
                                                    </Paper>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case 1:
                tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        {
                                            this.state.encuestas.actuales.map((factor, i) => (
                                                <Grid item xs={12} key={i}>

                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case 2:

                break;
            case 3:

                break;
            default:
                break;
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("instrumento.titulo-alt")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={5} className="pb-5">
                                <Grid item xs={12}>
                                    <Typography variant="h5">{t("instrumento.titulo")}</Typography>
                                    <hr className="mb-4"/>
                                    <Paper>
                                        <Tabs
                                            variant="scrollable"
                                            indicatorColor="primary"
                                            textColor="primary"
                                            value={this.state.divisionMostrada}
                                            onChange={this.handleTabChange}
                                        >
                                            <Tab label={t("instrumento.tab-descriptores")}/>
                                            <Tab label={t("instrumento.tab-encuestas")}/>
                                            <Tab label={t("instrumento.tab-prueba")}/>
                                            <Tab label={t("instrumento.tab-preentrevista")}/>
                                        </Tabs>
                                    </Paper>
                                </Grid>
                                {
                                    this.state.isLaoding ? <CircularProgress color="primary" className="d-block mx-auto my-5"/> : (
                                        <React.Fragment>
                                            { tabMostrado }
                                            <Grid item xs={12}>
                                                <div className="d-md-flex align-items-center justify-content-end">
                                                    <Button variant="outlined" size="large" color="primary" className="w-100 w-md-auto">{t("instrumento.btn-crear")}</Button>
                                                    <Button className="mt-3 mt-md-0 ml-md-3 w-100 w-md-auto" variant="contained" size="large" color="primary">{t("instrumento.btn-actualizar")}</Button>
                                                </div>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                }
                            </Grid>
                            <Dialog open={this.state.shouldConfirmCreateVersion} onClose={this.confirmarCrearVersion}>
                                <DialogTitle>{t("dashboardDocente.cancelar-proceso-actual-titulo")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText className="mb-3">
                                        {t("dashboardDocente.cancelar-proceso-actual-ayuda")}
                                    </DialogContentText>
                                    <DialogContentText>
                                        {t("dashboardDocente.cancelar-proceso-actual-ayuda-2")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions className="p-3 pt-0 d-block d-md-flex">
                                    <Button color="primary" variant="outlined" onClick={this.confirmarCrearVersion} className="w-100 w-md-auto">{t("instrumento.crear-si")}</Button>
                                    <Button color="primary" variant="contained" onClick={this.crearVersion} className="ml-0 ml-md-3 mt-3 mt-md-0 w-100 w-md-auto">{t("instrumento.crear-no")}</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Instrumento;