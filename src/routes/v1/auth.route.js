const express = require('express');
const passport = require('passport');
const router = express.Router();

const logic = require('../../logic/auth');
const controller = require('../../controllers');
const { verifyUser } = require('../../utils/authenticate');

router
  .route('/login')
  .post(
    logic.beforeLogin,
    passport.authenticate('local'),
    controller.auth.login
  );

router.route('/refreshToken').post(controller.auth.refreshToken);

router.route('/me').get(verifyUser, controller.auth.me);

module.exports = router;
