const { Op } = require('sequelize');
const logger = require('./logger');

module.exports = {
  /**
   *
   * @param {Object} error - Joi error object
   * @returns
   */
  getJoiErrorMessage: (error) => {
    const currentError = error.details[0];

    if (
      currentError.type === 'string.pattern.base' &&
      currentError.context.label.toLowerCase().includes('password')
    )
      return `Password must contains at least 1 lowercase and uppercase, 1 number, and 1 symbol!`;

    return currentError.message.replaceAll(`\"`, '');
  },
  /**
   *
   * @param {Object} error - Error instance
   * @returns
   */
  parseMySQLError: (error) =>
    error.errors ? error.errors[0].message : error.message,
  /**
   *
   * @param {{
   * {Object} model
   * {Object} query
   * {exclude} array Exclude fields
   * }} param0
   */
  parseSequelizeQuery: ({
    model,
    query,
    excludes = [],
    defaultSort,
    includes = false,
  }) => {
    try {
      let config = {};
      let configCount = {};
      let fields = [];

      for (let key in model.getAttributes()) {
        fields.push(key);
      }

      if (excludes.length > 0)
        fields = fields.filter((i) => !excludes.includes(i));

      const queryWords = query.query ? query.query : false;
      const field = fields.includes(query.field) ? query.field : false;

      if (queryWords) {
        if (field) {
          config = {
            where: {
              [field]: {
                [Op.like]: `%${queryWords}%`,
              },
            },
          };
        } else {
          config = {
            where: {
              [Op.or]: fields.map((i) => {
                return {
                  [i]: {
                    [Op.like]: `%${queryWords}%`,
                  },
                };
              }),
            },
          };
        }
      }

      configCount = { ...config };

      if (includes) {
        config.include = includes;
      }

      const sortBy = fields.includes(query.sortBy) ? query.sortBy : defaultSort;
      const sortType = ['asc', 'desc'].includes(query.sortType)
        ? query.sortType
        : 'asc';

      config.order = [[sortBy, sortType]];

      const limit = Number.parseInt(query.limit);
      const page = query.page ? query.page : 1;

      if (limit) {
        config.offset = (page - 1) * limit;
        config.limit = limit;
      }

      return {
        data: model.findAll({ ...config }),
        count: model.count(configCount),
      };
    } catch (error) {
      logger.error(error);

      return {
        data: [],
        count: 0,
      };
    }
  },
};
