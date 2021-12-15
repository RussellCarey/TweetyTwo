const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PW,
  host: "localhost",
  port: 6543,
  database: "postgres",
});

module.exports = pool;
