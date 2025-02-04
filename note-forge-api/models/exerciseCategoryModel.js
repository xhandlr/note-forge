const pool = require('../config/db');

const ExerciseCategory = {
    async addExerciseCategory(exercise_id, category_id) {
        const query = 'INSERT into exercises_categories (exercise_id, category_id) VALUES (?, ?)';

        const [result] = await pool.query(query, [exercise_id, category_id]);

        result.insertId;
    }
};

module.exports = ExerciseCategory;