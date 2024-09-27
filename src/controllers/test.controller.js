const response = require('../utils/response');
const { master } = require('../models');

module.exports = {
  test: async (req, res) => {
    try {
      const result = await master.user.findAll({
        include: [
          {
            model: master.role,
            attributes: ['roleName'],
          },
        ],
        raw: true,
      });
      console.log(result);
      response.success(res, result);
    } catch (error) {
      console.log(error);
      response.error(res, error.message);
    }
  },
};
