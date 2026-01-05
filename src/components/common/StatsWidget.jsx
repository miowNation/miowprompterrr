import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const StatsWidget = React.memo(({ stats, theme }) => {
    const t = theme;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
                <AnimatedCard key={i} delay={i * 50}>
                    <div
                        className={`
                            ${t.card} rounded-xl border ${t.border} 
                            p-4 text-center
                            transition-all duration-200
                            ${t.cardHover}
                        `}
                    >
                        <div className={`text-xs font-medium ${t.textSecondary} mb-1 uppercase tracking-wide`}>
                            {stat.label}
                        </div>
                        <div className={`text-2xl sm:text-3xl font-bold ${t.text} mb-1`}>
                            {stat.value}
                        </div>
                        {stat.trend && (
                            <div className={`
                                flex items-center justify-center gap-1 text-xs font-medium
                                ${stat.trend.startsWith('+') || stat.trend.startsWith('↑')
                                    ? 'text-emerald-500'
                                    : 'text-red-500'
                                }
                            `}>
                                {stat.trend.startsWith('+') || stat.trend.startsWith('↑') ? (
                                    <TrendingUp className="w-3 h-3" />
                                ) : (
                                    <TrendingDown className="w-3 h-3" />
                                )}
                                <span>{stat.trend}</span>
                            </div>
                        )}
                    </div>
                </AnimatedCard>
            ))}
        </div>
    );
});

StatsWidget.displayName = 'StatsWidget';

export default StatsWidget;
