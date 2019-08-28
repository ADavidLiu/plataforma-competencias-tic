import React from "react";

import { T } from "react-polyglot-hooks";

import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Pagina404 = props => {
    return (
        <React.Fragment>
            <Typography variant="h4"><T phrase="404.titulo"/></Typography>
            <Link to="/">
                <Button type="button" className="mt-4" color="primary" variant="contained" size="large"><T phrase="404.btn"/></Button>
            </Link>
        </React.Fragment>
    );
}

export default Pagina404;