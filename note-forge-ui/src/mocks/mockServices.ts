import { mockCategories, mockExercises, mockGuides, mockUser } from './mockData';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Category Services
export const mockCategoryService = {
  async getAll() {
    await delay();
    return mockCategories;
  },

  async getById(id: string | number) {
    await delay();
    const category = mockCategories.find(c => c.id === Number(id));
    if (!category) {
      throw new Error('Categoría no encontrada');
    }
    return category;
  },

  async create(data: any) {
    await delay();
    const newCategory = {
      id: Math.max(...mockCategories.map(c => c.id)) + 1,
      ...data,
      created_at: new Date().toISOString().split('T')[0]
    };
    mockCategories.push(newCategory);
    return newCategory;
  },

  async update(id: string | number, data: any) {
    await delay();
    const index = mockCategories.findIndex(c => c.id === Number(id));
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }
    mockCategories[index] = { ...mockCategories[index], ...data };
    return mockCategories[index];
  },

  async delete(id: string | number) {
    await delay();
    const index = mockCategories.findIndex(c => c.id === Number(id));
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }
    mockCategories.splice(index, 1);
    return { success: true };
  }
};

// Exercise Services
export const mockExerciseService = {
  async getAll() {
    await delay();
    return mockExercises;
  },

  async getById(id: string | number) {
    await delay();
    const exercise = mockExercises.find(e => e.id === Number(id));
    if (!exercise) {
      throw new Error('Ejercicio no encontrado');
    }
    return exercise;
  },

  async getByCategoryId(categoryId: string | number) {
    await delay();
    return mockExercises.filter(e => e.categoryId === Number(categoryId));
  },

  async create(data: any) {
    await delay();
    const newExercise = {
      id: Math.max(...mockExercises.map(e => e.id)) + 1,
      ...data,
      created_at: new Date().toISOString().split('T')[0]
    };
    mockExercises.push(newExercise);
    return newExercise;
  },

  async update(id: string | number, data: any) {
    await delay();
    const index = mockExercises.findIndex(e => e.id === Number(id));
    if (index === -1) {
      throw new Error('Ejercicio no encontrado');
    }
    mockExercises[index] = { ...mockExercises[index], ...data };
    return mockExercises[index];
  },

  async delete(id: string | number) {
    await delay();
    const index = mockExercises.findIndex(e => e.id === Number(id));
    if (index === -1) {
      throw new Error('Ejercicio no encontrado');
    }
    mockExercises.splice(index, 1);
    return { success: true };
  }
};

// Guide Services
export const mockGuideService = {
  async getAll() {
    await delay();
    return mockGuides;
  },

  async getById(id: string | number) {
    await delay();
    const guide = mockGuides.find(g => g.id === Number(id));
    if (!guide) {
      throw new Error('Guía no encontrada');
    }
    return guide;
  },

  async create(data: any) {
    await delay();
    const newGuide = {
      id: Math.max(...mockGuides.map(g => g.id)) + 1,
      ...data,
      created_at: new Date().toISOString().split('T')[0]
    };
    mockGuides.push(newGuide);
    return newGuide;
  },

  async update(id: string | number, data: any) {
    await delay();
    const index = mockGuides.findIndex(g => g.id === Number(id));
    if (index === -1) {
      throw new Error('Guía no encontrada');
    }
    mockGuides[index] = { ...mockGuides[index], ...data };
    return mockGuides[index];
  },

  async delete(id: string | number) {
    await delay();
    const index = mockGuides.findIndex(g => g.id === Number(id));
    if (index === -1) {
      throw new Error('Guía no encontrada');
    }
    mockGuides.splice(index, 1);
    return { success: true };
  }
};

// Auth Services
export const mockAuthService = {
  async login(email: string, password: string) {
    await delay();
    // Demo mode always succeeds
    if (email && password) {
      return {
        user: mockUser,
        token: 'demo-token-12345'
      };
    }
    throw new Error('Credenciales inválidas');
  },

  async register(data: any) {
    await delay();
    return {
      user: { ...mockUser, ...data },
      token: 'demo-token-12345'
    };
  },

  async logout() {
    await delay();
    return { success: true };
  },

  async getCurrentUser() {
    await delay();
    return mockUser;
  }
};

// Search Service
export const mockSearchService = {
  async search(query: string) {
    await delay();
    const lowerQuery = query.toLowerCase();

    const categoryResults = mockCategories
      .filter(c => c.name.toLowerCase().includes(lowerQuery) || c.description.toLowerCase().includes(lowerQuery))
      .map(c => ({ ...c, type: 'Asignatura' }));

    const exerciseResults = mockExercises
      .filter(e => e.title.toLowerCase().includes(lowerQuery) || e.description.toLowerCase().includes(lowerQuery))
      .map(e => ({ ...e, type: 'Ejercicio' }));

    const guideResults = mockGuides
      .filter(g => g.title.toLowerCase().includes(lowerQuery) || g.description.toLowerCase().includes(lowerQuery))
      .map(g => ({ ...g, type: 'Guía' }));

    return [...categoryResults, ...exerciseResults, ...guideResults];
  }
};
