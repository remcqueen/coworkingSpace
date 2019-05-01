const bookings = [
  {
    _id: '5cc61a5ce9b1b24aef41c3f7',
    room: { _id: '5cc61a1fe9b1b24aef41c3dc', name: '101' },
    building: { _id: '5cc607f264e43048cae8ccc5', name: 'TusParks' },
    user: { _id: '5cc5ec2f812a4721c1a6288b', email: 'JWatt@codebase.com' },
    date: '2019-04-30',
  },
];

function getBookings() {
  return bookings.filter(g => g);
}

function findOne({ id, date }) {
  return bookings.find(b => b._id === id && b.date === date);
}

function saveBooking(booking) {
  const newBooking = {
    _id: Date.now().toString(),
    room: {
      _id: booking.room._id,
      name: booking.room.name,
    },
    building: {
      _id: booking.building._id,
      name: booking.building.name,
    },
    user: {
      _id: booking.user._id,
      email: booking.user.email,
    },
    date: booking.date,
  };
  bookings.push(newBooking);
}

function findByIdAndRemove(id) {
  const bookingInDb = bookings.find(b => b._id === id);
  bookings.splice(bookings.indexOf(bookingInDb), 1);
  return bookingInDb;
}

module.exports = {
  getBookings,
  findOne,
  saveBooking,
  findByIdAndRemove,
};
