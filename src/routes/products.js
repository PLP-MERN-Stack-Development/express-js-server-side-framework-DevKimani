const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const validateProduct = require('../middleware/validateProduct');
const auth = require('../middleware/auth');
const asyncWrap = require('../utils/asyncWrap');

// All product routes require API key
router.use(auth);

router.get('/', asyncWrap(controller.listProducts));
router.get('/search', asyncWrap(controller.searchProducts));
router.get('/stats', asyncWrap(controller.getStats));
router.get('/:id', asyncWrap(controller.getProduct));
router.post('/', validateProduct, asyncWrap(controller.createProduct));
router.put('/:id', validateProduct, asyncWrap(controller.updateProduct));
router.delete('/:id', asyncWrap(controller.deleteProduct));

module.exports = router;
