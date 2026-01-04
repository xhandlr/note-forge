const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const registerUser = async (username, email, password, country, role) => {
    if (!username || !email || !password || !country || !role) {
        throw new Error('Todos los campos son obligatorios');    
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw new Error('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create(username, email, hashedPassword, country, role);
    return { message: 'Usuario registrado con éxito', userId };
}

const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error('Todos los campos son obligatorios');
    } 

    const user = await User.findByEmail(email);

    if (!user) {
        throw new Error('Correo electrónico no encontrado');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Contraseña incorrecta');
    }

    // Crear el token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '12h' }
    );

    return { token }
}

const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // No retornar la contraseña
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = { registerUser, loginUser, getUserById };
