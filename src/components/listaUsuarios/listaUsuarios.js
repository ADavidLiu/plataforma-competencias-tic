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
import Add from "@material-ui/icons/Add";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

import cursos from "../../models/cursos";

import { CircularProgress } from "@material-ui/core";

import Cursos from "./items/cursos/cursos";
import CursosForm from "./items/cursos/cursosForm";
import Auditoria from "./items/auditoria/auditoria";
import Instituciones from "./items/instituciones/instituciones";
import InstitucionesForm from "./items/instituciones/institucionesForm";
import Establecimientos from "./items/establecimientos/establecimientos";
import EstablecimientosForm from "./items/establecimientos/establecimientosForm";
import EvaluadoresGobiernos from "./items/evaluadores/evaluadores-gobiernos";
import EvaluadoresGobiernosForm from "./items/evaluadores/evaluadores-gobiernosForm";
import Docentes from "./items/docentes/docentes";
import DocentesForm from "./items/docentes/docentesForm";
import Admins from "./items/admins/admins";
import AdminsForm from "./items/admins/adminsForm";

class ListaUsuarios extends Component {
	constructor(props) {
        super(props);
        
        this.formularioPlaceholder = {};
        this.headCells = {
            cursos: ["usuarios.registro-idNacional", "cursos.new-nombre", "cursos.fecha-creacion", "usuarios.acciones"],
            auditoria: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "id-evento", "accion", "fecha-realizacion", "ver-data", "usuarios.acciones"],
            superadmin: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-ee-telefono", "registro.email", "usuarios.registro-pais", "usuarios.registro-departamento", "usuarios.registro-municipio", "usuarios.registro-ee-direccion", "usuarios.acciones"],
            admin: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-pais", "usuarios.acciones"],
            evaluadores: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-pais", "usuarios.acciones"],
            gobierno: ["usuarios.registro-idNacional", "usuarios.registro-nombre-ie", "usuarios.registro-pais", "usuarios.registro-departamento", "usuarios.registro-municipio", "usuarios.acciones"],
            institucion: ["usuarios.registro-idNacional", "usuarios.registro-ee-nombre", "usuarios.registro-idInstitucion", "usuarios.registro-nombreInstitucion", "usuarios.registro-pais", "usuarios.registro-ee-departamento", "usuarios.registro-ee-direccion", "usuarios.registro-ee-tipo-ubicacion", "usuarios.registro-ee-nombre-ubicacion", "usuarios.registro-ee-zona", "usuarios.registro-ee-regimen", "usuarios.registro-ee-telefono", "usuarios.registro-ee-email", "usuarios.registro-ee-web", "usuarios.acciones"],
            establecimiento: ["usuarios.registro-idNacional", "usuarios.registro-nombre-docente", "usuarios.registro-idEstablecimiento", "usuarios.tiempo-restante", "usuarios.etapa-actual", "usuarios.acciones"],
        };

