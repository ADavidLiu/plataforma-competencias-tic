import React from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Ayuda = () => {
    return (
        <Translation>
            {
                t => (
                    <React.Fragment>
                        <Helmet>
                            <title>{t("titulo.ayuda")} | {t("titulo.no-login")}</title>
                        </Helmet>
                        <Grid container spacing={5} justify="center">
                            <Grid item xs={12} md={6} lg={4} className="my-5 py-5 text-center">
                                <Typography variant="h4" className="mb-4">{t("ayuda.title")}</Typography>
                                <Typography className="mb-5" variant="body1">{t("ayuda.text")}</Typography>
                                <a href="https://portalrequerimientos.javerianacali.edu.co/PortalRequerimientos/login.xhtml" target="_blank">
                                    <Button color="primary" variant="contained" size="large">{t("ayuda.btn-label")}</Button>
                                </a>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )
            }
        </Translation>
    );
}

export default Ayuda;