'use strict';

var pgp = require('../server-controllers/db').pgp;

var db = require('../server-controllers/db').db;

module.exports = {
  get: function get() {
    console.log(pgp, db);
  }
};