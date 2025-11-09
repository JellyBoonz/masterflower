// Purpose: Express application bootstrap and HTTP server startup
// Keep this file focused on wiring, configuration, and route mounting.

// Load env vars
require('dotenv').config();

// Initialize database schema before starting server
const { initializeDatabase } = require('./init-db');

// Initialize Express
const express = require('express');
const app = express();

// Enable CORS for the frontend app (default CRA port)
const cors = require('cors');
app.use(cors({ origin: '*' })); // Allow all origins for testing
// Enable JSON body parsing for API endpoints
app.use(express.json());

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Masterflower API Documentation',
}));

// Mount routes
const auditsRouter = require('./routes/audits');
const ordersRouter = require('./routes/orders');
const storesRouter = require('./routes/stores');
const productsRouter = require('./routes/products');
app.use('/api', auditsRouter);
app.use('/api', ordersRouter);
app.use('/api', storesRouter);
app.use('/api', productsRouter);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Read PORT from env with a sensible default
const PORT = process.env.PORT || 5000;

// Initialize database and start server
async function startServer() {
    try {
        // Initialize database schema
        await initializeDatabase();

        // Start the HTTP server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();