const express = require('express');
const { validate } = require('../models/room');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Room = require('../assets/rooms');
const Building = require('../assets/buildings');
const RoomType = require('../assets/roomTypes');

const router = express.Router();

router.get('/', (req, res) => {
  const rooms = Room.getRooms();
  res.send(rooms);
});

router.post('/', [auth, admin], (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const building = Building.findById(req.body.buildingId);
  if (!building) return res.status(400).send('Invalid building');

  const roomType = RoomType.findById(req.body.roomTypeId);
  if (!roomType) return res.status(400).send('Invalid roomType');

  const room = {
    name: req.body.name,
    building: {
      _id: building._id,
      name: building.name,
    },
    capacity: req.body.capacity,
    roomType: {
      _id: roomType._id,
      name: roomType.name,
    },
  };

  Room.saveRoom(room);
  res.send(room);
});

router.delete('/:id', [auth, admin], (req, res) => {
  const room = Room.findByIdAndRemove(req.params.id);
  if (!room) return res.status(404).send('The room with the given ID was not found.');

  res.send(room);
});

router.get('/:id', [], (req, res) => {
  const room = Room.findById(req.params.id);
  if (!room) return res.status(404).send('The room with the given ID was not found.');
  res.send(room);
});

router.get('/building/:id', [], (req, res) => {
  const building = Building.findById(req.params.id);

  if (!building) return res.status(404).send('The building with the given ID was not found.');

  const rooms = Room.findByBuilding(req.params.id);

  if (!rooms) return res.status(404).send('The room with the given ID was not found.');
  res.send(rooms);
});

module.exports = router;
