const pool = require('../config/db');

const User = {
    async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    async create(username, email, password, country, role) {
        const query = 'INSERT INTO users (username, email, password, country, role) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [username, email, password, country, role]);
        return result.insertId;
    }
};

module.exports = User;
