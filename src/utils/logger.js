const winston = require('winston');
const { isDevelopment, dbLogger } = require('../configs');

const { eventLogger } = require('../models/master');

const enumrateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const consoleTransports = new winston.transports.Console({
  stderrLevels: ['error'],
  format: winston.format.combine(
    enumrateErrorFormat(),
    isDevelopment ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
});

const dbTransports = new dbLogger({
  model: eventLogger,
});

module.exports = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',

  transports: [consoleTransports, dbTransports],
});
