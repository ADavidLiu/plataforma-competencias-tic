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
    },
    {
        id: "14",
        group: "3",
        label: "¿Ha apoyado a alguno de sus colegas en el diseño de escenarios educativos apoyados en TIC?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "15"
    },
    {
        id: "15",
        group: "3",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E1td"],
        evidencia: "Demostración de cambios que otros profesores han introducido a su práctica educativa a partir del apoyo brindado por el docente.",
        isTriggeredBy: "14.0"
    },
    {
        id: "16",
        group: "4",
        label: "¿Ha utilizado las TIC para transmitir y comunicar los contenidos?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "17"
    },
    {
        id: "17",
        group: "4",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I2ua"],
        evidencia: "Demostración de uso de las TIC para la transmisión y comunicación de contenidos.",
        isTriggeredBy: "16.0"
    },
    {
        id: "18",
        group: "5",
        label: "¿Ha utilizado las TIC para agilizar la gestión y asignación de actividades en su práctica educativa?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "19"
    },
    {
        id: "19",
        group: "5",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I2ub"],
        evidencia: "Demostración de uso de las TIC para la gestión de la práctica educativa.",
        isTriggeredBy: "18.0"
    },
    {
        id: "20",
        group: "6",
        label: "¿Ha utilizado las TIC para retroalimentar a sus estudiantes?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "21"
    },
    {
        id: "21",
        group: "6",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R2uc"],
        isTriggeredBy: "20.0"
    },
    {
        id: "22",
        group: "7",
        label: "¿Ha divulgado su práctica educativa apoyada en TIC a través de medios informales o formales (conferencias, publicaciones)?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "23"
    },
    {
        id: "23",
        group: "7",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E2ua"],
        evidencia: "Certificado de conferencia, publicaciones, presentaciones expuestas en eventos, posters.",
        isTriggeredBy: "22.0"
    },
    {
        id: "24",
        group: "8",
        label: "¿Ha utilizado su práctica educativa en diferentes contextos (grados/niveles - instituciones)?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "25"
    },
    {
        id: "25",
        group: "8",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E2ub"],
        evidencia: "Demostración de implementación de TIC en otro escenario educativo.",
        isTriggeredBy: "24.0"
    },
    {
        id: "26",
        group: "9",
        label: "¿Ha colaborado con sus colegas en la implementación de escenarios educativos apoyados en TIC?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "27"
    },
    {
        id: "27",
        group: "9",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E2uc"],
        evidencia: "¿Testimonio de colegas que han recibido apoyo?",
        isTriggeredBy: "26.0"
    },
    {
        id: "28",
        group: "9",
        subgroup: "9.0",
        label: "Al implementarlos ¿Su práctica educativa apoyada en TIC tuvo ajustes?",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggeredBy: "26.0"
    },
    {
        id: "29",
        group: "9",
        subgroup: "9.0",
        label: "¿Qué transformaciones experimentó su práctica educativa apoyada en TIC al implementarla? (puede elegir más de una opción)",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "CHECKBOX",
        options: ["Se ha mejorado la presentación de contenidos, el intercambio de archivos, el acceso y la búsqueda de información de calidad.", "Se ha facilitado el alcance del objetivo de aprendizaje integrando herramientas diferentes a las planteadas en el diseño inicial.", "Se han propuesto nuevos usos de las TIC para favorecer el aprendizaje significativo."],
        isTriggeredBy: "28.0"
    },
    {
        id: "30",
        group: "9",
        subgroup: "9.0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I2ta"],
        evidencia: 'Demostración de "ajustes realizados en la marcha" a la práctica educativo, relacionados con la presentación de contenidos, el intercambio de archivos, el acceso y la búsqueda de información de calidad.',
        isTriggeredBy: "29.0"
    },
    {
        id: "31",
        group: "9",
        subgroup: "9.0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E2ta"],
        evidencia: 'Demostración de "cambios realizados en la marcha" a la práctica educativa para hacerla más significativa (trabajo colaborativo, andamiaje, contextualización, autorregulación, autonomía).',
        isTriggeredBy: "29.1"
    },
    {
        id: "32",
        group: "9",
        subgroup: "9.0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E2td", "E2tb"],
        evidencia: 'Demostración de "cambios realizados en la marcha" a la práctica educativa para hacerla más significativa (trabajo colaborativo, andamiaje, contextualización, autorregulación, autonomía).',
        isTriggeredBy: "29.2"
    },
    {
        id: "33",
        group: "9",
        subgroup: "9.0",
        label: "¿Por qué ha realizado cambios en su práctica educativa apoyada en TIC? (puede marcar más de una opción)",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "CHECKBOX",
        options: ["Por criterios estéticos y de accesibilidad.", "Por información sistemáticamente recogida de su práctica educativa.", "Por el análisis sistemático de la implementación de las TIC en las prácticas educativas."],
        isTriggeredBy: "28.0"
    },
    {
        id: "34",
        group: "9",
        subgroup: "9.0",
        label: "Mencione ejemplos. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R2tb"],
        evidencia: "Demostración de cambios introducidos a la práctica educativa por criterios estéticos y de accesibilidad.",
        isTriggeredBy: "33.0"
    },
    {
        id: "35",
        group: "9",
        subgroup: "9.0",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R2ta"],
        evidencia: "Información sistemáticamente recogida de práctica educativa.",
        isTriggeredBy: "33.1"
    },
    {
        id: "36",
        group: "9",
        subgroup: "9.0",
        label: "Describa el proceso de análisis de información. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E2tc"],
        evidencia: "Demostración de cambios introducidos en práctica educativa por Por el análisis sistemático de la implementación de las TIC en las prácticas educativas.",
        isTriggeredBy: "33.2"
    },
    {
        id: "37",
        group: "10",
        label: "¿Ha evaluado la efectividad de su práctica educativa apoyada en TIC en el proceso de aprendizaje de sus estudiantes?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "38"
    },
    {
        id: "38",
        group: "10",
        label: "¿De qué manera ha evaluado su práctica educativa? ¿Cuáles criterios de evaluación ha tenido en cuenta? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: [""],
        evidencia: "Demostración de método de evaluación de práctica educativa. Captura de pantalla, copia de formulario, copia de respuestas a formulario.",
        isTriggeredBy: "37.0"
    },
    {
        id: "39",
        group: "11",
        label: "¿Ha medido el impacto de su práctica educativa apoyada en TIC en el contexto educativo?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "40"
    },
    {
        id: "40",
        group: "11",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: [""],
        evidencia: "Demostración de metodología de evaluación del impacto de práctica educativa apoyada en TIC en el contexto educativo - Artículo, ponencia, presentación.",
        isTriggeredBy: "39.0"
    },
    {
        id: "41",
        group: "11",
        label: "¿Qué resultados verificables ha encontrado al evaluar su práctica educativa apoyada en TIC? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: [""],
        evidencia: 'Demostración de resultados de evaluación de práctica educativa - respuestas a formularios, formalización del "decir" de superiores, pares y estudiantes.',
        isTriggeredBy: "39.0"
    },
    {
        id: "42",
        group: "12",
        label: "¿Ha comunicado o divulgado sus estrategias de monitoreo y evaluación de impacto de las TIC en los procesos de aprendizaje?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "43"
    },
    {
        id: "43",
        group: "12",
        label: "¿Cómo lo ha hecho? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["E3ta"],
        evidencia: "Constancias de divulgación de  evaluación de práctica educativa apoyada en TIC - artículos, presentaciones, certificados, publicaciones.",
        isTriggeredBy: "42.0"
    },
    {
        id: "44",
        group: "13",
        label: "A partir de los resultados de la evaluación del impacto de las TIC en sus procesos de enseñanza y aprendizaje ¿Ha modificado su forma de evaluar la práctica educativa?",
        typeOfLevel: "ROOT",
        typeOfAnswer: "RADIO",
        options: ["Sí", "No"],
        isTriggerFor: "45"
    },
    {
        id: "45",
        group: "13",
        label: "¿Las modificaciones en qué aspectos han enfatizado? (Puede elegir más de una opción)",
        typeOfLevel: "MIDDLE",
        typeOfAnswer: "CHECKBOX",
        options: ["La efectividad para la transmisión de información y contenidos.", "La efectividad para acceder y buscar información de calidad.", "Los beneficios y costos de las TIC en la práctica educativa, en términos de tiempo, recursos, acceso a la información, transmisión y almacenamiento de contenidos.", "La eficacia de la integración de las TIC en la práctica educativa para la construcción de conocimiento.", "El establecimiento de nuevas formas de evidenciar el aporte de las TIC en el aprendizaje de los estudiantes."],
        isTriggeredBy: "44.0"
    },
    {
        id: "46",
        group: "13",
        label: "¿Qué ajustes ha realizado? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I3ta"],
        evidencia: "Demostración de ajustes de evaluación de práctica educativa en función de la efectividad para la transmisión de contenidos y el acceso a información de calidad.",
        isTriggeredBy: "45.0"
    },
    {
        id: "47",
        group: "13",
        label: "¿Qué ajustes ha realizado? (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I3ta"],
        evidencia: "Demostración de ajustes de evaluación de práctica educativa en función de la efectividad para la transmisión de contenidos y el acceso a información de calidad.",
        isTriggeredBy: "45.1"
    },
    {
        id: "48",
        group: "13",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["I3tb"],
        evidencia: "Demostración de cambios en la evaluación de la práctica educativa  en términos de tiempo, recursos, acceso a la información, transmisión y almacenamiento de contenidos.",
        isTriggeredBy: "45.2"
    },
    {
        id: "49",
        group: "13",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R3ta"],
        evidencia: "Demostración de cambios en la evaluación de la práctica educativa en función del aporte de las TIC a la construcción de conocimiento.",
        isTriggeredBy: "45.3"
    },
    {
        id: "50",
        group: "13",
        label: "Explique. (Máximo 400 caracteres)",
        typeOfLevel: "FINAL",
        typeOfAnswer: "INPUT",
        descriptores: ["R3tb"],
        evidencia: "Ejemplo de nuevas formas de evidenciar el aporte de las TIC en el aprendizaje de los estudiantes.",
        isTriggeredBy: "45.4"
    }
];

export default preguntas;