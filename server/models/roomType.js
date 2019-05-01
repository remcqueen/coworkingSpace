const Joi = require("joi");
const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const RoomType = mongoose.model("RoomType", roomTypeSchema);

function validateRoomType(roomType) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
  };

  return Joi.validate(roomType, schema);
}

exports.roomTypeSchema = roomTypeSchema;
exports.RoomType = RoomType;
exports.validate = validateRoomType;
