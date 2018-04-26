const pgp = require('pg-promise')(/*options*/);

const dbURL = process.env.PG_DATABASE_URL;
const db = pgp(dbURL);

module.exports = { pgp, db };
