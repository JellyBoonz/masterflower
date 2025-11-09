import { formatDate } from '../utils/formatDate';

// Purpose: Component to display audit history for a store
// This component will receive audits as props and render them in a table

function AuditHistory({ audits }) {

    if (audits.length === 0) {
        return (
            <div style={{ marginTop: '30px' }}>
                <h2 style={{ marginBottom: '15px' }}>Audit History</h2>
                <div style={{
                    padding: '40px 20px',
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0',
                    color: '#666'
                }}>
                    <p style={{ margin: 0, fontSize: '16px' }}>No audits found for this store.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>Audit History</h2>
            <div style={{
                overflowX: 'auto',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: 'white'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: '#f5f5f5',
                            borderBottom: '2px solid #ddd'
                        }}>
                            <th style={{
                                padding: '12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#333'
                            }}>SKU</th>
                            <th style={{
                                padding: '12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#333'
                            }}>Quantity</th>
                            <th style={{
                                padding: '12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#333'
                            }}>Condition</th>
                            <th style={{
                                padding: '12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#333'
                            }}>Audited By</th>
                            <th style={{
                                padding: '12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#333'
                            }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {audits.map((audit, index) => (
                            <tr
                                key={audit.id}
                                style={{
                                    borderBottom: index < audits.length - 1 ? '1px solid #eee' : 'none',
                                    backgroundColor: index % 2 === 0 ? 'white' : '#fafafa'
                                }}
                            >
                                <td style={{ padding: '12px', fontWeight: '500' }}>{audit.sku}</td>
                                <td style={{ padding: '12px' }}>{audit.quantity}</td>
                                <td style={{ padding: '12px' }}>{audit.condition}</td>
                                <td style={{ padding: '12px' }}>{audit.audited_by}</td>
                                <td style={{ padding: '12px', color: '#666' }}>{formatDate(audit.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AuditHistory;
