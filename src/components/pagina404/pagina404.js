import React from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import Error from "@material-ui/icons/Error";

const Pagina404 = () => {
    return (
        <Translation>
            {
                t => (
                    <React.Fragment>
                        <Helmet>
                            <title>{t("titulo.404")}</title>
                        </Helmet>
                        <div className="text-center my-5 py-5">
                            <Error className="d-block mx-auto mb-5" style={{width: "100px", height: "100px"}} color="primary" />
                            <Typography variant="h2" className="mb-2">{t("404.subtitulo")}</Typography>
                            <Typography variant="h4">{t("404.titulo")}</Typography>
                            <Link to="/" style={{textDecoration: "none"}}>
                                <Button type="button" className="mt-5" color="primary" variant="contained" size="large">{t("404.btn")}</Button>
                            </Link>
                        </div>
                    </React.Fragment>
                )
            }
        </Translation>
    );
}

export default Pagina404;