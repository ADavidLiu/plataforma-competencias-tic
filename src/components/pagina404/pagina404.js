import React from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";

import Error from "@material-ui/icons/Error";

const Pagina404 = props => {
    function regresar() {
        props.history.goBack();
    }

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
                            <Button type="button" className="mt-5" color="primary" variant="contained" size="large" onClick={regresar}>{t("404.btn")}</Button>
                        </div>
                    </React.Fragment>
                )
            }
        </Translation>
    );
}

export default Pagina404;