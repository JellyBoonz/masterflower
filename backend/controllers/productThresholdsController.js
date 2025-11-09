// Purpose: Controllers handle HTTP request/response logic
// They call models for data and handle validation, status codes, and error responses

const productThresholdsModel = require('../models/productThresholdsModel');

async function listProducts(req, res) {
    try {
        const products = await productThresholdsModel.listAllProducts();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

module.exports = { listProducts };

