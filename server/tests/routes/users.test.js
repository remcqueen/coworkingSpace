const request = require('supertest');
const express = require('express');

const app = express();
require('../../startup/routes')(app);

describe('GET /api/users/:id', () => {
  const validId = '5cc60904ec784149790a3c3b';
  const invalidId = '0';
  it('Should get a 200 status reponse from the get request', () => request(app)
    .get(`/api/users/${validId}`)
    .expect(200));

  it('should respond with a textfile', () => request(app)
    .get(`/api/users${validId}`)
    .expect('Content-type', /text/));

  it('should respond with status 404 for unknown id', () => request(app)
    .get(`/api/users${invalidId}`)
    .expect(404));
});

describe('POST /api/users', () => {
  it('Should get a 400 status response from an empty body request', () => request(app)
    .post('/api/users')
    .expect(400));
});
