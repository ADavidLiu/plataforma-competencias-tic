import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar, Doughnut } from "react-chartjs-2";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class DashboardGobierno extends Component {
    constructor() {
        super();

        /* Sólo hay 3 divisiones. 0 es el nivel más alto, y 3 es el más bajo. */
        this.state = {
            divisionesInfo: [],
            divisionMostrada: 0,
            data: {}
        }
    }

    componentDidMount = () => {
        /* Conectarse al backend para traer la información general de las divisiones */
        this.setState({

        });
    }

    cargarDatosDivision = () => {

    }

    handleTabChange = e => {
        console.log(e.target.value);
    }

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        );
    }
}

export default DashboardGobierno;