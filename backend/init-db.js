// Purpose: Database initialization script
// Runs on backend startup to ensure database schema is up to date
// Idempotent - safe to run multiple times

const fs = require('fs');
const path = require('path');
const { query } = require('./db');

async function initializeDatabase() {
    try {
        console.log('Initializing database schema...');

        // Read the schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

        // Execute the entire schema SQL file
        // PostgreSQL's query can handle multi-statement SQL
        // The schema uses IF NOT EXISTS and ON CONFLICT DO NOTHING for idempotency
        try {
            await query(schemaSQL);
            console.log('Database schema initialized successfully');
        } catch (error) {
            // Handle "already exists" errors gracefully (expected for idempotency)
            if (error.message.includes('already exists') ||
                error.code === '42P07' ||
                error.code === '23505') { // unique_violation
                console.log('Database schema already initialized (tables exist)');
            } else {
                // For other errors, log but don't fail startup
                // This allows the server to start even if some schema changes fail
                console.warn('Database initialization warning:', error.message);
                console.log('Server will continue to start (schema may be partially initialized)');
            }
        }
    } catch (error) {
        console.error('Error reading schema file:', error);
        // Don't throw - allow server to start even if schema file can't be read
        // This is useful for development environments where schema might be managed differently
        console.log('Server will start without schema initialization');
    }
}

// Run if called directly
if (require.main === module) {
    initializeDatabase()
        .then(() => {
            console.log('Database initialization complete');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Database initialization failed:', error);
            process.exit(1);
        });
}

module.exports = { initializeDatabase };

