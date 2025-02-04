const pool = require('../config/db');

const Exercise = {
    async create(title, description, difficult, collection, reference, answer, duration, tags, details, userId) {
        const query = 'INSERT INTO exercises (title, description, difficult, collection, reference, answer, duration, tags, details, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [title, description, difficult, collection, reference, answer, duration, tags, details, userId]);
        return result.insertId;
    },

    async findById(exerciseId) {
        const query = 'SELECT * FROM exercises WHERE id = ?';
        const [rows] = await pool.query(query, [exerciseId]);
        return rows[0];  // Retorna el ejercicio si lo encuentra, o undefined si no
    },

    async update(exerciseId, title, description, difficult, collection, reference, answer, duration, tags, details) {
        const query = 'UPDATE exercises SET title = ?, description = ?, difficult = ?, collection = ?, reference = ?, answer = ?, duration = ?, tags = ?, details = ? WHERE id = ?';
        const [result] = await pool.query(query, [title, description, difficult, collection, reference, answer, duration, tags, details, exerciseId]);
        return result.affectedRows > 0;  // Retorna true si se actualizó el ejercicio
    },

    async delete(exerciseId) {
        const query = 'DELETE FROM exercises WHERE id = ?';
        const [result] = await pool.query(query, [exerciseId]);
        return result.affectedRows > 0;  // Retorna true si se eliminó el ejercicio
    }
};

module.exports = Exercise;
