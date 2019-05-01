const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  sName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  business: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
      },
    }),
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      fName: this.fName,
      sName: this.sName,
      email: this.email,
      isAdmin: this.isAdmin,
      businessId: this.business._id,
    },
    config.get('jwtPrivateKey'),
  );
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    fName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    sName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    email: Joi.string()
      .min(1)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required(),
    businessId: Joi.objectId().required(),
  };

  return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;
