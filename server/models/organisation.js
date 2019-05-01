const mongoose = require("mongoose");
const Joi = require("joi");

const Organisation = mongoose.model(
  "Organisation",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    }
  })
);

function validateSite(site) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(255)
      .required()
  };
  return Joi.validate(site, schema);
}

exports.validate = validateSite;
exports.Organisation = Organisation;
