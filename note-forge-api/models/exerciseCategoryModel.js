const pool = require('../config/db');

const ExerciseCategory = {
    async create(exercise_id, category_id) {
        const query = 'INSERT into exercises_categories (exercise_id, category_id) VALUES (?, ?)';

        const [result] = await pool.query(query, [exercise_id, category_id]);

        return result.insertId;
    },

    async findByCategory(category_id) {
        const query = `
            SELECT e.*
            FROM exercises e
            INNER JOIN exercises_categories ec ON e.id = ec.exercise_id
            WHERE ec.category_id = ?
        `;

        const [rows] = await pool.query(query, [category_id]);

        return rows;
    }
};

module.exports = ExerciseCategory;