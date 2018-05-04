const pgp = require('../server-controllers/db').pgp;

const db = require('../server-controllers/db').db;

const dumpDataIntoTable = function dumpDataIntoTable(data) {
  return new Promise((resolve) => {
    const cs = new pgp.helpers.ColumnSet(['emp_id', 'emp_name', 'emp_comp_name', 'emp_comp_level', 'emp_comp_date'], { table: 'buit_emp_comp' });
    // const h = pgp.helpers;
    const values = data;
    const query = pgp.helpers.insert(values, cs);
    const finalQuery = `${query} ON CONFLICT ON CONSTRAINT buit_emp_comp_pkey DO NOTHING`;
    db.none(finalQuery)
    .then(() => {
      resolve({ status: 'OK', message: 'File Uploaded Successfully' });
    })
    .catch((error) => {
      console.log('ERROR:', error.message || error); // print the error;
      resolve({ status: 'Failed', message: 'File could not be uploaded' });
    });
  });
};

module.exports = {
  dumpDataIntoTable,
};
