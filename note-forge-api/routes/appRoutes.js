const express = require('express');
const authController = require('../controllers/authController');
const exerciseController = require('../controllers/exerciseController');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configurar Multer para guardar imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

const router = express.Router();

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Ruta para ejercicios
router.post('/create-exercise', authMiddleware, upload.single('image'), exerciseController.createExerciseRequest);
router.get('/exercise/:id', authMiddleware, exerciseController.getExerciseByIdRequest);
router.get('/exercises', authMiddleware, exerciseController.getExercisesRequest);
router.put('/update-exercise/:id', authMiddleware, exerciseController.updateExerciseRequest);
router.delete('/delete-exercise/:id', authMiddleware, exerciseController.deleteExerciseRequest);

// Rutas para categorías
router.post('/create-category', authMiddleware, upload.single('image'), categoryController.createCategoryRequest);
router.get('/category/:id', authMiddleware, categoryController.getCategoryByIdRequest);
router.get('/categories', authMiddleware, categoryController.getCategoriesRequest);
router.put('/update-category/:id', authMiddleware, upload.single('image'), categoryController.updateCategoryRequest);
router.delete('/delete-category/:id', authMiddleware, categoryController.deleteCategoryRequest);

module.exports = router;
