const pool = require('../config/db');

const Category = {
    async addCategory(name, description, user_id) {
        const query = 'INSERT INTO categories (name, description, user_id) VALUES (?, ?, ?)';

        const [result] = await pool.query(query, [name, description, user_id]);

        return result.insertId;
    }
};

module.exports = Category;
