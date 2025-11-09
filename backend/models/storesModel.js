// Purpose: Data-access layer for stores. Centralize SQL and data transformations here.
// Models handle ALL database interactions - no HTTP/Express concerns here

const { query } = require('../db');

/** @returns {Promise<Array>} */
async function listAllStores() {
    const result = await query('SELECT * FROM stores ORDER BY store_number ASC');
    return result.rows;
}

/** @returns {Promise<Object>} */
async function getStoreByNumber(storeNumber) {
    const result = await query(
        'SELECT * FROM stores WHERE store_number = $1',
        [storeNumber]
    );
    return result.rows[0];
}

module.exports = { listAllStores, getStoreByNumber };

