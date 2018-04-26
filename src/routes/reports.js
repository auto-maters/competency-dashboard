// const search = require('../server-controllers/search');

const express = require('express');

const router = express.Router();

/* GET reports page. */

router.get('/search', (req, res) => {
  res.send('respond with a report');
});

module.exports = router;
