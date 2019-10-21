import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import CircularProgress from "@material-ui/core/CircularProgress";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import descriptores from "../../models/descriptores";
import encuestas from "../../models/encuestas";
import preguntasPrueba from "../../models/preguntasPrueba";
import preguntasPreentrevista from "../../models/preentrevista-new";

import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Cancel from "@material-ui/icons/Cancel";
import Add from "@material-ui/icons/Add";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import VirtualList from "react-tiny-virtual-list";
import ChopList from "react-chop";
import { DVL } from "react-dynamic-virtual-list";
import shortid from "shortid";

import { equals } from "equally";
import df from "deeply-freeze";

encuestas.splice(2, 1);
let grupos = [];
const preguntasPorGrupo = [];
preguntasPreentrevista.forEach(pregunta => {
    grupos.push(pregunta.group);
});
grupos = [...new Set(grupos)];
for (let i = 0; i < grupos.length; i++) {
    preguntasPorGrupo[i] = [];
    preguntasPreentrevista.forEach(pregunta => {
        if (pregunta.group === i.toString()) {
            preguntasPorGrupo[i].push(pregunta);
        }
    });
}

const dataBackup = df({
    descriptores: JSON.parse(JSON.stringify(descriptores)),
    encuestas: JSON.parse(JSON.stringify(encuestas)),
    prueba: JSON.parse(JSON.stringify(preguntasPrueba)),
    preentrevista: JSON.parse(JSON.stringify(preguntasPorGrupo))
});

class Instrumento extends Component {
    constructor() {
        super();
        
        this.dataOriginal = {
            descriptores: JSON.parse(JSON.stringify(descriptores)),
            encuestas: JSON.parse(JSON.stringify(encuestas)),
            prueba: JSON.parse(JSON.stringify(preguntasPrueba)),
            preentrevista: JSON.parse(JSON.stringify(preguntasPorGrupo))
        };

        this.state = {
            dataActual: this.dataOriginal,
            shouldConfirmCreateVersion: false,
            shouldConfirmDelete: false,
            divisionMostrada: 0,
            isLoading: true,
            didDataChange: false,
            active: {
                category: "descriptores",
                index: 0
            },
            shouldOpenNewRespuestaOptionForm: false,
            newRespuestaValue: "",
            indexNewRespuestaValue: 0,
            virtualListsRefs: {
                descriptores: [],
                encuestas: [],
                prueba: [],
                preentrevista: []
            },
            refs: {
                descriptores: [],
                encuestas: [],
                prueba: [],
                preentrevista: []
            }
        }
    }

