import React from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const DocentesForm = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-idNacional")}</Typography>
                            <TextField
                                inputProps={{
                                    "aria-label": `${t("aria.id-nacional")}`
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="idNacional"
                                value={props.editingForm.idNacional}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1">{t("usuarios.registro-nombre-docente")}</Typography>
                            <TextField
                                inputProps={{
                                    "aria-label": `${t("aria.nombre-completo")}`
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="nombreCompleto"
                                value={props.editingForm.nombreCompleto}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Typography variant="body1">{t("usuarios.registro-idEstablecimiento")}</Typography>
                            <TextField
                                inputProps={{
                                    "aria-label": `${t("aria.id-establecimiento")}`
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="idEstablecimiento"
                                value={props.editingForm.idEstablecimiento}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1">{t("usuarios.tiempo-restante")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="tiempoRestantePrueba"
                                value={props.editingForm.tiempoRestantePrueba}
                                onChange={props.handleEdicionChange}
                                inputProps={{
                                    min: 0,
                                    step: 1,
                                    "aria-label": `${t("aria.tiempo-restante")}`
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" className="mb-3">{t("usuarios.etapa-actual")}</Typography>
                            <Select
                                value={props.editingForm.etapaActualProceso}
                                onChange={props.handleEdicionChange}
                                input={<OutlinedInput required name="etapaActualProceso"/>}
                                fullWidth
                            >
                                <MenuItem value={"procesoPaso.1"}>{t("procesoPaso.1")}</MenuItem>
                                <MenuItem value={"procesoPaso.2"}>{t("procesoPaso.2")}</MenuItem>
                                <MenuItem value={"procesoPaso.3"}>{t("procesoPaso.3")}</MenuItem>
                                <MenuItem value={"procesoPaso.4"}>{t("procesoPaso.4")}</MenuItem>
                                <MenuItem value={"procesoPaso.finalizado"}>{t("procesoPaso.finalizado")}</MenuItem>
                            </Select>
                        </Grid>
                        {
                            props.accountType === "SUPERADMIN" || props.accountType === "ADMIN" ? (
                                <Grid item xs={12}>
                                    <Typography variant="body1" className="mb-3">{t("usuarios.roles")}</Typography>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={props.editingForm.roles.admin}
                                                    onChange={props.updateRoles}
                                                    value={true}
                                                    color="primary"
                                                    name="admin"
                                                    disabled={props.originalRole === "admins" ? true : false}
                                                />
                                            }
                                            label={t("roles.admin")}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={props.editingForm.roles.gobierno}
                                                    onChange={props.updateRoles}
                                                    value={true}
                                                    color="primary"
                                                    name="gobierno"
                                                    disabled={props.originalRole === "gobiernos" ? true : false}
                                                />
                                            }
                                            label={t("roles.gobierno")}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={props.editingForm.roles.evaluador}
                                                    onChange={props.updateRoles}
                                                    value={true}
                                                    color="primary"
                                                    name="evaluador"
                                                    disabled={props.originalRole === "evaluadores" ? true : false}
                                                />
                                            }
                                            label={t("roles.evaluador")}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={props.editingForm.roles.docente}
                                                    onChange={props.updateRoles}
                                                    value={true}
                                                    color="primary"
                                                    name="docente"
                                                    disabled={props.originalRole === "docentes" ? true : false}
                                                />
                                            }
                                            label={t("roles.docente")}
                                        />
                                    </FormGroup>
                                </Grid>
                            ) : null
                        }
                    </Grid>
                )
            }
        </Translation>
    );
}

export default DocentesForm;