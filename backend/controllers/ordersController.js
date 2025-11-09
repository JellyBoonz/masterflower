// Purpose: Controllers handle HTTP request/response logic
// They call models for data and handle validation, status codes, and error responses

const ordersModel = require('../models/ordersModel');

async function listOrders(req, res) {
    try {
        const orders = await ordersModel.listAllOrders();
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

module.exports = { listOrders };

