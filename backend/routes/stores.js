// Purpose: Routes map URLs to controller functions
// In MVC, routes are thin - they only handle routing, not business logic

const express = require('express');
const router = express.Router();
const storesController = require('../controllers/storesController');

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: List all stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: A list of all stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   store_number:
 *                     type: string
 *                   store_name:
 *                     type: string
 *                   address:
 *                     type: string
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
router.get('/stores', storesController.listStores);

module.exports = router;

