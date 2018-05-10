'use strict';

// Importing modules for file upload

var upload = require('../server-controllers/upload');

// const master = require('../server-controllers/master');

var express = require('express');

var router = express.Router();

/* Upload file route*/

router.post('/upload', function (req, res) {
  upload.dumpDataIntoTable(req.body.data).then(function (result) {
    if (result.status === 'OK') {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }).catch(function (e) {
    res.status(500, {
      error: e
    });
  });
});

module.exports = router;