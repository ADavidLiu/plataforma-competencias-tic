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

import Tooltip from "@material-ui/core/Tooltip";

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
import Warning from "@material-ui/icons/Warning";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";

import { CircularProgress } from "@material-ui/core";

class ListaUsuarios extends Component {
	constructor(props) {
        super(props);
        
        this.formularioPlaceholder = {};
        this.headCells = {
            auditoria: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "id-evento", "accion", "fecha-realizacion", "ver-data", "usuarios.acciones"],
            superadmin: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-ee-telefono", "registro.email", "usuarios.registro-pais", "usuarios.registro-departamento", "usuarios.registro-municipio", "usuarios.registro-ee-direccion", "usuarios.acciones"],
            admin: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-pais", "usuarios.acciones"],
            evaluadores: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-pais", "usuarios.acciones"],
            gobierno: ["usuarios.registro-idNacional", "usuarios.registro-nombre-ie", "usuarios.registro-pais", "usuarios.registro-departamento", "usuarios.registro-municipio", "usuarios.acciones"],
            institucion: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-idInstitucion", "usuarios.registro-nombreInstitucion", "usuarios.registro-pais", "usuarios.registro-ee-departamento", "usuarios.registro-ee-direccion", "usuarios.registro-ee-tipo-ubicacion", "usuarios.registro-ee-nombre-ubicacion", "usuarios.registro-ee-zona", "usuarios.registro-ee-regimen", "usuarios.registro-ee-telefono", "usuarios.registro-ee-email", "usuarios.registro-ee-web", "usuarios.acciones"],
            establecimiento: ["usuarios.registro-idNacional", "usuarios.registro-nombre-docente", "usuarios.registro-idEstablecimiento", "usuarios.tiempo-restante", "usuarios.etapa-actual", "usuarios.acciones"],
        };

