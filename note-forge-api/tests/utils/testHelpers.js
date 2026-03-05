const TEST_PASSWORD = process.env.TEST_PASSWORD || 'ValidTestPass123!';
const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db');

const VALID_USER = {
  username: 'testuser',
  email: 'test@example.com',
  password: TEST_PASSWORD,
  country: 'Testland',
  role: 'student'
};

const LOGIN_CREDENTIALS = {
  email: 'test@example.com',
  password: TEST_PASSWORD
};

/**
 * Create a test user and login
 * @param {string} email The email of the test user
 * @returns {Promise<string>} The JWT token for the test user
 */
async function createTestUserAndLogin(email = 'test@example.com') {

    // Full cleanup respecting FK order before recreating the user
    await pool.query("DELETE FROM guide_exercises");
    await pool.query("DELETE FROM guides_categories");
    await pool.query("DELETE FROM guides");
    await pool.query("DELETE FROM exercises_categories");
    await pool.query("DELETE FROM exercises");
    await pool.query("DELETE FROM categories");
    await pool.query("DELETE FROM users WHERE email = ?", [email]);

    await request(app).post('/register').send(VALID_USER);

    const loginRes = await request(app).post('/login').send(LOGIN_CREDENTIALS);

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

/**
 * Create a test exercise
 * @param {string} token The JWT token for authentication
 * @param {string|number} categoryId The category ID to associate the exercise with
 * @param {Object} overrides Optional overrides for the exercise
 * @returns {Promise<number>} The ID of the created exercise
 */
async function createTestExercise(token, categoryId, overrides = {}) {
  const res = await request(app)
    .post('/create-exercise')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Default Test Exercise',
      description: 'Exercise for testing',
      difficulty: 3,
      answer: 'Test answer',
      duration: 30,
      categoryId,
      ...overrides
    });

  return res.body.exerciseId;
}

/**
 * Create a test guide
 * @param {string} token The JWT token for authentication
 * @param {Array<number>} exerciseIds Exercise IDs to include in the guide
 * @param {Object} overrides Optional overrides for the guide
 * @returns {Promise<number>} The ID of the created guide
 */
async function createTestGuide(token, exerciseIds = [], overrides = {}) {
  const res = await request(app)
    .post('/create-guide')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Default Test Guide',
      author: 'Test Author',
      description: 'Guide for testing',
      exerciseIds,
      categoryIds: [],
      ...overrides
    });

  return res.body.guideId;
}

/**
 * Cleanup test data
 */
async function cleanupTestData() {
    await pool.query("DELETE FROM guide_exercises");
    await pool.query("DELETE FROM guides_categories");
    await pool.query("DELETE FROM guides");
    await pool.query("DELETE FROM exercises_categories");
    await pool.query("DELETE FROM exercises");
    await pool.query("DELETE FROM categories");
    await pool.query("DELETE FROM users WHERE email LIKE 'test%@example.com'");
}

module.exports = { createTestUserAndLogin, createTestCategory, createTestExercise, createTestGuide, cleanupTestData };
