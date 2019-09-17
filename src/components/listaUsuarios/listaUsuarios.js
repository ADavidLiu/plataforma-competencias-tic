import React, { Component } from "react";

import { Translation } from "react-i18next";
import locationData from "countrycitystatejson";
import sortBy from "sort-by";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';

import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Edit from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import OpenInNew from "@material-ui/icons/OpenInNewOutlined";
import Search from "@material-ui/icons/Search";

import { CircularProgress } from "@material-ui/core";

class ListaUsuarios extends Component {
	constructor(props) {
        super(props);
        
        this.formularioPlaceholder = {};
        this.headCells = {
            gobierno: ["usuarios.registro-idNacional", "usuarios.registro-nombre-ie", "usuarios.registro-pais", "usuarios.registro-departamento", "usuarios.registro-municipio", "usuarios.acciones"],
            institucion: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-pais", "usuarios.registro-ee-departamento", "usuarios.registro-ee-direccion", "usuarios.registro-ee-tipo-ubicacion", "usuarios.registro-ee-nombre-ubicacion", "usuarios.registro-ee-zona", "usuarios.registro-ee-regimen", "usuarios.registro-ee-telefono", "usuarios.registro-ee-email", "usuarios.registro-ee-web", "usuarios.acciones"],
            establecimiento: ["usuarios.registro-idNacional", "usuarios.registro-nombre-docente", "usuarios.registro-idEstablecimiento", "usuarios.acciones"],
        };
        switch (props.userType) {
            case "GOBIERNO":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    pais: "",
                    departamento: "",
                    municipio: ""
                };
                break;
            case "INSTITUCION":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    pais: "",
                    departamento: "",
                    direccion: "",
                    tipoUbicacion: "",
                    nombreUbicacion: "",
                    zona: "",
                    regimen: "",
                    telefono: "",
                    emailInstitucional: "",
                    sitioWeb: ""
                };
                break;
            case "ESTABLECIMIENTO":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombreCompleto: "",
                    idEstablecimiento: ""
                };
                break;
            default:
                break;
        }

        this.mockData = {
            instituciones: [
                {
                    idNacional: "09876",
                    nombre: "Institución Jane Doe",
                    pais: "CO-Colombia",
                    departamento: "Quindio",
                    municipio: "Armenia"
                },
                {
                    idNacional: "1234",
                    nombre: "Institución John Doe",
                    pais: "CO-Colombia",
                    departamento: "Quindio",
                    municipio: "Armenia"
                },
                {
                    idNacional: "5678",
                    nombre: "Institución Jane Doe",
                    pais: "CO-Colombia",
                    departamento: "Quindio",
                    municipio: "Armenia"
                },
                {
                    idNacional: "1890",
                    nombre: "Institución John Doe",
                    pais: "CO-Colombia",
                    departamento: "Quindio",
                    municipio: "Armenia"
                },
                {
                    idNacional: "567221",
                    nombre: "Institución Jane Doe",
                    pais: "CO-Colombia",
                    departamento: "Quindio",
                    municipio: "Armenia"
                },
                {
                    idNacional: "098123",
                    nombre: "Institución John Doe",
                    pais: "CO-Colombia",
                    departamento: "Quindio",
                    municipio: "Armenia"
                }
            ],
            establecimientos: [
                {
                    idNacional: "1234567890",
                    nombre: "Colegio John Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "John Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                },
                {
                    idNacional: "0987654321",
                    nombre: "Colegio Jane Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "Jane Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                },
                {
                    idNacional: "1238904567",
                    nombre: "Colegio John Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "John Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                },
                {
                    idNacional: "678123049",
                    nombre: "Colegio Jane Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "Jane Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                },
                {
                    idNacional: "78125603",
                    nombre: "Colegio John Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "John Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                },
                {
                    idNacional: "123456123",
                    nombre: "Colegio Jane Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "Jane Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                },
                {
                    idNacional: "456123789",
                    nombre: "Colegio John Doe",
                    pais: "CO-Colombia",
                    departamento: "Antioquia",
                    direccion: "Calle 12 #34-56",
                    tipoUbicacion: "Barrio",
                    nombreUbicacion: "John Doe",
                    zona: "Urbana",
                    regimen: "Oficial",
                    telefono: "1234567890",
                    emailInstitucional: "john@doe.edu.co",
                    sitioWeb: "johndoe.edu.co"
                },
            ],
            docentes: [
                {
                    idNacional: "567890123",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "123456980",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "098123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "456789123",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "098890123",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "7651234890",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "321123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "890098765",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654"
                },
                {
                    idNacional: "432123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654"
                },
            ]
        }

		this.state = {
            isLoading: true,
            isEditing: false,
            isDeleting: false,
            isFiltering: false,
            activeID: "",
            activeCategory: "",
            usuarios: {...this.mockData},
            editingForm: this.formularioPlaceholder,
            departamentos: [],
            municipios: [],
            elementosMostrados: {...this.mockData},
            rowsPerPage: 10,
            page: 0,
            searchTerm: "",
            filtros: {
                categoria: "usuarios.registro-idNacional",
                categoriaFormatted: "idNacional",
                orden: "descendente"
            }
        };
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
    
    componentDidMount = () => {
        /* Simulando el delay al traer la información del backend */
        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 500);
    }

    componentDidUpdate = prevProps => {
        /* Se cambió de categoría de tab */
        if (this.props.tipoUsuariosMostrados !== prevProps.tipoUsuariosMostrados) {
            /* Reiniciar los filtros */
            const newUsers = [...this.state.usuarios[this.props.tipoUsuariosMostrados]];
            newUsers.sort(sortBy("-usuarios.registro-idNacional"));

            this.setState({
                isLoading: true,
                page: 0,
                elementosMostrados: {
                    ...this.state.elementosMostrados,
                    [this.props.tipoUsuariosMostrados]: newUsers
                },
                searchTerm: "",
                filtros: {
                    categoria: "usuarios.registro-idNacional",
                    categoriaFormatted: "idNacional",
                    orden: "descendente"
                }
            });

            /* Volviendo a simular la traída de datos del backend */
            const timeout = setTimeout(() => {
                this.setState({
                    isLoading: false
                }); 
                clearTimeout(timeout);
            }, 500);
        }
    }

    toggleDeleting = () => {
        this.setState({
            isDeleting: !this.state.isDeleting
        });
    }

    deleteUser = id => {
        this.setState({
            isDeleting: true,
            activeID: id
        });
    }

    confirmUserDeletion = () => {
        this.toggleDeleting();

        /* Conectarse al backend para hacer los cambios */

        /* Luego, eliminarlo visualmente de la interfaz */
        let newUsuarios = [...this.state.usuarios[this.props.tipoUsuariosMostrados]];
        newUsuarios = newUsuarios.filter(usuario => usuario.idNacional !== this.state.activeID);

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                [this.props.tipoUsuariosMostrados]: newUsuarios
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                [this.props.tipoUsuariosMostrados]: newUsuarios
            }
        });
    }

    toggleEditor = () => {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    editUser = id => {
        this.toggleEditor();

        const encontrado = this.state.usuarios[this.props.tipoUsuariosMostrados].find(usuario => usuario.idNacional === id);
        
        switch (this.props.userType) {
            case "GOBIERNO":
                const codigoPais = encontrado.pais.split("-")[0];

                const states = locationData.getStatesByShort(codigoPais);
                const cities = locationData.getCities(codigoPais, encontrado.departamento);
                const statesMenuItems = [];
                const citiesMenuItems = [];
        
                states.forEach(state => {
                    statesMenuItems.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });
                cities.forEach(city => {
                    citiesMenuItems.push(<MenuItem key={city} value={city}>{city}</MenuItem>);
                });
        
                this.setState({
                    activeID: id,
                    editingForm: {
                        idNacional: encontrado.idNacional,
                        nombre: encontrado.nombre,
                        pais: encontrado.pais,
                        departamento: encontrado.departamento,
                        municipio: encontrado.municipio
                    },
                    departamentos: statesMenuItems,
                    municipios: citiesMenuItems
                });
                break;
            case "INSTITUCION":
                const pais = encontrado.pais;
                const codigoPaisDpto = pais.split("-")[0];
                const statesDpto = locationData.getStatesByShort(codigoPaisDpto);
                
                const statesMenuItemsDptos = [];
                statesDpto.forEach(state => {
                    statesMenuItemsDptos.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });
            
                this.setState({
                    activeID: id,
                    editingForm: {
                        nombre: encontrado.nombre,
                        pais: encontrado.pais,
                        departamento: encontrado.departamento,
                        direccion: encontrado.direccion,
                        tipoUbicacion: encontrado.tipoUbicacion,
                        nombreUbicacion: encontrado.nombreUbicacion,
                        zona: encontrado.zona,
                        regimen: encontrado.regimen,
                        telefono: encontrado.telefono,
                        emailInstitucional: encontrado.emailInstitucional,
                        sitioWeb: encontrado.sitioWeb,
                        idNacional: encontrado.idNacional
                    },
                    departamentos: statesMenuItemsDptos
                });
                break;
            case "ESTABLECIMIENTO":
                this.setState({
                    activeID: id,
                    editingForm: {
                        idNacional: encontrado.idNacional,
                        nombreCompleto: encontrado.nombreCompleto,
                        idEstablecimiento: encontrado.idEstablecimiento
                    }
                });
                break;
            default:
                break;
        }
    }

    saveUpdatedUser = () => {
        this.toggleEditor();

        const updatedUsers = [...this.state.usuarios[this.props.tipoUsuariosMostrados]];
        let updatedUser = updatedUsers.find(user => user.idNacional === this.state.activeID);
        const updatedUserIndex = updatedUsers.indexOf(updatedUser);
        updatedUser = this.state.editingForm;
        updatedUsers[updatedUserIndex] = updatedUser;

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                [this.props.tipoUsuariosMostrados]: updatedUsers
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                [this.props.tipoUsuariosMostrados]: updatedUsers
            }
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

    handleChangeLocationDropdown = e => {
        this.setState({
            editingForm: {
                ...this.state.editingForm,
                [e.target.name]: e.target.value
            }
        });

        switch (e.target.name) {
            case "pais":
                this.setState({
                    departamentos: [],
                    municipios: []
                });

                const codigoPais = e.target.value.split("-")[0];
                const states = locationData.getStatesByShort(codigoPais);
                const statesMenuItems = [];

                states.forEach(state => {
                    statesMenuItems.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });

                this.setState({
                    departamentos: statesMenuItems
                });
                break;
            case "departamento":
                this.setState({
                    municipios: []
                });

                const codigoPais2 = this.state.editingForm.pais.split("-")[0];
                const cities = locationData.getCities(codigoPais2, e.target.value);
                const citiesMenuItems = [];

                cities.forEach(city => {
                    citiesMenuItems.push(<MenuItem key={city} value={city}>{city}</MenuItem>);
                });

                this.setState({
                    municipios: citiesMenuItems
                });
                break;
            case "municipio":
            default:
                break;
        }
    }

    handleFiltroChange = e => {
        /* const copiaElementos = [...this.state[this.state.categoriaDivisionMostrada]]; */
        const copiaElementos = [...this.state.elementosMostrados[this.props.tipoUsuariosMostrados]];

        this.setState({
            isFiltering: true
        });

        switch (e.target.name) {
            case "categoria":
                switch (e.target.value) {
                    case "usuarios.registro-idNacional":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-idNacional",
                                categoriaFormatted: "idNacional"
                            }
                        });
                        break;
                    case "usuarios.registro-nombre-ie":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-nombre-ie",
                                categoriaFormatted: "nombre"
                            }
                        });
                        break;
                    case "usuarios.registro-pais":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-pais",
                                categoriaFormatted: "pais"
                            }
                        });
                        break;
                    case "usuarios.registro-departamento":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-departamento",
                                categoriaFormatted: "departamento"
                            }
                        });
                        break;
                    case "usuarios.registro-municipio":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-municipio",
                                categoriaFormatted: "municipio"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-nombre":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-nombre",
                                categoriaFormatted: "nombre"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-departamento":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-departamento",
                                categoriaFormatted: "departamento"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-direccion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-direccion",
                                categoriaFormatted: "direccion"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-tipo-ubicacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-tipo-ubicacion",
                                categoriaFormatted: "tipoUbicacion"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-nombre-ubicacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-nombre-ubicacion",
                                categoriaFormatted: "nombreUbicacion"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-zona":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-zona",
                                categoriaFormatted: "zona"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-regimen":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-regimen",
                                categoriaFormatted: "regimen"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-telefono":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-telefono",
                                categoriaFormatted: "telefono"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-email":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-email",
                                categoriaFormatted: "emailInstitucional"
                            }
                        });
                        break;
                    case "usuarios.registro-ee-web":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-ee-web",
                                categoriaFormatted: "sitioWeb"
                            }
                        });
                        break;
                    case "usuarios.registro-nombre-docente":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-nombre-docente",
                                categoriaFormatted: "nombreCompleto"
                            }
                        });
                        break;
                    case "usuarios.registro-idEstablecimiento":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-idEstablecimiento",
                                categoriaFormatted: "idEstablecimiento"
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
                elementosMostrados: {
                    ...this.state.elementosMostrados,
                    [this.props.tipoUsuariosMostrados]: copiaElementos
                },
                isFiltering: false
            });

            clearTimeout(timeout);
        }, 1000);
    }

    handleSearch = e => {
        const copiaElementos = [...this.state.usuarios[this.props.tipoUsuariosMostrados]];
        const searchTerm = e.target.value;

        this.setState({
            searchTerm: searchTerm
        });

        if (e.target.value === "" || e.target.value === null || e.target.value === undefined) {
            this.setState({
                elementosMostrados: {
                    ...this.state.elementosMostrados,
                    [this.props.tipoUsuariosMostrados]: copiaElementos
                }
            });
        } else {
            const rawValuesToSearchFrom = [];
            const arraysValuesToSearchFrom = [];
            let matchedArrays = [];

            this.state.usuarios[this.props.tipoUsuariosMostrados].forEach(elem => {
                Object.values(elem).forEach(val => {
                    rawValuesToSearchFrom.push(val);
                });
            });

            for (let i = 0; i < rawValuesToSearchFrom.length; i += this.headCells[this.props.userType.toLowerCase()].length - 1) {
                arraysValuesToSearchFrom.push(rawValuesToSearchFrom.slice(i, i + this.headCells[this.props.userType.toLowerCase()].length - 1));
            }
            arraysValuesToSearchFrom.forEach(array => {
                array.forEach(val => {
                    if (val.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                        matchedArrays.push(array);
                    }
                });
            });

            matchedArrays.sort(sortBy("-usuarios.registro-idNacional"));
            matchedArrays = [...new Set(matchedArrays)];

            this.setState({
                page: 0,
                elementosMostrados: {
                    ...this.state.elementosMostrados,
                    [this.props.tipoUsuariosMostrados]: matchedArrays
                },
                filtros: {
                    categoria: "usuarios.registro-idNacional",
                    categoriaFormatted: "idNacional",
                    orden: "descendente"
                }
            });
        }
    }

	render() {
        let tabla;
        let formularioEdicion;

        switch (this.props.userType) {
            case "GOBIERNO":
                tabla = (
                    <Translation>
                    {
                        t => (
                            <Paper>
                                <div className="scrolling-table-outer">
                                    <div className="scrolling-table-wrapper">
                                        <Table className="scrolling-table">
                                            <TableHead>
                                                <TableRow>
                                                    {
                                                        this.headCells.gobierno.map((title, i) => <TableCell key={i}>{t(title)}</TableCell>)
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            {
                                                this.state.usuarios[this.props.tipoUsuariosMostrados].length > 0 ? (
                                                    <TableBody>
                                                        {
                                                            this.state.isFiltering ? (
                                                                <TableRow>
                                                                    <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                        <CircularProgress color="primary" className="d-block mx-auto"/>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                this.state.elementosMostrados[this.props.tipoUsuariosMostrados].slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                                                    const values = Object.values(elemento);
                                                                    const keys = Object.keys(elemento);
                                                                    return (
                                                                        <TableRow key={i}>
                                                                            {
                                                                                values.map((val, j) => {
                                                                                    if (keys[j] === "pais") {
                                                                                        return <TableCell key={j}>{val.split("-")[1]}</TableCell>;
                                                                                    } else {
                                                                                        return <TableCell key={j}>{val}</TableCell>;
                                                                                    }
                                                                                })
                                                                            }
                                                                            <TableCell>
                                                                                <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(elemento.idNacional); }}/>
                                                                                <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(elemento.idNacional); }}/>
                                                                                <Link to={{
                                                                                    pathname: "/dashboard-institucion",
                                                                                    state: {
                                                                                        institucionID: elemento.idNacional
                                                                                    }
                                                                                }} style={{textDecoration: "none"}}>
                                                                                    <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                                </Link>
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
                                                            <TableCell colSpan="6" align="center">{t("usuarios.no-datos")}</TableCell>
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
                                    count={this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </Paper>
                        )
                    }
                    </Translation>
                );

                formularioEdicion = (
                    <Translation>
                        {
                            t => (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-idNacional")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idNacional"
                                            value={this.state.editingForm.idNacional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="body1">{t("usuarios.registro-nombre-ie")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombre"
                                            value={this.state.editingForm.nombre}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-pais")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.pais}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="pais"/>}
                                        >
                                            <MenuItem value="CO-Colombia">Colombia</MenuItem>
                                            <MenuItem value="VE-Venezuela">Venezuela</MenuItem>
                                            <MenuItem value="PA-Panamá">Panamá</MenuItem>
                                            <MenuItem value="PE-Perú">Perú</MenuItem>
                                            <MenuItem value="EC-Ecuador">Ecuador</MenuItem>
                                            <MenuItem value="BO-Bolivia">Bolivia</MenuItem>
                                            <MenuItem value="PY-Paraguay">Paraguay</MenuItem>
                                            <MenuItem value="UY-Uruguay">Uruguay</MenuItem>
                                            <MenuItem value="CL-Chile">Chile</MenuItem>
                                            <MenuItem value="BR-Brasil">Brasil</MenuItem>
                                            <MenuItem value="AR-Argentina">Argentina</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-departamento")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.departamento}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="departamento"/>}
                                        >
                                            { this.state.departamentos }
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-municipio")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.municipio}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="municipio"/>}
                                        >
                                            { this.state.municipios }
                                        </Select>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case "INSTITUCION":
                tabla = (
                    <Translation>
                        {
                            t => (
                                <Paper>
                                    <div className="scrolling-table-outer">
                                        <div className="scrolling-table-wrapper">
                                            <Table className="scrolling-table">
                                                <TableHead>
                                                    <TableRow>
                                                        {
                                                            this.headCells.institucion.map((title, i) => <TableCell key={i}>{t(title)}</TableCell>)
                                                        }
                                                    </TableRow>
                                                </TableHead>
                                                {
                                                    this.state.usuarios[this.props.tipoUsuariosMostrados].length > 0 ? (
                                                        <TableBody>
                                                            {
                                                                this.state.isFiltering ? (
                                                                    <TableRow>
                                                                        <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                            <CircularProgress color="primary" className="d-block mx-auto"/>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    this.state.elementosMostrados[this.props.tipoUsuariosMostrados].slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                                                        const values = Object.values(elemento);
                                                                        const keys = Object.keys(elemento);
                                                                        return (
                                                                            <TableRow key={i}>
                                                                                {
                                                                                    values.map((val, j) => {
                                                                                        if (keys[j] === "pais") {
                                                                                            return <TableCell key={j}>{val.split("-")[1]}</TableCell>;
                                                                                        } else {
                                                                                            return <TableCell key={j}>{val}</TableCell>;
                                                                                        }
                                                                                    })
                                                                                }
                                                                                <TableCell>
                                                                                    <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(elemento.idNacional); }}/>
                                                                                    <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(elemento.idNacional); }}/>
                                                                                    <Link to={{
                                                                                        pathname: "/dashboard-institucion",
                                                                                        state: {
                                                                                            institucionID: elemento.idNacional
                                                                                        }
                                                                                    }} style={{textDecoration: "none"}}>
                                                                                        <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                                    </Link>
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
                                                                <TableCell colSpan="12" align="center">{t("usuarios.no-datos")}</TableCell>
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
                                        count={this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Paper>
                            )
                        }
                    </Translation>
                );

                formularioEdicion = (
                    <Translation>
                        {
                            t => (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-id")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idNacional"
                                            value={this.state.editingForm.idNacional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-nombre")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombre"
                                            value={this.state.editingForm.nombre}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-departamento")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.departamento}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="departamento"/>}
                                        >
                                            { this.state.departamentos }
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-direccion")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="direccion"
                                            value={this.state.editingForm.direccion}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-tipo-ubicacion")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.tipoUbicacion}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="tipoUbicacion"/>}
                                        >
                                            <MenuItem value="Barrio">{t("barrio")}</MenuItem>
                                            <MenuItem value="Localidad">{t("localidad")}</MenuItem>
                                            <MenuItem value="Vereda">{t("vereda")}</MenuItem>
                                            <MenuItem value="Corregimiento">{t("corregimiento")}</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-nombre-ubicacion")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombreUbicacion"
                                            value={this.state.editingForm.nombreUbicacion}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-zona")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.zona}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="zona"/>}
                                        >
                                            <MenuItem value="Rural">{t("rural")}</MenuItem>
                                            <MenuItem value="Urbana">{t("urbana")}</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-regimen")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.regimen}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="regimen"/>}
                                        >
                                            <MenuItem value="Oficial">{t("oficial")}</MenuItem>
                                            <MenuItem value="Privado">{t("privado")}</MenuItem>
                                            <MenuItem value="Concesión">{t("concesion")}</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-telefono")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="telefono"
                                            type="tel"
                                            value={this.state.editingForm.telefono}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-email")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="emailInstitucional"
                                            type="email"
                                            value={this.state.editingForm.emailInstitucional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-web")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="sitioWeb"
                                            value={this.state.editingForm.sitioWeb}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case "ESTABLECIMIENTO":
                tabla = (
                    <Translation>
                        {
                            t => (
                                <Paper>
                                    <div className="scrolling-table-outer">
                                        <div className="scrolling-table-wrapper">
                                            <Table className="scrolling-table">
                                                <TableHead>
                                                    <TableRow>
                                                        {
                                                            this.headCells.establecimiento.map((title, i) => <TableCell key={i}>{t(title)}</TableCell>)
                                                        }
                                                    </TableRow>
                                                </TableHead>
                                                {
                                                    this.state.usuarios[this.props.tipoUsuariosMostrados].length > 0 ? (
                                                        <TableBody>
                                                            {
                                                                this.state.isFiltering ? (
                                                                    <TableRow>
                                                                        <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                            <CircularProgress color="primary" className="d-block mx-auto"/>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    this.state.elementosMostrados[this.props.tipoUsuariosMostrados].slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                                                        const values = Object.values(elemento);
                                                                        return (
                                                                            <TableRow key={i}>
                                                                                {
                                                                                    values.map((val, j) => <TableCell key={j}>{val}</TableCell>)
                                                                                }
                                                                                <TableCell>
                                                                                <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(elemento.idNacional); }}/>
                                                                                <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(elemento.idNacional); }}/>
                                                                                    <Link to={{
                                                                                        pathname: "/dashboard-docente",
                                                                                        state: {
                                                                                            docenteID: elemento.idNacional
                                                                                        }
                                                                                    }} style={{textDecoration: "none"}}>
                                                                                        <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                                    </Link>
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
                                        </div>
                                    </div>
                                    <TablePagination
                                        labelDisplayedRows={({from, to, count}) => {
                                            return `${from}-${to} / ${count}`;
                                        }}
                                        labelRowsPerPage={t("filasPorPagina")}
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Paper>
                            )
                        }
                    </Translation>
                );

                formularioEdicion = (
                    <Translation>
                        {
                            t => (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-idNacional")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idNacional"
                                            value={this.state.editingForm.idNacional}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-nombre-docente")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="nombreCompleto"
                                            value={this.state.editingForm.nombreCompleto}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Typography variant="body1">{t("usuarios.registro-idEstablecimiento")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idEstablecimiento"
                                            value={this.state.editingForm.idEstablecimiento}
                                            onChange={this.handleEdicionChange}
                                        />
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
                            { this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto" /> : (
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
                                                    this.headCells[this.props.userType.toLowerCase()].map((cellLabel, i) => {
                                                        if (i < this.headCells[this.props.userType.toLowerCase()].length - 1) {
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
                                        { tabla }
                                    </Grid>
                                </Grid>
                            ) }

                            <Dialog open={this.state.isEditing} onClose={this.toggleEditor} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
                                <DialogTitle id="form-dialog-title">{t("usuarios.editar")}</DialogTitle>
                                <DialogContent>
                                    { formularioEdicion }
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.saveUpdatedUser}>{t("usuarios.btn-guardar")}</Button>
                                </DialogActions>
                            </Dialog>
                            
                            <Dialog open={this.state.isDeleting} onClose={this.toggleDeleting} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{t("usuarios.borrar")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <strong>{t("usuarios.ayuda-borrar-0")}</strong>
                                        <br/>
                                        {t("usuarios.ayuda-borrar-1")}
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

export default ListaUsuarios;