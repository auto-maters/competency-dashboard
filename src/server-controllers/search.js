// const pgp = require('../server-controllers/db').pgp;

const db = require('../server-controllers/db').db;

module.exports = {
  getCompetencyList: () => {
    return new Promise((resolve) => {
      try {
        db.any('SELECT DISTINCT(comp_name), comp_group FROM competency;')
        .then((data) => {
          // success
          console.log('Competency list recieved');
          resolve({ status: 'OK', message: 'Competency list fetched successfully', records: data });
        })
        .catch((error) => {
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

  getTrainingList: () => {
    return new Promise((resolve) => {
      try {
        db.any('SELECT DISTINCT(training_name) FROM training;')
        .then((data) => {
          // success
          console.log('Training list recieved');
          resolve({ status: 'OK', message: 'Training list fetched successfully', records: data });
        })
        .catch((error) => {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'Training list could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
        resolve({ status: 'Failed', message: 'Training list could not be fetched due to some error' });
      }
    });
  },
};
