// Purpose: Controllers handle HTTP request/response logic
// They call models for data and handle validation, status codes, and error responses

const auditsModel = require('../models/auditsModel');
const ordersModel = require('../models/ordersModel');
const productThresholdsModel = require('../models/productThresholdsModel');

async function listAudits(req, res) {
    try {
        const audits = await auditsModel.listAllAudits();
        res.json(audits);
    } catch (err) {
        console.error('Error fetching audits:', err);
        res.status(500).json({ error: 'Failed to fetch audits' });
    }
}

async function createAudit(req, res) {
    try {
        const { sku, quantity, condition, location, audited_by } = req.body;

        // Input validation
        if (!sku || !sku.trim()) {
            return res.status(400).json({ error: 'SKU is required' });
        }
        if (quantity === undefined || quantity === null) {
            return res.status(400).json({ error: 'Quantity is required' });
        }
        if (!condition || !condition.trim()) {
            return res.status(400).json({ error: 'Condition is required' });
        }
        if (!location || !location.trim()) {
            return res.status(400).json({ error: 'Location is required' });
        }
        if (!audited_by || !audited_by.trim()) {
            return res.status(400).json({ error: 'Audited_by is required' });
        }

        // Always create the audit
        const newAudit = await auditsModel.createAudit(
            sku.trim(),
            quantity,
            condition.trim(),
            location.trim(),
            audited_by.trim()
        );

        // Check if we need to auto-create an order
        const productThreshold = await productThresholdsModel.getProductBySku(sku.trim());
        let order_created = false;

        // Ensure quantity is a number for comparison
        const quantityNum = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

        if (productThreshold && quantityNum < productThreshold.minimum_threshold) {
            const hasPendingOrder = await ordersModel.hasPendingOrder(sku.trim(), location.trim());
            if (!hasPendingOrder) {
                await ordersModel.createOrder(sku.trim(), productThreshold.replenishment_quantity, 'pending', location.trim(), audited_by.trim());
                order_created = true;
            }
        }

        res.status(201).json({ ...newAudit, order_created });
    } catch (err) {
        console.error('Error creating audit:', err);
        res.status(500).json({ error: 'Failed to create audit' });
    }
}

module.exports = { listAudits, createAudit };