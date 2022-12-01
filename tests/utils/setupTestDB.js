require('dotenv').config();

const db = require('../../src/utils/db');

module.exports = async () => {
  const { DB_NAME } = process.env;

  await db.authenticate();
  console.log(DB_NAME);
};
