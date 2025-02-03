const pool = require('../config/db');

const Exercise = {
    async create(title, description, difficult, collection, reference, answer, duration, tags, details) {
        const query = 'INSERT INTO exercises (title, description, difficult, collection, reference, answer, duration, tags, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [title, description, difficult, collection, reference, answer, duration, tags, details]);
        return result.insertId; // Retorna el ID del ejercicio
    }
};

module.exports = Exercise;
