// const pgp = require('../server-controllers/db').pgp;

const db = require('../server-controllers/db').db;

module.exports = {
  getCompetencyList: () => {
    return new Promise((resolve) => {
      try {
        db.any('SELECT DISTINCT(comp_name) FROM competency;')
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
};
