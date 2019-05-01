const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Business = mongoose.model(
  'Business',
  new mongoose.Schema({
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
        },
      }),
    },
  }),
);

function validateBusiness(business) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(255)
      .required(),
    buildingId: Joi.objectId().required(),
  };
  return Joi.validate(business, schema);
}

exports.validate = validateBusiness;
exports.Business = Business;
