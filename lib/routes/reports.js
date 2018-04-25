'use strict';

var express = require('express');

var router = express.Router();

/* GET reports page. */

router.get('/search', function (req, res) {
  res.send('respond with a report');
});

module.exports = router;