import React, { useState, useRef, useEffect, useMemo } from "react";
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
  Clock,
  TrendingUp,
  GitBranch,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Info,
  Lightbulb as LightbulbIcon,
  Zap as ZapIcon,
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
  quickTemplates,
  netFramework,
} from "./constants";
import { useMiowNationLogic } from "./useM";

// Tooltip Component
const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block group">
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

// Card Component with animation
const AnimatedCard = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`transition-all duration-300 ${hover ? "hover:shadow-lg hover:scale-[1.02]" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ value, max = 100, color = "bg-green-500" }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Badge Component
const Badge = ({ text, variant = "default", icon: Icon }) => {
  const variants = {
    default: "bg-gray-700 text-gray-100 dark:bg-gray-700 dark:text-gray-100",
    success: "bg-green-900 text-green-100 dark:bg-green-900 dark:text-green-100",
    warning: "bg-yellow-900 text-yellow-100 dark:bg-yellow-900 dark:text-yellow-100",
    error: "bg-red-900 text-red-100 dark:bg-red-900 dark:text-red-100",
    info: "bg-blue-900 text-blue-100 dark:bg-blue-900 dark:text-blue-100",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${variants[variant]}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {text}
    </span>
  );
};

// Enhanced Stats Widget
const StatsWidget = ({ stats, theme }) => {
  const t = theme;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <AnimatedCard key={i} hover>
          <div className={`${t.card} rounded-lg border ${t.border} p-4 text-center transition-colors ${t.cardHover}`}>
            <div className={`text-sm ${t.textSecondary} mb-2`}>{stat.label}</div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            {stat.trend && (
              <div className="flex items-center justify-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500">{stat.trend}%</span>
              </div>
            )}
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
};

// Collapsible Section - FIXED WITH PROPER THEME COLORS
const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = true, theme }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors font-medium ${theme.cardHover} ${theme.text}`}
      >
        <div className="flex items-center gap-2 font-semibold">
          {Icon && <Icon className="w-4 h-4" />}
          {title}
        </div>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="pl-6 space-y-3 mt-2">{children}</div>}
    </div>
  );
};

