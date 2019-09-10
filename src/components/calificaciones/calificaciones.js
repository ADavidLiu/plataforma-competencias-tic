import React, { Component } from "react";

import { T } from "react-polyglot-hooks";
import sortBy from "sort-by";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';

import Search from "@material-ui/icons/Search";
import OpenInNew from "@material-ui/icons/OpenInNew";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

class Calificaciones extends Component {
    constructor() {
        super();

        this.state = {
            divisionMostrada: 0,
            categoriaDivisionMostrada: "practicas",
            rowsPerPage: 10,
            page: 0,
            searchTerm: "",
            isLoading: true,
            isRevisando: false,
            isFiltering: false,
            headCells: {
                practicas: ["ID", "nombre", "calificacion", "calificaciones.fecha-asignacion", "calificaciones.fecha-calificacion", "configuracion.label-version", "revisar"],
                preentrevistas: ["ID", "nombre", "calificaciones.fecha-asignacion", "calificaciones.fecha-calificacion", "configuracion.label-version", "revisar"],
                entrevistas: ["ID", "nombre", "calificaciones.fecha-asignacion", "calificaciones.fecha-calificacion", "configuracion.label-version", "revisar"]
            },
            filtros: {
                categoria: "calificaciones.fecha-calificacion",
                categoriaFormatted: "fechaCalificacion",
                orden: "descendente"
            },
            practicas: [
                {
                    id: "2",
                    nombre: "Jane Doe",
                    calificacion: 3,
                    fechaAsignacion: "2019-07-01",
                    fechaCalificacion: "2019-07-10",
                    version: "1.0.1"
                },
                {
                    id: "1",
                    nombre: "John Doe",
                    calificacion: 2,
                    fechaAsignacion: "2018-06-20",
                    fechaCalificacion: "2018-07-08",
                    version: "1.0.0"
                }
            ],
            preentrevistas: [
                {
                    id: "2",
                    nombre: "John Doe",
                    fechaAsignacion: "2019-09-19",
                    fechaCalificacion: "2019-10-31",
                    version: "1.0.1"
                },
                {
                    id: "1",
                    nombre: "Jane Doe",
                    fechaAsignacion: "2018-02-13",
                    fechaCalificacion: "2018-02-28",
                    version: "1.0.0"
                }
            ],
            entrevistas: [
                {
                    id: "1",
                    nombre: "John Doe",
                    fechaAsignacion: "2019-03-14",
                    fechaCalificacion: "2019-04-14",
                    version: "1.0.1"
                }
            ],
            elementosMostrados: []
        }
    }

    componentDidMount = () => {
        this.setState({
            isLoading: false,
            elementosMostrados: [...this.state.practicas]
        });
    }

