const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db'); 

afterAll(async () => {
  await pool.end();
});

describe('Auth Controller', () => {
  describe('POST /register', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", ['test@example.com']);
    });

    it('debería registrar un usuario nuevo', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456',
          country: 'Testland',
          role: 'student'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message');
    });
  });
});