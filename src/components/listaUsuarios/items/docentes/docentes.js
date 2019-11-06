import React from "react";

import { Translation } from "react-i18next";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";

import Edit from "@material-ui/icons/Edit";
import Warning from "@material-ui/icons/Warning";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import OpenInNew from "@material-ui/icons/OpenInNew";

const Docentes = props => {
    return (
        <Translation>
            {
                t => (
                    <Paper>
                        <div className="scrolling-table-outer">
                            <div className="scrolling-table-wrapper">
                                <Table className="scrolling-table">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                props.headCells.establecimiento.map((title, i) => <TableCell key={i}>{t(title)}</TableCell>)
                                            }
                                        </TableRow>
                                    </TableHead>
                                    {
                                        props.usuarios[props.tipoUsuariosMostrados].length > 0 ? (
                                            <TableBody>
                                                {
                                                    props.isFiltering ? (
                                                        <TableRow>
                                                            <TableCell colSpan={props.headCells[props.userType.toLowerCase()].length}>
                                                                <CircularProgress color="primary" className="d-block mx-auto"/>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : props.elementosMostrados[props.tipoUsuariosMostrados].length === 0 ? (
                                                        <TableRow>
                                                            <TableCell colSpan={props.headCells[props.userType.toLowerCase()].length}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <Warning className="mr-2" fontSize="small"/>
                                                                    {t("visorPerfiles.no-resultados")}
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <React.Fragment>
                                                            {
                                                                props.elementosMostrados[props.tipoUsuariosMostrados].slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((elemento, i) => {
                                                                    const values = Object.values(elemento);
                                                                    const keys = Object.keys(elemento);
                                                                    const elementoID = elemento.idNacional ? elemento.idNacional : elemento[0];

                                                                    return (
                                                                        <TableRow key={i}>
                                                                            {
                                                                                values.map((val, j) => {
                                                                                    switch (keys[j]) {
                                                                                        case "etapaActualProceso":
                                                                                            return <TableCell key={j}>{t(val)}</TableCell>;
                                                                                        case "tiempoRestantePrueba":
                                                                                            if (val === 0) {
                                                                                                return <TableCell key={j}>{t("finalizada")}</TableCell>;
                                                                                            } else {
                                                                                                return <TableCell key={j}>{val}</TableCell>;
                                                                                            }
                                                                                        default:
                                                                                            if (keys[j] === "4") {
                                                                                                return <TableCell key={j}>{t(val)}</TableCell>;
                                                                                            } else if (keys[j] === "3" && val === 0) {
                                                                                                return <TableCell key={j}>{t("finalizada")}</TableCell>
                                                                                            } else if (typeof val !== "object") {
                                                                                                return <TableCell key={j}>{val}</TableCell>;
                                                                                            }
                                                                                    }
                                                                                })
                                                                            }
                                                                            <TableCell>
                                                                                <Edit color="primary" style={{cursor: "pointer"}} onClick={() => { props.editUser(elementoID); }}/>
                                                                                <DeleteOutlined color="primary" className="mx-2" style={{cursor: "pointer"}} onClick={() => { props.deleteUser(elementoID); }}/>
                                                                                <Link aria-label={t("aria.abrir-perfil")} to={{
                                                                                    pathname: `/${t("link.dashboard-docente")}`,
                                                                                    state: {
                                                                                        docenteID: elementoID,
                                                                                        shouldActivateViewingMode: true
                                                                                    }
                                                                                }} style={{textDecoration: "none"}}>
                                                                                    <OpenInNew color="primary" style={{cursor: "pointer"}}/>
                                                                                </Link>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })
                                                            }
                                                        </React.Fragment>
                                                    )
                                                }
                                            </TableBody>
                                        ) : (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan="4" align="center">{t("usuarios.no-datos")}</TableCell>
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
                            count={props.elementosMostrados[props.tipoUsuariosMostrados].length}
                            rowsPerPage={props.rowsPerPage}
                            page={props.page}
                            onChangePage={props.handleChangePage}
                            onChangeRowsPerPage={props.handleChangeRowsPerPage}
                        />
                    </Paper>
                )
            }
        </Translation>
    );
}

export default Docentes;