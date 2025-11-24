import React from 'react';

const Badge = React.memo(({ text, variant = "default", icon: Icon }) => {
    const variants = {
        default: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600",
        success: "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-400 hover:to-green-500",
        warning: "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500",
        error: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-400 hover:to-pink-500",
        info: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-400 hover:to-purple-500",
    };

    return (
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-lg ${variants[variant]}`}>
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{text}</span>
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
