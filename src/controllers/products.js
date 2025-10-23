const { v4: uuidv4 } = require('uuid');
const { NotFoundError, ValidationError } = require('../errors');

// In-memory data store
const products = [];

// Helper to clone and omit sensitive fields (none here) - return plain objects
function clone(p) {
  return JSON.parse(JSON.stringify(p));
}

// List products with filtering and pagination
exports.listProducts = async (req, res) => {
  let results = products.slice();

  // Filtering by category
  if (req.query.category) {
    const cat = req.query.category.toLowerCase();
    results = results.filter(p => p.category && p.category.toLowerCase() === cat);
  }

  // Pagination
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, parseInt(req.query.limit || '10', 10));
  const start = (page - 1) * limit;
  const end = start + limit;

  const paged = results.slice(start, end);

  res.json({
    page,
    limit,
    total: results.length,
    data: paged.map(clone),
  });
};

exports.getProduct = async (req, res) => {
  const p = products.find(x => x.id === req.params.id);
  if (!p) throw new NotFoundError('Product not found');
  res.json(clone(p));
};

exports.createProduct = async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || typeof price !== 'number') throw new ValidationError('Invalid product data');

  const product = {
    id: uuidv4(),
    name,
    description: description || '',
    price,
    category: category || '',
    inStock: !!inStock,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  res.status(201).json(clone(product));
};

exports.updateProduct = async (req, res) => {
  const idx = products.findIndex(x => x.id === req.params.id);
  if (idx === -1) throw new NotFoundError('Product not found');
  const { name, description, price, category, inStock } = req.body;

  const updated = Object.assign(products[idx], {
    name: name !== undefined ? name : products[idx].name,
    description: description !== undefined ? description : products[idx].description,
    price: price !== undefined ? price : products[idx].price,
    category: category !== undefined ? category : products[idx].category,
    inStock: inStock !== undefined ? !!inStock : products[idx].inStock,
    updatedAt: new Date().toISOString(),
  });

  res.json(clone(updated));
};

exports.deleteProduct = async (req, res) => {
  const idx = products.findIndex(x => x.id === req.params.id);
  if (idx === -1) throw new NotFoundError('Product not found');
  const removed = products.splice(idx, 1)[0];
  res.json({ deleted: true, product: clone(removed) });
};

exports.searchProducts = async (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.json({ total: 0, data: [] });
  const found = products.filter(p => p.name && p.name.toLowerCase().includes(q));
  res.json({ total: found.length, data: found.map(clone) });
};

exports.getStats = async (req, res) => {
  const counts = products.reduce((acc, p) => {
    const cat = p.category || 'uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  res.json({ total: products.length, countByCategory: counts });
};
