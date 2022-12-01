const { response, logger } = require('../utils');
const { ac, isDevelopment } = require('../configs');

module.exports = {
  /**
   *
   * @param {String} action - create / read / update / delete
   * @param {String} resource - user, etc...
   */
  check: (action, resource) => {
    return async (req, res, next) => {
      try {
        const { roleName } = req.user;

        const permission = await ac.can(roleName).execute(action).on(resource);

        if (permission.granted) {
          next();
        } else {
          throw Error('Access Forbidden');
        }
      } catch (error) {
        logger.error(error.message);
        response.error(
          res,
          `${isDevelopment ? error.message : 'Access Forbidden!'}`,
          403
        );
      }
    };
  },
};
