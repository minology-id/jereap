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
      return `Password must contains at least 1 lowecase and uppercase, 1 number, and 1 symbol!`;

    return currentError.message.replaceAll(`\"`, '');
  },
  /**
   *
   * @param {Object} error - Error instance
   * @returns
   */
  parseMySQLError: (error) =>
    error.errors ? error.errors[0].message : error.message,
};
