import React, { Component } from "react";

import { Translation } from "react-i18next";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

import Search from "@material-ui/icons/Search";
import Warning from "@material-ui/icons/Warning";

import Perfil from "./perfil";

class VisorPerfiles extends Component {
    constructor() {
        super();

        this.state = {
            perfiles: [],
            perfilesDivididos: [],
            perfilesMostrados: [],
            numDivisionesPerfiles: 0,
            currentDivisionPerfiles: 0,
            hasPreviousPerfiles: false,
            hasNextPerfiles: false,
            searchTerm: ""
        }
    }

    handleSearch = e => {
        const searchTerm = e.target.value;

        this.setState({
            searchTerm: searchTerm
        });

        if (e.target.value === "" || e.target.value === null || e.target.value === undefined) {
            this.calcularNumDivisionesPerfiles(this.state.perfiles);
            this.dividirPerfiles(this.state.perfiles);
        } else {
            const encontrados = this.state.perfiles.filter(perfil => perfil.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
            this.calcularNumDivisionesPerfiles(encontrados);
            this.dividirPerfiles(encontrados);
        }
    }

    componentDidMount = () => {
        this.cargarDatos();
    }

    cargarDatos = () => {
        const perfilesCargados = this.props.perfiles;

        this.setState({
            perfiles: [...perfilesCargados],
            perfilesDivididos: []
        });

        this.calcularNumDivisionesPerfiles(this.props.perfiles);
        this.dividirPerfiles(this.props.perfiles);
    }

    dividirPerfiles = perfiles => {
        const copiaPerfiles = [...perfiles];
        const numDivisiones = Math.ceil(perfiles.length/this.props.numPorPagina);
        let backupArray = [];
        this.state.perfilesDivididos = [];

        for (let i = 0; i < numDivisiones; i++) {
            const divisionArray = copiaPerfiles.slice(0, this.props.numPorPagina);
            this.state.perfilesDivididos.push(divisionArray);
            backupArray.push(divisionArray);
            copiaPerfiles.splice(0, this.props.numPorPagina);
        }

        if (this.state.perfilesDivididos.length === 1) {
            this.setState({
                perfilesMostrados: this.state.perfilesDivididos[0],
                perfilesDivididos: []
            });
        } else {
            this.setState({
                perfilesMostrados: this.state.perfilesDivididos[0],
                perfilesDivididos: backupArray
            });
        }

        backupArray = [];
    }

    calcularNumDivisionesPerfiles = perfiles => {
        const numDivisiones = Math.ceil(perfiles.length/this.props.numPorPagina);
        let hasNext = false;
        if (numDivisiones > 1) {
            hasNext = true;
        }
        
        this.setState({
            numDivisionesPerfiles: numDivisiones,
            hasNextPerfiles: hasNext
        });
    }

    checkCurrentDivisionPerfiles = () => {
        if (this.state.currentDivisionPerfiles > 0) {
            this.setState({
                hasPreviousPerfiles: true
            });
        } else {
            this.setState({
                hasPreviousPerfiles: false
            });
        }
        if (this.state.currentDivisionPerfiles === this.state.numDivisionesPerfiles - 1) {
            this.setState({
                hasNextPerfiles: false
            });
        } else {
            this.setState({
                hasNextPerfiles: true
            });
        }
    }

    cargarAnterioresPerfiles = () => {
        if (this.state.currentDivisionPerfiles > 0) {
            this.setState({
                perfilesMostrados: this.state.perfilesDivididos[this.state.currentDivisionPerfiles -= 1],
            });
        }

        this.checkCurrentDivisionPerfiles();
    }
    
    cargarSiguientesPerfiles = () => {
        if (this.state.currentDivisionPerfiles < this.state.numDivisionesPerfiles - 1) {
            this.setState({
                perfilesMostrados: this.state.perfilesDivididos[this.state.currentDivisionPerfiles += 1]
            });
        }

        this.checkCurrentDivisionPerfiles();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.perfiles !== this.props.perfiles) {
            this.cargarDatos();

            if (this.state.perfilesDivididos.length === 1) {
                this.setState({
                    hasPreviousPerfiles: false,
                    hasNextPerfiles: false,
                    perfilesDivididos: []
                });
            }
        }
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <TextField
                                className="mb-4"
                                placeholder={t("buscar")}
                                fullWidth
                                variant="outlined"
                                onChange={this.handleSearch}
                                value={this.state.searchTerm}
                                inputProps={{
                                    "aria-label": `${t("aria.buscar")}`
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Search color="primary" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {
                                this.state.perfilesMostrados !== undefined ? this.state.perfilesMostrados.map(perfil => (
                                    <Perfil
                                        key={perfil.perfilID}
                                        tipo={this.props.tipo}
                                        perfil={perfil}
                                        userID={perfil.perfilID}
                                    />
                                )) : (
                                    <div className="d-flex align-items-center justify-content-center my-5">
                                        <Warning className="mr-2" />
                                        <Typography variant="body1">{t("visorPerfiles.no-resultados")}</Typography>
                                    </div>
                                )
                            }
                            <Grid container spacing={2}>
                                <Grid item xs={4} md={6}>
                                    {this.state.perfiles.length > this.props.numPorPagina ? (
                                        <Link style={{
                                            textDecoration: "none"
                                        }} to={{
                                            pathname: "/usuarios",
                                            state: {
                                                verCategoriaInicial: this.props.tipo
                                            }
                                        }}>
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                color="primary"
                                                className="mt-3"
                                                size="medium"
                                            >
                                                {t("visorPerfiles.todos")}
                                            </Button>
                                        </Link>
                                    ) : (
                                        ""
                                    )}
                                </Grid>
                                <Grid item xs={8} md={6} className="text-right">
                                    {this.state.hasPreviousPerfiles ? (
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            className="mt-3"
                                            size="medium"
                                            onClick={this.cargarAnterioresPerfiles}
                                        >
                                            {t("visorPerfiles.anteriores")}
                                        </Button>
                                    ) : ""}
                                    {this.state.hasNextPerfiles ? (
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            className="mt-3 ml-3"
                                            size="medium"
                                            onClick={this.cargarSiguientesPerfiles}
                                        >
                                            {t("visorPerfiles.siguientes")}
                                        </Button>
                                    ) : ""}
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Translation>
		);   
    }
}

export default VisorPerfiles;