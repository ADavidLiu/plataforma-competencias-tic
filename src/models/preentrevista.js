const preguntas = [
    {
        label: "¿Ha propuesto cambios en otros escenarios educativos como consecuencia del uso de las TIC en su práctica educativa?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cuáles? (máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["E1ub"],
                        tipoEvidencia: "Ejemplo de modificaciones de otros escenarios educativos."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO",
            }
        ]
    },
    {
        label: "¿Utiliza las TIC para presentar contenidos y actividades conforme los ritmos y estilos de aprendizaje de los estudiantes?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo hace? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["E1ue"],
                        tipoEvidencia: "Presentación de contenidos y actividades conforme estilos y ritmos de aprendizaje."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO",
            }
        ]
    },
    {
        label: "¿Ha realizado modificaciones al diseño de la práctica educativa apoyada en TIC que presentó?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Para qué ha modificado el diseño de su práctica educativa apoyada en TIC? (Puede elegir más de una opción)",
                        options: [
                            {
                                label: "Para facilitar la presentación, almacenamiento, transmisión o intercambio de información.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["I1ta"],
                                        tipoEvidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad."
                                    }
                                ]
                            },
                            {
                                label: "Para facilitar el acceso y la búsqueda de información de calidad.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["I1ta"],
                                        tipoEvidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad."
                                    }
                                ]
                            },
                            {
                                label: "Para aprovechar los recursos del escenario educativo.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["R1tb"],
                                        tipoEvidencia: "Modificaciones para aprovechar al máximo los recursos TIC en el escenario educativo"
                                    }
                                ]
                            },
                            {
                                label: "Para utilizar herramientas TIC novedosas, estéticas o accesibles.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["R1tc"],
                                        tipoEvidencia: "Ejemplo de introducción de TIC siguiendo criterios de novedad, estética y accesibilidad."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: "¿Qué tuvo en cuenta para modificar el diseño de su práctica educativa apoyada en TIC? (Puede elegir más de una opción)",
                        options: [
                            {
                                label: "Experiencias previas de diseño de prácticas educativas apoyadas en TIC.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["R1ta"],
                                        tipoEvidencia: "Ejemplo de herramientas nuevas introducidas. Se compara la práctica actual con versiones previas."
                                    }
                                ]
                            },
                            {
                                label: "Necesidades de los estudiantes y características de los contenidos.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["E1ta"],
                                        tipoEvidencia: "Ejemplo de cambio introducido por características de los contenidos o realimentaciones de los estudiantes."
                                    }
                                ]
                            },
                            {
                                label: "El potencial educativo de las TIC.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["E1tb", "E1tc"],
                                        tipoEvidencia: "Muestra de modificación introducida a la práctica educativa apoyada en TIC a partir de la identificación de potencialidades de dichas herramientas."
                                    }
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO",
            }
        ]
    },
    {
        label: "¿Ha apoyado a alguno de sus colegas en el diseño de escenarios educativos apoyados en TIC?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["E1td"],
                        tipoEvidencia: "Demostración de cambios que otros profesores han introducido a su práctica educativa a partir del apoyo brindado por el docente."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha utilizado las TIC para transmitir y comunicar los contenidos?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["I2ua"],
                        tipoEvidencia: "Demostración de uso de las TIC para la transmisión y comunicación de contenidos."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha utilizado las TIC para agilizar la gestión y asignación de actividades en su práctica educativa?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["I2ub"],
                        tipoEvidencia: "Demostración de uso de las TIC para la gestión de la práctica educativa."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha utilizado las TIC para retroalimentar a sus estudiantes?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["R2uc"]
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha divulgado su práctica educativa apoyada en TIC a través de medios informales o formales (conferencias, publicaciones)?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["E2ua"],
                        tipoEvidencia: "Certificado de conferencia, publicaciones, presentaciones expuestas en eventos, posters."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha utilizado su práctica educativa en diferentes contextos (grados/niveles - instituciones)?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["E2ub"],
                        tipoEvidencia: "Demostración de implementación de TIC en otro escenario educativo."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha colaborado con sus colegas en la implementación de escenarios educativos apoyados en TIC?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["E2uc"],
                        tipoEvidencia: "¿Testimonio de colegas que han recibido apoyo?"
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "Al implementarla ¿Su práctica educativa apoyada en TIC tuvo ajustes?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Qué transformaciones experimentó su práctica educativa apoyada en TIC al implementarla? (puede elegir más de una opción)",
                        options: [
                            {
                                label: "Se ha mejorado la presentación de contenidos, el intercambio de archivos, el acceso y la búsqueda de información de calidad.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["I2ta"],
                                        tipoEvidencia: 'Demostración de "ajustes realizados en la marcha" a la práctica educativo, relacionados con la presentación de contenidos, el intercambio de archivos, el acceso y la búsqueda de información de calidad.'
                                    }
                                ]
                            },
                            {
                                label: "Se ha facilitado el alcance del objetivo de aprendizaje integrando herramientas diferentes a las planteadas en el diseño inicial.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["E2ta"],
                                        tipoEvidencia: 'Demostración de "cambios realizados en la marcha" a la práctica educativa para hacerla más significativa (trabajo colaborativo, andamiaje, contextualización, autorregulación, autonomía).'
                                    }
                                ]
                            },
                            {
                                label: "Se han propuesto nuevos usos de las TIC para favorecer el aprendizaje significativo.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["E2td", "E2tb"],
                                        tipoEvidencia: 'Demostración de "cambios realizados en la marcha" a la práctica educativa para hacerla más significativa (trabajo colaborativo, andamiaje, contextualización, autorregulación, autonomía).'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: "¿Por qué ha realizado cambios en su práctica educativa apoyada en TIC? (puede marcar más de una opción)",
                        options: [
                            {
                                label: "Por criterios estéticos y de accesibilidad.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Mencione ejemplos. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["R2tb"],
                                        tipoEvidencia: "Demostración de cambios introducidos a la práctica educativa por criterios estéticos y de accesibilidad."
                                    }
                                ]
                            },
                            {
                                label: "Por información sistemáticamente recogida de su práctica educativa.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["R2ta"],
                                        tipoEvidencia: "Información sistemáticamente recogida de práctica educativa."
                                    }
                                ]
                            },
                            {
                                label: "Por el análisis sistemático de la implementación de las TIC en las prácticas educativas.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Describa el proceso de análisis de información. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["E2tc"],
                                        tipoEvidencia: "Demostración de cambios introducidos en práctica educativa por Por el análisis sistemático de la implementación de las TIC en las prácticas educativas."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha evaluado la efectividad de su práctica educativa apoyada en TIC en el proceso de aprendizaje de sus estudiantes?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿De qué manera ha evaluado su práctica educativa? ¿Cuáles criterios de evaluación ha tenido en cuenta? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: "NONE",
                        tipoEvidencia: "Demostración de método de evaluación de práctica educativa. Captura de pantalla, copia de formulario, copia de respuestas a formulario."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha medido el impacto de su práctica educativa apoyada en TIC en el contexto educativo?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: "NONE",
                        tipoEvidencia: "Demostración de metodología de evaluación del impacto de práctica educativa apoyada en TIC en el contexto educativo - Artículo, ponencia, presentación."
                    },
                    {
                        label: "¿Qué resultados verificables ha encontrado al evaluar su práctica educativa apoyada en TIC? (Máximo 100 palabras)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: "NONE",
                        tipoEvidencia: 'Demostración de resultados de evaluación de práctica educativa - respuestas a formularios, formalización del "decir" de superiores, pares y estudiantes.'
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "¿Ha comunicado o divulgado sus estrategias de monitoreo y evaluación de impacto de las TIC en los procesos de aprendizaje?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        typeOfAnswer: "INPUT",
                        descriptoresEvaluados: ["E3ta"],
                        tipoEvidencia: "Constancias de divulgación de  evaluación de práctica educativa apoyada en TIC - artículos, presentaciones, certificados, publicaciones."
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    },
    {
        label: "A partir de los resultados de la evaluación del impacto de las TIC en sus procesos de enseñanza y aprendizaje ¿Ha modificado su forma de evaluar la práctica educativa?",
        options: [
            {
                label: "Sí",
                typeOfAnswer: "RADIO",
                options: [
                    {
                        label: "¿Las modificaciones en qué aspectos han enfatizado? (Puede elegir más de una opción)",
                        options: [
                            {
                                label: "La efectividad para la transmisión de información y contenidos.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "¿Qué ajustes ha realizado? (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["I3ta"],
                                        tipoEvidencia: "Demostración de ajustes de evaluación de práctica educativa en función de la efectividad para la transmisión de contenidos y el acceso a información de calidad."
                                    }
                                ]
                            },
                            {
                                label: "La efectividad para acceder y buscar información de calidad.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "¿Qué ajustes ha realizado? (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["I3ta"],
                                        tipoEvidencia: "Demostración de ajustes de evaluación de práctica educativa en función de la efectividad para la transmisión de contenidos y el acceso a información de calidad."
                                    }
                                ]
                            },
                            {
                                label: "Los beneficios y costos de las TIC en la práctica educativa, en términos de tiempo, recursos, acceso a la información, transmisión y almacenamiento de contenidos.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["I3tb"],
                                        tipoEvidencia: "Demostración de cambios en la evaluación de la práctica educativa  en términos de tiempo, recursos, acceso a la información, transmisión y almacenamiento de contenidos."
                                    }
                                ]
                            },
                            {
                                label: "La eficacia de la integración de las TIC en la práctica educativa para la construcción de conocimiento.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["R3ta"],
                                        tipoEvidencia: "Demostración de cambios en la evaluación de la práctica educativa en función del aporte de las TIC a la construcción de conocimiento."
                                    }
                                ]
                            },
                            {
                                label: "El establecimiento de nuevas formas de evidenciar el aporte de las TIC en el aprendizaje de los estudiantes.",
                                typeOfAnswer: "CHECKBOX",
                                options: [
                                    {
                                        label: "Mencione ejemplos. (Máximo 400 caracteres)",
                                        typeOfAnswer: "INPUT",
                                        descriptoresEvaluados: ["R3tb"],
                                        tipoEvidencia: "Ejemplo de nuevas formas de evidenciar el aporte de las TIC en el aprendizaje de los estudiantes."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No",
                typeOfAnswer: "RADIO"
            }
        ]
    }
];

export default preguntas;