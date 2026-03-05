/**
 * Tests for Guide Controller
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db');
const { createTestUserAndLogin, createTestCategory, createTestExercise, createTestGuide, cleanupTestData } = require('../utils/testHelpers');

afterAll(async () => {
    await cleanupTestData();
    await pool.end();
});

describe('Guide Controller', () => {

    /**
     * POST /create-guide
     */
    describe('POST /create-guide', () => {
        let token;
        let exerciseId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            const categoryId = await createTestCategory(token);
            exerciseId = await createTestExercise(token, categoryId);
        });

        it('should create a new guide', async () => {
            const res = await request(app)
                .post('/create-guide')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Guide',
                    author: 'Test Author',
                    description: 'This is a test guide',
                    exerciseIds: [exerciseId],
                    categoryIds: []
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('guideId');
        });

        it('should return 401 without token', async () => {
            const res = await request(app)
                .post('/create-guide')
                .send({ title: 'No auth' });
            expect(res.statusCode).toBe(401);
        });
    });

    /**
     * GET /guide/:id
     */
    describe('GET /guide/:id', () => {
        let token;
        let guideId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            const categoryId = await createTestCategory(token);
            const exerciseId = await createTestExercise(token, categoryId);
            guideId = await createTestGuide(token, [exerciseId]);
        });

        it('should return the guide by id', async () => {
            const res = await request(app)
                .get(`/guide/${guideId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('title');
        });

        it('should return 404 for non-existent guide', async () => {
            const res = await request(app)
                .get('/guide/999999')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(404);
        });
    });

    /**
     * GET /guides
     */
    describe('GET /guides', () => {
        let token;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
        });

        it('should return all guides for the user', async () => {
            const res = await request(app)
                .get('/guides')
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should return 401 without token', async () => {
            const res = await request(app).get('/guides');
            expect(res.statusCode).toBe(401);
        });
    });

    /**
     * GET /guides/category/:categoryId
     */
    describe('GET /guides/category/:categoryId', () => {
        let token;
        let categoryId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            categoryId = await createTestCategory(token);
            const exerciseId = await createTestExercise(token, categoryId);
            await createTestGuide(token, [exerciseId], { categoryIds: [categoryId] });
        });

        it('should return guides filtered by category', async () => {
            const res = await request(app)
                .get(`/guides/category/${categoryId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    /**
     * PUT /update-guide/:id
     */
    describe('PUT /update-guide/:id', () => {
        let token;
        let guideId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            const categoryId = await createTestCategory(token);
            const exerciseId = await createTestExercise(token, categoryId);
            guideId = await createTestGuide(token, [exerciseId]);
        });

        it('should update the guide', async () => {
            const res = await request(app)
                .put(`/update-guide/${guideId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Updated Guide',
                    author: 'Updated Author',
                    description: 'Updated description',
                    exerciseIds: [],
                    categoryIds: []
                });
            expect(res.statusCode).toBe(200);
        });
    });

    /**
     * DELETE /delete-guide/:id
     */
    describe('DELETE /delete-guide/:id', () => {
        let token;
        let guideId;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
            const categoryId = await createTestCategory(token);
            const exerciseId = await createTestExercise(token, categoryId);
            guideId = await createTestGuide(token, [exerciseId]);
        });

        it('should delete the guide', async () => {
            const res = await request(app)
                .delete(`/delete-guide/${guideId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Guía eliminada con éxito');
        });

        it('should return 404 for already deleted guide', async () => {
            const res = await request(app)
                .delete(`/delete-guide/${guideId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toBe(404);
        });
    });
});
