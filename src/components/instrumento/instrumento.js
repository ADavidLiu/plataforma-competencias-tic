import React, { PureComponent } from "react";

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

import TextField from "@material-ui/core/TextField";

import { equals } from "equally";
import df from "deeply-freeze";

import Descriptores from "./descriptores";
import Encuestas from "./encuestas";
import Prueba from "./prueba";
import Preentrevista from "./preentrevista";

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

class Instrumento extends PureComponent {
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
            indexNewRespuestaValue: 0
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
        if (prevState.dataActual !== this.state.dataActual) {
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
            case "preentrevista-grupo":
                newElements.splice(this.state.active.index, 1);
                newElements[this.state.active.index].push("");
                break;
            case "encuestas":
            case "preentrevista":
                newElements[this.state.active.index.i].splice(this.state.active.index.j, 1);

                if (newElements[this.state.active.index.i].length === 0) {
                    newElements.splice(this.state.active.index.i, 1);
                }
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoriaActiva]: newElements
            }
        }, () => {
            switch (this.state.active.category) {
                case "preentrevista-grupo":
                    newElements[this.state.active.index].pop();
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
                elementosActualizados.push("");
                break;
            case "encuestas":
                elementosActualizados[index.i][index.j] = e.target.value;
                elementosActualizados[index.i].push("");
                break;
            case "preentrevista":
                elementosActualizados[index.i][index.j][e.target.name] = e.target.value;
                elementosActualizados[index.i].push("");
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: elementosActualizados
            }
        }, () => {
            if (typeof index === "object") {
                elementosActualizados[index.i].pop();
            } else {
                switch (categoria) {
                    case "descriptores":
                    case "prueba":
                        elementosActualizados.pop();
                        break;
                    default:
                        elementosActualizados[index].pop();
                        break;
                }
            }

            this.setState({
                dataActual: {
                    ...this.state.dataActual,
                    [categoria]: elementosActualizados
                }
            });
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

        newElementos.push("");

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: newElementos
            }
        }, () => {
            newElementos.pop();
            this.setState({
                dataActual: {
                    ...this.state.dataActual,
                    [categoria]: newElementos
                }
            });
        });
    }

    addRespuestaOption = () => {
        this.toggleNewRespuestaOption();
        const newElementos = [...JSON.parse(JSON.stringify(this.state.dataActual[this.state.active.category]))];

        if (typeof this.state.indexNewRespuestaValue === "object") {
            newElementos[this.state.indexNewRespuestaValue.i][this.state.indexNewRespuestaValue.j].options.push(this.state.newRespuestaValue);
            newElementos[this.state.indexNewRespuestaValue.i].push("");
        } else {
            newElementos[this.state.indexNewRespuestaValue].opciones.push(this.state.newRespuestaValue);

            switch (this.state.active.category) {
                case "prueba":
                case "descriptores":
                    newElementos.push("");
                    break;
                default:
                    newElementos[this.state.indexNewRespuestaValue].push("");
                    break;
            }
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [this.state.active.category]: newElementos
            },
            newRespuestaValue: ""
        }, () => {
            if (typeof this.state.indexNewRespuestaValue === "object") {
                newElementos[this.state.indexNewRespuestaValue.i].pop();
            } else {
                switch (this.state.active.category) {
                    case "prueba":
                    case "descriptores":
                        newElementos.pop();
                        break;
                    default:
                        newElementos[this.state.indexNewRespuestaValue].pop();
                        break;
                }
            }

            this.setState({
                dataActual: {
                    ...this.state.dataActual,
                    [this.state.active.category]: newElementos
                }
            });
        });
    }

    deleteRespuestaOption = (categoria, index) => {
        const newElementos = [...JSON.parse(JSON.stringify(this.state.dataActual[categoria]))];
        
        switch (categoria) {
            case "prueba":
                newElementos[index.i].opciones.splice(index.j, 1);
                newElementos.push("");
                break;
            case "preentrevista":
                newElementos[index.i][index.j].options.splice(index.k, 1);
                newElementos[index.i].push("");
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [categoria]: newElementos
            }
        }, () => {
            if (categoria === "preentrevista") {
                newElementos[index.i].pop();
            } else {
                newElementos.pop();
            }

            this.setState({
                dataActual: {
                    ...this.state.dataActual,
                    [categoria]: newElementos
                }
            });
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
                tabMostrado = <Descriptores dataActual={this.state.dataActual} handleChange={this.handleChange} addElement={this.addElement} confirmarDelete={this.confirmarDelete}/>
                break;
            case 1:
                tabMostrado = <Encuestas dataActual={this.state.dataActual} handleChange={this.handleChange} addElement={this.addElement} confirmarDelete={this.confirmarDelete}/>
                break;
            case 2:
                tabMostrado = <Prueba dataActual={this.state.dataActual} handleChange={this.handleChange} changeRespuestaPrueba={this.changeRespuestaPrueba} deleteRespuestaOption={this.deleteRespuestaOption} toggleNewRespuestaOption={this.toggleNewRespuestaOption} addElement={this.addElement} confirmarDelete={this.confirmarDelete} />
                break;
            case 3:
                tabMostrado = <Preentrevista dataActual={this.state.dataActual} handleChange={this.handleChange} changeRespuestaPrueba={this.changeRespuestaPrueba} deleteRespuestaOption={this.deleteRespuestaOption} toggleNewRespuestaOption={this.toggleNewRespuestaOption} confirmarDelete={this.confirmarDelete} addElement={this.addElement}/>
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
                                            <Grid item xs={12} className="mb-md-5" hidden={!this.state.didDataChange}>
                                                <hr className="mb-5"/>
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