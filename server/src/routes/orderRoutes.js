const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, orderController.createOrder);
router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrderById);
router.get('/', protect, adminOnly, orderController.getAllOrders);
router.put('/:id/status', protect, adminOnly, orderController.updateOrderStatus);

module.exports = router;
