const request = require('supertest');
const express = require('express');

const app = express();
require('../../startup/routes')(app);

describe('GET /api/roomTypes', () => {
  it('Should get a 200 status reponse from the get request', () => request(app)
    .get('/api/roomTypes')
    .expect(200));

  it('should respond with a json data type', () => request(app)
    .get('/api/roomTypes')
    .expect('Content-type', /json/));
});
