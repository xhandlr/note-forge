const guideService = require('../services/guideService');

async function createGuideRequest(req, res) {
    try {
        const userId = req.user.id; // Obtener el id del usuario desde el token
        const { title, author, description, exerciseIds } = req.body;

        const result = await guideService.createGuide(title, author, description, userId, exerciseIds);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function getGuideByIdRequest(req, res) {
    try {
        const guideId = req.params.id;
        const guide = await guideService.getGuideById(guideId);

        if (!guide) {
            return res.status(404).json({ message: 'Guía no encontrada' });
        }

        res.status(200).json(guide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getGuidesRequest(req, res) {
    try {
        const userId = req.user.id; // Filtrar por usuario autenticado
        const guides = await guideService.getGuides(userId);
        res.status(200).json(guides);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateGuideRequest(req, res) {
    try {
        const guideId = req.params.id;
        const { title, author, description, exerciseIds } = req.body;

        const updatedGuide = await guideService.updateGuide(guideId, title, author, description, exerciseIds);

        res.status(200).json(updatedGuide);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteGuideRequest(req, res) {
    try {
        const guideId = req.params.id;

        const result = await guideService.deleteGuide(guideId);

        if (result) {
            res.status(200).json({ message: 'Guía eliminada con éxito' });
        } else {
            res.status(404).json({ message: 'Guía no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createGuideRequest,
    getGuideByIdRequest,
    getGuidesRequest,
    updateGuideRequest,
    deleteGuideRequest
};
