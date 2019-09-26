import React, { Component } from "react";

import locationData from "countrycitystatejson";
import * as XLSX from "xlsx";

import { Translation, Trans } from "react-i18next";

import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Warning from "@material-ui/icons/Warning";
import Delete from "@material-ui/icons/Delete";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import CircularProgress from "@material-ui/core/CircularProgress";

class AgregarUsuarios extends Component {
    constructor(props) {
        super(props);

        this.intialState = {
            divisionMostrada: 0,
            numNuevosUsuarios: 1,
            isUploading: false,
            basesDeDatos: [],
            nuevosUsuarios: [],
            nuevoAdmin: {
                idNacional: "",
                nombre: "",
                telefono: "",
                email: "",
                direccion: ""
            },
            nuevoEvaluador: {
                idNacional: "",
                nombre: "",
                pais: ""
            },
            nuevoGobierno: {
                idNacional: "",
                nombre: "",
                pais: ""
            },
            nuevaInstitucion: {
                pais: "",
                departamento: "",
                municipio: "",
                nombre: "",
                idNacional: ""
            },
            nuevoEstablecimiento: {
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
                sitioWeb: "",
                idNacional: ""
            },
            nuevoDocente: {
                idNacional: "",
                nombreCompleto: "",
                idEstablecimiento: ""
            },
            paisCodigoInstitucion: "CO",
            paisesSeleccionados: [],
            departamentosEncontrados: [],
            municipiosEncontrados: []
        }

        this.state = this.intialState;

        this.crearPlaceholderUsuario();
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue
        });
    }

    crearPlaceholderUsuario = () => {
        switch (this.props.userType) {
            case "SUPERADMIN":
                this.state.nuevosUsuarios.push({
                    idNacional: "",
                    nombre: "",
                    telefono: "",
                    email: "",
                    pais: "",
                    departamento: "",
                    municipio: "",
                    direccion: ""
                });
                break;
            case "ADMIN":
                this.state.nuevosUsuarios.push({
                    idNacional: "",
                    nombre: "",
                    pais: "",
                    tipo: ""
                });
                break;
            case "GOBIERNO":
                this.state.nuevosUsuarios.push({
                    idNacional: "",
                    nombre: "",
                    pais: "",
                    departamento: "",
                    municipio: ""
                });
                break;
            case "INSTITUCION":
                this.state.nuevosUsuarios.push({
                    idNacional: "",
                    nombre: "",
                    idInstitucion: "",
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
                });
                break;
            case "ESTABLECIMIENTO":
                this.state.nuevosUsuarios.push({
                    idNacional: "",
                    nombreCompleto: "",
                    idEstablecimiento: ""
                });
                break;
            default:
                break;
        }
    }

    agregarPosicion = () => {
        this.crearPlaceholderUsuario();
        this.state.paisesSeleccionados.push({
            nombre: "",
            codigo: ""
        });
        this.state.departamentosEncontrados.push([]);
        this.state.municipiosEncontrados.push([]);

        this.setState({
            numNuevosUsuarios: this.state.numNuevosUsuarios + 1
        });
    }

    eliminarPosicion = () => {
        this.state.nuevosUsuarios.splice(this.state.nuevosUsuarios.length - 1, 1);
        this.state.paisesSeleccionados.splice(this.state.paisesSeleccionados.length - 1, 1);
        this.state.departamentosEncontrados.splice(this.state.departamentosEncontrados.length - 1, 1);
        this.state.municipiosEncontrados.splice(this.state.municipiosEncontrados.length - 1, 1);

        this.setState({
            numNuevosUsuarios: this.state.numNuevosUsuarios - 1
        });
    }

    crearUsuarios = type => {
        console.log("Creados!");
        let isSuccess = false;
        /* Enviar la información al backend */

        if (type === "MASIVO") {
            /* Si es de manera masiva */
            console.log("Masivo");
            isSuccess = true;
        } else {
            /* Si es de manera manual */
            console.log("Manual");
            isSuccess = true;
        }

        if (isSuccess) {
            /* Después de que se reciba la notificación 200, borrar todo */
            this.setState({
                ...this.intialState
            });
        }
    }

    handleLocationDropdowns = (e, index) => {
        switch (e.target.name) {
            case "pais":
                const copiaDptos = [...this.state.departamentosEncontrados];
                const copiaMuns = [...this.state.municipiosEncontrados];
                copiaDptos[index] = [];
                copiaMuns[index] = [];

                this.setState({
                    departamentosEncontrados: copiaDptos,
                    municipiosEncontrados: copiaMuns
                });

                const value = e.target.value.split("-");
                const states = locationData.getStatesByShort(value[0]);

                let newStateStates = [...this.state.departamentosEncontrados];
                newStateStates[index] = states;

                let newStatePaisesSeleccionados = [...this.state.paisesSeleccionados];
                newStatePaisesSeleccionados[index] = {
                    nombre: value[1],
                    codigo: value[0]
                };

                this.setState({
                    paisesSeleccionados: newStatePaisesSeleccionados,
                    departamentosEncontrados: newStateStates
                });
                break;
            case "departamento":
                const cities = locationData.getCities(this.state.paisesSeleccionados[index].codigo, e.target.value);
                
                let newStateCities = [...this.state.municipiosEncontrados];
                newStateCities[index] = cities;

                this.setState({
                    municipiosEncontrados: newStateCities
                });
                break;
            default:
                break;
        }
    }

    actualizarDatosNuevos = (e, tipoUsuarioCreado, index) => {
        const copiaNuevosUsuarios = [...this.state.nuevosUsuarios];
        copiaNuevosUsuarios[index] = {
            ...this.state.nuevosUsuarios[index],
            [e.target.name]: e.target.value
        };

        this.setState({
            nuevosUsuarios: copiaNuevosUsuarios
        });

        switch (tipoUsuarioCreado) {
            case "ADMIN":
                this.setState({
                    nuevoAdmin: {
                        ...this.state.nuevoAdmin,
                        [e.target.name]: e.target.value
                    }
                });

                this.handleLocationDropdowns(e, index);
                break;
            case "INSTITUCION":
                this.setState({
                    nuevaInstitucion: {
                        ...this.state.nuevaInstitucion,
                        [e.target.name]: e.target.value
                    }
                });

                this.handleLocationDropdowns(e, index);
                break;
            case "ESTABLECIMIENTO":
                this.setState({
                    nuevoEstablecimiento: {
                        ...this.state.nuevoEstablecimiento,
                        [e.target.name]: e.target.value
                    }
                });

                this.handleLocationDropdowns(e, index);
                break;
            case "DOCENTE":
                this.setState({
                    nuevoDocente: {
                        ...this.state.nuevoDocente,
                        [e.target.name]: e.target.value
                    }
                });
                break;
            default:
                break;
        }
    }

    leerArchivo = (e, index) => {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.onprogress = e => {
            this.setState({
                isUploading: true
            });
        }

        fileReader.onabort = e => {
            this.setState({
                isUploading: false
            });
        }

        fileReader.onerror = e => {
            this.setState({
                isUploading: false
            });
        }

        fileReader.onloadend = e => {
            const newBasesDeDatos = [...this.state.basesDeDatos];

            const binario = e.target.result;
            const wb = XLSX.read(binario, {type:"binary"});

            const hoja = wb.SheetNames[0];
            const datos = wb.Sheets[hoja];
            const parseado = XLSX.utils.sheet_to_json(datos, {header:1, blankrows: false});
            const finalObjects = [];
            let keys = [];
            
            switch (this.props.userType) {
                case "SUPERADMIN":
                    keys = ["idNacional", "nombre", "telefono", "email", "pais", "departamento", "municipio", "direccion"];
                    break;
                case "ADMIN":
                    keys = ["idNacional", "nombre", "pais"];
                    break;
                case "GOBIERNO":
                    keys = ["idNacional", "nombre", "pais", "departamento", "municipio"];
                    break;
                case "INSTITUCION":
                    keys = ["idNacional", "nombre", "idInstitucion", "nombreInstitucion", "pais", "departamento", "direccion", "tipoUbicacion", "nombreUbicacion", "zona", "regimen", "telefono", "email", "web"];
                    break;
                case "ESTABLECIMIENTO":
                    keys = ["idNacional", "nombre", "idSede"];
                    break;
                default:
                    break;
            }

            parseado.forEach((row, i) => {
                finalObjects.push({});
                if (i !== 0) {
                    row.forEach((cell, j) => {
                        finalObjects[i][keys[j]] = cell;
                    });
                }
            });

            /* Eliminar la primera fila vacía */
            finalObjects.splice(0, 1);
            const newBD = {
                file: file,
                binaryString: fileReader.result,
                nombre: file.name,
                data: finalObjects
            }

            if (this.props.userType === "ADMIN") {
                newBD = {
                    ...newBD,
                    tipo: ""
                }
            }

            newBasesDeDatos.push(newBD);

            this.setState({
                isUploading: false,
                basesDeDatos: newBasesDeDatos
            });
        };

        if (file) {
            fileReader.readAsBinaryString(file);
        }
    }

    eliminarArchivo = index => {
        const newBasesDeDatos = [...this.state.basesDeDatos];
        newBasesDeDatos.splice(index, 1);
        
        this.setState({
            basesDeDatos: newBasesDeDatos
        });
    }

    actualizarTipoBD = (e, index) => {
        const newBasesDeDatos = [...this.state.basesDeDatos];
        newBasesDeDatos[index].tipo = e.target.value;

        this.setState({
            basesDeDatos: newBasesDeDatos
        });
    }

    render() {
        const itemsUsers = [];
        let states = [];
        let cities = [];

        if (this.props.userType === "INSTITUCION") {
            const dptosEncontrados = locationData.getStatesByShort(this.state.paisCodigoInstitucion);

            this.state.departamentosEncontrados.push(dptosEncontrados);
        }

        this.state.departamentosEncontrados.forEach((item, i) => {
            states[i] = [];
            item.forEach((dpto, j) => {
                states[i].push(<MenuItem key={dpto} value={dpto}>{dpto}</MenuItem>);
            });
        });
        this.state.municipiosEncontrados.forEach((item, i) => {
            cities[i] = [];
            item.forEach((municipio, j) => {
                cities[i].push(<MenuItem key={municipio} value={municipio}>{municipio}</MenuItem>);
            });
        });
        
        switch (this.props.userType) {
            case "SUPERADMIN":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Translation key={i}>
                            {
                                t => (
                                    <Paper className="p-4 mb-3">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3} alignItems="flex-end">
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-idNacional")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="idNacional"
                                                            value={this.state.nuevosUsuarios[i].idNacional}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-nombre-ie")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="nombre"
                                                            value={this.state.nuevosUsuarios[i].nombre}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-telefono")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="telefono"
                                                            value={this.state.nuevosUsuarios[i].telefono}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("registro.email")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="email"
                                                            value={this.state.nuevosUsuarios[i].email}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-pais")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].pais}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
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
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-departamento")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].departamento}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
                                                            input={<OutlinedInput required name="departamento"/>}
                                                        >
                                                            { states[i] }
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-municipio")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].municipio}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
                                                            input={<OutlinedInput required name="municipio"/>}
                                                        >
                                                            { cities[i] }
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-direccion")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="direccion"
                                                            value={this.state.nuevosUsuarios[i].direccion}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ADMIN", i); }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Translation>
                    );
                }
                break;
            case "ADMIN":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Translation key={i}>
                            {
                                t => (
                                    <Paper className="p-4 mb-3">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3} alignItems="flex-end">
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-idNacional")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="idNacional"
                                                            value={this.state.nuevosUsuarios[i].idNacional}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "GOBIERNO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-nombre-ie")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="nombre"
                                                            value={this.state.nuevosUsuarios[i].nombre}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "GOBIERNO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-pais")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].pais}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "GOBIERNO", i); }}
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
                                                    {
                                                        this.props.userType === "ADMIN" ? (
                                                            <Grid item xs={12} md={4}>
                                                                <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.tipo-registro")}</strong></Typography>
                                                                <RadioGroup
                                                                    className="d-flex align-items-center justify-content-around"
                                                                    row
                                                                    name="tipo"
                                                                    value={this.state.nuevosUsuarios[i].tipo}
                                                                    onChange={e => { this.actualizarDatosNuevos(e, "GOBIERNO", i); }}
                                                                >
                                                                    <FormControlLabel
                                                                        value="EVALUADOR"
                                                                        control={<Radio color="primary" />}
                                                                        label={t("evaluadores")}
                                                                        labelPlacement="end"
                                                                    />
                                                                    <FormControlLabel
                                                                        value="GOBIERNO"
                                                                        control={<Radio color="primary" />}
                                                                        label={t("gobiernos")}
                                                                        labelPlacement="end"
                                                                    />
                                                                </RadioGroup>
                                                            </Grid>
                                                        ) : null
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Translation>
                    );
                }
                break;
            case "EVALUADOR":

                break;
            case "GOBIERNO":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Translation key={i}>
                            {
                                t => (
                                    <Paper className="p-4 mb-3">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3} alignItems="flex-end">
                                                    <Grid item xs={6} md={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-idNacional")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="idNacional"
                                                            value={this.state.nuevosUsuarios[i].idNacional}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={3}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-nombre-ie")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="nombre"
                                                            value={this.state.nuevosUsuarios[i].nombre}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-pais")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].pais}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
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
                                                    <Grid item xs={6} md={3}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-departamento")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].departamento}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                                            input={<OutlinedInput required name="departamento"/>}
                                                        >
                                                            { states[i] }
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-municipio")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].municipio}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "INSTITUCION", i); }}
                                                            input={<OutlinedInput required name="municipio"/>}
                                                        >
                                                            { cities[i] }
                                                        </Select>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Translation>
                    );
                }
                break;
            case "INSTITUCION":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Translation key={i}>
                            {
                                t => (
                                    <Paper className="p-4 mb-3">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3} alignItems="flex-end">
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-id")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="idNacional"
                                                            value={this.state.nuevosUsuarios[i].idNacional}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-nombre")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="nombre"
                                                            value={this.state.nuevosUsuarios[i].nombre}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-idInstitucion")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="idInstitucion"
                                                            value={this.state.nuevosUsuarios[i].idInstitucion}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-nombreInstitucion")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="nombreInstitucion"
                                                            value={this.state.nuevosUsuarios[i].nombreInstitucion}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-pais")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].pais}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
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
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="text-center"><strong>{t("usuarios.registro-ee-departamento")}</strong></Typography>
                                                        <Select
                                                            className="w-100 mt-3"
                                                            value={this.state.nuevosUsuarios[i].departamento}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                            input={<OutlinedInput required name="departamento"/>}
                                                        >
                                                            { states[i] }
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-direccion")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="direccion"
                                                            value={this.state.nuevosUsuarios[i].direccion}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-tipo-ubicacion")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].tipoUbicacion}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                            input={<OutlinedInput required name="tipoUbicacion"/>}
                                                        >
                                                            <MenuItem value="Barrio">{t("barrio")}</MenuItem>
                                                            <MenuItem value="Localidad">{t("localidad")}</MenuItem>
                                                            <MenuItem value="Vereda">{t("vereda")}</MenuItem>
                                                            <MenuItem value="Corregimiento">{t("corregimiento")}</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-nombre-ubicacion")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="nombreUbicacion"
                                                            value={this.state.nuevosUsuarios[i].nombreUbicacion}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-zona")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].zona}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                            input={<OutlinedInput required name="zona"/>}
                                                        >
                                                            <MenuItem value="Rural">{t("rural")}</MenuItem>
                                                            <MenuItem value="Urbana">{t("urbana")}</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-regimen")}</strong></Typography>
                                                        <Select
                                                            className="w-100"
                                                            value={this.state.nuevosUsuarios[i].regimen}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                            input={<OutlinedInput required name="regimen"/>}
                                                        >
                                                            <MenuItem value="Oficial">{t("oficial")}</MenuItem>
                                                            <MenuItem value="Privado">{t("privado")}</MenuItem>
                                                            <MenuItem value="Concesión">{t("concesion")}</MenuItem>
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={6} md={4} lg={2}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-telefono")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="telefono"
                                                            value={this.state.nuevosUsuarios[i].telefono}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-email")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="emailInstitucional"
                                                            value={this.state.nuevosUsuarios[i].emailInstitucional}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-ee-web")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="sitioWeb"
                                                            value={this.state.nuevosUsuarios[i].sitioWeb}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "ESTABLECIMIENTO", i); }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Translation>
                    );
                }
                break;
            case "ESTABLECIMIENTO":
                for (let i = 0; i < this.state.numNuevosUsuarios; i++) {
                    itemsUsers.push(
                        <Translation key={i}>
                            {
                                t => (
                                    <Paper className="p-4 mb-3">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3} alignItems="flex-end">
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-idNacional")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="idNacional"
                                                            value={this.state.nuevosUsuarios[i].idNacional}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "DOCENTE", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-nombre-docente")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="nombreCompleto"
                                                            value={this.state.nuevosUsuarios[i].nombreCompleto}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "DOCENTE", i); }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Typography variant="body1" className="mb-3 text-center"><strong>{t("usuarios.registro-idEstablecimiento")}</strong></Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            name="idEstablecimiento"
                                                            value={this.state.nuevosUsuarios[i].idEstablecimiento}
                                                            onChange={e => { this.actualizarDatosNuevos(e, "DOCENTE", i); }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )
                            }
                        </Translation>
                    );
                }
                break;
            case "DOCENTE":
            default:
                break;
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Paper className="mb-3">
                                <Tabs
                                    variant="scrollable"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    value={this.state.divisionMostrada}
                                    onChange={this.handleTabChange}
                                >
                                    <Tab label={t("usuarios.btn-carga-manual")}/>
                                    <Tab label={t("usuarios.btn-carga-masivo")}/>
                                </Tabs>
                            </Paper>
                            {
                                this.state.divisionMostrada === 0 ? (
                                    <Grid container>
                                        <Grid item xs={12}>
                                            { itemsUsers }
                                        </Grid>
                                        <Grid item xs={6} className="mt-4">
                                            {
                                                this.state.numNuevosUsuarios > 1 ? (
                                                    <Button color="primary" variant="outlined" size="large" className="mr-3" onClick={this.eliminarPosicion}><Remove/></Button>
                                                ) : ""
                                            }
                                            <Button color="primary" variant="outlined" size="large" onClick={this.agregarPosicion}><Add/></Button>
                                        </Grid>
                                        <Grid item xs={6} className="text-right mt-4">
                                            <Button color="primary" variant="contained" size="large" onClick={() => { this.crearUsuarios("MANUAL"); }}>{t("usuarios.registro-btn-agregar")}</Button>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={5} className="mt-4">
                                        <Grid item xs={12} className="pb-0">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <Typography variant="h6">{t("usuarios.label-archivos-seleccionados")}</Typography>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    color="primary"
                                                >
                                                    <Add />
                                                    <input type="file" required accept=".xlsm,.xlsx" onChange={this.leerArchivo} style={{ display: "none" }} />
                                                </Button>
                                            </div>
                                            <hr/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {
                                                this.state.basesDeDatos.length === 0 ? (
                                                    <div className="d-md-flex align-items-center justify-content-center text-center">
                                                        <Warning className="mb-2 mb-md-0 mr-md-2"/>
                                                        <Typography variant="body2" className="text-md-left">
                                                            <em>
                                                                <Trans i18nKey="usuarios.cargar-ayuda">
                                                                    Dé click en el <strong></strong> en la esquina superior derecha para seleccionar los archivos. Recuerde que sólo se aceptan los formatos <strong></strong> y <strong></strong>.
                                                                </Trans>
                                                            </em>
                                                        </Typography>
                                                    </div>
                                                ) : (
                                                    <React.Fragment>
                                                        {
                                                            this.state.isUploading ? <CircularProgress color="primary" className="d-block mx-auto mb-3" /> : null
                                                        }
                                                        {
                                                            this.state.basesDeDatos.map((archivo, i) => {
                                                                return (
                                                                    <React.Fragment key={i}>
                                                                        <div className="d-flex align-items-center justify-content-between mb-1">
                                                                            <Typography variant="body1"><em>{archivo.nombre}</em></Typography>
                                                                            <Delete style={{cursor:"pointer"}} onClick={() => { this.eliminarArchivo(i); }} />
                                                                        </div>
                                                                        <Paper className={this.props.userType === "ADMIN" ? "py-4 py-md-2 px-4 my-3" : "px-4 py-3 my-3"}>
                                                                            <div className="d-md-flex align-items-center justify-content-start">
                                                                                <Typography variant="body2" className="mr-md-3 mb-3 mb-md-0">
                                                                                    {
                                                                                         this.props.userType === "ADMIN" ? (
                                                                                            <Trans i18nKey="usuarios.carga-encontrados-opciones" count={archivo.data.length}>
                                                                                                Se encontraron <strong>{{archivo}}</strong> registros. Seleccione el tipo de usuarios cargados:
                                                                                            </Trans>
                                                                                         ) : (
                                                                                            <Trans i18nKey="usuarios.carga-encontrados" count={archivo.data.length}>
                                                                                                Se encontraron <strong>{{archivo}}</strong> usuarios.
                                                                                            </Trans>
                                                                                         )
                                                                                    }
                                                                                </Typography>
                                                                                {
                                                                                    this.props.userType === "ADMIN" ? (
                                                                                        <RadioGroup
                                                                                            className="d-flex align-items-center justify-content-start"
                                                                                            row
                                                                                            name="tipo"
                                                                                            value={this.state.basesDeDatos[i].tipo}
                                                                                            onChange={e => { this.actualizarTipoBD(e, i); }}
                                                                                        >
                                                                                            <FormControlLabel
                                                                                                className="m-0"
                                                                                                value="EVALUADOR"
                                                                                                control={<Radio color="primary" />}
                                                                                                label={<Typography variant="body2">{t("evaluadores")}</Typography>}
                                                                                                labelPlacement="end"
                                                                                            />
                                                                                            <FormControlLabel
                                                                                                className="my-0 mx-3"
                                                                                                value="GOBIERNO"
                                                                                                control={<Radio color="primary" />}
                                                                                                label={<Typography variant="body2">{t("gobiernos")}</Typography>}
                                                                                                labelPlacement="end"
                                                                                            />
                                                                                        </RadioGroup>
                                                                                    ) : null
                                                                                }
                                                                            </div>
                                                                        </Paper>
                                                                        <hr/>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                        }
                                                        <Button
                                                            variant="contained"
                                                            component="label"
                                                            color="primary"
                                                            fullWidth
                                                            className="mt-4"
                                                            size="large"
                                                            onClick={() => { this.crearUsuarios("MASIVO") }}
                                                        >
                                                            {t("usuarios.btn-cargar-seleccionados")}    
                                                        </Button>
                                                    </React.Fragment>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }

}

export default AgregarUsuarios;