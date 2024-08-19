import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const pool = new pkg.Pool({
  connectionString: process.env.DBASE_URL + "?sslmode=require",
});

export default pool;
