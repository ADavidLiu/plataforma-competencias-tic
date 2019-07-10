import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            usuario: "",
            contrasenia: ""
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

        /* If success */
        this.props.history.push("/prueba");
    }

    render() {
        return (
			<div className="mb-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
				<Typography
					component="h1"
					variant="h5"
					className="mb-4 text-center"
				>
					<strong>Inicio de sesión</strong>
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
                                    label="Usuario"
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
                                    label="Contraseña"
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
                                    Ingresar
                                </Button>
                            </form>
                            <Link to="/registro">
                                <Typography variant="body2" className="mt-3" color="primary">¿Aún no tiene cuenta? Regístrese aquí.</Typography>
                            </Link>
						</Grid>
					</Grid>
				</FormControl>
			</div>
		);
    }
}

export default Login;