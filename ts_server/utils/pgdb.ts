const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.PROD_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
