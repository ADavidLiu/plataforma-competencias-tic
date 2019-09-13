import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import CircularProgress from "@material-ui/core/CircularProgress";
import sortBy from "sort-by";

import Edit from "@material-ui/icons/Edit";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Link from "@material-ui/icons/Link";
import OpenInNew from "@material-ui/icons/OpenInNew";
import Search from "@material-ui/icons/Search";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

class Territorios extends Component{
    constructor() {
        super();

        this.state = {
            divisionMostrada: 2,
            isLoading: false,
            isFiltering: false,
            territoriosActuales: [],
            institucionesActuales: [],
            headCells: ["nombre", "territorios.lista-padre", "territorios.lista-fecha-creacion", "territorios.lista-acciones"],
            crearForm: {
                nombre: "",
                padre: "",
                isFilled: false
            },
            asignarForm: {
                nombreInstitucionEstablecimiento: "",
                nombreTerritorio: "",
                isFilled: false
            },
            filtros: {
                categoria: "territorios.lista-fecha-creacion",
                categoriaFormatted: "fechaCreacion",
                orden: "descendente"
            },
            elementosMostrados: [],
            page: 0,
            rowsPerPage: 10,
            searchTerm: ""
        }
    }

    componentDidMount = () => {
        const dataCargada = {
            territorios: [
                {
                    nombre: "No es subdivisión",
                    padre: "",
                    fechaCreacion: "2019-06-29"
                },
                {
                    nombre: "Veniam labore minim",
                    padre: "Culpa aliquip minim",
                    fechaCreacion: "2019-09-13"
                },
                {
                    nombre: "dolore mollit",
                    padre: "",
                    fechaCreacion: "2019-02-14"
                },
                {
                    nombre: "aliquip",
                    padre: "Do irure eiusmod",
                    fechaCreacion: "2019-08-14"
                },
                {
                    nombre: "ad ad ex",
                    padre: "",
                    fechaCreacion: "2019-01-31"
                },
                {
                    nombre: "mollit occaecat",
                    padre: "",
                    fechaCreacion: "2018-10-10"
                },
                {
                    nombre: "tempor do in",
                    padre: "",
                    fechaCreacion: "2019-05-24"
                }
            ],
            instituciones: ["Adipiscing", "Elit", "Occaecat", "dolore cillum", "anim id Lorem", "amet tempor laboris",  "pariatur officia occaecat"]
        };

        this.setState({
            territoriosActuales: dataCargada.territorios,
            institucionesActuales: dataCargada.instituciones,
            elementosMostrados: dataCargada.territorios
        });
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue,
            isLoading: true,
            crearForm: {
                nombre: "",
                padre: "",
                isFilled: false
            },
            asignarForm: {
                nombreTerritorio: "",
                nombreInstitucionEstablecimiento: "",
                isFilled: false
            }
        });

        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });

            clearTimeout(timeout);
        }, 500);
    }

    handleTerritorioSelect = e => {
        console.log(e.target.name, e.target.value);
    }

    handleCrearFormChange = e => {
        this.setState({
            crearForm: {
                ...this.state.crearForm,
                [e.target.name]: e.target.value
            }
        });

        const timeout = setTimeout(() => {
            let newState = false;
            if (this.state.crearForm.nombre !== "" && this.state.crearForm.padre !== "") {
                newState = true;
            }

            this.setState({
                crearForm: {
                    ...this.state.crearForm,
                    isFilled: newState
                }
            });

            clearTimeout(timeout);
        }, 250);
    }

    handleAsignarFormChange = e => {
        this.setState({
            asignarForm: {
                ...this.state.asignarForm,
                [e.target.name]: e.target.value
            }
        });

        const timeout = setTimeout(() => {
            let newState = false;
            if (this.state.asignarForm.nombreInstitucionEstablecimiento !== "" && this.state.asignarForm.nombreTerritorio !== "") {
                newState = true;
            }

            this.setState({
                asignarForm: {
                    ...this.state.asignarForm,
                    isFilled: newState
                }
            });

            clearTimeout(timeout);
        }, 250);
    }

    crearTerritorio = () => {
        this.setState({
            crearForm: {
                nombre: "",
                padre: "",
                isFilled: false
            }
        });
    }

    asignarTerritorio = () => {
        this.setState({
            asignarForm: {
                nombreInstitucionEstablecimiento: "",
                nombreTerritorio: "",
                isFilled: false
            }
        });
    }

    handleFiltroChange = e => {
        /* const copiaElementos = [...this.state[this.state.categoriaDivisionMostrada]]; */
        const copiaElementos = [...this.state.elementosMostrados];

        this.setState({
            isFiltering: true
        });

        switch (e.target.name) {
            case "categoria":
                switch (e.target.value) {
                    case "nombre":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "nombre",
                                categoriaFormatted: "nombre"
                            }
                        });
                        break;
                    case "territorios.lista-padre":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "territorios.lista-padre",
                                categoriaFormatted: "padre"
                            }
                        });
                        break;
                    case "territorios.lista-fecha-creacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "territorios.lista-fecha-creacion",
                                categoriaFormatted: "fechaCreacion"
                            }
                        });
                        break;
                    default:
                        break;
                }
                break;
            case "orden":
                switch (e.target.value) {
                    case "descendente":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                orden: "descendente"
                            }
                        });
                        break;
                    case "ascendente":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                orden: "ascendente"
                            }
                        });
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        const timeout = setTimeout(() => {
            const dash = this.state.filtros.orden === "descendente" ? "-" : "";
            copiaElementos.sort(sortBy(`${dash}${this.state.filtros.categoriaFormatted}`));

            this.setState({
                elementosMostrados: copiaElementos,
                isFiltering: false
            });

            clearTimeout(timeout);
        }, 1000);
    }

    handleSearch = e => {
        const copiaElementos = [...this.state.territoriosActuales];
        const searchTerm = e.target.value;

        this.setState({
            searchTerm: searchTerm
        });

        if (e.target.value === "" || e.target.value === null || e.target.value === undefined) {
            this.setState({
                elementosMostrados: copiaElementos
            });
        } else {
            const rawValuesToSearchFrom = [];
            const arraysValuesToSearchFrom = [];
            let matchedArrays = [];

            this.state.territoriosActuales.forEach(elem => {
                Object.values(elem).forEach(val => {
                    rawValuesToSearchFrom.push(val);
                });
            });

            for (let i = 0; i < rawValuesToSearchFrom.length; i += 3) {
                arraysValuesToSearchFrom.push(rawValuesToSearchFrom.slice(i, i + 3));
            }
            arraysValuesToSearchFrom.forEach(array => {
                array.forEach(val => {
                    if (val.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                        matchedArrays.push(array);
                    }
                });
            });

            matchedArrays.sort(sortBy("-fechaCreacion"));
            matchedArrays = [...new Set(matchedArrays)];

            console.log(matchedArrays);

            this.setState({
                page: 0,
                elementosMostrados: matchedArrays,
                filtros: {
                    categoria: "territorios.lista-fecha-creacion",
                    categoriaFormatted: "fechaCreacion",
                    orden: "descendente"
                }
            });
        }
    }

    handleChangeRowsPerPage = e => {
        this.setState({
            rowsPerPage: e.target.value,
            page: 0
        });
    }

    handleChangePage = (e, newPage) => {
        this.setState({
            page: newPage
        });
    }

    render() {
        let divisionMostrada;
        switch (this.state.divisionMostrada) {
            case 0:
                divisionMostrada = (
                    <Translation>
                        {
                            t => (
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Paper className="p-4">
                                            <Grid container spacing={5}>
                                                <Grid item xs={12} md={6}>
                                                    <div className="text-center">
                                                        <Typography className="mb-3" variant="body1"><strong>{t("territorios.nombre")}</strong></Typography>
                                                    </div>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="none"
                                                        required
                                                        fullWidth
                                                        name="nombre"
                                                        value={this.state.crearForm.nombre}
                                                        onChange={this.handleCrearFormChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <div className="text-center">
                                                        <Typography className="mb-3" variant="body1"><strong>{t("territorios.padre")}</strong></Typography>
                                                    </div>
                                                    <Select
                                                        value={this.state.crearForm.padre}
                                                        onChange={this.handleCrearFormChange}
                                                        variant="filled"
                                                        input={<OutlinedInput fullWidth required name="padre"/>}
                                                    >
                                                        {
                                                            this.state.territoriosActuales.map((territorio, i) => {
                                                                return (
                                                                    <MenuItem key={i} value={territorio.nombre}>{territorio.nombre}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        <div className="text-right mt-4">
                                            <Button disabled={!this.state.crearForm.isFilled} onClick={this.crearTerritorio} color="primary" variant="contained" size="large">{t("territorios.crear")}</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case 1:
                divisionMostrada = (
                    <Translation>
                        {
                            t => (
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Paper className="p-4">
                                            <Grid container spacing={5}>
                                                <Grid item xs={12} md={6}>
                                                    <div className="text-center">
                                                        <Typography className="mb-3" variant="body1"><strong>{t("territorios.ie-ee")}</strong></Typography>
                                                    </div>
                                                    <Select
                                                        value={this.state.asignarForm.nombreInstitucionEstablecimiento}
                                                        onChange={this.handleAsignarFormChange}
                                                        variant="filled"
                                                        input={<OutlinedInput fullWidth required name="nombreInstitucionEstablecimiento"/>}
                                                    >
                                                        {
                                                            this.state.institucionesActuales.map((ie, i) => {
                                                                return (
                                                                    <MenuItem key={i} value={ie}>{ie}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <div className="text-center">
                                                        <Typography className="mb-3" variant="body1"><strong>{t("territorios.perteneciente")}</strong></Typography>
                                                    </div>
                                                    <Select
                                                        value={this.state.asignarForm.nombreTerritorio}
                                                        onChange={this.handleAsignarFormChange}
                                                        variant="filled"
                                                        input={<OutlinedInput fullWidth required name="nombreTerritorio"/>}
                                                    >
                                                        {
                                                            this.state.territoriosActuales.map((territorio, i) => {
                                                                return (
                                                                    <MenuItem key={i} value={territorio.nombre}>{territorio.nombre}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        <div className="text-right mt-4">
                                            <Button disabled={!this.state.asignarForm.isFilled} onClick={this.asignarTerritorio} color="primary" variant="contained" size="large">{t("territorios.asignar")}</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case 2:
                divisionMostrada = (
                    <Translation>
                        {
                            t => (
                                <Grid container spacing={5}>
                                    <Grid item xs={12} md={6} className="pb-0">
                                        <TextField
                                            placeholder={t("buscar")}
                                            fullWidth
                                            variant="outlined"
                                            onChange={this.handleSearch}
                                            value={this.state.searchTerm}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search color="primary" />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} className="pb-0">
                                        <div className="d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                                            <Select
                                                value={this.state.filtros.categoria}
                                                onChange={this.handleFiltroChange}
                                                input={<OutlinedInput required name="categoria"/>}
                                                className="w-50"
                                            >
                                                {
                                                    this.state.headCells.map((cellLabel, i) => {
                                                        if (i < this.state.headCells.length - 1) {
                                                            return <MenuItem value={cellLabel} key={i}>{t(cellLabel)}</MenuItem>
                                                        }
                                                    })
                                                }
                                            </Select>
                                            <Select
                                                value={this.state.filtros.orden}
                                                onChange={this.handleFiltroChange}
                                                input={<OutlinedInput required name="orden"/>}
                                                className="ml-3 w-50"
                                            >
                                                <MenuItem value="descendente">{t("filtros.descendente")}</MenuItem>
                                                <MenuItem value="ascendente">{t("filtros.ascendente")}</MenuItem>
                                            </Select>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className="scrolling-table-outer">
                                            <div className="scrolling-table-wrapper">
                                                <Table className="scrolling-table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>{t("nombre")}</TableCell>
                                                            <TableCell>{t("territorios.lista-padre")}</TableCell>
                                                            <TableCell>{t("territorios.lista-fecha-creacion")}</TableCell>
                                                            <TableCell>{t("territorios.lista-acciones")}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    {
                                                        this.state.territoriosActuales.length > 0 ? (
                                                            <TableBody>
                                                                {
                                                                    this.state.isFiltering ? (
                                                                        <TableRow>
                                                                            <TableCell colSpan={4}>
                                                                                <CircularProgress color="primary" className="d-block mx-auto"/>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ) : (
                                                                        this.state.elementosMostrados.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                                                            const values = Object.values(elemento);
                                                                            return (
                                                                                <TableRow key={i}>
                                                                                    {
                                                                                        values.map((val, j) => <TableCell key={j}>{val}</TableCell>)
                                                                                    }
                                                                                    <TableCell>

                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            );
                                                                        })
                                                                    )
                                                                }
                                                            </TableBody>
                                                        ) : (
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell colSpan="4" align="center">{t("usuarios.no-datos")}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        )
                                                    }
                                                </Table>
                                                <TablePagination
                                                    labelDisplayedRows={({from, to, count}) => {
                                                        return `${from}-${to} / ${count}`;
                                                    }}
                                                    labelRowsPerPage={t("filasPorPagina")}
                                                    rowsPerPageOptions={[10, 25, 100]}
                                                    component="div"
                                                    count={this.state.elementosMostrados.length}
                                                    rowsPerPage={this.state.rowsPerPage}
                                                    page={this.state.page}
                                                    onChangePage={this.handleChangePage}
                                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                />
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("territorios.titulo")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <Paper>
                                        <Tabs
                                            indicatorColor="primary"
                                            textColor="primary"
                                            value={this.state.divisionMostrada}
                                            onChange={this.handleTabChange}
                                        >
                                            <Tab label={t("territorios.crear")}/>
                                            <Tab label={t("territorios.asignar")}/>
                                            <Tab label={t("territorios.administrar")}/>
                                        </Tabs>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        this.state.isLoading ? (
                                            <CircularProgress color="primary" className="d-block mx-auto"/>
                                        ) : divisionMostrada
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

export default Territorios;