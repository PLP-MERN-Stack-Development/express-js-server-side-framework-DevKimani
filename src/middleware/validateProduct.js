const { ValidationError } = require('../errors');

module.exports = function validateProduct(req, res, next) {
  const { name, price, inStock } = req.body || {};
  if (!name || typeof name !== 'string') {
    throw new ValidationError('Field "name" is required and must be a string');
  }
  if (price === undefined || typeof price !== 'number') {
    throw new ValidationError('Field "price" is required and must be a number');
  }
  if (inStock !== undefined && typeof inStock !== 'boolean') {
    throw new ValidationError('Field "inStock" must be a boolean');
  }
  next();
};
