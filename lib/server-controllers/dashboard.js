'use strict';

// const pgp = require('../server-controllers/db').pgp;

var db = require('../server-controllers/db').db;

module.exports = {
  getDashboard: function getDashboard() {
    return new Promise(function (resolve) {
      try {
        db.any('SELECT emp_comp_level, COUNT(emp_comp_name) AS comp_level_count, emp_comp_name FROM emp_comp_updated GROUP BY emp_comp_level, emp_comp_name ORDER BY emp_comp_name;').then(function (data) {
          // success
          console.log('Competency Level count received');
          resolve({ status: 'OK', message: 'Competency Level count fetched successfully', records: data });
        }).catch(function (error) {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'Competency Level count could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
        resolve({ status: 'Failed', message: 'Competency Level count could not be fetched due to some error' });
      }
    });
  }
};