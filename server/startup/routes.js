const express = require('express');
const config = require('config');
const buildings = require('../routes/buildings');
const businesses = require('../routes/businesses');
const organisations = require('../routes/organisations');
const rooms = require('../routes/rooms');
const users = require('../routes/users');
const auth = require('../routes/auth');
const roomTypes = require('../routes/roomTypes');
const bookings = require('../routes/bookings');
const googleApi = require('../routes/googleApi');
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
  if (config.get('useLocal')) {
    app.use('/api/businesses', localBusinesses);
    app.use('/api/organisations', localOrganisations);
    app.use('/api/buildings', localBuildings);
    app.use('/api/rooms', localRooms);
    app.use('/api/roomTypes', localRoomTypes);
    app.use('/api/users', localUsers);
    app.use('/api/auth', localAuth);
    app.use('/api/bookings', localBookings);
  } else {
    app.use('/api/businesses', businesses);
    app.use('/api/organisations', organisations);
    app.use('/api/buildings', buildings);
    app.use('/api/rooms', rooms);
    app.use('/api/roomTypes', roomTypes);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/bookings', bookings);
  }
  app.use('/api/googleApi', googleApi);
  app.use(error);
}

module.exports = routes;
