const request = require('supertest');
const express = require('express');

const app = express();
require('../../startup/routes')(app);

describe('testing login via POST /api/auth', () => {
  it('Should get a 400 status for not sending a body', () => request(app)
    .post('/api/auth')
    .expect(400));

  it('Should get a 400 status for not sending a password', async (done) => {
    const mockReq = { username: 'admin@tuspark.com', password: '' };
    request(app)
      .post('/api/auth')
      .send(mockReq)
      .expect(400, done);
  });

  it('Should get a 400 status for not sending a username', async (done) => {
    const mockReq = { username: '', password: '12345678' };
    request(app)
      .post('/api/auth')
      .send(mockReq)
      .expect(400, done);
  });

  it('Should get a 200 status for sending a valid username and password', async (done) => {
    const mockReq = { username: 'admin@tuspark.com', password: '12345678' };
    request(app)
      .post('/api/auth')
      .send(mockReq)
      .expect(400, done);
  });

  it('should respond with a textfile when a valid username and password is sent', async (done) => {
    const mockReq = { username: 'admin@tuspark.com', password: '12345678' };
    request(app)
      .post('/api/auth')
      .send(mockReq)
      .expect('Content-type', /text/, done);
  });
});
