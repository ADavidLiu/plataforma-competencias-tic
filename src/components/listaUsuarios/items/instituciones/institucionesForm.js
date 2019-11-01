import React from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

const InstitucionesForm = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1">{t("usuarios.registro-idNacional")}</Typography>
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
                        <Grid item xs={12} md={8}>
                            <Typography variant="body1">{t("usuarios.registro-nombre-ie")}</Typography>
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
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1">{t("usuarios.registro-pais")}</Typography>
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
                            <Typography variant="body1">{t("usuarios.registro-departamento")}</Typography>
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
                            <Typography variant="body1">{t("usuarios.registro-municipio")}</Typography>
                            <Select
                                className="w-100"
                                value={props.editingForm.municipio}
                                onChange={props.handleChangeLocationDropdown}
                                input={<OutlinedInput required name="municipio"/>}
                            >
                                { props.municipios }
                            </Select>
                        </Grid>
                    </Grid>
                )
            }
        </Translation>
    );
}

export default InstitucionesForm;