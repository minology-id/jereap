const { response, logger } = require('../utils');
const { parseMySQLError } = require('../utils/helper');

const { user } = require('../models/master');

module.exports = {
  beforeLogin: async (req, res, next) => {
    try {
      const { email } = req.body;
      const currentUser = await user.findOne({ where: { email } });

      if (!currentUser) throw Error('Invalid email or password!');

      if (currentUser.statusId === 1) {
        next();
      } else {
        throw Error(`${email} are disabled by administrator!`);
      }
    } catch (error) {
      const ERROR_MSG = parseMySQLError(error);

      logger.error(ERROR_MSG);
      response.error(res, ERROR_MSG, 401);
    }
  },
};
