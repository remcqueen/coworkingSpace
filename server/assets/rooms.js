const rooms = [
  {
    _id: '5cc61a1fe9b1b24aef41c3dc',
    name: '101',
    building: { _id: '5cc607f264e43048cae8ccc5', name: 'TusParks' },
    capacity: 12,
    roomType: { _id: '5cc60731b8240248a3c1734b', name: 'Presentation' },
  },
  {
    _id: '5cc61a3de9b1b24aef41c3e4',
    name: '102',
    building: { _id: '5cc607f264e43048cae8ccc5', name: 'TusParks' },
    capacity: 6,
    roomType: { _id: '5cc60728b8240248a3c1734a', name: 'Meeting' },
  },
  {
    _id: '5cc61ad9e9b1b24aef41c41e',
    name: '105',
    building: { _id: '5cc607f264e43048cae8ccc5', name: 'TusParks' },
    capacity: 12,
    roomType: { _id: '5cc60737b8240248a3c1734c', name: 'IT' },
  },
  {
    _id: '5cc61b36e9b1b24aef41c432',
    name: '205',
    building: { _id: '5cc607f264e43048cae8ccc5', name: 'TusParks' },
    capacity: 3,
    roomType: { _id: '5cc60750b8240248a3c1734d', name: 'Office' },
  },
  {
    _id: '5cc6195fc3bb0c4ac61cbf1e',
    name: '101',
    building: {
      _id: '5cc6195fc3bb0c4ac61cbf6e',
      name: 'Barclays Eagle Lab Manchester',
    },
    capacity: 12,
    roomType: { _id: '5cc60731b8240248a3c1734b', name: 'Presentation' },
  },
  {
    _id: '5cc6295fc3bb0c4ac61cbf6e',
    name: '102',
    building: {
      _id: '5cc6195fc3bb0c4ac61cbf6e',
      name: 'Barclays Eagle Lab Manchester',
    },
    capacity: 6,
    roomType: { _id: '5cc60728b8240248a3c1734a', name: 'Meeting' },
  },
  {
    _id: '5cc6395fc3bb0c4ac61cbf6e',
    name: '105',
    building: {
      _id: '5cc6195fc3bb0c4ac61cbf6e',
      name: 'Barclays Eagle Lab Manchester',
    },
    capacity: 12,
    roomType: { _id: '5cc60737b8240248a3c1734c', name: 'IT' },
  },
  {
    _id: '5cc6495fc3bb0c4ac61cbf6e',
    name: '205',
    building: {
      _id: '5cc6195fc3bb0c4ac61cbf6e',
      name: 'Barclays Eagle Lab Manchester',
    },
    capacity: 3,
    roomType: { _id: '5cc60750b8240248a3c1734d', name: 'Office' },
  },
  {
    _id: '5cc65a1fe9b1b24aef41c3dc',
    name: '101',
    building: { _id: '5cc38358849f881ed832ae61', name: 'Hoults Yard' },
    capacity: 12,
    roomType: { _id: '5cc60731b8240248a3c1734b', name: 'Presentation' },
  },
  {
    _id: '5cc61a3de9b1b24aef41c3e4',
    name: '102',
    building: { _id: '5cc38358849f881ed832ae61', name: 'Hoults Yard' },
    capacity: 6,
    roomType: { _id: '5cc60728b8240248a3c1734a', name: 'Meeting' },
  },
  {
    _id: '5cc61ad9e9b1b24aef41c41e',
    name: '105',
    building: { _id: '5cc38358849f881ed832ae61', name: 'Hoults Yard' },
    capacity: 12,
    roomType: { _id: '5cc60737b8240248a3c1734c', name: 'IT' },
  },
  {
    _id: '5cc61b36e9b1b24aef41c432',
    name: '205',
    building: { _id: '5cc38358849f881ed832ae61', name: 'Hoults Yard' },
    capacity: 3,
    roomType: { _id: '5cc60750b8240248a3c1734d', name: 'Office' },
  },
];

function findByIdAndRemove(id) {
  const roomInDb = rooms.find(r => r._id === id);
  rooms.splice(rooms.indexOf(roomInDb), 1);
  return roomInDb;
}

function getRooms() {
  return rooms.filter(g => g);
}

function findById(id) {
  return rooms.find(r => r._id === id);
}

function saveRoom(room) {
  const newRoom = {
    _id: Date.now().toString(),
    name: room.name,
    building: {
      _id: room.building._id,
      name: room.building.name,
    },
    capacity: room.capacity,
    roomType: {
      _id: room.roomType._id,
      name: room.roomType.name,
    },
  };
  rooms.push(newRoom);
}

function findByBuilding(buildingId) {
  return rooms.filter(b => b.building._id === buildingId);
}

function findOne({ id, date }) {
  return bookings.find(b => b._id === id && b.date === date);
}

module.exports = {
  getRooms,
  findById,
  saveRoom,
  findByIdAndRemove,
  findByBuilding,
  findOne,
};
