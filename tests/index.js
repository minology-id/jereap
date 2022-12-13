require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const { describe } = require('./utils');

const { logger } = require('../src/utils');
const integration = require('./integration');

logger.silent = true;

describe('📣 Running Test for :', integration);
