'use strict';

var pgp = require('../server-controllers/db').pgp;

var db = require('../server-controllers/db').db;

var dumpDataIntoTable = function dumpDataIntoTable(data) {
  return new Promise(function (resolve) {
    var cs = new pgp.helpers.ColumnSet(['emp_id', 'emp_name', 'emp_comp_name', 'emp_comp_level', 'emp_comp_date'], { table: 'buit_emp_comp' });
    // const h = pgp.helpers;
    var values = data;
    var query = pgp.helpers.insert(values, cs);
    var finalQuery = query + ' ON CONFLICT ON CONSTRAINT buit_emp_comp_pkey DO NOTHING';
    db.none(finalQuery).then(function () {
      resolve({ status: 'OK', message: 'File Uploaded Successfully' });
    }).catch(function (error) {
      console.log('ERROR:', error.message || error); // print the error;
      resolve({ status: 'Failed', message: 'File could not be uploaded' });
    });
  });
};

module.exports = {
  dumpDataIntoTable: dumpDataIntoTable
};