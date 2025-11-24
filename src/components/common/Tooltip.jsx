import React, { useState } from 'react';

const Tooltip = React.memo(({ text, children }) => {
    const [show, setShow] = useState(false);
    return (
        <div
            className="relative inline-block group"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
                    {text}
                </div>
            )}
        </div>
    );
});

export default Tooltip;
