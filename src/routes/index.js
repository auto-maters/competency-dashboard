const dashboard = require('../server-controllers/dashboard');

const express = require('express');

const router = express.Router();

router.get('/getDashboardData', (req, res) => {
  dashboard.getDashboard(req.body).then((result) => {
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
