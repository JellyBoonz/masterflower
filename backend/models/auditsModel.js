// Purpose: Data-access layer for audits. Centralize SQL and data transformations here.
// Models handle ALL database interactions - no HTTP/Express concerns here

const { query } = require('../db');

/** @returns {Promise<Array>} */
async function listAllAudits() {
    const result = await query('SELECT * FROM audits ORDER BY id DESC');
    return result.rows;
}

/** @returns {Promise<Object>} */
async function createAudit(sku, quantity, condition, location, audited_by) {
    const result = await query(
        'INSERT INTO audits (sku, quantity, condition, location, audited_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [sku, quantity, condition, location, audited_by]
    );
    return result.rows[0];
}

module.exports = { listAllAudits, createAudit };

// 🧠 Next Steps for Me
// - Implement these functions and call them from the controller
// - Consider adding update/delete helpers as you expand your API

