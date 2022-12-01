const Joi = require('joi');
const { logger, response } = require('../../utils');
const { getJoiErrorMessage } = require('../../utils/helper');

const {
  firstName,
  lastName,
  email,
  password,
  oldPassword,
  newPassword,
  profilePic,
  roleId,
} = require('../schemas/user.schema');

module.exports = {
  onCreate: (req, res, next) => {
    try {
      const schema = Joi.object({
        firstName,
        lastName,
        email,
        password,
        profilePic,
        roleId,
      });

      const { error } = schema.validate(req.body);

      if (error) {
        throw Error(getJoiErrorMessage(error));
      } else {
        next();
      }
    } catch (err) {
      logger.error(err.message);
      response.error(res, err.message, 400);
    }
  },
  onPasswordUpdate: (req, res, next) => {
    try {
      const schema = Joi.object({
        oldPassword,
        newPassword,
      });

      const { error } = schema.validate(req.body);

      if (error) {
        throw Error(getJoiErrorMessage(error));
      } else {
        next();
      }
    } catch (err) {
      logger.error(err.message);
      response.error(res, err.message);
    }
  },
  onUpdate: (req, res, next) => {
    try {
      const schema = Joi.object({
        firstName,
        lastName,
        email,
        profilePic,
        roleId,
      });

      const { error } = schema.validate(req.body);

      if (error) {
        throw Error(getJoiErrorMessage(error));
      } else {
        next();
      }
    } catch (err) {
      logger.error(err.message);
      response.error(res, err.message);
    }
  },
};