// NET Framework Visualizer
const NETFrameworkVisualizer = ({ theme: t }) => {
  const [expandedLayer, setExpandedLayer] = useState(0);

  return (
    <div className={`${t.card} rounded-lg border ${t.border} p-6`}>
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5" />
        NET Framework Architecture
      </h3>
      <div className="space-y-3">
        {Object.entries(netFramework.components).map(([key, layer], idx) => (
          <div
            key={key}
            className={`border-l-4 pl-4 py-3 cursor-pointer transition-all ${
              expandedLayer === idx
                ? `border-blue-500 ${t.cardHover}`
                : `border-gray-600 dark:border-gray-600 ${t.cardHover}`
            }`}
            onClick={() => setExpandedLayer(expandedLayer === idx ? -1 : idx)}
          >
            <div className="font-semibold text-sm flex items-center justify-between">
              {layer.name}
              {expandedLayer === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            {expandedLayer === idx && (
              <div className={`mt-2 text-xs ${t.textSecondary} space-y-1`}>
                <p className="mb-2">{layer.description}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.techniques.map((tech, i) => (
                    <Badge key={i} text={tech} variant="info" />
                  ))}
                </div>
                <p className="text-blue-400 mt-2">→ {layer.purpose}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main MiowNation Component
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

  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Enhanced theme configuration with complete color mappings for dark and light modes
  const themes = {
    dark: {
      bg: "bg-gray-950",
      card: "bg-gray-900",
      cardHover: "hover:bg-gray-800",
      border: "border-gray-800",
      borderHover: "hover:border-gray-700",
      text: "text-gray-100",
      textSecondary: "text-gray-400",
      textMuted: "text-gray-500",
      input: "bg-gray-900 border-gray-800 text-gray-100 placeholder-gray-500 focus:border-blue-600 focus:outline-none",
      button: "bg-gray-800 text-gray-100 hover:bg-gray-700",
      buttonActive: "bg-blue-600 text-white",
      accent: "bg-blue-600 text-white",
      accentHover: "hover:bg-blue-700",
      divider: "border-gray-800",
      gradient: "from-gray-900 to-gray-950",
      tabInactive: "text-gray-400 hover:text-gray-200",
      listItemHover: "hover:bg-gray-800",
    },
    light: {
      bg: "bg-white",
      card: "bg-gray-50",
      cardHover: "hover:bg-gray-100",
      border: "border-gray-300",
      borderHover: "hover:border-gray-400",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      textMuted: "text-gray-500",
      input: "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none",
      button: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      buttonActive: "bg-blue-600 text-white",
      accent: "bg-blue-600 text-white",
      accentHover: "hover:bg-blue-700",
      divider: "border-gray-300",
      gradient: "from-gray-50 to-white",
      tabInactive: "text-gray-600 hover:text-gray-900",
      listItemHover: "hover:bg-gray-100",
    },
  };

  const t = themes[theme];

  // Memoized stats
  const stats = useMemo(
    () => [
      {
        label: "Quality Score",
        value: analysis?.score || "0",
        trend: analysis ? (analysis.score > 70 ? "↑85" : "↑60") : null,
      },
      {
        label: "Active Features",
        value: analysis?.features.length || "0",
      },
      {
        label: "Word Count",
        value: analysis?.wordCount || "0",
      },
      {
        label: "Saved Prompts",
        value: savedPrompts.length,
      },
    ],
    [analysis, savedPrompts]
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${t.bg} ${t.text}`}>
      {/* Gradient Background */}
      <div
        className={`fixed top-0 left-0 right-0 h-96 bg-gradient-to-br ${t.gradient} opacity-50 pointer-events-none`}
      />

      <div className="relative z-10 max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-lg shadow-lg flex-shrink-0">
                <Wand2 className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight truncate">MiowNation</h1>
                <p className={`text-xs sm:text-sm ${t.textSecondary} truncate`}>
                  Advanced Prompt Engineering Studio with NET Framework
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-lg transition-colors ${t.button}`}
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`p-2 rounded-lg transition-colors ${t.button}`}
                title="Toggle analytics"
              >
                <TrendingUp className="w-5 h-5" />
              </button>
              <button
                onClick={resetAll}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors ${t.button}`}
                title="Reset all settings"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  const hash = serializeState();
                  navigator.clipboard.writeText(`${location.origin}${location.pathname}#p=${hash}`);
                  alert("Shareable URL copied! 📋");
                }}
                className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors ${t.accent} ${t.accentHover}`}
              >
                Share
              </button>
            </div>
          </div>

          {/* Analytics Bar */}
          {showAnalytics && (
            <div className="mb-6 animate-in fade-in">
              <StatsWidget stats={stats} theme={t} />
            </div>
          )}

          {/* Tabs */}
          <div className={`flex gap-1 p-1 rounded-lg border ${t.border} ${t.card} overflow-x-auto`}>
            {[
              { id: "presets", label: "Presets", icon: Cpu },
              { id: "builder", label: "Builder", icon: Layers },
              { id: "templates", label: "Templates", icon: Sparkles },
              { id: "net", label: "NET Framework", icon: Brain },
              { id: "guide", label: "Guide", icon: Book },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id ? t.buttonActive : `${t.textSecondary} ${t.tabInactive}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* NET Framework Tab */}
        {activeTab === "net" && (
          <div className="space-y-6">
            <NETFrameworkVisualizer theme={t} />

            <div className={`${t.card} rounded-lg border ${t.border} p-4 sm:p-6`}>
              <h3 className="font-bold text-lg mb-4">Decision Matrix</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(netFramework.decisionMatrix).map(([task, config]) => (
                  <div key={task} className={`border ${t.border} rounded-lg p-4 ${t.cardHover}`}>
                    <h4 className="font-semibold mb-2 capitalize">{task.replace(/_/g, " ")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {config.techniques.map((tech, i) => (
                        <Badge key={i} text={tech} variant="success" />
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-green-400">
                      Expected: {config.expectedPerformance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Presets Tab */}
        {activeTab === "presets" && (
          <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4 sm:p-6`}>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              Quick Start Presets
            </h2>
            <p className={`${t.textSecondary} text-sm mb-6`}>
              Pre-configured modes optimized for specific use cases (including NET Framework techniques)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presetModes.map((mode) => (
                <AnimatedCard key={mode.id} hover className={`border ${t.border} rounded-lg p-4 transition-all ${t.cardHover}`}>
                  <h3 className="font-semibold mb-2 text-lg">{mode.name}</h3>
                  <p className={`text-sm ${t.textSecondary} mb-3 min-h-10`}>{mode.desc}</p>
                  {mode.config.performanceGain && (
                    <Badge
                      text={mode.config.performanceGain}
                      variant="success"
                      icon={TrendingUp}
                    />
                  )}
                  <button
                    onClick={() => loadPresetMode(mode.id)}
                    className={`w-full mt-4 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${t.accent} ${t.accentHover}`}
                  >
                    Load Preset
                  </button>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedCard>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4 sm:p-6`}>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Quick Templates
            </h2>
            <p className={`${t.textSecondary} text-sm mb-6`}>
              Proven prompt structures and advanced reasoning patterns
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTemplates.map((template, i) => (
                <AnimatedCard key={i} hover className={`border ${t.border} rounded-lg p-4 transition-all ${t.cardHover}`}>
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="font-semibold flex-1 text-sm sm:text-base">{template.name}</h3>
                    <Badge text={template.category} variant="info" />
                  </div>
                  <p className={`text-xs font-mono ${t.textSecondary} mb-3 line-clamp-3`}>
                    {template.template}
                  </p>
                  <button
                    onClick={() => loadQuickTemplate(template.template)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${t.accent} ${t.accentHover}`}
                  >
                    Load Template
                  </button>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedCard>
        )}

        {/* Guide Tab */}
        {activeTab === "guide" && (
          <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4 sm:p-6 max-h-[70vh] overflow-y-auto`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Book className="w-6 h-6" />
              Prompt Engineering Guide
            </h2>

            {tiers.map((tier) => (
              <CollapsibleSection
                key={tier.id}
                title={`${tier.label} - ${tier.desc}`}
                icon={Target}
                defaultOpen={tier.id === "tier1"}
                theme={t}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {techniquesByTier[tier.id].map((tech) => (
                    <div
                      key={tech.id}
                      className={`border ${t.border} rounded p-3 transition-colors ${t.cardHover}`}
                    >
                      <div className="font-medium text-sm mb-1 flex items-center gap-2">
                        <ZapIcon className="w-3 h-3" />
                        {tech.label}
                      </div>
                      <div className={`text-xs ${t.textSecondary}`}>{tech.desc}</div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            ))}

            <CollapsibleSection title="Master Principles" icon={LightbulbIcon} defaultOpen={true} theme={t}>
              <ul className={`text-sm ${t.textSecondary} space-y-2`}>
                <li>• <strong className={t.text}>Clarity:</strong> Be specific and unambiguous</li>
                <li>• <strong className={t.text}>Structure:</strong> Use XML tags and clear formatting</li>
                <li>• <strong className={t.text}>Verification:</strong> Request reasoning and evidence</li>
                <li>• <strong className={t.text}>Examples:</strong> Few-shot learning is powerful</li>
                <li>• <strong className={t.text}>Iteration:</strong> Systematically refine prompts</li>
                <li>• <strong className={t.text}>Technique Selection:</strong> Match technique to task type</li>
                <li>• <strong className={t.text}>Combination:</strong> NET Framework combines techniques intelligently</li>
              </ul>
            </CollapsibleSection>
          </AnimatedCard>
        )}

        {/* Builder Tab */}
        {activeTab === "builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Sidebar */}
            <div
              className={`lg:col-span-1 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 transition-all ${
                !expandedSidebar && "hidden"
              }`}
            >
              <CollapsibleSection title="Personality" icon={Users} defaultOpen={true} theme={t}>
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
              </CollapsibleSection>

              <CollapsibleSection title="Tier & Technique" icon={Target} defaultOpen={true} theme={t}>
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
                        settings.tier === tier.id ? t.buttonActive : `${t.button}`
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>

                <div className="mt-3 space-y-1">
                  {techniquesByTier[settings.tier].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setSettings({ ...settings, technique: tech.id })}
                      className={`w-full p-2 rounded-lg text-left text-sm transition-colors ${
                        settings.technique === tech.id ? t.buttonActive : `${t.button}`
                      }`}
                    >
                      {tech.label}
                    </button>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Reasoning" icon={Brain} defaultOpen={false} theme={t}>
                <label className={`flex items-center text-sm ${t.textSecondary}`}>
                  <input
                    type="checkbox"
                    checked={settings.reasoningMode}
                    onChange={(e) =>
                      setSettings({ ...settings, reasoningMode: e.target.checked })
                    }
                    className="mr-2 cursor-pointer"
                  />
                  Enable Advanced Reasoning
                </label>
                {settings.reasoningMode && (
                  <select
                    value={settings.reasoningSteps}
                    onChange={(e) =>
                      setSettings({ ...settings, reasoningSteps: e.target.value })
                    }
                    className={`w-full p-2 rounded-lg border text-sm mt-2 transition-colors ${t.input}`}
                  >
                    {Object.entries(reasoningTemplates).map(([key, template]) => (
                      <option key={key} value={key}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                )}
              </CollapsibleSection>

              <CollapsibleSection title="Perspectives" icon={Eye} defaultOpen={false} theme={t}>
                <label className={`block text-xs ${t.textSecondary} mb-1`}>Interest Mode</label>
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
              </CollapsibleSection>

              <CollapsibleSection title="Task & Role" icon={Settings} defaultOpen={false} theme={t}>
                <label className={`block text-xs ${t.textSecondary} mb-1`}>Task Type</label>
                <select
                  value={settings.taskType}
                  onChange={(e) => setSettings({ ...settings, taskType: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm mb-3 transition-colors ${t.input}`}
                >
                  {taskTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Custom Role</label>
                <input
                  type="text"
                  value={settings.roleAssignment}
                  onChange={(e) => setSettings({ ...settings, roleAssignment: e.target.value })}
                  placeholder={rolePresets[settings.taskType]}
                  className={`w-full p-2 rounded-lg border text-sm transition-colors ${t.input}`}
                />
              </CollapsibleSection>

              <CollapsibleSection title="Tuning" icon={Zap} defaultOpen={false} theme={t}>
                <label className={`block text-xs ${t.textSecondary} mb-1`}>IQ Level: {settings.iqLevel}</label>
                <input
                  type="range"
                  value={settings.iqLevel}
                  onChange={(e) => setSettings({ ...settings, iqLevel: parseInt(e.target.value) })}
                  min="100"
                  max="180"
                  className="w-full mb-3"
                />

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Tone</label>
                <select
                  value={settings.tone}
                  onChange={(e) => setSettings({ ...settings, tone: e.target.value })}
                  className={`w-full p-2 rounded-lg border text-sm mb-3 transition-colors ${t.input}`}
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>

                <label className={`block text-xs ${t.textSecondary} mb-1`}>Language</label>
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
              </CollapsibleSection>

              <CollapsibleSection title="Focus & Constraints" icon={Target} defaultOpen={false} theme={t}>
                <div className="space-y-2 mb-3">
                  {focusOptions.slice(0, 4).map((f) => (
                    <label key={f} className={`flex items-center text-sm ${t.textSecondary} cursor-pointer`}>
                      <input
                        type="checkbox"
                        checked={settings.focusAreas.includes(f)}
                        onChange={() => toggleFocus(f)}
                        className="mr-2 cursor-pointer"
                      />
                      {f}
                    </label>
                  ))}
                </div>
                <div className="space-y-2">
                  {constraintOptions.slice(0, 4).map((c) => (
                    <label key={c} className={`flex items-center text-sm ${t.textSecondary} cursor-pointer`}>
                      <input
                        type="checkbox"
                        checked={settings.constraints.includes(c)}
                        onChange={() => toggleConstraint(c)}
                        className="mr-2 cursor-pointer"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Saved Prompts" icon={Save} defaultOpen={false} theme={t}>
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
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs ${t.border} ${t.listItemHover} transition-colors`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{saved.name}</div>
                          <div className={`${t.textMuted} text-xs`}>{saved.timestamp}</div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => loadPrompt(saved)}
                            className={`px-2 py-1 rounded text-xs transition-colors ${t.button}`}
                          >
                            Load
                          </button>
                          <button
                            onClick={() => deletePrompt(saved.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </CollapsibleSection>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4">
              <button
                onClick={() => setExpandedSidebar(!expandedSidebar)}
                className={`lg:hidden p-2 rounded-lg ${t.button}`}
              >
                {expandedSidebar ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Input Prompt */}
              <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4`}>
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
                {inputPrompt && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className={t.textSecondary}>{inputPrompt.length} characters</span>
                    <ProgressBar value={Math.min(inputPrompt.length, 500)} max={500} />
                  </div>
                )}
                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={improvePrompt}
                    disabled={!inputPrompt.trim()}
                    className={`flex-1 min-w-[150px] py-2 px-4 rounded-lg font-medium flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${t.accent} ${t.accentHover}`}
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
                    title="Import prompt"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
              </AnimatedCard>

              {/* Custom Instructions */}
              <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4`}>
                <h3 className="font-semibold mb-3 text-sm">Custom Instructions</h3>
                <textarea
                  value={settings.customInstructions}
                  onChange={(e) =>
                    setSettings({ ...settings, customInstructions: e.target.value })
                  }
                  placeholder="Add any additional custom instructions here..."
                  className={`w-full p-3 rounded-lg border resize-none text-sm h-20 transition-colors ${t.input}`}
                />
              </AnimatedCard>

              {/* Few-Shot Examples */}
              {settings.technique === "fewshot" && (
                <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4`}>
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
                      <div key={i} className={`p-2 rounded-lg border text-sm ${t.border} ${t.cardHover}`}>
                        <div>
                          <strong>In:</strong> {ex.input}
                        </div>
                        <div>
                          <strong>Out:</strong> {ex.output}
                        </div>
                        <button
                          onClick={() => removeExample(i)}
                          className="text-red-500 text-xs mt-1 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              )}

              {/* Variables */}
              {settings.technique === "variables" && (
                <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4`}>
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
                      <div key={i} className={`p-2 rounded-lg border text-sm ${t.border} ${t.cardHover}`}>
                        <div>
                          <strong>{`{${v.name}}`}:</strong> {v.description}
                        </div>
                        <button
                          onClick={() => removeVariable(i)}
                          className="text-red-500 text-xs mt-1 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              )}

              {/* Analysis */}
              {analysis && (
                <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <h3 className="font-semibold mb-4 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Analysis & Metrics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className={`p-3 rounded-lg border ${t.border}`}>
                      <div className={`text-xs ${t.textSecondary}`}>Quality Score</div>
                      <div className="text-2xl font-bold">{analysis.score}%</div>
                      <ProgressBar value={analysis.score} color="bg-blue-500" />
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
                    <h4 className={`font-medium text-sm ${t.textSecondary} mb-2`}>Active Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.features.map((f, i) => (
                        <Badge key={i} text={f} variant="success" />
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              )}

              {/* Improved Prompt */}
              {improvedPrompt && (
                <AnimatedCard className={`${t.card} rounded-lg border ${t.border} p-4`}>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h3 className="font-semibold text-sm flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Optimized Prompt
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(improvedPrompt);
                          alert("Copied to clipboard! 📋");
                        }}
                        className={`py-2 px-4 rounded-lg text-sm font-medium flex items-center transition-colors ${t.button}`}
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </button>
                      <div className="relative group">
                        <button className={`py-2 px-4 rounded-lg text-sm font-medium flex items-center transition-colors ${t.button}`}>
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
                  <div
                    className={`rounded-lg p-4 border max-h-96 overflow-y-auto ${t.border} ${
                      theme === "dark" ? "bg-gray-950" : "bg-gray-50"
                    }`}
                  >
                    <pre className={`whitespace-pre-wrap font-mono text-xs ${t.text}`}>{improvedPrompt}</pre>
                  </div>
                </AnimatedCard>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiowNation;