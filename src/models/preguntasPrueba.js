const preguntas = [
    {
        id: "1.1",
        codigoDescriptor: "I1a",
        enunciado: "Un docente de matemáticas necesita utilizar una herramienta que le ofrezca diversos servicios de alojamiento de archivos, de tal modo que los estudiantes puedan consultar virtualmente apuntes o documentos de clase. De las siguientes, ¿Cuáles posibilidad le sugeriría?",
        opciones: ["Dropbox, Drive, Mediafire, One Drive.", "Dropbox, Pinterest, Ustream, One Drive.", "Ustream, Flickr, Mediafire, Pinterest.", "Dropbox, One Drive, Flickr, Mediafire."],
        respuesta: "Dropbox, Drive, Mediafire, One Drive."
    },
    {
        id: "1.2",
        codigoDescriptor: "I1a",
        enunciado: "Una docente de artes necesita utilizar una herramienta que le ofrezca diversos servicios de alojamiento de archivos, de tal modo que los estudiantes puedan compartir las fotos de sus producciones con los demás estudiantes. De las siguientes, ¿Cuáles le sugeriría?",
        opciones: ["Drive, DeviantArt, Mediadire, Flickr.", "Dropbox, Pinterest, Ustream. OneDrive.", "Instagram, Pinterest, Flickr, DeviantArt.", "Facebook, Flickr, Pinterest, DeviantArt."],
        respuesta: "Instagram, Pinterest, Flickr, DeviantArt."
    },
    {
        id: "2.1",
        codigoDescriptor: "I1b",
        enunciado: "Un docente de ciencias naturales que pidió a sus estudiantes realizar un trabajo sobre el sistema respiratorio, al llegar a casa se percata que ha olvidado los mismos en el colegio. De acuerdo con lo anterior ¿Qué le recomendaría para la entrega de trabajos en próximas oportunidades?",
        opciones: ["Esperar hasta el día siguiente y pedir más tiempo para calificar y entregar notas.", "Solicitar a los estudiantes el envío de los trabajos por correo electrónico.", "Solicitar los trabajos digitalmente para guardarlos en una memoria USB.", "Solicitar el envío de trabajos usando una herramienta de almacenamiento en la nube."],
        respuesta: "Solicitar el envío de trabajos usando una herramienta de almacenamiento en la nube."
    },
    {
        id: "2.2",
        codigoDescriptor: "I1b",
        enunciado: "De los siguientes, ¿Cuáles son los tres aspectos para el apoyo de los procesos educativos que se flexibilizan más con el uso de videollamadas y el correo electrónico?",
        opciones: ["Espacio, tiempo y manejo de recursos.", "Gestión, manejo de recursos y costos.", "Espacio, tiempo y planeación.", "Gestión, tiempo y planeación."],
        respuesta: "Gestión, tiempo y planeación."
    },
    {
        id: "3.1",
        codigoDescriptor: "I1c",
        enunciado: "Una docente desea presentar a sus estudiantes el contenido de su curso de una manera más ágil y fácil de entender. De las siguientes, ¿Cuál es la principal opción que debe tomar para cumplir su propósito?",
        opciones: ["Presentar oralmente el programa y los objetivos del curso.", "Usar un editor de textos en línea.", "Usar una herramienta para encuentros sincrónicos en línea.", "Utilizar un editor de infografías en línea."],
        respuesta: "Utilizar un editor de infografías en línea."
    },
    {
        id: "3.2",
        codigoDescriptor: "I1c",
        enunciado: "Un docente utilizó un editor de mapas mentales en línea para mostrar la estructura de los contenidos de su clase. En cuanto a la gestión de la asignatura, ¿Cuál es la razón que mejor sustenta la decisión?",
        opciones: ["Introducir una herramienta novedosa.", "Facilitar la comunicación de información.", "Facilitar la construcción de conocimiento.", "Variar los medios educativos utilizados."],
        respuesta: "Facilitar la comunicación de información."
    },
    {
        id: "4.1",
        codigoDescriptor: "I1d",
        enunciado: "Un docente de ciencias sociales y desea que sus estudiantes realicen una búsqueda sobre la Segunda Guerra Mundial. De los siguientes, ¿Qué es lo más importante que debe hacer él para cumplir su propósito?",
        opciones: ["Pedir a los estudiantes que observen alguna película sobre la temática.", "Que utilicen buscadores para explorar información sobre el tema.", "Sugerir a los estudiantes sitios en Internet para realizar la búsqueda.", "Utilizar una guía con los criterios para encontrar información relevante."],
        respuesta: "Utilizar una guía con los criterios para encontrar información relevante."
    },
    {
        id: "4.2",
        codigoDescriptor: "I1d",
        enunciado: "Una docente de francés ha identificado en la web diversos textos educativos para implementarlos en sus clases. La razón que mejor sustenta la decisión de ella es:",
        opciones: ["Los estudiantes prefieren materiales educativos de Internet.", "Los libros tradicionales son menos llamativos.", "Es más fácil planear lecciones buscando los recursos en Internet.", "El acceso a materiales educativos actuales y de alta calidad."],
        respuesta: "El acceso a materiales educativos actuales y de alta calidad."
    },
    {
        id: "5.1",
        codigoDescriptor: "I2a",
        enunciado: "Un docente de español ha decidido cambiar el plan de clase para asistir con los estudiantes a un festival de literatura que se está llevando a cabo en la zona donde está ubicada la institución. De los siguientes, ¿Qué es lo más importante que debe hacer para enseñar el contenido que se iba a trabajar ese día en clase?",
        opciones: ["Grabar la explicación de los contenidos y compartirla por Youtube para retomarla en la siguiente clase.", "Enviar por correo electrónico los contenidos planeados y las actividades a entregar en la próxima clase.", "Pedir a los estudiantes el envío de un informe sobre lo acontecido en el festival de literatura.", "Pedir a los estudiantes que busquen en Internet información sobre el tema de la clase."],
        respuesta: "Enviar por correo electrónico los contenidos planeados y las actividades a entregar en la próxima clase."
    },
    {
        id: "5.2",
        codigoDescriptor: "I2a",
        enunciado: "Una docente de primaria solo tiene disponible las horas de clase presenciales para encontrarse con sus estudiantes, pero necesita comunicarse en otros momentos con ellos para gestionar las actividades de la asignatura. De las siguientes ¿Cuál es la mejor opción que debe tomar para comunicarse efectivamente con los estudiantes?",
        opciones: ["Pedirle a cada estudiante su correo electrónico para escribirles individualmente.", "Pedirle el teléfono a un estudiante para que este comparta la información con los demás.", "Utilizar un blog para compartir la información y resolver las dudas a través de los comentarios.", "Usar una red social (Facebook, Twitter) para publicar más ágilmente información."],
        respuesta: "Utilizar un blog para compartir la información y resolver las dudas a través de los comentarios."
    },
    {
        id: "6.1",
        codigoDescriptor: "I2b",
        enunciado: "Una docente asignó a los estudiantes una investigación guiada en la web. Teniendo en cuenta la posibilidad de acceso a un gran volumen de información por parte de los estudiantes ¿Cuál es la mejor acción que debe tomar la maestra para orientar la actividad?",
        opciones: ["El planteamiento de criterios para seleccionar información relevante.", "La elaboración de un listado de sitios donde podría realizarse la búsqueda.", "Las sugerencias de un listado de documentos a consultar.", "La construcción de un listado de buscadores disponibles."],
        respuesta: "El planteamiento de criterios para seleccionar información relevante."
    },
    {
        id: "6.2",
        codigoDescriptor: "I2b",
        enunciado: "Usualmente, un docente de ciencias recomienda a sus estudiantes buscadores diferentes a los académicos para encontrar información relevante para la clase. De las siguientes, ¿Cuál es la mejor razón que justifica la decisión del profesor?:",
        opciones: ["Tienen filtros que facilitan la búsqueda de información.", "Evitan desplazamientos a bibliotecas, hemerotecas, etc.", "Son más atractivos que los medios convencionales.", "Permiten acceder a información actualizada y de calidad."],
        respuesta: "Permiten acceder a información actualizada y de calidad."
    },
    {
        id: "7.1",
        codigoDescriptor: "I3a",
        enunciado: "De las siguientes, ¿Cuál es la principal razón que justifica la realización de evaluaciones en línea?",
        opciones: ["La posibilidad de formular distintos tipos de preguntas.", "La posibilidad de construir un banco de preguntas para nuevas evaluaciones.", "La posibilidad de mezclar el orden de las preguntas y las opciones de respuesta.", "La agilización del proceso de calificación y retroalimentación."],
        respuesta: "La agilización del proceso de calificación y retroalimentación."
    },
    {
        id: "7.2",
        codigoDescriptor: "I3a",
        enunciado: "Los estudiantes de un docente que utiliza pruebas cerradas presenciales reportan en la valoración de desempeño docente que éste se demora en calificar, retroalimentar y entregar las evaluaciones. De las siguientes, ¿Cuál es la herramienta que mejor ayuda a solucionar esta situación?",
        opciones: ["Un editor de pruebas en línea.", "El correo electrónico.", "Un sistema de gestión del aprendizaje (ej. Moodle, Blackboard).", "Una herramienta de almacenamiento en la nube."],
        respuesta: "Un sistema de gestión del aprendizaje (ej. Moodle, Blackboard)."
    },
    {
        id: "8.1",
        codigoDescriptor: "I3b",
        enunciado: "Un docente está decidiendo la mejor manera de comunicar a sus estudiantes las actividades y el material de su clase. De las siguientes, ¿Cuál es la mejor decisión que él debe tomar para lograr su propósito?:",
        opciones: ["Compartir la planeación del curso a través de un grupo de mensajería instantánea.", "Entregar la planeación del curso en una memoria USB.", "Publicar la planeación en un sistema de gestión del aprendizaje (ej. Moodle).", "Enviar a cada estudiante la planeación del curso por correo electrónico."],
        respuesta: "Publicar la planeación en un sistema de gestión del aprendizaje (ej. Moodle)."
    },
    {
        id: "8.2",
        codigoDescriptor: "I3b",
        enunciado: "Una docente de biología viene implementando en su clase una práctica de investigación sobre los ecosistemas. Aunque ésta práctica facilita la comprensión de los contenidos, ella tiene dificultades para recoger el material anexo producido por los estudiantes. De las siguientes, ¿Cuál es la mejor decisión que debe tomar la docente para lograr su propósito?",
        opciones: ["Pedir a los estudiantes la documentación adicional por correo electrónico.", "Crear una carpeta compartida en la web donde los grupos carguen sus archivos.", "Solicitar la publicación del material anexo a través de un Blog.", "Pedir a los estudiantes que  al finalizar el curso entreguen los anexos en CD."],
        respuesta: "Crear una carpeta compartida en la web donde los grupos carguen sus archivos."
    },
    {
        id: "9.1",
        codigoDescriptor: "I3c",
        enunciado: "Una docente requiere que los estudiantes aprendan a construir problemas de investigación, pero ellos tienen dudas sobre dónde y cómo encontrar información pertinente y actualizada para identificar una posible temática de investigación. De las siguientes, ¿Cuál es la mejor decisión que debe tomar ella para lograr su propósito?",
        opciones: ["Sugerir la utilización de buscadores y metabuscadores.", "Sugerir la utilización de bases de datos académicas.", "Recomendar expertos disciplinares que pueden ser consultados.", "Compartir criterios buscar en sitios web especializados."],
        respuesta: "Compartir criterios buscar en sitios web especializados."
    },
    {
        id: "9.2",
        codigoDescriptor: "I3c",
        enunciado: "Un docente de física tiene dificultad para encontrar material audiovisual que le permita mostrar a los estudiantes las aplicaciones de la física en la vida cotidiana. De las siguientes, ¿Cuál es la mejor decisión que debe tomar para lograr su propósito?:",
        opciones: ["Utilizar los materiales y ejemplos que sus colegas tengan disponibles.", "Consultar portales educativos especializados en las temáticas que trabaja en su curso.", "Pedir a los estudiantes que diseñen algunos ejemplos y los compartan en la nube.", "Construir un inventario de ejemplos en línea, a partir de películas, noticias y documentales."],
        respuesta: "Consultar portales educativos especializados en las temáticas que trabaja en su curso."
    },
    {
        id: "10.1",
        codigoDescriptor: "R1a",
        enunciado: "Un docente decide innovar su clase a través de algunas actividades apoyadas en TIC. De las siguientes, ¿Cuál es la razón que mejor debe sustentar su decisión?",
        opciones: ["Las herramientas novedosas motivan más a los estudiantes.", "La facilitación de la comunicación con los estudiantes.", "La posibilidad de utilizar recursos educativos multimedia.", "La agilización de la gestión de la asignatura."],
        respuesta: "La posibilidad de utilizar recursos educativos multimedia."
    },
    {
        id: "10.2",
        codigoDescriptor: "R1a",
        enunciado: "La Coordinación Académica solicita a los docentes fomentar la construcción de conocimiento incorporando TIC en sus clases. De las siguientes, ¿Cuál es la mejor decisión que deben tomar los profesores para lograr el propósito de la Coordinación Académica?:",
        opciones: ["Aprovechar redes sociales como Facebook y Twiter para comunicarse y compartir noticias relevantes para su clase.", "Usar las bases de datos que conoce para que los estudiantes busquen información especializada.", "Utilizar las herramientas tecnológicas para hacer controles de lectura y evaluaciones permanentes.", "Proponer a los estudiantes situaciones de resolución de problemas que no podrían realizar en el contexto real."],
        respuesta: "Proponer a los estudiantes situaciones de resolución de problemas que no podrían realizar en el contexto real."
    },
    {
        id: "11.1",
        codigoDescriptor: "R1b",
        enunciado: "Un docente de ciencias desea incorporar una herramienta tecnológica para favorecer la comprensión de la relación entre los órganos que integran el sistema digestivo. De las siguientes, ¿Cuál es la mejor decisión que debe tomar él para lograr su propósito?:",
        opciones: ["Usar fotos para mostrar cómo se relacionan estos órganos.", "Usar una infografía para ejemplificar cómo un órgano afecta al otro.", "Enlazar textos en línea para que los estudiantes los consulten.", "Utilizar una multimedia para simular la relación entre los órganos."],
        respuesta: "Utilizar una multimedia para simular la relación entre los órganos."
    },
    {
        id: "11.2",
        codigoDescriptor: "R1b",
        enunciado: "Una docente de literatura asiste a un seminario internacional de actualización en el que conoce a uno de los escritores que ella enseña en clase. Esto abre la oportunidad de contactarse con el escritor en una ocasión posterior. De las siguientes, ¿Cuál es la mejor opción que debe tomar la maestra para propiciar construcción de conocimiento en sus estudiantes?",
        opciones: ["Solicitar al escritor el resumen escrito de la conferencia para compartirlo.", "Planear una videoconferencia magistral con el escritor.", "Pedir al escritor el video de la conferencia para compartirlo.", "Proponer al escritor un debate asincrónico con los estudiantes."],
        respuesta: "Proponer al escritor un debate asincrónico con los estudiantes."
    },
    {
        id: "12.1",
        codigoDescriptor: "R1c",
        enunciado: "Una docente ha llevado a sus estudiantes al museo de ciencia para realizar observación de animales disecados, especialmente de su sistema digestivo. De las siguientes, ¿Cuál es la mejor actividad que ella debe realizar para complementar el aprendizaje en los estudiantes?",
        opciones: ["Observar videos en línea sobre sistemas digestivos en animales.", "Mirar ilustraciones de los órganos del sistema digestivo en animales.", "Manipular una simulación sobre el sistema digestivo en animales.", "Participar en un foro asincrónico sobre la visita al museo."],
        respuesta: "Manipular una simulación sobre el sistema digestivo en animales."
    },
    {
        id: "12.2",
        codigoDescriptor: "R1c",
        enunciado: "Con el fin de monitorear la comprensión de contenidos, un docente quiere que los estudiantes de sus diferentes cursos construyan mapas conceptuales utilizando una herramienta en línea. De las siguientes, ¿Cuál es la mejor decisión que permite lograr el propósito del profesor?",
        opciones: ["Anticipa un uso adecuado de la herramienta.", "Debería planear un uso diferenciado de la herramienta según el nivel educativo del estudiante.", "Planea un uso inadecuado de la herramienta.", "Debería utilizar otra herramienta para monitorear la comprensión."],
        respuesta: "Anticipa un uso adecuado de la herramienta."
    },
    {
        id: "13.1",
        codigoDescriptor: "R1d",
        enunciado: "Un grupo de docentes de ciencias discute sobre la dificultad para identificar los logros y avances en las comprensiones de los estudiantes sobre los contenidos. En cuanto al seguimiento y la evaluación de los estudiantes ¿Cuál es la mejor decisión que pueden tomar los profesores?",
        opciones: ["Solicitar a los estudiantes un diario de su proceso de aprendizaje a través de un Blog.", "Usar herramientas tecnológicas que favorezcan un registro gradual de los cambios del desempeño.", "Hacer evaluaciones en línea entre los mismos estudiantes, ya que se pueden sentir más cómodos.", "Usar una plataforma de aprendizaje (Ej. Moodle) para publicar las calificaciones de los estudiantes."],
        respuesta: "Usar herramientas tecnológicas que favorezcan un registro gradual de los cambios del desempeño."
    },
    {
        id: "13.2",
        codigoDescriptor: "R1d",
        enunciado: "El docente de un curso necesita monitorear en los estudiantes la comprensión sobre el contenido del texto guía. De las siguientes, ¿Cuál es la mejor decisión que él debe tomar para lograr su propósito?",
        opciones: ["Elaborar un mapa conceptual utilizando una herramienta en línea.", "Elaborar un sondeo explorando el interés que suscita el tema.", "Responder un test cerrado y en línea de recuperación de información.", "Hacer un sondeo donde pregunte qué se ha entendido del tema."],
        respuesta: "Elaborar un mapa conceptual utilizando una herramienta en línea."
    },
    {
        id: "14.1",
        codigoDescriptor: "R2a",
        enunciado: "Un docente de ciencias sociales eligió implementar foros virtuales asincrónicos para fortalecer la competencia argumentativa de sus estudiantes. De las siguientes, ¿Cuál es la mejor razón que sustenta la decisión de usar foros asincrónicos?",
        opciones: ["Permiten a los estudiantes expresar libremente sus opiniones.", "Permiten anexar diversas fuentes en línea para apoyar los argumentos.", "Pueden ser consultados en diferentes momentos.", "Permiten exponer sus argumentos sin temor a las reacciones de los compañeros."],
        respuesta: "Permiten anexar diversas fuentes en línea para apoyar los argumentos."
    },
    {
        id: "14.2",
        codigoDescriptor: "R2a",
        enunciado: "Una docente decide utilizar un software educativo para simular cada una de las etapas del tratamiento del agua, en el cual los estudiantes pueden manipular los diferentes tipos de equipos de tratamiento, así como los insumos que se utilizan, tiempos requeridos y momentos del tratamiento. De las siguientes, ¿Cuál es la mejor razón que sustenta la decisión de usar el software educativo?",
        opciones: ["Se aprovecha la infraestructura tecnológica instalada en la institución educativa.", "Favorece la exploración científica, la formulación de hipótesis y la experimentación.", "Utilizar el software hace que los estudiantes aprendan de manera lúdica y se motiven.", "Favorece las habilidades motrices y la interacción entre los estudiantes del curso."],
        respuesta: "Favorece la exploración científica, la formulación de hipótesis y la experimentación."
    },
    {
        id: "15.1",
        codigoDescriptor: "R2b",
        enunciado: "Un docente de español viene utilizando desde hace tres años los foros virtuales asincrónicos para fortalecer y evaluar en los estudiantes la competencia argumentativa. De las siguientes, ¿Cuál es la mejor razón que sustenta la decisión de usar foros virtuales asincrónicos?",
        opciones: ["Permite monitorear la cantidad de participaciones de los estudiantes.", "Permite monitorear la extensión de las participaciones de los estudiantes.", "Guardan un registro secuencial de las participaciones de los estudiantes.", "Facilitan la autoevaluación y coevaluación entre los estudiantes."],
        respuesta: "Guardan un registro secuencial de las participaciones de los estudiantes."
    },
    {
        id: "15.2",
        codigoDescriptor: "R2b",
        enunciado: "Una docente de tecnología ha enseñado a sus estudiantes a modelar objetos simples en 3D (cilindro, conos, cubos, esferas). De las siguientes, ¿Cuál sería la mejor manera de evaluar el aprendizaje de los estudiantes?",
        opciones: ["Utilizar una prueba cerrada en línea sobre los pasos para modelar objetos simples.", "Solicitar una demostración en video del modelado de objetos simples.", "Utilizar una prueba en línea sobre los tipos de objetos simples estudiados.", "Usar un blog para exponer composiciones con objetos simples modelados."],
        respuesta: "Usar un blog para exponer composiciones con objetos simples modelados."
    },
    {
        id: "16.1",
        codigoDescriptor: "R2c",
        enunciado: "Un docente de quiere integrar evaluaciones apoyadas en TIC en su clase. De los siguientes, ¿Cuál es el aspecto más importante que él debe considerar en cuanto al potencial de las evaluaciones con TIC?",
        opciones: ["Permiten realizar un seguimiento al proceso de aprendizaje de los estudiantes a partir del desempeño en las actividades.", "Facilitan la medición del desempeño para tomar acciones correctivas dentro de la clase.", "Posibilitan la realización de correcciones basadas en lo que los estudiantes saben en un momento determinado.", "Permiten ajustar a las secuencias didácticas a partir de las necesidades y de los errores presentados en la evaluación."],
        respuesta: "Permiten realizar un seguimiento al proceso de aprendizaje de los estudiantes a partir del desempeño en las actividades."
    },
    {
        id: "16.2",
        codigoDescriptor: "R2c",
        enunciado: "Una docente de francés considera que los estudiantes no están obteniendo buenos resultados en una evaluación escrita que realiza al final del año lectivo, que consiste en construir un ensayo en el blog del curso. De las siguientes, ¿Cuál es la mejor decisión que debe tomar la profesora para lograr su propósito?",
        opciones: ["Ajustar el nivel de dificultad de la evaluación según lo revisado en clase.", "Revisar si el contenido de la evaluación corresponde con lo revisado en clase.", "Convertir la evaluación en un proceso de construcción a través del año lectivo.", "Realizar más evaluaciones parecidas a lo largo del año lectivo."],
        respuesta: "Convertir la evaluación en un proceso de construcción a través del año lectivo."
    },
    {
        id: "17.1",
        codigoDescriptor: "R2d",
        enunciado: "Una docente ha utilizado evaluaciones en línea desde hace más de dos años. En cuanto al monitoreo del aprendizaje, ¿Cuál es el beneficio más importante con esta manera de evaluar?",
        opciones: ["Superación de las limitaciones de tiempo y espacio.", "Mayor facilidad de seguimiento de los estudiantes.", "Facilidad para evaluar los desempeños rápida y eficientemente.", "Incremento de la participación de los estudiantes."],
        respuesta: "Mayor facilidad de seguimiento de los estudiantes."
    },
    {
        id: "17.2",
        codigoDescriptor: "R2d",
        enunciado: "Una docente está convenciendo a otro profesor de incorporar TIC a sus clases. En cuanto al aprendizaje, ¿Cuál es el mejor argumento que debe usar la profesora?",
        opciones: ["Agilizan los procesos administrativos dentro de la clase.", "Favorecen el seguimiento de la construcción de conocimiento.", "Permiten continuar el trabajo de la clase en otros espacios.", "Favorecen el trabajo autónomo de los estudiantes."],
        respuesta: "Favorecen el seguimiento de la construcción de conocimiento."
    },
    {
        id: "18.1",
        codigoDescriptor: "R3a",
        enunciado: "Una docente de trigonometría ha integrado diversas actividades basadas en simulaciones de problemas del mundo real apoyadas en TIC, que además le permiten realizar evaluaciones a sus estudiantes. De las siguientes, ¿Cuál es la ventaja más relevante de realizar dichas evaluaciones con TIC?",
        opciones: ["La posibilidad de evaluar a los estudiantes en más ocasiones.", "La posibilidad de diversificar las formas de evaluar el aprendizaje.", "La posibilidad de hacer un seguimiento más cercano del proceso aprendizaje.", "La posibilidad que los estudiantes accedan a sus resultados de manera más rápida."],
        respuesta: "La posibilidad de hacer un seguimiento más cercano del proceso aprendizaje."
    },
    {
        id: "18.2",
        codigoDescriptor: "R3a",
        enunciado: "Una coordinadora académica necesita que los profesores empiecen a integrar TIC en sus procesos educativos. Desde una perspectiva pedagógica, ¿Cuál es la razón que mejor justifica la postura de la coordinadora en cuanto la incorporación de TIC?:",
        opciones: ["Las TIC facilitan el seguimiento y evaluación de los aprendizajes de los estudiantes.", "Las TIC agilizan procesos administrativos y seguimiento a la labor de los profesores.", "Las TIC permiten reducir costos y reducir tiempo en los procesos académicos.", "Las TIC facilitan la construcción y consolidación de comunidad educativa."],
        respuesta: "Las TIC facilitan el seguimiento y evaluación de los aprendizajes de los estudiantes."
    },
    {
        id: "19.1",
        codigoDescriptor: "R3b",
        enunciado: "Una docente incorporó hace tres años TIC a sus clases para impulsar el alcance de los objetivos de aprendizaje. En este tiempo, la docente seguramente se ha dado cuenta que la utilización de TIC:",
        opciones: ["Agiliza la realización de actividades administrativas y de organización.", "Motiva más la participación de los estudiantes por fuera de clase.", "Implica la reflexión y reformulación de la propia práctica educativa.", "Demanda mayor cantidad de tiempo para responder a las dudas de los estudiantes."],
        respuesta: "Implica la reflexión y reformulación de la propia práctica educativa."
    },
    {
        id: "19.2",
        codigoDescriptor: "R3b",
        enunciado: "Un docente de arte ha empezado a incorporar la visita virtual a museos para desarrollar competencias en crítica de arte. De las siguientes, ¿Cuál es la principal actividad que involucra dicha práctica educativa con TIC?",
        opciones: ["La generación de estrategias de motivación de los estudiantes.", "La realización de ajustes adicionales al diseño del curso.", "La supresión de las visitas a los museos de la ciudad.", "La alfabetización digital de los estudiantes del curso."],
        respuesta: "La realización de ajustes adicionales al diseño del curso."
    },
    {
        id: "20.1",
        codigoDescriptor: "R3c",
        enunciado: "Un docente ha incorporado actividades apoyadas en TIC, obteniendo resultados importantes en los aprendizajes de sus estudiantes. De los siguientes, ¿Cuál es el principal objetivo que ha permitido desarrollar todo el potencial pedagógico de las TIC?:",
        opciones: ["Motivar a los estudiantes que son nativos digitales a trabajar en un medio significativo.", "Favorecer el aprendizaje significativo de los estudiantes a partir de las características propias de las TIC.", "Ampliar la cantidad y calidad de los recursos educativos disponibles para los estudiantes.", "Romper las barreras de tiempo y espacio en los escenarios educativos favoreciendo el aprendizaje activo."],
        respuesta: "Favorecer el aprendizaje significativo de los estudiantes a partir de las características propias de las TIC."
    },
    {
        id: "20.2",
        codigoDescriptor: "R3c",
        enunciado: "Dos docentes conversan sobre las ventajas de utilizar TIC en el contexto educativo. Uno argumenta que la tecnología solo puede mejorar la comunicación con los estudiantes y el acceso a la información. De los siguientes, ¿cuál es el mejor contraargumento que daría el otro docente?",
        opciones: ["Las TIC tienen características únicas para favorecer construcción de conocimiento.", "Las TIC son el lenguaje de los estudiantes nacidos en la sociedad del conocimiento.", "Las TIC tienen características que facilitan la participación y colaboración.", "Las TIC generan mayor atracción e interés por parte de los estudiantes."],
        respuesta: "Las TIC tienen características únicas para favorecer construcción de conocimiento."
    },
    {
        id: "21.1",
        codigoDescriptor: "E1a",
        enunciado: "A un docente de matemática se le asignó un curso de cálculo apoyado en TIC. Por varios años, el profesor ha mantenido el curso lo más parecido al creado por su predecesor. De las siguientes, ¿La mejor decisión que debe tomar el docente es?",
        opciones: ["Cambiar el curso para que los estudiantes no pierdan la motivación.", "Buscar nuevas tendencias educativas para actualizar el curso.", "Buscar la ayuda del anterior profesor para actualizar el curso.", "Buscar innovaciones tecnológicas para estar a la par de los intereses de los estudiantes."],
        respuesta: "Buscar nuevas tendencias educativas para actualizar el curso."
    },
    {
        id: "21.2",
        codigoDescriptor: "E1a",
        enunciado: "Una oficina de apoyo a la formación de docentes en el uso de las TIC tiene como objetivo promover la creación de prácticas educativas significativas e innovadoras en el colegio. Conforme lo anterior, ¿Cuál de las siguientes actividades debe ser la prioridad de dicha oficina?",
        opciones: ["La adquisición de herramientas novedosas para los computadores de la institución.", "La exploración de tendencias educativas actuales.", "La réplica de experiencias educativas exitosas.", "El mejoramiento de la infraestructura tecnológica de la institución."],
        respuesta: "La exploración de tendencias educativas actuales."
    },
    {
        id: "22.1",
        codigoDescriptor: "E1b",
        enunciado: "Una docente de geografía ha notado que la forma de preparar su clase ha cambiado paulatinamente desde que incorporó varias actividades apoyadas en tecnología. De los siguientes, ¿Cuál es el cambio más notable?",
        opciones: ["Tiene que anticipar las posibles respuestas en línea de los estudiantes.", "Tiene que dedicar más tiempo a la planificación y desarrollo del curso.", "Dedica menos tiempo a planear y desarrollar las actividades.", "Tiene más tiempo para planear las actividades presenciales y en línea."],
        respuesta: "Tiene que dedicar más tiempo a la planificación y desarrollo del curso."
    },
    {
        id: "22.2",
        codigoDescriptor: "E1b",
        enunciado: "Un coordinador académico quiere que sus profesores aprendan a diseñar cursos apoyados en TIC. De los siguientes, ¿Cuál es el cambio más notable respecto a los tiempos asignados para la preparación de clase?:",
        opciones: ["Podrían ser reducidos, dado que las TIC agilizan la gestión de información.", "Se conservarían, dado que es más fácil buscar y conseguir contenidos pertinentes.", "Se ampliarían, dado que tocaría preparar lecciones nuevamente.", "Se ampliarían, dado que buscar materiales educativos en Internet es demorado."],
        respuesta: "Se ampliarían, dado que tocaría preparar lecciones nuevamente."
    },
    {
        id: "23.1",
        codigoDescriptor: "E1c",
        enunciado: "Un docente de literatura ha decidido mejorar la manera en que utiliza las TIC para poyar su curso. De los siguientes, ¿Qué es lo más importante que debe tener presente él para seguir utilizándolas?:",
        opciones: ["Tener en cuenta los recursos y límites con los que cuenta para el diseño de su escenario educativo.", "Tener en cuenta que con relación a las TIC la innovación es lo más importante.", "Tener en cuenta las herramientas TIC más populares entre sus estudiantes.", "Tener en cuenta que las ideas de otros profesores le serán de utilidad aunque su curso es diferente."],
        respuesta: "Tener en cuenta los recursos y límites con los que cuenta para el diseño de su escenario educativo."
    },
    {
        id: "23.2",
        codigoDescriptor: "E1c",
        enunciado: "Una docente de física quiere utilizar simuladores para explicar diversos fenómenos de mecánica clásica. De los siguientes, ¿Qué es lo más importante que debe tener presente ella?:",
        opciones: ["Apoyarse en el área de informática para el desarrollo de los simuladores.", "Utilizar otros medios educativos disponibles en la web (videos, imágenes).", "Buscar en la web simuladores sobre los contenidos que desea enseñar.", "Aprovechar los diversos libros de texto disponibles en biblioteca."],
        respuesta: "Buscar en la web simuladores sobre los contenidos que desea enseñar."
    },
    {
        id: "24.1",
        codigoDescriptor: "E1d",
        enunciado: "Un docente de ciencias sociales necesita que sus estudiantes sean capaces de explicar la utilidad de las normas en las comunidades. Para esto, el docente planea: (1) definir los términos “comunidad” y “norma”. (2) proyectar ejemplos de normas con imágenes de Internet. (3) solicitar la toma de fotos que representen normas de la comunidad. (4) cargar las fotografías en una carpeta compartida. (5) exhibir las fotos.(6) evaluar lo aprendido solicitando la explicación de la utilidad de las normas. Conforme a este plan, lo mejor que se puede inferir es:",
        opciones: ["Existe coherencia porque las actividades planteadas permiten alcanzar el objetivo de aprendizaje propuesto.", "Existe incoherencia porque las actividades planteadas apuntan al alcance de otro objetivo de aprendizaje.", "Existe coherencia porque el docente explica la utilidad de las normas y evalúa lo mismo en sus estudiantes.", "Existe incoherencia, porque hay falta de correspondencia entre la presentación temática y la práctica."],
        respuesta: "Existe incoherencia porque las actividades planteadas apuntan al alcance de otro objetivo de aprendizaje."
    },
    {
        id: "24.2",
        codigoDescriptor: "E1d",
        enunciado: "Una docente de matemáticas espera que sus estudiantes reconozcan atributos que pueden medirse en los objetos como: (longitud, área, peso, volumen). Para esto, ella planea: (1) Explicar los atributos con videos de Internet. (2) proponer ejercicio presencial de clasificación de atributos. (3) solicitar la grabación y compartición de video mostrando ejemplos de atributos. Conforme a este plan, lo mejor que se puede inferir es:",
        opciones: ["Existe coherencia entre contenidos, actividades y evaluación.", "No existe coherencia entre contenidos, actividades y evaluación.", "Las actividades propuestas NO permiten alcanzar el objetivo propuesto.", "Las TIC NO se usan para promover el alcance del objetivo propuesto."],
        respuesta: "Existe coherencia entre contenidos, actividades y evaluación."
    },
    {
        id: "24.3",
        codigoDescriptor: "E1d",
        enunciado: "Un docente de ciencias sociales espera que sus estudiantes puedan crear encuestas en línea al finalizar el curso, para esto les explica el funcionamiento de la herramienta y brinda oportunidades de práctica. Finalmente, a modo de evaluación solicita el análisis de unos resultados. Conforme lo anterior, se puede inferir que el desempeño de los estudiantes será:",
        opciones: ["El esperado, porque las actividades son coherentes con el objetivo de aprendizaje.", "El esperado, porque los nativos digitales saben usar los cuestionarios en línea.", "El esperado, porque existe coherencia en la metodología de enseñanza.", "El no esperado, porque existe incoherencia en la metodología de enseñanza."],
        respuesta: "El no esperado, porque existe incoherencia en la metodología de enseñanza."
    },
    {
        id: "25.1",
        codigoDescriptor: "E1e",
        enunciado: "Una docente de ciencias espera que sus estudiantes sean capaces de clasificar los seres vivos en diversos grupos taxonómicos (plantas, animales, microorganismos). Para evaluar el aprendizaje, usualmente utiliza una multimedia que permite categorizar los seres vivos y recibir retroalimentación. No obstante, ella ha identificado que los estudiantes NO demuestran los desempeños esperados, aunque les resulta atractiva. De los siguientes, ¿Qué es lo más importante que debe tener presente la docente para obtener los desempeños esperados?:",
        opciones: ["Suspender el uso de la multimedia porque no aporta al alcance del objetivo de aprendizaje.", "Utilizar la misma multimedia para explorar los conocimientos previos y para brindar oportunidades de práctica.", "Suspender el uso de la multimedia porque no permite evidenciar el aprendizaje de los estudiantes.", "Fortalecer las explicaciones y seguir utilizando la herramienta porque esta resulta atractiva para los estudiantes."],
        respuesta: "Utilizar la misma multimedia para explorar los conocimientos previos y para brindar oportunidades de práctica."
    },
    {
        id: "25.2",
        codigoDescriptor: "E1e",
        enunciado: "A un docente de Biología que da clase a estudiantes en último grado de secundaria le asignaron la enseñanza a alumnos de último grado de primaria. Él utilizaba wikis para la construcción de informes de prácticas de laboratorio. De las siguientes, ¿Cuál es la mejor decisión que debe tomar por el cambio de grado escolar?:",
        opciones: ["Evitar las wiki y solicitar los informes en archivo de procesador de texto.", "Utilizar otra herramienta diferente a las wiki, como los blogs.", "Adaptar la utilización de la wiki conforme las nuevas circunstancias.", "NO usar herramientas como las wiki por el momento."],
        respuesta: "Adaptar la utilización de la wiki conforme las nuevas circunstancias."
    },
    {
        id: "26.1",
        codigoDescriptor: "E2a",
        enunciado: "Un docente de lenguaje que usualmente realiza debates presenciales en sus clases ha identificado que algunos estudiantes regularmente se inhiben y que sus argumentos podrían estar mejor fundamentados. Para explorar una solución a lo anterior, él implementó un foro virtual asincrónico en su curso. De acuerdo con lo anterior, la decisión del profesor fue:",
        opciones: ["Innecesaria, pues la inhibición o la fundamentación dependen del estudiante (personalidad y compromiso).", "Acertada, porque favorecen la participación y propician la búsqueda de información.", "Innecesaria, porque la inhibición o la fundamentación dependen más de la estructura de la actividad.", "Justificable, dado que las TIC tienen múltiples potencialidades que deben ser aprovechadas."],
        respuesta: "Acertada, porque favorecen la participación y propician la búsqueda de información."
    },
    {
        id: "26.2",
        codigoDescriptor: "E2a",
        enunciado: "Una docente de ciencias medioambientales necesita que sus estudiantes debatan sobre la minería, conservando un registro que se pueda revisar ágilmente. Ella utilizó como herramienta el chat, sin embargo, no obtuvo los resultados esperados. Conforme lo anterior, se podría inferir que:",
        opciones: ["El chat es la herramienta idónea para debatir.", "El foro presencial funciona mejor que el chat.", "El chat funciona si se estructura la actividad.", "El foro asincrónico funciona mejor que el chat."],
        respuesta: "El chat funciona si se estructura la actividad."
    },
    {
        id: "27.1",
        codigoDescriptor: "E2b",
        enunciado: "Un docente de lenguaje quiere que sus estudiantes, al finalizar la clase, estén en la capacidad de elaborar un plan de escritura de un texto informativo. Para lo anterior, utilizó un blog que permite explorar conocimientos previos, presentar ejemplos, brindar oportunidades de práctica y evaluar el aprendizaje. De las siguientes, ¿cuál es la principal consideración que debe tener en cuenta para lograr su propósito?",
        opciones: ["El blog no es una herramienta idónea para alcanzar el objetivo de aprendizaje propuesto.", "El blog es una herramienta versátil y útil para alcanzar el objetivo de aprendizaje propuesto.", "Una wiki o un documento en línea funcionan mejor para el alcance del objetivo.", "El blog es recomendable solamente para algunas de las actividades propuestas por el docente."],
        respuesta: "El blog es una herramienta versátil y útil para alcanzar el objetivo de aprendizaje propuesto."
    },
    {
        id: "27.2",
        codigoDescriptor: "E2b",
        enunciado: "¿Cuál de las siguientes es un excelente recurso medio educativo/recurso didáctico/material educativo para explicar un fenómeno dinámico como la comunicación neuronal/alimentación celular/reproducción celular?:",
        opciones: ["Un video o animación.", "Una multimedia interactiva/Un simulador.", "Una infografía.", "Un documento diagramado."],
        respuesta: "Una multimedia interactiva/Un simulador."
    },
    {
        id: "27.3",
        codigoDescriptor: "E2b",
        enunciado: "Un docente de lenguaje tiene como propósito que sus estudiantes aprendan a analizar la estructura de los argumentos. Conforme lo anterior, ¿Cuándo podría implementarse mejor una herramienta de representación visual de la información como CmapTools/Mindomo?",
        opciones: ["La evaluación del aprendizaje.", "En cualquier momento de la unidad didáctica.", "La exploración de conocimientos previos.", "La práctica de los aprendizaje."],
        respuesta: "En cualquier momento de la unidad didáctica."
    },
    {
        id: "28.1",
        codigoDescriptor: "E2c",
        enunciado: "Una docente de humanidades implementó un LMS en su asignatura. En términos del soporte/apoyo al aprendizaje. De las siguientes, ¿Cuál es la principal razón que justifica la decisión de ella?",
        opciones: ["El LMS le permite gestionar más ágilmente la recepción y envío de tareas.", "El LMS permite obtener y conservar distintos registros de desempeño.", "El LMS facilita el almacenamiento de los materiales del curso.", "El LMS facilita la distribución de material educativo."],
        respuesta: "El LMS permite obtener y conservar distintos registros de desempeño."
    },
    {
        id: "28.2",
        codigoDescriptor: "E2c",
        enunciado: "Una docente de ciencias sociales solicita a sus estudiantes que diseñen su proyecto e informe de investigación utilizando una wiki. En términos del soporte/apoyo al aprendizaje ¿Cuál es la principal razón que justifica la decisión de ella?:",
        opciones: ["Agilizar el proceso de envío y recepción de información.", "Fomentar el uso de las TIC en sus estudiantes.", "Monitorear el desempeño de los estudiantes.", "Aprovechar las ventajas de los documentos en línea."],
        respuesta: "Monitorear el desempeño de los estudiantes."
    },
    {
        id: "29.1",
        codigoDescriptor: "E3a",
        enunciado: "De las siguientes, ¿La mejor manera de medir el impacto de las TIC en el aprendizaje de los estudiantes es?",
        opciones: ["Explorar las opiniones de los pares (docentes) sobre el curso apoyado en TIC.", "Analizar los desempeños de los estudiantes en el curso apoyado en TIC.", "Explorar las opiniones de los estudiantes al finalizar un curso apoyado con TIC.", "Comparar los desempeños de los estudiantes en un escenario con y sin TIC."],
        respuesta: "Comparar los desempeños de los estudiantes en un escenario con y sin TIC."
    },
    {
        id: "29.2",
        codigoDescriptor: "E3a",
        enunciado: "Una docente de Lenguaje quiere explorar de qué manera cambia la competencia/habilidad de escritura después de implementar una co-evaluación apoyada en TIC, pues desea medir el impacto que estas generan en el proceso de aprendizaje. De lo siguiente, ¿Qué es lo más recomendable para ella?:",
        opciones: ["Explorar los desempeños de unos estudiantes al inicio y al final del curso.", "Realizar a todos los estudiantes un test de escritura al comienzo y al final del curso.", "Implementar rúbricas sobre escritura en todas las actividades del curso.", "Comparar la evaluación entre pares y la evaluación de la docente al final del curso."],
        respuesta: "Implementar rúbricas sobre escritura en todas las actividades del curso."
    },
    {
        id: "30.1",
        codigoDescriptor: "E3b",
        enunciado: "Una docente de sociales implementó una wiki para que sus estudiantes reportaran los resultados de una indagación sobre sistemas políticos contemporáneos. Al final del curso, la docente encontró que la wiki elaborada por sus estudiantes no demostraba el desarrollo de las capacidades planteadas como objetivo de aprendizaje. De las siguientes, ¿Cuál es la principal acción que debe implementar la docente?",
        opciones: ["Usar otra herramienta porque la wiki no es idónea para reportar indagaciones.", "Escribir más claramente las instrucciones para hacer la actividad.", "Explicar más claramente los sistemas políticos.", "Realizar más seguimiento del desempeño de los estudiantes."],
        respuesta: "Realizar más seguimiento del desempeño de los estudiantes."
    },
    {
        id: "30.2",
        codigoDescriptor: "E3b",
        enunciado: "Cuando un curso de historia fue implementado por primera vez en una institución educativa, este evidenció baja participación por parte de varios estudiantes. Pero, actualmente ha sido reconocido por su alta calidad y retención. De las siguientes, ¿Cuál es la principal razón que explica esta situación?",
        opciones: ["La utilización de materiales educativos atractivos.", "El diseño de actividades de aprendizaje desafiantes.", "La evaluación sistemática de la práctica educativa.", "La facilidad para realizar trabajo colaborativo en línea."],
        respuesta: "La evaluación sistemática de la práctica educativa."
    },
    {
        id: "31.1",
        codigoDescriptor: "E3c",
        enunciado: "Un docente que implementó un LMS tiene la impresión de que no se alcanzaron los objetivos de aprendizaje propuestos al finalizar el curso y quiere realizar cambios. De las siguientes, ¿Cuál es la principal decisión que debe tomar el docente?",
        opciones: ["Replantear las actividades y los materiales que no aportan al alcance de los objetivos de aprendizaje.", "Evaluar la práctica educativa periódicamente con formatos dirigidos a estudiante y pares.", "Evitar implementar un LMS en su curso hasta recibir asesoría experta para mejorar la práctica.", "Autoevaluarse haciendo un listado de las oportunidades de mejora de la práctica educativa."],
        respuesta: "Evaluar la práctica educativa periódicamente con formatos dirigidos a estudiante y pares."
    },
    {
        id: "31.2",
        codigoDescriptor: "E3c",
        enunciado: "En una evaluación del curso/asignatura/materia apoyado en TIC los estudiantes reportaron que los objetivos de aprendizaje no fueron alcanzados. De las siguientes, ¿Cuál es la principal acción que debe realizar la docente?",
        opciones: ["Rediseñar su práctica educativa apoyada en TIC.", "Prescindir del uso de las TIC en su práctica educativa.", "Replantear los materiales utilizados en el curso.", "Revisar la manera de evaluar el aprendizaje."],
        respuesta: "Rediseñar su práctica educativa apoyada en TIC."
    }
];

export default preguntas;