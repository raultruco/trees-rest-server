import request from 'supertest';
import assert from 'assert';
import app from '../src/app.js';
import treesController from '../src/controllers/trees.controller.js';

describe('routes', () => {
    beforeAll(async done => {
        await treesController.init();
        done();
    });

    describe('status', () => {
        it('should get a 200 response', async () => {
            await request(app).get('/api0/hi').expect(200);
        });
    });

    describe('trees', () => {
        it('should get the total trees planted this last week', async () => {
            await request(app)
                .get('/api0/trees/1w')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.equal(res.body.length, 7);
                    assert.ok(typeof res.body[0].day === 'string');
                    assert.equal(res.body[0].day.length, 8);
                    assert.ok(typeof res.body[0].total === 'number');
                });
        });
        it('should get the total trees planted this last month', async () => {
            await request(app)
                .get('/api0/trees/1m')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.ok((res.body.length) >= 28 && (res.body.length <= 31));
                    assert.ok(typeof res.body[0].day === 'string');
                    assert.equal(res.body[0].day.length, 8);
                    assert.ok(typeof res.body[0].total === 'number');
                });
        });
        it('should get the total trees planted this last 3 months', async () => {
            await request(app)
                .get('/api0/trees/3m')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.ok((res.body.length) >= 89 && (res.body.length <= 92));
                    assert.ok(typeof res.body[0].day === 'string');
                    assert.equal(res.body[0].day.length, 8);
                    assert.ok(typeof res.body[0].total === 'number');
                });
        });
        it('should get the total trees planted this last 6 months', async () => {
            await request(app)
                .get('/api0/trees/6m')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.ok((res.body.length) >= 178 && (res.body.length <= 184));
                    assert.ok(typeof res.body[0].day === 'string');
                    assert.equal(res.body[0].day.length, 8);
                    assert.ok(typeof res.body[0].total === 'number');
                });
        });
        it('should get the total trees planted this last year', async () => {
            await request(app)
                .get('/api0/trees/1y')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.ok((res.body.length) >= 365 && (res.body.length <= 368));
                    assert.ok(typeof res.body[0].day === 'string');
                    assert.equal(res.body[0].day.length, 8);
                    assert.ok(typeof res.body[0].total === 'number');
                });
        });
        it('should get the total trees planted for a date range', async () => {
            await request(app)
                .get('/api0/trees?from=2020-04-01&to=2020-05-31')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.equal(res.body.length, 60);
                    assert.ok(typeof res.body[0].day === 'string');
                    assert.equal(res.body[0].day.length, 8);
                    assert.ok(typeof res.body[0].total === 'number');
                });
        });
        it('should get the total trees planted for a date range in different years', async () => {
            await request(app)
                .get('/api0/trees?from=2019-12-01&to=2020-01-31')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.equal(res.body.length, 61);
                    assert.ok(typeof res.body[0].day === 'string');
                    assert.equal(res.body[0].day.length, 8);
                    assert.ok(typeof res.body[0].total === 'number');
                });
        });
        it('should get nothing when "from" is invalid', async () => {
            await request(app)
                .get('/api0/trees?from=invalid&to=2020-01-31')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.equal(res.body.length, 0);
                });
        });
        it('should get nothing when "to" is invalid', async () => {
            await request(app)
                .get('/api0/trees?from=2019-12-01&to=invalid')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    assert.ok(Array.isArray(res.body));
                    assert.equal(res.body.length, 0);
                });
        });
    });

    describe('GET /404', () => {
        it('should return 404 for non-existent URLs', async () => {
            await request(app).get('/404').expect(404);
            await request(app).get('/notfound').expect(404);
        });
    });
});
