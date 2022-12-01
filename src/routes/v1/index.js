const express = require('express');
const router = express.Router();

const test = require('./test.route');
const auth = require('./auth.route');
const user = require('./user.route');

router.use('/test', test);
router.use('/auth', auth);
router.use('/user', user);

module.exports = router;
