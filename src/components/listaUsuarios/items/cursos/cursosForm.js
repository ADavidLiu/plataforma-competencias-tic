import React from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Add from "@material-ui/icons/Add";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const Cursos = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid container alignItems="stretch" spacing={3}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    inputProps={{
                                        "aria-label": `${t("aria.nombre")}`
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    label={t("cursos.new-nombre")}
                                    name="nombre"
                                    value={props.editingForm.nombre}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    inputProps={{
                                        "aria-label": `${t("aria.resumen")}`
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    label={t("cursos.new-resumen")}
                                    multiline
                                    rows={5}
                                    name="resumen"
                                    value={props.editingForm.resumen}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">{t("cursos.new-mediacion")}</FormLabel>
                                <RadioGroup row name="mediacion" value={props.editingForm.mediacion} onChange={props.handleInputChange}>
                                    <FormControlLabel value="true" control={<Radio color="primary" />} label={t("si")} />
                                    <FormControlLabel value="false" control={<Radio color="primary" />} label={t("no")} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" className="w-100">
                                <InputLabel>{t("cursos.new-modalidad")}</InputLabel>
                                <Select
                                    value={props.editingForm.modalidad}
                                    onChange={props.handleInputChange}
                                    input={<OutlinedInput required name="modalidad"/>}
                                >
                                    <MenuItem value="presencial">{t("cursos.modalidad-presencial")}</MenuItem>
                                    <MenuItem value="virtual">{t("cursos.modalidad-virtual")}</MenuItem>
                                    <MenuItem value="blended">{t("cursos.modalidad-blended")}</MenuItem>
                                    <MenuItem value="cualquiera">{t("cursos.modalidad-cualquiera")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    variant="outlined"
                                    label={t("cursos.new-dedicacion")}
                                    fullWidth
                                    inputProps={{
                                        "type": "number",
                                        "aria-label": `${t("aria.horas-dedicacion")}`
                                    }}
                                    name="dedicacion"
                                    value={props.editingForm.dedicacion}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    inputProps={{
                                        "aria-label": `${t("aria.ubicacion")}`
                                    }}
                                    variant="outlined"
                                    label={t("cursos.new-ubicacion")}
                                    fullWidth
                                    name="ubicacion"
                                    value={props.editingForm.ubicacion}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    inputProps={{
                                        "aria-label": `${t("aria.institucion")}`
                                    }}
                                    variant="outlined"
                                    label={t("cursos.new-institucion")}
                                    fullWidth
                                    name="institucion"
                                    value={props.editingForm.institucion}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    inputProps={{
                                        "aria-label": `${t("aria.enlace")}`
                                    }}
                                    variant="outlined"
                                    label={t("cursos.new-enlace")}
                                    fullWidth
                                    name="link"
                                    value={props.editingForm.enlace}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" className="w-100">
                                <InputLabel>{t("cursos.new-nivel")}</InputLabel>
                                <Select
                                    value={props.editingForm.nivel}
                                    onChange={props.handleInputChange}
                                    input={<OutlinedInput required name="nivel"/>}
                                >
                                    <MenuItem value="integracion-basico">{t("cursos.niveles-ib")}</MenuItem>
                                    <MenuItem value="integracion-avanzado">{t("cursos.niveles-ia")}</MenuItem>
                                    <MenuItem value="integracion-actualizacion">{t("cursos.niveles-iact")}</MenuItem>
                                    <MenuItem value="reorientacion-basico">{t("cursos.niveles-rb")}</MenuItem>
                                    <MenuItem value="reorientacion-avanzado">{t("cursos.niveles-ra")}</MenuItem>
                                    <MenuItem value="reorientacion-actualizacion">{t("cursos.niveles-ract")}</MenuItem>
                                    <MenuItem value="evolucion-basico">{t("cursos.niveles-eb")}</MenuItem>
                                    <MenuItem value="evolucion-avanzado">{t("cursos.niveles-ea")}</MenuItem>
                                    <MenuItem value="evolucion-actualizacion">{t("cursos.niveles-eact")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"><strong>{t("cursos.new-competencias")}</strong></FormLabel>
                                <FormGroup row>
                                    <FormControlLabel
                                        name="competencias.disenio"
                                        control={<Checkbox color="primary" checked={props.editingForm.competencias.disenio} onChange={props.handleInputChange} value="disenio" />}
                                        label={t("cursos.new-descriptores-disenio")}
                                    />
                                    <FormControlLabel
                                        name="competencias.implementacion"
                                        control={<Checkbox color="primary" checked={props.editingForm.competencias.implementacion} onChange={props.handleInputChange} value="implementacion" />}
                                        label={t("cursos.new-descriptores-implementacion")}
                                    />
                                    <FormControlLabel
                                        name="competencias.evaluacion"
                                        control={<Checkbox color="primary" checked={props.editingForm.competencias.evaluacion} onChange={props.handleInputChange} value="evaluacion" />}
                                        label={t("cursos.new-descriptores-evaluacion")}
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"><strong>{t("cursos.new-requerimientos")}</strong></FormLabel>
                                <FormGroup row>
                                    <FormControlLabel
                                        name="requerimientos.internet"
                                        control={<Checkbox color="primary" checked={props.editingForm.requerimientos.internet} onChange={props.handleInputChange} value="internet" />}
                                        label={t("cursos.requerimientos-internet")}
                                    />
                                    <FormControlLabel
                                        name="requerimientos.computador"
                                        control={<Checkbox color="primary" checked={props.editingForm.requerimientos.computador} onChange={props.handleInputChange} value="computador" />}
                                        label={t("cursos.requerimientos-computador")}
                                    />
                                    <FormControlLabel
                                        name="requerimientos.mobile"
                                        control={<Checkbox color="primary" checked={props.editingForm.requerimientos.mobile} onChange={props.handleInputChange} value="mobile" />}
                                        label={t("cursos.requerimientos-mobile")}
                                    />
                                    <FormControlLabel
                                        name="requerimientos.lms"
                                        control={<Checkbox color="primary" checked={props.editingForm.requerimientos.lms} onChange={props.handleInputChange} value="lms" />}
                                        label={t("cursos.requerimientos-lms")}
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className="w-100">
                                <TextField
                                    inputProps={{
                                        "aria-label": `${t("aria.descripcion")}`
                                    }}
                                    variant="outlined"
                                    label={t("cursos.new-descripcion")}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="descripcion"
                                    value={props.editingForm.descripcion}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                <TextField
                                    inputProps={{
                                        "className": "h-100",
                                        "aria-label": `${t("aria.objetivo-general")}`
                                    }}
                                    className="h-100"
                                    variant="outlined"
                                    label={t("cursos.new-objetivo-general")}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="objetivo.general"
                                    value={props.editingForm.objetivo.general}
                                    onInput={props.handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-objetivos-especificos")}</strong></Typography>
                            <FormControl variant="outlined" className="w-100">
                                {
                                    props.editingForm.objetivo.especificos.map((objetivo, j) => (
                                        <div key={j} className="d-flex align-items-center justify-content-between mb-2">
                                            <TextField
                                                inputProps={{
                                                    "aria-label": `${t("aria.objetivo-especifico")}`
                                                }}
                                                variant="outlined"
                                                fullWidth
                                                name="objetivo.especificos"
                                                value={props.editingForm.objetivo.especificos[j]}
                                                onInput={e => { props.handleInputChange(e, {j: j}) }}
                                            />
                                            <IconButton aria-label={t("aria.eliminar-elemento")} className="ml-3" color="primary" onClick={() => { props.deleteObjetivoEspecifico({ j: j }); }}>
                                                <DeleteOutlined color="primary"/>
                                            </IconButton>
                                        </div>
                                    ))
                                }
                                <Button aria-label={t("aria.agregar-elemento")} className="w-auto mt-3"
                                size="small" variant="outlined" color="primary" onClick={() => { props.createNewObjetivoEspecifico(); }}>
                                    <Add className="d-block mx-auto"/>
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("descriptores")}</strong></Typography>
                            {
                                props.editingForm.descriptores.map((descriptor, j) => (
                                    <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.descriptor")}`
                                            }}
                                            variant="outlined"
                                            label={t("instrumento.descriptores-codigo")}
                                            fullWidth
                                            name="descriptores"
                                            value={descriptor}
                                            onInput={e => { props.handleInputChange(e, "nuevos", {j: j}) }}
                                        />
                                        <IconButton aria-label={t("aria.eliminar-elemento")} className="ml-3" color="primary" onClick={() => { props.deleteNewCourseElement("descriptores", { j: j }); }}>
                                            <DeleteOutlined color="primary"/>
                                        </IconButton>
                                    </div>
                                ))
                            }
                            <Button aria-label={t("aria.agregar-elemento")} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { props.createNewCourseElement("descriptores"); }}>
                                <Add className="d-block mx-auto"/>
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-contenidos")}</strong></Typography>
                                {
                                    props.editingForm.contenidos.map((contenido, j) => (
                                        <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                            <Typography variant="subtitle1" className="mr-3"><strong>{j + 1}</strong></Typography>
                                            <TextField
                                                inputProps={{
                                                    "aria-label": `${t("aria.contenido")}`
                                                }}
                                                variant="outlined"
                                                fullWidth
                                                name="contenidos"
                                                value={contenido}
                                                onInput={e => { props.handleInputChange(e, {j: j}) }}
                                            />
                                            <IconButton aria-label={t("aria.eliminar-elemento")} className="ml-3" color="primary" onClick={() => { props.deleteNewCourseElement("contenidos", { j: j }); }}>
                                                <DeleteOutlined color="primary"/>
                                            </IconButton>
                                        </div>
                                    ))
                                }
                                <Button aria-label={t("aria.agregar-elemento")} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { props.createNewCourseElement("contenidos"); }}>
                                    <Add className="d-block mx-auto"/>
                                </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                <TextField
                                    className="h-100"
                                    variant="outlined"
                                    label={t("cursos.new-metodologia")}
                                    inputProps={{
                                        "className":"h-100",
                                        "aria-label": `${t("aria.metodologia")}`
                                    }}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="metodologia"
                                    value={props.editingForm.metodologia}
                                    onInput={e => { props.handleInputChange(e, "nuevos") }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-procedimiento")}</strong></Typography>
                            {
                                props.editingForm.procedimiento.map((procedimiento, j) => (
                                    <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                        <Typography variant="subtitle1" className="mr-3"><strong>{j + 1}</strong></Typography>
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.procedimiento")}`
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            name="procedimiento"
                                            value={procedimiento}
                                            onInput={e => { props.handleInputChange(e, {j: j}) }}
                                        />
                                        <IconButton aria-label={t("aria.eliminar-elemento")} className="ml-3" color="primary" onClick={() => { props.deleteNewCourseElement("procedimiento", { j: j }); }}>
                                            <DeleteOutlined color="primary"/>
                                        </IconButton>
                                    </div>
                                ))
                            }
                            <Button aria-label={t("aria.agregar-elemento")} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { props.createNewCourseElement("procedimiento"); }}>
                                <Add className="d-block mx-auto"/>
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                <TextField
                                    className="h-100"
                                    inputProps={{
                                        "className": "h-100",
                                        "aria-label": `${t("aria.evidencias")}`
                                    }}
                                    variant="outlined"
                                    label={t("cursos.new-evidencias")}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="evidencias"
                                    value={props.editingForm.evidencias}
                                    onInput={e => { props.handleInputChange(e, "nuevos") }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className="mb-3" style={{color: "rgba(0, 0, 0, 0.54)"}}><strong>{t("cursos.new-criterios")}</strong></Typography>
                            {
                                props.editingForm.criterios.map((criterio, j) => (
                                    <div className="mb-2 d-flex align-items-center justify-content-between" key={j}>
                                        <Typography variant="subtitle1" className="mr-3"><strong>{j + 1}</strong></Typography>
                                        <TextField
                                            inputProps={{
                                                "aria-label": `${t("aria.criterio")}`
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            name="criterios"
                                            value={criterio}
                                            onInput={e => { props.handleInputChange(e, {j: j}) }}
                                        />
                                        <IconButton aria-label={t("aria.eliminar-elemento")} className="ml-3" color="primary" onClick={() => { props.deleteNewCourseElement("criterios", { j: j }); }}>
                                            <DeleteOutlined color="primary"/>
                                        </IconButton>
                                    </div>
                                ))
                            }
                            <Button aria-label={t("aria.agregar-elemento")} fullWidth className="w-100 mt-3" size="small" variant="outlined" color="primary" onClick={() => { props.createNewCourseElement("criterios"); }}>
                                <Add className="d-block mx-auto"/>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className="w-100 h-100 cursos-full-height">
                                <TextField
                                    className="h-100"
                                    inputProps={{
                                        "className": "h-100",
                                        "aria-label": `${t("aria.observaciones")}`
                                    }}
                                    variant="outlined"
                                    label={t("cursos.new-observaciones")}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    name="observaciones"
                                    value={props.editingForm.observaciones}
                                    onInput={e => { props.handleInputChange(e, "nuevos") }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                )
            }
       </Translation>
    );
}

export default Cursos;