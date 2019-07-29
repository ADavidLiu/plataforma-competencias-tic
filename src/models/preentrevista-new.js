const preguntas = [
    {
        id: "0",
        group: "0",
        label: "¿Ha realizado modificaciones al diseño de la práctica educativa apoyada en TIC que presentó?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "1"
    },
    {
        id: "1",
        group: "0",
        label: "¿Para qué ha modificado el diseño de su práctica educativa apoyada en TIC? (Puede elegir más de una opción)",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "CHECKBOX",
        options: ["Para facilitar la presentación, almacenamiento, transmisión o intercambio de información.", "Para facilitar el acceso y la búsqueda de información de calidad.", "Para aprovechar los recursos del escenario educativo.", "Para utilizar herramientas TIC novedosas, estéticas o accesibles."],
        isTriggeredBy: "0.0"
    },
    {
        id: "2",
        group: "0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I1ta"],
        evidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad.",
        isTriggeredBy: "1.0"
    },
    {
        id: "3",
        group: "0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I1ta"],
        evidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad.",
        isTriggeredBy: "1.1"
    },
    {
        id: "4",
        group: "0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R1tb"],
        evidencia: "Modificaciones para aprovechar al máximo los recursos TIC en el escenario educativo.",
        isTriggeredBy: "1.2"
    },
    {
        id: "5",
        group: "0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R1tc"],
        evidencia: "Ejemplo de introducción de TIC siguiendo criterios de novedad, estética y accesibilidad.",
        isTriggeredBy: "1.3"
    },
    {
        id: "6",
        group: "0",
        label: "¿Qué tuvo en cuenta para modificar el diseño de su práctica educativa apoyada en TIC? (Puede elegir más de una opción)",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "CHECKBOX",
        options: ["Experiencias previas de diseño de prácticas educativas apoyadas en TIC.", "Necesidades de los estudiantes y características de los contenidos.", "El potencial educativo de las TIC."],
        isTriggeredBy: "0.0"
    },
    {
        id: "7",
        group: "0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R1ta"],
        evidencia: "Ejemplo de herramientas nuevas introducidas. Se compara la práctica actual con versiones previas.",
        isTriggeredBy: "6.0"
    },
    {
        id: "8",
        group: "0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E1ta"],
        evidencia: "Ejemplo de cambio introducido por características de los contenidos o realimentaciones de los estudiantes.",
        isTriggeredBy: "6.1"
    },
    {
        id: "9",
        group: "0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E1tb", "E1tc"],
        evidencia: "Muestra de modificación introducida a la práctica educativa apoyada en TIC a partir de la identificación de potencialidades de dichas herramientas.",
        isTriggeredBy: "6.2"
    }
];

export default preguntas;