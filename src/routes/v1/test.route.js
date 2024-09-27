const express = require('express');
const router = express.Router();

const { test } = require('../../controllers');

router.route('/').get(test.test);

module.exports = router;
