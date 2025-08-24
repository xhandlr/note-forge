/**
 * Test for Exercise Controller
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db');
const testHelper = require('../utils/testHelpers');

// Close database connection
afterAll( async () => {
    await testHelper.cleanupTestData();
    await pool.end();
});

describe('Exercise Controller', () => {

    /**
     * Test for create a new exercise
     * Endpoint POST /create-exercise
     */
    describe('POST /create-exercise', () => {
        let token;
        let categoryId;

        beforeAll(async () => {
            token = await testHelper.createTestUserAndLogin();
            categoryId = await testHelper.createTestCategory(token);
        });

        it('should create a new exercise', async () => {     
            const exerciseData = {
                title: 'Test Exercise',
                description: 'This is a test exercise',
                difficulty: 7,
                reference: 'hxxp://example.com',
                answer: 'This is a test answer',
                duration: 60,
                tags: 'test',
                details: 'These are the details of the test exercise',
                categoryId: categoryId
            };
            const res = await request(app)
                .post('/create-exercise')
                .set('Authorization', `Bearer ${token}`)
                .send(exerciseData);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Ejercicio creado con éxito');
            expect(res.body).toHaveProperty('exerciseId');
        });
    });
});