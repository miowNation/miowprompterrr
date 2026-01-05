import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = true, theme }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const t = theme;

    return (
        <div className={`
            ${t.card} rounded-xl border ${t.border} 
            overflow-hidden transition-all duration-200
        `}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between 
                    text-sm font-medium ${t.text} 
                    p-4 
                    transition-colors duration-200
                    ${t.cardHover}
                    btn-touch
                    ${isOpen ? `border-l-2 border-l-blue-500` : 'border-l-2 border-l-transparent'}
                `}
            >
                <div className="flex items-center gap-2.5">
                    {Icon && <Icon className={`w-4 h-4 ${isOpen ? 'text-blue-500' : t.textSecondary}`} />}
                    <span>{title}</span>
                </div>
                <div className={`
                    transition-transform duration-200 ${t.textSecondary}
                    ${isOpen ? 'rotate-180' : ''}
                `}>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </button>
            <div
                className={`
                    transition-all duration-200 overflow-hidden
                    ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className={`p-4 pt-2 space-y-2 border-t ${t.border}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapsibleSection;
