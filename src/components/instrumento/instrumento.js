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

import { equals } from "equally";

encuestas.splice(2, 1);

class Instrumento extends Component {
    constructor() {
        super();
        
        this.dataOriginal = {
            descriptores: JSON.parse(JSON.stringify(descriptores)),
            encuestas: JSON.parse(JSON.stringify(encuestas)),
            prueba: "",
            preentrevista: ""
        };

        this.state = {
            dataActual: JSON.parse(JSON.stringify(this.dataOriginal)),
            shouldConfirmCreateVersion: false,
            divisionMostrada: 1,
            isLoading: true,
            didDataChange: false
        }
    }

    componentDidMount = () => {
        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 1000);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.dataActual !== this.state.dataActual) {
            if (equals(this.state.dataActual, {
                descriptores: JSON.parse(JSON.stringify(descriptores)),
                encuestas: JSON.parse(JSON.stringify(encuestas)),
                prueba: "",
                preentrevista: ""
            })) {
                this.setState({
                    didDataChange: false
                });
            } else {
                this.setState({
                    didDataChange: true
                });
            }
        }
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            dataActual: {...this.dataOriginal},
            divisionMostrada: newValue,
            isLoading: true,
            didDataChange: false
        });

        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 1000);
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
        /* const elementosActualizados = [...this.state.dataActual[categoria]]; */
        const elementosActualizados = JSON.parse(JSON.stringify(this.dataOriginal[categoria]));

        switch (categoria) {
            case "descriptores":
                if (e.target.name === "codigo") {
                    e.target.value = e.target.value.toUpperCase();
                }
                elementosActualizados[index] = {
                    ...elementosActualizados[index],
                    [e.target.name]: e.target.value
                }
                break;
            case "encuestas":
                elementosActualizados[index.i][index.j] = e.target.value;
                break;
            case "prueba":

                break;
            case "preentrevista":

                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: elementosActualizados
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
                                            this.state.dataActual.descriptores.map((descriptor, i) => (
                                                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                                                    <Paper className="p-4">
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            label={t("instrumento.descriptores-codigo")}
                                                            name="codigo"
                                                            value={this.state.dataActual.descriptores[i].codigo}
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
                                                            value={this.state.dataActual.descriptores[i].contenido}
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
                                            this.state.dataActual.encuestas.map((factor, i) => (
                                                <Grid item xs={12} key={i}>
                                                    <Typography variant="h6" className="mb-4">{`${t("instrumento.encuestas-factor")} ${i + 1}`}</Typography>
                                                    {
                                                        factor.map((pregunta, j) => (
                                                            <Paper className="p-4 mb-4" key={j}>
                                                                <TextField
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    fullWidth
                                                                    multiline
                                                                    rows={2}
                                                                    label={t("instrumento.encuestas-pregunta")}
                                                                    name="pregunta"
                                                                    value={this.state.dataActual.encuestas[i][j]}
                                                                    onChange={e => { this.handleChange(e, "encuestas", {i: i, j: j}) }}
                                                                />
                                                            </Paper>
                                                        ))
                                                    }
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
                                    this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto my-5"/> : (
                                        <React.Fragment>
                                            { tabMostrado }
                                            <Grid item xs={12} hidden={!this.state.didDataChange}>
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