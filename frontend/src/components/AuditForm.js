// Purpose: Component for users to audit inventory
import { useState } from 'react';
import Spinner from './Spinner';

function AuditForm({ products, selectedStore, onCreateAudit }) {
    // Get SKUs from products (source of truth from product_thresholds table)
    const availableSKUs = products.map(product => product.sku).sort();

    const [formData, setFormData] = useState({
        sku: '',
        quantity: '',
        condition: '',
        audited_by: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user types
        setSuccess(''); // Clear success when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.sku) {
            setError('Please select a SKU');
            return;
        }
        if (!formData.quantity || formData.quantity <= 0) {
            setError('Please enter a valid quantity');
            return;
        }
        if (!formData.condition.trim()) {
            setError('Please enter a condition');
            return;
        }
        if (!formData.audited_by.trim()) {
            setError('Please enter your name');
            return;
        }
        if (!selectedStore) {
            setError('Please select a store first');
            return;
        }

        setIsSubmitting(true);

        try {
            const auditData = {
                sku: formData.sku,
                quantity: parseInt(formData.quantity, 10),
                condition: formData.condition.trim(),
                location: selectedStore,
                audited_by: formData.audited_by.trim()
            };

            await onCreateAudit(auditData);

            // Reset form after successful submission
            setFormData({
                sku: '',
                quantity: '',
                condition: '',
                audited_by: '',
            });

            // Show success message
            setSuccess('Audit created successfully!');

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            setError(err.message || 'Failed to create audit');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedStore) {
        return (
            <div style={{
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                marginTop: '20px',
                color: '#666'
            }}>
                Please select a store to create an audit
            </div>
        );
    }

    return (
        <div style={{
            marginTop: '30px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
        }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Create New Audit</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="sku" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        SKU:
                    </label>
                    <select
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxSizing: 'border-box'
                        }}
                    >
                        <option value="">-- Select SKU --</option>
                        {availableSKUs.map((sku) => (
                            <option key={sku} value={sku}>
                                {sku}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="quantity" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        Quantity:
                    </label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="0"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="condition" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        Condition:
                    </label>
                    <input
                        id="condition"
                        name="condition"
                        type="text"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Good, Fair, Poor"
                        style={{
                            width: '100%',
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="audited_by" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        Audited By:
                    </label>
                    <input
                        id="audited_by"
                        name="audited_by"
                        type="text"
                        value={formData.audited_by}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        style={{
                            width: '100%',
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
                    <strong>Store Location:</strong> {selectedStore}
                </div>

                {error && (
                    <div style={{
                        marginBottom: '15px',
                        padding: '10px',
                        backgroundColor: '#fee',
                        color: '#c33',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{
                        marginBottom: '15px',
                        padding: '10px',
                        backgroundColor: '#dfd',
                        color: '#2a7',
                        borderRadius: '4px',
                        fontSize: '14px',
                        border: '1px solid #9f9'
                    }}>
                        ✓ {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                    }}
                >
                    {isSubmitting && <Spinner size={16} color="white" />}
                    {isSubmitting ? 'Submitting...' : 'Create Audit'}
                </button>
            </form>
        </div>
    );
}

export default AuditForm;
