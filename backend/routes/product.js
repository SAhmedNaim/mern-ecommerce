const express = require('express');
const router = express.Router();

const { 
    getProducts, 
    getSingleProduct, 
    newProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products/new').post(isAuthenticatedUser, newProduct);
router.route('/admin/product/:id')
                .put(isAuthenticatedUser, updateProduct)
                .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;