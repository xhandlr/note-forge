/**
 * Test for Exercise Controller
 */

const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db');
const { createTestUserAndLogin, cleanupTestData } = require('../utils/testHelpers');

// Close database connection
afterAll( async () => {
    await cleanupTestData();
    await pool.end();
});

describe('Exercise Controller', () => {

    /**
     * Test for create a new exercise
     * Endpoint POST /create-exercise
     */

    describe('POST /create-exercise', () => {
        let token;

        beforeAll(async () => {
            token = await createTestUserAndLogin();
        });

        it('should create a new exercise', async () => {
        
            const res = await request(app)
                .post('/create-exercise')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: 'Test Exercise',
                    description: 'This is a test exercise',
                    difficulty: 7,
                    collection: 'Example',
                    reference: 'hxxp://example.com',
                    answer: 'This is a test answer',
                    duration: 60,
                    tags: ['test', 'exercise'],
                    details: 'These are the details of the test exercise',
                });
        });
    });
});