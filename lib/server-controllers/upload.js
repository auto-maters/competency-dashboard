'use strict';

var pgp = require('../server-controllers/db').pgp;

var db = require('../server-controllers/db').db;

var dumpDataIntoTable = function dumpDataIntoTable(data) {
  return new Promise(function (resolve) {
    try {
      var cs = '';
      var values = '';
      var query = '';
      var finalQuery = '';
      if (data.typeFile === 'Competency') {
        cs = new pgp.helpers.ColumnSet(['emp_id', 'emp_name', 'emp_comp_name', 'emp_comp_level', 'created_by'], { table: 'emp_comp' });
        values = data.fileData;
        query = pgp.helpers.insert(values, cs);
        finalQuery = query + ' ON CONFLICT ON CONSTRAINT emp_comp_pkey DO NOTHING';
      } else if (data.typeFile === 'Training') {
        cs = new pgp.helpers.ColumnSet(['emp_id', 'emp_name', 'emp_comp_name', 'emp_status', 'created_by'], { table: 'emp_comp_training' });
        values = data.fileData;
        query = pgp.helpers.insert(values, cs);
        var q1 = query + ' ON CONFLICT ON CONSTRAINT emp_comp_training_pkey DO UPDATE SET ';
        var q2 = cs.columns.map(function (x) {
          var col = pgp.as.name(x.name);
          return col + ' = EXCLUDED.' + col;
        }).join();
        finalQuery = '' + q1 + q2;
      }
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