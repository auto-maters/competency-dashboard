'use strict';

// Importing modules for file upload

// const upload = require('../server-controllers/upload');

// const master = require('../server-controllers/master');

var express = require('express');

var router = express.Router();

/* Upload file route*/

router.get('/upload', function (req, res) {
  res.send('respond with a resource');
});

module.exports = router;