const express = require('express');
const { validate } = require('../models/business');
const Business = require('../assets/businesses');
const Building = require('../assets/buildings');

const router = express.Router();

router.get('/', (req, res) => {
  const business = Business.getBusinesses();
  res.send(business);
});

router.post('/', [], (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const building = Building.findById(req.body.buildingId);

  const business = {
    name: req.body.name,
    building: {
      _id: building._id,
      name: building.name,
    },
  };

  Business.saveBusiness(business);
  Building.increaseBusinesses(building);

  res.send(business);
});

router.get('/:id', [], (req, res) => {
  const businesses = Business.find(req.params.id);
  if (!businesses) return res.status(404).send('The businesses with the given building ID were not found.');
  res.send(businesses);
});

module.exports = router;
