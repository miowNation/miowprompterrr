
// ============================================================================
// NEW FEATURE 1: PROMPT HISTORY & VERSIONING SYSTEM
// ============================================================================

const PromptHistoryManager = {
  history: [],
  maxHistory: 50,

  addToHistory: (prompt, settings, timestamp = new Date()) => {
    const entry = {
      id: Math.random().toString(36).substr(2, 9),
      prompt,
      settings: JSON.parse(JSON.stringify(settings)),
      timestamp,
      score: null,
      notes: '',
    };
    PromptHistoryManager.history.unshift(entry);
    if (PromptHistoryManager.history.length > PromptHistoryManager.maxHistory) {
      PromptHistoryManager.history.pop();
    }
    return entry;
  },

  getHistory: () => PromptHistoryManager.history,

  getVersionDiff: (id1, id2) => {
    const v1 = PromptHistoryManager.history.find(h => h.id === id1);
    const v2 = PromptHistoryManager.history.find(h => h.id === id2);
    if (!v1 || !v2) return null;

    return {
      prompt: { from: v1.prompt, to: v2.prompt },
      settings: { from: v1.settings, to: v2.settings },
    };
  },
};

// ============================================================================
// NEW FEATURE 2: PROMPT PERFORMANCE SCORING & OPTIMIZATION SUGGESTIONS
// ============================================================================

const PromptScorer = {
  scorePrompt: (prompt, settings, analysis) => {
    let score = 50; // Base score

    // Criteria scoring
    const criteria = {
      clarity: { weight: 20, check: () => prompt.length > 50 && prompt.length < 2000 },
      structure: { weight: 15, check: () => /[{\[]|#{1,3}\s|[-•]\s/.test(prompt) },
      specificity: { weight: 15, check: () => /(specific|example|format|step|detail)/i.test(prompt) },
      roleAssignment: { weight: 15, check: () => settings.roleAssignment && settings.roleAssignment.length > 5 },
      constraints: { weight: 10, check: () => settings.constraints && settings.constraints.length > 0 },
      examples: { weight: 10, check: () => analysis?.features?.includes('examples') },
      xmlTags: { weight: 10, check: () => /<[a-z]+>|<\/[a-z]+>/.test(prompt) },
      reasoning: { weight: 5, check: () => settings.reasoningMode === true },
    };

    Object.entries(criteria).forEach(([key, {weight, check}]) => {
      score += check() ? weight : 0;
    });

    return Math.min(100, Math.max(0, score));
  },

  getSuggestions: (prompt, settings, score) => {
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
  },
};

// ============================================================================
// NEW FEATURE 3: PROMPT COMPARISON & A/B TESTING
// ============================================================================

const PromptComparator = {
  comparePrompts: (prompt1, prompt2) => {
    const analysis = {
      lengthDiff: prompt2.length - prompt1.length,
      commonality: PromptComparator.calculateSimilarity(prompt1, prompt2),
      wordDiff: PromptComparator.getWordDifferences(prompt1, prompt2),
      structureDiff: PromptComparator.compareStructure(prompt1, prompt2),
    };
    return analysis;
  },

  calculateSimilarity: (str1, str2) => {
    const len = Math.max(str1.length, str2.length);
    let matches = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] === str2[i]) matches++;
    }
    return Math.round((matches / len) * 100);
  },

  getWordDifferences: (str1, str2) => {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    const added = words2.filter(w => !words1.includes(w));
    const removed = words1.filter(w => !words2.includes(w));
    return { added, removed };
  },

  compareStructure: (str1, str2) => {
    const hasXML1 = /<[a-z]+>/.test(str1);
    const hasXML2 = /<[a-z]+>/.test(str2);
    const hasList1 = /[-•*]\s/.test(str1);
    const hasList2 = /[-•*]\s/.test(str2);

    return {
      xmlUsage: { before: hasXML1, after: hasXML2 },
      listUsage: { before: hasList1, after: hasList2 },
    };
  },

  runABTest: (promptA, promptB, testSize = 10) => {
    return {
      promptA: { prompt: promptA, testSize, results: [] },
      promptB: { prompt: promptB, testSize, results: [] },
      status: 'ready',
      compareMetrics: (resultsA, resultsB) => {
        return {
          avgScoreA: resultsA.reduce((a, b) => a + b.score, 0) / resultsA.length,
          avgScoreB: resultsB.reduce((a, b) => a + b.score, 0) / resultsB.length,
          winner: resultsA > resultsB ? 'A' : 'B',
        };
      },
    };
  },
};

// ============================================================================
// NEW FEATURE 4: INTELLIGENT PROMPT LIBRARY & CATEGORIZATION
// ============================================================================

const PromptLibrary = {
  library: [],

  addToLibrary: (name, prompt, category, tags, description) => {
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
    PromptLibrary.library.push(entry);
    return entry;
  },

  searchLibrary: (query) => {
    const q = query.toLowerCase();
    return PromptLibrary.library.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  },

  getByCategory: (category) => {
    return PromptLibrary.library.filter(item => item.category === category);
  },

  getTrendingPrompts: (limit = 10) => {
    return [...PromptLibrary.library]
      .sort((a, b) => b.usage - a.usage)
      .slice(0, limit);
  },

  ratePrompt: (id, rating) => {
    const prompt = PromptLibrary.library.find(p => p.id === id);
    if (prompt) {
      prompt.rating = (prompt.rating + rating) / 2;
      prompt.updatedAt = new Date();
    }
    return prompt;
  },

  getAutoSuggestions: (currentTags) => {
    const allTags = new Set();
    PromptLibrary.library.forEach(item => {
      item.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).filter(tag => !currentTags.includes(tag));
  },

  exportLibrary: (format = 'json') => {
    if (format === 'json') {
      return JSON.stringify(PromptLibrary.library, null, 2);
    } else if (format === 'csv') {
      const headers = ['id', 'name', 'category', 'tags', 'rating', 'usage'];
      const rows = PromptLibrary.library.map(item =>
        [item.id, item.name, item.category, item.tags.join(';'), item.rating, item.usage]
      );
      return [headers, ...rows].map(r => r.join(',')).join('\n');
    }
  },
};
