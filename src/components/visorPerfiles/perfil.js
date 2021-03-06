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

    switch (tipo) {
        case "DOCENTES":
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
                                        pathname: `/${t("link.dashboard-docente")}`,
                                        state: {
                                            docenteID: userID,
                                            shouldActivateViewingMode: true
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
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
            break;
        case "ESTABLECIMIENTOS":
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
                                        pathname: `/${t("link.dashboard-ee")}`,
                                        state: {
                                            establecimientoID: userID,
                                            shouldActivateViewingMode: true
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
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
            break;
        case "INSTITUCIONES":
            perfilMostrado = (
                <Translation>
                    {
                        t => (
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1"><strong>{perfil.nombre}</strong></Typography>
                                    <Typography variant="body2">{t("perfil.num-sedes")} {perfil.numSedes}</Typography>
                                    <Typography variant="body2">{t("perfil.num-docentes")} {perfil.numDocentes}</Typography>
                                </Grid>
                                <Grid item xs={6} className="text-right">
                                    <Link to={{
                                        pathname: `/${t("link.dashboard-ie")}`,
                                        state: {
                                            institucionID: userID,
                                            shouldActivateViewingMode: true
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
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
            break;
        case "GOBIERNOS":
            perfilMostrado = (
                <Translation>
                    {
                        t => (
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1"><strong>{perfil.nombre}</strong></Typography>
                                    <Typography variant="body2">{t("perfil.num-instituciones")} {perfil.numInstituciones}</Typography>
                                    <Typography variant="body2">{t("perfil.num-sedes")} {perfil.numSedes}</Typography>
                                    <Typography variant="body2">{t("perfil.num-docentes")} {perfil.numDocentes}</Typography>
                                </Grid>
                                <Grid item xs={6} className="text-right">
                                    <Link to={{
                                        pathname: `/${t("link.dashboard-gobierno")}`,
                                        state: {
                                            gobiernoID: userID,
                                            shouldActivateViewingMode: true
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
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
            break;
        case "EVALUADORES":
            perfilMostrado = (
                <Translation>
                    {
                        t => (
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1"><strong>{perfil.nombre}</strong></Typography>
                                    <Typography variant="body2">{t("perfil.num-encuestas")} {perfil.asignaciones.encuestas}</Typography>
                                    <Typography variant="body2">{t("perfil.num-practicas")} {perfil.asignaciones.practicas}</Typography>
                                    <Typography variant="body2">{t("perfil.num-preentrevistas")} {perfil.asignaciones.preentrevistas}</Typography>
                                    <Typography variant="body2">{t("perfil.num-entrevistas")} {perfil.asignaciones.entrevistas}</Typography>
                                </Grid>
                                <Grid item xs={6} className="text-right">
                                    <Link to={{
                                        pathname: `/${t("link.dashboard-evaluador")}`,
                                        state: {
                                            evaluadorID: userID,
                                            shouldActivateViewingMode: true
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
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
            break;
        case "ADMINS":
            perfilMostrado = (
                <Translation>
                    {
                        t => (
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1"><strong>{perfil.nombre}</strong></Typography>
                                    <Typography variant="body2">{t("perfil.pais")} {perfil.pais.split("-")[1]}</Typography>
                                </Grid>
                                <Grid item xs={6} className="text-right">
                                    <Link to={{
                                        pathname: `/${t("link.dashboard-admin")}`,
                                        state: {
                                            adminID: userID,
                                            shouldActivateViewingMode: true
                                        }
                                    }} style={{textDecoration: "none"}}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
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
            break;
        default:
            break;
    }

    return perfilMostrado;
}

export default Perfil;