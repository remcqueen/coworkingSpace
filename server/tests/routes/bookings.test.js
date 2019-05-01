const request = require('supertest');
const express = require('express');

const app = express();
require('../../startup/routes')(app);

describe('GET /api/bookings', () => {
  it('Should get a 200 status reponse from the get request', () => request(app)
    .get('/api/bookings')
    .expect(200));

  it('should respond with a json data type', () => request(app)
    .get('/api/bookings')
    .expect('Content-type', /json/));
});

describe('POST /api/bookings', () => {
  it('Should get a 400 status response from an empty body request', () => request(app)
    .post('/api/bookings')
    .expect(400));

  it('Should get a 200 status for sending a valid booking request', async (done) => {
    const mockReq = {
      roomId: '5cc61a3de9b1b24aef41c3e4',
      buildingId: '5cc607f264e43048cae8ccc5',
      userId: '5cc60904ec784149790a3c3b',
      date: Date.now().toString(),
    };
    request(app)
      .post('/api/bookings')
      .send(mockReq)
      .expect(200, done);
  });

  it('Should get a 400 status for sending an Invalid roomId in request', async (done) => {
    const mockReq = {
      roomId: '0',
      buildingId: '5cc607f264e43048cae8ccc5',
      userId: '5cc60904ec784149790a3c3b',
      date: Date.now().toString(),
    };
    request(app)
      .post('/api/bookings')
      .send(mockReq)
      .expect(400, done);
  });

  it('Should get a 400 status for sending an Invalid userId in request', async (done) => {
    const mockReq = {
      roomId: '5cc61a3de9b1b24aef41c3e4',
      buildingId: '5cc607f264e43048cae8ccc5',
      userId: '0',
      date: Date.now().toString(),
    };
    request(app)
      .post('/api/bookings')
      .send(mockReq)
      .expect(400, done);
  });

  it('Should get a 400 status for sending an Invalid buildingId in request', async (done) => {
    const mockReq = {
      roomId: '5cc61a3de9b1b24aef41c3e4',
      buildingId: '0',
      userId: '5cc60904ec784149790a3c3b',
      date: Date.now().toString(),
    };
    request(app)
      .post('/api/bookings')
      .send(mockReq)
      .expect(400, done);
  });
});

{
}
