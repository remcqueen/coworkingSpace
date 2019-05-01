const express = require('express');
const RoomType = require('../assets/roomTypes');

const router = express.Router();

router.get('/', (req, res) => {
  const roomTypes = RoomType.getRoomTypes();
  res.send(roomTypes);
});

module.exports = router;
