import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Login from "./components/login/login";

function App() {
	return (
    <React.Fragment>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">Plataforma de competencias TIC</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
				<CssBaseline />
        <div className="py-5">
          <Login />
        </div>
      </Container>
    </React.Fragment>
	);
}

export default App;
