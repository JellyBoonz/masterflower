// Purpose: Routes map URLs to controller functions
// In MVC, routes are thin - they only handle routing, not business logic

const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/orders', ordersController.listOrders);

module.exports = router;

