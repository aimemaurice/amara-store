const Order = require('../models/Order');
const Product = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/apiResponse');

exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return errorResponse(res, 'Order must contain at least one item', 400);
    }

    if (!shippingAddress) {
      return errorResponse(res, 'Shipping address is required', 400);
    }

    if (totalPrice == null || totalPrice <= 0) {
      return errorResponse(res, 'Total price must be greater than 0', 400);
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalPrice,
      status: 'pending',
    });

    await order.populate('user', 'name email').populate('items.product');

    return successResponse(res, order, 'Order created successfully', 201);
  } catch (error) {
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);

    const total = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return successResponse(res, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      orders,
    }, 'Orders retrieved successfully');
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product');

    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return errorResponse(res, 'Not authorized to view this order', 403);
    }

    return successResponse(res, order, 'Order retrieved successfully');
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const status = req.query.status ? req.query.status.trim() : null;

    const filters = {};
    if (status) {
      filters.status = status;
    }

    const total = await Order.countDocuments(filters);
    const orders = await Order.find(filters)
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return successResponse(res, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      orders,
    }, 'All orders retrieved successfully');
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
    if (!status || !validStatuses.includes(status)) {
      return errorResponse(res, `Status must be one of: ${validStatuses.join(', ')}`, 400);
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name email').populate('items.product');

    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    return successResponse(res, order, 'Order status updated successfully');
  } catch (error) {
    next(error);
  }
};
