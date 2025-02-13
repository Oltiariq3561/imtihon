import React from 'react';

function PaidStatus({ type }) {
    // Status uchun rang klasslari
    const colors = {
        paid: '#33d69f',
        pending: '#ff8f00',
        draft: '#dfe3fa'
    };
    return (
        <div className="flex justify-center space-x-2 rounded-lg items-center px-4 py-2"
            style={{ backgroundColor: `${colors[type]}1A`, color: colors[type] }}>
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[type] }} />
            <p>{type}</p>
        </div>
    );
}

export default PaidStatus;
