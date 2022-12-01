const express = require('express');
const router = express.Router();

const { verifyUser } = require('../../utils/authenticate');
const { permission } = require('../../middlewares');

const controller = require('../../controllers');
const validate = require('../../validations');

router
  .route('/')
  .get(verifyUser, permission.check('read', 'user'), controller.user.get)
  .post(
    verifyUser,
    permission.check('create', 'user'),
    validate.master.user.onCreate,
    controller.user.create
  );

router
  .route('/:userId')
  .put(
    verifyUser,
    permission.check('update', 'user'),
    validate.master.user.onUpdate,
    controller.user.update
  );

router
  .route('/update-password')
  .post(
    verifyUser,
    permission.check('update', 'password'),
    validate.master.user.onPasswordUpdate,
    controller.user.updatePassword
  );

router
  .route('/switch-status/:userId')
  .post(
    verifyUser,
    permission.check('switch', 'status'),
    controller.user.switchStatus
  );

module.exports = router;
