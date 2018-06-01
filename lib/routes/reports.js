'use strict';

var search = require('../server-controllers/search');

var express = require('express');

var router = express.Router();

router.get('/getCompetency', function (req, res) {
  search.getCompetencyList().then(function (result) {
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

router.get('/getTraining', function (req, res) {
  search.getTrainingList().then(function (result) {
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