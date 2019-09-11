import React from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Pagina404 = props => {
    return (
        <Translation>
            {
                t => (
                    <React.Fragment>
                        <Helmet>
                            <title>{t("titulo.404")}</title>
                        </Helmet>
                        <Typography variant="h4">{t("404.titulo")}</Typography>
                        <Link to="/">
                            <Button type="button" className="mt-4" color="primary" variant="contained" size="large">{t("404.btn")}</Button>
                        </Link>
                    </React.Fragment>
                )
            }
        </Translation>
    );
}

export default Pagina404;