const mongoose = require("mongoose");
const express = require("express");
const { Business, validate } = require("../models/business");
const { Building } = require("../models/building");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const business = await Business.find({ name: { $ne: "Visitors" } }).sort(
    "name"
  );
  res.send(business);
});

router.post("/", [], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const building = await Building.findById(req.body.buildingId);

  const business = new Business({
    name: req.body.name,
    building: {
      _id: building._id,
      name: building.name
    }
  });

  await Building.findById(building._id).update({
    $inc: { businesses: +1 }
  });

  business.save();

  res.send(business);
});

router.delete("/:id", [auth], async (req, res) => {
  const business = await Business.findByIdAndDelete(req.params.id);
  if (!business)
    return res
      .status(404)
      .send("The business with the given ID was not found.");

  const building = await Building.findById(business.building._id).update(
    ({ total: { $gte: 1 } }, { $inc: { total: -1 } })
  );

  res.send(business);
});

router.get("/:id", [], async (req, res) => {
  const businesses = await Business.find({ "building._id": req.params.id });
  if (!businesses)
    return res
      .status(404)
      .send("The businesses with the given building ID were not found.");
  res.send(businesses);
});

module.exports = router;
