const ExerciseCategory = require('../models/exerciseCategoryModel');

const addExerciseCategory = async (exerciseData) => {
    const exerciseCategoryId = await ExerciseCategory.create(exerciseData.id, exerciseData.categoryId);
    return { message: 'Categoría de ejercicio registrada con éxito', exerciseCategoryId };
};

module.exports = { addExerciseCategory };