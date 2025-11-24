// Prompt History Manager Hook
import { useState, useCallback } from 'react';

export const usePromptHistory = () => {
    const [history, setHistory] = useState([]);
    const maxHistory = 50;

    const addToHistory = useCallback((prompt, settings) => {
        const entry = {
            id: Math.random().toString(36).substr(2, 9),
            prompt,
            settings: JSON.parse(JSON.stringify(settings)),
            timestamp: new Date(),
            score: null,
            notes: '',
        };

        setHistory(prev => {
            const newHistory = [entry, ...prev];
            if (newHistory.length > maxHistory) {
                newHistory.pop();
            }
            return newHistory;
        });

        return entry;
    }, []);

    const getHistory = useCallback(() => history, [history]);

    const getVersionDiff = useCallback((id1, id2) => {
        const v1 = history.find(h => h.id === id1);
        const v2 = history.find(h => h.id === id2);
        if (!v1 || !v2) return null;

        return {
            prompt: { from: v1.prompt, to: v2.prompt },
            settings: { from: v1.settings, to: v2.settings },
        };
    }, [history]);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    return {
        history,
        addToHistory,
        getHistory,
        getVersionDiff,
        clearHistory
    };
};

// Prompt Scorer Hook
export const usePromptScorer = () => {
    const scorePrompt = useCallback((prompt, settings, analysis) => {
        let score = 50; // Base score

        // Criteria scoring
        const criteria = {
            clarity: { weight: 20, check: () => prompt.length > 50 && prompt.length < 2000 },
            structure: { weight: 15, check: () => /[{\[]|#{1,3}\s|[-•]\s/.test(prompt) },
            specificity: { weight: 15, check: () => /\b(specific|example|format|step|detail)\b/i.test(prompt) },
            roleAssignment: { weight: 15, check: () => settings.roleAssignment && settings.roleAssignment.length > 5 },
            constraints: { weight: 10, check: () => settings.constraints && settings.constraints.length > 0 },
            examples: { weight: 10, check: () => analysis?.features?.includes('examples') },
            xmlTags: { weight: 10, check: () => /<[a-z]+>|<\/[a-z]+>/.test(prompt) },
            reasoning: { weight: 5, check: () => settings.reasoningMode === true },
        };

        Object.entries(criteria).forEach(([key, { weight, check }]) => {
            score += check() ? weight : 0;
        });

        return Math.min(100, Math.max(0, score));
    }, []);

    const getSuggestions = useCallback((prompt, settings, score) => {
        const suggestions = [];

        if (prompt.length < 50) suggestions.push("❌ Prompt too short - add more detail and context");
        if (prompt.length > 2000) suggestions.push("⚠️ Prompt very long - consider breaking into multiple steps");
        if (!/<[a-z]+>/.test(prompt)) suggestions.push("💡 Add XML tags for better structure");
        if (!settings.roleAssignment || settings.roleAssignment.length < 5)
            suggestions.push("🎯 Define a clear role assignment");
        if (!settings.constraints || settings.constraints.length === 0)
            suggestions.push("🔒 Add constraints for better control");
        if (score < 60) suggestions.push("🚀 Review and improve low-scoring areas");
        if (settings.reasoningMode === false) suggestions.push("🧠 Enable reasoning mode for complex tasks");

        return suggestions;
    }, []);

    return {
        scorePrompt,
        getSuggestions
    };
};

// Prompt Library Hook
export const usePromptLibrary = () => {
    const [library, setLibrary] = useState(() => {
        try {
            const saved = localStorage.getItem('miow_prompt_library');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const addToLibrary = useCallback((name, prompt, category, tags, description) => {
        const entry = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            prompt,
            category,
            tags: tags || [],
            description,
            usage: 0,
            rating: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setLibrary(prev => {
            const newLibrary = [...prev, entry];
            try {
                localStorage.setItem('miow_prompt_library', JSON.stringify(newLibrary));
            } catch (e) {
                console.error('Failed to save library:', e);
            }
            return newLibrary;
        });

        return entry;
    }, []);

    const searchLibrary = useCallback((query) => {
        const q = query.toLowerCase();
        return library.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.tags.some(t => t.toLowerCase().includes(q)) ||
            item.category.toLowerCase().includes(q)
        );
    }, [library]);

    const getByCategory = useCallback((category) => {
        return library.filter(item => item.category === category);
    }, [library]);

    const getTrendingPrompts = useCallback((limit = 10) => {
        return [...library]
            .sort((a, b) => b.usage - a.usage)
            .slice(0, limit);
    }, [library]);

    const ratePrompt = useCallback((id, rating) => {
        setLibrary(prev => {
            const newLibrary = prev.map(prompt => {
                if (prompt.id === id) {
                    return {
                        ...prompt,
                        rating: (prompt.rating + rating) / 2,
                        updatedAt: new Date()
                    };
                }
                return prompt;
            });

            try {
                localStorage.setItem('miow_prompt_library', JSON.stringify(newLibrary));
            } catch (e) {
                console.error('Failed to save library:', e);
            }

            return newLibrary;
        });
    }, []);

    const deleteFromLibrary = useCallback((id) => {
        setLibrary(prev => {
            const newLibrary = prev.filter(p => p.id !== id);
            try {
                localStorage.setItem('miow_prompt_library', JSON.stringify(newLibrary));
            } catch (e) {
                console.error('Failed to save library:', e);
            }
            return newLibrary;
        });
    }, []);

    return {
        library,
        addToLibrary,
        searchLibrary,
        getByCategory,
        getTrendingPrompts,
        ratePrompt,
        deleteFromLibrary
    };
};
