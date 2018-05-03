// Importing modules for file upload

// const upload = require('../server-controllers/upload');

// const master = require('../server-controllers/master');

const express = require('express');

const router = express.Router();

/* Upload file route*/

router.put('/upload', (req, res) => {
  // console.log(req.header);
  setTimeout(() => {
    res.send('respond with a resource');
  }, 3000);
});

module.exports = router;
