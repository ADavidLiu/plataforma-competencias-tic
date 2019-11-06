import React from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import Add from "@material-ui/icons/Add";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const Descriptores = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {
                                props.dataActual.descriptores.map((descriptor, i) => (
                                    <Grid key={i} item xs={12}>
                                        <Paper className="p-4">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <TextField
                                                    inputProps={{
                                                        "aria-label": `${t("aria.codigo-descriptor")}`
                                                    }}
                                                    variant="outlined"
                                                    margin="normal"
                                                    className="w-100 w-md-auto"
                                                    label={t("instrumento.descriptores-codigo")}
                                                    name="codigo"
                                                    value={props.dataActual.descriptores[i].codigo}
                                                    onChange={e => { props.handleChange(e, "descriptores", i) }}
                                                />
                                                <TextField
                                                    inputProps={{
                                                        "aria-label": `${t("aria.contenido-descriptor")}`
                                                    }}
                                                    variant="outlined"
                                                    margin="normal"
                                                    className="w-100 w-md-auto flex-grow-1 mx-4"
                                                    label={t("instrumento.descriptores-contenido")}
                                                    name="contenido"
                                                    value={props.dataActual.descriptores[i].contenido}
                                                    onChange={e => { props.handleChange(e, "descriptores", i) }}
                                                />
                                                <div className="d-flex align-items-center justify-content-end">
                                                    <IconButton aria-label={t("aria.eliminar-elemento")} color="primary" onClick={() => { props.confirmarDelete("descriptores", i); }}>
                                                        <DeleteOutlined color="primary"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </Paper>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={12}>
                                <Button aria-label={t("aria.agregar-elemento")} variant="contained" color="primary" fullWidth size="large" onClick={() => { props.addElement("descriptores"); }}>
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

export default Descriptores;