import React, { Component } from "react";

import { Translation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class ListaCursos extends Component {
    constructor() {
        super();

        this.state = {
            cursos: []
        }
    }

    componentDidMount = () => {
        const cursosCargados = [
            {
                nombre: "Introducción al manejo del aula virtual (Blackboard)",
                resumen: "Nulla consequat non consectetur ea reprehenderit ut eu officia ullamco et. Reprehenderit enim enim quis occaecat sit in ipsum reprehenderit quis commodo irure ut irure.",
                mediacion: true,
                modalidad: "Blended",
                dedicacion: 4,
                ubicacion: "Blackboard",
                institucion: "PUJ",
                enlace: "https://www.google.com",
                nivel: "Integración básico",
                competencias: {
                    disenio: true,
                    implementacion: true,
                    evaluacion: true
                },
                requerimientos: {
                    internet: true,
                    computador: true,
                    mobile: false,
                    lms: true
                },
                descripcion: `El aula virtual en la Universidad juega un papel muy importante; es la plataforma que le permite a la comunidad académica realizar la gestión de los cursos, extender el aula presencial para apoyar las actividades de enseñanza- aprendizaje-evaluación y hacer seguimiento a las actividades de los estudiantes en su proceso de formación.
                
                En este curso abordaremos temas sobre el manejo de las herramientas básicas de  la plataforma Blackboard 9.1 que soporta nuestra aula virtual con una postura pedagógica que conlleve a que el aprendizaje sea más significativo en estos ambientes.`,
                objetivo: {
                    general: "Esse laboris id ad nostrud deserunt amet reprehenderit cillum culpa eiusmod commodo Lorem cillum eiusmod.",
                    especificos: ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
                },
                descriptores: ["I1A", "I1B", "I1C", "IUA", "I2A", "I2UA", "I2UC", "IEA", "I3B"],
                contenidos: ["Introducción al aula virtual", "El aula virtual en nuestro contexto educativo", "Manejo de la información en las aulas virtuales", "Conociendo el entorno del aula virtual", "Navegación en el curso", "Comunicación", "Actividades" ,"Evaluaciones"],
                metodologia: "Curso – Taller: Se desarrollaran actividades en grupos y en el desarrollo del curso los grupos asumirán los roles de profesor y estudiantes",
                procedimiento: ["Introducción: presentación de participantes, propósitos y expectativas del curso. (10 min)", "Explorando el entorno del aula virtual", "Construyendo mi escenario educativo", "Viviendo el rol del estudiante"],
                evidencias: "",
                criterios: ["Reconoce el entorno del aula virtual", "Maneja correctamente las herramientas básicas del aula virtual", "Hace un uso adecuado de las herramientas de comunicación", "Estructura su escenario educativo de forma organizada", "Participa en los grupos de trabajo"],
                observaciones: ""
            }
        ];

        this.setState({
            cursos: cursosCargados
        });
    }

    render() {
        return (
            <Translation>
                {
                    t => (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {
                                    this.state.cursos.map((curso, i) => (
                                        <Paper className="p-4 mb-4" key={i}>
                                            <Typography variant="body1">{curso.nombre}</Typography>
                                        </Paper>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    )
                }
            </Translation>
        );
    }
}

export default ListaCursos;