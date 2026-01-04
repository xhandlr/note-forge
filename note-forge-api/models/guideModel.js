const pool = require('../config/db');

const Guide = {
    async create(title, author, description, userId) {
        const query = 'INSERT INTO guides (title, author, description, user_id) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [title, author, description, userId]);
        return result.insertId;
    },

    async findById(guideId) {
        const query = `
            SELECT g.*,
                   GROUP_CONCAT(ge.exercise_id) as exercise_ids
            FROM guides g
            LEFT JOIN guide_exercises ge ON g.id = ge.guide_id
            WHERE g.id = ?
            GROUP BY g.id
        `;
        const [rows] = await pool.query(query, [guideId]);

        if (rows[0] && rows[0].exercise_ids) {
            rows[0].exercise_ids = rows[0].exercise_ids.split(',').map(Number);
        }

        return rows[0];
    },

    async findByUserId(userId) {
        const query = `
            SELECT g.*,
                   COUNT(ge.exercise_id) as exercise_count
            FROM guides g
            LEFT JOIN guide_exercises ge ON g.id = ge.guide_id
            WHERE g.user_id = ?
            GROUP BY g.id
            ORDER BY g.created_at DESC
        `;
        const [rows] = await pool.query(query, [userId]);
        return rows;
    },

    async update(guideId, title, author, description) {
        const query = 'UPDATE guides SET title = ?, author = ?, description = ? WHERE id = ?';
        const [result] = await pool.query(query, [title, author, description, guideId]);
        return result.affectedRows > 0;
    },

    async delete(guideId) {
        const query = 'DELETE FROM guides WHERE id = ?';
        const [result] = await pool.query(query, [guideId]);
        return result.affectedRows > 0;
    },

    async addExercises(guideId, exerciseIds) {
        if (!exerciseIds || exerciseIds.length === 0) {
            return;
        }

        const values = exerciseIds.map(exerciseId => [guideId, exerciseId]);
        const query = 'INSERT INTO guide_exercises (guide_id, exercise_id) VALUES ?';
        await pool.query(query, [values]);
    },

    async removeAllExercises(guideId) {
        const query = 'DELETE FROM guide_exercises WHERE guide_id = ?';
        await pool.query(query, [guideId]);
    }
};

module.exports = Guide;