        switch (props.userType) {
            case "CURSOS":
                this.formularioPlaceholder = {
                    id: "",
                    nombre: "",
                    fechaCreacion: "",
                    resumen: "",
                    mediacion: "false",
                    modalidad: "",
                    dedicacion: 0,
                    ubicacion: "",
                    institucion: "",
                    link: "",
                    nivel: "",
                    competencias: {
                        disenio: false,
                        implementacion: false,
                        evaluacion: false
                    },
                    requerimientos: {
                        internet: false,
                        computador: false,
                        mobile: false,
                        lms: false
                    },
                    descripcion: "",
                    objetivo: {
                        general: "",
                        especificos: [""]
                    },
                    descriptores: [""],
                    contenidos: [""],
                    metodologia: "",
                    procedimiento: [""],
                    evidencias: "",
                    criterios: [""],
                    observaciones: ""
                };
                break;
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
                    direccion: "",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: false
                    }
                };
                break;
            case "ADMIN":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    pais: "",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: false
                    }
                };
                break;
            case "GOBIERNO":
                this.formularioPlaceholder = {
                    idNacional: "",
                    nombre: "",
                    pais: "",
                    departamento: "",
                    municipio: "",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: false
                    }
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
                    etapaActualProceso: "",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: false
                    }
                };
                break;
            default:
                break;
        }

        this.mockData = {
            cursos: [...cursos],
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
                    direccion: "Calle 123 #45-67",
                    roles: {
                        admin: true,
                        gobierno: false,
                        evaluador: false,
                        docente: false
                    }
                },
                {
                    idNacional: "890123456",
                    nombre: "Nostrud duis mollit",
                    telefono: "321456789",
                    email: "mail@mail.com",
                    pais: "UY-Uruguay",
                    departamento: "Montevideo",
                    municipio: "Montevideo",
                    direccion: "Calle 89 #01-23",
                    roles: {
                        admin: true,
                        gobierno: false,
                        evaluador: false,
                        docente: false
                    }
                }
            ],
            gobiernos: [
                {
                    idNacional: "123098456",
                    nombre: "Esse nisi aute excepteur",
                    pais: "CO-Colombia",
                    roles: {
                        admin: false,
                        gobierno: true,
                        evaluador: false,
                        docente: false
                    }
                },
                {
                    idNacional: "098123765",
                    nombre: "Commodo consectetur sit magna ea",
                    pais: "VE-Venezuela",
                    roles: {
                        admin: false,
                        gobierno: true,
                        evaluador: false,
                        docente: false
                    }
                }
            ],
            evaluadores: [
                {
                    idNacional: "678123098",
                    nombre: "Nulla exercitation ex occaecat",
                    pais: "PA-Panama",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: true,
                        docente: false
                    }
                },
                {
                    idNacional: "456321789",
                    nombre: "Adipisicing aliqua mollit",
                    pais: "CL-Chile",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: true,
                        docente: false
                    }
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
                    etapaActualProceso: "procesoPaso.1",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "123456980",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 0,
                    etapaActualProceso: "procesoPaso.1",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "098123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 2000,
                    etapaActualProceso: "procesoPaso.2",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "456789123",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 4000,
                    etapaActualProceso: "procesoPaso.3",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "098890123",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 5400,
                    etapaActualProceso: "procesoPaso.1",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "7651234890",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 1000,
                    etapaActualProceso: "procesoPaso.1",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "321123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 750,
                    etapaActualProceso: "procesoPaso.2",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "890098765",
                    nombreCompleto: "Jane Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 200,
                    etapaActualProceso: "procesoPaso.3",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
                {
                    idNacional: "432123456",
                    nombreCompleto: "John Doe",
                    idEstablecimiento: "0981237654",
                    tiempoRestantePrueba: 100,
                    etapaActualProceso: "procesoPaso.4",
                    roles: {
                        admin: false,
                        gobierno: false,
                        evaluador: false,
                        docente: true
                    }
                },
            ]
        }

        this.dataRelacionada = "";

		this.state = {
            isLoading: true,
            isEditing: false,
            isDeleting: false,
            isDeletingCourses: false,
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
    
    toggleDeletingCourse = () => {
        this.setState({
            isDeletingCourses: !this.state.isDeletingCourses
        });
    }

    deleteUser = id => {
        switch (this.props.userType) {
            case "CURSOS":
                this.setState({
                    isDeletingCourses: true,
                    activeID: id
                });
                break;
            default:
                this.setState({
                    isDeleting: true,
                    activeID: id
                });
                break;
        }
    }

    confirmUserDeletion = () => {
        let key = "idNacional";

        switch (this.props.userType) {
            case "CURSOS":
                this.toggleDeletingCourse();
                key = "id";
                break;
            default:
                this.toggleDeleting();
                break;
        }

        /* Conectarse al backend para hacer los cambios */

        /* Luego, eliminarlo visualmente de la interfaz */
        let newUsuarios = [...this.state.usuarios[this.props.tipoUsuariosMostrados]];
        newUsuarios = newUsuarios.filter(usuario => usuario[key] !== this.state.activeID);

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
            case "CURSOS":
                const encontradoCursos = this.state.usuarios.cursos.find(curso => curso.id === id);

                this.setState({
                    activeID: id,
                    editingForm: encontradoCursos
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
                        direccion: encontrado.direccion,
                        roles: encontrado.roles
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
                        pais: encontrado.pais,
                        roles: encontrado.roles
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
                        municipio: encontrado.municipio,
                        roles: encontrado.roles
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
                        etapaActualProceso: encontrado.etapaActualProceso,
                        roles: encontrado.roles
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
        if (e.target.name === "tiempoRestantePrueba" && e.target.value === "0") {
            e.target.value = "Finalizada";
        }

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
                    case "ID":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "ID",
                                categoriaFormatted: "id"
                            }
                        });
                        break;
                    case "cursos.new-nombre":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "cursos.new-nombre",
                                categoriaFormatted: "nombre"
                            }
                        });
                        break;
                    case "cursos.fecha-creacion":
                        this.setState({
                            filtros: {
                                ...this.state.filtros,
                                categoria: "cursos.fecha-creacion",
                                categoriaFormatted: "fechaCreacion"
                            }
                        });
                        break;
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
                switch (this.props.userType) {
                    case "AUDITORIA":
                        Object.values(elem).forEach(val => {
                            rawValuesToSearchFrom.push(val);
                        });
                        break;
                    case "CURSOS":
                        Object.values(elem).forEach((val, i) => {
                            if (i < 4) {
                                rawValuesToSearchFrom.push(val);
                            }
                        });
                        break;
                    default:
                        values.forEach(val => {
                            rawValuesToSearchFrom.push(val);
                        });
                        break;
                }
            });

            let maxLength = 0;
            switch (this.props.userType) {
                case "CURSOS":
                    maxLength = 4;
                    break;
                default:
                    maxLength = this.headCells[this.props.userType.toLowerCase()].length - 1;
                    break;
            }

            for (let i = 0; i < rawValuesToSearchFrom.length; i += maxLength) {
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

    handleInputChange = (e, index) => {
        const updatedCourses = [...this.state.usuarios.cursos];
        const indexEncontrado = updatedCourses.findIndex(course => course.id === this.state.activeID);
        
        if (e.target.name.includes(".")) {
            const key = e.target.name.split(".")[0];
            const value = e.target.name.split(".")[1];
            
            switch (key) {
                case "competencias":
                case "requerimientos":
                    updatedCourses[indexEncontrado][key][value] = e.target.checked;
                    break;
                case "objetivo":
                    switch (value) {
                        case "general":
                            updatedCourses[indexEncontrado][key][value] = e.target.value;
                            break;
                        case "especificos":
                            updatedCourses[indexEncontrado][key][value][index.j] = e.target.value;
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (e.target.name) {
                case "descriptores":
                    updatedCourses[indexEncontrado][e.target.name][index.j] = e.target.value.toUpperCase();
                    break;
                case "contenidos":
                case "procedimiento":
                case "criterios":
                    updatedCourses[indexEncontrado][e.target.name][index.j] = e.target.value;
                    break;
                case "mediacion":
                    updatedCourses[indexEncontrado][e.target.name] = e.target.value.toString();
                    break;
                default:
                    updatedCourses[indexEncontrado][e.target.name] = e.target.value;
                    this.setState({
                        editingForm: {
                            ...this.state.editingForm,
                            [e.target.name]: e.target.value
                        }
                    });
                    break;
            }
        }

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                cursos: updatedCourses
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                cursos: updatedCourses
            }
        });
    }

    createNewCourseElement = tipo => {
        const updatedCourses = [...this.state.usuarios.cursos];
        const index = updatedCourses.findIndex(curso => curso.id === this.state.activeID);
        updatedCourses[index][tipo].push("");

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                cursos: updatedCourses
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                cursos: updatedCourses
            },
            editingForm: {
                ...this.state.editingForm,
                cursos: updatedCourses
            }
        });
    }

    deleteNewCourseElement = (categoria, index) => {
        const updatedCourses = [...this.state.usuarios.cursos];
        const indexEncontrado = updatedCourses.findIndex(curso => curso.id === this.state.activeID);
        updatedCourses[indexEncontrado][categoria].splice(index.j, 1);

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                cursos: updatedCourses
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                cursos: updatedCourses
            },
            editingForm: {
                ...this.state.editingForm,
                cursos: updatedCourses
            }
        });
    }

    createNewObjetivoEspecifico = index => {
        const updatedCourses = [...this.state.usuarios.cursos];
        const indexEncontrado = updatedCourses.findIndex(curso => curso.id === this.state.activeID);
        updatedCourses[indexEncontrado].objetivo.especificos.push("");

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                cursos: updatedCourses
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                cursos: updatedCourses
            },
            editingForm: {
                ...this.state.editingForm,
                cursos: updatedCourses
            }
        });
    }

    deleteObjetivoEspecifico = index => {
        const updatedCourses = [...this.state.usuarios.cursos];
        const indexEncontrado = updatedCourses.findIndex(curso => curso.id === this.state.activeID);
        updatedCourses[indexEncontrado].objetivo.especificos.splice(index.j, 1);

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                cursos: updatedCourses
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                cursos: updatedCourses
            },
            editingForm: {
                ...this.state.editingForm,
                cursos: updatedCourses
            }
        });
    }

    updateRoles = e => {
        const newUsers = [...this.state.usuarios[this.props.tipoUsuariosMostrados]];
        const found = newUsers.find(user => user.idNacional === this.state.activeID);
        found.roles[e.target.name] = e.target.checked;

        this.setState({
            usuarios: {
                ...this.state.usuarios,
                [e.target.name]: newUsers
            },
            elementosMostrados: {
                ...this.state.elementosMostrados,
                [e.target.name]: newUsers
            }
        });
    }

	render() {
        let tabla;
        let formularioEdicion;

        switch (this.props.userType) {
            case "CURSOS":
                tabla = <Cursos headCells={this.headCells} usuarios={this.state.usuarios} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} isFiltering={this.state.isFiltering} userType={this.props.userType} elementosMostrados={this.state.elementosMostrados} page={this.state.page} rowsPerPage={this.state.rowsPerPage} editUser={this.editUser} deleteUser={this.deleteUser} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />

                formularioEdicion = <CursosForm editingForm={this.state.editingForm} handleInputChange={this.handleInputChange} createNewObjetivoEspecifico={this.createNewObjetivoEspecifico} createNewCourseElement={this.createNewCourseElement} deleteObjetivoEspecifico={this.deleteObjetivoEspecifico} deleteNewCourseElement={this.deleteNewCourseElement} />
                break;
            case "AUDITORIA":
                tabla = <Auditoria headCells={this.headCells} usuarios={this.state.usuarios} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} isFiltering={this.state.isFiltering} userType={this.props.userType} elementosMostrados={this.state.elementosMostrados} page={this.state.page} rowsPerPage={this.state.rowsPerPage} verData={this.verData} handleChangeRowsPerPage={this.handleChangeRowsPerPage} handleChangePage={this.handleChangePage} />;
                break;
            case "SUPERADMIN":
                tabla = <Admins headCells={this.headCells} usuarios={this.state.usuarios} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} isFiltering={this.state.isFiltering} userType={this.props.userType} elementosMostrados={this.state.elementosMostrados} page={this.state.page} rowsPerPage={this.state.rowsPerPage} editUser={this.editUser} deleteUser={this.deleteUser} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />;

                formularioEdicion = <AdminsForm editingForm={this.state.editingForm} handleEdicionChange={this.handleEdicionChange} handleChangeLocationDropdown={this.handleChangeLocationDropdown} departamentos={this.state.departamentos} municipios={this.state.municipios} />;
                break;
            case "ADMIN":
                tabla = <EvaluadoresGobiernos headCells={this.headCells} usuarios={this.state.usuarios} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} isFiltering={this.state.isFiltering} userType={this.state.userType} elementosMostrados={this.state.elementosMostrados} page={this.state.page} rowsPerPage={this.state.rowsPerPage} editUser={this.editUser} deleteUser={this.deleteUser} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />;

                formularioEdicion = <EvaluadoresGobiernosForm editingForm={this.state.editingForm} handleEdicionChange={this.handleEdicionChange} handleChangeLocationDropdown={this.handleChangeLocationDropdown} />;
                break;
            case "GOBIERNO":
                tabla = <Instituciones headCells={this.headCells} usuarios={this.state.usuarios} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} isFiltering={this.state.isFiltering} userType={this.props.userType} elementosMostrados={this.state.elementosMostrados} page={this.state.page} rowsPerPage={this.state.rowsPerPage} editUser={this.editUser} deleteUser={this.deleteUser} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />;

                formularioEdicion = <InstitucionesForm editingForm={this.state.editingForm} handleEdicionChange={this.handleEdicionChange} handleChangeLocationDropdown={this.handleChangeLocationDropdown} municipios={this.state.municipios} departamentos={this.state.departamentos} />;
                break;
            case "INSTITUCION":
                tabla = <Establecimientos headCells={this.headCells} usuarios={this.state.usuarios} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} isFiltering={this.state.isFiltering} userType={this.props.userType} elementosMostrados={this.state.elementosMostrados} page={this.state.page} rowsPerPage={this.state.rowsPerPage} editUser={this.editUser} deleteUser={this.deleteUser} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />;

                formularioEdicion = <EstablecimientosForm editingForm={this.state.editingForm} handleEdicionChange={this.handleEdicionChange} handleChangeLocationDropdown={this.handleChangeLocationDropdown} departamentos={this.state.departamentos} municipios={this.state.municipios} />;
                break;
            case "ESTABLECIMIENTO":
                tabla = <Docentes headCells={this.headCells} usuarios={this.state.usuarios} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} isFiltering={this.state.isFiltering} userType={this.props.userType} elementosMostrados={this.state.elementosMostrados} tipoUsuariosMostrados={this.props.tipoUsuariosMostrados} page={this.state.page} rowsPerPage={this.state.rowsPerPage} editUser={this.editUser} deleteUser={this.deleteUser} handleChangePage={this.handleChangePage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />;

                formularioEdicion = <DocentesForm editingForm={this.state.editingForm} handleEdicionChange={this.handleEdicionChange} updateRoles={this.updateRoles} />;
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

                            <Dialog open={this.state.isDeletingCourses} onClose={this.toggleDeletingCourse} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">{t("cursos.eliminar-titulo")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <strong>{t("cursos.eliminar-ayuda-1")}</strong>
                                        <br/>
                                        {t("cursos.eliminar-ayuda-2")}
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