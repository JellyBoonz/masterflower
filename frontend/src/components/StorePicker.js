// Purpose: Dropdown picker component for selecting a store by store number
function StorePicker({ stores, selectedStore, onStoreSelect }) {

    const handleStoreChange = (e) => {
        const value = e.target.value;
        onStoreSelect(value === '' ? null : value);
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <label htmlFor="store-select" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Select Store:
            </label>
            <select
                id="store-select"
                value={selectedStore || ''}
                onChange={handleStoreChange}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                }}
            >
                <option value="">-- Select a store --</option>
                {stores.map((store) => (
                    <option key={store.id} value={store.store_number}>
                        {store.store_number} - {store.store_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default StorePicker;
