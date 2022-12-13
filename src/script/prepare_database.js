require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const mysql = require('mysql2/promise');

const db = require('../utils/db');
const {
  eventLogger,
  role,
  session,
  status,
  user,
} = require('../models/master');

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const main = async () => {
  console.log(`Create DB ${DB_NAME} if not exists...`);
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);

    await createTable();

    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const createTable = async () => {
  console.log(`Create all tables if not exists...`);
  const t = await db.transaction();
  try {
    // array of sequelize models
    const models = [eventLogger, role, session, status, user];
    const storedPromised = models.map((model) => {
      return model.sync({ transaction: t, alter: true });
    });

    await Promise.all(storedPromised);
    t.commit();

    console.info(`All tables has been sync!`);
  } catch (error) {
    t.rollback();
    console.log(error);
  }
};

main();
