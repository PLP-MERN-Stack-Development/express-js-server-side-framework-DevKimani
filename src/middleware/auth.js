const { UnauthorizedError } = require('../errors');

module.exports = function auth(req, res, next) {
  const key = req.header('X-API-KEY') || req.header('x-api-key');
  const expected = process.env.API_KEY || 'secret-api-key';
  if (!key || key !== expected) {
    throw new UnauthorizedError('Invalid or missing API key');
  }
  next();
};