        switch (props.userType) {
            case "AUDITORIA":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    accion: "",
                    fechaRealizacion: "",
                    data: {
                        usuarioIncidido: {
                            idNacional: "",
                            nombre: ""
                        },
                        archivosRelacionados: {
                            nombre: "",
                            url: ""
                        }
                    }
                };
                break;
            case "SUPERADMIN":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    telefono: "",
                    email: "",
                    pais: "",
                    departamento: "",
                    municipio: "",
                    direccion: ""
                };
                break;
            case "ADMIN":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    pais: ""
                };
                break;
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
                    idNacionalInstitucion: "",
                    nombreInstitucion: "",
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
                    idEstablecimiento: "",
                    tiempoRestantePrueba: "",
                    etapaActualProceso: ""
                };
                break;
            default:
                break;
        }

        this.mockData = {
            auditoria: [
                {
                    idNacional: "123234345",
                    nombre: "John Doe",
                    idEvento: "098123",
                    accion: "Carga de práctica educativa",
                    fechaRealizacion: "2019-08-14",
                    data: {
                        usuarioIncidido: {
                            idNacional: "098987765",
                            nombre: "Jane Doe"
                        },
                        archivosRelacionados: {
                            nombre: "retroalimentado.pdf",
                            url: "https://ww.google.com"
                        }
                    }
                },
                {
                    idNacional: "456567678",
                    nombre: "Jane Doe",
                    idEvento: "123890",
                    accion: "Respuesta a pregunta de pre-entrevista",
                    fechaRealizacion: "2019-02-19",
                    data: {
                        pregunta: {
                            id: "12",
                            respondido: "Qui ut qui dolor deserunt deserunt occaecat nulla esse excepteur id aliquip."
                        }
                    }
                }
            ],
            admins: [
                {
                    idNacional: "123654321",
                    nombre: "Quis aliquip et duis aliquip",
                    telefono: "123312456",
                    email: "mail@mail.com",
                    pais: "CO-Colombia",
                    departamento: "Santander",
                    municipio: "Bucaramanga",
                    direccion: "Calle 123 #45-67"
                },
                {
                    idNacional: "890123456",
                    nombre: "Nostrud duis mollit",
                    telefono: "321456789",
                    email: "mail@mail.com",
                    pais: "UY-Uruguay",
                    departamento: "Montevideo",
                    municipio: "Montevideo",
                    direccion: "Calle 89 #01-23"
                }
            ],
            gobiernos: [
                {
                    idNacional: "123098456",
                    nombre: "Esse nisi aute excepteur",
                    pais: "CO-Colombia"
                },
                {
                    idNacional: "098123765",
                    nombre: "Commodo consectetur sit magna ea",
                    pais: "VE-Venezuela"
                }
            ],
            evaluadores: [
                {
                    idNacional: "678123098",
                    nombre: "Nulla exercitation ex occaecat",
                    pais: "PA-Panama"
                },
                {
                    idNacional: "456321789",
                    nombre: "Adipisicing aliqua mollit",
                    pais: "CL-Chile"
                }
            ],
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
                    idNacionalInstitucion: "123456",
                    nombreInstitucion: "Institución John Doe",
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
                    idNacionalInstitucion: "654321",
                    nombreInstitucion: "Institución Jane Doe",
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
                    idNacionalInstitucion: "123456",
                    nombreInstitucion: "Institución John Doe",
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
                    idNacionalInstitucion: "654321",
                    nombreInstitucion: "Institución Jane Doe",
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
                    idNacionalInstitucion: "123456",
                    nombreInstitucion: "Institución John Doe",
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
                    idNacionalInstitucion: "654321",
                    nombreInstitucion: "Institución Jane Doe",
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
                    idNacionalInstitucion: "123456",
                    nombreInstitucion: "Institución John Doe",
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
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 1200,
                    etapaActualProceso: "procesoPaso.1"
                },
                {
                    idNacional: "123456980",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 0,
                    etapaActualProceso: "procesoPaso.1"
                },
                {
                    idNacional: "098123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 2000,
                    etapaActualProceso: "procesoPaso.2"
                },
                {
                    idNacional: "456789123",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 4000,
                    etapaActualProceso: "procesoPaso.3"
                },
                {
                    idNacional: "098890123",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 5400,
                    etapaActualProceso: "procesoPaso.1"
                },
                {
                    idNacional: "7651234890",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 1000,
                    etapaActualProceso: "procesoPaso.1"
                },
                {
                    idNacional: "321123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 750,
                    etapaActualProceso: "procesoPaso.2"
                },
                {
                    idNacional: "890098765",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 200,
                    etapaActualProceso: "procesoPaso.3"
                },
                {
                    idNacional: "432123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 100,
                    etapaActualProceso: "procesoPaso.4"
                },
            ]
        }

        this.dataRelacionada = "";

		this.state = {
            isLoading: true,
            isEditing: false,
            isDeleting: false,
            isFiltering: false,
            isViewingData: false,
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

        if (this.props.buscarNombre) {
            this.buscarPorNombre(this.props.buscarNombre);
        }
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

        /* Cambió de término de búsqueda en Auditoría.js */
        if (this.props.buscarNombre !== prevProps.buscarNombre) {
            this.buscarPorNombre(this.props.buscarNombre);
        }
    }

    buscarPorNombre = nombreBuscado => {
        this.handleSearch(null, nombreBuscado);
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
            case "AUDITORIA":
                this.setState({
                    activeID: id
                });
                break;
            case "SUPERADMIN":
                const codigoPaisAdmin = encontrado.pais.split("-")[0];

                const statesAdmin = locationData.getStatesByShort(codigoPaisAdmin);
                const citiesAdmin = locationData.getCities(codigoPaisAdmin, encontrado.departamento);
                const statesMenuItemsAdmin = [];
                const citiesMenuItemsAdmin = [];
        
                statesAdmin.forEach(state => {
                    statesMenuItemsAdmin.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });
                citiesAdmin.forEach(city => {
                    citiesMenuItemsAdmin.push(<MenuItem key={city} value={city}>{city}</MenuItem>);
                });

                this.setState({
                    activeID: id,
                    editingForm: {
                        idNacional: encontrado.idNacional,
                        nombre: encontrado.nombre,
                        telefono: encontrado.telefono,
                        email: encontrado.email,
                        pais: encontrado.pais,
                        departamento: encontrado.departamento,
                        municipio: encontrado.municipio,
                        direccion: encontrado.direccion
                    },
                    departamentos: statesMenuItemsAdmin,
                    municipios: citiesMenuItemsAdmin
                });
                break;
            case "ADMIN":
                this.setState({
                    activeID: id,
                    editingForm: {
                        idNacional: id,
                        nombre: encontrado.nombre,
                        pais: encontrado.pais
                    }
                });
                break;
            case "GOBIERNO":
                const codigoPaisGobierno = encontrado.pais.split("-")[0];

                const statesGobierno = locationData.getStatesByShort(codigoPaisGobierno);
                const citiesGobierno = locationData.getCities(codigoPaisGobierno, encontrado.departamento);
                const statesMenuItemsGobierno = [];
                const citiesMenuItemsGobierno = [];
        
                statesGobierno.forEach(state => {
                    statesMenuItemsGobierno.push(<MenuItem key={state} value={state}>{state}</MenuItem>);
                });
                citiesGobierno.forEach(city => {
                    citiesMenuItemsGobierno.push(<MenuItem key={city} value={city}>{city}</MenuItem>);
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
                    departamentos: statesMenuItemsGobierno,
                    municipios: citiesMenuItemsGobierno
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
                        idNacional: encontrado.idNacional,
                        nombre: encontrado.nombre,
                        idNacionalInstitucion: encontrado.idNacionalInstitucion,
                        nombreInstitucion: encontrado.nombreInstitucion,
                        pais: encontrado.pais,
                        departamento: encontrado.departamento,
                        direccion: encontrado.direccion,
                        tipoUbicacion: encontrado.tipoUbicacion,
                        nombreUbicacion: encontrado.nombreUbicacion,
                        zona: encontrado.zona,
                        regimen: encontrado.regimen,
                        telefono: encontrado.telefono,
                        emailInstitucional: encontrado.emailInstitucional,
                        sitioWeb: encontrado.sitioWeb
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
                        idEstablecimiento: encontrado.idEstablecimiento,
                        tiempoRestantePrueba: encontrado.tiempoRestantePrueba,
                        etapaActualProceso: encontrado.etapaActualProceso
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
        const copiaElementos = [...this.state.elementosMostrados[this.props.tipoUsuariosMostrados]];

        this.setState({
            isFiltering: true
        });

        switch (e.target.name) {
            case "categoria":
                switch (e.target.value) {
                    case "usuarios.registro-nombreInstitucion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-nombreInstitucion",
                                categoriaFormatted: "nombreInstitucion"
                            }
                        });
                        break;
                    case "usuarios.registro-idInstitucion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.registro-idInstitucion",
                                categoriaFormatted: "idNacionalInstitucion"
                            }
                        });
                        break;
                    case "usuarios.tiempo-restante":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.tiempo-restante",
                                categoriaFormatted: "tiempoRestantePrueba"
                            }
                        });
                        break;
                    case "usuarios.etapa-actual":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "usuarios.etapa-actual",
                                categoriaFormatted: "etapaActualProceso"
                            }
                        });
                        break;
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
                    case "registro.email":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "registro-email",
                                categoriaFormatted: "email"
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
                    case "accion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "accion",
                                categoriaFormatted: "accion"
                            }
                        });
                        break;
                    case "fecha-realizacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "fecha-realizacion",
                                categoriaFormatted: "fechaRealizacion"
                            }
                        });
                        break;
                    case "id-evento":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "id-evento",
                                categoriaFormatted: "idEvento"
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

    handleSearch = (e, buscarNombre) => {
        const copiaElementos = [...this.state.usuarios[this.props.tipoUsuariosMostrados]];
        const searchTerm = e ? e.target.value : buscarNombre;

        this.setState({
            searchTerm: searchTerm
        });

        if (searchTerm === "" || searchTerm === null || searchTerm === undefined) {
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
                let values = Object.values(elem);
                if (this.props.userType === "AUDITORIA") {
                    Object.values(elem).forEach(val => {
                        rawValuesToSearchFrom.push(val);
                    });
                } else {
                    values.forEach(val => {
                        rawValuesToSearchFrom.push(val);
                    });
                }
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

    toggleViewingData = () => {
        this.setState({
            isViewingData: !this.state.isViewingData
        });
    }

    crearDataRelacionada = data => {
        this.dataRelacionada = (
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
                                                Object.keys(data).map(key => <TableCell className="text-center" key={key}>{t("auditoria." + key)}</TableCell>)
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                Object.values(data).map((val, i) => {
                                                    return <TableCell key={i}>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    {
                                                                        Object.keys(val).map(key => (
                                                                            <TableCell className="text-center" key={key}>{t("auditoria." + key)}</TableCell>
                                                                        ))
                                                                    }
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableRow>
                                                                    {
                                                                        Object.values(val).map((val, i) => (
                                                                            <TableCell className="text-center" key={i}>{val}</TableCell>
                                                                        ))
                                                                    }
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                })
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                        </Paper>
                    )
                }
            </Translation>
        );
    }

    verData = idEvento => {
        /* Conectarse al backend para traer los datos relacionados a este evento */
        const encontrado = this.state.usuarios[this.props.tipoUsuariosMostrados.toLowerCase()].find(usuario => usuario.idEvento === idEvento);
        
        this.crearDataRelacionada(encontrado.data);
        this.setState({
            activeID: idEvento,
            isViewingData: true
        });
    }

	render() {
        let tabla;
        let formularioEdicion;

        switch (this.props.userType) {
            case "AUDITORIA":
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
                                                            this.headCells.auditoria.map((title, i) => i < this.headCells.auditoria.length - 1 ? <TableCell key={i}>{t(title)}</TableCell> : null)
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
                                                                    this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length === 0 ? (
                                                                        <TableRow>
                                                                            <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                                <div className="d-flex align-items-center justify-content-center">
                                                                                    <Warning className="mr-2" fontSize="small"/>
                                                                                    {t("visorPerfiles.no-resultados")}
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ) : (
                                                                        <React.Fragment>
                                                                            {
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
                                                                                                        if (typeof val !== "object") {
                                                                                                            return <TableCell key={j}>{val}</TableCell>;
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                            <TableCell>
                                                                                                <Tooltip title={t("auditoria.label-ver")} placement="right">
                                                                                                    <OpenInBrowser color="primary" style={{cursor: "pointer"}} onClick={() => { this.verData(elemento[2]); }}/>
                                                                                                </Tooltip>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </React.Fragment>
                                                                    )
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
                break;
            case "SUPERADMIN":
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
                                                            this.headCells.superadmin.map((title, i) => <TableCell key={i}>{t(title)}</TableCell>)
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
                                                                    this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length === 0 ? (
                                                                        <TableRow>
                                                                            <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                                <div className="d-flex align-items-center justify-content-center">
                                                                                    <Warning className="mr-2" fontSize="small"/>
                                                                                    {t("visorPerfiles.no-resultados")}
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ) : (
                                                                        <React.Fragment>
                                                                            {
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
                                                                                                        if (keys[j] === "4") {
                                                                                                            return <TableCell key={j}>{val.split("-")[1]}</TableCell>;
                                                                                                        } else {
                                                                                                            return <TableCell key={j}>{val}</TableCell>;
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                            <TableCell>
                                                                                                <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(elemento.idNacional); }}/>
                                                                                                <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(elemento.idNacional); }}/>
                                                                                                <Link to={{
                                                                                                    pathname: "/dashboard-admin",
                                                                                                    state: {
                                                                                                        adminID: elemento.idNacional
                                                                                                    }
                                                                                                }} style={{textDecoration: "none"}}>
                                                                                                    <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                                                </Link>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </React.Fragment>
                                                                    )
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
                                    <Grid item xs={12} md={4}>
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
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1">{t("usuarios.registro-ee-telefono")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="telefono"
                                            value={this.state.editingForm.telefono}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">{t("registro.email")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="email"
                                            value={this.state.editingForm.email}
                                            onChange={this.handleEdicionChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1" className="mb-3">{t("usuarios.registro-pais")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.pais}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="pais"/>}
                                        >
                                            <MenuItem value="CO-Colombia">Colombia</MenuItem>
                                            <MenuItem value="VE-Venezuela">Venezuela</MenuItem>
                                            <MenuItem value="PA-Panama">Panamá</MenuItem>
                                            <MenuItem value="PE-Peru">Perú</MenuItem>
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
                                        <Typography variant="body1" className="mb-3">{t("usuarios.registro-departamento")}</Typography>
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
                                        <Typography variant="body1" className="mb-3">{t("usuarios.registro-municipio")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.municipio}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="municipio"/>}
                                        >
                                            { this.state.municipios }
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12}>
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
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case "ADMIN":
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
                                                            this.headCells.admin.map((title, i) => <TableCell key={i}>{t(title)}</TableCell>)
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
                                                                    this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length === 0 ? (
                                                                        <TableRow>
                                                                            <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                                <div className="d-flex align-items-center justify-content-center">
                                                                                    <Warning className="mr-2" fontSize="small"/>
                                                                                    {t("visorPerfiles.no-resultados")}
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ) : (
                                                                        <React.Fragment>
                                                                            {
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
                                                                                                        if (keys[j] === "2") {
                                                                                                            return <TableCell key={j}>{val.split("-")[1]}</TableCell>;
                                                                                                        } else {
                                                                                                            return <TableCell key={j}>{val}</TableCell>;
                                                                                                        }
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                            <TableCell>
                                                                                                <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(elemento.idNacional); }}/>
                                                                                                <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(elemento.idNacional); }}/>
                                                                                                <Link to={{
                                                                                                    pathname: "/dashboard-gobierno",
                                                                                                    state: {
                                                                                                        gobiernoID: elemento.idNacional
                                                                                                    }
                                                                                                }} style={{textDecoration: "none"}}>
                                                                                                    <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                                                </Link>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </React.Fragment>
                                                                    )
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
                                    <Grid item xs={12} md={4}>
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
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="body1" className="mb-3">{t("usuarios.registro-pais")}</Typography>
                                        <Select
                                            className="w-100"
                                            margin="none"
                                            value={this.state.editingForm.pais}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="pais"/>}
                                        >
                                            <MenuItem value="CO-Colombia">Colombia</MenuItem>
                                            <MenuItem value="VE-Venezuela">Venezuela</MenuItem>
                                            <MenuItem value="PA-Panama">Panamá</MenuItem>
                                            <MenuItem value="PE-Peru">Perú</MenuItem>
                                            <MenuItem value="EC-Ecuador">Ecuador</MenuItem>
                                            <MenuItem value="BO-Bolivia">Bolivia</MenuItem>
                                            <MenuItem value="PY-Paraguay">Paraguay</MenuItem>
                                            <MenuItem value="UY-Uruguay">Uruguay</MenuItem>
                                            <MenuItem value="CL-Chile">Chile</MenuItem>
                                            <MenuItem value="BR-Brasil">Brasil</MenuItem>
                                            <MenuItem value="AR-Argentina">Argentina</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
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
                                                                this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length === 0 ? (
                                                                    <TableRow>
                                                                        <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                            <div className="d-flex align-items-center justify-content-center">
                                                                                <Warning className="mr-2" fontSize="small"/>
                                                                                {t("visorPerfiles.no-resultados")}
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        {
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
                                                                                                    if (keys[j] === "2") {
                                                                                                        return <TableCell key={j}>{val.split("-")[1]}</TableCell>;
                                                                                                    } else {
                                                                                                        return <TableCell key={j}>{val}</TableCell>;
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        <TableCell>
                                                                                            <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(elemento.idNacional); }}/>
                                                                                            <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(elemento.idNacional); }}/>
                                                                                            <Link to={{
                                                                                                pathname: "/dashboard-ie",
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
                                                                        }
                                                                    </React.Fragment>
                                                                )
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
                                            <MenuItem value="PA-Panama">Panamá</MenuItem>
                                            <MenuItem value="PE-Peru">Perú</MenuItem>
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
                                                                    this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length === 0 ? (
                                                                    <TableRow>
                                                                        <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                            <div className="d-flex align-items-center justify-content-center">
                                                                                <Warning className="mr-2" fontSize="small"/>
                                                                                {t("visorPerfiles.no-resultados")}
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        {
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
                                                                                                    if (keys[j] === "2") {
                                                                                                        return <TableCell key={j}>{val.split("-")[1]}</TableCell>;
                                                                                                    } else {
                                                                                                        return <TableCell key={j}>{val}</TableCell>;
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        <TableCell>
                                                                                            <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { this.editUser(elemento.idNacional); }}/>
                                                                                            <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { this.deleteUser(elemento.idNacional); }}/>
                                                                                            <Link to={{
                                                                                                pathname: "/dashboard-ee",
                                                                                                state: {
                                                                                                    establecimientoID: elemento.idNacional
                                                                                                }
                                                                                            }} style={{textDecoration: "none"}}>
                                                                                                <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                                            </Link>
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                );
                                                                            })
                                                                        }
                                                                    </React.Fragment>
                                                                    )
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
                                <Grid container spacing={4} alignItems="flex-end">
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
                                        <Typography variant="body1">{t("usuarios.registro-idInstitucion")}</Typography>
                                        {/* Este valor debe actualizarse cuando se seleccione otra IE de la lista */}
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="idNacionalInstitucion"
                                            value={this.state.editingForm.idNacionalInstitucion}
                                            onChange={this.handleEdicionChange}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1">{t("usuarios.registro-nombreInstitucion")}</Typography>
                                        <Select
                                            className="w-100 mt-3"
                                            value={this.state.editingForm.nombreInstitucion}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="nombreInstitucion"/>}
                                        >
                                            {/* Aquí se debe solicitar al backend la lista de Instituciones correspondientes */}
                                            <MenuItem value="Institución John Doe">Institución John Doe</MenuItem>
                                            <MenuItem value="Institución Jane Doe">Institución Jane Doe</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography variant="body1" className="mb-3">{t("usuarios.registro-pais")}</Typography>
                                        <Select
                                            className="w-100"
                                            value={this.state.editingForm.pais}
                                            onChange={this.handleChangeLocationDropdown}
                                            input={<OutlinedInput required name="pais"/>}
                                        >
                                            <MenuItem value="CO-Colombia">Colombia</MenuItem>
                                            <MenuItem value="VE-Venezuela">Venezuela</MenuItem>
                                            <MenuItem value="PA-Panama">Panamá</MenuItem>
                                            <MenuItem value="PE-Peru">Perú</MenuItem>
                                            <MenuItem value="EC-Ecuador">Ecuador</MenuItem>
                                            <MenuItem value="BO-Bolivia">Bolivia</MenuItem>
                                            <MenuItem value="PY-Paraguay">Paraguay</MenuItem>
                                            <MenuItem value="UY-Uruguay">Uruguay</MenuItem>
                                            <MenuItem value="CL-Chile">Chile</MenuItem>
                                            <MenuItem value="BR-Brasil">Brasil</MenuItem>
                                            <MenuItem value="AR-Argentina">Argentina</MenuItem>
                                        </Select>
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
                                    <Grid item xs={12} md={6}>
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
                                    <Grid item xs={12} md={6}>
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
                                                                ) : this.state.elementosMostrados[this.props.tipoUsuariosMostrados].length === 0 ? (
                                                                    <TableRow>
                                                                        <TableCell colSpan={this.headCells[this.props.userType.toLowerCase()].length}>
                                                                            <div className="d-flex align-items-center justify-content-center">
                                                                                <Warning className="mr-2" fontSize="small"/>
                                                                                {t("visorPerfiles.no-resultados")}
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        {
                                                                            this.state.elementosMostrados[this.props.tipoUsuariosMostrados].slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((elemento, i) => {
                                                                                const values = Object.values(elemento);
                                                                                const keys = Object.keys(elemento);
                                                                                return (
                                                                                    <TableRow key={i}>
                                                                                        {
                                                                                            values.map((val, j) => {
                                                                                                switch (keys[j]) {
                                                                                                    case "etapaActualProceso":
                                                                                                        return <TableCell key={j}>{t(val)}</TableCell>;
                                                                                                    case "tiempoRestantePrueba":
                                                                                                        if (val === 0) {
                                                                                                            return <TableCell key={j}>{t("finalizada")}</TableCell>;
                                                                                                        } else {
                                                                                                            return <TableCell key={j}>{val}</TableCell>;
                                                                                                        }
                                                                                                    default:
                                                                                                        if (keys[j] === "4") {
                                                                                                            return <TableCell key={j}>{t(val)}</TableCell>;
                                                                                                        } else if (keys[j] === "3" && val === 0) {
                                                                                                            return <TableCell key={j}>{t("finalizada")}</TableCell>
                                                                                                        } else {
                                                                                                            return <TableCell key={j}>{val}</TableCell>;
                                                                                                        }
                                                                                                }
                                                                                            })
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
                                                                        }
                                                                    </React.Fragment>
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
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body1">{t("usuarios.tiempo-restante")}</Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="tiempoRestantePrueba"
                                            value={this.state.editingForm.tiempoRestantePrueba}
                                            onChange={this.handleEdicionChange}
                                            type="number"
                                            inputProps={{min: 0, step: 1}}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body1" className="mb-3">{t("usuarios.etapa-actual")}</Typography>
                                        <Select
                                            value={this.state.editingForm.etapaActualProceso}
                                            onChange={this.handleEdicionChange}
                                            input={<OutlinedInput required name="etapaActualProceso"/>}
                                            fullWidth
                                        >
                                            <MenuItem value={"procesoPaso.1"}>{t("procesoPaso.1")}</MenuItem>
                                            <MenuItem value={"procesoPaso.2"}>{t("procesoPaso.2")}</MenuItem>
                                            <MenuItem value={"procesoPaso.3"}>{t("procesoPaso.3")}</MenuItem>
                                            <MenuItem value={"procesoPaso.4"}>{t("procesoPaso.4")}</MenuItem>
                                        </Select>
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
                                    {
                                        this.props.userType !== "AUDITORIA" ? (
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
                                        ) : null
                                    }
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

                            <Dialog open={this.state.isViewingData} onClose={this.toggleViewingData} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
                                <DialogTitle id="form-dialog-title">{t("auditoria.label-datos")}</DialogTitle>
                                <DialogContent>
                                    { this.dataRelacionada }
                                </DialogContent>
                                <DialogActions>
                                    <Button color="primary" onClick={this.toggleViewingData}>{t("cerrar")}</Button>
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