/**
 * Tests for Auth Controller
 * Runs tests for user registration, login, and logout functionalities
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db'); 
const { cleanupTestData } = require('../utils/testHelpers');

// Test data constants
const VALID_USER = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'ValidTestPass123!',
  country: 'Testland',
  role: 'student'
};

const EMPTY_USER = {
  username: '',
  email: '',
  password: '',
  country: '',
  role: ''
};

const DUPLICATE_USER = {
  username: 'duplicateuser',
  email: 'test@example.com',
  password: 'AnotherPass456!',
  country: 'Testland',
  role: 'student'
};

const LOGIN_CREDENTIALS = {
  email: 'test@example.com',
  password: 'ValidTestPass123!'
};

const WRONG_PASSWORD_LOGIN = {
  email: 'test@example.com',
  password: 'WrongPassword999!'
};

const WRONG_EMAIL_LOGIN = {
  email: 'wrong@example.com',
  password: 'ValidTestPass123!'
};

const EMPTY_EMAIL_LOGIN = {
  email: '',
  password: 'ValidTestPass123!'
};

// Close database connection
afterAll(async () => {
  await cleanupTestData();
  await pool.end();
});

describe('Auth Controller', () => {
  /**
   * Test for user registration
   * Endpoint POST /register
   */
  describe('POST /register', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", [VALID_USER.email]);
    });

    it('should register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send(VALID_USER);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito');
      expect(res.body).toHaveProperty('userId');
    });
  });

  /**
   * Test for empty fields in registration
   * Endpoint POST /register
   */
  describe('POST /register - Empty fields', () => {
    it('should return 400 for empty fields', async () => {
      const res = await request(app)
        .post('/register')
        .send(EMPTY_USER);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Todos los campos son obligatorios');
    });
  });

  /**
   * Test for user already exists
   * Endpoint POST /register
   */
  describe('POST /register - Duplicate user', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", [VALID_USER.email]);
      // Register first user
      await request(app).post('/register').send(VALID_USER);
    });
    
    it('should return 409 for user already exists', async () => {
      const res = await request(app)
        .post('/register')
        .send(DUPLICATE_USER);
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
      await pool.query("DELETE FROM users WHERE email = ?", [VALID_USER.email]);
      await request(app).post('/register').send(VALID_USER);
    });
    
    it('should authenticate the user', async () => {
      const res = await request(app)
        .post('/login')
        .send(LOGIN_CREDENTIALS);
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
  describe('POST /login - Wrong password', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", [VALID_USER.email]);
      await request(app).post('/register').send(VALID_USER);
    });
    
    it('should return 401 for incorrect password', async () => {
      const res = await request(app)
        .post('/login')
        .send(WRONG_PASSWORD_LOGIN);
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Credenciales incorrectas');
    });
  });

  /**
   * Test for incorrect email in login
   * Endpoint POST /login
   */
  describe('POST /login - Wrong email', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", [VALID_USER.email]);
      await request(app).post('/register').send(VALID_USER);
    });
    
    it('should return 401 for incorrect email', async () => {
      const res = await request(app)
        .post('/login')
        .send(WRONG_EMAIL_LOGIN);
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Credenciales incorrectas');
    });
  });

  /**
   * Test for empty email in login
   * Endpoint POST /login
   */
  describe('POST /login - Empty email', () => {
    beforeEach(async () => {
      await pool.query("DELETE FROM users WHERE email = ?", [VALID_USER.email]);
      await request(app).post('/register').send(VALID_USER);
    });
    
    it('should return 400 for empty email', async () => {
      const res = await request(app)
        .post('/login')
        .send(EMPTY_EMAIL_LOGIN);
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