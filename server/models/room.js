const mongoose = require('mongoose');
const Joi = require('joi');
const { roomTypeSchema } = require('./roomType');
Joi.objectId = require('joi-objectid')(Joi);

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  building: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
      },
    }),
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  roomType: {
    type: roomTypeSchema,
    required: true,
  },
});

// Room types include: meeting, office, presentation, IT

const Room = mongoose.model('Room', roomSchema);

function validateRoom(room) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    buildingId: Joi.objectId().required(),
    capacity: Joi.string().required(),
    roomTypeId: Joi.objectId().required(),
  };
  return Joi.validate(room, schema);
}

exports.validate = validateRoom;
exports.Room = Room;