    componentDidMount = () => {
        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 1000);
    }

    componentDidUpdate = (prevProps, prevState) => {
        this.state.virtualListsRefs.preentrevista.forEach(ref => {
            console.log(ref);
            if (ref !== null) {
                console.log("Recomputed!");
                ref.recomputeSizes();
            }
        });
        
        if (prevState.dataActual !== this.state.dataActual) {
            this.state.virtualListsRefs.preentrevista.forEach(ref => {
                if (ref !== null) {
                    console.log("Recomputed!");
                    ref.recomputeSizes();
                }
            });

            

            if (equals(this.state.dataActual, dataBackup)) {
                this.setState({
                    didDataChange: false
                });
            } else {
                this.setState({
                    didDataChange: true
                });
            }
        }
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            dataActual: dataBackup,
            divisionMostrada: newValue,
            isLoading: true,
            didDataChange: false
        });

        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 1000);
    }

    confirmarCrearVersion = () => {
        this.setState({
            shouldConfirmCreateVersion: !this.state.shouldConfirmCreateVersion
        });
    }

    crearVersion = () => {
        /* Conectarse al backend */
        console.log("Creada!");
    }

    confirmarDelete = (category, index) => {
        this.setState({
            shouldConfirmDelete: true,
            active: {
                category: category,
                index: index
            }
        });
    }

    toggleDelete = () => {
        this.setState({
            shouldConfirmDelete: !this.state.shouldConfirmDelete
        });
    }

    deleteElement = () => {
        /* Conectarse al backend */
        this.toggleDelete();
        /* Luego de recibir la confirmación 200, eliminar visualmente */
        let categoriaActiva = this.state.active.category;
        if (categoriaActiva.includes("-")) {
            categoriaActiva = this.state.active.category.split("-")[0];
        }

        const newElements = [...JSON.parse(JSON.stringify(this.state.dataActual[categoriaActiva]))];
        
        switch(this.state.active.category) {
            case "descriptores":
            case "prueba":
                newElements.splice(this.state.active.index, 1);
                break;
            case "encuestas":
            case "preentrevista":
                newElements[this.state.active.index.i].splice(this.state.active.index.j, 1);

                if (newElements[this.state.active.index.i].length === 0) {
                    newElements.splice(this.state.active.index.i, 1);
                }
                break;
            case "preentrevista-grupo":
                newElements.splice(this.state.active.index, 1);
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoriaActiva]: newElements
            }
        });
    }

    handleChange = (e, categoria, index) => {
        const elementosActualizados = JSON.parse(JSON.stringify(this.state.dataActual[categoria]));

        switch (categoria) {
            case "descriptores":
            case "prueba":
                if (e.target.name === "codigo" || e.target.name === "codigoDescriptor") {
                    e.target.value = e.target.value.toUpperCase();
                }
                elementosActualizados[index] = {
                    ...elementosActualizados[index],
                    [e.target.name]: e.target.value
                }
                break;
            case "encuestas":
                elementosActualizados[index.i][index.j] = e.target.value;
                break;
            case "preentrevista":
                elementosActualizados[index.i][index.j][e.target.name] = e.target.value;
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: elementosActualizados
            }
        });
    }

    addElement = (categoria, index) => {
        let copiaElementos;
        if (categoria.includes("-")) {
            copiaElementos = [...JSON.parse(JSON.stringify(this.state.dataActual[categoria.split("-")[0]]))];
        } else {
            copiaElementos = [...JSON.parse(JSON.stringify(this.state.dataActual[categoria]))];
        }

        switch (categoria) {
            case "descriptores":
                copiaElementos.push({
                    codigo: "",
                    contenido: ""
                });
                break;
            case "encuestas":
                const newCopia = JSON.parse(JSON.stringify(copiaElementos));
                newCopia[index].push("");
                copiaElementos = newCopia;
                break;
            case "prueba":
                copiaElementos.push({
                    codigoDescriptor: "",
                    enunciado: "",
                    opciones: [],
                    respuesta: ""
                });
                break;
            case "preentrevista":
                copiaElementos[index].push({
                    id: "",
                    group: "",
                    subgroup: "",
                    label: "",
                    typeOfLevel: "",
                    typeOfAnswer: "",
                    options: [],
                    descriptores: [],
                    evidencia: "",
                    isTriggerFor: "",
                    isTriggeredBy: ""
                });
                break;
            case "preentrevista-grupo":
                copiaElementos.push([{
                    id: "",
                    group: "",
                    subgroup: "",
                    label: "",
                    typeOfLevel: "",
                    typeOfAnswer: "",
                    options: [],
                    descriptores: [],
                    evidencia: "",
                    isTriggerFor: "",
                    isTriggeredBy: ""
                }]);
                categoria = "preentrevista";
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: copiaElementos
            }
        });
    }

    changeRespuestaPrueba = (e, categoria, index) => {
        const newElementos = [...JSON.parse(JSON.stringify(this.state.dataActual.prueba))];
        newElementos[index].respuesta = e.target.value;

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: newElementos
            }
        });
    }

    addRespuestaOption = () => {
        this.toggleNewRespuestaOption();
        const newElementos = [...JSON.parse(JSON.stringify(this.state.dataActual[this.state.active.category]))];

        if (typeof this.state.indexNewRespuestaValue === "object") {
            newElementos[this.state.indexNewRespuestaValue.i][this.state.indexNewRespuestaValue.j].options.push(this.state.newRespuestaValue);
        } else {
            newElementos[this.state.indexNewRespuestaValue].opciones.push(this.state.newRespuestaValue);
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [this.state.active.category]: newElementos
            },
            newRespuestaValue: ""
        });
    }

    deleteRespuestaOption = (categoria, index) => {
        const newElementos = [...JSON.parse(JSON.stringify(this.state.dataActual[categoria]))];
        
        switch (categoria) {
            case "prueba":
                newElementos[index.i].opciones.splice(index.j, 1);
                break;
            case "preentrevista":
                newElementos[index.i][index.j].options.splice(index.k, 1);
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: newElementos
            }
        });
    }

    updateNewRespuestaOption = e => {
        this.setState({
            newRespuestaValue: e.target.value
        });
    }

    toggleNewRespuestaOption = (categoria, index) => {
        let newIndex = 0;
        if (index) {
            newIndex = index;
        }
        if (categoria) {
            let newCategoria = "";
            switch (categoria) {
                case "prueba":
                    newCategoria = "prueba";
                    break;
                case "preentrevista":
                    newCategoria = "preentrevista";
                    break;
                default:
                    break;
            }

            this.setState({
                active: {
                    ...this.state.active,
                    category: newCategoria
                }
            });
        }

        this.setState({
            shouldOpenNewRespuestaOptionForm: !this.state.shouldOpenNewRespuestaOptionForm,
            indexNewRespuestaValue: newIndex
        });
    }

    render() {
        let tabMostrado;
        switch (this.state.divisionMostrada) {
            case 0:
                tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        {
                                            this.state.dataActual.descriptores.map((descriptor, i) => (
                                                <Grid key={i} item xs={12}>
                                                    <Paper className="p-4">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                className="w-100 w-md-auto"
                                                                label={t("instrumento.descriptores-codigo")}
                                                                name="codigo"
                                                                value={this.state.dataActual.descriptores[i].codigo}
                                                                onChange={e => { this.handleChange(e, "descriptores", i) }}
                                                            />
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                className="w-100 w-md-auto flex-grow-1 mx-4"
                                                                label={t("instrumento.descriptores-contenido")}
                                                                name="contenido"
                                                                value={this.state.dataActual.descriptores[i].contenido}
                                                                onChange={e => { this.handleChange(e, "descriptores", i) }}
                                                            />
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <IconButton color="primary" onClick={() => { this.confirmarDelete("descriptores", i); }}>
                                                                    <DeleteOutlined color="primary"/>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                </Grid>
                                            ))
                                        }
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" fullWidth size="large" onClick={() => { this.addElement("descriptores"); }}>
                                                <Add className="d-block mx-auto"/>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case 1:
                tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        {
                                            this.state.dataActual.encuestas.map((factor, i) => (
                                                <Grid item xs={12} key={i} className="pb-0">
                                                    {
                                                        i !== 2 ? (
                                                            <Typography variant="h6" className="mb-4">{`${t("instrumento.encuestas-factor")} ${i + 1}`}</Typography>
                                                        ) : (
                                                            <Typography variant="h6" className="mb-4">{`${t("instrumento.encuestas-factor")} 4`}</Typography>
                                                        )
                                                    }
                                                    {
                                                        factor.map((pregunta, j) => (
                                                            <Paper className="p-4 mb-4" key={j}>
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <TextField
                                                                        variant="outlined"
                                                                        margin="normal"
                                                                        fullWidth
                                                                        multiline
                                                                        rows={2}
                                                                        label={t("instrumento.encuestas-pregunta")}
                                                                        name="pregunta"
                                                                        value={this.state.dataActual.encuestas[i][j]}
                                                                        onChange={e => { this.handleChange(e, "encuestas", {i: i, j: j}) }}
                                                                    />
                                                                    <div className="d-flex align-items-center justify-content-end ml-4">
                                                                        <IconButton color="primary" onClick={() => { this.confirmarDelete("encuestas", {i: i, j: j}); }}>
                                                                            <DeleteOutlined color="primary"/>
                                                                        </IconButton>
                                                                    </div>
                                                                </div>
                                                            </Paper>
                                                        ))
                                                    }
                                                    <Button variant="contained" color="primary" fullWidth size="large" onClick={() => { this.addElement("encuestas", i); }}>
                                                        <Add className="d-block mx-auto"/>
                                                    </Button>
                                                    <hr className="my-4"/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                );
                break;
            case 2:
                tabMostrado = (
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>    
                                <VirtualList
                                    width="100%"
                                    height="65vh"
                                    itemCount={this.state.dataActual.prueba.length}
                                    itemSize={450}
                                    renderItem={({index, style}) =>
                                        <div key={index} style={style}>
                                            <Translation>
                                                {
                                                    t => (
                                                        <Paper className="p-4 mb-4" ref={element => { this.state.refs.prueba.push(element); }}>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <TextField
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    className="w-100 w-md-auto"
                                                                    multiline
                                                                    rows={2}
                                                                    label={t("instrumento.descriptores-codigo")}
                                                                    name="codigoDescriptor"
                                                                    value={this.state.dataActual.prueba[index].codigoDescriptor}
                                                                    onChange={e => { this.handleChange(e, "prueba", index) }}
                                                                />
                                                                <TextField
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    multiline
                                                                    rows={2}
                                                                    label={t("instrumento.encuestas-pregunta")}
                                                                    name="enunciado"
                                                                    className="w-100 w-md-auto flex-grow-1 mx-4"
                                                                    value={this.state.dataActual.prueba[index].enunciado}
                                                                    onChange={e => { this.handleChange(e, "prueba", index) }}
                                                                />
                                                                <div className="d-flex align-items-center justify-content-end">
                                                                    <IconButton color="primary" onClick={() => { this.confirmarDelete("prueba", index); }}>
                                                                        <DeleteOutlined color="primary"/>
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                            <div className="d-md-flex align-items-center justify-content-start mt-3">
                                                                <FormControl component="fieldset" className="w-100">
                                                                    <RadioGroup name={`${this.state.dataActual.prueba[index].id}-respuestas`} value={this.state.dataActual.prueba[index].respuesta} onChange={e => { this.changeRespuestaPrueba(e, "prueba", index); }} className="w-100">
                                                                        {
                                                                            this.state.dataActual.prueba[index].opciones.map((opcion, j) => (
                                                                                <div className="w-100 d-block d-flex align-items-center justify-content-between" key={j}>
                                                                                    <FormControlLabel
                                                                                        value={opcion}
                                                                                        control={<Radio color="primary" />}
                                                                                        label={opcion}
                                                                                        labelPlacement="end"
                                                                                    />
                                                                                    <div className="ml-3">
                                                                                        <IconButton color="primary" onClick={() => { this.deleteRespuestaOption("prueba", { i: index, j: j }); }}>
                                                                                            <Cancel color="primary"/>
                                                                                        </IconButton>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                        <Button variant="outlined" color="primary" className="mt-3 w-auto flex-grow-0 align-self-start" onClick={() => { this.toggleNewRespuestaOption("prueba", index); }}>{t("instrumento.agregar-opcion-respuesta")}</Button>
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>
                                                        </Paper>
                                                    )
                                                }
                                            </Translation>
                                        </div>
                                    }
                                />

                                <Button className="mt-4 mt-md-2" variant="contained" color="primary" fullWidth size="large" onClick={() => { this.addElement("prueba"); }}>
                                    <Add className="d-block mx-auto"/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                );
                break;
            case 3:
                /* tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12} className="pb-md-0">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} className="instrumento-viewer">
                                            {
                                                this.state.dataActual.preentrevista.map((grupo, i) => (
                                                    <React.Fragment key={i}>
                                                        <ChopList
                                                            itemCount={grupo.length}
                                                            itemRenderer={({key, index, style}) => {
                                                                return (
                                                                    <div key={key}>
                                                                        <Paper className="p-4 mb-4" key={index}>
                                                                            <Grid container spacing={3}>
                                                                                <Grid item xs={4} md={2}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("ID")}
                                                                                        name="id"
                                                                                        value={this.state.dataActual.preentrevista[i][index].id}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={4} md={2}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.grupo")}
                                                                                        name="group"
                                                                                        value={this.state.dataActual.preentrevista[i][index].group}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={4} md={2}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.subgrupo")}
                                                                                        name="subgroup"
                                                                                        value={this.state.dataActual.preentrevista[i][index].subgroup}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant="outlined" className="w-100">
                                                                                        <InputLabel>{t("instrumento.tipo-nivel")}</InputLabel>
                                                                                        <Select
                                                                                            value={this.state.dataActual.preentrevista[i][index].typeOfLevel}
                                                                                            onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: index }); }}
                                                                                            input={<OutlinedInput required 
                                                                                            name="typeOfLevel"/>}
                                                                                        >
                                                                                            <MenuItem value="ROOT">{t("instrumento.nivel-root")}</MenuItem>
                                                                                            <MenuItem value="MIDDLE">{t("instrumento.nivel-middle")}</MenuItem>
                                                                                            <MenuItem value="FINAL">{t("instrumento.nivel-final")}</MenuItem>
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant="outlined" className="w-100">
                                                                                        <InputLabel>{t("instrumento.tipo-respuesta")}</InputLabel>
                                                                                        <Select
                                                                                            value={this.state.dataActual.preentrevista[i][index].typeOfAnswer}
                                                                                            onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: index }); }}
                                                                                            input={<OutlinedInput required 
                                                                                            name="typeOfAnswer"/>}
                                                                                        >
                                                                                            <MenuItem value="RADIO">{t("instrumento.answer-radio")}</MenuItem>
                                                                                            <MenuItem value="CHECKBOX">{t("instrumento.answer-checkbox")}</MenuItem>
                                                                                            <MenuItem value="INPUT">{t("instrumento.answer-input")}</MenuItem>
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.triggered-by")}
                                                                                        name="isTriggeredBy"
                                                                                        value={this.state.dataActual.preentrevista[i][index].isTriggeredBy}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.trigger-for")}
                                                                                        name="isTriggerFor"
                                                                                        value={this.state.dataActual.preentrevista[i][index].isTriggerFor}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("pregunta")}
                                                                                        name="label"
                                                                                        value={this.state.dataActual.preentrevista[i][index].label}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.evidencia")}
                                                                                        name="evidencia"
                                                                                        value={this.state.dataActual.preentrevista[i][index].evidencia}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                {
                                                                                    this.state.dataActual.preentrevista[i][index].typeOfAnswer === "RADIO" || this.state.dataActual.preentrevista[i][index].typeOfAnswer === "CHECKBOX" ? (
                                                                                        <Grid item xs={12}>
                                                                                            <Typography variant="body1" className="mb-3"><strong>{t("instrumento.respuestas-opciones")}</strong></Typography>
                                                                                            {
                                                                                                <FormControl component="fieldset" className="w-100">
                                                                                                    <RadioGroup name={`${this.state.dataActual.preentrevista[i][index].id}-respuestas`} value={this.state.dataActual.preentrevista[i].respuesta} onChange={e => { this.changeRespuestaPrueba(e, "preentrevista", i); }} className="w-100">
                                                                                                        {
                                                                                                            this.state.dataActual.preentrevista[i][index].options.map((opcion, k) => (
                                                                                                                <div className="w-100 d-block d-flex align-items-center justify-content-between" key={k}>
                                                                                                                    <Typography variant="body1">{opcion}</Typography>
                                                                                                                    <div className="ml-3">
                                                                                                                        <IconButton color="primary" onClick={() => { this.deleteRespuestaOption("preentrevista", { i: i, j: index, k: k }); }}>
                                                                                                                            <Cancel color="primary"/>
                                                                                                                        </IconButton>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            ))
                                                                                                        }
                                                                                                        <Button variant="outlined" color="primary" className="mt-3 w-auto flex-grow-0 align-self-start" onClick={() => { this.toggleNewRespuestaOption("preentrevista", {i: i, j: index}); }}>{t("instrumento.agregar-opcion-respuesta")}</Button>
                                                                                                    </RadioGroup>
                                                                                                </FormControl>
                                                                                            }
                                                                                        </Grid>
                                                                                    ) : null
                                                                                }
                                                                                <Grid item xs={12}>
                                                                                    <hr className="mt-0 mb-4"/>
                                                                                    <Button fullWidth className="w-100" variant="outlined" color="primary" onClick={() => { this.confirmarDelete("preentrevista", {i: i, j: index}); }}>
                                                                                        <DeleteOutlined color="primary" className="mr-1" fontSize="small"/>
                                                                                        {t("instrumento.preentrevista-borrar-pregunta")}
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Paper>
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                        <div className="d-flex align-items-stretch justify-content-between mt-5 mt-md-3">
                                                            <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto" onClick={() => { this.confirmarDelete("preentrevista-grupo", i); }}>
                                                                <DeleteOutlined style={{color: "#ffffff"}} className="mr-1" fontSize="small"/>
                                                                {t("instrumento.borrar-grupo")}
                                                            </Button>
                                                            <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto ml-5 ml-md-0" onClick={() => { this.addElement("preentrevista", i); }}>
                                                                <Add className="d-block mx-auto mr-1" fontSize="small"/>
                                                                {t("instrumento.nueva-pregunta")}
                                                            </Button>
                                                        </div>
                                                        <hr className="my-5"/>
                                                    </React.Fragment>
                                                ))
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                ); */

                /* tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <div className="instrumento-viewer">
                                                <DVL
                                                    windowContainer={false}
                                                    buffer={5}
                                                    items={this.state.dataActual.preentrevista}
                                                    onRender={(grupo, i) => (
                                                        <div key={`${grupo.length}-${i}`}>
                                                            <div className="instrumento-viewer">
                                                                <DVL
                                                                    windowContainer={false}
                                                                    buffer={5}
                                                                    items={grupo}
                                                                    onRender={(item, index) => (
                                                                        <Paper className="p-4 mb-4" key={`${item.group}-${item.id}`}>
                                                                            <Grid container spacing={3}>
                                                                                <Grid item xs={6} sm={4} md={2}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("ID")}
                                                                                        name="id"
                                                                                        value={this.state.dataActual.preentrevista[i][index].id}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={6} sm={4} md={2}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.grupo")}
                                                                                        name="group"
                                                                                        value={this.state.dataActual.preentrevista[i][index].group}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={6} sm={4} md={2}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.subgrupo")}
                                                                                        name="subgroup"
                                                                                        value={this.state.dataActual.preentrevista[i][index].subgroup}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant="outlined" className="w-100">
                                                                                        <InputLabel>{t("instrumento.tipo-nivel")}</InputLabel>
                                                                                        <Select
                                                                                            value={this.state.dataActual.preentrevista[i][index].typeOfLevel}
                                                                                            onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: index }); }}
                                                                                            input={<OutlinedInput required 
                                                                                            name="typeOfLevel"/>}
                                                                                        >
                                                                                            <MenuItem value="ROOT">{t("instrumento.nivel-root")}</MenuItem>
                                                                                            <MenuItem value="MIDDLE">{t("instrumento.nivel-middle")}</MenuItem>
                                                                                            <MenuItem value="FINAL">{t("instrumento.nivel-final")}</MenuItem>
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <FormControl variant="outlined" className="w-100">
                                                                                        <InputLabel>{t("instrumento.tipo-respuesta")}</InputLabel>
                                                                                        <Select
                                                                                            value={this.state.dataActual.preentrevista[i][index].typeOfAnswer}
                                                                                            onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: index }); }}
                                                                                            input={<OutlinedInput required 
                                                                                            name="typeOfAnswer"/>}
                                                                                        >
                                                                                            <MenuItem value="RADIO">{t("instrumento.answer-radio")}</MenuItem>
                                                                                            <MenuItem value="CHECKBOX">{t("instrumento.answer-checkbox")}</MenuItem>
                                                                                            <MenuItem value="INPUT">{t("instrumento.answer-input")}</MenuItem>
                                                                                        </Select>
                                                                                    </FormControl>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.triggered-by")}
                                                                                        name="isTriggeredBy"
                                                                                        value={this.state.dataActual.preentrevista[i][index].isTriggeredBy}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.trigger-for")}
                                                                                        name="isTriggerFor"
                                                                                        value={this.state.dataActual.preentrevista[i][index].isTriggerFor}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("pregunta")}
                                                                                        name="label"
                                                                                        value={this.state.dataActual.preentrevista[i][index].label}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <TextField
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        className="w-100"
                                                                                        label={t("instrumento.evidencia")}
                                                                                        name="evidencia"
                                                                                        value={this.state.dataActual.preentrevista[i][index].evidencia}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                    />
                                                                                </Grid>
                                                                                {
                                                                                    this.state.dataActual.preentrevista[i][index].typeOfAnswer === "RADIO" || this.state.dataActual.preentrevista[i][index].typeOfAnswer === "CHECKBOX" ? (
                                                                                        <Grid item xs={12}>
                                                                                            <Typography variant="body1" className="mb-3"><strong>{t("instrumento.respuestas-opciones")}</strong></Typography>
                                                                                            {
                                                                                                <FormControl component="fieldset" className="w-100">
                                                                                                    <RadioGroup name={`${this.state.dataActual.preentrevista[i][index].id}-respuestas`} value={this.state.dataActual.prueba[i].respuesta} onChange={e => { this.changeRespuestaPrueba(e, i); }} className="w-100">
                                                                                                        {
                                                                                                            this.state.dataActual.preentrevista[i][index].options.map((opcion, k) => (
                                                                                                                <div className="w-100 d-block d-flex align-items-center justify-content-between" key={k}>
                                                                                                                    <Typography variant="body1">{opcion}</Typography>
                                                                                                                    <div className="ml-3">
                                                                                                                        <IconButton color="primary" onClick={() => { this.deleteRespuestaOption("preentrevista", { i: i, j: index, k: k }); }}>
                                                                                                                            <Cancel color="primary"/>
                                                                                                                        </IconButton>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            ))
                                                                                                        }
                                                                                                        <Button variant="outlined" color="primary" className="mt-3 w-auto flex-grow-0 align-self-start" onClick={() => { this.toggleNewRespuestaOption("preentrevista", {i: i, j: index}); }}>{t("instrumento.agregar-opcion-respuesta")}</Button>
                                                                                                    </RadioGroup>
                                                                                                </FormControl>
                                                                                            }
                                                                                        </Grid>
                                                                                    ) : null
                                                                                }
                                                                                <Grid item xs={12}>
                                                                                    <hr className="mt-0 mb-4"/>
                                                                                    <Button fullWidth className="w-100" variant="outlined" color="primary" onClick={() => { this.confirmarDelete("preentrevista", {i: i, j: index}); }}>
                                                                                        <DeleteOutlined color="primary" className="mr-1" fontSize="small"/>
                                                                                        {t("instrumento.preentrevista-borrar-pregunta")}
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Paper>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="d-flex align-items-stretch justify-content-between mt-5 mt-md-3">
                                                                <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto" onClick={() => { this.confirmarDelete("preentrevista-grupo", i); }}>
                                                                    <DeleteOutlined style={{color: "#ffffff"}} className="mr-1" fontSize="small"/>
                                                                    {t("instrumento.borrar-grupo")}
                                                                </Button>
                                                                <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto ml-5 ml-md-0" onClick={() => { this.addElement("preentrevista", i); }}>
                                                                    <Add className="d-block mx-auto mr-1" fontSize="small"/>
                                                                    {t("instrumento.nueva-pregunta")}
                                                                </Button>
                                                            </div>
                                                            <hr className="my-5"/>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                ); */

                /* tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            {
                                                this.state.dataActual.preentrevista.map((grupo, i) => (
                                                    <div key={i}>
                                                        <VirtualList
                                                            ref={element => { this.state.virtualListsRefs.preentrevista.push(element); }}
                                                            width="100%"
                                                            height="65vh"
                                                            itemCount={grupo.length}
                                                            itemSize={index => {
                                                                if (this.state.refs.preentrevista.length === 0) {;
                                                                    return 670;
                                                                } else {
                                                                    console.log(`Altura grupo ${i} index ${index} = ${this.state.refs.preentrevista[i].clientHeight}`);
                                                                    return this.state.refs.preentrevista[index].clientHeight + 50;
                                                                }
                                                            }}
                                                            renderItem={({index, style}) => (
                                                                <div key={index} style={style}>
                                                                    <Paper className="p-4 mb-4" key={index} ref={element => { this.state.refs.preentrevista.push(element); }}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={6} sm={4} md={2}>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    className="w-100"
                                                                                    label={t("ID")}
                                                                                    name="id"
                                                                                    value={this.state.dataActual.preentrevista[i][index].id}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={6} sm={4} md={2}>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    className="w-100"
                                                                                    label={t("instrumento.grupo")}
                                                                                    name="group"
                                                                                    value={this.state.dataActual.preentrevista[i][index].group}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={6} sm={4} md={2}>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    className="w-100"
                                                                                    label={t("instrumento.subgrupo")}
                                                                                    name="subgroup"
                                                                                    value={this.state.dataActual.preentrevista[i][index].subgroup}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={3}>
                                                                                <FormControl variant="outlined" className="w-100">
                                                                                    <InputLabel>{t("instrumento.tipo-nivel")}</InputLabel>
                                                                                    <Select
                                                                                        value={this.state.dataActual.preentrevista[i][index].typeOfLevel}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: index }); }}
                                                                                        input={<OutlinedInput required 
                                                                                        name="typeOfLevel"/>}
                                                                                    >
                                                                                        <MenuItem value="ROOT">{t("instrumento.nivel-root")}</MenuItem>
                                                                                        <MenuItem value="MIDDLE">{t("instrumento.nivel-middle")}</MenuItem>
                                                                                        <MenuItem value="FINAL">{t("instrumento.nivel-final")}</MenuItem>
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={3}>
                                                                                <FormControl variant="outlined" className="w-100">
                                                                                    <InputLabel>{t("instrumento.tipo-respuesta")}</InputLabel>
                                                                                    <Select
                                                                                        value={this.state.dataActual.preentrevista[i][index].typeOfAnswer}
                                                                                        onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: index }); }}
                                                                                        input={<OutlinedInput required 
                                                                                        name="typeOfAnswer"/>}
                                                                                    >
                                                                                        <MenuItem value="RADIO">{t("instrumento.answer-radio")}</MenuItem>
                                                                                        <MenuItem value="CHECKBOX">{t("instrumento.answer-checkbox")}</MenuItem>
                                                                                        <MenuItem value="INPUT">{t("instrumento.answer-input")}</MenuItem>
                                                                                    </Select>
                                                                                </FormControl>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    className="w-100"
                                                                                    label={t("instrumento.triggered-by")}
                                                                                    name="isTriggeredBy"
                                                                                    value={this.state.dataActual.preentrevista[i][index].isTriggeredBy}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    className="w-100"
                                                                                    label={t("instrumento.trigger-for")}
                                                                                    name="isTriggerFor"
                                                                                    value={this.state.dataActual.preentrevista[i][index].isTriggerFor}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    className="w-100"
                                                                                    label={t("pregunta")}
                                                                                    name="label"
                                                                                    value={this.state.dataActual.preentrevista[i][index].label}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <TextField
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    className="w-100"
                                                                                    label={t("instrumento.evidencia")}
                                                                                    name="evidencia"
                                                                                    value={this.state.dataActual.preentrevista[i][index].evidencia}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                                />
                                                                            </Grid>
                                                                            {
                                                                                this.state.dataActual.preentrevista[i][index].typeOfAnswer === "RADIO" || this.state.dataActual.preentrevista[i][index].typeOfAnswer === "CHECKBOX" ? (
                                                                                    <Grid item xs={12}>
                                                                                        <Typography variant="body1" className="mb-3"><strong>{t("instrumento.respuestas-opciones")}</strong></Typography>
                                                                                        {
                                                                                            <FormControl component="fieldset" className="w-100">
                                                                                                <RadioGroup name={`${this.state.dataActual.preentrevista[i][index].id}-respuestas`} value={this.state.dataActual.prueba[i].respuesta} onChange={e => { this.changeRespuestaPrueba(e, i); }} className="w-100">
                                                                                                    {
                                                                                                        this.state.dataActual.preentrevista[i][index].options.map((opcion, k) => (
                                                                                                            <div className="w-100 d-block d-flex align-items-center justify-content-between" key={k}>
                                                                                                                <Typography variant="body1">{opcion}</Typography>
                                                                                                                <div className="ml-3">
                                                                                                                    <IconButton color="primary" onClick={() => { this.deleteRespuestaOption("preentrevista", { i: i, j: index, k: k }); }}>
                                                                                                                        <Cancel color="primary"/>
                                                                                                                    </IconButton>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }
                                                                                                    <Button variant="outlined" color="primary" className="mt-3 w-auto flex-grow-0 align-self-start" onClick={() => { this.toggleNewRespuestaOption("preentrevista", {i: i, j: index}); }}>{t("instrumento.agregar-opcion-respuesta")}</Button>
                                                                                                </RadioGroup>
                                                                                            </FormControl>
                                                                                        }
                                                                                    </Grid>
                                                                                ) : null
                                                                            }
                                                                            <Grid item xs={12}>
                                                                                <hr className="mt-0 mb-4"/>
                                                                                <Button fullWidth className="w-100" variant="outlined" color="primary" onClick={() => { this.confirmarDelete("preentrevista", {i: i, j: index}); }}>
                                                                                    <DeleteOutlined color="primary" className="mr-1" fontSize="small"/>
                                                                                    {t("instrumento.preentrevista-borrar-pregunta")}
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Paper>
                                                                </div>
                                                            )}
                                                        />
                                                        <div className="d-flex align-items-stretch justify-content-between mt-5 mt-md-3">
                                                            <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto" onClick={() => { this.confirmarDelete("preentrevista-grupo", i); }}>
                                                                <DeleteOutlined style={{color: "#ffffff"}} className="mr-1" fontSize="small"/>
                                                                {t("instrumento.borrar-grupo")}
                                                            </Button>
                                                            <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto ml-5 ml-md-0" onClick={() => { this.addElement("preentrevista", i); }}>
                                                                <Add className="d-block mx-auto mr-1" fontSize="small"/>
                                                                {t("instrumento.nueva-pregunta")}
                                                            </Button>
                                                        </div>
                                                        <hr className="my-5"/>
                                                    </div>
                                                ))
                                            }
                                            <Button variant="outlined" color="primary" fullWidth size="large" onClick={() => { this.addElement("preentrevista-grupo"); }}>{t("instrumento.preentrevista-nuevo-grupo")}</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Translation>
                ); */

                tabMostrado = (
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            {
                                                this.state.dataActual.preentrevista.map((grupo, i) => (
                                                    <div key={i}>
                                                        {
                                                            grupo.map((pregunta, j) => (
                                                                <Paper className="p-4 mb-4" key={j}>
                                                                    <Grid container spacing={3}>
                                                                        <Grid item xs={6} md={2}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                className="w-100"
                                                                                label={t("ID")}
                                                                                name="id"
                                                                                value={this.state.dataActual.preentrevista[i][j].id}
                                                                                onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: j}) }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={6} md={2}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                className="w-100"
                                                                                label={t("instrumento.grupo")}
                                                                                name="group"
                                                                                value={this.state.dataActual.preentrevista[i][j].group}
                                                                                onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: j}) }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={6} md={2}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                className="w-100"
                                                                                label={t("instrumento.subgrupo")}
                                                                                name="subgroup"
                                                                                value={this.state.dataActual.preentrevista[i][j].subgroup}
                                                                                onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: j}) }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={3}>
                                                                            <FormControl variant="outlined" className="w-100">
                                                                                <InputLabel>{t("instrumento.tipo-nivel")}</InputLabel>
                                                                                <Select
                                                                                    value={this.state.dataActual.preentrevista[i][j].typeOfLevel}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: j }); }}
                                                                                    input={<OutlinedInput required 
                                                                                    name="typeOfLevel"/>}
                                                                                >
                                                                                    <MenuItem value="ROOT">{t("instrumento.nivel-root")}</MenuItem>
                                                                                    <MenuItem value="MIDDLE">{t("instrumento.nivel-middle")}</MenuItem>
                                                                                    <MenuItem value="FINAL">{t("instrumento.nivel-final")}</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={3}>
                                                                            <FormControl variant="outlined" className="w-100">
                                                                                <InputLabel>{t("instrumento.tipo-respuesta")}</InputLabel>
                                                                                <Select
                                                                                    value={this.state.dataActual.preentrevista[i][j].typeOfAnswer}
                                                                                    onChange={e => { this.handleChange(e, "preentrevista", { i: i, j: j }); }}
                                                                                    input={<OutlinedInput required 
                                                                                    name="typeOfAnswer"/>}
                                                                                >
                                                                                    <MenuItem value="RADIO">{t("instrumento.answer-radio")}</MenuItem>
                                                                                    <MenuItem value="CHECKBOX">{t("instrumento.answer-checkbox")}</MenuItem>
                                                                                    <MenuItem value="INPUT">{t("instrumento.answer-input")}</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                className="w-100"
                                                                                label={t("instrumento.triggered-by")}
                                                                                name="isTriggeredBy"
                                                                                value={this.state.dataActual.preentrevista[i][j].isTriggeredBy}
                                                                                onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: j}) }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                className="w-100"
                                                                                label={t("instrumento.trigger-for")}
                                                                                name="isTriggerFor"
                                                                                value={this.state.dataActual.preentrevista[i][j].isTriggerFor}
                                                                                onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: j}) }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                className="w-100"
                                                                                label={t("pregunta")}
                                                                                name="label"
                                                                                value={this.state.dataActual.preentrevista[i][j].label}
                                                                                onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: j}) }}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={12}>
                                                                            <TextField
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                className="w-100"
                                                                                label={t("instrumento.evidencia")}
                                                                                name="evidencia"
                                                                                value={this.state.dataActual.preentrevista[i][j].evidencia}
                                                                                onChange={e => { this.handleChange(e, "preentrevista", {i: i, j: j}) }}
                                                                            />
                                                                        </Grid>
                                                                        {
                                                                            this.state.dataActual.preentrevista[i][j].typeOfAnswer === "RADIO" || this.state.dataActual.preentrevista[i][j].typeOfAnswer === "CHECKBOX" ? (
                                                                                <Grid item xs={12}>
                                                                                    <Typography variant="body1" className="mb-3"><strong>{t("instrumento.respuestas-opciones")}</strong></Typography>
                                                                                    {
                                                                                        <FormControl component="fieldset" className="w-100">
                                                                                            <RadioGroup name={`${this.state.dataActual.preentrevista[i][j].id}-respuestas`} value={this.state.dataActual.prueba[i].respuesta} onChange={e => { this.changeRespuestaPrueba(e, i); }} className="w-100">
                                                                                                {
                                                                                                    this.state.dataActual.preentrevista[i][j].options.map((opcion, k) => (
                                                                                                        <div className="w-100 d-block d-flex align-items-center justify-content-between" key={k}>
                                                                                                            <Typography variant="body1">{opcion}</Typography>
                                                                                                            <div className="ml-3">
                                                                                                                <IconButton color="primary" onClick={() => { this.deleteRespuestaOption("preentrevista", { i: i, j: j, k: k }); }}>
                                                                                                                    <Cancel color="primary"/>
                                                                                                                </IconButton>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    ))
                                                                                                }
                                                                                                <Button variant="outlined" color="primary" className="mt-3 w-auto flex-grow-0 align-self-start" onClick={() => { this.toggleNewRespuestaOption("preentrevista", {i: i, j: j}); }}>{t("instrumento.agregar-opcion-respuesta")}</Button>
                                                                                            </RadioGroup>
                                                                                        </FormControl>
                                                                                    }
                                                                                </Grid>
                                                                            ) : null
                                                                        }
                                                                        <Grid item xs={12}>
                                                                            <hr className="mt-0 mb-4"/>
                                                                            <Button fullWidth className="w-100" variant="outlined" color="primary" onClick={() => { this.confirmarDelete("preentrevista", {i: i, j: j}); }}>
                                                                                <DeleteOutlined color="primary" className="mr-1" fontSize="small"/>
                                                                                {t("instrumento.preentrevista-borrar-pregunta")}
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Paper>
                                                            ))
                                                        }
                                                        <div className="d-flex align-items-stretch justify-content-between">
                                                            <Button variant="contained" color="primary" size="large" className="w-auto" onClick={() => { this.confirmarDelete("preentrevista-grupo", i); }}>
                                                                <DeleteOutlined style={{color: "#ffffff"}} className="mr-1" fontSize="small"/>
                                                                {t("instrumento.borrar-grupo")}
                                                            </Button>
                                                            <Button variant="contained" color="primary" size="large" className="w-auto" onClick={() => { this.addElement("preentrevista", i); }}>
                                                                <Add className="d-block mx-md-auto mr-1" fontSize="small"/>
                                                                {t("instrumento.nueva-pregunta")}
                                                            </Button>
                                                        </div>
                                                        <hr className="my-5"/>
                                                    </div>
                                                ))
                                            }
                                            <Button variant="outlined" color="primary" fullWidth size="large" onClick={() => { this.addElement("preentrevista-grupo"); }}>{t("instrumento.preentrevista-nuevo-grupo")}</Button>
                                        </Grid>
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
                                <title>{`${t("instrumento.titulo-alt")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
                            <Grid container spacing={5} className="pb-5">
                                <Grid item xs={12}>
                                    <Typography variant="h5">{t("instrumento.titulo")}</Typography>
                                    <hr className="mb-4"/>
                                    <Paper>
                                        <Tabs
                                            variant="scrollable"
                                            indicatorColor="primary"
                                            textColor="primary"
                                            value={this.state.divisionMostrada}
                                            onChange={this.handleTabChange}
                                        >
                                            <Tab label={t("instrumento.tab-descriptores")}/>
                                            <Tab label={t("instrumento.tab-encuestas")}/>
                                            <Tab label={t("instrumento.tab-prueba")}/>
                                            <Tab label={t("instrumento.tab-preentrevista")}/>
                                        </Tabs>
                                    </Paper>
                                </Grid>
                                {
                                    this.state.isLoading ? <CircularProgress color="primary" className="d-block mx-auto my-5"/> : (
                                        <React.Fragment>
                                            { tabMostrado }
                                            <Grid item xs={12} className="pt-md-0 mb-md-5" hidden={!this.state.didDataChange}>
                                                <div className="d-md-flex align-items-center justify-content-end">
                                                    <Button variant="outlined" size="large" color="primary" className="w-100 w-md-auto">{t("instrumento.btn-crear")}</Button>
                                                    <Button className="mt-3 mt-md-0 ml-md-3 w-100 w-md-auto" variant="contained" size="large" color="primary">{t("instrumento.btn-actualizar")}</Button>
                                                </div>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                }
                            </Grid>
                            <Dialog open={this.state.shouldConfirmCreateVersion} onClose={this.confirmarCrearVersion}>
                                <DialogTitle>{t("dashboardDocente.cancelar-proceso-actual-titulo")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText className="mb-3">
                                        {t("dashboardDocente.cancelar-proceso-actual-ayuda")}
                                    </DialogContentText>
                                    <DialogContentText>
                                        {t("dashboardDocente.cancelar-proceso-actual-ayuda-2")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions className="p-3 pt-0 d-block d-md-flex">
                                    <Button color="primary" variant="outlined" onClick={this.confirmarCrearVersion} className="w-100 w-md-auto">{t("instrumento.crear-si")}</Button>
                                    <Button color="primary" variant="contained" onClick={this.crearVersion} className="ml-0 ml-md-3 mt-3 mt-md-0 w-100 w-md-auto">{t("instrumento.crear-no")}</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={this.state.shouldConfirmDelete} onClose={this.toggleDelete}>
                                <DialogTitle>{t("instrumento.eliminar")}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText className="mb-3">
                                        {t("instrumento.eliminar-ayuda")}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions className="p-3 pt-0 d-block d-md-flex">
                                    <Button color="primary" variant="outlined" onClick={this.deleteElement} className="w-100 w-md-auto">{t("instrumento.eliminar-si")}</Button>
                                    <Button color="primary" variant="contained" onClick={this.toggleDelete} className="ml-0 ml-md-3 mt-3 mt-md-0 w-100 w-md-auto">{t("instrumento.eliminar-no")}</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={this.state.shouldOpenNewRespuestaOptionForm} onClose={this.toggleNewRespuestaOption} maxWidth="md" fullWidth>
                                <DialogTitle>{t("instrumento.crear-opcion-respuesta")}</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        label={t("instrumento.respuesta")}
                                        name="pregunta"
                                        value={this.state.newRespuestaValue}
                                        onChange={this.updateNewRespuestaOption}
                                    />
                                </DialogContent>
                                <DialogActions className="p-3 pt-0 d-block d-md-flex">
                                    <Button color="primary" variant="outlined" onClick={this.toggleNewRespuestaOption} className="w-100 w-md-auto">{t("instrumento.crear-no")}</Button>
                                    <Button color="primary" variant="contained" onClick={this.addRespuestaOption} className="ml-0 ml-md-3 mt-3 mt-md-0 w-100 w-md-auto">{t("instrumento.crear-si")}</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Instrumento;