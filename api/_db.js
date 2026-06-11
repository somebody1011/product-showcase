const { Pool } = require('pg');

// Reuse pool across lambda invocations to avoid exhausting connections
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing DATABASE_URL in environment for serverless DB');
}

if (!global.__pgPool) {
  global.__pgPool = new Pool({ connectionString });
}

const pool = global.__pgPool;

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
