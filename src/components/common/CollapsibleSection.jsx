import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = true, theme }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const t = theme;

    return (
        <div className={`${t.card} rounded-lg border ${t.border} overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between 
                    text-sm font-semibold ${t.text} 
                    p-4 
                    transition-all duration-300
                    ${t.cardHover}
                    btn-touch
                    ${isOpen ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' : ''}
                `}
            >
                <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="w-4 h-4 text-blue-500" />}
                    <span>{title}</span>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                </div>
            </button>
            <div
                className={`
                    transition-all duration-300 overflow-hidden
                    ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="p-4 pt-2 space-y-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapsibleSection;
