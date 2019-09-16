import React, { Component } from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import Reaptcha from "reaptcha";
import axios from "axios";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            usuario: "",
            contrasenia: "",
            didSubmit: false,
            isCaptchaRendered: false,
            isCaptchaSolved: false,
            submittedWithoutCaptcha: false
        }
    }

    reinitDialogCaptcha = () => {
        this.setState({
            submittedWithoutCaptcha: false
        });
    }

    onCaptchaVerify = () => {
        this.setState({
            isCaptchaSolved: true
        });
    }

    onCaptchaRender = () => {
        this.setState({
            isCaptchaRendered: true
        });
    }

    onCaptchaExpire = () => {
        this.setState({
            isCaptchaSolved: false
        });
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    login = e => {
        e.preventDefault();
        
        if (!this.state.isCaptchaSolved) {
            this.setState({
                submittedWithoutCaptcha: true
            });
        } else {
            console.log("Conectarse al backend");

            axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/${process.env.REACT_APP_LOGIN}`, {
                email: this.state.usuario,
                password: this.state.contrasenia
            }).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
    
            /* If success */
            this.setState({
                didSubmit: true
            });
            this.props.actualizarLogeado(true);
        }
    }

    render() {
        if (this.state.didSubmit && this.props.isLogeado) {
            return <Redirect to="/" />;
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{t("titulo.no-login")}</title>
                            </Helmet>
                            <div className="mb-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    className="mb-4 text-center"
                                >
                                    <strong>{t("login.titulo")}</strong>
                                </Typography>
                                <FormControl
                                    component="fieldset"
                                    className="w-100 text-center"
                                >
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <form onSubmit={this.login}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="usuario"
                                                    label={t("login.usuario")}
                                                    name="usuario"
                                                    value={this.state.usuario}
                                                    onChange={this.handleChange}
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="contrasenia"
                                                    label={t("login.contrasenia")}
                                                    name="contrasenia"
                                                    type="password"
                                                    value={this.state.contrasenia}
                                                    onChange={this.handleChange}
                                                />
                                                <Reaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onVerify={this.onCaptchaVerify} onRender={this.onCaptchaRender} onExpire={this.onCaptchaExpire} className="mt-3 mb-2 d-flex align-items-center justify-content-center"/>
                                                {
                                                    !this.state.isCaptchaRendered ? <CircularProgress color="primary" className="d-block mx-auto"/> : ""
                                                }
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className="mt-3"
                                                    size="large"
                                                >
                                                    {t("login.btn")}
                                                </Button>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </div>
                            <Dialog open={this.state.submittedWithoutCaptcha} onClose={this.reinitDialogCaptcha} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{t("captcha.sin-resolver")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {t("captcha.sin-resolver-ayuda")}
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
		);
    }
}

export default Login;