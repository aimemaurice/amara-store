const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);
    const totalRevenue = (revenueResult[0] && revenueResult[0].total) || 0;

    const statusGroups = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const ordersByStatus = ['pending', 'processing', 'shipped', 'delivered'].map((status) => {
      const statusItem = statusGroups.find((group) => group._id === status);
      return {
        status,
        count: statusItem ? statusItem.count : 0,
      };
    });

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .lean();

    const formattedRecentOrders = recentOrders.map((order) => ({
      id: order._id.toString(),
      customer: order.user?.name || order.user?.email || order.shippingAddress?.name || 'Guest',
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }));

    res.json({
      totalOrders,
      totalRevenue,
      totalUsers,
      totalProducts,
      ordersByStatus,
      recentOrders: formattedRecentOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
