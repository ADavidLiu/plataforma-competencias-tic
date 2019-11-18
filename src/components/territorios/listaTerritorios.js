import React from "react";

import { Translation } from "react-i18next";

import Search from "@material-ui/icons/Search";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CircularProgress from "@material-ui/core/CircularProgress";

const ListaTerritorios = props => {
    return (
        <Translation>
            {
                t => (
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6} className="pb-0">
                            <TextField
                                placeholder={t("buscar")}
                                fullWidth
                                variant="outlined"
                                onChange={props.handleSearch}
                                value={props.searchTerm}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Search color="primary" />
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        "aria-label": `${t("aria.buscar")}`
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className="pb-0">
                            <div className="d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
                                <Select
                                    value={props.filtros.categoria}
                                    onChange={props.handleFiltroChange}
                                    input={<OutlinedInput required name="categoria"/>}
                                    className="w-50"
                                >
                                    {
                                        props.headCells.map((cellLabel, i) => {
                                            if (i < props.headCells.length - 1) {
                                                return <MenuItem value={cellLabel} key={i}>{t(cellLabel)}</MenuItem>
                                            } else {
                                                return null;
                                            }
                                        })
                                    }
                                </Select>
                                <Select
                                    value={props.filtros.orden}
                                    onChange={props.handleFiltroChange}
                                    input={<OutlinedInput required name="orden"/>}
                                    className="ml-3 w-50"
                                >
                                    <MenuItem value="descendente">{t("filtros.descendente")}</MenuItem>
                                    <MenuItem value="ascendente">{t("filtros.ascendente")}</MenuItem>
                                </Select>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <div className="scrolling-table-outer">
                                    <div className="scrolling-table-wrapper">
                                        <Table className="scrolling-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{t("ID")}</TableCell>
                                                    <TableCell>{t("nombre")}</TableCell>
                                                    <TableCell>{t("territorios.lista-padre")}</TableCell>
                                                    <TableCell>{t("territorios.lista-fecha-creacion")}</TableCell>
                                                    <TableCell>{t("territorios.lista-acciones")}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {
                                                props.elementosMostrados.length > 0 ? (
                                                    <TableBody>
                                                        {
                                                            props.isFiltering ? (
                                                                <TableRow>
                                                                    <TableCell colSpan={5}>
                                                                        <CircularProgress color="primary" className="d-block mx-auto"/>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                props.elementosMostrados.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((elemento, i) => {
                                                                    const values = Object.values(elemento);
                                                                    const elementoID = elemento.id !== undefined ? elemento.id : elemento[0];

                                                                    return (
                                                                        <TableRow key={i}>
                                                                            {
                                                                                values.map((val, j) => <TableCell key={j}>{val}</TableCell>)
                                                                            }
                                                                            <TableCell>
                                                                                <EditOutlined color="primary"  style={{cursor: "pointer"}} onClick={() => {
                                                                                    props.editarTerritorio(elementoID);
                                                                                }}/>
                                                                                <DeleteOutlined color="primary"  style={{cursor: "pointer"}} onClick={() => {
                                                                                    props.eliminarTerritorio(elementoID);
                                                                                }} className="ml-3"/>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })
                                                            )
                                                        }
                                                    </TableBody>
                                                ) : (
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell colSpan="5" align="center">{t("usuarios.no-datos")}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                )
                                            }
                                        </Table>
                                    </div>
                                </div>
                                <TablePagination
                                    labelDisplayedRows={({from, to, count}) => {
                                        return `${from}-${to} / ${count}`;
                                    }}
                                    backIconButtonProps={{
                                        "aria-label": `${t("aria.pagina-anterior")}`
                                    }}
                                    nextIconButtonProps={{
                                        "aria-label": `${t("aria.pagina-siguiente")}`
                                    }}
                                    labelRowsPerPage={t("filasPorPagina")}
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={props.elementosMostrados.length}
                                    rowsPerPage={props.rowsPerPage}
                                    page={props.page}
                                    onChangePage={props.handleChangePage}
                                    onChangeRowsPerPage={props.handleChangeRowsPerPage}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                )
            }
        </Translation>
    );
}

export default ListaTerritorios;