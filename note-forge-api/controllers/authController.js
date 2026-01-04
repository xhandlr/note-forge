const jwt = require("jsonwebtoken");
const authService = require('../services/authService');

async function register(req, res) {
    try {
        const { username, email, password, country, role } = req.body;
        const result = await authService.registerUser(username, email, password, country, role);
        res.status(201).json(result);
    } catch (error) {
        if (error.message === 'Todos los campos son obligatorios') {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'El correo ya está registrado') {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password, keepLoggedIn } = req.body;

    try {
        const user = await authService.loginUser(email, password);

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: keepLoggedIn ? '30d' : '1h'
        });

        return res.status(200).json({
            message: 'Login exitoso',
            token: token, 
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        if (
            error.message === 'Correo electrónico no encontrado' ||
            error.message === 'Contraseña incorrecta'
        ) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        res.status(400).json({ message: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie("token"); // Elimina la cookie del JWT
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
};

const checkAuth = async (req, res) => {
    try {
        // El middleware authMiddleware ya verificó el token y agregó req.user
        const user = await authService.getUserById(req.user.userId);

        return res.status(200).json({
            authenticated: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(401).json({
            authenticated: false,
            message: 'Usuario no autenticado'
        });
    }
};

module.exports = { register, login, logout, checkAuth };
