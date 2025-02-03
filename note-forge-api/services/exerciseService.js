const Exercise = require('../models/exerciseModel')

const createExercise = async (title, description, difficult, collection, reference, answer, duration, tags, details) => {
    const exerciseId = await Exercise.create(title, description, difficult, collection, reference, answer, duration, tags, details);
    return { message: 'Ejercicio registrado con éxito', exerciseId };
}

module.exports = { createExercise };