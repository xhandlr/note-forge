const exerciseService = require('../services/exerciseService');
const exerciseCategoryService = require('../services/exerciseCategoryService');

async function createExerciseRequest(req, res) {
    try {
        // Get ID from the token
        const userId = req.user.id;

        // Get object from request body
        const exerciseData = req.body;

        // Create a new exercise
        exerciseData.userId = userId;
        let result = await exerciseService.createExercise(exerciseData);
        const exerciseId = result.exerciseId;

        if (exerciseData.categoryId) {
            await exerciseCategoryService.addExerciseCategory(exerciseId, exerciseData.categoryId);
        }

        res.status(201).json(result);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
}


async function getExerciseByIdRequest(req, res) {
    try {
        const exerciseId = req.params.id;  // Obtener el id del ejercicio desde los parámetros de la ruta
        const exercise = await exerciseService.getExerciseById(exerciseId);
        
        if (!exercise) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }
        
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getExercisesRequest(req, res) {
    try {
        const exercises = await exerciseService.getExercises();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateExerciseRequest(req, res) {
    try {
        const exerciseId = req.params.id;  // Obtener el id del ejercicio desde los parámetros de la ruta
        const exerciseData = req.body;

        const updatedExercise = await exerciseService.updateExercise({ ...exerciseData, exerciseId });

        res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteExerciseRequest(req, res) {
    try {
        const exerciseId = req.params.id;  // Obtener el id del ejercicio desde los parámetros de la ruta
        
        const result = await exerciseService.deleteExercise(exerciseId);
        
        if (result) {
            res.status(200).json({ message: 'Ejercicio eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Ejercicio no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createExerciseRequest, getExerciseByIdRequest, getExercisesRequest, updateExerciseRequest, deleteExerciseRequest };