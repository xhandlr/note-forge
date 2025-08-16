/**
 * Test for Category Controller
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db'); 
const jwt = require('jsonwebtoken');

// Close database connection
afterAll(async () => {
  await pool.end();
});

describe('Category Controller', () => {
    /**
     * Test for creating a new category
     * Endpoint POST /categories
     */
    
    describe('POST /categories', () => {
        let token;

        beforeAll(async () => {
            // Crear usuario temporal
            const res = await request(app)
            .post('/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: '123456',
                country: 'Testland',
                role: 'student'
            });
            
            // Login para obtener token
            const loginRes = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: '123456'
            });
            token = loginRes.body.token;
        });

        it('should create a new category', async () => {
            const res = await request(app)
            .post('/create-category')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Category',
                description: 'This is a test category',
                isPinned: false
            });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Categoría creada con éxito');
            expect(res.body).toHaveProperty('categoryId');
        });
    });
});