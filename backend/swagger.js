// Purpose: Swagger/OpenAPI configuration for API documentation
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Masterflower API',
            version: '1.0.0',
            description: 'API documentation for Masterflower inventory audit system',
            contact: {
                name: 'API Support',
            },
        },
        servers:[
            {
                url: 'http://localhost:5001',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Audit: {
                    type: 'object',
                    required: ['sku', 'quantity', 'condition', 'location', 'audited_by'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique identifier for the audit',
                            example: 1,
                        },
                        sku: {
                            type: 'string',
                            description: 'Stock Keeping Unit identifier',
                            example: 'LILLY',
                        },
                        quantity: {
                            type: 'integer',
                            description: 'Quantity of items audited',
                            example: 4,
                        },
                        condition: {
                            type: 'string',
                            description: 'Condition of the items',
                            example: 'Good',
                        },
                        location: {
                            type: 'string',
                            description: 'Store location identifier',
                            example: '123',
                        },
                        audited_by: {
                            type: 'string',
                            description: 'Name of the person who performed the audit',
                            example: 'John Doe',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the audit was created',
                        },
                    },
                },
                CreateAuditRequest: {
                    type: 'object',
                    required: ['sku', 'quantity', 'condition', 'location', 'audited_by'],
                    properties: {
                        sku: {
                            type: 'string',
                            description: 'Stock Keeping Unit identifier',
                            example: 'LILLY',
                        },
                        quantity: {
                            type: 'integer',
                            description: 'Quantity of items audited',
                            example: 4,
                        },
                        condition: {
                            type: 'string',
                            description: 'Condition of the items',
                            example: 'Good',
                        },
                        location: {
                            type: 'string',
                            description: 'Store location identifier',
                            example: '123',
                        },
                        audited_by: {
                            type: 'string',
                            description: 'Name of the person who performed the audit',
                            example: 'John Doe',
                        },
                    },
                },
                CreateAuditResponse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        sku: {
                            type: 'string',
                            example: 'LILLY',
                        },
                        quantity: {
                            type: 'integer',
                            example: 4,
                        },
                        condition: {
                            type: 'string',
                            example: 'Good',
                        },
                        location: {
                            type: 'string',
                            example: '123',
                        },
                        audited_by: {
                            type: 'string',
                            example: 'John Doe',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                        },
                        order_created: {
                            type: 'boolean',
                            description: 'Whether a new order was automatically created',
                            example: true,
                        },
                    },
                },
                Order: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique identifier for the order',
                            example: 1,
                        },
                        sku: {
                            type: 'string',
                            description: 'Stock Keeping Unit identifier',
                            example: 'LILLY',
                        },
                        quantity: {
                            type: 'integer',
                            description: 'Quantity to order',
                            example: 10,
                        },
                        order_status: {
                            type: 'string',
                            enum: ['pending', 'fulfilled', 'cancelled'],
                            description: 'Status of the order',
                            example: 'pending',
                        },
                        location: {
                            type: 'string',
                            description: 'Store location identifier',
                            example: '123',
                        },
                        ordered_by: {
                            type: 'string',
                            description: 'Name of the person who created the order',
                            example: 'John Doe',
                        },
                        ordered_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Timestamp when the order was created',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message',
                            example: 'Failed to create audit',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js', './controllers/*.js'], // Paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);
module.exports = specs;

