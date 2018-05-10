'use strict';

// const pgp = require('../server-controllers/db').pgp;

var db = require('../server-controllers/db').db;

module.exports = {
  getCompetencyList: function getCompetencyList() {
    return new Promise(function (resolve) {
      try {
        db.any('SELECT DISTINCT(comp_name) FROM competency;').then(function (data) {
          // success
          console.log('Competency list recieved');
          resolve({ status: 'OK', message: 'Competency list fetched successfully', records: data });
        }).catch(function (error) {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'Competency list could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
        resolve({ status: 'Failed', message: 'Competency list could not be fetched due to some error' });
      }
    });
  }
};