// Purpose: Controllers handle HTTP request/response logic
// They call models for data and handle validation, status codes, and error responses

const storesModel = require('../models/storesModel');

async function listStores(req, res) {
    try {
        const stores = await storesModel.listAllStores();
        res.json(stores);
    } catch (err) {
        console.error('Error fetching stores:', err);
        res.status(500).json({ error: 'Failed to fetch stores' });
    }
}

module.exports = { listStores };

