import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import OutlinedInput from "@material-ui/core/OutlinedInput";

import { BrowserRouter as Router, Redirect, Route, Link, Switch } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class RecuperacionDatos extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            isCorrect: false,
            shouldShowMessage: false
        }
    }

    submit = e => {
        e.preventDefault();
        /* Conexión al backend. Dependiendo de la respuesta, mostrar el mensaje correspondiente. */
        let response = true;

        if (response) {
            this.setState({
                isCorrect: true,
                shouldShowMessage: true,
                email: ""
            });
        } else {
            this.setState({
                isCorrect: false,
                shouldShowMessage: true
            });
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleMessageClose = (event, reason) => {
        this.setState({
            shouldShowMessage: false
        });
    };

    render() {
        if (this.props.isLogeado) {
            return <Redirect to="/"/>
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{t("titulo.recuperacion-datos")}</title>
                            </Helmet>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="mb-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                        <div className="text-center mb-4">
                                            <Typography component="h1" variant="h5" className="mb-3 text-center"
                                            ><strong>{t("recuperacionDatos.titulo")}</strong></Typography>
                                            <Typography variant="body1">{t("recuperacionDatos.ayuda")}</Typography>
                                        </div>
                                        <form onSubmit={this.submit}>
                                            <Grid container className="text-center">
                                                <Grid item xs={12}>
                                                    <OutlinedInput
                                                        inputProps={{
                                                            "aria-label": `${t("aria.email")}`
                                                        }}
                                                        placeholder={t("registro.email")}
                                                        id="email"
                                                        name="email"
                                                        required
                                                        type="email"
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                        className="w-100"
                                                    />
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className="mt-4"
                                                        size="large"
                                                    >
                                                        {t("enviar")}
                                                    </Button>
                                                    <hr className="my-4"/>
                                                    <Link to={`/${t("link.login")}`} style={{color:"#009A9C"}}>
                                                        <Typography variant="body2" component="small" color="primary" className="text-center">{t("recuperacionDatos.regresar")}</Typography>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </div>
                                </Grid>
                            </Grid>
                            <Snackbar
                                className="w-75 w-md-auto message-success"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                open={this.state.shouldShowMessage && this.state.isCorrect}
                                autoHideDuration={6000}
                                onClose={this.handleMessageClose}
                                message={<Typography variant="body1"><strong>{t("recuperacionDatos.mensaje-correcto")}</strong></Typography>}
                                action={[
                                    <IconButton
                                        key="close"
                                        aria-label="Cerrar"
                                        color="inherit"
                                        onClick={this.handleMessageClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>,
                                ]}
                            />
                            <Snackbar
                                className="w-75 w-md-auto message-error"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                open={this.state.shouldShowMessage && !this.state.isCorrect}
                                autoHideDuration={6000}
                                onClose={this.handleMessageClose}
                                message={<Typography variant="body1"><strong>{t("recuperacionDatos.mensaje-error")}</strong></Typography>}
                                action={[
                                    <IconButton
                                        key="close"
                                        aria-label="Cerrar"
                                        color="inherit"
                                        onClick={this.handleMessageClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>,
                                ]}
                            />
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default RecuperacionDatos;