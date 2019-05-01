const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { validate, User } = require('../models/user');
const { Business } = require('../models/business');
const { Building } = require('../models/building');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const express = require('express');

const router = express.Router();

router.get('/:id', [], async (req, res) => {
  const users_buildings = await User.aggregate([
    {
      $lookup: {
        from: 'businesses',
        localField: 'business._id',
        foreignField: '_id',
        as: 'user_building',
      },
    },
    { $unwind: '$user_building' },

    {
      $match: {
        'user_building.building._id': ObjectId(req.params.id),
      },
    },

    {
      $project: {
        _id: 1,
        fName: 1,
        sName: 1,
        email: 1,
        business: 1,
      },
    },
  ]);

  res.send(users_buildings);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  const business = await Business.findById(req.body.businessId);
  if (!business) return res.status(400).send('Business is required');

  user = new User({
    fName: req.body.fName,
    sName: req.body.sName,
    email: req.body.email,
    password: req.body.password,
    business: {
      _id: business._id,
      name: business.name,
    },
  });

  await Building.findById(business.building._id).update({
    $inc: { occupants: +1 },
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.send({ token });
});

router.get('/from/:id', [auth], async (req, res) => {
  const users = await User.find({ 'business._id': req.params.id }).select('-password');
  res.send(users);
});

module.exports = router;
