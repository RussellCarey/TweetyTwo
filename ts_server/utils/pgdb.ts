const Pool = require("pg").Pool;
import isDev from "./isDev";

// user not username!!!!!!
const prodPool = new Pool({
  user: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PW,
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  database: process.env.PROD_DB_NAME,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

const devPool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "tweety",
  password: process.env.DEV_DATABASE_PW,
  port: 6543,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const savedPool = prodPool;

export default savedPool;
