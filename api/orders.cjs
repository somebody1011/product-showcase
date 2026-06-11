const db = require('./_db');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { name, email, address, details } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Missing fields' });

    const result = await db.query(
      'INSERT INTO orders (name, email, address, details) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
      [name, email, address || null, details || null]
    );
    res.status(200).json({ order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
};
