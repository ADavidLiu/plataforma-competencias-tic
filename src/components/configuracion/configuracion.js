import React, { Component } from "react";

import { T } from "react-polyglot-hooks";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

class Configuracion extends Component {
    constructor() {
        super();

        /* Conectarse al backend para traer la información de la configuración actual */
        this.state = {
            currentVersion: "1.0.0",
            selectedVersion: "1.0.0",
            availableVersions: ["1.0.0", "1.0.1"],
            currentLanguage: "es",
            selectedLanguage: "es",
            availableLangs: [
                {
                    code: "es",
                    label: "Español"
                },
                {
                    code: "en",
                    label: "English"
                }
            ]
        }
    }

    handleMenuItemChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12} className="mb-5">
                        <Typography variant="h5">
                            <T phrase="configuracion.titulo"/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className="mr-4">
                            <T phrase="configuracion.ajustes-plataforma"/>
                        </Typography>
                        <hr/>
                    </Grid>
                    <Grid item xs={12} className="mb-5">
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mr-4">
                                    <T phrase="configuracion.label-version"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="w-100">
                                    <Select
                                        value={this.state.selectedVersion}
                                        onChange={this.handleMenuItemChange}
                                        input={<OutlinedInput required 
                                        name="selectedVersion" id="version-instrumento"/>}
                                    >
                                        {
                                            this.state.availableVersions.map((version, i) => {
                                                return (
                                                    <MenuItem key={i} value={version}>{version}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mr-4">
                                    <T phrase="configuracion.label-idioma"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="w-100">
                                    <Select
                                        value={this.state.selectedLanguage}
                                        onChange={this.handleMenuItemChange}
                                        input={<OutlinedInput required name="selectedLanguage" id="idioma"/>}
                                    >
                                        {
                                            this.state.availableLangs.map((language, i) => {
                                                return (
                                                    <MenuItem key={i} value={language.code}>{language.label}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>



                    <Grid item xs={12}>
                        <Typography variant="h6" className="mr-4">
                            <T phrase="configuracion.ajustes-cuenta"/>
                        </Typography>
                        <hr/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mr-4">
                                    <T phrase="configuracion.label-version"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="w-100">
                                    <Select
                                        value={this.state.selectedVersion}
                                        onChange={this.handleMenuItemChange}
                                        input={<OutlinedInput required 
                                        name="selectedVersion" id="version-instrumento"/>}
                                    >
                                        {
                                            this.state.availableVersions.map((version, i) => {
                                                return (
                                                    <MenuItem key={i} value={version}>{version}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" className="mr-4">
                                    <T phrase="configuracion.label-idioma"/>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className="w-100">
                                    <Select
                                        value={this.state.selectedLanguage}
                                        onChange={this.handleMenuItemChange}
                                        input={<OutlinedInput required name="selectedLanguage" id="idioma"/>}
                                    >
                                        {
                                            this.state.availableLangs.map((language, i) => {
                                                return (
                                                    <MenuItem key={i} value={language.code}>{language.label}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Configuracion;