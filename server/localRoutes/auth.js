const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../assets/users');

const router = express.Router();

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required(),
  };

  return Joi.validate(req, schema);
}

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      fName: user.fName,
      sName: user.sName,
      email: user.email,
      isAdmin: user.isAdmin,
      businessId: user.business._id,
    },
    config.get('jwtPrivateKey'),
  );
  return token;
}

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = User.getUser({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = generateAuthToken(user);
  res.send({ token });
});

module.exports = router;
