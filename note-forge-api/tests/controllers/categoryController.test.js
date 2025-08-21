/**
 * Test for Category Controller
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db'); 
const { createTestUserAndLogin, createTestCategory, cleanupTestData } = require('../utils/testHelpers');

// Close database connection
afterAll(async () => {
  await cleanupTestData();
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

    /**
     * Test for get category by id
     * Endpoint GET /category/:id
     */
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

    /**
     * Test for get all the user categories
     * Endpoint GET /categories
     */
    describe('GET /categories', () => {
        beforeAll(async () => {
            token = await createTestUserAndLogin();
            categoryId = await createTestCategory(token);
        });

        it('should return all the user categories', async () => {
            const res = await request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        })
    });

    /**
     * Test for updating a category
     * Endpoint PUT /update-category/:id
     */
    describe('PUT /update-category/:id', () => {
        let token;
        let categoryId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            categoryId = await createTestCategory(token);
        });

        it('should update the category', async () => {
            const res = await request(app)
            .put(`/update-category/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Updated Category',
                description: 'This is an updated test category',
                isPinned: true
            });

            expect(res.statusCode).toBe(200);
        });
    });

    /**
     * Test for deleting a category
     * Endpoint DELETE /delete-category/:id
     */
    describe('DELETE /delete-category/:id', () => {
        let token;
        let categoryId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            categoryId = await createTestCategory(token);
        });

        it('should delete the category', async () => {
            const res = await request(app)
            .delete(`/delete-category/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Categoría eliminada con éxito');
        });
    });
});