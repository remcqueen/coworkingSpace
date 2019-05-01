const roomTypes = [
  { _id: '5cc60728b8240248a3c1734a', name: 'Meeting' },
  { _id: '5cc60731b8240248a3c1734b', name: 'Presentation' },
  { _id: '5cc60737b8240248a3c1734c', name: 'IT' },
  { _id: '5cc60750b8240248a3c1734d', name: 'Office' },
  { _id: '5cc60758b8240248a3c1734e', name: 'Desk' },
];

function getRoomTypes() {
  return roomTypes.filter(g => g);
}

function findById(id) {
  return roomTypes.find(r => r._id === id);
}

module.exports = { getRoomTypes, findById };
