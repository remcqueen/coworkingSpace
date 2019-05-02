const express = require('express');
const googleApi = require('../localRoutes/googleApi');
const localBuildings = require('../localRoutes/buildings');
const localBusinesses = require('../localRoutes/businesses');
const localOrganisations = require('../localRoutes/organisations');
const localRooms = require('../localRoutes/rooms');
const localUsers = require('../localRoutes/users');
const localAuth = require('../localRoutes/auth');
const localRoomTypes = require('../localRoutes/roomTypes');
const localBookings = require('../localRoutes/bookings');
const error = require('../middleware/error');

function routes(app) {
  app.use(express.json());
  app.use('/api/businesses', localBusinesses);
  app.use('/api/organisations', localOrganisations);
  app.use('/api/buildings', localBuildings);
  app.use('/api/rooms', localRooms);
  app.use('/api/roomTypes', localRoomTypes);
  app.use('/api/users', localUsers);
  app.use('/api/auth', localAuth);
  app.use('/api/bookings', localBookings);
  app.use('/api/googleApi', googleApi);
  app.use(error);
}

module.exports = routes;
