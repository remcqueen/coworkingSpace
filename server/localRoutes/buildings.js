const express = require('express');
const { validate } = require('../models/building');
const auth = require('../middleware/auth');
const Organisation = require('../assets/organisations');
const Building = require('../assets/buildings');
const Business = require('../assets/businesses');

const router = express.Router();

router.get('/', (req, res) => {
  const buildings = Building.getBuildings();

  res.send(buildings);
});

router.post('/', [auth], (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = Organisation.findById(req.body.organisationId);
  if (!organisation) return res.status(400).send('Invalid organisation');

  const building = {
    name: req.body.name,
    address: req.body.address,
    postcode: req.body.postcode,
    organisation: {
      _id: organisation._id,
      name: organisation.name,
    },
  };

  Building.saveBuilding(building);
  res.send(building);
});

router.put('/:id', [auth], (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = Organisation.findById(req.body.organisationId);
  if (!organisation) return res.status(400).send('Invalid Organisation.');

  let building = {
    _id: req.params.id,
    name: req.body.name,
    address: req.body.address,
    postcode: req.body.postcode,
    organisation: {
      _id: organisation._id,
      name: organisation.name,
    },
  };
  building = Building.updateBuilding(building);

  if (!building) return res.status(404).send('The building with the given ID was not found.');

  res.send(building);
});

router.delete('/:id', [auth], (req, res) => {
  const building = Building.findByIdAndRemove(req.params.id);
  if (!building) return res.status(404).send('The building with the given ID was not found.');

  res.send(building);
});

router.get('/:id', [], (req, res) => {
  const building = Building.findById(req.params.id);

  if (!building) return res.status(404).send('The building with the given ID was not found.');

  res.send(building);
});

router.get('/from/:id', [], (req, res) => {
  const business = Business.findById(req.params.id);
  if (!business) return res.status(404).send('Invlaid businessId');

  const building = Building.findById(business.building._id);
  if (!building) return res.status(404).send('Building not found.');
  res.send(building);
});
module.exports = router;
