export const mockCategories = [
  {
    id: 1,
    name: 'Programación y Algoritmos',
    description: 'Estructuras de datos, complejidad algorítmica y lógica de programación aplicada.',
    image_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
    is_pinned: true,
    exercise_count: 3,
    guide_count: 1,
    created_at: '2024-01-10'
  },
  {
    id: 2,
    name: 'Medicina y Fisiología',
    description: 'Anatomía, fisiología de sistemas y casos clínicos para estudiantes de ciencias de la salud.',
    image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
    is_pinned: true,
    exercise_count: 3,
    guide_count: 1,
    created_at: '2024-01-12'
  },
  {
    id: 3,
    name: 'Química General y Orgánica',
    description: 'Estequiometría, geometría molecular, reacciones orgánicas y cálculos de concentración.',
    image_url: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&q=80',
    is_pinned: false,
    exercise_count: 3,
    guide_count: 1,
    created_at: '2024-01-15'
  },
  {
    id: 4,
    name: 'Literatura y Arte',
    description: 'Análisis literario, figuras retóricas, historia del arte y narratología.',
    image_url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    is_pinned: false,
    exercise_count: 3,
    guide_count: 1,
    created_at: '2024-01-18'
  }
];

export const mockExercises = [
  // --- Programación y Algoritmos ---
  {
    id: 1,
    title: 'Complejidad Temporal: Lista Enlazada vs Arreglo',
    description: '¿Cuál es la diferencia de complejidad temporal entre buscar un elemento en una Lista Enlazada frente a un Arreglo (Array)?',
    answer: 'En un Arreglo la búsqueda por índice es \\(O(1)\\) (acceso directo a memoria). En una Lista Enlazada es \\(O(n)\\) porque se debe recorrer nodo por nodo desde el inicio hasta encontrar el elemento.',
    difficulty: 2,
    duration: '15',
    category_id: 1,
    image_url: 'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fe65b6pku9i7tstechfnz.jpeg',
    tags: JSON.stringify(['Complejidad', 'Estructuras de Datos']),
    created_at: '2024-01-20'
  },
  {
    id: 2,
    title: 'Función para Revertir una Cadena en Python',
    description: 'Escribe una función en Python que revierta una cadena de texto sin usar métodos integrados como \\texttt{.reverse()} o \\texttt{reversed()}.',
    answer: 'Solución con slicing (más pythonico):\n\ndef reverse(s):\n    return s[::-1]\n\nSolución con bucle (explícita):\n\ndef reverse(s):\n    result = ""\n    for char in s:\n        result = char + result\n    return result',
    difficulty: 2,
    duration: '20',
    category_id: 1,
    tags: JSON.stringify(['Python', 'Strings', 'Bucles']),
    created_at: '2024-01-22'
  },
  {
    id: 3,
    title: 'Recorrido In-order en un BST',
    description: 'Dado un Árbol Binario de Búsqueda (BST), ¿cuál es el resultado de realizar un recorrido In-order (izquierda → raíz → derecha)?',
    answer: 'El recorrido In-order de un BST produce los elementos ordenados de menor a mayor. Esto se debe a la propiedad del BST: todos los nodos del subárbol izquierdo son menores que la raíz, y todos los del subárbol derecho son mayores.',
    difficulty: 3,
    duration: '25',
    category_id: 1,
    image_url: null,
    tags: JSON.stringify(['Árboles', 'BST', 'Recorridos']),
    created_at: '2024-01-23'
  },

  // --- Medicina y Fisiología ---
  {
    id: 4,
    title: 'Sistema de Conducción Eléctrica del Corazón',
    description: 'Describe en orden el sistema de conducción eléctrica del corazón, explicando la función de cada estructura.',
    answer: 'El orden de conducción es:\n\nNodo Sinoauricular (SA) \\(\\rightarrow\\) Nodo Auriculoventricular (AV) \\(\\rightarrow\\) Haz de His \\(\\rightarrow\\) Ramas del Haz \\(\\rightarrow\\) Fibras de Purkinje.\n\nEl nodo SA actúa como marcapasos natural (60-100 lpm). El nodo AV introduce un retraso que permite el llenado ventricular antes de la contracción.',
    difficulty: 3,
    duration: '20',
    category_id: 2,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Gray501.png',
    tags: JSON.stringify(['Cardiología', 'Fisiología', 'Electrocardiografía']),
    created_at: '2024-01-25'
  },
  {
    id: 5,
    title: 'Caso Clínico: Trastorno Ácido-Base',
    description: 'Un paciente presenta los siguientes valores en gasometría arterial: \\(pH = 7.25\\), \\(pCO_2 = 60 \\text{ mmHg}\\) (elevado) y \\(HCO_3^- = 24 \\text{ mEq/L}\\) (normal). ¿Qué tipo de trastorno ácido-base está sufriendo? ¿Cuál es la causa probable?',
    answer: 'Diagnóstico: \\textbf{Acidosis Respiratoria}.\n\nCriterios diagnósticos:\n- pH < 7.35 \\(\\rightarrow\\) acidosis\n- \\(pCO_2\\) elevado \\(\\rightarrow\\) causa respiratoria (retención de \\(CO_2\\))\n- \\(HCO_3^-\\) normal \\(\\rightarrow\\) no hay compensación metabólica aún (cuadro agudo)\n\nCausas probables: hipoventilación por EPOC, sobredosis de depresores del SNC o apnea del sueño severa.',
    difficulty: 4,
    duration: '30',
    category_id: 2,
    image_url: null,
    tags: JSON.stringify(['Gasometría', 'Ácido-Base', 'Caso Clínico']),
    created_at: '2024-01-26'
  },
  {
    id: 6,
    title: 'Anatomía: Articulación de la Rodilla',
    description: 'Menciona los huesos que conforman la articulación de la rodilla e identifica qué tipo de articulación es según su morfología.',
    answer: 'La articulación de la rodilla está conformada por tres huesos:\n\n1. \\textbf{Fémur} (cóndilo femoral)\n2. \\textbf{Tibia} (platillo tibial)\n3. \\textbf{Rótula} (patela)\n\nEs una articulación sinovial de tipo \\textbf{bisagra} (gínglimo), que permite principalmente flexión y extensión.',
    difficulty: 1,
    duration: '10',
    category_id: 2,
    image_url: null,
    tags: JSON.stringify(['Anatomía', 'Osteología', 'Articulaciones']),
    created_at: '2024-01-27'
  },

  // --- Química General y Orgánica ---
  {
    id: 7,
    title: 'Cálculo de Molaridad: Solución de NaOH',
    description: 'Calcula la molaridad de una solución que contiene \\(20 \\text{ g}\\) de \\(NaOH\\) disueltos en \\(250 \\text{ mL}\\) de agua. Dato: masa molar del \\(NaOH \\approx 40 \\text{ g/mol}\\).',
    answer: '\\textbf{Paso 1:} Calcular moles de NaOH:\n\\[n = \\frac{20 \\text{ g}}{40 \\text{ g/mol}} = 0.5 \\text{ mol}\\]\n\n\\textbf{Paso 2:} Convertir volumen a litros:\n\\[V = 250 \\text{ mL} = 0.25 \\text{ L}\\]\n\n\\textbf{Paso 3:} Calcular molaridad:\n\\[M = \\frac{n}{V} = \\frac{0.5 \\text{ mol}}{0.25 \\text{ L}} = 2.0 \\text{ M}\\]',
    difficulty: 2,
    duration: '20',
    category_id: 3,
    image_url: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&q=80',
    tags: JSON.stringify(['Estequiometría', 'Molaridad', 'Soluciones']),
    created_at: '2024-01-28'
  },
  {
    id: 8,
    title: 'Geometría Molecular del Metano',
    description: 'Describe la geometría molecular del metano (\\(CH_4\\)) según la teoría RPECV. Indica el ángulo de enlace.',
    answer: 'El metano (\\(CH_4\\)) presenta geometría \\textbf{tetraédrica}.\n\nSegún la RPECV, los 4 pares enlazantes se ubican lo más alejados posible entre sí, formando un tetraedro regular con ángulos de enlace de \\(109.5^\\circ\\).\n\nEl carbono central forma 4 enlaces simples C–H sin pares solitarios, por lo que la geometría electrónica y molecular son idénticas.',
    difficulty: 2,
    duration: '15',
    category_id: 3,
    image_url: null,
    tags: JSON.stringify(['Geometría Molecular', 'RPECV', 'Enlace Químico']),
    created_at: '2024-01-29'
  },
  {
    id: 9,
    title: 'Regla de Markovnikov en Alquenos',
    description: '¿Cuál es el producto principal de la hidratación de propeno (\\(CH_3{-}CH{=}CH_2\\)) siguiendo la Regla de Markovnikov?',
    answer: 'El producto principal es el \\textbf{2-propanol} (alcohol más sustituido).\n\n\\textbf{Regla de Markovnikov:} En la adición de \\(H_2O\\) a un alqueno, el \\(H\\) se agrega al carbono con más hidrógenos (menos sustituido), y el grupo \\(OH\\) al carbono con menos hidrógenos (más sustituido).\n\nEsto se explica por la mayor estabilidad del carbocatión secundario intermediario frente al primario.',
    difficulty: 3,
    duration: '20',
    category_id: 3,
    image_url: null,
    tags: JSON.stringify(['Química Orgánica', 'Alquenos', 'Adición']),
    created_at: '2024-01-30'
  },

  // --- Literatura y Arte ---
  {
    id: 10,
    title: 'Identificación de Figura Retórica',
    description: 'Identifica y explica la figura retórica presente en el siguiente verso: \\textit{"El oro de tus cabellos"}.',
    answer: 'La figura retórica es la \\textbf{metáfora}.\n\nSe establece una comparación directa (sin nexo comparativo) entre el color rubio de los cabellos y el metal precioso oro. La metáfora sustituye el término real por el imaginario.\n\nSi dijera "tus cabellos son \\textit{como} el oro", sería un \\textbf{símil} (usa nexo comparativo).',
    difficulty: 2,
    duration: '15',
    category_id: 4,
    image_url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
    tags: JSON.stringify(['Retórica', 'Figuras Literarias', 'Poesía']),
    created_at: '2024-02-01'
  },
  {
    id: 11,
    title: 'Características del Movimiento Impresionista',
    description: '¿Cuáles son las tres características principales que definen al Impresionismo en pintura? Menciona al menos un representante.',
    answer: 'Las tres características principales son:\n\n1. \\textbf{Captación de la luz natural:} pintaban al aire libre (\\textit{en plein air}) para captar efectos cambiantes de la luz.\n\n2. \\textbf{Pinceladas cortas y visibles:} se abandonó el acabado liso académico en favor de trazos sueltos.\n\n3. \\textbf{Temas de la vida cotidiana:} cafés, bailarinas, paisajes fugaces en lugar de escenas históricas.\n\n\\textbf{Representantes:} Claude Monet, Pierre-Auguste Renoir, Edgar Degas.',
    difficulty: 2,
    duration: '20',
    category_id: 4,
    image_url: null,
    tags: JSON.stringify(['Historia del Arte', 'Impresionismo', 'Pintura']),
    created_at: '2024-02-02'
  },
  {
    id: 12,
    title: 'Narrador Omnisciente vs Narrador Testigo',
    description: '¿Qué diferencia a un \\textbf{narrador omnisciente} de un \\textbf{narrador testigo}? Da un ejemplo de cada uno.',
    answer: '\\textbf{Narrador omnisciente:} conoce los pensamientos, emociones y motivaciones de todos los personajes.\n\\textit{Ejemplo: "Anna sabía, aunque no lo dijera, que todo estaba a punto de derrumbarse."}\n\n\\textbf{Narrador testigo:} solo relata lo que observa desde afuera, sin acceso a la vida interior de los personajes.\n\\textit{Ejemplo: "Vi a Anna salir corriendo, pero nunca supe por qué."}\n\n\\textbf{Clave:} la diferencia es el acceso a la interioridad psicológica.',
    difficulty: 3,
    duration: '20',
    category_id: 4,
    image_url: null,
    tags: JSON.stringify(['Narratología', 'Tipos de Narrador', 'Análisis Literario']),
    created_at: '2024-02-03'
  }
];

