import React from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

const EstablecimientosForm = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-id")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="idNacional"
                                value={props.editingForm.idNacional}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-nombre")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="nombre"
                                value={props.editingForm.nombre}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-idInstitucion")}</Typography>
                            {/* Este valor debe actualizarse cuando se seleccione otra IE de la lista */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="idNacionalInstitucion"
                                value={props.editingForm.idNacionalInstitucion}
                                onChange={props.handleEdicionChange}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-nombreInstitucion")}</Typography>
                            <Select
                                className="w-100 mt-3"
                                value={props.editingForm.nombreInstitucion}
                                onChange={props.handleEdicionChange}
                                input={<OutlinedInput required name="nombreInstitucion"/>}
                            >
                                {/* Aquí se debe solicitar al backend la lista de Instituciones correspondientes */}
                                <MenuItem value="Institución John Doe">Institución John Doe</MenuItem>
                                <MenuItem value="Institución Jane Doe">Institución Jane Doe</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
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
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-departamento")}</Typography>
                            <Select
                                className="w-100 mt-3"
                                value={props.editingForm.departamento}
                                onChange={props.handleEdicionChange}
                                input={<OutlinedInput required name="departamento"/>}
                            >
                                { props.departamentos }
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-direccion")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="direccion"
                                value={props.editingForm.direccion}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-tipo-ubicacion")}</Typography>
                            <Select
                                className="w-100 mt-3"
                                value={props.editingForm.tipoUbicacion}
                                onChange={props.handleEdicionChange}
                                input={<OutlinedInput required name="tipoUbicacion"/>}
                            >
                                <MenuItem value="Barrio">{t("barrio")}</MenuItem>
                                <MenuItem value="Localidad">{t("localidad")}</MenuItem>
                                <MenuItem value="Vereda">{t("vereda")}</MenuItem>
                                <MenuItem value="Corregimiento">{t("corregimiento")}</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-nombre-ubicacion")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="nombreUbicacion"
                                value={props.editingForm.nombreUbicacion}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-zona")}</Typography>
                            <Select
                                className="w-100 mt-3"
                                value={props.editingForm.zona}
                                onChange={props.handleEdicionChange}
                                input={<OutlinedInput required name="zona"/>}
                            >
                                <MenuItem value="Rural">{t("rural")}</MenuItem>
                                <MenuItem value="Urbana">{t("urbana")}</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-regimen")}</Typography>
                            <Select
                                className="w-100 mt-3"
                                value={props.editingForm.regimen}
                                onChange={props.handleEdicionChange}
                                input={<OutlinedInput required name="regimen"/>}
                            >
                                <MenuItem value="Oficial">{t("oficial")}</MenuItem>
                                <MenuItem value="Privado">{t("privado")}</MenuItem>
                                <MenuItem value="Concesión">{t("concesion")}</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="body1">{t("usuarios.registro-ee-telefono")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="telefono"
                                type="tel"
                                value={props.editingForm.telefono}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1">{t("usuarios.registro-ee-email")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="emailInstitucional"
                                type="email"
                                value={props.editingForm.emailInstitucional}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1">{t("usuarios.registro-ee-web")}</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="sitioWeb"
                                value={props.editingForm.sitioWeb}
                                onChange={props.handleEdicionChange}
                            />
                        </Grid>
                    </Grid>
                )
            }
        </Translation>
    );
}

export default EstablecimientosForm;