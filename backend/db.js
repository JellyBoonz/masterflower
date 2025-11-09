// Purpose: PostgreSQL connection pool wrapper for the backend
// This file centralizes database connectivity so the rest of the app
// can import a simple query helper without worrying about connection details.

const { Pool } = require('pg');

// load environment variables (ensure you call dotenv in server startup)
require('dotenv').config();
const { DATABASE_URL } = process.env;

const pool = new Pool({
    connectionString: DATABASE_URL
});

// add a basic error handler to surface idle client errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
});

const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

module.exports = { query, pool };