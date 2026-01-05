import React from 'react';

const Switch = React.memo(({ checked, onChange, disabled = false, size = 'md' }) => {
    const sizes = {
        sm: {
            track: 'w-8 h-4',
            thumb: 'w-3 h-3',
            translate: 'translate-x-4',
        },
        md: {
            track: 'w-10 h-5',
            thumb: 'w-4 h-4',
            translate: 'translate-x-5',
        },
        lg: {
            track: 'w-12 h-6',
            thumb: 'w-5 h-5',
            translate: 'translate-x-6',
        },
    };

    const s = sizes[size] || sizes.md;

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange?.(!checked)}
            className={`
        relative inline-flex items-center shrink-0 cursor-pointer rounded-full 
        transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${s.track}
        ${checked
                    ? 'bg-blue-600'
                    : 'bg-slate-300 dark:bg-slate-600'
                }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            <span
                className={`
          pointer-events-none inline-block rounded-full bg-white shadow-sm
          transform transition-transform duration-200 ease-in-out
          ${s.thumb}
          ${checked ? s.translate : 'translate-x-0.5'}
        `}
            />
        </button>
    );
});

Switch.displayName = 'Switch';

export default Switch;
