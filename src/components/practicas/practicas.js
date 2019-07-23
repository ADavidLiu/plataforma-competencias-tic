import React, { Component } from "react";

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

class Practicas extends Component {
    constructor() {
        super();

        this.initialState = {
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
            }
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        this.cargarDatos(this.state.datosID);
    }

    cargarDatos = datosID => {
        /* Conectarse al backend para recibir todos estos datos */
        this.setState({
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

        this.setState({
            formActividad: {
                ...this.state.formActividad,
                [property]: this.state.formActividad[property] += 1
            }
        });
    }

    eliminarItem = target => {
        const property = "num" + target;
        if (this.state.formActividad[property] > 1) {
            this.state.formActividad[target.toLowerCase()].pop();
            this.setState({
                formActividad: {
                    ...this.state.formActividad,
                    [property]: this.state.formActividad[property] -= 1
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

        }
    }

    render() {
        const itemsMateriales = [];
        const itemsEscenarios = [];
        const itemsProcedimientos = [];
        const itemsEvidencias = [];
        for (let i = 0; i < this.state.formActividad.numMateriales; i++) {
            itemsMateriales.push(
                <TextField
                    key={i}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Elemento"
                    name="materiales"
                    type="text"
                    className="my-2"
                    onChange={e => { this.actualizarFormActividadListItem(e, i) }}
                />
            );
        }
        for (let i = 0; i < this.state.formActividad.numEscenarios; i++) {
            itemsEscenarios.push(
                <TextField
                    key={i}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Elemento"
                    name="escenarios"
                    type="text"
                    className="my-2"
                    onChange={e => { this.actualizarFormActividadListItem(e, i) }}
                />
            );
        }
        for (let i = 0; i < this.state.formActividad.numProcedimientos; i++) {
            itemsProcedimientos.push(
                <TextField
                    key={i}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Elemento"
                    name="procedimientos"
                    type="text"
                    className="my-2"
                    onChange={e => { this.actualizarFormActividadListItem(e, i) }}
                />
            );
        }
        for (let i = 0; i < this.state.formActividad.numEvidencias; i++) {
            itemsEvidencias.push(
                <div key={i} className="mt-3">
                    <hr/>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                    >
                        Seleccionar archivo
                        <input type="file" required accept="image/*,video/*,audio/*,.doc,.docx,.pdf,.ppt,.pptx,.xlsm,.txt" onChange={e => { this.actualizarArchivoEvidencia(e, i) }} style={{ display: "none" }} />
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
                        label="Descripción del contenido"
                        name="evidenciasDescripcion"
                        className="mt-3"
                        onChange={e => { this.actualizarDescripcionEvidencia(e, i) }}
                    />
                </div>
            );
        }

        return (
            <React.Fragment>
                <Grid container justify="center">
                    <Grid item xs={12} sm={8} md={6}>
                        <form onSubmit={this.handleSubmit}>
                            <Typography variant="h5" className="mb-5 text-center">Práctica Educativa</Typography>
                            <Typography variant="h6" className="mb-2">Información general</Typography>
                            <Typography variant="body1" className="mb-3">A continuación, se le pedirá información sobre una práctica educativa apoyada en TIC. Se entiende por práctica educativa "la actividad o conjunto de actividades intencionalmente diseñadas, implementadas y evaluadas por agentes educativos para favorecer la apropiación de conocimiento". Tenga en cuenta que una práctica educativa puede implicar actividades para explorar conocimientos previos, presentar contenidos, brindar oportunidades de práctica y evaluar el aprendizaje.</Typography>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="nombre"
                                        label="Nombre de la práctica educativa"
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
                                        label="Reseña"
                                        name="resenia"
                                        type="text"
                                        value={this.state.resenia}
                                        onChange={this.handleTextChange}
                                    />
                                    <em>Mencione brevemente el objetivo de enseñanza, personas a quienes está dirigida la práctica, principales recursos tecnológicos utilizados, generalidad del procedimiento utilizado, resultado o conclusión principal.</em>
                                    <br/><strong>Máximo 400 caracteres</strong>.
                                </Grid>
                                <Grid item xs={12} className="mt-2">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="palabraClaveInput"
                                        label="Palabras clave"
                                        name="palabraClaveInput"
                                        value={this.state.palabraClaveInput}
                                        onChange={this.handleTextChange}
                                    />
                                    <em>Escriba al menos 5 palabras clave</em>
                                    <br/>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        color="primary"
                                        className="mt-3"
                                        size="medium"
                                        onClick={this.agregarPalabraClave}
                                    >Agregar</Button>
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
                            <Typography variant="h6" className="mb-2">Población</Typography>
                            <Typography variant="body1" className="mb-4">Personas directamente beneficiadas por la práctica educativa</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <Typography variant="body1" className="mb-2">¿A qué niveles educativos está dirigida la práctica educativa?</Typography>
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
                                        label="Cantidad de personas"
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
                                        label="Cantidad de grupos"
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
                                        label="Personas por grupo"
                                        name="personasPorGrupo"
                                        type="number"
                                        inputProps={{"min": 1}}
                                        value={this.state.personasPorGrupo}
                                        onInput={this.handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} className="py-0 mt-3">
                                    <Typography variant="body1" className="mb-3">En general, ¿Cuál es la edad de los estudiantes que participan en su práctica educativa?</Typography>
                                    <FormControl variant="outlined" className="w-100">
                                        <InputLabel htmlFor="rangoEdadParticipantes">Seleccione un rango *</InputLabel>
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
                                    <Typography variant="body1" className="mb-3">¿La práctica atiende población con necesidades educativas especiales?</Typography>
                                    <FormControl variant="outlined" className="w-100">
                                        <RadioGroup
                                            name="hasNecesidadesEspeciales"
                                            value={this.state.hasNecesidadesEspeciales}
                                            onChange={this.actualizarHasNecesidadesEspeciales}
                                        >
                                            <FormControlLabel
                                                key="Sí"
                                                value={true}
                                                control={<Radio required color="primary" />}
                                                label="Sí"
                                            />
                                            <FormControlLabel
                                                key="No"
                                                value={false}
                                                control={<Radio required color="primary" />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {
                                    this.state.hasNecesidadesEspeciales ? (
                                        <Grid item xs={12}>
                                            <Typography variant="body1" className="mb-4">¿A qué necesidades educativas especiales atiende la práctica educativa?</Typography>
                                            <FormControl variant="outlined" className="w-100">
                                                <InputLabel htmlFor="necesidadesEspeciales">Seleccione la necesidad especial *</InputLabel>
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
                                                label="¿Cuáles?"
                                                name="otrasNecesidadesEspeciales"
                                                value={this.state.otrasNecesidadesEspeciales}
                                                onInput={this.handleTextChange}
                                            />
                                        </Grid>
                                    ) : ""
                                }
                            </Grid>
                            <hr/>
                            <Typography variant="h6" className="mb-2">Área Disciplinar</Typography>
                            <FormGroup>
                                <Typography variant="body1" className="mb-2">¿En qué áreas disciplinares hace énfasis su práctica educativa apoyada en TIC?</Typography>
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
                            <Typography variant="h6" className="mb-4">Descripción detallada de la práctica educativa</Typography>
                            <FormGroup className="mb-4">
                                <Typography variant="body1">¿A qué necesidad o problema atiende su práctica educativa apoyada en TIC?</Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    inputProps={{ maxLength: 400 }}
                                    rows="5"
                                    id="necesidadOProblema"
                                    label="Las razones que justifican su práctica."
                                    name="necesidadOProblema"
                                    value={this.state.necesidadOProblema}
                                    onChange={this.handleTextChange}
                                />
                                <strong>Máximo 400 caracteres</strong>
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Typography variant="body1">¿Cuál es el principal objetivo de aprendizaje de la práctica educativa?</Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    inputProps={{ maxLength: 400 }}
                                    rows="5"
                                    id="objetivoPrincipal"
                                    label="La competencia que espera formar en sus estudiantes al finalizar la práctica educativa."
                                    name="objetivoPrincipal"
                                    value={this.state.objetivoPrincipal}
                                    onChange={this.handleTextChange}
                                />
                                <strong>Máximo 400 caracteres</strong>
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Typography variant="body1">¿Cuáles son los resultados de aprendizaje esperados a partir de la práctica educativa?</Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    inputProps={{ maxLength: 400 }}
                                    rows="5"
                                    id="resultadosEsperados"
                                    label="Los desempeños y productos de los estudiantes como consecuencia de la participación en la práctica educativa."
                                    name="resultadosEsperados"
                                    value={this.state.resultadosEsperados}
                                    onChange={this.handleTextChange}
                                />
                                <strong>Máximo 400 caracteres</strong>
                            </FormGroup>
                            <Typography variant="body1" className="mb-3">A continuación, describa la o las actividades que propone para lograr el objetivo de aprendizaje.</Typography>
                            {
                                this.state.actividades.length > 0 ? <Typography variant="body2"><strong>Actividades agregadas</strong></Typography> : ""
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
                            >Agregar actividad</Button>
                            <hr className="mt-5 mb-4"/>
                            <FormGroup>
                                <FormControlLabel
                                    required
                                    control={<Checkbox onChange={this.asegurarCorrecto} color="primary" checked={this.state.asegurarCorrecto} value="asegura-correcto" />}
                                    label="Aseguro que la información proveída es correcta y completa."
                                />
                            </FormGroup>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="mt-2"
                                size="large"
                            >Enviar práctica educativa</Button>
                        </form>
                    </Grid>
                </Grid>

                <Dialog open={this.state.isFormActividadOpen} onClose={this.cerrarFormActividad} fullWidth>
                    <form onSubmit={this.guardarActividad}>
                        <DialogTitle id="form-dialog-title">Detalles de la actividad</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Complete los campos mostrados a continuación.</DialogContentText>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="nombreActividad"
                                label="Nombre de la actividad"
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
                                label="Propósito"
                                name="proposito"
                                type="text"
                                value={this.state.formActividad.proposito}
                                onChange={this.actualizarFormActividad}
                            />
                            <strong>Máximo 400 palabras</strong>
                            <FormControl variant="outlined" className="w-100 mt-3">
                                <InputLabel htmlFor="modalidadTrabajoActividad">Modalidad de trabajo *</InputLabel>
                                <Select
                                    value={this.state.formActividad.modalidadTrabajo}
                                    onChange={this.actualizarFormActividad}
                                    input={<OutlinedInput required name="modalidadTrabajo" id="modalidadTrabajoActividad"/>}
                                >
                                    <MenuItem value="Grupal">Grupal</MenuItem>
                                    <MenuItem value="Individual">Individual</MenuItem>
                                    <MenuItem value="Mixta">Mixta</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="mt-4">
                                <Typography variant="body1" className="mb-2"><strong>Materiales educativos</strong></Typography>
                                {itemsMateriales}
                                {
                                    this.state.formActividad.numMateriales > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Materiales") }} color="primary" variant="outlined">-</Button> : ""
                                }
                                <Button className="mt-2" onClick={() => { this.agregarItem("Materiales") }} color="primary" variant="outlined">+</Button>
                            </div>
                            <div className="mt-4">
                                <Typography variant="body1" className="mb-2"><strong>Escenarios</strong></Typography>
                                {itemsEscenarios}
                                {
                                    this.state.formActividad.numEscenarios > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Escenarios") }} color="primary" variant="outlined">-</Button> : ""
                                }
                                <Button className="mt-2" onClick={() => { this.agregarItem("Escenarios") }} color="primary" variant="outlined">+</Button>
                            </div>
                            <div className="mt-4">
                                <Typography variant="body1" className="mb-2"><strong>Procedimientos</strong></Typography>
                                {itemsProcedimientos}
                                {
                                    this.state.formActividad.numProcedimientos > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Procedimientos") }} color="primary" variant="outlined">-</Button> : ""
                                }
                                <Button className="mt-2" onClick={() => { this.agregarItem("Procedimientos") }} color="primary" variant="outlined">+</Button>
                            </div>
                            <div className="mt-4">
                                <Typography variant="body1" className="mb-2"><strong>Consigna</strong></Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    multiline
                                    rows={5}
                                    inputProps={{ maxLength: 400 }}
                                    fullWidth
                                    id="consignaActividad"
                                    label="Consigna"
                                    name="consigna"
                                    type="text"
                                    value={this.state.formActividad.consigna}
                                    onChange={this.actualizarFormActividad}
                                />
                            </div>
                            <div className="mt-4">
                                <Typography variant="body1" className="mb-3">¿Evalúa las producciones de los estudiantes?</Typography>
                                <FormControl variant="outlined" className="w-100">
                                    <RadioGroup
                                        name="evaluaActividad"
                                        value={this.state.formActividad.evalua}
                                        onChange={this.actualizarEvaluaActividad}
                                    >
                                        <FormControlLabel
                                            key="Sí"
                                            value={true}
                                            control={<Radio required color="primary" />}
                                            label="Sí"
                                        />
                                        <FormControlLabel
                                            key="No"
                                            value={false}
                                            control={<Radio required color="primary" />}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                {
                                    this.state.formActividad.evalua ? (
                                        <React.Fragment>
                                            <Typography variant="body1" className="mb-2">¿Qué hace para evaluar los desempeños de los estudiantes?</Typography>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                multiline
                                                rows={5}
                                                inputProps={{ maxLength: 400 }}
                                                fullWidth
                                                id="comoEvaluaActividad"
                                                label="Describa el proceso"
                                                name="comoEvalua"
                                                type="text"
                                                value={this.state.formActividad.comoEvalua}
                                                onChange={this.actualizarFormActividad}
                                            />
                                            <strong className="d-block mb-4">Máximo 400 palabras</strong>
                                        </React.Fragment>
                                    ) : ""
                                }
                            </div>
                            <div className="mt-1">
                                <Typography variant="body1" className="mb-1">Adjunte evidencia(s) de la(s) actividad(es) *</Typography>
                                <em className="d-block mb-3"><strong>Sólo se aceptan archivos de imagen, video, audio, .doc, .docx, .xlsm, .pdf, .txt, .ppt y .pptx</strong></em>
                                {itemsEvidencias}
                                {
                                    this.state.formActividad.numEvidencias > 1 ? <Button className="mt-2 mr-2" onClick={() => { this.eliminarItem("Evidencias") }} color="primary" variant="outlined">-</Button> : ""
                                }
                                <Button className="mt-2" onClick={() => { this.agregarItem("Evidencias") }} color="primary" variant="outlined">+</Button>
                            </div>
                            <div className="mt-4">
                                <Typography variant="body1" className="mb-1">Adjunte la producción de un estudiante retroalimentada, si la tiene.</Typography>
                                <strong className="d-block mb-2">Recuerde borrar cualquier referencia a la identidad del estudiante.</strong>
                                <em className="d-block mb-3"><strong>Sólo se aceptan archivos de imagen, video, audio, .doc, .docx, .xlsm, .pdf, .txt, .ppt y .pptx</strong></em>
                                <hr/>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                >
                                    Seleccionar archivo
                                    <input type="file" accept="image/*,video/*,audio/*,.doc,.docx,.pdf,.ppt,.pptx,.xlsm,.txt" onChange={this.actualizarArchivoRetroalimentacion} style={{ display: "none" }} />
                                </Button>
                                {
                                    this.state.formActividad.retroalimentacion.archivo.nombre !== "" ? (
                                        <strong className="mt-3 d-block">Archivo: {this.state.formActividad.retroalimentacion.archivo.nombre}</strong>
                                    ) : ""
                                }
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Descripción del contenido"
                                    name="retroalimentacionDescripcion"
                                    className="mt-3"
                                    onChange={this.actualizarDescripcionRetroalimentacion}
                                />
                            </div>
                            <hr/>
                        </DialogContent>
                        <DialogActions>
                            <Button type="button" onClick={this.cerrarFormActividad} color="primary">Cancelar</Button>
                            <Button type="submit" color="primary" variant="contained">Agregar actividad</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default Practicas;