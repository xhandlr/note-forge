const pool = require('../config/db');

const ExerciseCategory = {
    async create(exercise_id, category_id) {
        const query = 'INSERT into exercises_categories (exercise_id, category_id) VALUES (?, ?)';

        const [result] = await pool.query(query, [exercise_id, category_id]);

        return result.insertId;
    }
};

module.exports = ExerciseCategory;