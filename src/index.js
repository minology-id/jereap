require('dotenv').config();
const app = require('./app');
const { db, logger } = require('./utils');

const { PORT, DB_HOST, DB_PORT, NODE_ENV } = process.env;

let server;

db.authenticate().then(() => {
  logger.info(`Connected to DB : ${DB_HOST}:${DB_PORT}`);
  server = app;
  server.listen(PORT, () => {
    logger.info(`Server [${NODE_ENV}] listening on port ${PORT}...`);
  });
});
