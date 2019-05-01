const businesses = [
  {
    _id: '5cc33d9378f83c17a29786b9',
    name: 'Management',
    building: { _id: '5cc607f264e43048cae8ccc5', name: 'TusParks' },
  },
  {
    _id: '5cc61974c3bb0c4ac61cbf72',
    name: 'Codebase',
    building: { _id: '5cc607f264e43048cae8ccc5', name: 'TusParks' },
  },
  {
    _id: '5cc6088163c6b748d82e5139',
    name: 'Fibrewear',
    building: { _id: '5cc6195fc3bb0c4ac61cbf6e', name: 'Barclays Eagle Lab Manchester' },
  },
  {
    _id: '5cc7088163c6b748d82e5139',
    name: 'Hasbro',
    building: { _id: '5cc38358849f881ed832ae61', name: 'Hoults Yard' },
  },
];

function getBusinesses() {
  return businesses.filter(g => g);
}

function findById(id) {
  return businesses.find(b => b._id === id);
}

function saveBusiness(business) {
  const newBusiness = {
    _id: Date.now().toString(),
    name: business.name,
    building: {
      _id: business.building._id,
      name: business.building.name,
    },
  };
  businesses.push(newBusiness);
}

function find(buildingId) {
  return businesses.filter(b => b.building._id === buildingId);
}

module.exports = {
  getBusinesses,
  findById,
  saveBusiness,
  find,
};
