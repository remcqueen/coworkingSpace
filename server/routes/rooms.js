const { Room, validate } = require('../models/room');
const { Building } = require('../models/building');
const { RoomType } = require('../models/roomType');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const building = await Building.findById(req.body.buildingId);
  if (!building) return res.status(400).send('Invalid building');

  const roomType = await RoomType.findById(req.body.roomTypeId);
  if (!roomType) return res.status(400).send('Invalid roomType');

  const room = new Room({
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
  });
  await room.save();
  res.send(room);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const room = await Room.findByIdAndRemove(req.params.id);
  if (!room) return res.status(404).send('The room with the given ID was not found.');

  res.send(room);
});

router.get('/:id', [], async (req, res) => {
  const room = await Room.findById(req.params.id, {
    new: true,
  });
  if (!room) return res.status(404).send('The room with the given ID was not found.');
  res.send(room);
});

router.get('/building/:id', [], async (req, res) => {
  const building = await Building.findById(req.params.id, {
    new: true,
  });

  if (!building) return res.status(404).send('The building with the given ID was not found.');

  const rooms = await Room.find({
    'building._id': req.params.id,
  });

  if (!rooms) return res.status(404).send('The room with the given ID was not found.');
  res.send(rooms);
});

module.exports = router;
