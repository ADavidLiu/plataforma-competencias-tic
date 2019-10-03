import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import { Redirect, Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmacionSalir from "../modales/confirmacionSalir";

class Practica extends Component {
    constructor() {
        super();

        this.initialState = {
            tipoUsuario: "",
            datosID: "docente-1",
            asegurarCorrecto: false,
            nombre: "",
            resenia: "",
            palabraClaveInput: "",
            palabrasClave: [],
            nivelesEducativos: [],
            cantidadPersonas: "",
            cantidadGrupos: "",
            personasPorGrupo: "",
            rangoEdadParticipantes: ["Entre 2 y 5 años","Entre 6 y 12 años","Entre 13 y 15 años","Más de 16 años"],
            selectedRangoEdadParticipantes: "",
            genero: ["Mixto", "Sólo hombres", "Sólo mujeres"],
            selectedGenero: "",
            hasNecesidadesEspeciales: false,
            necesidadesEspeciales: ["Discapacidad", "Con talentos o capacidades excepcionales", "Otras"],
            selectedNecesidadesEspeciales: "",
            otrasNecesidadesEspeciales: "",
            areasDisciplinares: [],
            necesidadOProblema: "",
            objetivoPrincipal: "",
            resultadosEsperados: "",
            isFormActividadOpen: false,
            numActividades: 0,
            actividades: [],
            formActividad: {
                nombre: "",
                proposito: "",
                modalidadTrabajo: "",
                numMateriales: 1,
                materiales: [],
                numEscenarios: 1,
                escenarios: [],
                numProcedimientos: 1,
                procedimientos: [],
                consigna: "",
                evalua: false,
                comoEvalua: "",
                numEvidencias: 1,
                evidencias: [],
                retroalimentacion: {
                    archivo: {
                        file: "",
                        binaryString: "",
                        nombre: ""
                    },
                    descripcion: ""
                }
            },
            isEnviado: false
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        this.cargarDatos(this.state.datosID);
    }

    cargarDatos = datosID => {
        let infoCargada = {};

        if (this.props.location && this.props.location.state !== undefined) {
            infoCargada = {
                tipoUsuario: this.props.location.state.tipoUsuario
            }
        } else {
            infoCargada = {
                tipoUsuario: ""
            }
        }

        /* Conectarse al backend para recibir todos estos datos */
        this.setState({
            tipoUsuario: infoCargada.tipoUsuario,
            nivelesEducativos: [
                {
                    label: "No aplica",
                    isSelected: false
                },
                {
                    label: "Media académica",
                    isSelected: false
                },
                {
                    label: "Media técnica",
                    isSelected: false
                }
            ],
            areasDisciplinares: [
                {
                    label: "Ciencias naturales y educación ambiental",
                    isSelected: false
                },
                {
                    label: "Ciencias sociales, historia, geografía y constitución política y democracia",
                    isSelected: false
                }
            ]
        });
    }

    asegurarCorrecto = e => {
        this.setState({
            asegurarCorrecto: e.target.checked
        });
    }

    agregarPalabraClave = e => {
        if (this.state.palabraClaveInput !== "") {
            this.setState({
                palabrasClave: [
                    ...this.state.palabrasClave,
                    this.state.palabraClaveInput
                ],
                palabraClaveInput: ""
            });
        }
    }

    borrarPalabraClave = palabraAEliminar => {
        const nuevasPalabrasClave = this.state.palabrasClave.filter(palabra => palabra !== palabraAEliminar);

        this.setState({
            palabrasClave: nuevasPalabrasClave
        });
    }

    actualizarSelecciones = (propiedad, seleccionParaActualizar) => {
        const seleccionEncontrada = this.state[propiedad].filter(seleccion => seleccion.label === seleccionParaActualizar.label)[0];
        seleccionEncontrada.isSelected = !seleccionEncontrada.isSelected;
    }

    actualizarHasNecesidadesEspeciales = e => {
        let newState = e.target.value;
        if (newState === "true") {
            newState = true;
        } else {
            newState = false;
        }

        this.setState({
            hasNecesidadesEspeciales: newState
        });
    }
    
    actualizarEvaluaActividad = e => {
        let newState = e.target.value;
        if (newState === "true") {
            newState = true;
        } else {
            newState = false;
        }

        this.setState({
            formActividad: {
                ...this.state.formActividad,
                evalua: newState
            }
        });
    }

    actualizarFormActividad = e => {
        this.setState({
            formActividad: {
                ...this.state.formActividad,
                [e.target.name]: e.target.value
            }
        });
    }

    abrirFormActividad = () => {
        this.setState({
            isFormActividadOpen: true
        });
    }

    cerrarFormActividad = () => {
        this.setState({
            isFormActividadOpen: false,
            formActividad: this.initialState.formActividad
        });
    }

    agregarItem = target => {
        const property = "num" + target;
        const copiaFormActividad = {...this.state.formActividad};

        this.setState({
            formActividad: {
                ...this.state.formActividad,
                [property]: copiaFormActividad[property] += 1
            }
        });
    }

    eliminarItem = target => {
        const property = "num" + target;
        const copiaFormActividad = {...this.state.formActividad};

        if (copiaFormActividad[property] > 1) {
            copiaFormActividad[target.toLowerCase()].pop();
            this.setState({
                formActividad: {
                    ...this.state.formActividad,
                    [property]: copiaFormActividad[property] -= 1
                }
            });
        }
    }

    actualizarFormActividadListItem = (e, index) => {
        const newArray = this.state.formActividad[e.target.name];
        if (newArray[index] || newArray[index] === "") {
            newArray[index] = e.target.value;
        } else {
            newArray.push(e.target.value);
        }

        this.setState({
            formActividad: {
                ...this.state.formActividad,
                [e.target.name]: newArray
            }
        });
    }

    actualizarArchivoEvidencia = (e, index) => {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.onloadend = e => {
            const newEvidencias = this.state.formActividad.evidencias;
            const evidenciaEncontrada = newEvidencias[index];

            if (evidenciaEncontrada) {
                evidenciaEncontrada.archivo = {
                    file: file,
                    binaryString: fileReader.result,
                    nombre: file.name
                };

                this.setState({
                    formActividad: {
                        ...this.state.formActividad,
                        evidencias: newEvidencias
                    }
                });
            } else {
                this.setState({
                    formActividad: {
                        ...this.state.formActividad,
                        evidencias: [
                            ...this.state.formActividad.evidencias,
                            {
                                archivo: {
                                    file: file,
                                    binaryString: fileReader.result,
                                    nombre: file.name
                                },
                                descripcion: ""
                            }
                        ]
                    }
                });
            }
        };

        if (file) {
            fileReader.readAsBinaryString(file);
        }
    }

    actualizarDescripcionEvidencia = (e, index) => {
        const newEvidencias = this.state.formActividad.evidencias;
        const evidenciaEncontrada = newEvidencias[index];

        if (evidenciaEncontrada) {
            evidenciaEncontrada.descripcion = e.target.value;
            this.setState({
                formActividad: {
                    ...this.state.formActividad,
                    evidencias: newEvidencias
                }
            });
        } else {
            this.setState({
                formActividad: {
                    ...this.state.formActividad,
                    evidencias: [
                        ...this.state.formActividad.evidencias,
                        {
                            archivo: {
                                file: "",
                                binaryString: "",
                                nombre: ""
                            },
                            descripcion: e.target.value
                        }
                    ]
                }
            });
        }
    }

    actualizarArchivoRetroalimentacion = e => {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.onloadend = e => {
            this.setState({
                formActividad: {
                    ...this.state.formActividad,
                    retroalimentacion: {
                        ...this.state.formActividad.retroalimentacion,
                        archivo: {
                            file: file,
                            binaryString: fileReader.result,
                            nombre: file.name
                        }
                    }
                }
            });
        };

        if (file) {
            fileReader.readAsBinaryString(file);
        }
    }

    actualizarDescripcionRetroalimentacion = e => {
        this.setState({
            formActividad: {
                ...this.state.formActividad,
                retroalimentacion: {
                    ...this.state.formActividad.retroalimentacion,
                    descripcion: e.target.value
                }
            }
        });
    }

    guardarActividad = e => {
        /* Crear el objeto con todos los datos y agregarlo al arreglo del estado general para que se despliegue en la lista */
        e.preventDefault();
        const newActividad = {
            nombre: this.state.formActividad.nombre,
            proposito: this.state.formActividad.proposito,
            modalidadTrabajo: this.state.formActividad.modalidadTrabajo,
            materiales: this.state.formActividad.materiales,
            escenarions: this.state.formActividad.escenarios,
            procedimientos: this.state.formActividad.procedimientos,
            evalua: this.state.formActividad.evalua,
            comoEvalua: this.state.formActividad.comoEvalua,
            evidencias: this.state.formActividad.evidencias,
            retroalimentacion: this.state.formActividad.retroalimentacion
        }

        this.setState({
            isFormActividadOpen: false,
            actividades: [
                ...this.state.actividades,
                newActividad
            ]
        });
    }

    handleTextChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.asegurarCorrecto) {
            /* Todo OK. Enviar al backend y mostrar confirmación */
            this.setState({
                isEnviado: true
            });
        }
    }

    render() {
        if (this.props.location && this.props.location.state === undefined) {
            return <Redirect to="/" />
        }

        const itemsMateriales = [];
        const itemsEscenarios = [];
        const itemsProcedimientos = [];
        const itemsEvidencias = [];
        for (let i = 0; i < this.state.formActividad.numMateriales; i++) {
            itemsMateriales.push(
                <Translation key={i}>
                    {
                        t => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={t("practicas.elemento")}
                                name="materiales"
                                type="text"
                                className="my-2"
                                onChange={e => { this.actualizarFormActividadListItem(e, i) }}
                            />
                        )
                    }
                </Translation>
            );
        }
        for (let i = 0; i < this.state.formActividad.numEscenarios; i++) {
            itemsEscenarios.push(
                <Translation key={i}>
                    {
                        t => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={t("practicas.elemento")}
                                name="escenarios"
                                type="text"
                                className="my-2"
                                onChange={e => { this.actualizarFormActividadListItem(e, i) }}
                            />
                        )
                    }
                </Translation>
            );
        }
        for (let i = 0; i < this.state.formActividad.numProcedimientos; i++) {
            itemsProcedimientos.push(
                <Translation key={i}>
                    {
                        t => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={t("practicas.elemento")}
                                name="procedimientos"
                                type="text"
                                className="my-2"
                                onChange={e => { this.actualizarFormActividadListItem(e, i) }}
                            />
                        )
                    }
                </Translation>
            );
        }
        for (let i = 0; i < this.state.formActividad.numEvidencias; i++) {
            itemsEvidencias.push(
                <Translation key={i}>
                    {
                        t => (
                            <div className="mt-3">
                                <hr/>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                >
                                    {t("seleccionar-archivo")}
                                    <input type="file" required accept="image/*,video/*,audio/*,.doc,.docx,.pdf,.ppt,.pptx,.xlsm,.xlsx,.txt" onChange={e => { this.actualizarArchivoEvidencia(e, i) }} style={{ display: "none" }} />
                                </Button>
                                {
                                    this.state.formActividad.evidencias[i] ? (
                                        <strong className="mt-3 d-block">Archivo: {this.state.formActividad.evidencias[i].archivo.nombre}</strong>
                                    ) : ""
                                }
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label={t("practicas.descripcion-contenido")}
                                    name="evidenciasDescripcion"
                                    className="mt-3"
                                    onChange={e => { this.actualizarDescripcionEvidencia(e, i) }}
                                />
                            </div>
                        )
                    }
                </Translation>
            );
        }

        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{`${t("procesoPaso.2")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <NavigationPrompt when={!this.state.isEnviado}>
                                {
                                    ({ onConfirm, onCancel }) => (
                                        <ConfirmacionSalir onConfirm={onConfirm} onCancel={onCancel}/>
                                    )
                                }
                            </NavigationPrompt>
                            <Grid container justify="center">
                                <Grid item xs={12} sm={8} md={6}>
                                    <form onSubmit={this.handleSubmit}>
                                        <Typography variant="h5" className="mb-5 text-center">{t("practicas.titulo")}</Typography>
                                        <Typography variant="h6" className="mb-2">{t("practicas.label-informacion-general")}</Typography>
                                        <Typography variant="body1" className="mb-3">{t("practicas.informacion-general")}</Typography>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="nombre"
                                                    label={t("practicas.nombre")}
                                                    name="nombre"
                                                    value={this.state.nombre}
                                                    onChange={this.handleTextChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    multiline
                                                    inputProps={{ maxLength: 400 }}
                                                    rows="5"
                                                    id="resenia"
                                                    label={t("practicas.resenia")}
                                                    name="resenia"
                                                    type="text"
                                                    value={this.state.resenia}
                                                    onChange={this.handleTextChange}
                                                />
                                                <em>{t("practicas.ayuda-resenia")}</em>
                                                <br/><strong>{t("caracteres-maximos")}</strong>.
                                            </Grid>
                                            <Grid item xs={12} className="mt-2">
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="palabraClaveInput"
                                                    label={t("practicas.tags")}
                                                    name="palabraClaveInput"
                                                    value={this.state.palabraClaveInput}
                                                    onChange={this.handleTextChange}
                                                />
                                                <em>{t("practicas.ayuda-tags")}</em>
                                                <br/>
                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                    color="primary"
                                                    className="mt-3"
                                                    size="medium"
                                                    onClick={this.agregarPalabraClave}
                                                >{t("practicas.btn-agregar")}</Button>
                                                <div className="mt-4">
                                                    {
                                                        this.state.palabrasClave.map((palabra, i) => {
                                                            return (
                                                                <Chip
                                                                    key={i}
                                                                    label={palabra}
                                                                    onDelete={() => {this.borrarPalabraClave(palabra)}}
                                                                    className="m-1"
                                                                />
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <hr/>
                                        <Typography variant="h6" className="mb-2">{t("practicas.poblacion")}</Typography>
                                        <Typography variant="body1" className="mb-4">{t("practicas.ayuda-poblacion")}</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <FormGroup>
                                                    <Typography variant="body1" className="mb-2">{t("practicas.niveles")}</Typography>
                                                    {
                                                        this.state.nivelesEducativos.map((nivel, i) => {
                                                            return (
                                                                <Grid key={i} container>
                                                                    <Grid item xs={12} className="py-0">
                                                                        <FormControlLabel
                                                                            control={<Checkbox color="primary" onChange={() => {
                                                                                this.actualizarSelecciones("nivelesEducativos", nivel);
                                                                            }} value={nivel.label} />}
                                                                            label={nivel.label}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            );
                                                        })
                                                    }
                                                </FormGroup>
                                            </Grid>
                                            <Grid item xs={12} className="py-0">
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="cantidadPersonas"
                                                    label={t("practicas.num-personas")}
                                                    name="cantidadPersonas"
                                                    type="number"
                                                    inputProps={{"min": 1}}
                                                    value={this.state.cantidadPersonas}
                                                    onInput={this.handleTextChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className="py-0">
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="cantidadGrupos"
                                                    label={t("practicas.num-grupos")}
                                                    name="cantidadGrupos"
                                                    type="number"
                                                    inputProps={{"min": 1}}
                                                    value={this.state.cantidadGrupos}
                                                    onInput={this.handleTextChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className="py-0">
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="personasPorGrupo"
                                                    label={t("practicas.num-personas-grupo")}
                                                    name="personasPorGrupo"
                                                    type="number"
                                                    inputProps={{"min": 1}}
                                                    value={this.state.personasPorGrupo}
                                                    onInput={this.handleTextChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className="py-0 mt-3">
                                                <Typography variant="body1" className="mb-3">{t("practicas.ayuda-edad")}</Typography>
                                                <FormControl variant="outlined" className="w-100">
                                                    <InputLabel htmlFor="rangoEdadParticipantes">{t("practicas.label-rango")}</InputLabel>
                                                    <Select
                                                        value={this.state.selectedRangoEdadParticipantes}
                                                        onChange={this.handleTextChange}
                                                        input={<OutlinedInput required name="selectedRangoEdadParticipantes" id="rangoEdadParticipantes"/>}
                                                    >
                                                        {
                                                            this.state.rangoEdadParticipantes.map((rango, i) => {
                                                                return (
                                                                    <MenuItem key={i} value={rango}>{rango}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} className="py-0 mt-3">
                                                <Typography variant="body1" className="mb-3">{t("practicas.necesidades-especiales")}</Typography>
                                                <FormControl variant="outlined" className="w-100">
                                                    <RadioGroup
                                                        name="hasNecesidadesEspeciales"
                                                        value={this.state.hasNecesidadesEspeciales.toString()}
                                                        onChange={this.actualizarHasNecesidadesEspeciales}
                                                    >
                                                        <FormControlLabel
                                                            key="Sí"
                                                            value="true"
                                                            control={<Radio required color="primary" />}
                                                            label={t("si")}
                                                        />
                                                        <FormControlLabel
                                                            key="No"
                                                            value="false"
                                                            control={<Radio required color="primary" />}
                                                            label={t("no")}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            {
                                                this.state.hasNecesidadesEspeciales ? (
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" className="mb-4">{t("practicas.que-necesidades-especiales")}</Typography>
                                                        <FormControl variant="outlined" className="w-100">
                                                            <InputLabel htmlFor="necesidadesEspeciales">{t("practicas.seleccione-necesidad-especial")}</InputLabel>
                                                            <Select
                                                                value={this.state.selectedNecesidadesEspeciales}
                                                                onChange={this.handleTextChange}
                                                                input={<OutlinedInput required name="selectedNecesidadesEspeciales" id="necesidadesEspeciales"/>}
                                                            >
                                                                {
                                                                    this.state.necesidadesEspeciales.map((necesidad, i) => {
                                                                        return (
                                                                            <MenuItem key={i} value={necesidad}>{necesidad}</MenuItem>
                                                                        );
                                                                    })
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                ) : ""
                                            }
                                            {
                                                this.state.selectedNecesidadesEspeciales === "Otras" ? (
                                                    <Grid item xs={12} className="py-0">
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            id="otrasNecesidadesEspeciales"
                                                            label={t("practicas.otras-necesidades-cuales")}
                                                            name="otrasNecesidadesEspeciales"
                                                            value={this.state.otrasNecesidadesEspeciales}
                                                            onInput={this.handleTextChange}
                                                        />
                                                    </Grid>
                                                ) : ""
                                            }
                                        </Grid>
                                        <hr/>
                                        <Typography variant="h6" className="mb-2">{t("practicas.area")}</Typography>
                                        <FormGroup>
                                            <Typography variant="body1" className="mb-2">{t("practicas.ayuda-area")}</Typography>
                                                    {
                                                        this.state.areasDisciplinares.map((area, i) => {
                                                            return (
                                                                <Grid key={i} container>
                                                                    <Grid item xs={12} className="py-0">
                                                                        <FormControlLabel
                                                                            control={<Checkbox color="primary" onChange={() => {
                                                                                this.actualizarSelecciones("areasDisciplinares", area);
                                                                            }} value={area.label} />}
                                                                            label={area.label}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            );
                                                        })
                                                    }
                                                </FormGroup>
                                        <hr/>
                                        <Typography variant="h6" className="mb-4">{t("practicas.label-descripcion-detallada")}</Typography>
                                        <FormGroup className="mb-4">
                                            <Typography variant="body1">{t("practicas.necesidad-problema")}</Typography>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                multiline
                                                inputProps={{ maxLength: 400 }}
                                                rows="5"
                                                id="necesidadOProblema"
                                                label={t("practicas.ayuda-necesidad-problema")}
                                                name="necesidadOProblema"
                                                value={this.state.necesidadOProblema}
                                                onChange={this.handleTextChange}
                                            />
                                            <strong>{t("caracteres-maximos")}</strong>
                                        </FormGroup>
                                        <FormGroup className="mb-4">
                                            <Typography variant="body1">{t("practicas.principal-objetivo")}</Typography>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                multiline
                                                inputProps={{ maxLength: 400 }}
                                                rows="5"
                                                id="objetivoPrincipal"
                                                label={t("practicas.ayuda-principal-objetivo")}
                                                name="objetivoPrincipal"
                                                value={this.state.objetivoPrincipal}
                                                onChange={this.handleTextChange}
                                            />
                                            <strong>{t("caracteres-maximos")}</strong>
                                        </FormGroup>
                                        <FormGroup className="mb-4">
                                            <Typography variant="body1">{t("practicas.label-resultados")}</Typography>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                multiline
                                                inputProps={{ maxLength: 400 }}
                                                rows="5"
                                                id="resultadosEsperados"
                                                label={t("practicas.resultados")}
                                                name="resultadosEsperados"
                                                value={this.state.resultadosEsperados}
                                                onChange={this.handleTextChange}
                                            />
                                            <strong>{t("caracteres-maximos")}</strong>
                                        </FormGroup>
                                        <Typography variant="body1" className="mb-3">{t("practicas.label-actividades")}</Typography>
                                        {
                                            this.state.actividades.length > 0 ? <Typography variant="body2"><strong>{t("practicas.label-actividades-agregadas")}</strong></Typography> : ""
                                        }
                                        {
                                            this.state.actividades.map((actividad, i) => {
                                                return (
                                                    <React.Fragment>
                                                        <hr/>
                                                        <Typography variant="body2" className="mb-2">{"Actividad " + (i + 1) + ": " + (actividad.nombre)}</Typography>
                                                    </React.Fragment>
                                                );
                                            })
                                        }
                                        <Button
                                            type="button"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            className="mt-2"
                                            size="medium"
                                            onClick={this.abrirFormActividad}
                                        >{t("practicas.btn-agregar-actividad")}</Button>
                                        <hr className="mt-5 mb-4"/>
                                        <FormGroup>
                                            <FormControlLabel
                                                required
                                                control={<Checkbox onChange={this.asegurarCorrecto} color="primary" checked={this.state.asegurarCorrecto} value="asegura-correcto" />}
                                                label={t("practicas.label-checkbox")}
                                            />
                                        </FormGroup>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className="mt-2"
                                            size="large"
                                        >{t("practicas.btn-enviar")}</Button>
                                    </form>
                                </Grid>
                            </Grid>

                            <Dialog open={this.state.isFormActividadOpen} onClose={this.cerrarFormActividad} fullWidth>
                                <form onSubmit={this.guardarActividad}>
                                    <DialogTitle id="form-dialog-title">{t("practicas.label-detalles-actividad")}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>{t("practicas.ayuda-detalles-actividad")}</DialogContentText>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="nombreActividad"
                                            label={t("practicas.actividad-nombre")}
                                            name="nombre"
                                            type="text"
                                            value={this.state.formActividad.nombre}
                                            onChange={this.actualizarFormActividad}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            multiline
                                            rows={5}
                                            inputProps={{ maxLength: 400 }}
                                            fullWidth
                                            id="propositoActividad"
                                            label={t("practicas.actividad-proposito")}
                                            name="proposito"
                                            type="text"
                                            value={this.state.formActividad.proposito}
                                            onChange={this.actualizarFormActividad}
                                        />
                                        <strong>{t("caracteres-maximos")}</strong>
                                        <FormControl variant="outlined" className="w-100 mt-3">
                                            <InputLabel htmlFor="modalidadTrabajoActividad">{t("practicas.actividad-modalidad-trabajo")}</InputLabel>
                                            <Select
                                                value={this.state.formActividad.modalidadTrabajo}
                                                onChange={this.actualizarFormActividad}
                                                input={<OutlinedInput required name="modalidadTrabajo" id="modalidadTrabajoActividad"/>}
                                            >
                                                <MenuItem value="Grupal">{t("practicas.actividad-grupal")}</MenuItem>
                                                <MenuItem value="Individual">{t("practicas.actividad-individual")}</MenuItem>
                                                <MenuItem value="Mixta">{t("practicas.actividad-mixta")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <div className="mt-4">
                                            <Typography variant="body1" className="mb-2"><strong>{t("practicas.actividad-materiales-educativos")}</strong></Typography>
                                            {itemsMateriales}
                                            {
                                                this.state.formActividad.numMateriales > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Materiales") }} color="primary" variant="outlined">-</Button> : ""
                                            }
                                            <Button className="mt-2" onClick={() => { this.agregarItem("Materiales") }} color="primary" variant="outlined">+</Button>
                                        </div>
                                        <div className="mt-4">
                                            <Typography variant="body1" className="mb-2"><strong>{t("practicas.actividad-escenarios")}</strong></Typography>
                                            {itemsEscenarios}
                                            {
                                                this.state.formActividad.numEscenarios > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Escenarios") }} color="primary" variant="outlined">-</Button> : ""
                                            }
                                            <Button className="mt-2" onClick={() => { this.agregarItem("Escenarios") }} color="primary" variant="outlined">+</Button>
                                        </div>
                                        <div className="mt-4">
                                            <Typography variant="body1" className="mb-2"><strong>{t("practicas.actividad-procedimientos")}</strong></Typography>
                                            {itemsProcedimientos}
                                            {
                                                this.state.formActividad.numProcedimientos > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Procedimientos") }} color="primary" variant="outlined">-</Button> : ""
                                            }
                                            <Button className="mt-2" onClick={() => { this.agregarItem("Procedimientos") }} color="primary" variant="outlined">+</Button>
                                        </div>
                                        <div className="mt-4">
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                multiline
                                                rows={5}
                                                inputProps={{ maxLength: 400 }}
                                                fullWidth
                                                id="consignaActividad"
                                                label={t("practicas.actividad-consigna")}
                                                name="consigna"
                                                type="text"
                                                value={this.state.formActividad.consigna}
                                                onChange={this.actualizarFormActividad}
                                            />
                                            <strong>{t("caracteres-maximos")}</strong>
                                        </div>
                                        <div className="mt-4">
                                            <Typography variant="body1" className="mb-3">{t("practicas.actividad-evalua")}</Typography>
                                            <FormControl variant="outlined" className="w-100">
                                                <RadioGroup
                                                    name="evaluaActividad"
                                                    value={this.state.formActividad.evalua.toString()}
                                                    onChange={this.actualizarEvaluaActividad}
                                                >
                                                    <FormControlLabel
                                                        key="Sí"
                                                        value="true"
                                                        control={<Radio required color="primary" />}
                                                        label={t("si")}
                                                    />
                                                    <FormControlLabel
                                                        key="No"
                                                        value="false"
                                                        control={<Radio required color="primary" />}
                                                        label={t("no")}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                            {
                                                this.state.formActividad.evalua ? (
                                                    <React.Fragment>
                                                        <Typography variant="body1" className="mb-2">{t("practicas.actividad-label-evaluar-desempenio")}</Typography>
                                                        <TextField
                                                            variant="outlined"
                                                            margin="normal"
                                                            required
                                                            multiline
                                                            rows={5}
                                                            inputProps={{ maxLength: 400 }}
                                                            fullWidth
                                                            id="comoEvaluaActividad"
                                                            label={t("practicas.actividad-describa-proceso")}
                                                            name="comoEvalua"
                                                            type="text"
                                                            value={this.state.formActividad.comoEvalua}
                                                            onChange={this.actualizarFormActividad}
                                                        />
                                                        <strong className="d-block mb-4">{t("caracteres-maximos")}</strong>
                                                    </React.Fragment>
                                                ) : ""
                                            }
                                        </div>
                                        <div className="mt-1">
                                            <Typography variant="body1" className="mb-1">{t("practicas.actividad-label-adjunte-evidencias")}</Typography>
                                            <em className="d-block mb-3"><strong>{t("practicas.actividad-ayuda-evidencias")}</strong></em>
                                            {itemsEvidencias}
                                            {
                                                this.state.formActividad.numEvidencias > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Evidencias") }} color="primary" variant="outlined">-</Button> : ""
                                            }
                                            <Button className="mt-2" onClick={() => { this.agregarItem("Evidencias") }} color="primary" variant="outlined">+</Button>
                                        </div>
                                        <div className="mt-4">
                                            <Typography variant="body1" className="mb-1">{t("practicas.actividad-label-adjunte-produccion")}</Typography>
                                            <strong className="d-block mb-2">{t("practicas.actividad-ayuda-adjunte-produccion")}</strong>
                                            <em className="d-block mb-3"><strong>{t("practicas.actividad-ayuda-evidencias")}</strong></em>
                                            <hr/>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                fullWidth
                                            >
                                                {t("seleccionar-archivo")}
                                                <input type="file" accept="image/*,video/*,audio/*,.doc,.docx,.pdf,.ppt,.pptx,.xlsm,.xlsx,.txt" onChange={this.actualizarArchivoRetroalimentacion} style={{ display: "none" }} />
                                            </Button>
                                            {
                                                this.state.formActividad.retroalimentacion.archivo.nombre !== "" ? (
                                                    <strong className="mt-3 d-block">{t("archivo")}: {this.state.formActividad.retroalimentacion.archivo.nombre}</strong>
                                                ) : ""
                                            }
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                multiline
                                                rows={3}
                                                label={t("practicas.descripcion-contenido")}
                                                name="retroalimentacionDescripcion"
                                                className="mt-3"
                                                onChange={this.actualizarDescripcionRetroalimentacion}
                                            />
                                        </div>
                                        <hr/>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button type="button" onClick={this.cerrarFormActividad} color="primary">{t("cancelar")}</Button>
                                        <Button type="submit" color="primary" variant="contained">{t("practicas.actividad-btn-agregar")}</Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                            <Dialog open={this.state.isEnviado}>
                                <DialogTitle>{t("practicas.enviada")}</DialogTitle>
                                <DialogContent>
                                <DialogContentText>{t("practicas.enviada-ayuda")}</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Link to="/" style={{textDecoration: "none"}}>
                                        <Button color="primary">{t("volver-inicio")}</Button>
                                    </Link>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Practica;