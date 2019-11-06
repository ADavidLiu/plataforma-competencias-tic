import React from "react";

import { Translation } from "react-i18next";
import ChopList from "react-chop";

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Add from "@material-ui/icons/Add";
import Cancel from "@material-ui/icons/Cancel";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const Prueba = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div className="instrumento-viewer no-scrollbar">
                                    <ChopList
                                        itemCount={props.dataActual.prueba.length}
                                        itemRenderer={({key, index, style}) => (
                                            <Paper className="p-4 mb-4 no-scrollbar" key={key}>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <TextField
                                                        inputProps={{
                                                            "aria-label": `${t("aria.codigo-descriptor")}`
                                                        }}
                                                        variant="outlined"
                                                        margin="normal"
                                                        className="w-100 w-md-auto"
                                                        multiline
                                                        rows={2}
                                                        label={t("instrumento.descriptores-codigo")}
                                                        name="codigoDescriptor"
                                                        value={props.dataActual.prueba[index].codigoDescriptor}
                                                        onChange={e => { props.handleChange(e, "prueba", index) }}
                                                    />
                                                    <TextField
                                                        inputProps={{
                                                            "aria-label": `${t("aria.pregunta")}`
                                                        }}
                                                        variant="outlined"
                                                        margin="normal"
                                                        multiline
                                                        rows={2}
                                                        label={t("instrumento.encuestas-pregunta")}
                                                        name="enunciado"
                                                        className="w-100 w-md-auto flex-grow-1 mx-4"
                                                        value={props.dataActual.prueba[index].enunciado}
                                                        onChange={e => { props.handleChange(e, "prueba", index) }}
                                                    />
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <IconButton aria-label={t("aria.eliminar-elemento")} color="primary" onClick={() => { props.confirmarDelete("prueba", index); }}>
                                                            <DeleteOutlined color="primary"/>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <div className="d-md-flex align-items-center justify-content-start mt-3">
                                                    <FormControl component="fieldset" className="w-100">
                                                        <RadioGroup name={`${props.dataActual.prueba[index].id}-respuestas`} value={props.dataActual.prueba[index].respuesta} onChange={e => { props.changeRespuestaPrueba(e, "prueba", index); }} className="w-100">
                                                            {
                                                                props.dataActual.prueba[index].opciones.map((opcion, j) => (
                                                                    <div className="w-100 d-block d-flex align-items-center justify-content-between" key={j}>
                                                                        <FormControlLabel
                                                                            value={opcion}
                                                                            control={<Radio color="primary" />}
                                                                            label={opcion}
                                                                            labelPlacement="end"
                                                                        />
                                                                        <div className="ml-3">
                                                                            <IconButton aria-label={t("aria.eliminar-elemento")} color="primary" onClick={() => { props.deleteRespuestaOption("prueba", { i: index, j: j }); }}>
                                                                                <Cancel color="primary"/>
                                                                            </IconButton>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                            <Button variant="outlined" color="primary" className="mt-3 w-auto flex-grow-0 align-self-start" onClick={() => { props.toggleNewRespuestaOption("prueba", index); }}>{t("instrumento.agregar-opcion-respuesta")}</Button>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </Paper>
                                        )}
                                    />
                                </div>
                                <Button aria-label={t("aria.agregar-elemento")} className="mt-4" variant="contained" color="primary" fullWidth size="large" onClick={() => { props.addElement("prueba"); }}>
                                    <Add className="d-block mx-auto"/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </Translation>
    );
}

export default Prueba;