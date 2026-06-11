module.exports = (_req, res) => {
  res.status(200).json({ ok: true, api: true, message: 'product-showcase API root' });
};
