import { useDemoMode } from '../contexts/DemoContext';
import {
  mockCategoryService,
  mockExerciseService,
  mockGuideService,
  mockAuthService,
  mockSearchService
} from '../mocks/mockServices';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategories
} from './CategoryService';
import {
  addExercise,
  updateExercise,
  deleteExercise,
  getExerciseById,
  getExercises,
  getExercisesByCategory
} from './ExerciseService';

// Category Service Factory
export const useCategoryService = () => {
  const { isDemoMode } = useDemoMode();

  if (isDemoMode) {
    return {
      getAll: mockCategoryService.getAll,
      getById: mockCategoryService.getById,
      create: mockCategoryService.create,
      update: mockCategoryService.update,
      delete: mockCategoryService.delete
    };
  }

  return {
    getAll: getCategories,
    getById: getCategoryById,
    create: addCategory,
    update: updateCategory,
    delete: deleteCategory
  };
};

// Exercise Service Factory
export const useExerciseService = () => {
  const { isDemoMode } = useDemoMode();

  if (isDemoMode) {
    return {
      getAll: mockExerciseService.getAll,
      getById: mockExerciseService.getById,
      getByCategoryId: mockExerciseService.getByCategoryId,
      create: mockExerciseService.create,
      update: mockExerciseService.update,
      delete: mockExerciseService.delete
    };
  }

  return {
    getAll: getExercises,
    getById: getExerciseById,
    getByCategoryId: getExercisesByCategory,
    create: addExercise,
    update: updateExercise,
    delete: deleteExercise
  };
};

// Guide Service Factory
export const useGuideService = () => {
  const { isDemoMode } = useDemoMode();

  if (isDemoMode) {
    return {
      getAll: mockGuideService.getAll,
      getById: mockGuideService.getById,
      create: mockGuideService.create,
      update: mockGuideService.update,
      delete: mockGuideService.delete
    };
  }

  // TODO: Implement real guide services when backend is ready
  return {
    getAll: async () => {
      throw new Error('Guide API not implemented yet');
    },
    getById: async () => {
      throw new Error('Guide API not implemented yet');
    },
    create: async () => {
      throw new Error('Guide API not implemented yet');
    },
    update: async () => {
      throw new Error('Guide API not implemented yet');
    },
    delete: async () => {
      throw new Error('Guide API not implemented yet');
    }
  };
};

// Auth Service Factory
export const useAuthService = () => {
  const { isDemoMode } = useDemoMode();

  if (isDemoMode) {
    return {
      login: mockAuthService.login,
      register: mockAuthService.register,
      logout: mockAuthService.logout,
      getCurrentUser: mockAuthService.getCurrentUser
    };
  }

  // TODO: Implement real auth services when backend is ready
  return {
    login: async () => {
      throw new Error('Auth API not implemented yet');
    },
    register: async () => {
      throw new Error('Auth API not implemented yet');
    },
    logout: async () => {
      throw new Error('Auth API not implemented yet');
    },
    getCurrentUser: async () => {
      throw new Error('Auth API not implemented yet');
    }
  };
};

// Search Service Factory
export const useSearchService = () => {
  const { isDemoMode } = useDemoMode();

  if (isDemoMode) {
    return {
      search: mockSearchService.search
    };
  }

  // TODO: Implement real search service when backend is ready
  return {
    search: async () => {
      throw new Error('Search API not implemented yet');
    }
  };
};
