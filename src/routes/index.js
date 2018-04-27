// const search = require('../server-controllers/search');

const express = require('express');

const router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});

module.exports = router;
