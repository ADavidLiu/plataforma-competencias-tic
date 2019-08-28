import React, { Component } from "react";

import { T } from 'react-polyglot-hooks';
import Helmet from "react-helmet";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import axios from "axios";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            usuario: "",
            contrasenia: "",
            didSubmit: false
        }
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    login = e => {
        e.preventDefault();
        console.log("Conectarse al backend");

        axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/${process.env.REACT_APP_LOGIN}`, {
            email: this.state.usuario,
            password: this.state.contrasenia
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

        /* If success */
        this.setState({
            didSubmit: true
        });
        this.props.actualizarLogeado(true);
    }

    render() {
        if (this.state.didSubmit && this.props.isLogeado) {
            return <Redirect to="/" />;
        }

        return (
			<div className="mb-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <Helmet>
                    <title><T phrase="login.titulo"/></title>
                </Helmet>
				<Typography
					component="h1"
					variant="h5"
					className="mb-4 text-center"
				>
					<strong><T phrase="login.titulo" /></strong>
				</Typography>
				<FormControl
					component="fieldset"
					className="w-100 text-center"
				>
					<Grid container>
						<Grid item xs={12}>
                            <form onSubmit={this.login}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="usuario"
                                    label={<T phrase="login.usuario" />}
                                    name="usuario"
                                    value={this.state.usuario}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="contrasenia"
                                    label={<T phrase="login.contrasenia" />}
                                    name="contrasenia"
                                    type="password"
                                    value={this.state.contrasenia}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="mt-3"
                                    size="large"
                                >
                                    <T phrase="login.btn" />
                                </Button>
                            </form>
                            {/* <Link to="/registro">
                                <Typography variant="body2" className="mt-3" color="primary">¿Aún no tiene cuenta? Regístrese aquí.</Typography>
                            </Link> */}
						</Grid>
					</Grid>
				</FormControl>
			</div>
		);
    }
}

export default Login;