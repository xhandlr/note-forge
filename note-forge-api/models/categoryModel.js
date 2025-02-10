const pool = require('../config/db');

const Category = {
    async create(name, description, userId) {
        const query = 'INSERT INTO categories (name, description, user_id) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [name, description, userId]);
        return result.insertId;
    },

    async findById(categoryId) {
        const query = 'SELECT * FROM categories WHERE id = ?';
        const [rows] = await pool.query(query, [categoryId]);
        return rows[0];  // Retorna el ejercicio si lo encuentra, o undefined si no
    },

    async findAll() {
        const query = 'SELECT * FROM categories';  
        const [rows] = await pool.query(query);
        return rows;  // Retorna todos los ejercicios en un array
    },

    async update(categoryId, name, description) {
        const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
        const [result] = await pool.query(query, [name, description, categoryId]);
        return result.affectedRows > 0;  // Retorna true si se actualizó el ejercicio
    },

    async delete(categoryId) {
        const query = 'DELETE FROM categories WHERE id = ?';
        const [result] = await pool.query(query, [categoryId]);
        return result.affectedRows > 0;  // Retorna true si se eliminó el ejercicio
    }
};

module.exports = Category;
