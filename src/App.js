import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { BrowserRouter as Router, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Registro from "./components/registro/registro";
import Login from "./components/login/login";
import Prueba from "./components/prueba/prueba";

import "./styles/custom.css";

function App() {
	return (
    <Router>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">Plataforma de competencias TIC</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <div className="py-5">
          <Route path="/" exact component={Login} />
          <Route path="/login/" component={Login} />
          <Route path="/registro/" component={Registro} />
          <Route path="/prueba/" component={Prueba} />
        </div>
      </Container>
    </Router>
	);
}

export default App;
