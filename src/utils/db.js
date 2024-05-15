import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
  };