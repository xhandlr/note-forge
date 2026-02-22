const pool = require('../config/db');

const Exercise = {
    async create(exerciseData) {
        const { title, description, difficulty, reference, answer, duration, tags, details, userId, imageUrl } = exerciseData;
        const query = 'INSERT INTO exercises (title, description, difficulty, reference, answer, duration, tags, details, user_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [title, description, difficulty, reference, answer, duration, tags, details, userId, imageUrl]);
        return result.insertId;
    },

    async findById(exerciseId) {
        const query = `
            SELECT e.*, ec.category_id
            FROM exercises e
            LEFT JOIN exercises_categories ec ON e.id = ec.exercise_id
            WHERE e.id = ?
        `;
        const [rows] = await pool.query(query, [exerciseId]);
        return rows[0];
    },

    async findAll() {
        const query = `
            SELECT e.*, ec.category_id
            FROM exercises e
            LEFT JOIN exercises_categories ec ON e.id = ec.exercise_id
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    async update(exerciseData) {
        const { title, description, difficulty, reference, answer, duration, tags, details, exerciseId } = exerciseData;
        const query = 'UPDATE exercises SET title = ?, description = ?, difficulty = ?, reference = ?, answer = ?, duration = ?, tags = ?, details = ? WHERE id = ?';
        const [result] = await pool.query(query, [title, description, difficulty, reference, answer, duration, tags, details, exerciseId]);
        return result.affectedRows > 0;  // Retorna true si se actualizó el ejercicio
    },

    async delete(exerciseId) {
        const query = 'DELETE FROM exercises WHERE id = ?';
        const [result] = await pool.query(query, [exerciseId]);
        return result.affectedRows > 0;  // Retorna true si se eliminó el ejercicio
    }
};

module.exports = Exercise;
