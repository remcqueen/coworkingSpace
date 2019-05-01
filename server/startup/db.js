const mongoose = require('mongoose');
const config = require('config');

function database() {
  if (config.get('useLocal')) {
    return;
  }
  const db = config.get('db');
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.error(`Could not connect to ${db}...`, err));
}

module.exports = database;
