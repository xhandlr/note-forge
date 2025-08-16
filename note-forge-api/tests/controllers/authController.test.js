/**
 * Tests for Auth Controller
 * Runs tests for user registration, login, and logout functionalities
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db'); 

// Close database connection
afterAll(async () => {
  await pool.end();
});

describe('Auth Controller', () => {
  /**
   * Test for user registration
   * Endpoint POST /register
   */
  describe('POST /register', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", ['test@example.com']);
    });

    it('should register a new user', async () => {
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
      expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito');
      expect(res.body).toHaveProperty('userId');
    });
  });

  /**
   * Test for empty fields in registration
   * Endpoint POST /register
   */
  describe('POST /register', () => {
    it('should return 400 for empty fields', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          username: '',
          email: '',
          password: '',
          country: '',
          role: ''
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Todos los campos son obligatorios');
    });
  });

  /**
   * Test for user already exists
   * Endpoint POST /register
   */
  describe('POST /register', () => {
    beforeEach(async () => {
        await pool.query("DELETE FROM users WHERE email = ?", ['test@example.com'])

        await request(app)
          .post('/register')
          .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456',
          country: 'Testland',
          role: 'student'
        });
    });
    
    it('should return 409 for user already exists', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456',
          country: 'Testland',
          role: 'student'
        });
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('message', 'El correo ya está registrado');
    });
  });

  /**
   * Test for user login
   * Endpoint POST /login
   */
  describe('POST /login', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", ['test@example.com']);
      await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456',
          country: 'Testland',
          role: 'student'
        });
    });
    it('should authenticate the user', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: '123456'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Login exitoso');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');     
    });
  });

  /**
   * Test for incorrect password in login
   * Endpoint POST /login
   */
  describe('POST /login', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", ['test@example.com']);
      await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456',
          country: 'Testland',
          role: 'student'
        });
    });
    it('should return 401 for incorrect password', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Credenciales incorrectas');
    });
  });

  /**
   * Test for incorrect email in login
   * Endpoint POST /login
   */
  describe('POST /login', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", ['test@example.com']);
      await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456',
          country: 'Testland',
          role: 'student'
        });
    });
    it('should return 401 for incorrect email', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'wrong@example.com',
          password: '123456'
        });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Credenciales incorrectas');
    });
  });

  /**
   * Test for empty email in login
   * Endpoint POST /login
   */
  describe('POST /login', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", ['test@example.com']);
      await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456',
          country: 'Testland',
          role: 'student'
        });
    });
    it('should return 400 for empty email', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: '',
          password: '123456'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Todos los campos son obligatorios');
    });
  });

  /**
   * Test for user logout
   * Endpoint POST /logout
   */
  describe('POST /logout', () => {
    it('should logout successfully', async () => {
      const res = await request(app).post('/logout');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Sesión cerrada exitosamente');
    });
  });
});