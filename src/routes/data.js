// Importing modules for file upload

const upload = require('../server-controllers/upload');

// const master = require('../server-controllers/master');

const express = require('express');

const router = express.Router();

/* Upload file route*/

router.post('/upload', (req, res) => {
  upload.dumpDataIntoTable(req.body.data).then((result) => {
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
