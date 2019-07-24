import React from "react";

import Grid from "@material-ui/core/Grid";
import Curso from "./curso";

function RutaAprendizaje(props) {
    return (
		<Grid container spacing={2}>
			{props.cursos.map((curso, i) => {
				return (
                    <Grid item key={i} xs={12} sm={6} lg={4}>
                        <Curso
                            titulo={curso.nombre}
                            descripcion={curso.descripcion}
                            imgSrc={curso.imgSrc}
                            link={curso.link}
                        />
                    </Grid>
				);
			})}
		</Grid>
	);
}

export default RutaAprendizaje;