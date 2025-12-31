const { Pool } = require('pg');

const pool = new Pool({
  // Replace with your actual connection string or use process.env.DATABASE_URL
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for AWS RDS often
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};