import React from 'react';

const AnimatedCard = React.memo(({ children, className = "", hover = true }) => {
    return (
        <div
            className={`
                animate-slide-up
                transition-all duration-300 
                ${hover ? "card-interactive cursor-pointer" : ""} 
                ${className}
            `}
            style={{
                animationFillMode: 'backwards',
            }}
        >
            {children}
        </div>
    );
});

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;
