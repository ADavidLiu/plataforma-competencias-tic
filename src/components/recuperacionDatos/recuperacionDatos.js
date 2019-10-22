import React, { Component } from "react";

import Helmet from "react-helmet";
import { Translation } from "react-i18next";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class RecuperacionDatos extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <React.Fragment>
                            <Helmet>
                                <title>{t("titulo.recuperacion-datos")}</title>
                            </Helmet>
                            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">

                            </div>
                        </React.Fragment>
                    )
                }
            </Translation>
        );
    }
}

export default RecuperacionDatos;