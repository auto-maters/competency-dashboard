// const pgp = require('../server-controllers/db').pgp;

const db = require('../server-controllers/db').db;

module.exports = {
  getDashboard: () => {
    return new Promise((resolve) => {
      try {
        db.task('get-everything', (t) => {
          return t.batch([
            t.any('SELECT A.emp_comp_name, B.comp_group, A.emp_comp_level, COUNT(A.emp_comp_name) AS comp_level_count FROM emp_comp AS A INNER JOIN competency AS B ON A.emp_comp_name = B.comp_name GROUP BY A.emp_comp_level, A.emp_comp_name, B.comp_group ORDER BY A.emp_comp_name'),
            t.any('SELECT emp_comp_name, COUNT(emp_id) AS emp_count FROM emp_comp_training  GROUP BY emp_comp_name ORDER BY emp_comp_name', ['Yes']),
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
