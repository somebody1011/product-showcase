import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing DATABASE_URL in environment for serverless DB');
}

if (!global.__pgPool) {
  global.__pgPool = new Pool({ connectionString });
}

const pool = global.__pgPool;

export default {
  query: (text, params) => pool.query(text, params),
  pool,
};
