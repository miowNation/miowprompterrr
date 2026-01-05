import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FeatureToggleContext = createContext(null);

// Default feature configuration - all enabled by default
const defaultFeatures = {
    // Tabs
    showPresetsTab: true,
    showTemplatesTab: true,
    showNETFrameworkTab: true,
    showGuideTab: true,

    // Analytics & Stats
    showAnalyticsWidget: true,

    // Sidebar Sections - These affect prompt generation when disabled
    enablePersonality: true,        // Personality system
    enableTierTechnique: true,      // Tier & technique selection
    enableReasoning: true,          // Advanced reasoning mode
    enablePerspectives: true,       // Interest/perspective modes
    enableTaskRole: true,           // Task type & role assignment
    enableTuning: true,             // IQ, tone, language settings
    enableFocusConstraints: true,   // Focus areas & constraints
    enableAdvancedSettings: true,   // Output format, tokens, prefill
    enableFewShot: true,            // Few-shot examples
    enableVariables: true,          // Variable templates
    enableCustomInstructions: true, // Custom instructions block

    // Saved prompts (UI only, doesn't affect generation)
    showSavedPromptsSection: true,

    // UI Options
    showBackgroundEffects: true,
    enableAnimations: true,
    compactMode: false,
};

// Settings to reset when a feature is disabled
const featureSettingsMap = {
    enablePersonality: { personality: 'none' },
    enableReasoning: { reasoningMode: false, reasoningSteps: 'standard', chainOfThought: false },
    enablePerspectives: { interestMode: 'none', perspectiveMode: 'none' },
    enableTaskRole: { taskType: 'general', roleAssignment: '' },
    enableTuning: { iqLevel: '130', tone: 'professional', language: 'English' },
    enableFocusConstraints: { focusAreas: [], constraints: [] },
    enableAdvancedSettings: { outputFormat: 'structured', maxTokens: '', lengthTarget: '', prefillResponse: '' },
    enableCustomInstructions: { customInstructions: '' },
};

export const FeatureToggleProvider = ({ children }) => {
    const [features, setFeatures] = useState(() => {
        try {
            const saved = localStorage.getItem('miow_features');
            if (saved) {
                return { ...defaultFeatures, ...JSON.parse(saved) };
            }
            return defaultFeatures;
        } catch {
            return defaultFeatures;
        }
    });

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Callbacks for when features are disabled (to reset settings)
    const [onFeatureDisabledCallbacks, setOnFeatureDisabledCallbacks] = useState({});

    // Register a callback for when a feature is disabled
    const registerOnDisable = useCallback((callback) => {
        setOnFeatureDisabledCallbacks(prev => ({ ...prev, callback }));
    }, []);

    // Toggle a specific feature
    const toggleFeature = useCallback((featureKey, settingsCallback) => {
        setFeatures(prev => {
            const newValue = !prev[featureKey];

            // If disabling a feature that affects prompt generation, trigger reset
            if (!newValue && featureSettingsMap[featureKey] && settingsCallback) {
                settingsCallback(featureSettingsMap[featureKey]);
            }

            return {
                ...prev,
                [featureKey]: newValue,
            };
        });
    }, []);

    // Set a specific feature value
    const setFeature = useCallback((featureKey, value, settingsCallback) => {
        setFeatures(prev => {
            // If disabling a feature that affects prompt generation, trigger reset
            if (!value && featureSettingsMap[featureKey] && settingsCallback) {
                settingsCallback(featureSettingsMap[featureKey]);
            }

            return {
                ...prev,
                [featureKey]: value,
            };
        });
    }, []);

    // Check if a feature is enabled
    const isEnabled = useCallback((featureKey) => {
        return features[featureKey] ?? defaultFeatures[featureKey] ?? true;
    }, [features]);

    // Get settings to reset for a feature
    const getResetSettings = useCallback((featureKey) => {
        return featureSettingsMap[featureKey] || {};
    }, []);

    // Reset to defaults
    const resetToDefaults = useCallback(() => {
        setFeatures(defaultFeatures);
    }, []);

    // Bulk update features
    const updateFeatures = useCallback((updates) => {
        setFeatures(prev => ({ ...prev, ...updates }));
    }, []);

    // Persist features
    useEffect(() => {
        try {
            localStorage.setItem('miow_features', JSON.stringify(features));
        } catch (e) {
            console.error('Failed to save feature preferences:', e);
        }
    }, [features]);

    // Feature groups for settings UI - Updated labels for clarity
    const featureGroups = {
        tabs: {
            label: 'Navigation Tabs',
            description: 'Show/hide main navigation tabs',
            features: [
                { key: 'showPresetsTab', label: 'Presets Tab' },
                { key: 'showTemplatesTab', label: 'Templates Tab' },
                { key: 'showNETFrameworkTab', label: 'NET Framework Tab' },
                { key: 'showGuideTab', label: 'Guide Tab' },
            ],
        },
        promptFeatures: {
            label: 'Prompt Features',
            description: 'Enable/disable features that affect generated prompts',
            features: [
                { key: 'enablePersonality', label: 'Personality System', desc: 'AI personas with traits and rules' },
                { key: 'enableTierTechnique', label: 'Tier & Technique', desc: 'Prompt engineering techniques' },
                { key: 'enableReasoning', label: 'Advanced Reasoning', desc: 'Chain-of-thought, step-by-step' },
                { key: 'enablePerspectives', label: 'Perspectives', desc: 'Interest modes and viewpoints' },
                { key: 'enableTaskRole', label: 'Task & Role', desc: 'Task type and role assignment' },
                { key: 'enableTuning', label: 'Tuning', desc: 'IQ, tone, language settings' },
                { key: 'enableFocusConstraints', label: 'Focus & Constraints', desc: 'Focus areas and rules' },
                { key: 'enableAdvancedSettings', label: 'Advanced Settings', desc: 'Output format, tokens, prefill' },
                { key: 'enableFewShot', label: 'Few-Shot Examples', desc: 'Example input/output pairs' },
                { key: 'enableVariables', label: 'Variables', desc: 'Template variable system' },
                { key: 'enableCustomInstructions', label: 'Custom Instructions', desc: 'Freeform instructions' },
            ],
        },
        ui: {
            label: 'UI Options',
            description: 'Visual preferences',
            features: [
                { key: 'showAnalyticsWidget', label: 'Analytics Widget' },
                { key: 'showSavedPromptsSection', label: 'Saved Prompts' },
                { key: 'showBackgroundEffects', label: 'Background Effects' },
                { key: 'enableAnimations', label: 'Animations' },
                { key: 'compactMode', label: 'Compact Mode' },
            ],
        },
    };

    return (
        <FeatureToggleContext.Provider value={{
            features,
            toggleFeature,
            setFeature,
            isEnabled,
            getResetSettings,
            resetToDefaults,
            updateFeatures,
            featureGroups,
            featureSettingsMap,
            isSettingsOpen,
            setIsSettingsOpen,
            openSettings: () => setIsSettingsOpen(true),
            closeSettings: () => setIsSettingsOpen(false),
        }}>
            {children}
        </FeatureToggleContext.Provider>
    );
};

export const useFeatureToggle = () => {
    const context = useContext(FeatureToggleContext);
    if (!context) {
        throw new Error('useFeatureToggle must be used within a FeatureToggleProvider');
    }
    return context;
};

export default FeatureToggleContext;
