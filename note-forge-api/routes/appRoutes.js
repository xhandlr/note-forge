const express = require('express');
const authController = require('../controllers/authController');
const exerciseController = require('../controllers/exerciseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/create-exercise', exerciseController.create);

router.get('/home', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido a tu perfil', user: req.user });
});

module.exports = router;