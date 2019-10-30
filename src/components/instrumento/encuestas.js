import React, { Component } from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CircularProgress from "@material-ui/core/CircularProgress";

import Add from "@material-ui/icons/Add";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Encuestas extends Component {
    constructor() {
        super();

        this.state = {
            divisionMostrada: 0,
            isLoading: false
        }
    }

    handleTabChange = (e, newValue) => {
        this.setState({
            divisionMostrada: newValue,
            isLoading: true
        });

        const timeout = setTimeout(() => {
            this.setState({
                isLoading: false
            });
            clearTimeout(timeout);
        }, 1000);
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper>
                                        <Tabs
                                            variant="scrollable"
                                            indicatorColor="primary"
                                            textColor="primary"
                                            value={this.state.divisionMostrada}
                                            onChange={this.handleTabChange}
                                        >
                                            <Tab label={t("instrumento.tab-factor1")}/>
                                            <Tab label={t("instrumento.tab-factor2")}/>
                                            <Tab label={t("instrumento.tab-factor4")}/>
                                        </Tabs>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        this.state.isLoading ? <CircularProgress className="d-block mx-auto"/> : (
                                            <Grid item xs={12} className="pb-0">
                                                {
                                                    this.state.divisionMostrada !== 2 ? (
                                                        <Typography variant="h6" className="mb-4">{`${t("instrumento.encuestas-factor")} ${this.state.divisionMostrada + 1}`}</Typography>
                                                    ) : (
                                                        <Typography variant="h6" className="mb-4">{`${t("instrumento.encuestas-factor")} 4`}</Typography>
                                                    )
                                                }
                                                {
                                                    this.props.dataActual.encuestas[this.state.divisionMostrada].map((pregunta, j) => (
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
                                                                    value={this.props.dataActual.encuestas[this.state.divisionMostrada][j]}
                                                                    onChange={e => { this.props.handleChange(e, "encuestas", {i: this.state.divisionMostrada, j: j}) }}
                                                                />
                                                                <div className="d-flex align-items-center justify-content-end ml-4">
                                                                    <IconButton color="primary" onClick={() => { this.props.confirmarDelete("encuestas", {i: this.state.divisionMostrada, j: j}); }}>
                                                                        <DeleteOutlined color="primary"/>
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </Paper>
                                                    ))
                                                }
                                                <Button variant="contained" color="primary" fullWidth size="large" onClick={() => { this.props.addElement("encuestas", this.state.divisionMostrada); }}>
                                                    <Add className="d-block mx-auto"/>
                                                </Button>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default Encuestas;