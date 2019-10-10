import React, { Component } from "react";

import { Translation } from "react-i18next";
import Helmet from "react-helmet";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Cursos extends Component {
    constructor() {
        super();

        this.state = {
            cursos: [],
            isLoading: true
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

    render() {
        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("titulo.cursos")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={3} justify="center">
                                <Grid item xs={12}>
                                    <Typography variant="h5">{t("titulo.cursos")}</Typography>
                                    <hr/>
                                    
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Cursos;