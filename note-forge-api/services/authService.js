const User = require('../models/userModel');

const registerUser = async (username, email, password, country, role) => {
    if (!username || !email || !password || !country || !role) {
        throw new Error('Todos los campos son obligatorios');
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw new Error('El correo ya está registrado');
    }

    const userId = await User.create(username, email, password, country, role);
    return { message: 'Usuario registrado con éxito', userId };
}

module.exports = { registerUser };
