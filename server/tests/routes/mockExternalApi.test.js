const request = require('supertest');
const express = require('express');

const app = express();
require('../../startup/routes')(app);

describe('GET /api/googleApi', () => {
  it('Should get a 404 status when empty data is sent to the server', () => request(app)
    .get('/api/googleApi')
    .expect(404));
});
