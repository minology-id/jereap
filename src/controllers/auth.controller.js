const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { response, logger } = require('../utils');
const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
} = require('../utils/authenticate');
const { session } = require('../models/master');

module.exports = {
  login: async (req, res) => {
    try {
      const { userId } = req.user;

      const token = getToken({ userId });
      const refreshToken = getRefreshToken({ userId });

      const storedToken = await session.create({
        userId,
        refreshToken,
      });

      res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
      response.success(res, token);
    } catch (error) {
      logger.error(error.message);
      response.error(res, error.message);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { signedCookies = {} } = req;
      const { refreshToken } = signedCookies;
      if (refreshToken) {
        const payload = jwt.verify(refreshToken, process.env.RT_SECRET);
        const { userId } = payload;

        const isTokenFound = await session.count({
          where: { [Op.and]: [{ userId }, { refreshToken: refreshToken }] },
          logging: false,
        });

        if (isTokenFound === 0) {
          throw Error('Invalid refreshToken');
        } else {
          const token = getToken({ userId });
          const newRefreshToken = getRefreshToken({ userId });

          const storedToken = await session.create({
            userId,
            refreshToken: newRefreshToken,
          });

          res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
          response.success(res, token);
        }
      } else {
        logger.error('Invalid refreshToken');
        response.success(res, null);
      }
    } catch (error) {
      logger.error(error.message);
      response.error(res, error.message);
    }
  },
  me: async (req, res) => {
    try {
      response.success(res, req.user);
    } catch (error) {
      logger.error(error);
      response.error(res, error.message);
    }
  },
  logout: async (req, res) => {
    try {
      const { signedCookies = {} } = req;
      const { refreshToken } = signedCookies;

      if (refreshToken) {
        const payload = jwt.verify(refreshToken, process.env.RT_SECRET);
        const { userId } = payload;

        const token = await session.findOne({
          where: { [Op.and]: [{ userId }, { refreshToken: refreshToken }] },
          logging: false,
        });

        if (!token) {
          throw Error('Invalid refreshToken');
        } else {
          await token.destroy();

          res.clearCookie('refreshToken', COOKIE_OPTIONS);
          response.success(res, true);
        }
      } else {
        throw Error(`Can't find token`);
      }
    } catch (error) {
      logger.error(error);
      response.error(res, error.message);
    }
  },
};