    handleTabChange = (e, newIndex) => {
        let newCategory = "";

        switch (newIndex) {
            case 0:
                newCategory = "practicas";
                break;
            case 1:
                newCategory = "preentrevistas";
                break;
            case 2:
                newCategory = "entrevistas";
                break;
        }

        this.setState({
            divisionMostrada: newIndex,
            categoriaDivisionMostrada: newCategory,
            searchTerm: "",
            isLoading: true,
            elementosMostrados: [...this.state[newCategory]],
            filtros: {
                categoria: "calificaciones.fecha-calificacion",
                categoriaFormatted: "fechaCalificacion",
                orden: "descendente"
            }
        });

        // Aquí cargar la nueva información del backend
        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 500);
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
                    case "calificacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "calificacion",
                                categoriaFormatted: "calificacion"
                            }
                        });
                        break;
                    case "calificaciones.fecha-asignacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "calificaciones.fecha-asignacion",
                                categoriaFormatted: "fechaAsignacion"
                            }
                        });
                        break;
                    case "calificaciones.fecha-calificacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "calificaciones.fecha-calificacion",
                                categoriaFormatted: "fechaCalificacion"
                            }
                        });
                        break;
                    case "configuracion.label-version":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "configuracion.label-version",
                                categoriaFormatted: "version"
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
        const copiaElementos = [...this.state[this.state.categoriaDivisionMostrada]];
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
            const matchedArrays = [];

            this.state[this.state.categoriaDivisionMostrada].forEach(elem => {
                Object.values(elem).forEach(val => {
                    rawValuesToSearchFrom.push(val);
                });
            });

            for (let i = 0; i < rawValuesToSearchFrom.length; i += 6) {
                arraysValuesToSearchFrom.push(rawValuesToSearchFrom.slice(i, i + 6));
            }
            arraysValuesToSearchFrom.forEach(array => {
                array.forEach(val => {
                    if (val.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                        matchedArrays.push(array);
                    }
                });
            });

            matchedArrays.sort(sortBy("-fechaCalificacion"));

            this.setState({
                elementosMostrados: matchedArrays,
                filtros: {
                    categoria: "calificaciones.fecha-calificacion",
                    orden: "descendente"
                }
            });
        }
    }

    openFormRevision = () => {
        this.setState({
            isRevisando: true
        });
    }

    handleClose = () => {
        this.setState({
            isRevisando: false
        });
    }

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h5"><T phrase="calificaciones.titulo"/></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Tabs
                            variant="scrollable"
                            indicatorColor="primary"
                            textColor="primary"
                            value={this.state.divisionMostrada}
                            onChange={this.handleTabChange}
                        >
                            <Tab label={<T phrase="procesoPaso.2"/>}/>
                            <Tab label={<T phrase="procesoPaso.3-plural"/>}/>
                            <Tab label={<T phrase="procesoPaso.4-plural"/>}/>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} className="pb-0">
                    <TextField
                        placeholder="Buscar..."
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
                                this.state.headCells[this.state.categoriaDivisionMostrada].map((cellLabel, i) => {
                                    if (i < this.state.headCells[this.state.categoriaDivisionMostrada].length - 1) {
                                        return <MenuItem value={cellLabel} key={i}><T phrase={cellLabel}/></MenuItem>
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
                            <MenuItem value="descendente"><T phrase="filtros.descendente"/></MenuItem>
                            <MenuItem value="ascendente"><T phrase="filtros.ascendente"/></MenuItem>
                        </Select>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {
                        this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto" /> : (
                            <Paper className="scrolling-table-outer">
                                <div className="scrolling-table-wrapper">
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    this.state.headCells[this.state.categoriaDivisionMostrada].map((cellLabel, i) => (
                                                        <TableCell key={i}><T phrase={cellLabel}/></TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        {
                                            this.state.isFiltering ? (
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell colSpan={Object.keys(this.state[this.state.categoriaDivisionMostrada][0]).length + 1}>
                                                            <CircularProgress color="primary" className="d-block mx-auto"/>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            ) : (
                                                <TableBody>
                                                    {
                                                        this.state.elementosMostrados.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                                            const values = Object.values(elemento);
                                                            return (
                                                                <TableRow key={i}>
                                                                    {
                                                                        values.map((val, j) => <TableCell key={j}>{val}</TableCell>)
                                                                    }
                                                                    <TableCell>
                                                                        <Link to={{
                                                                            pathname: `/${this.state.categoriaDivisionMostrada.slice(0, -1)}-revision`,
                                                                            state: {
                                                                                tipoUsuario: "EVALUADOR"
                                                                            }
                                                                        }}>
                                                                            <OpenInNew onClick={this.openFormRevision} color="primary" fontSize="small" style={{cursor: "pointer"}}/>
                                                                        </Link>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })
                                                    }
                                                </TableBody>
                                            )
                                        }
                                    </Table>
                                    <TablePagination
                                        labelDisplayedRows={({from, to, count}) => {
                                            return `${from}-${to} / ${count}`;
                                        }}
                                        labelRowsPerPage={<T phrase="filasPorPagina"/>}
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
                        )
                    }
                </Grid>
            </Grid>
        );
    }
}

export default Calificaciones;