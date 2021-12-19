const Pool = require("pg").Pool;
import isDev from "./isDev";

const prodPool = new Pool({
  connectionString: process.env.PROD_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const devPool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Fromthedepths1122!!",
  port: 6543,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = isDev() ? devPool : prodPool;
