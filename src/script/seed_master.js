require('dotenv').config();
const { db, logger } = require('../utils');

const { master: tableMaster } = require('../models');
const { master: seedMaster } = require('../seeders');

const main = async () => {
  const t = await db.transaction();
  try {
    await tableMaster.role.bulkCreate(seedMaster.role, { transaction: t });
    await tableMaster.status.bulkCreate(seedMaster.status, { transaction: t });

    await t.commit();
    logger.info('Master Table has been seeded!');
    process.exit(0);
  } catch (error) {
    await t.rollback();

    logger.error(error);
    process.exit(1);
  }
};

main();
