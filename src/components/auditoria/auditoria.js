import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import AsyncSelect from "react-select/async";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import ListaUsuarios from "../listaUsuarios/listaUsuarios";

class Auditoria extends Component {
    constructor() {
        super();

        this.state = {
            usuarioSeleccionado: "",
            searchTerm: "",
            filtros: {
                categoria: "fechaRealizacion",
                orden: "descendente"
            },
            isSelected: false
        }

        this.items = [
            {
                value: "lorem",
                label: "Lorem"
            },
            {
                value: "ipsum",
                label: "Ipsum"
            },
            {
                value: "dolor",
                label: "Dolor"
            },
            {
                value: "sit",
                label: "Sit"
            },
            {
                value: "amet",
                label: "Amet"
            }
        ]
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

    handleBusquedaUsuario = newValue => {
        this.setState({
            usuarioSeleccionado: newValue
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
                                            onInputChange={this.handleBusquedaUsuario}
                                            loadingMessage={() => t("cargando")}
                                            noOptionsMessage={() => t("no-resultados")}
                                            placeholder={t("escribir")}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListaUsuarios tipoUsuariosMotrados="TODOS" userType="TODOS" />
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