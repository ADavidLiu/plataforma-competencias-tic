import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Pregunta from "../pregunta/pregunta"

class Prueba extends Component {
    constructor() {
        super();
        this.state = {
            preguntas: [
                {
                    id: "1.1",
                    codigoDescriptor: "I1a",
                    enunciado: "Un docente de matemáticas necesita utilizar una herramienta que le ofrezca diversos servicios de alojamiento de archivos, de tal modo que los estudiantes puedan consultar virtualmente apuntes o documentos de clase. De las siguientes, ¿Cuáles posibilidad le sugeriría?",
                    opciones: ["Dropbox, Drive, Mediafire, One Drive.", "Dropbox, Pinterest, Ustream, One Drive.", "Ustream, Flickr, Mediafire, Pinterest.", "Dropbox, One Drive, Flickr, Mediafire."],
                    respuesta: "0"
                },
                {
                    id: "1.2",
                    codigoDescriptor: "I1a",
                    enunciado: "Una docente de artes necesita utilizar una herramienta que le ofrezca diversos servicios de alojamiento de archivos, de tal modo que los estudiantes puedan compartir las fotos de sus producciones con los demás estudiantes. De las siguientes, ¿Cuáles le sugeriría?",
                    opciones: ["Drive, DeviantArt, Mediadire, Flickr.", "Dropbox, Pinterest, Ustream. OneDrive.", "Instagram, Pinterest, Flickr, DeviantArt.", "Facebook, Flickr, Pinterest, DeviantArt."],
                    respuesta: "2"
                },
                {
                    id: "2.1",
                    codigoDescriptor: "I1b",
                    enunciado: "Un docente de ciencias naturales que pidió a sus estudiantes realizar un trabajo sobre el sistema respiratorio, al llegar a casa se percata que ha olvidado los mismos en el colegio. De acuerdo con lo anterior ¿Qué le recomendaría para la entrega de trabajos en próximas oportunidades?",
                    opciones: ["Esperar hasta el día siguiente y pedir más tiempo para calificar y entregar notas.", "Solicitar a los estudiantes el envío de los trabajos por correo electrónico.", "Solicitar los trabajos digitalmente para guardarlos en una memoria USB.", "Solicitar el envío de trabajos usando una herramienta de almacenamiento en la nube."],
                    respuesta: "3"
                },
                {
                    id: "2.2",
                    codigoDescriptor: "I1b",
                    enunciado: "De los siguientes, ¿Cuáles son los tres aspectos para el apoyo de los procesos educativos que se flexibilizan más con el uso de videollamadas y el correo electrónico?",
                    opciones: ["Espacio, tiempo y manejo de recursos.", "Gestión, manejo de recursos y costos.", "Espacio, tiempo y planeación.", "Gestión, tiempo y planeación."],
                    respuesta: "3"
                },
            ],
            respuestas: []
        }
    }

    actualizarRespuestas = preguntaRespondida => {
        const encontrado = this.state.respuestas.find(respuesta => respuesta.id === preguntaRespondida.id);

        if (encontrado === undefined) {
            // el ID no está aún. Agregar.
            this.state.respuestas.push(preguntaRespondida);
        } else {
            // La pregunta ya había sido respondida. Actualizar.
            encontrado.respuestaSeleccionada = preguntaRespondida.respuestaSeleccionada;
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid container justify="center">
                    <Grid item xs={12} sm={8} md={6}>
                        <form>
                            <Grid item xs={12}>
                                <Typography variant="h5" className="mb-5 text-center">Prueba de conocimiento sobre apropiación de las TIC a las prácticas educativas</Typography>
                                <Typography variant="h6" className="mb-2">Introducción</Typography>
                                <Typography variant="body1" className="mb-4">Esta es una prueba para evaluar el conocimiento acerca del diseño, implementación y evaluación de prácticas educativas con TIC. En este documento encontrará la información necesaria para realizar la evaluación.</Typography>
                                <Typography variant="h6" className="mb-2">Instrucciones</Typography>
                                <Typography variant="body1" className="mb-2">A continuación, encontrará 31 preguntas de opción múltiple con única respuesta. Cada pregunta está constituida por un enunciado y cuatro (4) opciones de respuesta. Seleccione la opción que considere más correcta. Esta prueba debe ser finalizada una vez se inicia. Puede tomarse hasta una hora y treinta minutos (1:30) para responder. La resolución de la prueba es estrictamente individual.</Typography>
                            </Grid>
                            <hr className="my-5" />
                            <Grid item xs={12}>
                                <Typography variant="h6" className="mb-5 text-center">Preguntas</Typography>
                                {this.state.preguntas.map(pregunta => {
                                    return <Pregunta key={pregunta.id} id={pregunta.id} data={pregunta} actualizarRespuestas={this.actualizarRespuestas} />
                                })}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="mt-2"
                                    size="large"
                                >
                                    Enviar respuestas
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Prueba;