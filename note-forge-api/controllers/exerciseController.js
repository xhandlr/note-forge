const exerciseService = require('../services/exerciseService');
const exerciseCategoryService = require('../services/exerciseCategoryService');

async function createExerciseRequest(req, res) {
    try {
        const userId = req.user.id; // Obtener el id del usuario desde el token
        const { title, description, difficulty, collection, reference, answer, duration, tags, details, categoryId } = req.body;
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

        // Primero, crea el ejercicio
        let result = await exerciseService.createExercise(
            title, description, difficulty, collection, reference, 
            answer, duration, tags, details, imageUrl, userId
        );

        const exerciseId = result.exerciseId; // El ID del ejercicio recién creado

        // Si se proporcionó categoryId, asocia el ejercicio con la categoría
        if (categoryId) {
            await exerciseCategoryService.addExerciseCategory(exerciseId, categoryId);
        }

        res.status(201).json(result); // Retorna el mensaje de éxito con el ID del ejercicio
    } catch (error) {
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
        const { title, description, difficulty, collection, reference, answer, duration, tags, details } = req.body;
        
        const updatedExercise = await exerciseService.updateExercise(exerciseId, title, description, difficulty, collection, reference, answer, duration, tags, details);
        
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