export const mockGuides = [
  {
    id: 1,
    title: 'Guía de Estructuras de Datos y Algoritmos',
    description: 'Complejidad algorítmica, estructuras lineales y árboles para entrevistas técnicas.',
    author: 'Depto. de Ciencias de la Computación',
    exerciseIds: [1, 2, 3],
    created_at: '2024-02-05',
    status: 'Publicada'
  },
  {
    id: 2,
    title: 'Fisiología Cardiovascular y Casos Clínicos',
    description: 'Sistema de conducción cardíaca, trastornos ácido-base y anatomía articular.',
    author: 'Facultad de Medicina',
    exerciseIds: [4, 5, 6],
    created_at: '2024-02-06',
    status: 'Publicada'
  },
  {
    id: 3,
    title: 'Cálculos Químicos y Química Orgánica',
    description: 'Molaridad, geometría molecular y mecanismos de reacción orgánica.',
    author: 'Laboratorio de Química',
    exerciseIds: [7, 8, 9],
    created_at: '2024-02-07',
    status: 'En revisión'
  },
  {
    id: 4,
    title: 'Análisis Literario y Movimientos Artísticos',
    description: 'Figuras retóricas, historia del arte y narratología para humanidades.',
    author: 'Depto. de Letras y Artes',
    exerciseIds: [10, 11, 12],
    created_at: '2024-02-08',
    status: 'Publicada'
  }
];

export const mockUser = {
  id: 1,
  email: 'demo@noteforge.com',
  name: 'Usuario Demo',
  created_at: '2024-01-01'
};
