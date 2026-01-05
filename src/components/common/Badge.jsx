import React from 'react';

const Badge = React.memo(({ text, variant = "default", icon: Icon, size = "md" }) => {
    // Elegant, non-neon color variants
    const variants = {
        default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        error: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        info: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-2.5 py-1 text-xs gap-1.5",
        lg: "px-3 py-1.5 text-sm gap-2",
    };

    return (
        <span className={`
            rounded-full font-medium inline-flex items-center 
            transition-colors duration-200
            ${variants[variant] || variants.default}
            ${sizes[size] || sizes.md}
        `}>
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{text}</span>
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
