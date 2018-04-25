const express = require('express');

const router = express.Router();

/* Upload file route*/

router.get('/upload', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
