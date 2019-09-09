import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import OpenInNew from "@material-ui/icons/OpenInNew";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Calificaciones extends Component {
    constructor() {
        super();

        this.state = {
            divisionMostrada: 0,
            practicas: [
                {
                    nombre: "John Doe",
                    calificacion: 2
                }
            ]
        }
    }

    handleTabChange = (e, newIndex) => {
        this.setState({
            divisionMostrada: newIndex
        });
    }

    render() {
        let selectedTab;
        switch (this.state.divisionMostrada) {
            case 0:
                selectedTab = (
                    ""
                );
                break;
            case 1:
                
                break;
            case 2:

                break;
            default:
                break;
        }

        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h5"><T phrase="calificaciones.titulo"/></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            value={this.state.divisionMostrada}
                            onChange={this.handleTabChange}
                        >
                            <Tab label={<T phrase="procesoPaso.2"/>}/>
                            <Tab label={<T phrase="procesoPaso.3"/>}/>
                            <Tab label={<T phrase="procesoPaso.4"/>}/>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    { selectedTab }
                </Grid>
            </Grid>
        );
    }
}

export default Calificaciones;