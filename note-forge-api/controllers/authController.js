const authService = require('../services/authService');

async function register(req, res) {
    try {
        const { username, email, password, country, role } = req.body;
        const result = await authService.registerUser(username, email, password, country, role);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function login(req, res) { // req es el objeto que contiene la información de la solicitud
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message }); // res es el objeto que se utiliza para enviar la respuesta al cliente
    }
}

module.exports = { register, login };