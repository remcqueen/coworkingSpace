const { Building, validate } = require("../models/building");
const { Organisation } = require("../models/organisation");
const { Business } = require("../models/business");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const buildings = await Building.aggregate([
    {
      $lookup: {
        from: "businesses",
        localField: "_id",
        foreignField: "building._id",
        as: "businessList"
      }
    }
  ]);
  res.send(buildings);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = await Organisation.findById(req.body.organisationId);
  if (!organisation) return res.status(400).send("Invalid organisation");

  const building = new Building({
    name: req.body.name,
    address: req.body.address,
    postcode: req.body.postcode,
    organisation: {
      _id: organisation._id,
      name: organisation.name
    }
  });

  await building.save();
  res.send(building);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const organisation = await Organisation.findById(req.body.organisationId);
  if (!organisation) return res.status(400).send("Invalid Organisation.");

  const building = await Building.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      address: req.body.address,
      postcode: req.body.postcode,
      organisation: {
        _id: organisation._id,
        name: organisation.name
      }
    },
    { new: true }
  );

  if (!building)
    return res
      .status(404)
      .send("The building with the given ID was not found.");

  res.send(building);
});

router.delete("/:id", [auth], async (req, res) => {
  const building = await Building.findByIdAndRemove(req.params.id);
  if (!building)
    return res
      .status(404)
      .send("The building with the given ID was not found.");

  res.send(building);
});

router.get("/:id", [], async (req, res) => {
  const building = await Building.findById(req.params.id);

  if (!building)
    return res
      .status(404)
      .send("The building with the given ID was not found.");

  res.send(building);
});

router.get("/from/:id", [], async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (!business) return res.status(404).send("Invlaid businessId");

  const building = await Building.findById(business.building._id);
  if (!building) return res.status(404).send("Building not found.");
  res.send(building);
});
module.exports = router;
