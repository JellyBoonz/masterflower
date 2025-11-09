// Purpose: Data-access layer for orders. Centralize SQL and data transformations here.
// Models handle ALL database interactions - no HTTP/Express concerns here

const { query } = require('../db');

/** @returns {Promise<Array>} */
async function listAllOrders() {
    const result = await query('SELECT * FROM orders ORDER BY ordered_at DESC');
    return result.rows;
}

/** @returns {Promise<Object>} */
async function createOrder(sku, quantity, order_status, location, ordered_by) {
    const result = await query(
        'INSERT INTO orders (sku, quantity, order_status, location, ordered_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [sku, quantity, order_status, location, ordered_by]
    );
    return result.rows[0];
}

/** @returns {Promise<boolean>} */
async function hasPendingOrder(sku, location) {
    const result = await query(
        'SELECT COUNT(*) FROM orders WHERE sku = $1 AND location = $2 AND order_status = $3',
        [sku, location, 'pending']
    );
    // COUNT(*) returns a string in PostgreSQL, so we need to convert it
    const count = parseInt(result.rows[0].count, 10);
    return count > 0;
}

module.exports = { listAllOrders, createOrder, hasPendingOrder };

