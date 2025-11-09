-- Create stores table first (referenced by audits and orders)
CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    store_number VARCHAR(255) UNIQUE NOT NULL,
    store_name VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create product_thresholds first (referenced by other tables)
CREATE TABLE IF NOT EXISTS product_thresholds (
    sku VARCHAR(255) PRIMARY KEY,
    minimum_threshold INTEGER NOT NULL,
    replenishment_quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Create audits table with foreign key reference
CREATE TABLE IF NOT EXISTS audits (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    condition VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    audited_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audits_sku FOREIGN KEY (sku) REFERENCES product_thresholds(sku) ON DELETE RESTRICT
);
-- Create orders table with foreign key reference
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    order_status VARCHAR(50) NOT NULL CHECK (
        order_status IN ('pending', 'fulfilled', 'cancelled')
    ),
    location VARCHAR(255) NOT NULL,
    ordered_by VARCHAR(255) NOT NULL,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_sku FOREIGN KEY (sku) REFERENCES product_thresholds(sku) ON DELETE RESTRICT
);
-- Create indexes for query performance
-- Note: Foreign keys automatically create indexes on audits.sku and orders.sku
-- Critical: Composite index for hasPendingOrder query (most frequent query in business logic)
-- This query: SELECT COUNT(*) FROM orders WHERE sku = $1 AND location = $2 AND order_status = $3
CREATE INDEX IF NOT EXISTS idx_orders_sku_location_status ON orders(sku, location, order_status);
-- Helpful: Index for ORDER BY ordered_at DESC in listAllOrders
CREATE INDEX IF NOT EXISTS idx_orders_ordered_at ON orders(ordered_at DESC);
-- Insert sample store data (idempotent - safe to run multiple times)
INSERT INTO stores (store_number, store_name, address)
VALUES (
        '001',
        'Home Depot 123',
        '123 Main Street, Downtown'
    ),
    ('002', 'Meijer 456', '456 Apple st, Center City'),
    ('003', 'Meijer 123', '789 Cherry Ave') ON CONFLICT (store_number) DO NOTHING;
-- Insert sample flower data (idempotent - safe to run multiple times)
INSERT INTO product_thresholds (sku, minimum_threshold, replenishment_quantity)
VALUES ('LILLY', 10, 10),
    ('ROSE', 10, 10),
    ('TULIP', 10, 10),
    ('DAISY', 10, 10),
    ('IRIS', 10, 10) ON CONFLICT (sku) DO NOTHING;