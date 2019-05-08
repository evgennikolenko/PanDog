const mongoose = require('mongoose');
const Subject = require('./../models/forum/subject');
const sinon = require('sinon');
const request = require('supertest');

const auth = require('./../controllers/auth');
// jest.mock('../../app/photo_model');
const server = require('./../config/app');

describe('index route', () => {
    beforeEach(function(done) {
        if (mongoose.connection.readyState === 0) {
            mongoose.connect('mongodb://localhost:27017/dogdb').then(() => {
                console.log('DB connected.');
                return done();
            });
        } else {
            return done();
        }
    });

    afterEach(function(done) {
        mongoose.disconnect(done);
        return done();
    });

    test('should respond with a 200 when user login and return auth token', async () => {
        const req = await request(server).post('/api/login').send({
            email: "low@gmail.com",
            password: "123123"
        });
        expect(req.statusCode).toBe(200);
        expect(req.body.token).toBeTruthy();
        });

    test('should respond with a 404 when user send wrong login', async () => {
        const req = await request(server).post('/api/login').send({
            email: "wrong@gmail.com",
            password: "123123"
        });
        expect(req.statusCode).toBe(404);
        expect(req.error.text).toMatch(/User not found!"/);

    });
    });
