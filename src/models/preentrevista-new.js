const preguntas = [
    {
        id: "0",
        group: "0",
        label: "¿Ha propuesto cambios en otros escenarios educativos como consecuencia del uso de las TIC en su práctica educativa?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "1"
    },
    {
        id: "1",
        group: "0",
        label: "¿Cuáles? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E1ub"],
        evidencia: "Ejemplo de modificaciones de otros escenarios educativos.",
        isTriggeredBy: "0.0"
    },
    {
        id: "2",
        group: "1",
        label: "¿Utiliza las TIC para presentar contenidos y actividades conforme los ritmos y estilos de aprendizaje de los estudiantes?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "3"
    },
    {
        id: "3",
        group: "1",
        label: "Cómo lo hace? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E1ue"],
        evidencia: "Presentación de contenidos y actividades conforme estilos y ritmos de aprendizaje.",
        isTriggeredBy: "2.0"
    },
    {
        id: "4",
        group: "2",
        label: "¿Ha realizado modificaciones al diseño de la práctica educativa apoyada en TIC que presentó?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "5"
    },
    {
        id: "5",
        group: "2",
        label: "¿Para qué ha modificado el diseño de su práctica educativa apoyada en TIC? (Puede elegir más de una opción)",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "CHECKBOX",
        options: ["Para facilitar la presentación, almacenamiento, transmisión o intercambio de información.", "Para facilitar el acceso y la búsqueda de información de calidad.", "Para aprovechar los recursos del escenario educativo.", "Para utilizar herramientas TIC novedosas, estéticas o accesibles."],
        isTriggeredBy: "4.0"
    },
    {
        id: "6",
        group: "2",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I1ta"],
        evidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad.",
        isTriggeredBy: "5.0"
    },
    {
        id: "7",
        group: "2",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I1ta"],
        evidencia: "Cambios en (1) la manera de presentar los contenidos; (2) la forma de almacenar y compartir información; (3) manera de facilitar el acceso a información de calidad.",
        isTriggeredBy: "5.1"
    },
    {
        id: "8",
        group: "2",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R1tb"],
        evidencia: "Modificaciones para aprovechar al máximo los recursos TIC en el escenario educativo.",
        isTriggeredBy: "5.2"
    },
    {
        id: "9",
        group: "2",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R1tc"],
        evidencia: "Ejemplo de introducción de TIC siguiendo criterios de novedad, estética y accesibilidad.",
        isTriggeredBy: "5.3"
    },
    {
        id: "10",
        group: "2",
        label: "¿Qué tuvo en cuenta para modificar el diseño de su práctica educativa apoyada en TIC? (Puede elegir más de una opción)",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "CHECKBOX",
        options: ["Experiencias previas de diseño de prácticas educativas apoyadas en TIC.", "Necesidades de los estudiantes y características de los contenidos.", "El potencial educativo de las TIC."],
        isTriggeredBy: "4.0"
    },
    {
        id: "11",
        group: "2",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R1ta"],
        evidencia: "Ejemplo de herramientas nuevas introducidas. Se compara la práctica actual con versiones previas.",
        isTriggeredBy: "10.0"
    },
    {
        id: "12",
        group: "2",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E1ta"],
        evidencia: "Ejemplo de cambio introducido por características de los contenidos o realimentaciones de los estudiantes.",
        isTriggeredBy: "10.1"
    },
    {
        id: "13",
        group: "2",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E1tb", "E1tc"],
        evidencia: "Muestra de modificación introducida a la práctica educativa apoyada en TIC a partir de la identificación de potencialidades de dichas herramientas.",
        isTriggeredBy: "10.2"
    }
];

export default preguntas;