const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = verified; 
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
