const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const registerUser = async (username, email, password, country, role) => {
    console.log("here registerUser")
    if (!username || !email || !password || !country || !role) {
        console.log("algo está vacio");
        throw new Error('Todos los campos son obligatorios');
        
    }

    console.log("or problem here");
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        console.log("correo existe");
        throw new Error('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("i will create a user")
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

module.exports = { registerUser, loginUser };
