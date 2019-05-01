const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Organisation, validate } = require('../models/organisation');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const organisations = await Organisation.find();
  res.send(organisations);
});

router.post('/', [], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = new Organisation({
    name: req.body.name,
  });

  await organisation.save();
  res.send(organisation);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = await Organisation.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true },
  );

  if (!organisation) return res.status(404).send('The organisation with the given ID was not found.');

  res.send(organisation);
});

module.exports = router;
