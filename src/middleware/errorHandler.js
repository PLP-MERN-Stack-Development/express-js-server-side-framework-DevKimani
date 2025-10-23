const { AppError } = require('../errors');

function errorHandler(err, req, res, next) {
  // If it's a known AppError, use its status
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { errorHandler };
