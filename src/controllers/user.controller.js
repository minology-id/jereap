const bcrypt = require('bcryptjs');
const { user } = require('../models/master');
const { response, logger } = require('../utils');
const { parseMySQLError, parseSequelizeQuery } = require('../utils/helper');

let userFields = [];
for (let key in user.getAttributes()) {
  userFields.push(key);
}
userFields = userFields.filter((field) => field.toLowerCase() !== 'password');

module.exports = {
  get: async (req, res) => {
    try {
      const { data, count } = parseSequelizeQuery({
        model: user,
        query: req.query,
        excludes: [
          'password',
          'profilePic',
          'lastChangePassword',
          'createdAt',
          'updatedAt',
        ],
        defaultSort: 'userId',
      });

      response.success(res, await data, await count);
    } catch (error) {
      const ERROR_MSG = parseMySQLError(error);

      logger.error(ERROR_MSG);
      response.error(res, ERROR_MSG);
    }
  },
  create: async (req, res) => {
    try {
      // const {userId} = req.user
      const { firstName, lastName, email, password, roleId } = req.body;

      const newUser = await user.create({
        firstName,
        lastName,
        email,
        roleId,
        password: bcrypt.hashSync(password, 12),
        lastChangePassword: Date.now(),
        createdAt: Date.now(),
        // createdBy: userId,
        updatedAt: null,
      });

      response.success(res, newUser);
    } catch (error) {
      const ERROR_MSG = parseMySQLError(error);

      logger.error(ERROR_MSG);
      response.error(res, ERROR_MSG);
    }
  },
  update: async (req, res) => {
    try {
      const { userId: editor } = req.user;
      const { userId } = req.params;
      const { firstName, lastName, email, roleId } = req.body;

      const updated = await user.update(
        {
          firstName,
          lastName,
          email,
          roleId,
          updatedAt: Date.now(),
          updatedBy: editor,
        },
        { where: { userId } }
      );

      response.success(res, true);
    } catch (error) {
      const ERROR_MSG = parseMySQLError(error);

      logger.error(ERROR_MSG);
      response.error(res, ERROR_MSG);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { userId } = req.user;
      const { oldPassword, newPassword } = req.body;

      const currentState = await user.unscoped().findOne({ where: { userId } });
      const currentPasswordMatch = bcrypt.compareSync(
        oldPassword,
        currentState.password
      );

      if (currentPasswordMatch) {
        currentState.update({
          password: bcrypt.hashSync(newPassword, 12),
          lastChangePassword: Date.now(),
        });

        response.success(res, true);
      } else {
        throw Error('Password invalid');
      }
    } catch (error) {
      const ERROR_MSG = parseMySQLError(error);

      logger.error(ERROR_MSG);
      response.error(res, ERROR_MSG);
    }
  },
  switchStatus: async (req, res) => {
    try {
      const { userId: editor } = req.user;
      const { userId } = req.params;

      if (editor !== userId) {
        const currentUser = await user.findOne({ where: { userId } });
        currentUser.statusId = currentUser.statusId === 0 ? 1 : 0;
        currentUser.updatedAt = Date.now();
        currentUser.updatedBy = editor;
        await currentUser.save();

        response.success(res, true);
      } else {
        throw Error(`Can't disable own user!`);
      }
    } catch (error) {
      const ERROR_MSG = parseMySQLError(error);

      logger.error(ERROR_MSG);
      response.error(res, ERROR_MSG);
    }
  },
};
