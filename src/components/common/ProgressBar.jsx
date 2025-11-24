import React from 'react';

const ProgressBar = React.memo(({ value, max = 100, color = "bg-gradient-to-r from-emerald-400 to-green-500" }) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="w-full h-2.5 bg-gray-700/30 dark:bg-gray-800/50 rounded-full overflow-hidden relative">
            <div
                className={`h-full ${color} transition-all duration-500 ease-out relative overflow-hidden`}
                style={{ width: `${percentage}%` }}
            >
                {/* Shimmer effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{
                        animation: 'shimmer 2s infinite',
                        animationDelay: '0.5s'
                    }}
                />
            </div>
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
