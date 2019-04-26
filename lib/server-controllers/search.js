'use strict';

// const pgp = require('../server-controllers/db').pgp;

var db = require('../server-controllers/db').db;

module.exports = {
  getCompetencyList: function getCompetencyList() {
    return new Promise(function (resolve) {
      try {
        db.any('SELECT DISTINCT(comp_name), comp_group FROM competency;').then(function (data) {
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
  },
  dbSelectQryExecute: function dbSelectQryExecute(Qry) {
    return new Promise(function (resolve, reject) {
      try {
        db.any(Qry).then(function (data) {
          console.log('Select list recieved');
          resolve({ status: 'OK', message: 'Select list fetched successfully', records: data });
        }).catch(function (err) {
          console.log(err);
          resolve({ status: 'Failed', message: 'Select Qry   could not be fetched data due to some error -' + err });
        });
      } catch (err) {
        reject({ status: 'Failed', message: 'Qry  could not be fetched data due to some error -' + err });
      }
    });
  },

  getTrainingList: function getTrainingList() {
    return new Promise(function (resolve) {
      try {
        db.any('SELECT DISTINCT(training_name) FROM training;').then(function (data) {
          // success
          console.log('Training list recieved');
          resolve({ status: 'OK', message: 'Training list fetched successfully', records: data });
        }).catch(function (error) {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'Training list could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
        resolve({ status: 'Failed', message: 'Training list could not be fetched due to some error' });
      }
    });
  }
};