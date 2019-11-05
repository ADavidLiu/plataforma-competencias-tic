import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from "@material-ui/core/CircularProgress";
import sortBy from "sort-by";

import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Search from "@material-ui/icons/Search";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class Territorios extends Component{
    constructor() {
        super();

        this.state = {
            divisionMostrada: 0,
            isLoading: false,
            isFiltering: false,
            isEditing: false,
            isDeleting: false,
            territoriosActuales: [],
            institucionesActuales: [],
            clasificacionesActuales: [],
            headCells: ["ID", "nombre", "territorios.lista-padre", "territorios.lista-clasificacion", "territorios.lista-fecha-creacion", "territorios.lista-acciones"],
            crearForm: {
                nombre: "",
                padre: "",
                isClaseNew: "",
                clase: "",
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
            searchTerm: "",
            editingForm: {
                nombre: "",
                padre: "",
                clase: "",
                fechaCreacion: ""
            },
            activeTerritoryID: ""
        }
    }

    componentDidMount = () => {
        if (this.props[0] && this.props[0].location.state) {
            if (this.props[0].location.state.shouldActivateViewingMode) {
                this.props.updateIsInViewingMode(true, "GOBIERNO");
            }
        }

        const dataCargada = {
            territorios: [
                {
                    id: "is-root",
                    nombre: "No es subdivisión",
                    padre: "No es subdivisión",
                    fechaCreacion: "2019-06-29",
                },
                {
                    id: 1,
                    nombre: "Veniam labore minim",
                    padre: "Culpa aliquip minim",
                    fechaCreacion: "2019-09-13"
                },
                {
                    id: 2,
                    nombre: "dolore mollit",
                    padre: "",
                    fechaCreacion: "2019-02-14"
                },
                {
                    id: 3,
                    nombre: "aliquip",
                    padre: "Do irure eiusmod",
                    fechaCreacion: "2019-08-14"
                },
                {
                    id: 4,
                    nombre: "ad ad ex",
                    padre: "",
                    fechaCreacion: "2019-01-31"
                },
                {
                    id: 5,
                    nombre: "mollit occaecat",
                    padre: "",
                    fechaCreacion: "2018-10-10"
                },
                {
                    id: 6,
                    nombre: "tempor do in",
                    padre: "",
                    fechaCreacion: "2019-05-24"
                }
            ],
            clasificaciones: ["Nacional", "Departamental", "Municipal"],
            instituciones: ["Adipiscing", "Elit", "Occaecat", "dolore cillum", "anim id Lorem", "amet tempor laboris",  "pariatur officia occaecat"]
        };

        this.setState({
            territoriosActuales: dataCargada.territorios,
            institucionesActuales: dataCargada.instituciones,
            clasificacionesActuales: dataCargada.clasificaciones,
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
                isClaseNew: "",
                clase: "",
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

    handleCrearFormChange = e => {
        this.setState({
            crearForm: {
                ...this.state.crearForm,
                [e.target.name]: e.target.value
            }
        });

        const timeout = setTimeout(() => {
            let newState = false;
            if (this.state.crearForm.nombre !== "" && this.state.crearForm.padre !== "" && this.state.crearForm.isClaseNew !== "" && this.state.crearForm.clase !== "") {
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
                isClaseNew: "",
                clase: "",
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
                    case "ID":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "ID",
                                categoriaFormatted: "id"
                            }
                        });
                        break;
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

            for (let i = 0; i < rawValuesToSearchFrom.length; i += 4) {
                arraysValuesToSearchFrom.push(rawValuesToSearchFrom.slice(i, i + 4));
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

    toggleDeleting = () => {
        this.setState({
            isDeleting: !this.state.isDeleting
        });
    }

    toggleEditor = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    editarTerritorio = id => {
        this.toggleEditor();

        const selected = this.state.territoriosActuales.find(territorio => territorio.id === id);
        
        this.setState({
            activeTerritoryID: id,
            editingForm: {
                nombre: selected.nombre,
                padre: selected.padre,
                fechaCreacion: selected.fechaCreacion
            }
        });
    }

    eliminarTerritorio = id => {
        this.toggleDeleting();
        this.setState({
            activeTerritoryID: id
        });
    }

    confirmUserDeletion = () => {
        this.toggleDeleting();

        /* Conectarse al backend para hacer los cambios */

        /* Luego, eliminarlo visualmente de la interfaz */
        let newTerritorios = [...this.state.territoriosActuales];
        newTerritorios = newTerritorios.filter(territorio => territorio.id !== this.state.activeTerritoryID);

        this.setState({
            territoriosActuales: newTerritorios,
            elementosMostrados: newTerritorios
        });
    }

    saveUpdatedUser = () => {
        this.toggleEditor();

        const newTerritorios = [...this.state.territoriosActuales];
        let modified = newTerritorios.find(territorio => territorio.id === this.state.activeTerritoryID);
        const modifiedIndex = newTerritorios.indexOf(modified);

        modified = {
            ...modified,
            nombre: this.state.editingForm.nombre,
            padre: this.state.editingForm.padre,
            fechaCreacion: this.state.editingForm.fechaCreacion
        }
        newTerritorios[modifiedIndex] = modified;

        this.setState({
            territoriosActuales: newTerritorios,
            elementosMostrados: newTerritorios
        });
    }

    handleEdicionChange = e => {
        this.setState({
            editingForm: {
                ...this.state.editingForm,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }
        if (this.props[0] && this.props[0].location && this.props[0].location.state === undefined) {
            return <Redirect to="/" />
        }
        
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
                                                <Grid item xs={12}>
                                                    <div className="text-center text-md-left mb-3">
                                                        <Typography className="mb-2" variant="body1"><strong>{t("territorios.clasificacion")}</strong></Typography>
                                                        <Typography variant="body2">{t("territorios.clasificacion-descripcion")}</Typography>
                                                    </div>
                                                    <FormControl component="fieldset" className="w-100">
                                                        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                                                            <RadioGroup
                                                                value={this.state.crearForm.isClaseNew}
                                                                onChange={this.handleCrearFormChange}
                                                                name="isClaseNew"
                                                                row>
                                                                    <FormControlLabel
                                                                        value="true"
                                                                        control={<Radio color="primary" />}
                                                                        label={t("si")}
                                                                    />
                                                                    <FormControlLabel
                                                                        value="false"
                                                                        control={<Radio color="primary" />}
                                                                        label={t("no")}
                                                                    />
                                                            </RadioGroup>
                                                        </div>
                                                    </FormControl>
                                                    {
                                                        this.state.crearForm.isClaseNew === "true" ? (
                                                            <React.Fragment>
                                                                <Typography variant="body2" className="mb-2"><strong>{t("cual")}</strong></Typography>
                                                                <Select
                                                                    value={this.state.crearForm.clase}
                                                                    onChange={this.handleCrearFormChange}
                                                                    variant="filled"
                                                                    input={<OutlinedInput fullWidth required name="clase"/>}
                                                                >
                                                                    {
                                                                        this.state.clasificacionesActuales.map((clase, i) => {
                                                                            return (
                                                                                <MenuItem key={i} value={clase}>{clase}</MenuItem>
                                                                            );
                                                                        })
                                                                    }
                                                                </Select>
                                                            </React.Fragment>
                                                        ) : this.state.crearForm.isClaseNew === "false" ? (
                                                            <React.Fragment>
                                                                <Typography variant="body2" className="mb-2"><strong>{t("territorios.clasificacion-crear")}</strong></Typography>
                                                                <TextField
                                                                    variant="outlined"
                                                                    margin="none"
                                                                    required
                                                                    fullWidth
                                                                    name="clase"
                                                                    value={this.state.crearForm.clase}
                                                                    onChange={this.handleCrearFormChange}
                                                                />
                                                            </React.Fragment>
                                                        ) : null
                                                    }
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
                                        <Paper>
                                            <div className="scrolling-table-outer">
                                                <div className="scrolling-table-wrapper">
                                                    <Table className="scrolling-table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>{t("ID")}</TableCell>
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
                                                                                <TableCell colSpan={5}>
                                                                                    <CircularProgress color="primary" className="d-block mx-auto"/>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ) : (
                                                                            this.state.elementosMostrados.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                                                                const values = Object.values(elemento);
                                                                                const elementoID = elemento.id !== undefined ? elemento.id : elemento[0];

                                                                                return (
                                                                                    <TableRow key={i}>
                                                                                        {
                                                                                            values.map((val, j) => <TableCell key={j}>{val}</TableCell>)
                                                                                        }
                                                                                        <TableCell>
                                                                                            <EditOutlined color="primary"  style={{cursor: "pointer"}} onClick={() => {
                                                                                                this.editarTerritorio(elementoID);
                                                                                            }}/>
                                                                                            <DeleteOutlined color="primary"  style={{cursor: "pointer"}} onClick={() => {
                                                                                                this.eliminarTerritorio(elementoID);
                                                                                            }} className="ml-3"/>
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
                                                                        <TableCell colSpan="5" align="center">{t("usuarios.no-datos")}</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            )
                                                        }
                                                    </Table>
                                                </div>
                                            </div>
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
                                        </Paper>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            default:
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

                            <Dialog open={this.state.isEditing} onClose={this.toggleEditor} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
                                <DialogTitle>{t("territorios.label-editar")}</DialogTitle>
                                <DialogContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body1">{t("territorios.nombre")}</Typography>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                disabled={this.state.activeTerritoryID === "is-root"}
                                                name="nombre"
                                                value={this.state.editingForm.nombre}
                                                onChange={this.handleEdicionChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body1" className="mb-3">{t("territorios.lista-padre")}</Typography>
                                            <Select
                                                value={this.state.editingForm.padre}
                                                onChange={this.handleEdicionChange}
                                                variant="filled"
                                                disabled={this.state.activeTerritoryID === "is-root"}
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
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="body1">{t("territorios.lista-fecha-creacion")}</Typography>
                                            <TextField
                                                type="date"
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                disabled
                                                fullWidth
                                                name="fechaCreacion"
                                                value={this.state.editingForm.fechaCreacion}
                                                onChange={this.handleEdicionChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.saveUpdatedUser}>{t("usuarios.btn-guardar")}</Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog open={this.state.isDeleting} onClose={this.toggleDeleting} aria-labelledby="form-dialog-title">
                                <DialogTitle>{t("territorios.label-desactivar")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <strong>{t("territorios.ayuda-borrar-0")}</strong>
                                        <br/>
                                        {t("territorios.ayuda-borrar-1")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.confirmUserDeletion}>{t("usuarios.btn-borrar")}</Button>
                                </DialogActions>
                            </Dialog>

                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Territorios;