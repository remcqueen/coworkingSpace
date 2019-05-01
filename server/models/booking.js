const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    room: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true
        }
      })
    },
    building: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true
        }
      })
    },
    user: {
      type: new mongoose.Schema({
        email: {
          type: String,
          required: true
        }
      })
    },
    date: {
      type: String,
      required: true
    }
  })
);

function validateBooking(booking) {
  const schema = {
    roomId: Joi.objectId().required(),
    buildingId: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    date: Joi.string().required()
  };
  return Joi.validate(booking, schema);
}

exports.validate = validateBooking;
exports.Booking = Booking;
