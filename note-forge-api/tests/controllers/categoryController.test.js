/**
 * Test for Category Controller
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db'); 
const { createTestUserAndLogin, createTestCategory } = require('../utils/testHelpers');

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
            token = await createTestUserAndLogin(); 
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

    describe('GET /category/:id', () => {
        let token;
        let categoryId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            categoryId = await createTestCategory(token);
        });

        it('should return the category by id', async () => {
            const res = await request(app)
            .get(`/category/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('description');
        });
    });
});