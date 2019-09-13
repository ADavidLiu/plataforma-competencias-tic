import React from "react";

import { Translation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

function Curso(props) {
	return (
		<Translation>
			{
				t => (
					<a href={props.link} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
						<Card className="mb-4">
							<CardActionArea>
								<CardMedia
									height="140"
									component="img"
									image={props.imgSrc === "" ? "https://via.placeholder.com/1000" : props.imgSrc}
									title={t("curso.imagen-alt")}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{props.titulo}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{props.descripcion}
									</Typography>
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
