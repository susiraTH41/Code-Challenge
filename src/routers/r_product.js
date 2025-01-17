const express = require('express');
const router = express.Router();
const productController = require('../controllers/c_product');

const path = "/product";

router.get(`${path}/all`, productController.getProducts);
router.post(`${path}`, productController.createProduct);
router.delete(`${path}/:id`, productController.deleteProduct);
router.get(`${path}`, productController.getProductsOnPage);


module.exports = router;