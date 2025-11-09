// Purpose: Data-access layer for product thresholds. Centralize SQL and data transformations here.
// Models handle ALL database interactions - no HTTP/Express concerns here

const { query } = require('../db');

/** @returns {Promise<Array>} */
async function listAllProducts() {
    const result = await query('SELECT * FROM product_thresholds ORDER BY sku ASC');
    return result.rows;
}

/** @returns {Promise<Object>} */
async function getProductBySku(sku) {
    const result = await query(
        'SELECT * FROM product_thresholds WHERE sku = $1',
        [sku]
    );
    return result.rows[0];
}

module.exports = { listAllProducts, getProductBySku };

