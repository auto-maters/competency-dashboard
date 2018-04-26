'use strict';

var pgp = require('pg-promise')();

var dbURL = process.env.PG_DATABASE_URL;
var db = pgp(dbURL);

module.exports = { pgp: pgp, db: db };