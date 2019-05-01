const express = require('express');
const { validate } = require('../models/booking');
const auth = require('../middleware/auth');
const Booking = require('../assets/bookings');
const Building = require('../assets/buildings');
const User = require('../assets/users');
const Room = require('../assets/rooms');

const router = express.Router();

router.get('/', (req, res) => {
  const bookings = Booking.getBookings();
  res.send(bookings);
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let booking = Booking.findOne({
    'room._id': req.body.roomId,
    date: req.body.date,
  });
  if (booking) return res.status(400).send('Room already booked for this day');

  const building = Building.findById(req.body.buildingId);
  if (!building) return res.status(400).send('Invalid building');

  const user = User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user');

  const room = Room.findById(req.body.roomId);
  if (!room) return res.status(400).send('Invalid room');

  booking = {
    room: {
      _id: room._id,
      name: room.name,
    },
    building: {
      _id: building._id,
      name: building.name,
    },
    user: {
      _id: user._id,
      email: user.email,
    },
    date: req.body.date,
  };

  Booking.saveBooking(booking);

  res.send(booking);
});

router.delete('/:id', [auth], (req, res) => {
  const booking = Booking.findByIdAndRemove(req.params.id);
  if (!booking) return res.status(404).send('The booking with the given ID was not found.');

  res.send(booking);
});

module.exports = router;
