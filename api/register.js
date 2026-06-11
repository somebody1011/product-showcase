import bcrypt from 'bcryptjs';
import db from './_db.js';

export default async function (req, res) {
  try {
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (fullname, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, fullname',
      [fullname, email, hashed]
    );
    const user = result.rows[0];
    res.status(200).json({ user });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'User already exists' });
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}
