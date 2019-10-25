import React from "react";

import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

function Curso(props) {
	return (
		<Translation>
			{
				t => (
					<a href={props.link} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
						<Card className="mb-4">
							<CardActionArea>
								<CardContent>
									<div className="p-4">
										<Typography gutterBottom variant="h6" component="h2">
											{props.titulo}
										</Typography>
										<hr className="my-3"/>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{props.descripcion}
										</Typography>
									</div>
								</CardContent>
							</CardActionArea>
						</Card>
					</a>
				)
			}
		</Translation>
	);
}

export default Curso;
