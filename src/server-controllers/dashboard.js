// const pgp = require('../server-controllers/db').pgp;

const db = require('../server-controllers/db').db;

module.exports = {
  getDashboard: () => {
    return new Promise((resolve) => {
      try {
        db.task('get-everything', (t) => {
          return t.batch([
            t.any('SELECT emp_comp_level, COUNT(emp_comp_name) AS comp_level_count, emp_comp_name FROM emp_comp_updated GROUP BY emp_comp_level, emp_comp_name ORDER BY emp_comp_name'),
            t.any('SELECT emp_comp_name, COUNT(emp_id) AS emp_count FROM emp_comp_training WHERE emp_status=$1 GROUP BY emp_comp_name ORDER BY emp_comp_name', ['Yes']),
          ]);
        })
        .then((data) => {
          console.log('Competency Level Training count received');
          resolve({ status: 'OK', message: 'Competency Level count fetched successfully', records: data });
        })
        .catch((error) => {
          // error
          console.log(error);
          resolve({ status: 'Failed', message: 'Count could not be fetched due to some error' });
        });
      } catch (ex) {
        console.log(ex.message);
        resolve({ status: 'Failed', message: 'Count could not be fetched due to some error' });
      }
    });
  },
};
