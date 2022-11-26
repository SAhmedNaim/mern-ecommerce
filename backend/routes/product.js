const express = require('express');
const router = express.Router();

const { 
    getProducts, 
    getSingleProduct, 
    newProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products/new').post(newProduct);
router.route('/admin/product/:id')
                .put(updateProduct)
                .delete(deleteProduct);

module.exports = router;