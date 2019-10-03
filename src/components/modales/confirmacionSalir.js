import React from "react";

import { Translation } from "react-i18next";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from "@material-ui/core/Button";

const ConfirmacionSalir = props => {
    let mensaje = "";
    if (props.guardar) {
        mensaje = (
            <Translation>
                {
                    t => t("salir.no-guardar-terminar")
                }
            </Translation>
        );
    } else {
        mensaje = (
            <Translation>
                {
                    t => t("salir.no-terminar")
                }
            </Translation>
        );
    }

    return (
        <Translation>
            {
                t => (
                    <React.Fragment>
                        <Dialog open={true}>
                            <DialogTitle>{t("salir.confirmar")}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    { mensaje }
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="pb-3">
                                <Button color="primary" variant="outlined" onClick={props.onConfirm}>{t("salir.si")}</Button>
                                <Button color="primary" variant="contained" onClick={props.onCancel} className="ml-3">{t("salir.no")}</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                )
            }
        </Translation>
    );
}

export default ConfirmacionSalir;