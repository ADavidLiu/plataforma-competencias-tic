import React from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import Add from "@material-ui/icons/Add";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const Encuestas = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {
                                props.dataActual.encuestas.map((factor, i) => (
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
                                                            value={props.dataActual.encuestas[i][j]}
                                                            onChange={e => { props.handleChange(e, "encuestas", {i: i, j: j}) }}
                                                        />
                                                        <div className="d-flex align-items-center justify-content-end ml-4">
                                                            <IconButton color="primary" onClick={() => { props.confirmarDelete("encuestas", {i: i, j: j}); }}>
                                                                <DeleteOutlined color="primary"/>
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            ))
                                        }
                                        <Button variant="contained" color="primary" fullWidth size="large" onClick={() => { props.addElement("encuestas", i); }}>
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
}

export default Encuestas;