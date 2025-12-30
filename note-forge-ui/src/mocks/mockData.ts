import { BookOpen, Coffee, Beaker } from 'lucide-react';

export const mockCategories = [
  {
    id: 1,
    name: 'Física Mecánica',
    description: 'Estudio detallado de la cinemática, dinámica y leyes de conservación en sistemas clásicos.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    is_pinned: true,
    created_at: '2023-10-01'
  },
  {
    id: 2,
    name: 'Cálculo II',
    description: 'Integrales, series, ecuaciones diferenciales y aplicaciones del cálculo avanzado.',
    imageUrl: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80&w=1200',
    is_pinned: false,
    created_at: '2023-10-05'
  },
  {
    id: 3,
    name: 'Química General',
    description: 'Fundamentos de química: estructura atómica, enlaces químicos, estequiometría y termodinámica.',
    imageUrl: 'https://images.unsplash.com/photo-1603126010305-2f560a3773f7?auto=format&fit=crop&q=80&w=1200',
    is_pinned: false,
    created_at: '2023-10-12'
  }
];

export const mockExercises = [
  {
    id: 1,
    title: 'Movimiento Parabólico: Reto del Cañón',
    description: 'Un proyectil se lanza desde un cañón situado a una altura h = 20m sobre el suelo con una velocidad inicial de 50 m/s y un ángulo de 45°. Determine la distancia horizontal máxima (alcance) considerando la resistencia del aire como despreciable y g = 9.81 m/s².',
    answer: 'Descomposición de la velocidad inicial en sus componentes vectoriales Vx y Vy.\nPlanteamiento de la ecuación cinemática para la altura en función del tiempo.\nDeterminación del tiempo total de vuelo igualando la ecuación a cero.\nCálculo del alcance horizontal máximo multiplicando Vx por el tiempo de vuelo.',
    difficulty: 4,
    duration: '45 min',
    categoryId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
    tags: ['Dinámica', 'Fricción', 'Plano Inclinado'],
    created_at: '2023-10-20'
  },
  {
    id: 2,
    title: 'Integración por Partes: El Desafío Logarítmico',
    description: 'Calcule la integral indefinida de x²ln(x) utilizando el método de integración por partes. Demuestre cada paso del proceso.',
    answer: 'Aplicar fórmula de integración por partes ∫udv = uv - ∫vdu.\nSeleccionar u = ln(x) y dv = x²dx.\nCalcular du = (1/x)dx y v = (x³/3).\nSustituir en la fórmula y simplificar.\nResultado: (x³/3)ln(x) - x³/9 + C',
    difficulty: 3,
    duration: '30 min',
    categoryId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    tags: ['Integrales', 'Logaritmos'],
    created_at: '2023-10-15'
  },
  {
    id: 3,
    title: 'Equilibrio Ácido-Base: Titulación de Vinagre',
    description: 'Determine la concentración molar de ácido acético en una muestra de vinagre mediante neutralización con NaOH 0.1M. Se requieren 25.5 mL de NaOH para neutralizar 10 mL de vinagre.',
    answer: 'Ecuación balanceada: CH₃COOH + NaOH → CH₃COONa + H₂O.\nCálculo de moles de NaOH: n = M × V = 0.1 × 0.0255 = 0.00255 mol.\nRelación estequiométrica 1:1, entonces moles de CH₃COOH = 0.00255 mol.\nConcentración de vinagre: M = n/V = 0.00255/0.01 = 0.255 M',
    difficulty: 2,
    duration: '25 min',
    categoryId: 3,
    imageUrl: 'https://images.unsplash.com/photo-1603126010305-2f560a3773f7?auto=format&fit=crop&q=80&w=800',
    tags: ['Ácidos', 'Bases', 'Titulación'],
    created_at: '2023-10-12'
  },
  {
    id: 4,
    title: 'Dinámica de Partículas: Plano Inclinado #1',
    description: 'Un bloque de 5 kg descansa sobre un plano inclinado de 30° con respecto a la horizontal. El coeficiente de fricción cinético es μk = 0.25. Determine la aceleración del bloque.',
    answer: 'Descomponer el peso en componentes paralela y perpendicular.\nCalcular la normal N = mg cos(30°) = 42.4 N.\nFuerza de fricción f = μk × N = 10.6 N.\nAceleración a = (mg sin(30°) - f) / m = 2.78 m/s²',
    difficulty: 3,
    duration: '35 min',
    categoryId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
    tags: ['Fuerzas', 'Fricción'],
    created_at: '2023-10-18'
  },
  {
    id: 5,
    title: 'Límites y Continuidad: Reto #2',
    description: 'Calcule el límite cuando x tiende a 0 de (sin(x)/x) usando la definición formal de límite.',
    answer: 'Usar teorema fundamental: lim(x→0) sin(x)/x = 1.\nDemostración geométrica con círculo unitario.\nComparación de áreas: sin(x) < x < tan(x).\nAplicar teorema del sándwich.\nConcluir que el límite es 1.',
    difficulty: 2,
    duration: '20 min',
    categoryId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    tags: ['Límites', 'Continuidad'],
    created_at: '2023-10-08'
  }
];

export const mockGuides = [
  {
    id: 1,
    title: 'Guía Definitiva de Termodinámica',
    description: 'Guía completa de termodinámica para examen final',
    author: 'Facultad de Ciencias',
    exerciseIds: [1, 4],
    created_at: '2023-10-15',
    status: 'En revisión'
  },
  {
    id: 2,
    title: 'Resumen Semanal: Cálculo Integral',
    description: 'Ejercicios de repaso para parcial de cálculo',
    author: 'Departamento de Matemáticas',
    exerciseIds: [2, 5],
    created_at: '2023-10-08',
    status: 'Publicada'
  },
  {
    id: 3,
    title: 'Práctica: Química Analítica',
    description: 'Problemas de titulación y equilibrio químico',
    author: 'Laboratorio de Química',
    exerciseIds: [3],
    created_at: '2023-10-12',
    status: 'Borrador'
  }
];

export const mockUser = {
  id: 1,
  email: 'demo@noteforge.com',
  name: 'Usuario Demo',
  created_at: '2023-10-01'
};
