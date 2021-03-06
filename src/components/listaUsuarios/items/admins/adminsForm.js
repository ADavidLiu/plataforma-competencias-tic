import React from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const AdminsForm = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
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
                            <Typography variant="body1">{t("usuarios.registro-ee-nombre")}</Typography>
                            <TextField
                                inputProps={{
                                    "aria-label": `${t("aria.nombres")}`
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="nombre"
                                value={props.editingForm.nombre}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1">{t("usuarios.registro-ee-telefono")}</Typography>
                            <TextField
                                inputProps={{
                                    "aria-label": `${t("aria.telefono")}`
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="telefono"
                                value={props.editingForm.telefono}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{t("registro.email")}</Typography>
                            <TextField
                                inputProps={{
                                    "aria-label": `${t("aria.email")}`
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                value={props.editingForm.email}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1" className="mb-3">{t("usuarios.registro-pais")}</Typography>
                            <Select
                                className="w-100"
                                value={props.editingForm.pais}
                                onChange={props.handleChangeLocationDropdown}
                                input={<OutlinedInput required name="pais"/>}
                            >
                                <MenuItem value="CO-Colombia">Colombia</MenuItem>
                                <MenuItem value="VE-Venezuela">Venezuela</MenuItem>
                                <MenuItem value="PA-Panama">Panamá</MenuItem>
                                <MenuItem value="PE-Peru">Perú</MenuItem>
                                <MenuItem value="EC-Ecuador">Ecuador</MenuItem>
                                <MenuItem value="BO-Bolivia">Bolivia</MenuItem>
                                <MenuItem value="PY-Paraguay">Paraguay</MenuItem>
                                <MenuItem value="UY-Uruguay">Uruguay</MenuItem>
                                <MenuItem value="CL-Chile">Chile</MenuItem>
                                <MenuItem value="BR-Brasil">Brasil</MenuItem>
                                <MenuItem value="AR-Argentina">Argentina</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1" className="mb-3">{t("usuarios.registro-departamento")}</Typography>
                            <Select
                                className="w-100"
                                value={props.editingForm.departamento}
                                onChange={props.handleChangeLocationDropdown}
                                input={<OutlinedInput required name="departamento"/>}
                            >
                                { props.departamentos }
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1" className="mb-3">{t("usuarios.registro-municipio")}</Typography>
                            <Select
                                className="w-100"
                                value={props.editingForm.municipio}
                                onChange={props.handleChangeLocationDropdown}
                                input={<OutlinedInput required name="municipio"/>}
                            >
                                { props.municipios }
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{t("usuarios.registro-ee-direccion")}</Typography>
                            <TextField
                                inputProps={{
                                    "aria-label": `${t("aria.direccion")}`
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="direccion"
                                value={props.editingForm.direccion}
                                onChange={props.handleEdicionChange}
                            />
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

export default AdminsForm;