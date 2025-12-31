import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  port: 5432,
});
