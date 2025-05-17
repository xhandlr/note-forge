const ExerciseCategory = require('../models/exerciseCategoryModel');

const addExerciseCategory = async (exerciseId, categoryId) => {
    const exerciseCategoryId = await ExerciseCategory.create(exerciseId, categoryId);
    return { message: 'Categoría de ejercicio registrada con éxito', exerciseCategoryId };
};

module.exports = { addExerciseCategory };