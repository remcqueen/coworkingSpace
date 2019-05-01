const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Building = mongoose.model(
  "Building",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    address: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    postcode: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 8
    },
    organisation: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true
        }
      })
    },
    businesses: {
      type: Number,
      default: 0
    },
    occupants: {
      type: Number,
      default: 0
    }
  })
);

function validateBuilding(building) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    address: Joi.string()
      .min(1)
      .max(255)
      .required(),
    postcode: Joi.string()
      .min(6)
      .max(8)
      .required(),
    organisationId: Joi.objectId().required(),
    businesses: Joi.number(),
    occupants: Joi.number()
  };
  return Joi.validate(building, schema);
}

exports.validate = validateBuilding;
exports.Building = Building;
