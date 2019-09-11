import React, { Component } from "react";

import { Helmet } from "react-helmet";
import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

import { Redirect } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

class Entrevista extends Component {
    constructor() {
		super();
		
        this.state = {
			tipoUsuario: "",
            isRequerida: true,
            isEvaluada: true,
            evidenciasNecesarias: []
        }
    }

    componentDidMount = () => {
		let infoCargada = {};

		if (this.props.location && this.props.location.state !== undefined) {
			infoCargada = {
				tipoUsuario: this.props.location.state.tipoUsuario
			}
		} else {
			infoCargada = {
				tipoUsuario: ""
			}
		}

        this.setState({
			tipoUsuario: infoCargada.tipoUsuario,
            evidenciasNecesarias: [
                {
                    descriptoresAsociados: ["E1ub"],
                    tipoEvidencia: "Ejemplo de modificaciones de otros escenarios educativos."
                },
                {
                    descriptoresAsociados: ["I1ta"],
                    tipoEvidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad."
                },
                {
                    descriptoresAsociados: ["I2ta"],
                    tipoEvidencia: 'Demostración de "ajustes realizados en la marcha" a la práctica educativo, relacionados con la presentación de contenidos, el intercambio de archivos, el acceso y la búsqueda de información de calidad.'
                }
            ]
		});
    }

    render() {
		if (this.props.location && this.props.location.state === undefined) {
			return <Redirect to="/" />
		}

        return (
			<Translation>
				{
					t => (
						<Grid container justify="center">
							<Helmet>
                                <title>{`${t("procesoPaso.4")} | ${this.props.userProfile.nombre}`}</title>
                            </Helmet>
							<Grid item xs={12} md={8} lg={9}>
								{this.state.isRequerida ? (
									<React.Fragment>
										{this.state.isEvaluada ? (
											<React.Fragment>
												<Typography
													variant="h5"
													className="mb-4"
												>
													{t("entrevista.titulo")}
												</Typography>
												<Grid item xs={12}>
													<Typography variant="body1">
														{t("entrevista.ayuda")}
													</Typography>
													<hr className="mt-4" />
												</Grid>
												<List>
													{this.state.evidenciasNecesarias.map(
														evidencia => {
															return (
																<ListItem
																	key={
																		evidencia.tipoEvidencia
																	}
																>
																	<ListItemIcon>
																		<CheckCircleOutline />
																	</ListItemIcon>
																	<ListItemText
																		primary={
																			evidencia.tipoEvidencia
																		}
																	/>
																</ListItem>
															);
														}
													)}
												</List>
											</React.Fragment>
										) : (
											<React.Fragment>
												<Typography
													variant="h5"
													color="secondary"
													className="mb-3"
												>
													<strong>
														{t("entrevista.label-no-evaluado")}
													</strong>
												</Typography>
												<Typography variant="body1">
													{t("entrevista.ayuda-no-evaluado")}
												</Typography>
											</React.Fragment>
										)}
									</React.Fragment>
								) : (
									<React.Fragment>
										<Typography
											variant="h5"
											color="secondary"
											className="mb-3"
										>
											<strong>
												{t("entrevista.no-requerido")}
											</strong>
										</Typography>
										<Typography variant="body1">
											{t("entrevista.ayuda-no-requerido-0")}
										</Typography>
										<Typography variant="body1">
											{t("entrevista.ayuda-no-requerido-1")}
										</Typography>
										<Typography variant="body1">
											{t("entrevista.ayuda-no-requerido-2")}
										</Typography>
									</React.Fragment>
								)}
							</Grid>
						</Grid>
					)
				}
			</Translation>
		);
    }
}

export default Entrevista;