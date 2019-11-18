import React from "react";

import { Translation } from "react-i18next";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

import Warning from "@material-ui/icons/Warning";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";

const Auditoria = props => {
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
                                                props.headCells.auditoria.map((title, i) => i < props.headCells.auditoria.length - 1 ? <TableCell key={i}>{t(title)}</TableCell> : null)
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
                                                    ) : (
                                                        props.elementosMostrados[props.tipoUsuariosMostrados].length === 0 ? (
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
                                                                        return (
                                                                            <TableRow key={i}>
                                                                                {
                                                                                    values.map((val, j) => {
                                                                                        if (keys[j] === "pais") {
                                                                                            return <TableCell key={j}>{val.split("-")[1]}</TableCell>;
                                                                                        } else {
                                                                                            if (typeof val !== "object") {
                                                                                                return <TableCell key={j}>{val}</TableCell>;
                                                                                            } else {
                                                                                                return null;
                                                                                            }
                                                                                        }
                                                                                    })
                                                                                }
                                                                                <TableCell>
                                                                                    <Tooltip title={t("auditoria.label-ver")} placement="right">
                                                                                        <OpenInBrowser color="primary" style={{cursor: "pointer"}} onClick={() => { props.verData(elemento[2]); }}/>
                                                                                    </Tooltip>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    )
                                                }
                                            </TableBody>
                                        ) : (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan="6" align="center">{t("usuarios.no-datos")}</TableCell>
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

export default Auditoria;