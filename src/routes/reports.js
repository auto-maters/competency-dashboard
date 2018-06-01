const search = require('../server-controllers/search');

const express = require('express');

const router = express.Router();

router.get('/getCompetency', (req, res) => {
  search.getCompetencyList().then((result) => {
    if (result.status === 'OK') {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }).catch((e) => {
    res.status(500, {
      error: e,
    });
  });
});

router.get('/getTraining', (req, res) => {
  search.getTrainingList().then((result) => {
    if (result.status === 'OK') {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }).catch((e) => {
    res.status(500, {
      error: e,
    });
  });
});

module.exports = router;
