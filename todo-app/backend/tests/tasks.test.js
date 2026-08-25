process.env.NODE_ENV = 'test'; // Ensure we use in-memory database
const request = require('supertest');
const app = require('../index');
const db = require('../database');

describe('Tasks API', () => {
    beforeAll((done) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                text TEXT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, done);
    });

    // Clear tasks table before each test
    beforeEach((done) => {
        db.run('DELETE FROM tasks', done);
    });

    // Close db after all tests
    afterAll((done) => {
        db.close(done);
    });

    let createdTaskId;

    test('should fetch an empty array initially', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('should create a valid task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({ text: 'Test Task' });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.text).toBe('Test Task');
        expect(res.body.completed).toBe(false);
        createdTaskId = res.body.id;
    });

    test('should reject an empty task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({ text: '   ' });
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('should fetch tasks after creation', async () => {
        // Create one first
        await request(app).post('/api/tasks').send({ text: 'Another Task' });
        
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].text).toBe('Another Task');
    });

    test('should update task text', async () => {
        // Create
        const createRes = await request(app).post('/api/tasks').send({ text: 'Initial' });
        const id = createRes.body.id;

        // Update
        const updateRes = await request(app)
            .patch(`/api/tasks/${id}`)
            .send({ text: 'Updated Text' });
        
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.text).toBe('Updated Text');
    });

    test('should toggle completion status', async () => {
        // Create
        const createRes = await request(app).post('/api/tasks').send({ text: 'Toggle Me' });
        const id = createRes.body.id;

        // Update completed to true
        const updateRes = await request(app)
            .patch(`/api/tasks/${id}`)
            .send({ completed: true });
        
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.completed).toBe(true);
    });

    test('should reject update with malformed UUID', async () => {
        const res = await request(app)
            .patch('/api/tasks/invalid-id-format')
            .send({ text: 'Ghost Task' });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid task ID format');
    });

    test('should handle a non-existent task on update with valid UUID', async () => {
        const validFakeId = '123e4567-e89b-42d3-a456-426614174000';
        const res = await request(app)
            .patch(`/api/tasks/${validFakeId}`)
            .send({ text: 'Ghost Task' });
        
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
    });

    test('should delete a task', async () => {
        // Create
        const createRes = await request(app).post('/api/tasks').send({ text: 'Delete Me' });
        const id = createRes.body.id;

        // Delete
        const delRes = await request(app).delete(`/api/tasks/${id}`);
        expect(delRes.statusCode).toBe(204);

        // Fetch to confirm
        const fetchRes = await request(app).get('/api/tasks');
        expect(fetchRes.body.length).toBe(0);
    });

    test('should reject delete with malformed UUID', async () => {
        const delRes = await request(app).delete('/api/tasks/invalid-id-format');
        expect(delRes.statusCode).toBe(400);
        expect(delRes.body.error).toBe('Invalid task ID format');
    });

    test('should handle a non-existent task on delete with valid UUID', async () => {
        const validFakeId = '123e4567-e89b-42d3-a456-426614174000';
        const delRes = await request(app).delete(`/api/tasks/${validFakeId}`);
        expect(delRes.statusCode).toBe(404);
    });

    // --- SECURITY TESTS ---

    test('should prevent SQL Injection payloads (stores as plain text)', async () => {
        const sqliPayload = "'; DROP TABLE tasks; --";
        const res = await request(app).post('/api/tasks').send({ text: sqliPayload });
        expect(res.statusCode).toBe(201);
        expect(res.body.text).toBe(sqliPayload); // Stored safely, not executed

        // Verify table still exists and query works
        const fetchRes = await request(app).get('/api/tasks');
        expect(fetchRes.statusCode).toBe(200);
    });

    test('should prevent XSS payloads (stores as plain text)', async () => {
        const xssPayload = "<script>alert('hacked')</script>";
        const res = await request(app).post('/api/tasks').send({ text: xssPayload });
        expect(res.statusCode).toBe(201);
        expect(res.body.text).toBe(xssPayload); // Stored safely, react handles rendering
    });

    test('should reject excessively long task text', async () => {
        const longText = "A".repeat(300);
        const res = await request(app).post('/api/tasks').send({ text: longText });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Task text cannot exceed 255 characters');
    });

    test('should reject non-boolean completed status', async () => {
        const validFakeId = '123e4567-e89b-42d3-a456-426614174000';
        const res = await request(app)
            .patch(`/api/tasks/${validFakeId}`)
            .send({ completed: 'true' }); // String instead of boolean
        
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Completed status must be a boolean');
    });
});
