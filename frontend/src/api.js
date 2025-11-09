// Purpose: Thin API client to communicate with the backend
// Keep network logic here to keep UI components clean.

// Base URL for API
// TODO: Set via environment if available; CRA exposes REACT_APP_* variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export async function fetchAudits() {
    try {
        const response = await fetch(`${API_URL}/audits`);
        if (!response.ok) {
            throw new Error('Failed to fetch audits');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching audits:', error);
        throw error;
    }
}

export async function createAudit(auditData) {
    try {
        const response = await fetch(`${API_URL}/audits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(auditData)
        });
        if (!response.ok) {
            throw new Error('Failed to create audit');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating audit:', error);
        throw error;
    }
}

export async function fetchOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

export async function fetchStores() {
    try {
        const response = await fetch(`${API_URL}/stores`);
        if (!response.ok) {
            throw new Error('Failed to fetch stores');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching stores:', error);
        throw error;
    }
}

export async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
