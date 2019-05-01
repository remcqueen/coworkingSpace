const { Booking, validate } = require("../models/booking");
const { Building } = require("../models/building");
const { User } = require("../models/user");
const { Room } = require("../models/room");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.send(bookings);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let booking = await Booking.findOne({
    "room._id": req.body.roomId,
    date: req.body.date
  });
  if (booking) return res.status(400).send("Room already booked for this day");

  const building = await Building.findById(req.body.buildingId);
  if (!building) return res.status(400).send("Invalid building");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user");

  const room = await Room.findById(req.body.roomId);
  if (!room) return res.status(400).send("Invalid room");

  booking = new Booking({
    room: {
      _id: room._id,
      name: room.name
    },
    building: {
      _id: building._id,
      name: building.name
    },
    user: {
      _id: user._id,
      email: user.email
    },
    date: req.body.date
  });

  await booking.save();
  res.send(booking);

  await booking.save();
});

router.delete("/:id", [auth], async (req, res) => {
  const booking = await Booking.findByIdAndRemove(req.params.id);
  if (!booking)
    return res.status(404).send("The booking with the given ID was not found.");

  res.send(booking);
});

module.exports = router;
