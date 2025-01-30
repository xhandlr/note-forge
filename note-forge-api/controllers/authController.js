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

module.exports = { register };
