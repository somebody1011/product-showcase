import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './_db.js';

export default async function (req, res) {
  try {
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const result = await db.query('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}
