module.exports = {
  /**
   *
   * @param {Express.Response} res - Express response
   * @param {Any} data - Any data for payload
   * @param {Number} count - Count of data if any
   */
  success: (res, data, count = false) => {
    if (count) {
      res.send({
        payload: data,
        count,
      });
    } else {
      res.send({
        payload: data,
      });
    }
  },
  /**
   *
   * @param {Express.Response} res - Express response
   * @param {String} message - Error message
   * @param {Number} code - Error code
   */
  error: (res, message, code = false) => {
    if (code) {
      res.status(code).send({
        error: message,
      });
    } else {
      res.status(400).send({
        error: message,
      });
    }
  },
};
