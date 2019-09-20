import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Instrumento extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("instrumento.titulo-alt")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{t("instrumento.titulo")}</Typography>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Instrumento;