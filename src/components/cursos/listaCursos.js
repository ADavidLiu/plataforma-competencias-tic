import React, { Component } from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import cursos from "../../models/cursos";
import ListaUsuarios from "../listaUsuarios/listaUsuarios";

class ListaCursos extends Component {
    constructor() {
        super();

        this.state = {
            cursos: []
        }
    }

    componentDidMount = () => {
        const cursosCargados = cursos;

        this.setState({
            cursos: cursosCargados
        });
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <ListaUsuarios userType="CURSOS" tipoUsuariosMostrados="cursos"/>
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default ListaCursos;