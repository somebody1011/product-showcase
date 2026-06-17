import db from './_db.js';

export default async function (req, res) {
  try {
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { name, email, address, notes } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Missing fields' });

    const result = await db.query(
      'INSERT INTO orders (name, email, address, notes) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
      [name, email, address || null, notes || null]
    );
    res.status(200).json({ order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}
