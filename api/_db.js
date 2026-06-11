import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing DATABASE_URL in environment for serverless DB');
} else {
  try {
    const parsed = new URL(connectionString);
    // Safe debug: log only host and port, never the user or password
    console.log(`[db-debug] DATABASE host: ${parsed.hostname}${parsed.port ? `:${parsed.port}` : ''}`);
  } catch (err) {
    console.error('[db-debug] Invalid DATABASE_URL format', err.message);
  }
}

if (!global.__pgPool) {
  global.__pgPool = new Pool({ connectionString });
}

const pool = global.__pgPool;

export default {
  query: (text, params) => pool.query(text, params),
  pool,
};
