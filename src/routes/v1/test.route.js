const express = require('express');
const router = express.Router();

router.route('/').get((req, res, next) => {
  res.send('Test route');
});

module.exports = router;
