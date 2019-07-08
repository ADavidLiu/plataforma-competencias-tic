import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Registro from "./components/registro/registro";

function App() {
	return (
    <React.Fragment>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">Plataforma de competencias TIC</Typography>
        </Toolbar>
      </AppBar>
      <Registro />
    </React.Fragment>
	);
}

export default App;
