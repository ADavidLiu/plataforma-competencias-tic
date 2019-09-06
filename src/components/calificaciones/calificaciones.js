import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Calificaciones extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h5"><T phrase="calificaciones.titulo"/></Typography>
                </Grid>
            </Grid>
        );
    }
}

export default Calificaciones;