const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productsRouter = require('./src/routes/products');
const logger = require('./src/middleware/logger');
const { errorHandler } = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(logger);

// Hello World root
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from Express API' });
});

// API routes
app.use('/api/products', productsRouter);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
