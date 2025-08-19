const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db');

/**
 * Create a test user and login
 * @param {string} email The email of the test user
 * @returns {Promise<string>} The JWT token for the test user
 */
async function createTestUserAndLogin(email = 'test@example.com') {

    await pool.query("DELETE FROM users WHERE email = ?", [email]);

    await request(app).post('/register').send({
    username: 'testuser',
    email,
    password: '123456',
    country: 'Testland',
    role: 'student'
    });

    const loginRes = await request(app).post('/login').send({
    email,
    password: '123456'
    });

    return loginRes.body.token;
}

/**
 * Create a test category
 * @param {*} token The JWT token for authentication
 * @param {*} overrides Optional overrides for the category
 * @returns {Promise<string>} The ID of the created category
 */
async function createTestCategory(token, overrides = {}) {
  const res = await request(app)
    .post('/create-category')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Default Test Category',
      description: 'Category for testing',
      isPinned: false,
      ...overrides 
    });

  return res.body.categoryId;
}

module.exports = { createTestUserAndLogin, createTestCategory };
