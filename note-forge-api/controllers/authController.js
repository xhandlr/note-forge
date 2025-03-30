const jwt = require("jsonwebtoken");
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

const login = async (req, res) => {
    const { email, password, keepLoggedIn } = req.body;

    try {
        const user = await authService.loginUser(email, password); // Validación en el servicio

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: keepLoggedIn ? '30d' : '1h'
        });

        return res.json({
            message: 'Login exitoso',
            token: token, 
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const logout = (req, res) => {
    res.clearCookie("token"); // Elimina la cookie del JWT
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
};

module.exports = { register, login, logout};
