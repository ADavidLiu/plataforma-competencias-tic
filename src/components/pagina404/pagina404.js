import React from "react";
import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Pagina404 = props => {
    return (
        <React.Fragment>
            <Typography variant="h4">Página no encontrada</Typography>
            <Link to="/">
                <Button type="button" className="mt-4" color="primary" variant="contained" size="large">Regresar a inicio</Button>
            </Link>
        </React.Fragment>
    );
}

export default Pagina404;