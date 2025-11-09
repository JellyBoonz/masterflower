// Purpose: Skeleton UI for a simple items list
// Replace the CRA boilerplate with explicit TODOs for your learning path.
// Keep this file focused on UI and state; network calls live in src/api.js

import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchAudits, createAudit, fetchStores, fetchProducts, fetchOrders } from './api';
import AuditHistory from './components/AuditHistory';
import AuditForm from './components/AuditForm';
import StorePicker from './components/StorePicker';
import OrderHistory from './components/OrderHistory';
import Spinner from './components/Spinner';


function App() {

    const [audits, setAudits] = useState([]);
    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [activeTab, setActiveTab] = useState('audits');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasNewAudit, setHasNewAudit] = useState(false);
    const [hasNewOrder, setHasNewOrder] = useState(false);
    const ordersLoaded = useRef(false);
    const prevOrdersCount = useRef(0);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [auditsData, storesData, productsData, ordersData] = await Promise.all([
                    fetchAudits(),
                    fetchStores(),
                    fetchProducts(),
                    fetchOrders()
                ]);
                setAudits(auditsData);
                setStores(storesData);
                setProducts(productsData);
                setOrders(ordersData);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleCreateAudit = async (auditData) => {
        setIsRefreshing(true);
        try {
            await createAudit(auditData);
            // Refresh the audits list after creating a new audit
            const updatedAudits = await fetchAudits();
            setAudits(updatedAudits);
            // Refresh the orders list after creating a new audit
            const updatedOrders = await fetchOrders();
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error creating audit:', error);
            throw error; // Re-throw so AuditForm can handle it
        } finally {
            setIsRefreshing(false);
            setHasNewAudit(true);
        }
    };

    const handleStoreSelect = (storeNumber) => {
        setSelectedStore(storeNumber);
        setActiveTab('audits');
    };

    useEffect(() => {
        if (!ordersLoaded.current) {
            if (isLoading) {
                return;
            }
            ordersLoaded.current = true;
            prevOrdersCount.current = orders.length;
            return;
        }

        if (orders.length > prevOrdersCount.current) {
            setHasNewOrder(true);
        }

        prevOrdersCount.current = orders.length;
    }, [orders]);

    const handleOrdersTabClick = () => {
        setActiveTab('orders');
        setHasNewOrder(false);
    };

    // Filter audits based on selected store
    const filteredAudits = useMemo(() => {
        if (!selectedStore) {
            return audits;
        }
        return audits.filter(audit => audit.location === selectedStore);
    }, [audits, selectedStore]);

    const filteredOrders = useMemo(() => {
        if (!selectedStore) {
            return orders;
        }
        return orders.filter(order => order.location === selectedStore);
    }, [orders, selectedStore]);

    if (isLoading) {
        return (
            <main style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
                <h1>Audits</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '60px 20px',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <Spinner size={40} />
                    <p style={{ color: '#666', margin: 0 }}>Loading data...</p>
                </div>
            </main>
        );
    }

    return (
        <main style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
            <h1>Audits</h1>
            {isRefreshing && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px',
                    backgroundColor: '#f0f8ff',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    color: '#0066cc'
                }}>
                    <Spinner size={16} color="#0066cc" />
                    <span>Refreshing data...</span>
                </div>
            )}
            <StorePicker
                stores={stores}
                selectedStore={selectedStore}
                onStoreSelect={handleStoreSelect}
            />

            {!selectedStore && (
                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    border: '1px dashed #ccc',
                    borderRadius: '4px',
                    textAlign: 'center',
                    color: '#666',
                    backgroundColor: '#fafafa'
                }}>
                    Select a store to view audits and orders.
                </div>
            )}

            {selectedStore && (
                <>
                    <div style={{
                        marginTop: '20px',
                        display: 'flex',
                        gap: '10px'
                    }}>
                        <button
                            type="button"
                            onClick={() => setActiveTab('audits')}
                            style={{
                                flex: '1',
                                padding: '10px 16px',
                                borderRadius: '4px',
                                border: activeTab === 'audits' ? '1px solid #007bff' : '1px solid #ccc',
                                backgroundColor: activeTab === 'audits' ? '#007bff' : '#f5f5f5',
                                color: activeTab === 'audits' ? 'white' : '#333',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Audit View
                        </button>
                        <button
                            type="button"
                            onClick={() => { setActiveTab('audit-history'); setHasNewAudit(false); }}
                            style={{
                                flex: '1',
                                padding: '10px 16px',
                                borderRadius: '4px',
                                border: activeTab === 'audit-history' ? '1px solid #007bff' : '1px solid #ccc',
                                backgroundColor: activeTab === 'audit-history' ? '#007bff' : '#f5f5f5',
                                color: activeTab === 'audit-history' ? 'white' : '#333',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Audit History
                            {hasNewAudit && (
                                <span style={{
                                    marginLeft: 6,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#28a745',
                                    display: 'inline-block'
                                }} />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={handleOrdersTabClick}
                            style={{
                                flex: '1',
                                padding: '10px 16px',
                                borderRadius: '4px',
                                border: activeTab === 'orders' ? '1px solid #007bff' : '1px solid #ccc',
                                backgroundColor: activeTab === 'orders' ? '#007bff' : '#f5f5f5',
                                color: activeTab === 'orders' ? 'white' : '#333',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            Order History
                            {hasNewOrder && (
                                <span style={{
                                    marginLeft: 6,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#28a745',
                                    display: 'inline-block'
                                }} />
                            )}
                        </button>
                    </div>

                    {activeTab === 'audits' && (
                        <>
                            <AuditForm
                                products={products}
                                selectedStore={selectedStore}
                                onCreateAudit={handleCreateAudit}
                            />
                        </>
                    )}

                    {activeTab === 'audit-history' && (
                        <AuditHistory audits={filteredAudits} />
                    )}

                    {activeTab === 'orders' && (
                        <OrderHistory orders={filteredOrders} />
                    )}
                </>
            )}
        </main>
    );
}

export default App