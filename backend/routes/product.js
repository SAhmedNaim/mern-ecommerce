const express = require('express');
const router = express.Router();

const { 
    getProducts, 
    getSingleProduct, 
    newProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products/new')
                .post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);
router.route('/admin/product/:id')
                .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
                .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;