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

// Update / Process order       => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }
    
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete Order     => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user', 'name email');

    if(!order) {
        return next(new ErrorHandler('No Order found with this ID', 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        order
    });
});