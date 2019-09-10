import React, { Component } from "react";

import { T } from "react-polyglot-hooks";
import sortBy from "sort-by";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import FormControl from "@material-ui/core/FormControl";
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
            headCells: {
                practicas: ["ID", "nombre", "calificacion", "calificaciones.fecha-asignacion", "calificaciones.fecha-calificacion", "configuracion.label-version"],
                preentrevistas: [],
                entrevistas: []
            },
            filtros: {
                categoria: "calificaciones.fecha-calificacion",
                orden: "descendente"
            },
            practicas: [
                {
                    id: "2",
                    nombre: "Jane Doe",
                    calificacion: 3,
                    fechaAsignacion: "01-07-2019",
                    fechaCalificacion: "10-07-2019",
                    version: "1.0.1"
                },
                {
                    id: "1",
                    nombre: "John Doe",
                    calificacion: 2,
                    fechaAsignacion: "29-06-2018",
                    fechaCalificacion: "08-07-2018",
                    version: "1.0.0"
                }
            ],
            preentrevistas: [
                {
                    nombre: "John Doe",
                    fechaAsignacion: {
                        raw: "20180213",
                        formatted: "13-02-2018"
                    },
                    fechaCalificacion: {
                        raw: "20190228",
                        formatted: "28-02-2018"
                    },
                    descriptores: [
                        {
                            descriptor: "I2a",
                            calificacion: 1
                        },
                        {
                            descriptor: "I1b",
                            calificacion: 1
                        }
                    ]
                },
                {
                    nombre: "John Doe",
                    fechaAsignacion: {
                        raw: "20190931",
                        formatted: "19-09-2019"
                    },
                    fechaCalificacion: {
                        raw: "20191031",
                        formatted: "31-10-2019"
                    },
                    descriptores: [
                        {
                            descriptor: "R1tb",
                            calificacion: 1
                        },
                        {
                            descriptor: "E2ub",
                            calificacion: 2
                        }
                    ]
                }
            ],
            entrevistas: [
                {
                    nombre: "Jane Doe",
                    fechaAsignacion: {
                        raw: "20190314",
                        formatted: "14-03-2019"
                    },
                    fechaCalificacion: {
                        raw: "20190414",
                        formatted: "14-04-2019"
                    },
                    descriptores: [
                        {
                            descriptor: "R1tb",
                            calificacion: 1
                        },
                        {
                            descriptor: "E2ub",
                            calificacion: 2
                        },
                        {
                            descriptor: "I2a",
                            calificacion: 1
                        },
                        {
                            descriptor: "I1b",
                            calificacion: 1
                        }
                    ]
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
        this.setState({
            divisionMostrada: newIndex,
            searchTerm: "",
            isLoading: true
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
        const copiaElementos = [...this.state[this.state.categoriaDivisionMostrada]];

        switch (e.target.name) {
            case "categoria":
                const dash = this.state.filtros.orden === "descendente" ? "-" : "";

                switch (e.target.value) {
                    case "nombre":
                        copiaElementos.sort(sortBy(`${dash}nombre`));
                        break;
                    case "calificacion":
                        copiaElementos.sort(sortBy(`${dash}calificacion`));
                        break;
                    case "calificaciones.fecha-asignacion":
                        copiaElementos.sort(sortBy(`${dash}fechaAsignacion`));
                        break;
                    case "calificaciones.fecha-calificacion":
                        copiaElementos.sort(sortBy(`${dash}fechaCalificacion`));
                        break;
                    case "configuracion.label-version":
                        copiaElementos.sort(sortBy(`${dash}version`));
                        break;
                    default:
                        break;
                }
                break;
            case "orden":
                switch (e.target.value) {
                    case "descendente":
                        copiaElementos.sort(sortBy(`-${this.state.filtros.categoria}`));
                        break;
                    case "ascendente":
                        copiaElementos.sort(sortBy(this.state.filtros.categoria));
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

        this.setState({
            elementosMostrados: copiaElementos,
            filtros: {
                ...this.state.filtros,
                [e.target.name]: e.target.value
            }
        });
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

            this.setState({
                elementosMostrados: matchedArrays
            });
        }
    }

    render() {
        let selectedTab;
        switch (this.state.divisionMostrada) {
            case 0:
                selectedTab = (
                    <Paper className="scrolling-table-outer">
                        <div className="scrolling-table-wrapper">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {
                                            this.state.headCells.practicas.map((cellLabel, i) => (
                                                <TableCell key={i}><T phrase={cellLabel}/></TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.elementosMostrados.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                            const values = Object.values(elemento);
                                            return (
                                                <TableRow key={i}>
                                                    {
                                                        values.map((val, j) => <TableCell key={j}>{val}</TableCell>)
                                                    }
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
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
                            <Tab label={<T phrase="procesoPaso.3-plural"/>}/>
                            <Tab label={<T phrase="procesoPaso.4-plural"/>}/>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} lg={4} className="pb-0">
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
                <Grid item xs={12} md={7} lg={8} className="pb-0">
                    <div className="d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                        <Select
                            value={this.state.filtros.categoria}
                            onChange={this.handleFiltroChange}
                            input={<OutlinedInput required name="categoria"/>}
                        >
                            {
                                this.state.headCells[this.state.categoriaDivisionMostrada].map((cellLabel, i) => (
                                    <MenuItem value={cellLabel} key={i}><T phrase={cellLabel}/></MenuItem>
                                ))
                            }
                        </Select>
                        <Select
                            value={this.state.filtros.orden}
                            onChange={this.handleFiltroChange}
                            input={<OutlinedInput required name="orden"/>}
                            className="ml-3"
                        >
                            <MenuItem value="descendente"><T phrase="filtros.descendente"/></MenuItem>
                            <MenuItem value="ascendente"><T phrase="filtros.ascendente"/></MenuItem>
                        </Select>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {
                        this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto" /> : selectedTab
                    }
                </Grid>
            </Grid>
        );
    }
}

export default Calificaciones;