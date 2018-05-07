'use strict';

var pgp = require('../server-controllers/db').pgp;

var db = require('../server-controllers/db').db;

var dumpDataIntoTable = function dumpDataIntoTable(data) {
  return new Promise(function (resolve) {
    try {
      var cs = new pgp.helpers.ColumnSet(['emp_id', 'emp_name', 'emp_comp_name', 'emp_comp_level', 'created_by'], { table: 'emp_comp' });
      // const h = pgp.helpers;
      var values = data;
      var query = pgp.helpers.insert(values, cs);
      var finalQuery = query + ' ON CONFLICT ON CONSTRAINT emp_comp_pkey DO NOTHING';
      db.none(finalQuery).then(function () {
        console.log('Records inserted Successfully');
        resolve({ status: 'OK', message: 'File Uploaded Successfully' });
      }).catch(function (error) {
        console.log('ERROR:', error.message || error); // print the error;
        resolve({ status: 'Failed', message: 'File could not be uploaded', error: error.message });
      });
    } catch (ex) {
      console.log(ex.message);
      resolve({ status: 'Failed', message: 'File could not be uploaded', error: ex.message });
    }
  });
};

module.exports = {
  dumpDataIntoTable: dumpDataIntoTable
};