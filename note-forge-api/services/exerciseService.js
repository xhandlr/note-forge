const Exercise = require('../models/exerciseModel');

const createExercise = async (exerciseData) => {
    const exerciseId = await Exercise.create(exerciseData);
    return { message: 'Ejercicio creado con éxito', exerciseId };
};

const getExerciseById = async (exerciseId) => {
    return await Exercise.findById(exerciseId);
};

const getExercises = async () => {
    return await Exercise.findAll(); 
};

const updateExercise = async (exerciseData) => {
    // Pending validations
    return await Exercise.update(exerciseData);
};

const deleteExercise = async (exerciseId) => {
    return await Exercise.delete(exerciseId);
};

module.exports = { createExercise, getExerciseById, getExercises, updateExercise, deleteExercise };
