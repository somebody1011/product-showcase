require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db.cjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

app.post('/api/register', async (req, res) => {
  const { email, password, fullname } = req.body;
  if (!email || !password || !fullname) return res.status(400).json({ error: 'Missing fields' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (fullname, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, fullname',
      [fullname, email, hashed]
    );
    const user = result.rows[0];
    res.json({ user });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'User already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const result = await pool.query('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/orders', async (req, res) => {
  const { name, email, address, size, quantity, notes } = req.body;
  if (!name || !email || !address) return res.status(400).json({ error: 'Missing fields' });
  try {
    const result = await pool.query(
      'INSERT INTO orders (name, email, address, size, quantity, notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, created_at',
      [name, email, address, size || null, quantity || 1, notes || null]
    );
    res.json({ order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server listening on port ${PORT}`);
});
