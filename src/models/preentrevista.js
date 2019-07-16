const preguntas = [
    {
        label: "¿Ha propuesto cambios en otros escenarios educativos como consecuencia del uso de las TIC en su práctica educativa?",
        type: "RADIO",
        options: [
            {
                label: "Sí",
                type: "INPUT",
                options: [
                    {
                        label: "¿Cuáles? (máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["E1ub"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Utiliza las TIC para presentar contenidos y actividades conforme los ritmos y estilos de aprendizaje de los estudiantes?",
        type: "RADIO",
        options: [
            {
                label: "Sí",
                type: "INPUT",
                options: [
                    {
                        label: "¿Cómo lo hace? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["E1ue"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha realizado modificaciones al diseño de la práctica educativa apoyada en TIC que presentó?",
        type: "RADIO",
        options: [
            {
                label: "Sí",
                type: "CHECKBOX",
                options: [
                    {
                        label: "¿Para qué ha modificado el diseño de su práctica educativa apoyada en TIC? (Puede elegir más de una opción)",
                        options: [
                            {
                                label: "Para facilitar la presentación, almacenamiento, transmisión o intercambio de información.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["I1ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Para facilitar el acceso y la búsqueda de información de calidad.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["I1ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Para aprovechar los recursos del escenario educativo.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["R1tb"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Para utilizar herramientas TIC novedosas, estéticas o accesibles.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["R1tc"]
                                            }
                                        ]
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
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["R1ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Necesidades de los estudiantes y características de los contenidos.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["E1ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "El potencial educativo de las TIC.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["E1tb", "E1tc"]
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha apoyado a alguno de sus colegas en el diseño de escenarios educativos apoyados en TIC?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["E1td"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha utilizado las TIC para transmitir y comunicar los contenidos?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["I2ua"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha utilizado las TIC para agilizar la gestión y asignación de actividades en su práctica educativa?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["I2ub"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha utilizado las TIC para retroalimentar a sus estudiantes?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["R2uc"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha divulgado su práctica educativa apoyada en TIC a través de medios informales o formales (conferencias, publicaciones)?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["E2ua"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha utilizado su práctica educativa en diferentes contextos (grados/niveles - instituciones)?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["E2ub"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha colaborado con sus colegas en la implementación de escenarios educativos apoyados en TIC?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: ["E2uc"]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "Al implementarla ¿Su práctica educativa apoyada en TIC tuvo ajustes?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Qué transformaciones experimentó su práctica educativa apoyada en TIC al implementarla? (puede elegir más de una opción)",
                        options: [
                            {
                                label: "Se ha mejorado la presentación de contenidos, el intercambio de archivos, el acceso y la búsqueda de información de calidad.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["I2ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Se ha facilitado el alcance del objetivo de aprendizaje integrando herramientas diferentes a las planteadas en el diseño inicial.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["E2ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Se han propuesto nuevos usos de las TIC para favorecer el aprendizaje significativo.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["E2td", "E2tb"]
                                            }
                                        ]
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
                                options: [
                                    {
                                        label: "Mencione ejemplos. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["R2tb"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Por información sistemáticamente recogida de su práctica educativa.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["R2ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Por el análisis sistemático de la implementación de las TIC en las prácticas educativas.",
                                options: [
                                    {
                                        label: "Describa el proceso de análisis de información. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["E2tc"]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha evaluado la efectividad de su práctica educativa apoyada en TIC en el proceso de aprendizaje de sus estudiantes?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿De qué manera ha evaluado su práctica educativa? ¿Cuáles criterios de evaluación ha tenido en cuenta? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: "NONE",
                                needsEvidencia: true
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "¿Ha medido el impacto de su práctica educativa apoyada en TIC en el contexto educativo?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: "NONE",
                                needsEvidencia: true
                            }
                        ]
                    },
                    {
                        label: "¿Qué resultados verificables ha encontrado al evaluar su práctica educativa apoyada en TIC? (Máximo 100 palabras)",
                        options: [
                            {
                                label: "INPUT",
                                descriptoresEvaluados: "NONE",
                                needsEvidencia: true
                            }
                        ]
                    },
                    {
                        label: "¿Ha comunicado o divulgado sus estrategias de monitoreo y evaluación de impacto de las TIC en los procesos de aprendizaje?",
                        options: [
                            {
                                label: "INPUT",
                                options: [
                                    {
                                        label: "Sí",
                                        options: [
                                            {
                                                label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
                                                options: [
                                                    {
                                                        label: "INPUT",
                                                        descriptoresEvaluados: ["E3ta"],
                                                        needsEvidencia: true
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        label: "No"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    },
    {
        label: "A partir de los resultados de la evaluación del impacto de las TIC en sus procesos de enseñanza y aprendizaje ¿Ha modificado su forma de evaluar la práctica educativa?",
        options: [
            {
                label: "Sí",
                options: [
                    {
                        label: "¿Las modificaciones en qué aspectos han enfatizado? (Puede elegir más de una opción)",
                        options: [
                            {
                                label: "La efectividad para la transmisión de información y contenidos.",
                                options: [
                                    {
                                        label: "¿Qué ajustes ha realizado? (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["I3ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "La efectividad para acceder y buscar información de calidad.",
                                options: [
                                    {
                                        label: "¿Qué ajustes ha realizado? (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["I3ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Los beneficios y costos de las TIC en la práctica educativa, en términos de tiempo, recursos, acceso a la información, transmisión y almacenamiento de contenidos.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["I3tb"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "La eficacia de la integración de las TIC en la práctica educativa para la construcción de conocimiento.",
                                options: [
                                    {
                                        label: "Explique. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["R3ta"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                label: "El establecimiento de nuevas formas de evidenciar el aporte de las TIC en el aprendizaje de los estudiantes.",
                                options: [
                                    {
                                        label: "Mencione ejemplos. (Máximo 400 caracteres)",
                                        options: [
                                            {
                                                label: "INPUT",
                                                descriptoresEvaluados: ["R3tb"]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: "No"
            }
        ]
    }
];

export default preguntas;