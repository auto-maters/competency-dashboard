'use strict';

var dashboard = require('../server-controllers/dashboard');

var express = require('express');

var router = express.Router();

router.get('/getDashboardData', function (req, res) {
  dashboard.getDashboard(req.body).then(function (result) {
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