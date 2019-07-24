import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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
			<Grid container justify="center">
				<Grid item xs={12} md={8} lg={9}>
					{this.state.isRequerida ? (
						<React.Fragment>
							{this.state.isEvaluada ? (
								<React.Fragment>
									<Typography
										variant="h4"
										className="mb-4"
									>
										Evidencias requeridas
									</Typography>
									<Grid item xs={12}>
										<Typography variant="body1">
											Señor(a) docente, por favor
											prepare los siguientes
											recursos para presentar
											durante su sesión de
											entrevista.
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
											Su pre-entrevista aún no ha
											sido evaluada.
										</strong>
									</Typography>
									<Typography variant="body1">
										Tan pronto se realice este
										proceso, se le notificará via
										correo electrónico con los
										recursos que deberá presentar
										durante la entrevista.
										Igualmente, revise
										periódicamente esta página.
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
									No requiere de entrevista
								</strong>
							</Typography>
							<Typography variant="body1">
								Señor(a) docente, tras evaluar su
								pre-entrevista, se ha determinado que no
								es necesario que pase a una entrevista.
							</Typography>
							<Typography variant="body1">
								Lo invitamos a analizar sus resultados e
								implementar las acciones de mejora
								correspondientes.
							</Typography>
							<Typography variant="body1">
								Igualmente, a volver a realizar todo el
								proceso cuando lo considere pertinente,
								para poder evaluar el progreso de su
								apropiación en competencias TIC.
							</Typography>
						</React.Fragment>
					)}
				</Grid>
			</Grid>
		);
    }
}

export default Entrevista;