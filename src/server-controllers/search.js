const pgp = require('../server-controllers/db').pgp;

const db = require('../server-controllers/db').db;

module.exports = {
  get: () => {
    console.log(pgp, db);
  },
};
