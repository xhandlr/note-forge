const ExerciseCategory = require('../models/exerciseCategoryModel');

const addExerciseCategory = async (exerciseId, categoryId) => {
    const exerciseCategoryId = await ExerciseCategory.create(exerciseId, categoryId);
    return { message: 'Categoría de ejercicio registrada con éxito', exerciseCategoryId };
};

const getExercisesByCategory = async (categoryId) => {
    const exercises = await ExerciseCategory.findByCategory(categoryId);
    return exercises;
};

module.exports = { addExerciseCategory, getExercisesByCategory };