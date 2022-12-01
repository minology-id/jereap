const { Sequelize } = require('sequelize');
const { isDevelopment } = require('../configs');

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_TIMEZONE } =
  process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  dialectModule: require('mysql2'),
  dialectOptions: {
    dateStrings: true,
    timezone: DB_TIMEZONE,
  },
  timezone: DB_TIMEZONE,
  logging: isDevelopment ? console.log : false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});
