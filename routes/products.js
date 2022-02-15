const { Router } = require('express');
const getCategories = require('../controlers/products');

const router = Router();

router.get('/categories', getCategories)

module.exports = router;
