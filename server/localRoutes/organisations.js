const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { validate } = require('../models/organisation');
const Organisation = require('../assets/organisations');

const router = express.Router();

router.get('/', (req, res) => {
  const organisations = Organisation.getOrganisations();
  res.send(organisations);
});

router.post('/', [auth, admin], (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = {
    name: req.body.name,
  };

  Organisation.saveOrganisation(organisation);
  res.send(organisation);
});

module.exports = router;
