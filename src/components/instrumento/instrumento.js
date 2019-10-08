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

import TextField from "@material-ui/core/TextField";

import descriptores from "../../models/descriptores";
import encuestas from "../../models/encuestas";
import preguntasPrueba from "../../models/preguntasPrueba";
import preguntasPreentrevista from "../../models/preentrevista-new";

import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Edit from '@material-ui/icons/Edit';
import Add from "@material-ui/icons/Add";

import { equals } from "equally";

encuestas.splice(2, 1);
const dataBackup = {
    descriptores: JSON.parse(JSON.stringify(descriptores)),
    encuestas: JSON.parse(JSON.stringify(encuestas)),
    prueba: JSON.parse(JSON.stringify(preguntasPrueba)),
    preentrevista: JSON.parse(JSON.stringify(preguntasPreentrevista))
}

class Instrumento extends Component {
    constructor() {
        super();
        
        this.dataOriginal = {
            descriptores: JSON.parse(JSON.stringify(descriptores)),
            encuestas: JSON.parse(JSON.stringify(encuestas)),
            prueba: JSON.parse(JSON.stringify(preguntasPrueba)),
            preentrevista: JSON.parse(JSON.stringify(preguntasPreentrevista))
        };

        this.state = {
            dataActual: JSON.parse(JSON.stringify(this.dataOriginal)),
            shouldConfirmCreateVersion: false,
            shouldConfirmDelete: false,
            divisionMostrada: 0,
            isLoading: true,
            didDataChange: false,
            active: {
                category: "descriptores",
                index: 0
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
        const newElements = this.state.dataActual[this.state.active.category];
        
        switch(this.state.active.category) {
            case "descriptores":
            case "prueba":
                newElements.splice(this.state.active.index, 1);
                break;
            case "encuestas":
                newElements[this.state.active.index.i].splice(this.state.active.index.j, 1);
                break;
            default:
                break;
        }

        this.setState({
            dataActual: {
                ...this.state.dataActual,
                [this.state.active.category]: newElements
            }
        });
    }

    handleChange = (e, categoria, index) => {
        const elementosActualizados = JSON.parse(JSON.stringify(this.state.dataActual[categoria]));

        switch (categoria) {
            case "descriptores":
            case "prueba":
                if (e.target.name === "codigo") {
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
        let copiaElementos = [...this.state.dataActual[categoria]];

        switch (categoria) {
            case "descriptores":
                copiaElementos.push({
                    codigo: "",
                    contenido: ""
                });
                break;
            case "encuestas":
                copiaElementos[index].push("");
                break;
            case "prueba":
                copiaElementos.push({
                    codigoDescriptor: "",
                    enunciado: "",
                    opciones: [],
                    respuesta: ""
                });
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
                    <Translation>
                        {
                            t => (
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            {
                                                this.state.dataActual.prueba.map((pregunta, i) => (
                                                    <Paper className="p-4 mb-4" key={i}>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                className="w-100 w-md-auto"
                                                                multiline
                                                                rows={2}
                                                                label={t("instrumento.descriptores-codigo")}
                                                                name="codigoDescriptor"
                                                                value={this.state.dataActual.prueba[i].codigoDescriptor}
                                                                onChange={e => { this.handleChange(e, "prueba", i) }}
                                                            />
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                multiline
                                                                rows={2}
                                                                label={t("instrumento.encuestas-pregunta")}
                                                                name="enunciado"
                                                                className="w-100 w-md-auto flex-grow-1 mx-4"
                                                                value={this.state.dataActual.prueba[i].enunciado}
                                                                onChange={e => { this.handleChange(e, "prueba", i) }}
                                                            />
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <IconButton color="primary" onClick={() => { this.confirmarDelete("prueba", i); }}>
                                                                    <DeleteOutlined color="primary"/>
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                ))
                                            }
                                            <Button variant="contained" color="primary" fullWidth size="large" onClick={() => { this.addElement("prueba"); }}>
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
            case 3:

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
                                            <Grid item xs={12} hidden={!this.state.didDataChange}>
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
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default Instrumento;