const organisations = [
  { _id: '5b21ca3eeb7f6fbccd471818', name: 'Eagle Labs' },
  { _id: '5b21ca3eeb7f6fbccd471814', name: 'Hoults' },
];

function getOrganisations() {
  return organisations.filter(g => g);
}

function findById(id) {
  return organisations.find(o => o._id === id);
}

function saveOrganisation(organisation) {
  const newOrganisation = {
    _id: Date.now().toString(),
    name: organisation.name,
  };
  organisations.push(newOrganisation);
}

module.exports = { getOrganisations, findById, saveOrganisation };
