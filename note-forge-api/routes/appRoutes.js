const express = require('express');
const authController = require('../controllers/authController');
const exerciseController = require('../controllers/exerciseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta para crear un ejercicio (sin id, se obtiene del token del usuario)
router.post('/create-exercise', authMiddleware, exerciseController.createExerciseRequest);

// Rutas para obtener, actualizar y eliminar ejercicios (requieren un id)
router.get('/exercise/:id', authMiddleware, exerciseController.getExerciseByIdRequest);
router.get('/exercises', authMiddleware, exerciseController.getExercisesRequest);
router.put('/update-exercise/:id', authMiddleware, exerciseController.updateExerciseRequest);
router.delete('/delete-exercise/:id', authMiddleware, exerciseController.deleteExerciseRequest);

module.exports = router;
