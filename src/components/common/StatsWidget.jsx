import React from 'react';
import { TrendingUp } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const StatsWidget = React.memo(({ stats, theme }) => {
    const t = theme;

    const gradients = [
        'from-blue-500/20 to-purple-500/20',
        'from-cyan-500/20 to-blue-500/20',
        'from-purple-500/20 to-pink-500/20',
        'from-emerald-500/20 to-cyan-500/20',
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <AnimatedCard key={i} hover>
                    <div
                        className={`
                            ${t.card} rounded-xl border ${t.border} 
                            p-5 text-center 
                            bg-gradient-to-br ${gradients[i % gradients.length]}
                            transition-all duration-300
                            hover:shadow-xl
                        `}
                        style={{
                            animationDelay: `${i * 100}ms`
                        }}
                    >
                        <div className={`text-xs font-medium ${t.textSecondary} mb-2 uppercase tracking-wider`}>
                            {stat.label}
                        </div>
                        <div className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            {stat.value}
                        </div>
                        {stat.trend && (
                            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500">{stat.trend}%</span>
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
