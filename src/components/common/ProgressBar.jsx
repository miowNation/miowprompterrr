import React from 'react';

const ProgressBar = React.memo(({ value, max = 100, color, size = "sm", showLabel = false }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizes = {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
    };

    // Determine color based on value if not provided
    const getColor = () => {
        if (color) return color;
        if (percentage >= 80) return 'bg-emerald-500';
        if (percentage >= 60) return 'bg-blue-500';
        if (percentage >= 40) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className="w-full">
            <div className={`
                w-full bg-slate-200 dark:bg-slate-700 
                rounded-full overflow-hidden
                ${sizes[size] || sizes.sm}
            `}>
                <div
                    className={`
                        ${getColor()} rounded-full
                        transition-all duration-300 ease-out
                        ${sizes[size] || sizes.sm}
                    `}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <div className="flex justify-between mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>{value}</span>
                    <span>{max}</span>
                </div>
            )}
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
