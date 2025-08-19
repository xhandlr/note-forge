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
            console.log('Token being used:', token);
            
            // Verifica manualmente el token
            const jwt = require('jsonwebtoken');
            try {
                const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
                console.log('Token decoded successfully:', decoded);
            } catch (error) {
                console.log('Token verification failed:', error.message);
            }

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

            console.log('Response status:', res.status);
            console.log('Response body:', res.body);
        });
    });
});