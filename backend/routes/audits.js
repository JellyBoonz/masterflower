// Purpose: Routes map URLs to controller functions
// In MVC, routes are thin - they only handle routing, not business logic

const express = require('express');
const router = express.Router();
const auditsController = require('../controllers/auditsController');

/**
 * @swagger
 * /api/audits:
 *   get:
 *     summary: List all audits
 *     tags: [Audits]
 *     responses:
 *       200:
 *         description: A list of all audits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Audit'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/audits', auditsController.listAudits);

/**
 * @swagger
 * /api/audits:
 *   post:
 *     summary: Create a new audit
 *     tags: [Audits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAuditRequest'
 *           example:
 *             sku: "LILLY"
 *             quantity: 4
 *             condition: "Good"
 *             location: "123"
 *             audited_by: "John Doe"
 *     responses:
 *       201:
 *         description: Audit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateAuditResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "SKU is required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/audits', auditsController.createAudit);

module.exports = router;

// 🧠 Next Steps for Me
// - Create the items table (see backend/schema.sql)
// - Implement the SQL queries for listing and creating items
// - Consider adding update/delete routes as you expand functionality   

