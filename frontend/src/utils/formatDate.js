export function formatDate(dateString) {
    if (!dateString) {
        return 'N/A';
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return 'N/A';
    }

    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

