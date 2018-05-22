const pgp = require('../server-controllers/db').pgp;

const db = require('../server-controllers/db').db;

const cs = new pgp.helpers.ColumnSet(['emp_id', 'emp_name', 'emp_comp_name', 'emp_comp_level', 'created_by']);

const dumpDataIntoTable = function dumpDataIntoTable(data) {
  return new Promise((resolve) => {
    try {
      let finalQuery;
      if (data.typeFile === 'Competency') {
        finalQuery = pgp.helpers.insert(data.fileData, cs, 'emp_comp') + 
                     ' ON CONFLICT ON CONSTRAINT emp_comp_pkey DO NOTHING';
      } else if (data.typeFile === 'Training') {
        finalQuery = pgp.helpers.insert(data.fileData, cs, 'emp_comp_training') +
                ' ON CONFLICT ON CONSTRAINT emp_comp_training_pkey DO UPDATE SET ' +
                cs.assignColumns({from: 'EXCLUDED');
      }
      db.none(finalQuery)
      .then(() => {
        console.log('Records inserted Successfully');
        resolve({ status: 'OK', message: 'File Uploaded Successfully' });
      })
      .catch((error) => {
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
  dumpDataIntoTable,
};
