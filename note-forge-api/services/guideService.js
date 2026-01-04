const Guide = require('../models/guideModel');
const pool = require('../config/db');

const createGuide = async (title, author, description, userId, exerciseIds) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Crear la guía
        const guideId = await Guide.create(title, author, description, userId);

        // Agregar ejercicios si existen
        if (exerciseIds && exerciseIds.length > 0) {
            await Guide.addExercises(guideId, exerciseIds);
        }

        await connection.commit();

        return { message: 'Guía creada con éxito', guideId };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const getGuideById = async (guideId) => {
    return await Guide.findById(guideId);
};

const getGuides = async (userId) => {
    return await Guide.findByUserId(userId);
};

const updateGuide = async (guideId, title, author, description, exerciseIds) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Actualizar la guía
        const updated = await Guide.update(guideId, title, author, description);

        if (!updated) {
            throw new Error('Guía no encontrada');
        }

        // Actualizar ejercicios: eliminar todos y agregar los nuevos
        await Guide.removeAllExercises(guideId);

        if (exerciseIds && exerciseIds.length > 0) {
            await Guide.addExercises(guideId, exerciseIds);
        }

        await connection.commit();

        return { message: 'Guía actualizada con éxito', guideId };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const deleteGuide = async (guideId) => {
    // ON DELETE CASCADE se encarga de eliminar las relaciones en guide_exercises
    return await Guide.delete(guideId);
};

module.exports = { createGuide, getGuideById, getGuides, updateGuide, deleteGuide };
