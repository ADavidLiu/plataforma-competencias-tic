import React from "react";

import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Stepper from "@material-ui/core/Stepper";
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { Link } from "react-router-dom";

import moment from "moment";

function Perfil(props) {
    const { tipo, perfil, userID } = props;

    let perfilMostrado = "";

    if (tipo === "DOCENTES") {
        perfilMostrado = (
            <Translation>
                {
                    t => (
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle1"><strong>{perfil.nombre}</strong></Typography>
                                <Typography variant="body2">{t("perfil.ingreso")} {perfil.ultimoIngreso === "" ? <strong>{t("perfil.nunca")}</strong> : moment.unix(perfil.ultimoIngreso).format("DD/MM/YYYY - h:mm:ss")}</Typography>
                            </Grid>
                            <Grid item xs={6} className="text-right">
                                <Link to={{
                                    pathname: "/dashboard-docente",
                                    state: {
                                        docenteID: userID
                                    }
                                }} style={{textDecoration: "none"}}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="default"
                                        size="medium"
                                    >{t("perfil.ver-detalles")}</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <Stepper
                                        activeStep={perfil.pasoActual}
                                        alternativeLabel
                                        className="my-4"
                                        style={{backgroundColor: "transparent"}}
                                    >
                                        <Step key="Registro">
                                            <StepLabel>{t("procesoPaso.0")}</StepLabel>
                                        </Step>
                                        <Step key="Prueba de conocimiento">
                                            <StepLabel>{t("procesoPaso.1")}</StepLabel>
                                        </Step>
                                        <Step key="Prácticas educativas">
                                            <StepLabel>{t("procesoPaso.2")}</StepLabel>
                                        </Step>
                                        <Step key="Preentrevista">
                                            <StepLabel>{t("procesoPaso.3")}</StepLabel>
                                        </Step>
                                        <Step key="Entrevista">
                                            <StepLabel>{t("procesoPaso.4")}</StepLabel>
                                        </Step>
                                    </Stepper>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    } else {
        perfilMostrado = (
            <Translation>
                {
                    t => (
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle1"><strong>{perfil.nombre}</strong></Typography>
                                <Typography variant="body2">{t("perfil.num-docentes")} {perfil.numDocentes}</Typography>
                            </Grid>
                            <Grid item xs={6} className="text-right">
                                <Link to={{
                                    pathname: "/dashboard-ee",
                                    state: {
                                        establecimientoID: userID
                                    }
                                }} style={{textDecoration: "none"}}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="default"
                                        size="medium"
                                    >{t("perfil.ver-detalles")}</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <hr/>
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }

    return perfilMostrado;
}

export default Perfil;