import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Stepper from "@material-ui/core/Stepper";
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { Link } from "react-router-dom";

import moment from "moment";

function Perfil(props) {
    const { perfil } = props;

    return (
		<React.Fragment>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography variant="subtitle1"><strong>{perfil.nombre}</strong></Typography>
                    <Typography variant="body2">Último ingreso: {perfil.ultimoIngreso === "" ? <strong>nunca ha ingresado</strong> : moment.unix(perfil.ultimoIngreso).format("DD/MM/YYYY - h:mm:ss")}</Typography>
                </Grid>
                <Grid item xs={6} className="text-right">
                    <Link to="/dashboard-docente" style={{textDecoration: "none"}}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="default"
                            size="medium"
                        >Ver detalles</Button>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Stepper
                        activeStep={perfil.pasoActual}
                        alternativeLabel
                        className="my-4"
                    >
                        <Step key="Registro">
                            <StepLabel>Registro de datos</StepLabel>
                        </Step>
                        <Step key="Prueba de conocimiento">
                            <StepLabel>Prueba de conocimiento</StepLabel>
                        </Step>
                        <Step key="Prácticas educativas">
                            <StepLabel>Prácticas educativas</StepLabel>
                        </Step>
                        <Step key="Preentrevista">
                            <StepLabel>Preentrevista</StepLabel>
                        </Step>
                        <Step key="Entrevista">
                            <StepLabel>Entrevista</StepLabel>
                        </Step>
                    </Stepper>
                </Grid>
                <Grid item xs={12}>
                    <hr/>
                </Grid>
            </Grid>
        </React.Fragment>
	);
}

export default Perfil;