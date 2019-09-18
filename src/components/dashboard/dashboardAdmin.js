import React, { Component } from "react";

import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class DashboardAdmin extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default DashboardAdmin;