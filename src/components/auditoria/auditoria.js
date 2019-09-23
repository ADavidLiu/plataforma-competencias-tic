import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import AsyncSelect from "react-select/async";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import ListaUsuarios from "../listaUsuarios/listaUsuarios";

class Auditoria extends Component {
    constructor() {
        super();

        this.items = [
            {
                value: "John Doe",
                label: "John Doe"
            },
            {
                value: "Jane Doe",
                label: "Jane Doe"
            }
        ];

        this.state = {
            usuarioSeleccionado: "",
            searchTerm: "",
            filtros: {
                categoria: "fechaRealizacion",
                orden: "descendente"
            },
            didSelectUser: false
        };
    }

    filterOptions = inputValue => {
        return this.items.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase()));
    }

    loadOptions = (inputValue, callback) => {
        const timeout = setTimeout(() => {
            callback(this.filterOptions(inputValue));
            clearTimeout(timeout);
        }, 500);
    }

    handleSeleccionUsuario = selected => {
        this.setState({
            usuarioSeleccionado: selected.value,
            didSelectUser: true
        });
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("auditoria.titulo-alt")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{t("auditoria.titulo")}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className="p-4">
                                        <Typography variant="body1" className="mb-3"><strong>{t("auditoria.buscar")}</strong></Typography>
                                        <AsyncSelect
                                            classNamePrefix="dropdown"
                                            cacheOptions
                                            loadOptions={this.loadOptions}
                                            defaultOptions
                                            onChange={this.handleSeleccionUsuario}
                                            loadingMessage={() => t("cargando")}
                                            noOptionsMessage={() => t("no-resultados")}
                                            placeholder={t("escribir")}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        this.state.didSelectUser ? <ListaUsuarios tipoUsuariosMostrados="auditoria" userType="AUDITORIA" buscarNombre={this.state.usuarioSeleccionado}/> : ""
                                    }
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Auditoria;