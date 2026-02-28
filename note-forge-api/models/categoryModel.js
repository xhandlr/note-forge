const pool = require('../config/db');

const Category = {
    async create(name, description, imageUrl, isPinned, userId) {
        const query = 'INSERT INTO categories (name, description, user_id, image_url, is_pinned) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [name, description, userId, imageUrl, isPinned]);
        return result.insertId;
    },

    async findById(categoryId) {
        const query = 'SELECT * FROM categories WHERE id = ?';
        const [rows] = await pool.query(query, [categoryId]);
        return rows[0];  // Retorna el ejercicio si lo encuentra, o undefined si no
    },

    async findAll() {
        const query = `
            SELECT
                c.*,
                COUNT(DISTINCT ec.exercise_id) as exercise_count,
                COUNT(DISTINCT gc.guide_id) as guide_count
            FROM categories c
            LEFT JOIN exercises_categories ec ON c.id = ec.category_id
            LEFT JOIN guides_categories gc ON c.id = gc.category_id
            GROUP BY c.id
            ORDER BY c.is_pinned DESC, c.name ASC
        `;
        const [rows] = await pool.query(query);
        return rows;  // Retorna todas las categorías con contadores
    },

    async update(categoryId, name, description, imageUrl, pinned) {
        const query = 'UPDATE categories SET name = ?, description = ?, image_url = ?, is_pinned = ? WHERE id = ?';
        const [result] = await pool.query(query, [name, description, imageUrl, pinned, categoryId]);
        return result.affectedRows > 0;  // Retorna true si se actualizó el ejercicio
    },

    async delete(categoryId) {
        // Eliminar asociaciones en 'exercises_categories' antes para evitar FK constraint
        await pool.query('DELETE FROM exercises_categories WHERE category_id = ?', [categoryId]);
        const query = 'DELETE FROM categories WHERE id = ?';
        const [result] = await pool.query(query, [categoryId]);
        return result.affectedRows > 0;
    }
};

module.exports = Category;
