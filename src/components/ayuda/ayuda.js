import React from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Ayuda = (props) => {
    function regresar() {
        props.history.goBack();
    }

    return (
        <Translation>
            {
                t => (
                    <React.Fragment>
                        <Helmet>
                            <title>{t("titulo.ayuda")} | {t("titulo.nombre-plataforma")}</title>
                        </Helmet>
                        <Grid container spacing={5} justify="center">
                            <Grid item xs={12} sm={8} lg={6} className="my-5 py-5 text-center">
                                <Typography variant="h4" className="mb-4">{t("ayuda.title")}</Typography>
                                <Typography className="mb-5" variant="body1">{t("ayuda.text")}</Typography>
                                <div className="d-md-flex align-items-center justify-content-center">
                                    <a rel="noopener noreferrer" style={{"textDecoration": "none"}} href="https://portalrequerimientos.javerianacali.edu.co/PortalRequerimientos/login.xhtml" target="_blank">
                                        <Button color="primary" variant="contained" size="large">{t("ayuda.btn-label")}</Button>
                                    </a>
                                    <Typography className="my-3 my-md-0 mx-md-3" variant="body1">{t("o")}</Typography>
                                    <Button onClick={regresar} color="primary" variant="outlined" size="large">{t("ayuda.regresar")}</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            }
        </Translation>
    );
}

export default Ayuda;