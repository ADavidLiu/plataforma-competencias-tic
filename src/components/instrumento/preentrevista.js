import React from "react";

import { Translation } from "react-i18next";
import ChopList from "react-chop";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";

import Add from "@material-ui/icons/Add";
import Cancel from "@material-ui/icons/Cancel";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const Preentrevista = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid item xs={12} className="pb-md-0">
                        <Grid container spacing={3}>
                            <Grid item xs={12} className="instrumento-viewer">
                                {
                                    props.dataActual.preentrevista.map((grupo, i) => (
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
                                                                            value={props.dataActual.preentrevista[i][index].id}
                                                                            onChange={e => { props.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4} md={2}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            className="w-100"
                                                                            label={t("instrumento.grupo")}
                                                                            name="group"
                                                                            value={props.dataActual.preentrevista[i][index].group}
                                                                            onChange={e => { props.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={4} md={2}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            className="w-100"
                                                                            label={t("instrumento.subgrupo")}
                                                                            name="subgroup"
                                                                            value={props.dataActual.preentrevista[i][index].subgroup}
                                                                            onChange={e => { props.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={3}>
                                                                        <FormControl variant="outlined" className="w-100">
                                                                            <InputLabel>{t("instrumento.tipo-nivel")}</InputLabel>
                                                                            <Select
                                                                                value={props.dataActual.preentrevista[i][index].typeOfLevel}
                                                                                onChange={e => { props.handleChange(e, "preentrevista", { i: i, j: index }); }}
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
                                                                                value={props.dataActual.preentrevista[i][index].typeOfAnswer}
                                                                                onChange={e => { props.handleChange(e, "preentrevista", { i: i, j: index }); }}
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
                                                                            value={props.dataActual.preentrevista[i][index].isTriggeredBy}
                                                                            onChange={e => { props.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            className="w-100"
                                                                            label={t("instrumento.trigger-for")}
                                                                            name="isTriggerFor"
                                                                            value={props.dataActual.preentrevista[i][index].isTriggerFor}
                                                                            onChange={e => { props.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            className="w-100"
                                                                            label={t("pregunta")}
                                                                            name="label"
                                                                            value={props.dataActual.preentrevista[i][index].label}
                                                                            onChange={e => { props.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            className="w-100"
                                                                            label={t("instrumento.evidencia")}
                                                                            name="evidencia"
                                                                            value={props.dataActual.preentrevista[i][index].evidencia}
                                                                            onChange={e => { props.handleChange(e, "preentrevista", {i: i, j: index}) }}
                                                                        />
                                                                    </Grid>
                                                                    {
                                                                        props.dataActual.preentrevista[i][index].typeOfAnswer === "RADIO" || props.dataActual.preentrevista[i][index].typeOfAnswer === "CHECKBOX" ? (
                                                                            <Grid item xs={12}>
                                                                                <Typography variant="body1" className="mb-3"><strong>{t("instrumento.respuestas-opciones")}</strong></Typography>
                                                                                {
                                                                                    <FormControl component="fieldset" className="w-100">
                                                                                        <RadioGroup name={`${props.dataActual.preentrevista[i][index].id}-respuestas`} value={props.dataActual.preentrevista[i].respuesta} onChange={e => { props.changeRespuestaPrueba(e, "preentrevista", i); }} className="w-100">
                                                                                            {
                                                                                                props.dataActual.preentrevista[i][index].options.map((opcion, k) => (
                                                                                                    <div className="w-100 d-block d-flex align-items-center justify-content-between" key={k}>
                                                                                                        <Typography variant="body1">{opcion}</Typography>
                                                                                                        <div className="ml-3">
                                                                                                            <IconButton color="primary" onClick={() => { props.deleteRespuestaOption("preentrevista", { i: i, j: index, k: k }); }}>
                                                                                                                <Cancel color="primary"/>
                                                                                                            </IconButton>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))
                                                                                            }
                                                                                            <Button variant="outlined" color="primary" className="mt-3 w-auto flex-grow-0 align-self-start" onClick={() => { props.toggleNewRespuestaOption("preentrevista", {i: i, j: index}); }}>{t("instrumento.agregar-opcion-respuesta")}</Button>
                                                                                        </RadioGroup>
                                                                                    </FormControl>
                                                                                }
                                                                            </Grid>
                                                                        ) : null
                                                                    }
                                                                    <Grid item xs={12}>
                                                                        <hr className="mt-0 mb-4"/>
                                                                        <Button fullWidth className="w-100" variant="outlined" color="primary" onClick={() => { props.confirmarDelete("preentrevista", {i: i, j: index}); }}>
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
                                            <div className="d-flex align-items-stretch justify-content-between mt-3">
                                                <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto" onClick={() => { props.confirmarDelete("preentrevista-grupo", i); }}>
                                                    <DeleteOutlined style={{color: "#ffffff"}} className="mr-1" fontSize="small"/>
                                                    {t("instrumento.borrar-grupo")}
                                                </Button>
                                                <Button variant="contained" color="primary" size="large" className="w-100 w-md-auto ml-5 ml-md-0" onClick={() => { props.addElement("preentrevista", i); }}>
                                                    <Add className="d-block mx-auto mr-1" fontSize="small"/>
                                                    {t("instrumento.nueva-pregunta")}
                                                </Button>
                                            </div>
                                            <hr className="my-5"/>
                                        </React.Fragment>
                                    ))
                                }
                                <Button variant="contained" color="primary" size="large" className="w-100 mb-5" onClick={() => { props.addElement("preentrevista-grupo"); }}>
                                    <Add className="d-block mr-1" fontSize="small"/>
                                    {t("instrumento.nuevo-grupo")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </Translation>
    );
}

export default Preentrevista;