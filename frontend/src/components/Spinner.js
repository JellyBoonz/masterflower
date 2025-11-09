// Simple loading spinner component
function Spinner({ size = 20, color = '#007bff' }) {
    return (
        <div style={{
            display: 'inline-block',
            width: `${size}px`,
            height: `${size}px`,
            border: `3px solid ${color}20`,
            borderTop: `3px solid ${color}`,
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
        }} />
    );
}

export default Spinner;

