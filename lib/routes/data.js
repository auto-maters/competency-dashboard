'use strict';

// Importing modules for file upload

var upload = require('../server-controllers/upload');

// const master = require('../server-controllers/master');

var express = require('express');

var router = express.Router();

/* Upload file route*/

router.post('/upload', function (req, res) {
  // console.log(req.header);
  // setTimeout(() => {
  //   res.status(200).json({ status: 'OK' });
  // }, 3000);
  console.log('*******Upload route*******');
  upload.dumpDataIntoTable(req.body).then(function (result) {
    if (result.status === 'OK') {
      res.status(200).json({ status: 'OK' });
    }
  });
});

module.exports = router;