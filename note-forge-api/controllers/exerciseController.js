const exerciseService = require('../services/exerciseService');

async function create(req, res) {
    try {
        const { title, description, difficult, collection, reference, answer, duration, tags, details } = req.body;
        const result = await exerciseService.createExercise(title, description, difficult, collection, reference, answer, duration, tags, details);
        res.status(201).json(result); // Devuelve el mensaje y el ID del ejercicio
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { create };
