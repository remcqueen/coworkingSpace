const buildings = [
  {
    _id: "5cc607f264e43048cae8ccc5",
    name: "TusParks",
    businesses: 2,
    occupants: 5,
    address: "Maybrook House, Grainger Street, Newcastle upon Tyne",
    postcode: "NE1 5JE",
    organisation: { _id: "5b21ca3eeb7f6fbccd471818", name: "Eagle Labs" }
  },
  {
    _id: "5cc6195fc3bb0c4ac61cbf6e",
    businesses: 3,
    occupants: 4,
    name: "Barclays Eagle Lab Manchester",
    address: "Union, Albert Square, Manchester , United Kingdom",
    postcode: "M2 6LW",
    organisation: { _id: "5b21ca3eeb7f6fbccd471818", name: "Eagle Labs" }
  },
  {
    _id: "5cc38358849f881ed832ae61",
    businesses: 1,
    occupants: 3,
    name: "Hoults Yard",
    address: "Walker Rd, Newcastle upon Tyne , UK",
    postcode: "NE6 2HL",
    organisation: { _id: "5b21ca3eeb7f6fbccd471814", name: "Hoults" },
    __v: 0
  }
];

function findByIdAndRemove(id) {
  const buildingInDb = buildings.find(b => b._id === id);
  buildings.splice(buildings.indexOf(buildingInDb), 1);
  return buildingInDb;
}

function getBuildings() {
  return buildings.filter(g => g);
}

function findById(id) {
  return buildings.find(b => b._id === id);
}

function saveBuilding(building) {
  const newBuilding = {
    _id: Date.now().toString(),
    businesses: 0,
    occupants: 0,
    name: building.name,
    address: building.address,
    postcode: building.postcode,
    organisation: {
      _id: building.organisation._id,
      name: building.organisation.name
    }
  };
  buildings.push(newBuilding);
}

function updateBuilding(building) {
  const build = findById(building._id);
  const { occupants } = build;
  const { businesses } = build;
  findByIdAndRemove(building._id);
  const newBuilding = {
    _id: building._id,
    occupants,
    businesses,
    name: building.name,
    address: building.address,
    postcode: building.postcode,
    organisation: {
      _id: building.organisation._id,
      name: building.organisation.name
    }
  };
  buildings.push(newBuilding);
  return newBuilding;
}

function increaseBusinesses(building) {
  const build = findById(building._id);
  const { occupants } = build;
  let { businesses } = build;
  businesses += 1;
  findByIdAndRemove(building._id);
  const newBuilding = {
    _id: building._id,
    occupants,
    businesses,
    name: building.name,
    address: building.address,
    postcode: building.postcode,
    organisation: {
      _id: building.organisation._id,
      name: building.organisation.name
    }
  };
  buildings.push(newBuilding);
  return newBuilding;
}

function increaseOccupants(building) {
  const build = findById(building._id);
  let { occupants } = build;
  const { businesses } = build;
  occupants += 1;
  findByIdAndRemove(building._id);
  const newBuilding = {
    _id: building._id,
    occupants,
    businesses,
    name: building.name,
    address: building.address,
    postcode: building.postcode,
    organisation: {
      _id: building.organisation._id,
      name: building.organisation.name
    }
  };
  buildings.push(newBuilding);
  return newBuilding;
}

module.exports = {
  getBuildings,
  findById,
  saveBuilding,
  updateBuilding,
  findByIdAndRemove,
  increaseBusinesses,
  increaseOccupants
};
