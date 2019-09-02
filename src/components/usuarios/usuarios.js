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
            divisionMostrada: 1
        }
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue
        });
    }

    render() {
        let tabs;
        switch (this.props.userType) {
            case "GOBIERNO":
                tabs = (
                    <Tabs
						indicatorColor="primary"
						textColor="primary"
						value={this.state.divisionMostrada}
						onChange={this.handleTabChange}
					>
                        <Tab label={<T phrase="usuarios.label-registro-instituciones"/>}/>
					    <Tab label={<T phrase="usuarios.label-usuarios-instituciones"/>}/> 
					</Tabs>
                );
                break;
            case "INSTITUCION":
                tabs = (
                    <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            value={this.state.divisionMostrada}
                            onChange={this.handleTabChange}
                        >
                        <Tab label={<T phrase="usuarios.label-registro-establecimientos"/>}/>
                            <Tab label={<T phrase="usuarios.label-usuarios-establecimientos"/>}/> 
                        </Tabs>
                );
                break;
            case "ESTABLECIMIENTO":
                tabs = (
                    <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            value={this.state.divisionMostrada}
                            onChange={this.handleTabChange}
                        >
                        <Tab label={<T phrase="usuarios.label-registro-docentes"/>}/>
                            <Tab label={<T phrase="usuarios.label-usuarios-docentes"/>}/> 
                        </Tabs>
                );
                break;
            default:
                break;
        }

        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Paper>
                        { tabs }
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
                                    <ListaUsuarios userType={this.props.userType} />
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