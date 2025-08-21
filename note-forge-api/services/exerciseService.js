const Exercise = require('../models/exerciseModel');

const createExercise = async (title, description, difficulty, reference, answer, duration, tags, details, userId, ImageUrl) => {
    const exerciseId = await Exercise.create(title, description, difficulty, reference, answer, duration, tags, details, userId, ImageUrl);
    return { message: 'Ejercicio creado con éxito', exerciseId };
};

const getExerciseById = async (exerciseId) => {
    return await Exercise.findById(exerciseId);
};

const getExercises = async () => {
    return await Exercise.findAll(); 
};

const updateExercise = async (exerciseId, title, description, difficulty, collection, reference, answer, duration, tags, details) => {
    return await Exercise.update(exerciseId, title, description, difficulty, collection, reference, answer, duration, tags, details);
};

const deleteExercise = async (exerciseId) => {
    return await Exercise.delete(exerciseId);
};

module.exports = { createExercise, getExerciseById, getExercises, updateExercise, deleteExercise };
