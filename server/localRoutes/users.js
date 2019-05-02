const express = require("express");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("../models/user");
const User = require("../assets/users");
const Business = require("../assets/businesses");
const Building = require("../assets/buildings");

const router = express.Router();

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      fName: user.fName,
      sName: user.sName,
      email: user.email,
      isAdmin: user.isAdmin,
      businessId: user.business._id
    },
    config.get("jwtPrivateKey")
  );
  return token;
}

router.get("/:id", [], (req, res) => {
  const businesses = Business.getBusinesses();
  const users = User.getUsers();
  const userBuilding = [];

  businesses.map(business => {
    users.map(user => {
      if (
        business._id === user.business._id &&
        business.building._id === req.params.id
      ) {
        userBuilding.push(user);
      }
    });
  });

  res.send(userBuilding);
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.getUser({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const business = Business.findById(req.body.businessId);
  if (!business) return res.status(400).send("Business is required");

  const salt = bcrypt.genSalt(10);
  const password = bcrypt.hash(req.body.password, salt);

  user = {
    fName: req.body.fName,
    sName: req.body.sName,
    email: req.body.email,
    password: password,
    business: {
      _id: business._id,
      name: business.name
    }
  };

  User.saveUser(user);

  const building = Building.findById(business.building._id);

  Building.increaseOccupants(building);

  const token = generateAuthToken(user);
  res.send({ token });
});

module.exports = router;
