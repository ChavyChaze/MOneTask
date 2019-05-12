'use strict';

// load .env in local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const processType = process.env.PROCESS_TYPE;
const jwtSecret = process.env.JWT_SECRET;
const host = process.env.HOST;

let config;
try {
  config = require(`../${processType}`);
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config for process type: ${processType}`);
  }

  throw ex;
}

module.exports = Object.assign({}, { jwtSecret, host, type: processType }, config);
