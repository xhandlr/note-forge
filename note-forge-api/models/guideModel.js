const pool = require('../config/db');

const Guide = {
    async create(title, author, description, userId) {
        const query = 'INSERT INTO guides (title, author, description, user_id) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [title, author, description, userId]);
        return result.insertId;
    },

    async findById(guideId) {
        // Fetch guide metadata
        const [guideRows] = await pool.query('SELECT * FROM guides WHERE id = ?', [guideId]);
        if (!guideRows[0]) return null;

        const guide = guideRows[0];

        // Fetch full exercise objects ordered by their position in the guide
        const exercisesQuery = `
            SELECT e.id, e.title, e.description, e.answer, e.difficulty, e.image_url
            FROM guide_exercises ge
            INNER JOIN exercises e ON ge.exercise_id = e.id
            WHERE ge.guide_id = ?
            ORDER BY ge.id ASC
        `;
        const [exerciseRows] = await pool.query(exercisesQuery, [guideId]);

        // Fetch categories for this guide
        const categoriesQuery = `
            SELECT c.id, c.name
            FROM guides_categories gc
            INNER JOIN categories c ON gc.category_id = c.id
            WHERE gc.guide_id = ?
        `;
        const [categoryRows] = await pool.query(categoriesQuery, [guideId]);

        guide.exercises = exerciseRows;
        guide.categories = categoryRows;
        return guide;
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
    },

    async addCategories(guideId, categoryIds) {
        if (!categoryIds || categoryIds.length === 0) {
            return;
        }

        const values = categoryIds.map(categoryId => [guideId, categoryId]);
        const query = 'INSERT INTO guides_categories (guide_id, category_id) VALUES ?';
        await pool.query(query, [values]);
    },

    async removeAllCategories(guideId) {
        const query = 'DELETE FROM guides_categories WHERE guide_id = ?';
        await pool.query(query, [guideId]);
    }
};

module.exports = Guide;
