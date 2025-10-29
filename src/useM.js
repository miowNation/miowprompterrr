import { useState, useRef, useEffect } from "react";
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

export const useMiowNationLogic = () => {
  const [inputPrompt, setInputPrompt] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("builder");
  const [theme, setTheme] = useState("dark");
  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState({
    tier: "tier3",
    technique: "xml",
    taskType: "general",
    roleAssignment: "",
    tone: "professional",
    outputFormat: "structured",
    useXML: true,
    examples: [],
    exampleCount: 2,
    chainOfThought: false,
    prefillResponse: "",
    variables: [],
    verification: false,
    lengthTarget: "",
    maxTokens: "",
    language: "English",
    focusAreas: ["Accuracy"],
    constraints: ["Use examples"],
    customInstructions: "",
    reasoningMode: false,
    reasoningSteps: "standard",
    interestMode: "none",
    perspectiveMode: "none",
    personality: "none",
    iqLevel: "130",
    expertise: "expert",
    age: "28",
    background: "",
  });

  const [examples, setExamples] = useState([]);
  const [newExample, setNewExample] = useState({ input: "", output: "" });
  const [variables, setVariables] = useState([]);
  const [newVariable, setNewVariable] = useState({ name: "", description: "" });
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptName, setPromptName] = useState("");
  const [promptTags, setPromptTags] = useState("");
  const [savedSearch, setSavedSearch] = useState("");

  // ---------- URL Share/Load ----------
  const serializeState = () => {
    const payload = {
      inputPrompt,
      settings,
      examples,
      variables,
      customCategories,
    };
    try {
      const json = JSON.stringify(payload);
      return btoa(unescape(encodeURIComponent(json)));
    } catch (e) {
      return "";
    }
  };

  const deserializeState = (hash) => {
    try {
      const json = decodeURIComponent(escape(atob(hash)));
      const data = JSON.parse(json);
      if (data.inputPrompt !== undefined) setInputPrompt(data.inputPrompt);
      if (data.settings) setSettings((prev) => ({ ...prev, ...data.settings }));
      if (Array.isArray(data.examples)) setExamples(data.examples);
      if (Array.isArray(data.variables)) setVariables(data.variables);
      if (Array.isArray(data.customCategories))
        setCustomCategories(data.customCategories);
    } catch (_) {
      // silently ignore bad hashes
    }
  };

  useEffect(() => {
    if (location.hash.startsWith("#p=")) {
      const hash = location.hash.slice(3);
      deserializeState(hash);
    }
  }, []);

  useEffect(() => {
    const hash = serializeState();
    if (hash) {
      const newHash = `#p=${hash}`;
      if (location.hash !== newHash) {
        history.replaceState(null, "", newHash);
      }
    }
  }, [inputPrompt, settings, examples, variables, customCategories]);

  const loadPresetMode = (modeId) => {
    const mode = presetModes.find((m) => m.id === modeId);
    if (mode) {
      setSettings({ ...settings, ...mode.config });
    }
  };

  const generatePromptByTechnique = () => {
    let prompt = "";

    if (settings.personality !== "none") {
      const persona = personalities.find((p) => p.id === settings.personality);
      if (persona && persona.traits) {
        prompt += `You are ${persona.name}, a ${persona.age}-year-old with an IQ of ${persona.iq}.\n\n`;
        prompt += `CHARACTER TRAITS: ${persona.traits}\n\n`;
        prompt += `EXPERTISE: ${persona.expertise}\n\n`;
        prompt += `COMMUNICATION RULES: ${persona.rules}\n\n`;
        prompt += `Maintain consistency as ${persona.name} throughout the conversation.\n\n`;
      }
    } else if (settings.roleAssignment) {
      const role = settings.roleAssignment;
      const article = ["a", "e", "i", "o", "u"].some((v) =>
        role.toLowerCase().startsWith(v)
      )
        ? "an"
        : "a";

      prompt += `You are ${article} ${role}`;

      if (settings.iqLevel && parseInt(settings.iqLevel) > 100) {
        prompt += ` with an IQ of ${settings.iqLevel}`;
      }

      if (settings.age) {
        prompt += `, age ${settings.age}`;
      }

      if (settings.expertise && settings.expertise !== "expert") {
        prompt += `, recognized as a ${settings.expertise}`;
      }

      if (settings.background) {
        prompt += `. ${settings.background}`;
      }

      prompt += ".\n";

      if (settings.perspectiveMode === "10years") {
        prompt += `You have 10+ years of experience in your field. `;
      } else if (settings.perspectiveMode === "beginner") {
        prompt += `Explain everything as if to someone with no prior knowledge. `;
      } else if (settings.perspectiveMode === "skeptic") {
        prompt += `Approach this with a critical, questioning mindset. Challenge assumptions. `;
      } else if (settings.perspectiveMode === "optimist") {
        prompt += `Approach this with an optimistic, visionary perspective. `;
      }

      prompt += "Begin by acknowledging your role.\n";
    }

    if (settings.interestMode !== "none") {
      const mode = interestModes.find((m) => m.id === settings.interestMode);
      if (mode && mode.prefix) {
        prompt += `\n${mode.prefix}:\n`;
      }
    }

    if (settings.tone !== "professional") {
      prompt += `\nUse a ${settings.tone} tone.\n`;
    }

    if (settings.language !== "English") {
      prompt += `Respond in ${settings.language}.\n`;
    }

    prompt += "\n";

    if (settings.reasoningMode) {
      const template = reasoningTemplates[settings.reasoningSteps];
      prompt += `Before answering, work through this step-by-step:\n\n`;
      template.steps.forEach((step, i) => {
        prompt += `${i + 1}. ${step}\n`;
      });
      prompt += "\n";
    }

    if (settings.useXML) {
      prompt += `<task>\n${inputPrompt}\n</task>\n\n`;
    } else {
      prompt += `### TASK\n${inputPrompt}\n\n`;
    }

    if (settings.taskType === "classification" && customCategories.length > 0) {
      if (settings.useXML) {
        prompt += `<categories>\n`;
        customCategories.forEach((cat, i) => {
          prompt += `<category id="${String.fromCharCode(
            65 + i
          )}">${cat}</category>\n`;
        });
        prompt += `</categories>\n\n`;
      } else {
        prompt += `### CATEGORIES\n`;
        customCategories.forEach((cat, i) => {
          prompt += `${String.fromCharCode(65 + i)}) ${cat}\n`;
        });
        prompt += "\n";
      }
    }

    if (variables.length > 0 && settings.technique === "variables") {
      if (settings.useXML) {
        prompt += `<variables>\n`;
        variables.forEach((v) => {
          prompt += `<var name="{${v.name}}">${v.description}</var>\n`;
        });
        prompt += `</variables>\n\n`;
      } else {
        prompt += `### VARIABLES\n`;
        variables.forEach((v) => {
          prompt += `- {${v.name}}: ${v.description}\n`;
        });
        prompt += "\n";
      }
    }

    if (settings.chainOfThought && !settings.reasoningMode) {
      if (settings.useXML) {
        prompt += `<thinking>\nThink through this step by step:\n`;
        prompt += `1. Analyze the input carefully\n`;
        prompt += `2. Consider all relevant information\n`;
        prompt += `3. Reason through the problem\n`;
        prompt += `4. Form your conclusion\n`;
        prompt += `</thinking>\n\n`;
      } else {
        prompt += `### REASONING\nThink step by step:\n`;
        prompt += `1. Analyze the input\n2. Consider context\n3. Form conclusion\n\n`;
      }
    }

    if (examples.length > 0 && settings.technique === "fewshot") {
      if (settings.useXML) {
        prompt += `<examples>\n`;
        examples.slice(0, settings.exampleCount).forEach((ex) => {
          prompt += `<example>\n`;
          prompt += `<input>${ex.input}</input>\n`;
          prompt += `<output>${ex.output}</output>\n`;
          prompt += `</example>\n`;
        });
        prompt += `</examples>\n\n`;
      } else {
        prompt += `### EXAMPLES\n`;
        examples.slice(0, settings.exampleCount).forEach((ex, i) => {
          prompt += `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${
            ex.output
          }\n\n`;
        });
      }
    }

    if (settings.focusAreas.length > 0) {
      if (settings.useXML) {
        prompt += `<focus_areas>\n`;
        settings.focusAreas.forEach((f) => (prompt += `<focus>${f}</focus>\n`));
        prompt += `</focus_areas>\n\n`;
      } else {
        prompt += `### FOCUS AREAS\n`;
        settings.focusAreas.forEach((f) => (prompt += `- ${f}\n`));
        prompt += "\n";
      }
    }

    if (settings.constraints.length > 0) {
      if (settings.useXML) {
        prompt += `<constraints>\n`;
        settings.constraints.forEach(
          (c) => (prompt += `<constraint>${c}</constraint>\n`)
        );
        prompt += `</constraints>\n\n`;
      } else {
        prompt += `### CONSTRAINTS\n`;
        settings.constraints.forEach((c) => (prompt += `- ${c}\n`));
        prompt += "\n";
      }
    }

    if (settings.customInstructions.trim()) {
      if (settings.useXML) {
        prompt += `<instructions>\n${settings.customInstructions}\n</instructions>\n\n`;
      } else {
        prompt += `### INSTRUCTIONS\n${settings.customInstructions}\n\n`;
      }
    }

    if (settings.outputFormat === "structured") {
      if (settings.useXML) {
        prompt += `<output_format>\nProvide response in clear, structured format.\n</output_format>\n\n`;
      } else {
        prompt += `### OUTPUT FORMAT\nStructured and organized response.\n\n`;
      }
    } else if (settings.outputFormat === "minimal") {
      prompt += `Respond with ONLY the answer, no extra words.\n\n`;
    } else if (settings.outputFormat === "detailed") {
      prompt += `Provide a comprehensive, detailed response with full explanations.\n\n`;
    }

    if (settings.lengthTarget) {
      prompt += `Target length: ${settings.lengthTarget} words.\n`;
    }
    if (settings.maxTokens) {
      prompt += `Maximum tokens: ${settings.maxTokens}.\n`;
    }
    if (settings.lengthTarget || settings.maxTokens) {
      prompt += "\n";
    }

    if (settings.verification) {
      if (settings.useXML) {
        prompt += `<verification>\nBefore answering:\n`;
        prompt += `1. Verify you have sufficient information\n`;
        prompt += `2. Check your reasoning is sound\n`;
        prompt += `3. If uncertain, acknowledge it clearly\n`;
        prompt += `</verification>\n\n`;
      } else {
        prompt += `### VERIFICATION\nVerify information and reasoning before responding.\n\n`;
      }
    }

    if (settings.technique === "evidence") {
      prompt += `### RESPONSE FORMAT\n`;
      prompt += `1. Quote relevant information\n`;
      prompt += `2. Explain your reasoning\n`;
      prompt += `3. Provide your answer\n\n`;
    }

    if (settings.taskType === "brainstorm") {
      prompt += `Categorize ideas under relevant headings with brief descriptions. Aim for variety and originality.\n\n`;
    }

    if (
      settings.interestMode !== "none" &&
      settings.interestMode !== "nature"
    ) {
      prompt += `Finally, conclude with: "What does this reveal about human nature?"\n\n`;
    }

    if (settings.prefillResponse && settings.prefillResponse.trim()) {
      prompt += `---\n\nASSISTANT RESPONSE:\n${settings.prefillResponse}`;
    }

    return prompt;
  };

  const improvePrompt = () => {
    if (!inputPrompt.trim()) return;

    const improved = generatePromptByTechnique();
    setImprovedPrompt(improved);

    const tierNum = parseInt(settings.tier.replace("tier", ""));
    const baseScore = tierNum * 12 + 30;

    let bonusScore = 0;
    if (settings.roleAssignment || settings.taskType !== "general")
      bonusScore += 8;
    if (settings.chainOfThought) bonusScore += 10;
    if (settings.reasoningMode) bonusScore += 12;
    if (examples.length > 0) bonusScore += 12;
    if (settings.verification) bonusScore += 10;
    if (settings.prefillResponse) bonusScore += 5;
    if (variables.length > 0) bonusScore += 6;
    if (settings.focusAreas.length > 0) bonusScore += 4;
    if (settings.constraints.length > 0) bonusScore += 5;
    if (settings.customInstructions.trim()) bonusScore += 5;
    if (settings.useXML) bonusScore += 5;
    if (settings.interestMode !== "none") bonusScore += 6;
    if (settings.perspectiveMode !== "none") bonusScore += 4;
    if (settings.personality !== "none") bonusScore += 10;
    if (parseInt(settings.iqLevel) >= 140) bonusScore += 8;

    const score = Math.min(baseScore + bonusScore, 100);

    const features = [];
    features.push(`Tier ${tierNum}`);
    if (settings.roleAssignment) features.push("Custom Role");
    if (settings.personality !== "none") features.push("Personality");
    if (settings.reasoningMode) features.push("Advanced Reasoning");
    if (settings.chainOfThought) features.push("CoT");
    if (examples.length > 0) features.push(`${examples.length} Examples`);
    if (settings.verification) features.push("Verification");
    if (settings.prefillResponse) features.push("Prefill");
    if (variables.length > 0) features.push(`${variables.length} Variables`);
    if (settings.focusAreas.length > 0)
      features.push(`${settings.focusAreas.length} Focus Areas`);
    if (settings.constraints.length > 0)
      features.push(`${settings.constraints.length} Constraints`);
    if (settings.interestMode !== "none") features.push("Interest Mode");
    if (settings.perspectiveMode !== "none") features.push("Perspective");
    if (parseInt(settings.iqLevel) >= 140) features.push("High IQ");

    setAnalysis({
      score,
      features,
      tier: settings.tier,
      technique: settings.technique,
      wordCount: improved.split(/\s+/).length,
      characterCount: improved.length,
    });
  };

  const loadQuickTemplate = (template) => {
    setInputPrompt(template);
  };

  const addExample = () => {
    if (newExample.input.trim() && newExample.output.trim()) {
      setExamples([...examples, newExample]);
      setNewExample({ input: "", output: "" });
    }
  };

  const removeExample = (idx) => {
    setExamples(examples.filter((_, i) => i !== idx));
  };

  const addVariable = () => {
    if (newVariable.name.trim() && newVariable.description.trim()) {
      setVariables([...variables, newVariable]);
      setNewVariable({ name: "", description: "" });
    }
  };

  const removeVariable = (idx) => {
    setVariables(variables.filter((_, i) => i !== idx));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCustomCategories([...customCategories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (idx) => {
    setCustomCategories(customCategories.filter((_, i) => i !== idx));
  };

  const toggleFocus = (focus) => {
    const updated = settings.focusAreas.includes(focus)
      ? settings.focusAreas.filter((f) => f !== focus)
      : [...settings.focusAreas, focus];
    setSettings({ ...settings, focusAreas: updated });
  };

  const toggleConstraint = (constraint) => {
    const updated = settings.constraints.includes(constraint)
      ? settings.constraints.filter((c) => c !== constraint)
      : [...settings.constraints, constraint];
    setSettings({ ...settings, constraints: updated });
  };

  const savePrompt = () => {
    if (!promptName.trim()) {
      alert("Please enter a prompt name");
      return;
    }
    const saved = {
      id: Date.now(),
      name: promptName,
      timestamp: new Date().toLocaleString(),
      input: inputPrompt,
      improved: improvedPrompt,
      settings: settings,
      examples: examples,
      variables: variables,
      categories: customCategories,
      tags: promptTags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    };
    setSavedPrompts([...savedPrompts, saved]);
    setPromptName("");
    setPromptTags("");
  };

  const loadPrompt = (saved) => {
    setInputPrompt(saved.input);
    setImprovedPrompt(saved.improved);
    setSettings(saved.settings);
    setExamples(saved.examples || []);
    setVariables(saved.variables || []);
    setCustomCategories(saved.categories || []);
  };

  const deletePrompt = (id) => {
    setSavedPrompts(savedPrompts.filter((p) => p.id !== id));
  };

  const exportPrompt = (format = "json") => {
    const data = {
      input: inputPrompt,
      improved: improvedPrompt,
      settings: settings,
      examples: examples,
      variables: variables,
      categories: customCategories,
      timestamp: new Date().toISOString(),
      shareUrl: location.href,
    };

    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `miownation-prompt-${Date.now()}.json`;
      a.click();
      return;
    }

    if (format === "md") {
      const md = `# MiowNation Prompt\n\n**Saved:** ${data.timestamp}\n\n## Input\n\n\n${data.input}\n\n## Optimized\n\n\n${data.improved}\n\n## Settings\n\n\n\`${JSON.stringify(data.settings)}\`\n\n## Examples\n\n\n\`${JSON.stringify(data.examples)}\`\n\n## Variables\n\n\n\`${JSON.stringify(data.variables)}\`\n\n## Categories\n\n\n\`${JSON.stringify(data.categories)}\`\n\n## Share URL\n\n${data.shareUrl}\n`;
      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `miownation-prompt-${Date.now()}.md`;
      a.click();
      return;
    }

    if (format === "txt") {
      const txt = `INPUT\n\n${data.input}\n\n---\n\nOPTIMIZED\n\n${data.improved}\n\n---\n\nSETTINGS: ${JSON.stringify(
        data.settings
      )}\nEXAMPLES: ${JSON.stringify(data.examples)}\nVARIABLES: ${JSON.stringify(
        data.variables
      )}\nCATEGORIES: ${JSON.stringify(
        data.categories
      )}\nURL: ${data.shareUrl}\n`;
      const blob = new Blob([txt], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `miownation-prompt-${Date.now()}.txt`;
      a.click();
      return;
    }
  };

  const importPrompt = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setInputPrompt(data.input || data.original || "");
        setImprovedPrompt(data.improved || "");
        if (data.settings) setSettings({ ...settings, ...data.settings });
        if (data.examples) setExamples(data.examples);
        if (data.variables) setVariables(data.variables);
        if (data.categories) setCustomCategories(data.categories);
      } catch (error) {
        alert("Error importing file: " + error.message);
      }
    };
    reader.readAsText(file);
  };

  const resetAll = () => {
    setInputPrompt("");
    setImprovedPrompt("");
    setAnalysis(null);
    setExamples([]);
    setVariables([]);
    setCustomCategories([]);
    setSettings({
      tier: "tier3",
      technique: "xml",
      taskType: "general",
      roleAssignment: "",
      tone: "professional",
      outputFormat: "structured",
      useXML: true,
      examples: [],
      exampleCount: 2,
      chainOfThought: false,
      prefillResponse: "",
      variables: [],
      verification: false,
      lengthTarget: "",
      maxTokens: "",
      language: "English",
      focusAreas: ["Accuracy"],
      constraints: ["Use examples"],
      customInstructions: "",
      reasoningMode: false,
      reasoningSteps: "standard",
      interestMode: "none",
      perspectiveMode: "none",
      personality: "none",
      iqLevel: "130",
      expertise: "expert",
      age: "28",
      background: "",
    });
  };

  return {
    // State
    inputPrompt,
    improvedPrompt,
    analysis,
    activeTab,
    theme,
    fileInputRef,
    settings,
    examples,
    newExample,
    variables,
    newVariable,
    customCategories,
    newCategory,
    savedPrompts,
    promptName,
    promptTags,
    savedSearch,

    // State setters
    setInputPrompt,
    setImprovedPrompt,
    setAnalysis,
    setActiveTab,
    setTheme,
    setSettings,
    setExamples,
    setNewExample,
    setVariables,
    setNewVariable,
    setCustomCategories,
    setNewCategory,
    setSavedPrompts,
    setPromptName,
    setPromptTags,
    setSavedSearch,

    // Methods
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
  };
};