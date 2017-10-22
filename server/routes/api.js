const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Api listening on port 3000');
});

module.exports = router;
