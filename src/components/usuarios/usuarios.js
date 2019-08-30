import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ListaUsuarios from "../listaUsuarios/listaUsuarios";
import AgregarUsuarios from "../agregarUsuarios/agregarUsuarios";

class Usuarios extends Component {
    constructor() {
        super();

        this.state = {
            divisionMostrada: 0,
            didUsuariosLoad: false
        }
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue
        });
    }

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Paper>
                        <Tabs
							indicatorColor="primary"
							textColor="primary"
							value={this.state.divisionMostrada}
							onChange={this.handleTabChange}
						>
                            <Tab label={<T phrase="usuarios.label-registro"/>}/>
							<Tab label={<T phrase="usuarios.label-usuarios"/>}/>
						</Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {
                        this.state.divisionMostrada === 0 ? (
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <AgregarUsuarios userType={this.props.userType} />
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <ListaUsuarios />
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        );
    }
}

export default Usuarios;