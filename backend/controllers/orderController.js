const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new Order       => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async(req, res, next) => {
    const { 
        orderItems, 
        shippingInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice,
        totalPrice,
        paymentInfo 
    } = req.body;

    const order = await Order.create({
        orderItems, 
        shippingInfo, 
        itemsPrice, 
        taxPrice, 
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

// Get Single Order     => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user', 'name email');

    if(!order) {
        return next(new ErrorHandler('No Order found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get logged in user Orders     => /api/v1/order/me
exports.myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
});

// Get all orders   => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});