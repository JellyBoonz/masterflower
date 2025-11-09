// Purpose: Routes map URLs to controller functions
// In MVC, routes are thin - they only handle routing, not business logic

const express = require('express');
const router = express.Router();
const productThresholdsController = require('../controllers/productThresholdsController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List all products (SKUs with thresholds)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sku:
 *                     type: string
 *                   minimum_threshold:
 *                     type: integer
 *                   replenishment_quantity:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/products', productThresholdsController.listProducts);

module.exports = router;

