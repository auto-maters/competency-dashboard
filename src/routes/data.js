// Importing modules for file upload

const upload = require('../server-controllers/upload');

// const master = require('../server-controllers/master');

const express = require('express');

const router = express.Router();

/* Upload file route*/

router.post('/upload', (req, res) => {
  // console.log(req.header);
  // setTimeout(() => {
  //   res.status(200).json({ status: 'OK' });
  // }, 3000);
  console.log('*******Upload route*******');
  upload.dumpDataIntoTable(req.body).then((result) => {
    if (result.status === 'OK') {
      res.status(200).json({ status: 'OK' });
    }
  });
});

module.exports = router;
