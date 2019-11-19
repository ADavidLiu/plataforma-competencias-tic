import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { BrowserRouter as Redirect } from "react-router-dom";

class PrimerIngreso extends Component {
    constructor() {
        super();

        this.state = {
            contrasenia: "",
            didSubmit: false,
            mostrarContrasenia: false
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    cambiarContrasenia = e => {
        /* Enviar al backend nueva contraseña, y redireccionar al dashboard */
        this.props.actualizarIsPrimerIngreso(false);
        this.setState({
            didSubmit: true
        });
    }

    handleClickMostrarContrasenia = () => {
        this.setState({
            mostrarContrasenia: !this.state.mostrarContrasenia
        });
    }

    handleMouseDownMostrarContrasenia = e => {
        e.preventDefault();
    }

    render() {
        if (this.state.didSubmit) {
            return <Redirect to="/"/>
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{t("titulo.primerIngreso")}</title>
                            </Helmet>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="mb-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3 py-md-5">
                                        <div className="text-center mb-4">
                                            <Typography component="h1" variant="h5" className="mb-2 text-center">
                                                <strong>{t("primerIngreso.titulo")}</strong>
                                            </Typography>
                                            <Typography variant="body1">{t("primerIngreso.ayuda")}</Typography>
                                            <Typography variant="body1">{t("primerIngreso.ayuda-2")}</Typography>
                                        </div>
                                        <FormControl
                                            component="fieldset"
                                            className="w-100 text-center"
                                        >
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <form onSubmit={this.cambiarContrasenia}>
                                                        <FormControl className="w-100">
                                                            <OutlinedInput
                                                                inputProps={{
                                                                    "aria-label": `${t("aria.label-nueva-contrasenia")}`,
                                                                }}
                                                                id="contrasenia"
                                                                name="contrasenia"
                                                                required
                                                                type={this.state.mostrarContrasenia ? 'text' : 'password'}
                                                                value={this.state.contrasenia}
                                                                onChange={this.handleChange}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            onClick={this.handleClickMostrarContrasenia}
                                                                            onMouseDown={this.handleMouseDownMostrarContrasenia}
                                                                        >
                                                                            {this.state.mostrarContrasenia ? <Visibility /> : <VisibilityOff />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            color="primary"
                                                            className="mt-3"
                                                            size="large"
                                                        >
                                                            {t("usuarios.btn-guardar")}
                                                        </Button>
                                                    </form>
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default PrimerIngreso;