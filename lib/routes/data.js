'use strict';

// Importing modules for file upload

// const upload = require('../server-controllers/upload');

// const master = require('../server-controllers/master');

var express = require('express');

var router = express.Router();

/* Upload file route*/

router.put('/upload', function (req, res) {
  // console.log(req.header);
  setTimeout(function () {
    res.send('respond with a resource');
  }, 3000);
});

module.exports = router;