import React, { useState, useRef, useEffect } from "react";
import {
  Lightbulb,
  Zap,
  CheckCircle,
  AlertCircle,
  Settings,
  Plus,
  X,
  Copy,
  Download,
  Upload,
  Trash2,
  Save,
  Book,
  Layers,
  Target,
  Wand2,
  Sparkles,
  Brain,
  Eye,
  Users,
  Cpu,
  Moon,
  Sun,
} from "lucide-react";
import {
  interestModes,
  personalities,
  perspectiveModes,
  presetModes,
  reasoningTemplates,
  rolePresets,
  taskTypes,
  techniquesByTier,
  tiers,
  tones,
  focusOptions,
  constraintOptions,
  quickTemplates
} from "./constants";
import { useMiowNationLogic } from "./useM";

const MiowNation = () => {
  const logic = useMiowNationLogic();

  const {
    inputPrompt,
    setInputPrompt,
    improvedPrompt,
    setImprovedPrompt,
    analysis,
    activeTab,
    setActiveTab,
    theme,
    setTheme,
    fileInputRef,
    settings,
    setSettings,
    examples,
    setExamples,
    newExample,
    setNewExample,
    variables,
    setVariables,
    newVariable,
    setNewVariable,
    customCategories,
    setCustomCategories,
    newCategory,
    setNewCategory,
    savedPrompts,
    setSavedPrompts,
    promptName,
    setPromptName,
    promptTags,
    setPromptTags,
    savedSearch,
    setSavedSearch,
    serializeState,
    deserializeState,
    loadPresetMode,
    generatePromptByTechnique,
    improvePrompt,
    loadQuickTemplate,
    addExample,
    removeExample,
    addVariable,
    removeVariable,
    addCategory,
    removeCategory,
    toggleFocus,
    toggleConstraint,
    savePrompt,
    loadPrompt,
    deletePrompt,
    exportPrompt,
    importPrompt,
    resetAll,
  } = logic;

  // Theme configuration
  const themes = {
    dark: {
      bg: "bg-gray-950",
      card: "bg-gray-900",
      cardHover: "hover:bg-gray-850",
      border: "border-gray-800",
      borderHover: "hover:border-gray-700",
      text: "text-gray-100",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-500",
      input: "bg-gray-900 border-gray-800 text-gray-100 focus:border-gray-700",
      button: "bg-gray-800 text-gray-100 hover:bg-gray-750",
      buttonActive: "bg-gray-100 text-gray-900",
      accent: "bg-gray-100 text-gray-900",
      accentHover: "hover:bg-gray-200",
      divider: "border-gray-800",
    },
    light: {
      bg: "bg-gray-50",
      card: "bg-white",
      cardHover: "hover:bg-gray-50",
      border: "border-gray-200",
      borderHover: "hover:border-gray-300",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      textMuted: "text-gray-500",
      input: "bg-white border-gray-200 text-gray-900 focus:border-gray-400",
      button: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      buttonActive: "bg-gray-900 text-gray-100",
      accent: "bg-gray-900 text-gray-100",
      accentHover: "hover:bg-gray-800",
      divider: "border-gray-200",
    }
  };

  const t = themes[theme];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${t.bg} ${t.text}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Wand2 className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">MiowNation</h1>
                <p className={`text-sm ${t.textSecondary}`}>Prompt Engineering Studio</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-lg transition-colors ${t.button}`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={resetAll}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${t.button}`}
              >
                Reset
              </button>
              <button
                onClick={() => {
                  const hash = serializeState();
                  navigator.clipboard.writeText(`${location.origin}${location.pathname}#p=${hash}`);
                  alert("Shareable URL copied!");
                }}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${t.button}`}
              >
                Share
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className={`flex gap-1 p-1 rounded-lg border ${t.border} ${t.card}`}>
            {[
              { id: "presets", label: "Presets", icon: Cpu },
              { id: "builder", label: "Builder", icon: Layers },
              { id: "templates", label: "Templates", icon: Sparkles },
              { id: "guide", label: "Guide", icon: Book },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id ? t.buttonActive : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Presets Tab */}
        {activeTab === "presets" && (
          <div className={`${t.card} rounded-lg border ${t.border} p-6`}>
            <h2 className="text-xl font-semibold mb-2">Quick Start Presets</h2>
            <p className={`${t.textSecondary} text-sm mb-6`}>
              Pre-configured modes optimized for specific use cases
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presetModes.map((mode) => (
                <div
                  key={mode.id}
                  className={`border ${t.border} rounded-lg p-4 transition-colors ${t.cardHover}`}
                >
                  <h3 className="font-semibold mb-2">{mode.name}</h3>
                  <p className={`text-sm ${t.textSecondary} mb-4`}>{mode.desc}</p>
                  <button
                    onClick={() => loadPresetMode(mode.id)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${t.accent} ${t.accentHover}`}
                  >
                    Load Preset
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className={`${t.card} rounded-lg border ${t.border} p-6`}>
            <h2 className="text-xl font-semibold mb-2">Quick Templates</h2>
            <p className={`${t.textSecondary} text-sm mb-6`}>
              Proven prompt structures for exceptional results
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTemplates.map((template, i) => (
                <div
                  key={i}
                  className={`border ${t.border} rounded-lg p-4 transition-colors ${t.cardHover}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{template.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} ${t.textSecondary}`}>
                      {template.category}
                    </span>
                  </div>
                  <p className={`text-sm font-mono ${t.textSecondary} mb-3`}>
                    {template.template}
                  </p>
                  <button
                    onClick={() => loadQuickTemplate(template.template)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${t.accent} ${t.accentHover}`}
                  >
                    Load Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guide Tab */}
        {activeTab === "guide" && (
          <div className={`${t.card} rounded-lg border ${t.border} p-6 max-h-[70vh] overflow-y-auto`}>
            <h2 className="text-xl font-semibold mb-6">Prompt Engineering Guide</h2>

            {tiers.map((tier) => (
              <div key={tier.id} className={`border-l-2 ${t.border} pl-4 mb-6`}>
                <h3 className="text-lg font-semibold mb-3">
                  {tier.label} - {tier.desc}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {techniquesByTier[tier.id].map((tech) => (
                    <div key={tech.id} className={`border ${t.border} rounded p-3`}>
                      <div className="font-medium text-sm mb-1">{tech.label}</div>
                      <div className={`text-xs ${t.textSecondary}`}>{tech.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className={`border-l-2 ${t.border} pl-4 mt-6`}>
              <h3 className="font-semibold mb-3">Master Principles</h3>
              <ul className={`text-sm ${t.textSecondary} space-y-2`}>
                <li>• <strong>Clarity:</strong> Be specific and unambiguous</li>
                <li>• <strong>Structure:</strong> Use XML tags for organization</li>
                <li>• <strong>Verification:</strong> Request reasoning and evidence</li>
                <li>• <strong>Examples:</strong> Few-shot learning is powerful</li>
                <li>• <strong>Iteration:</strong> Systematically refine prompts</li>
              </ul>
            </div>
          </div>
        )}

        {/* Builder Tab */}
        {activeTab === "builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {/* Personality */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Personality
                </h3>
                <select
                  value={settings.personality}
                  onChange={(e) => setSettings({ ...settings, personality: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                >
                  {personalities.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.icon} {p.name}
                    </option>
                  ))}
                </select>
                {settings.personality !== "none" && (
                  <p className={`text-xs ${t.textMuted} mt-2`}>
                    {personalities.find((p) => p.id === settings.personality)?.desc}
                  </p>
                )}
              </div>

              {/* Tier Selection */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Tier
                </h3>
                <div className="space-y-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          tier: tier.id,
                          technique: techniquesByTier[tier.id][0].id,
                        })
                      }
                      className={`w-full p-2 rounded-lg text-left text-sm font-medium transition-colors ${
                        settings.tier === tier.id ? t.buttonActive : t.button
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technique */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Technique</h3>
                <div className="space-y-1">
                  {techniquesByTier[settings.tier].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setSettings({ ...settings, technique: tech.id })}
                      className={`w-full p-2 rounded-lg text-left text-sm transition-colors ${
                        settings.technique === tech.id ? t.buttonActive : t.button
                      }`}
                    >
                      {tech.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reasoning Mode */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Reasoning
                </h3>
                <label className={`flex items-center text-sm ${t.textSecondary} mb-3`}>
                  <input
                    type="checkbox"
                    checked={settings.reasoningMode}
                    onChange={(e) =>
                      setSettings({ ...settings, reasoningMode: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Enable Advanced Reasoning
                </label>
                {settings.reasoningMode && (
                  <select
                    value={settings.reasoningSteps}
                    onChange={(e) =>
                      setSettings({ ...settings, reasoningSteps: e.target.value })
                    }
                    className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                  >
                    {Object.entries(reasoningTemplates).map(([key, template]) => (
                      <option key={key} value={key}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Interest Amplifier */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Interest Amplifier
                </h3>
                <label className={`block text-xs ${t.textSecondary} mb-1`}>Perspective</label>
                <select
                  value={settings.interestMode}
                  onChange={(e) => setSettings({ ...settings, interestMode: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm mb-3 transition-colors ${t.input}`}
                >
                  {interestModes.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.label}
                    </option>
                  ))}
                </select>

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Expert Level</label>
                <select
                  value={settings.perspectiveMode}
                  onChange={(e) => setSettings({ ...settings, perspectiveMode: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                >
                  {perspectiveModes.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Task Type */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Task Type</h3>
                <select
                  value={settings.taskType}
                  onChange={(e) => setSettings({ ...settings, taskType: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                >
                  {taskTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Role */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Custom Role</h3>
                <input
                  type="text"
                  value={settings.roleAssignment}
                  onChange={(e) => setSettings({ ...settings, roleAssignment: e.target.value })}
                  placeholder={rolePresets[settings.taskType]}
                  className={`w-full p-2 rounded-lg border text-sm mb-2 transition-colors ${t.input}`}
                />

                <label className={`block text-xs ${t.textSecondary} mb-1 mt-3`}>IQ Level</label>
                <input
                  type="number"
                  value={settings.iqLevel}
                  onChange={(e) => setSettings({ ...settings, iqLevel: e.target.value })}
                  placeholder="130"
                  min="100"
                  max="180"
                  className={`w-full p-2 rounded-lg border text-sm mb-2 transition-colors ${t.input}`}
                />

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Expertise</label>
                <select
                  value={settings.expertise}
                  onChange={(e) => setSettings({ ...settings, expertise: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm mb-2 transition-colors ${t.input}`}
                >
                  <option value="expert">Expert</option>
                  <option value="world-class expert">World-Class Expert</option>
                  <option value="leading authority">Leading Authority</option>
                  <option value="pioneer">Pioneer in Field</option>
                </select>

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Age (Optional)</label>
                <input
                  type="number"
                  value={settings.age}
                  onChange={(e) => setSettings({ ...settings, age: e.target.value })}
                  placeholder="28"
                  className={`w-full p-2 rounded-lg border text-sm mb-2 transition-colors ${t.input}`}
                />

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Background</label>
                <input
                  type="text"
                  value={settings.background}
                  onChange={(e) => setSettings({ ...settings, background: e.target.value })}
                  placeholder="Additional context..."
                  className={`w-full p-2 rounded-lg border text-sm mb-2 transition-colors ${t.input}`}
                />

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Tone</label>
                <select
                  value={settings.tone}
                  onChange={(e) => setSettings({ ...settings, tone: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Options */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Options</h3>
                <div className="space-y-2">
                  <label className={`flex items-center text-sm ${t.textSecondary}`}>
                    <input
                      type="checkbox"
                      checked={settings.useXML}
                      onChange={(e) => setSettings({ ...settings, useXML: e.target.checked })}
                      className="mr-2"
                    />
                    XML Structure
                  </label>
                  <label className={`flex items-center text-sm ${t.textSecondary}`}>
                    <input
                      type="checkbox"
                      checked={settings.chainOfThought}
                      onChange={(e) =>
                        setSettings({ ...settings, chainOfThought: e.target.checked })
                      }
                      className="mr-2"
                    />
                    Chain of Thought
                  </label>
                  <label className={`flex items-center text-sm ${t.textSecondary}`}>
                    <input
                      type="checkbox"
                      checked={settings.verification}
                      onChange={(e) =>
                        setSettings({ ...settings, verification: e.target.checked })
                      }
                      className="mr-2"
                    />
                    Verification
                  </label>
                </div>

                <label className={`block text-xs ${t.textSecondary} mt-3 mb-1`}>
                  Output Format
                </label>
                <select
                  value={settings.outputFormat}
                  onChange={(e) => setSettings({ ...settings, outputFormat: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                >
                  <option value="structured">Structured</option>
                  <option value="minimal">Minimal</option>
                  <option value="detailed">Detailed</option>
                </select>

                <label className={`block text-xs ${t.textSecondary} mt-3 mb-1`}>Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Hindi">Hindi</option>
                </select>

                <label className={`block text-xs ${t.textSecondary} mt-3 mb-1`}>
                  Length Target
                </label>
                <input
                  type="text"
                  value={settings.lengthTarget}
                  onChange={(e) => setSettings({ ...settings, lengthTarget: e.target.value })}
                  placeholder="e.g., 500 words"
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                />
              </div>

              {/* Focus Areas */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Focus Areas</h3>
                <div className="space-y-2">
                  {focusOptions.map((f) => (
                    <label key={f} className={`flex items-center text-sm ${t.textSecondary}`}>
                      <input
                        type="checkbox"
                        checked={settings.focusAreas.includes(f)}
                        onChange={() => toggleFocus(f)}
                        className="mr-2"
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Constraints</h3>
                <div className="space-y-2">
                  {constraintOptions.map((c) => (
                    <label key={c} className={`flex items-center text-sm ${t.textSecondary}`}>
                      <input
                        type="checkbox"
                        checked={settings.constraints.includes(c)}
                        onChange={() => toggleConstraint(c)}
                        className="mr-2"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              {settings.taskType === "classification" && (
                <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <h3 className="font-semibold mb-3 text-sm">Categories</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addCategory()}
                      placeholder="Add category..."
                      className={`flex-1 p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                    />
                    <button
                      onClick={addCategory}
                      className={`p-2 rounded-lg transition-colors ${t.button}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {customCategories.map((cat, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-2 rounded-lg text-sm border ${t.border}`}
                      >
                        <span>
                          {String.fromCharCode(65 + i)}) {cat}
                        </span>
                        <button
                          onClick={() => removeCategory(i)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Prompts */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Saved Prompts</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    placeholder="Name..."
                    className={`flex-1 p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                  />
                  <button
                    onClick={savePrompt}
                    className={`p-2 rounded-lg transition-colors ${t.button}`}
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={savedSearch}
                  onChange={(e) => setSavedSearch(e.target.value)}
                  placeholder="Search..."
                  className={`w-full p-2 rounded-lg border text-sm mb-2 transition-colors ${t.input}`}
                />
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {savedPrompts
                    .filter((p) => {
                      if (!savedSearch.trim()) return true;
                      const q = savedSearch.toLowerCase();
                      return (
                        p.name.toLowerCase().includes(q) ||
                        (p.tags || []).some((t) => t.toLowerCase().includes(q))
                      );
                    })
                    .map((saved) => (
                      <div
                        key={saved.id}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs ${t.border}`}
                      >
                        <div className="flex-1">
                          <div className="font-medium">{saved.name}</div>
                          <div className={`${t.textMuted} text-xs`}>{saved.timestamp}</div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => loadPrompt(saved)}
                            className={`px-2 py-1 rounded text-xs transition-colors ${t.button}`}
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deletePrompt(saved.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4">
              {/* Input Prompt */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Your Prompt
                </h3>
                <textarea
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Enter your base prompt here..."
                  className={`w-full p-3 rounded-lg border resize-none font-mono text-sm h-32 transition-colors ${t.input}`}
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={improvePrompt}
                    disabled={!inputPrompt.trim()}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${t.accent} ${t.accentHover}`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Optimized Prompt
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={importPrompt}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-2 rounded-lg transition-colors ${t.button}`}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Custom Instructions */}
              <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Custom Instructions</h3>
                <textarea
                  value={settings.customInstructions}
                  onChange={(e) =>
                    setSettings({ ...settings, customInstructions: e.target.value })
                  }
                  placeholder="Add any additional custom instructions here..."
                  className={`w-full p-3 rounded-lg border resize-none text-sm h-20 transition-colors ${t.input}`}
                />
              </div>

              {/* Few-Shot Examples */}
              {settings.technique === "fewshot" && (
                <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <h3 className="font-semibold mb-3 text-sm">Few-Shot Examples</h3>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={newExample.input}
                      onChange={(e) =>
                        setNewExample({ ...newExample, input: e.target.value })
                      }
                      placeholder="Input example..."
                      className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                    />
                    <input
                      type="text"
                      value={newExample.output}
                      onChange={(e) =>
                        setNewExample({ ...newExample, output: e.target.value })
                      }
                      placeholder="Output example..."
                      className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                    />
                    <button
                      onClick={addExample}
                      className={`w-full p-2 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${t.accent} ${t.accentHover}`}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Example
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {examples.map((ex, i) => (
                      <div key={i} className={`p-2 rounded-lg border text-sm ${t.border}`}>
                        <div>
                          <strong>In:</strong> {ex.input}
                        </div>
                        <div>
                          <strong>Out:</strong> {ex.output}
                        </div>
                        <button
                          onClick={() => removeExample(i)}
                          className="text-red-500 text-xs mt-1 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Variables */}
              {settings.technique === "variables" && (
                <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <h3 className="font-semibold mb-3 text-sm">Variables</h3>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={newVariable.name}
                      onChange={(e) =>
                        setNewVariable({ ...newVariable, name: e.target.value })
                      }
                      placeholder="Variable name..."
                      className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                    />
                    <input
                      type="text"
                      value={newVariable.description}
                      onChange={(e) =>
                        setNewVariable({ ...newVariable, description: e.target.value })
                      }
                      placeholder="Variable description..."
                      className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                    />
                    <button
                      onClick={addVariable}
                      className={`w-full p-2 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${t.accent} ${t.accentHover}`}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Variable
                    </button>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {variables.map((v, i) => (
                      <div key={i} className={`p-2 rounded-lg border text-sm ${t.border}`}>
                        <div>
                          <strong>{`{${v.name}}`}:</strong> {v.description}
                        </div>
                        <button
                          onClick={() => removeVariable(i)}
                          className="text-red-500 text-xs mt-1 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prefill */}
              {settings.technique === "prefill" && (
                <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <h3 className="font-semibold mb-3 text-sm">Response Prefill</h3>
                  <textarea
                    value={settings.prefillResponse}
                    onChange={(e) =>
                      setSettings({ ...settings, prefillResponse: e.target.value })
                    }
                    placeholder="Start the AI's response with..."
                    className={`w-full p-2 rounded-lg border text-sm h-16 transition-colors ${t.input}`}
                  />
                </div>
              )}

              {/* Analysis */}
              {analysis && (
                <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <h3 className="font-semibold mb-3 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Analysis
                  </h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className={`p-3 rounded-lg border ${t.border}`}>
                      <div className={`text-xs ${t.textSecondary}`}>Quality</div>
                      <div className="text-2xl font-bold">{analysis.score}/100</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${t.border}`}>
                      <div className={`text-xs ${t.textSecondary}`}>Features</div>
                      <div className="text-2xl font-bold">{analysis.features.length}</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${t.border}`}>
                      <div className={`text-xs ${t.textSecondary}`}>Words</div>
                      <div className="text-2xl font-bold">{analysis.wordCount}</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${t.border}`}>
                      <div className={`text-xs ${t.textSecondary}`}>Characters</div>
                      <div className="text-2xl font-bold">{analysis.characterCount}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-medium text-sm ${t.textSecondary} mb-2`}>
                      Active Features:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.features.map((f, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 rounded text-xs border ${t.border}`}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Improved Prompt */}
              {improvedPrompt && (
                <div className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Optimized Prompt
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(improvedPrompt);
                          alert("Copied to clipboard!");
                        }}
                        className={`py-2 px-4 rounded-lg text-sm font-medium flex items-center transition-colors ${t.button}`}
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </button>
                      <div className="relative group">
                        <button
                          className={`py-2 px-4 rounded-lg text-sm font-medium flex items-center transition-colors ${t.button}`}
                        >
                          <Download className="w-4 h-4 mr-1" /> Export
                        </button>
                        <div className={`absolute right-0 mt-1 hidden group-hover:block ${t.card} border ${t.border} rounded-lg shadow-lg z-10`}>
                          <button
                            onClick={() => exportPrompt("json")}
                            className={`block w-full text-left px-4 py-2 text-sm rounded-t-lg transition-colors ${t.cardHover}`}
                          >
                            JSON
                          </button>
                          <button
                            onClick={() => exportPrompt("md")}
                            className={`block w-full text-left px-4 py-2 text-sm transition-colors ${t.cardHover}`}
                          >
                            Markdown
                          </button>
                          <button
                            onClick={() => exportPrompt("txt")}
                            className={`block w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors ${t.cardHover}`}
                          >
                            Plain Text
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`rounded-lg p-4 border max-h-96 overflow-y-auto ${t.border} ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
                    <pre className="whitespace-pre-wrap font-mono text-xs">
                      {improvedPrompt}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiowNation;