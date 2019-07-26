const preguntas = [
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
    }
];

export default preguntas;