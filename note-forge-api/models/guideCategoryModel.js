const pool = require('../config/db');

const GuideCategory = {
    async create(guide_id, category_id) {
        const query = 'INSERT INTO guides_categories (guide_id, category_id) VALUES (?, ?)';
        const [result] = await pool.query(query, [guide_id, category_id]);
        return result.insertId;
    },

    async findByGuide(guide_id) {
        const query = `
            SELECT c.*
            FROM categories c
            INNER JOIN guides_categories gc ON c.id = gc.category_id
            WHERE gc.guide_id = ?
        `;
        const [rows] = await pool.query(query, [guide_id]);
        return rows;
    },

    async findByCategory(category_id) {
        const query = `
            SELECT g.*
            FROM guides g
            INNER JOIN guides_categories gc ON g.id = gc.guide_id
            WHERE gc.category_id = ?
        `;
        const [rows] = await pool.query(query, [category_id]);
        return rows;
    },

    async deleteByGuide(guide_id) {
        const query = 'DELETE FROM guides_categories WHERE guide_id = ?';
        const [result] = await pool.query(query, [guide_id]);
        return result.affectedRows > 0;
    },

    async deleteByCategory(category_id) {
        const query = 'DELETE FROM guides_categories WHERE category_id = ?';
        const [result] = await pool.query(query, [category_id]);
        return result.affectedRows > 0;
    }
};

module.exports = GuideCategory;
