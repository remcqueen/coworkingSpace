const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { RoomType, validate } = require('../models/roomType');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const roomTypes = await RoomType.find()
    .select('-__v')
    .sort('name');
  res.send(roomTypes);
});

router.post('/', [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let roomTypes = new RoomType({ name: req.body.name });
  roomTypes = await roomTypes.save();

  res.send(roomTypes);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const roomType = await RoomType.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    },
  );

  if (!roomType) return res.status(404).send('The roomType with the given ID was not found.');

  res.send(roomType);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const roomType = await RoomType.findByIdAndRemove(req.params.id);

  if (!roomType) return res.status(404).send('The roomType with the given ID was not found.');

  res.send(roomType);
});

router.get('/:id', [], async (req, res) => {
  const roomType = await RoomType.findById(req.params.id).select('-__v');

  if (!roomType) return res.status(404).send('The roomType with the given ID was not found.');

  res.send(roomType);
});

module.exports = router;
