import React, { useState, useRef } from 'react';
import { Lightbulb, Zap, CheckCircle, AlertCircle, Settings, Plus, X, Copy, Download, Upload, Trash2, Save, Book, Layers, Target, Wand2, Sparkles, Brain, Eye, Users, Cpu } from 'lucide-react';

const MiowNation = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [improvedPrompt, setImprovedPrompt] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');
  const fileInputRef = useRef(null);
  
  const [settings, setSettings] = useState({
    tier: 'tier3',
    technique: 'xml',
    taskType: 'general',
    roleAssignment: '',
    tone: 'professional',
    outputFormat: 'structured',
    useXML: true,
    examples: [],
    exampleCount: 2,
    chainOfThought: false,
    prefillResponse: '',
    variables: [],
    verification: false,
    lengthTarget: '',
    maxTokens: '',
    language: 'English',
    focusAreas: ['Accuracy'],
    constraints: ['Use examples'],
    customInstructions: '',
    reasoningMode: false,
    reasoningSteps: 'standard',
    interestMode: 'none',
    perspectiveMode: 'none',
    personality: 'none',
    iqLevel: '130',
    expertise: 'expert',
    age: '28',
    background: ''
  });

  const [examples, setExamples] = useState([]);
  const [newExample, setNewExample] = useState({ input: '', output: '' });
  const [variables, setVariables] = useState([]);
  const [newVariable, setNewVariable] = useState({ name: '', description: '' });
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptName, setPromptName] = useState('');

  const personalities = [
    { 
      id: 'none', 
      name: 'None', 
      desc: 'No personality injection',
      icon: '⚪'
    },
    { 
      id: 'helena', 
      name: 'Helena', 
      desc: 'Sophisticated literary intellectual (IQ 137)',
      icon: '📚',
      age: '22',
      iq: '137',
      traits: 'Oxford-educated, refined precision, controlled warmth, literary expert',
      rules: 'Never use em dashes or asterisks. Clean sophisticated prose. Measured, intelligent, subtly confident.',
      expertise: 'Comparative Literature, Philosophy, Intellectual Discourse'
    },
    { 
      id: 'akira', 
      name: 'Akira', 
      desc: 'Anime/Manga specialist & cultural critic',
      icon: '🎌',
      age: '19',
      iq: '128',
      traits: 'Japanese-American, critical analyst, passionate but analytical',
      rules: 'Direct, honest, occasionally sarcastic. No excessive weeb language.',
      expertise: 'Anime, Manga, Japanese Pop Culture, Cultural Criticism'
    },
    { 
      id: 'marcus', 
      name: 'Marcus', 
      desc: 'Strategic brainstorming catalyst',
      icon: '🎯',
      age: '28',
      iq: '142',
      traits: 'Strategic consultant, systematic thinker, creative methodology',
      rules: 'Energetic but focused. Use collaborative language. Challenge assumptions respectfully.',
      expertise: 'Strategic Planning, Problem-Solving, Innovation'
    },
    { 
      id: 'zoe', 
      name: 'Zoe', 
      desc: 'Reddit content analyst & social critic',
      icon: '🔍',
      age: '24',
      iq: '135',
      traits: 'Digital anthropologist, sharp wit, cultural insight',
      rules: 'Clever, observational, occasionally savage. Clean punchy observations.',
      expertise: 'Social Media, Internet Culture, Digital Psychology'
    },
    { 
      id: 'drchen', 
      name: 'Dr. Chen', 
      desc: 'Technical problem solver & code architect',
      icon: '💻',
      age: '31',
      iq: '145',
      traits: 'Software architect, systematic problem-solver, patient teacher',
      rules: 'Direct, precise, patient. Explain reasoning clearly.',
      expertise: 'System Design, Debugging, Code Architecture'
    },
    { 
      id: 'luna', 
      name: 'Luna', 
      desc: 'Creative writing mentor',
      icon: '✍️',
      age: '26',
      iq: '138',
      traits: 'Published author, constructive critic, storytelling expert',
      rules: 'Constructive but honest. Specific actionable feedback.',
      expertise: 'Creative Writing, Character Development, Plot Structure'
    },
    { 
      id: 'phoenix', 
      name: 'Phoenix', 
      desc: 'Fitness & nutrition specialist',
      icon: '💪',
      age: '29',
      iq: '132',
      traits: 'Exercise physiologist, evidence-based, practical',
      rules: 'Motivating but realistic. Focus on sustainable changes.',
      expertise: 'Exercise Programming, Nutrition, Habit Formation'
    },
    { 
      id: 'kai', 
      name: 'Kai', 
      desc: 'Music theory & production specialist',
      icon: '🎵',
      age: '25',
      iq: '140',
      traits: 'Music producer, composer, passionate and precise',
      rules: 'Passionate but precise. Explain complex concepts simply.',
      expertise: 'Music Theory, Audio Production, Sound Design'
    },
    { 
      id: 'river', 
      name: 'River', 
      desc: 'Environmental science consultant',
      icon: '🌱',
      age: '27',
      iq: '136',
      traits: 'Environmental scientist, science-based, hopeful',
      rules: 'Clear, factual, constructive. Focus on actionable solutions.',
      expertise: 'Climate Science, Sustainability, Conservation'
    },
    { 
      id: 'sage', 
      name: 'Sage', 
      desc: 'Philosophy & ethics facilitator',
      icon: '🧘',
      age: '23',
      iq: '143',
      traits: 'Philosophy graduate, Socratic method, intellectually humble',
      rules: 'Thoughtful, patient. Present multiple perspectives.',
      expertise: 'Ethics, Political Philosophy, Critical Thinking'
    },
    { 
      id: 'atlas', 
      name: 'Atlas', 
      desc: 'Business strategist & market analyst',
      icon: '📊',
      age: '34',
      iq: '141',
      traits: 'MBA, data-driven, strategic vision',
      rules: 'Analytical, pragmatic. Back claims with data and logic.',
      expertise: 'Business Strategy, Market Analysis, Financial Planning'
    },
    { 
      id: 'nova', 
      name: 'Nova', 
      desc: 'AI/ML researcher & futurist',
      icon: '🤖',
      age: '26',
      iq: '148',
      traits: 'AI researcher, cutting-edge knowledge, visionary',
      rules: 'Technical but accessible. Balance optimism with realism.',
      expertise: 'Artificial Intelligence, Machine Learning, Future Tech'
    }
  ];

  const presetModes = [
    {
      id: 'default',
      name: '🎯 Balanced Expert',
      desc: 'Well-rounded configuration for most tasks',
      config: {
        tier: 'tier3',
        technique: 'xml',
        roleAssignment: 'highly knowledgeable expert assistant',
        tone: 'professional',
        useXML: true,
        chainOfThought: false,
        verification: false,
        reasoningMode: false,
        personality: 'none',
        iqLevel: '130',
        expertise: 'expert',
        focusAreas: ['Accuracy', 'Detail'],
        constraints: ['Use examples', 'Step-by-step']
      }
    },
    {
      id: 'genius',
      name: '🧠 Genius Mode',
      desc: 'Maximum intelligence and reasoning depth',
      config: {
        tier: 'tier5',
        technique: 'verification',
        roleAssignment: 'genius-level expert with exceptional analytical abilities',
        tone: 'academic',
        useXML: true,
        chainOfThought: true,
        verification: true,
        reasoningMode: true,
        reasoningSteps: 'analytical',
        personality: 'none',
        iqLevel: '160',
        expertise: 'world-class expert',
        focusAreas: ['Accuracy', 'Depth', 'Detail'],
        constraints: ['No assumptions', 'Cite sources', 'Step-by-step']
      }
    },
    {
      id: 'creative',
      name: '✨ Creative Genius',
      desc: 'Maximum creativity and originality',
      config: {
        tier: 'tier4',
        technique: 'fewshot',
        roleAssignment: 'creative visionary with exceptional imagination',
        tone: 'creative',
        useXML: true,
        chainOfThought: true,
        reasoningMode: true,
        reasoningSteps: 'creative',
        personality: 'luna',
        iqLevel: '142',
        expertise: 'creative expert',
        focusAreas: ['Creativity', 'Originality'],
        constraints: ['Use examples', 'Avoid jargon']
      }
    },
    {
      id: 'technical',
      name: '💻 Technical Expert',
      desc: 'Deep technical analysis and problem-solving',
      config: {
        tier: 'tier5',
        technique: 'cot',
        roleAssignment: 'senior technical expert',
        tone: 'technical',
        useXML: true,
        chainOfThought: true,
        verification: true,
        personality: 'drchen',
        iqLevel: '145',
        expertise: 'technical specialist',
        focusAreas: ['Accuracy', 'Detail', 'Depth'],
        constraints: ['Step-by-step', 'Use examples']
      }
    },
    {
      id: 'fascinating',
      name: '🎭 Make It Fascinating',
      desc: 'Transform boring topics into engaging content',
      config: {
        tier: 'tier4',
        technique: 'cot',
        roleAssignment: 'captivating storyteller and analyst',
        tone: 'creative',
        useXML: true,
        reasoningMode: false,
        interestMode: 'hidden',
        personality: 'zoe',
        iqLevel: '135',
        expertise: 'cultural analyst',
        focusAreas: ['Creativity', 'Originality'],
        constraints: ['Use analogies', 'Use examples']
      }
    },
    {
      id: 'teacher',
      name: '🎓 Master Teacher',
      desc: 'Explain complex topics simply and clearly',
      config: {
        tier: 'tier3',
        technique: 'cot',
        roleAssignment: 'exceptional teacher with gift for explanation',
        tone: 'friendly',
        useXML: true,
        chainOfThought: true,
        personality: 'none',
        perspectiveMode: 'beginner',
        iqLevel: '138',
        expertise: 'teaching expert',
        focusAreas: ['Simplicity', 'Practicality'],
        constraints: ['Avoid jargon', 'Use analogies', 'Use examples']
      }
    }
  ];

  const taskTypes = [
    { value: 'general', label: '🎯 General Task' },
    { value: 'qa', label: '❓ Question Answering' },
    { value: 'classification', label: '📋 Classification' },
    { value: 'creative', label: '✨ Creative Writing' },
    { value: 'analysis', label: '🔍 Analysis' },
    { value: 'coding', label: '💻 Coding' },
    { value: 'extraction', label: '📄 Extraction' },
    { value: 'tutoring', label: '🎓 Tutoring' },
    { value: 'summarization', label: '📝 Summarization' },
    { value: 'translation', label: '🌐 Translation' },
    { value: 'brainstorm', label: '💡 Brainstorming' },
    { value: 'debugging', label: '🐛 Debugging' }
  ];

  const rolePresets = {
    general: 'expert assistant',
    qa: 'knowledgeable expert',
    classification: 'classification specialist',
    creative: 'creative expert and storyteller',
    analysis: 'analytical researcher',
    coding: 'senior software engineer',
    extraction: 'data extraction specialist',
    tutoring: 'Socratic tutor',
    summarization: 'expert summarizer',
    translation: 'professional translator',
    brainstorm: 'creative strategist',
    debugging: 'expert debugger'
  };

  const techniquesByTier = {
    tier1: [
      { id: 'basic', label: '📝 Direct Instructions', desc: 'Simple, clear communication' },
      { id: 'natural', label: '💬 Natural Language', desc: 'Conversational requests' }
    ],
    tier2: [
      { id: 'role', label: '👤 Role Assignment', desc: 'Assign expert personas' },
      { id: 'format', label: '📐 Output Formatting', desc: 'Control response structure' },
      { id: 'length', label: '📏 Length Control', desc: 'Specify word count' },
      { id: 'language', label: '🌐 Language Control', desc: 'Set response language' }
    ],
    tier3: [
      { id: 'xml', label: '🏷️ XML Tags', desc: 'Structure information' },
      { id: 'variables', label: '🔤 Variables/Templates', desc: 'Template-driven prompting' },
      { id: 'prefill', label: '✍️ Response Prefilling', desc: 'Guide response start' }
    ],
    tier4: [
      { id: 'fewshot', label: '📚 Few-Shot Learning', desc: '2-3 examples provided' },
      { id: 'cot', label: '🧠 Chain-of-Thought', desc: 'Show reasoning steps' },
      { id: 'evidence', label: '📋 Evidence-Based', desc: 'Quote then answer' }
    ],
    tier5: [
      { id: 'workflow', label: '🔄 Multi-Step Workflow', desc: 'Complex task chains' },
      { id: 'verification', label: '✓ Verification System', desc: 'Accuracy validation' },
      { id: 'tools', label: '🛠️ Tool Integration', desc: 'Structured functions' }
    ]
  };

  const tiers = [
    { id: 'tier1', label: 'Foundation', color: 'bg-blue-100 border-blue-300', desc: 'Simple, direct communication' },
    { id: 'tier2', label: 'Control', color: 'bg-green-100 border-green-300', desc: 'Precision in responses' },
    { id: 'tier3', label: 'Structure', color: 'bg-purple-100 border-purple-300', desc: 'XML & templates' },
    { id: 'tier4', label: 'Learning', color: 'bg-orange-100 border-orange-300', desc: 'Examples & reasoning' },
    { id: 'tier5', label: 'Advanced', color: 'bg-red-100 border-red-300', desc: 'Complex workflows' }
  ];

  const reasoningTemplates = {
    standard: {
      name: 'Standard Reasoning',
      steps: ['UNDERSTAND: What is the core question being asked?', 'ANALYZE: What are the key factors/components involved?', 'REASON: What logical connections can I make?', 'SYNTHESIZE: How do these elements combine?', 'CONCLUDE: What is the most accurate/helpful response?']
    },
    creative: {
      name: 'Creative Process',
      steps: ['UNDERSTAND: What is the creative goal?', 'EXPLORE: What are all possible approaches?', 'CONNECT: How can I combine ideas uniquely?', 'CREATE: What is the most original solution?', 'REFINE: How can I polish this further?']
    },
    analytical: {
      name: 'Analytical Framework',
      steps: ['DEFINE: What exactly needs to be analyzed?', 'EXAMINE: What are the key data points?', 'COMPARE: How do different aspects relate?', 'EVALUATE: What are the strengths and weaknesses?', 'CONCLUDE: What insights emerge?']
    },
    problemSolving: {
      name: 'Problem-Solving',
      steps: ['CLARIFY: What is the exact problem?', 'DECOMPOSE: Break it into smaller parts', 'GENERATE: What are potential solutions?', 'ASSESS: Evaluate each solution', 'RECOMMEND: What is the best approach?']
    }
  };

  const interestModes = [
    { id: 'none', label: 'None', prefix: '' },
    { id: 'hidden', label: '🔍 Hidden Story', prefix: "What's the hidden story behind" },
    { id: 'alien', label: '👽 Alien Perspective', prefix: "What would an alien anthropologist notice about" },
    { id: 'conspiracy', label: '🕵️ Connect the Dots', prefix: "What's the conspiracy theory version of" },
    { id: 'survival', label: '🧬 Survival Skill', prefix: "How is this secretly a survival skill?" },
    { id: 'extreme', label: '🚀 Logical Extreme', prefix: "What would happen if we took this to its logical extreme?" },
    { id: 'nature', label: '🧠 Human Nature', prefix: "What does this reveal about human nature?" }
  ];

  const perspectiveModes = [
    { id: 'none', label: 'Standard' },
    { id: '10years', label: '10-Year Expert' },
    { id: 'beginner', label: 'Beginner-Friendly' },
    { id: 'skeptic', label: 'Critical Skeptic' },
    { id: 'optimist', label: 'Optimistic Visionary' }
  ];

  const tones = ['professional', 'casual', 'academic', 'creative', 'technical', 'friendly', 'authoritative', 'empathetic'];
  const focusOptions = ['Accuracy', 'Creativity', 'Speed', 'Detail', 'Simplicity', 'Depth', 'Originality', 'Practicality'];
  const constraintOptions = ['No assumptions', 'Be concise', 'Cite sources', 'Use examples', 'Be formal', 'Step-by-step', 'Avoid jargon', 'Use analogies'];

  const quickTemplates = [
    {
      name: 'Role-Playing Expert',
      template: 'You are a [specific profession]. Your task is to [specific task]. Focus on [key considerations/style]. Begin by acknowledging your role.',
      category: 'Structure'
    },
    {
      name: 'Brainstorm & Categorize',
      template: 'Brainstorm [number] creative ideas for [topic]. Categorize these ideas under [number] relevant headings, and for each idea, include a brief one-sentence description. Aim for variety and originality.',
      category: 'Ideation'
    },
    {
      name: 'Summarize & Extract',
      template: 'Summarize the following text in [number] concise bullet points. Additionally, identify [number] key actionable takeaways that a [target audience] could implement immediately.',
      category: 'Analysis'
    },
    {
      name: 'Simplify & Explain',
      template: 'Explain [complex concept] in simple terms suitable for someone with no prior knowledge, using analogies where helpful. Avoid jargon and focus on the practical implications or core idea. Then, provide one real-world example.',
      category: 'Teaching'
    },
    {
      name: 'Condense & Refine',
      template: 'Refine the following text to be more [desired tone]. Ensure it appeals to a [target audience]. Highlight any significant changes you made and explain why.',
      category: 'Refinement'
    }
  ];

  const loadPresetMode = (modeId) => {
    const mode = presetModes.find(m => m.id === modeId);
    if (mode) {
      setSettings({ ...settings, ...mode.config });
    }
  };

  const generatePromptByTechnique = () => {
    let prompt = '';
    
    if (settings.personality !== 'none') {
      const persona = personalities.find(p => p.id === settings.personality);
      if (persona && persona.traits) {
        prompt += `You are ${persona.name}, a ${persona.age}-year-old with an IQ of ${persona.iq}.\n\n`;
        prompt += `CHARACTER TRAITS: ${persona.traits}\n\n`;
        prompt += `EXPERTISE: ${persona.expertise}\n\n`;
        prompt += `COMMUNICATION RULES: ${persona.rules}\n\n`;
        prompt += `Maintain consistency as ${persona.name} throughout the conversation.\n\n`;
      }
    } else if (settings.roleAssignment) {
      const role = settings.roleAssignment;
      const article = ['a', 'e', 'i', 'o', 'u'].some(v => role.toLowerCase().startsWith(v)) ? 'an' : 'a';
      
      prompt += `You are ${article} ${role}`;
      
      if (settings.iqLevel && parseInt(settings.iqLevel) > 100) {
        prompt += ` with an IQ of ${settings.iqLevel}`;
      }
      
      if (settings.age) {
        prompt += `, age ${settings.age}`;
      }
      
      if (settings.expertise && settings.expertise !== 'expert') {
        prompt += `, recognized as a ${settings.expertise}`;
      }
      
      if (settings.background) {
        prompt += `. ${settings.background}`;
      }
      
      prompt += '.\n';
      
      if (settings.perspectiveMode === '10years') {
        prompt += `You have 10+ years of experience in your field. `;
      } else if (settings.perspectiveMode === 'beginner') {
        prompt += `Explain everything as if to someone with no prior knowledge. `;
      } else if (settings.perspectiveMode === 'skeptic') {
        prompt += `Approach this with a critical, questioning mindset. Challenge assumptions. `;
      } else if (settings.perspectiveMode === 'optimist') {
        prompt += `Approach this with an optimistic, visionary perspective. `;
      }
      
      prompt += 'Begin by acknowledging your role.\n';
    }

    if (settings.interestMode !== 'none') {
      const mode = interestModes.find(m => m.id === settings.interestMode);
      if (mode && mode.prefix) {
        prompt += `\n${mode.prefix}:\n`;
      }
    }

    if (settings.tone !== 'professional') {
      prompt += `\nUse a ${settings.tone} tone.\n`;
    }

    if (settings.language !== 'English') {
      prompt += `Respond in ${settings.language}.\n`;
    }

    prompt += '\n';

    if (settings.reasoningMode) {
      const template = reasoningTemplates[settings.reasoningSteps];
      prompt += `Before answering, work through this step-by-step:\n\n`;
      template.steps.forEach((step, i) => {
        prompt += `${i + 1}. ${step}\n`;
      });
      prompt += '\n';
    }

    if (settings.useXML) {
      prompt += `<task>\n${inputPrompt}\n</task>\n\n`;
    } else {
      prompt += `### TASK\n${inputPrompt}\n\n`;
    }

    if (settings.taskType === 'classification' && customCategories.length > 0) {
      if (settings.useXML) {
        prompt += `<categories>\n`;
        customCategories.forEach((cat, i) => {
          prompt += `<category id="${String.fromCharCode(65 + i)}">${cat}</category>\n`;
        });
        prompt += `</categories>\n\n`;
      } else {
        prompt += `### CATEGORIES\n`;
        customCategories.forEach((cat, i) => {
          prompt += `${String.fromCharCode(65 + i)}) ${cat}\n`;
        });
        prompt += '\n';
      }
    }

    if (variables.length > 0 && settings.technique === 'variables') {
      if (settings.useXML) {
        prompt += `<variables>\n`;
        variables.forEach(v => {
          prompt += `<var name="{${v.name}}">${v.description}</var>\n`;
        });
        prompt += `</variables>\n\n`;
      } else {
        prompt += `### VARIABLES\n`;
        variables.forEach(v => {
          prompt += `- {${v.name}}: ${v.description}\n`;
        });
        prompt += '\n';
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

    if (examples.length > 0 && settings.technique === 'fewshot') {
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
          prompt += `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}\n\n`;
        });
      }
    }

    if (settings.focusAreas.length > 0) {
      if (settings.useXML) {
        prompt += `<focus_areas>\n`;
        settings.focusAreas.forEach(f => prompt += `<focus>${f}</focus>\n`);
        prompt += `</focus_areas>\n\n`;
      } else {
        prompt += `### FOCUS AREAS\n`;
        settings.focusAreas.forEach(f => prompt += `- ${f}\n`);
        prompt += '\n';
      }
    }

    if (settings.constraints.length > 0) {
      if (settings.useXML) {
        prompt += `<constraints>\n`;
        settings.constraints.forEach(c => prompt += `<constraint>${c}</constraint>\n`);
        prompt += `</constraints>\n\n`;
      } else {
        prompt += `### CONSTRAINTS\n`;
        settings.constraints.forEach(c => prompt += `- ${c}\n`);
        prompt += '\n';
      }
    }

    if (settings.customInstructions.trim()) {
      if (settings.useXML) {
        prompt += `<instructions>\n${settings.customInstructions}\n</instructions>\n\n`;
      } else {
        prompt += `### INSTRUCTIONS\n${settings.customInstructions}\n\n`;
      }
    }

    if (settings.outputFormat === 'structured') {
      if (settings.useXML) {
        prompt += `<output_format>\nProvide response in clear, structured format.\n</output_format>\n\n`;
      } else {
        prompt += `### OUTPUT FORMAT\nStructured and organized response.\n\n`;
      }
    } else if (settings.outputFormat === 'minimal') {
      prompt += `Respond with ONLY the answer, no extra words.\n\n`;
    } else if (settings.outputFormat === 'detailed') {
      prompt += `Provide a comprehensive, detailed response with full explanations.\n\n`;
    }

    if (settings.lengthTarget) {
      prompt += `Target length: ${settings.lengthTarget} words.\n`;
    }
    if (settings.maxTokens) {
      prompt += `Maximum tokens: ${settings.maxTokens}.\n`;
    }
    if (settings.lengthTarget || settings.maxTokens) {
      prompt += '\n';
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

    if (settings.technique === 'evidence') {
      prompt += `### RESPONSE FORMAT\n`;
      prompt += `1. Quote relevant information\n`;
      prompt += `2. Explain your reasoning\n`;
      prompt += `3. Provide your answer\n\n`;
    }

    if (settings.taskType === 'brainstorm') {
      prompt += `Categorize ideas under relevant headings with brief descriptions. Aim for variety and originality.\n\n`;
    }

    if (settings.interestMode !== 'none' && settings.interestMode !== 'nature') {
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
    
    const tierNum = parseInt(settings.tier.replace('tier', ''));
    const baseScore = tierNum * 12 + 30;
    
    let bonusScore = 0;
    if (settings.roleAssignment || settings.taskType !== 'general') bonusScore += 8;
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
    if (settings.interestMode !== 'none') bonusScore += 6;
    if (settings.perspectiveMode !== 'none') bonusScore += 4;
    if (settings.personality !== 'none') bonusScore += 10;
    if (parseInt(settings.iqLevel) >= 140) bonusScore += 8;

    const score = Math.min(baseScore + bonusScore, 100);

    const features = [];
    features.push(`Tier ${tierNum}`);
    if (settings.roleAssignment) features.push('Custom Role');
    if (settings.personality !== 'none') features.push('Personality');
    if (settings.reasoningMode) features.push('Advanced Reasoning');
    if (settings.chainOfThought) features.push('CoT');
    if (examples.length > 0) features.push(`${examples.length} Examples`);
    if (settings.verification) features.push('Verification');
    if (settings.prefillResponse) features.push('Prefill');
    if (variables.length > 0) features.push(`${variables.length} Variables`);
    if (settings.focusAreas.length > 0) features.push(`${settings.focusAreas.length} Focus Areas`);
    if (settings.constraints.length > 0) features.push(`${settings.constraints.length} Constraints`);
    if (settings.interestMode !== 'none') features.push('Interest Mode');
    if (settings.perspectiveMode !== 'none') features.push('Perspective');
    if (parseInt(settings.iqLevel) >= 140) features.push('High IQ');

    setAnalysis({
      score,
      features,
      tier: settings.tier,
      technique: settings.technique,
      wordCount: improved.split(/\s+/).length,
      characterCount: improved.length
    });
  };

  const loadQuickTemplate = (template) => {
    setInputPrompt(template);
  };

  const addExample = () => {
    if (newExample.input.trim() && newExample.output.trim()) {
      setExamples([...examples, newExample]);
      setNewExample({ input: '', output: '' });
    }
  };

  const removeExample = (idx) => {
    setExamples(examples.filter((_, i) => i !== idx));
  };

  const addVariable = () => {
    if (newVariable.name.trim() && newVariable.description.trim()) {
      setVariables([...variables, newVariable]);
      setNewVariable({ name: '', description: '' });
    }
  };

  const removeVariable = (idx) => {
    setVariables(variables.filter((_, i) => i !== idx));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCustomCategories([...customCategories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const removeCategory = (idx) => {
    setCustomCategories(customCategories.filter((_, i) => i !== idx));
  };

  const toggleFocus = (focus) => {
    const updated = settings.focusAreas.includes(focus)
      ? settings.focusAreas.filter(f => f !== focus)
      : [...settings.focusAreas, focus];
    setSettings({ ...settings, focusAreas: updated });
  };

  const toggleConstraint = (constraint) => {
    const updated = settings.constraints.includes(constraint)
      ? settings.constraints.filter(c => c !== constraint)
      : [...settings.constraints, constraint];
    setSettings({ ...settings, constraints: updated });
  };

  const savePrompt = () => {
    if (!promptName.trim()) {
      alert('Please enter a prompt name');
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
      categories: customCategories
    };
    setSavedPrompts([...savedPrompts, saved]);
    setPromptName('');
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
    setSavedPrompts(savedPrompts.filter(p => p.id !== id));
  };

  const exportPrompt = () => {
    const data = {
      input: inputPrompt,
      improved: improvedPrompt,
      settings: settings,
      examples: examples,
      variables: variables,
      categories: customCategories,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miownation-prompt-${Date.now()}.json`;
    a.click();
  };

  const importPrompt = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setInputPrompt(data.input || data.original || '');
        setImprovedPrompt(data.improved || '');
        if (data.settings) setSettings({ ...settings, ...data.settings });
        if (data.examples) setExamples(data.examples);
        if (data.variables) setVariables(data.variables);
        if (data.categories) setCustomCategories(data.categories);
      } catch (error) {
        alert('Error importing file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Wand2 className="w-12 h-12 text-purple-400 mr-3 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              MiowNation
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Master Prompt Engineering Studio</p>
          <p className="text-gray-400 text-sm">Advanced techniques • Personality injection • IQ amplification • Interest modes</p>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg shadow-xl p-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center transition whitespace-nowrap ${
              activeTab === 'presets' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Cpu className="w-5 h-5 mr-2" /> Preset Modes
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center transition whitespace-nowrap ${
              activeTab === 'builder' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Layers className="w-5 h-5 mr-2" /> Builder
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center transition whitespace-nowrap ${
              activeTab === 'templates' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Sparkles className="w-5 h-5 mr-2" /> Quick Templates
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center transition whitespace-nowrap ${
              activeTab === 'guide' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Book className="w-5 h-5 mr-2" /> Learning Guide
          </button>
        </div>

        {activeTab === 'presets' && (
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-3xl font-bold mb-6 text-purple-300">⚡ Quick Start Presets</h2>
            <p className="text-gray-400 mb-6">Load pre-configured modes optimized for specific use cases</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {presetModes.map((mode) => (
                <div key={mode.id} className="bg-gray-700 rounded-lg p-5 hover:bg-gray-650 transition border-2 border-gray-600 hover:border-purple-500">
                  <h3 className="font-bold text-purple-300 text-lg mb-2">{mode.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{mode.desc}</p>
                  <button
                    onClick={() => loadPresetMode(mode.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                  >
                    Load Preset
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-900 border-l-4 border-purple-500 p-5 rounded-lg">
              <h3 className="font-bold mb-3 text-purple-200 text-lg">💡 Preset Features</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ <strong>Instant Configuration:</strong> All settings pre-optimized for specific tasks</li>
                <li>✅ <strong>Best Practices:</strong> Based on proven prompt engineering techniques</li>
                <li>✅ <strong>Customize Further:</strong> Use as starting point and adjust as needed</li>
                <li>✅ <strong>Save Time:</strong> Skip manual configuration for common scenarios</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-3xl font-bold mb-6 text-purple-300">⚡ Battle-Tested Templates</h2>
            <p className="text-gray-400 mb-6">These proven prompt structures consistently deliver exceptional results</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTemplates.map((template, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-purple-300">{template.name}</h3>
                    <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">{template.category}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3 font-mono">{template.template}</p>
                  <button
                    onClick={() => loadQuickTemplate(template.template)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition text-sm"
                  >
                    Load Template
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-900 border-l-4 border-purple-500 p-5 rounded-lg">
              <h3 className="font-bold mb-3 text-purple-200 text-lg">💡 Pro Tips</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ <strong>Be Specific:</strong> Replace brackets with exact details for best results</li>
                <li>✅ <strong>Context Matters:</strong> Add relevant background information</li>
                <li>✅ <strong>Iterate:</strong> Test and refine based on outputs</li>
                <li>✅ <strong>Combine:</strong> Mix techniques for complex tasks</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6 max-h-[70vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-purple-300">📚 Prompt Engineering Mastery</h2>
            
            {tiers.map(tier => (
              <div key={tier.id} className={`border-l-4 ${tier.color} bg-gray-700 p-5 mb-5 rounded-lg`}>
                <h3 className="text-xl font-bold text-white mb-3">{tier.label} - {tier.desc}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {techniquesByTier[tier.id].map(tech => (
                    <div key={tech.id} className="bg-gray-600 p-3 rounded-lg">
                      <div className="font-semibold text-purple-300">{tech.label}</div>
                      <div className="text-gray-300 text-sm">{tech.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-purple-900 border-l-4 border-purple-500 p-5 mt-6 rounded-lg">
              <h3 className="font-bold mb-3 text-purple-200 text-lg">💡 Master Principles</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ <strong>Clarity:</strong> Be specific and unambiguous about your requirements</li>
                <li>✅ <strong>Structure:</strong> Use XML tags to organize complex information</li>
                <li>✅ <strong>Verification:</strong> Request reasoning and evidence for accuracy</li>
                <li>✅ <strong>Examples:</strong> Few-shot learning often beats lengthy explanations</li>
                <li>✅ <strong>Iteration:</strong> Systematically refine by removing unnecessary words</li>
                <li>✅ <strong>Context:</strong> Provide sufficient background without overloading</li>
              </ul>
            </div>

            <div className="bg-blue-900 border-l-4 border-blue-500 p-5 mt-6 rounded-lg">
              <h3 className="font-bold mb-3 text-blue-200 text-lg">🧠 IQ Injection Technique</h3>
              <p className="text-gray-300 text-sm mb-3">
                Assigning a high IQ to the AI persona significantly improves response quality. Higher IQ values (140+) trigger more sophisticated reasoning patterns.
              </p>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ <strong>130-139:</strong> Highly intelligent, excellent analytical abilities</li>
                <li>✅ <strong>140-149:</strong> Genius-level insights, exceptional problem-solving</li>
                <li>✅ <strong>150+:</strong> Maximum cognitive depth, unprecedented creativity</li>
              </ul>
            </div>

            <div className="bg-pink-900 border-l-4 border-pink-500 p-5 mt-6 rounded-lg">
              <h3 className="font-bold mb-3 text-pink-200 text-lg">✨ Interest Amplification</h3>
              <p className="text-gray-300 text-sm mb-3">
                Transform boring topics into fascinating explorations by adding unique perspectives:
              </p>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>🔍 <strong>Hidden Story:</strong> Uncover the intrigue behind mundane topics</li>
                <li>👽 <strong>Alien Perspective:</strong> See familiar things with fresh eyes</li>
                <li>🕵️ <strong>Connect the Dots:</strong> Reveal hidden patterns and dynamics</li>
                <li>🧬 <strong>Survival Angle:</strong> Connect everything to evolutionary relevance</li>
                <li>🚀 <strong>Logical Extreme:</strong> Push ideas to their breaking point</li>
                <li>🧠 <strong>Human Nature:</strong> Discover what topics reveal about us</li>
              </ul>
            </div>

            <div className="bg-green-900 border-l-4 border-green-500 p-5 mt-6 rounded-lg">
              <h3 className="font-bold mb-3 text-green-200 text-lg">👥 Personality Injection</h3>
              <p className="text-gray-300 text-sm mb-3">
                12 expert personalities with distinct traits, communication styles, and specialized knowledge domains. Each personality has been carefully crafted with specific IQ levels, ages, and expertise areas.
              </p>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ <strong>Consistent Voice:</strong> Maintains character throughout conversation</li>
                <li>✅ <strong>Domain Expertise:</strong> Deep knowledge in specialized areas</li>
                <li>✅ <strong>Communication Rules:</strong> Distinct styles and constraints</li>
                <li>✅ <strong>Authentic Responses:</strong> Feel like talking to a real expert</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              <div className="bg-gray-800 rounded-lg shadow-xl p-4 border-2 border-pink-500">
                <h3 className="font-bold text-pink-300 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Personality
                </h3>
                <select
                  value={settings.personality}
                  onChange={(e) => setSettings({ ...settings, personality: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm mb-2"
                >
                  {personalities.map(p => (
                    <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
                  ))}
                </select>
                {settings.personality !== 'none' && (
                  <div className="text-xs text-gray-400 mt-2">
                    {personalities.find(p => p.id === settings.personality)?.desc}
                  </div>
                )}
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Select Tier
                </h3>
                <div className="space-y-2">
                  {tiers.map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setSettings({ ...settings, tier: tier.id, technique: techniquesByTier[tier.id][0].id })}
                      className={`w-full p-3 rounded-lg text-left font-semibold transition ${
                        settings.tier === tier.id 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {tier.label}
                      <div className="text-xs font-normal opacity-75 mt-1">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">🔧 Technique</h3>
                <div className="space-y-2">
                  {techniquesByTier[settings.tier].map(tech => (
                    <button
                      key={tech.id}
                      onClick={() => setSettings({ ...settings, technique: tech.id })}
                      className={`w-full p-2 rounded-lg text-left text-sm transition ${
                        settings.technique === tech.id 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {tech.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4 border-2 border-blue-500">
                <h3 className="font-bold text-blue-300 mb-3 flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Reasoning Mode
                </h3>
                <label className="flex items-center text-sm text-gray-300 mb-3">
                  <input
                    type="checkbox"
                    checked={settings.reasoningMode}
                    onChange={(e) => setSettings({ ...settings, reasoningMode: e.target.checked })}
                    className="mr-2"
                  />
                  Enable Advanced Reasoning
                </label>
                {settings.reasoningMode && (
                  <select
                    value={settings.reasoningSteps}
                    onChange={(e) => setSettings({ ...settings, reasoningSteps: e.target.value })}
                    className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                  >
                    {Object.entries(reasoningTemplates).map(([key, template]) => (
                      <option key={key} value={key}>{template.name}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4 border-2 border-pink-500">
                <h3 className="font-bold text-pink-300 mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Interest Amplifier
                </h3>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Perspective Mode</label>
                <select
                  value={settings.interestMode}
                  onChange={(e) => setSettings({ ...settings, interestMode: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm mb-3"
                >
                  {interestModes.map(mode => (
                    <option key={mode.id} value={mode.id}>{mode.label}</option>
                  ))}
                </select>
                
                <label className="block text-sm font-semibold text-gray-300 mb-1">Expert Level</label>
                <select
                  value={settings.perspectiveMode}
                  onChange={(e) => setSettings({ ...settings, perspectiveMode: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                >
                  {perspectiveModes.map(mode => (
                    <option key={mode.id} value={mode.id}>{mode.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">🎯 Task Type</h3>
                <select
                  value={settings.taskType}
                  onChange={(e) => setSettings({ ...settings, taskType: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                >
                  {taskTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">👤 Custom Role</h3>
                <input
                  type="text"
                  value={settings.roleAssignment}
                  onChange={(e) => setSettings({ ...settings, roleAssignment: e.target.value })}
                  placeholder={rolePresets[settings.taskType]}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm mb-2"
                />
                
                <label className="block text-sm font-semibold text-gray-300 mb-1 mt-3">IQ Level</label>
                <input
                  type="number"
                  value={settings.iqLevel}
                  onChange={(e) => setSettings({ ...settings, iqLevel: e.target.value })}
                  placeholder="130"
                  min="100"
                  max="180"
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm mb-2"
                />
                
                <label className="block text-sm font-semibold text-gray-300 mb-1">Expertise Level</label>
                <select
                  value={settings.expertise}
                  onChange={(e) => setSettings({ ...settings, expertise: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm mb-2"
                >
                  <option value="expert">Expert</option>
                  <option value="world-class expert">World-Class Expert</option>
                  <option value="leading authority">Leading Authority</option>
                  <option value="pioneer">Pioneer in Field</option>
                </select>
                
                <label className="block text-sm font-semibold text-gray-300 mb-1">Age (Optional)</label>
                <input
                  type="number"
                  value={settings.age}
                  onChange={(e) => setSettings({ ...settings, age: e.target.value })}
                  placeholder="28"
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm mb-2"
                />
                
                <label className="block text-sm font-semibold text-gray-300 mb-1">Background (Optional)</label>
                <input
                  type="text"
                  value={settings.background}
                  onChange={(e) => setSettings({ ...settings, background: e.target.value })}
                  placeholder="Additional context..."
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                />
                
                <label className="block text-sm font-semibold text-gray-300 mb-1 mt-3">Tone</label>
                <select
                  value={settings.tone}
                  onChange={(e) => setSettings({ ...settings, tone: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                >
                  {tones.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">⚙️ Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={settings.useXML}
                      onChange={(e) => setSettings({ ...settings, useXML: e.target.checked })}
                      className="mr-2"
                    />
                    XML Structure
                  </label>
                  <label className="flex items-center text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={settings.chainOfThought}
                      onChange={(e) => setSettings({ ...settings, chainOfThought: e.target.checked })}
                      className="mr-2"
                    />
                    Chain of Thought
                  </label>
                  <label className="flex items-center text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={settings.verification}
                      onChange={(e) => setSettings({ ...settings, verification: e.target.checked })}
                      className="mr-2"
                    />
                    Verification
                  </label>
                </div>

                <label className="block text-sm font-semibold text-gray-300 mt-3 mb-1">Output Format</label>
                <select
                  value={settings.outputFormat}
                  onChange={(e) => setSettings({ ...settings, outputFormat: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                >
                  <option value="structured">Structured</option>
                  <option value="minimal">Minimal</option>
                  <option value="detailed">Detailed</option>
                </select>

                <label className="block text-sm font-semibold text-gray-300 mt-3 mb-1">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Hindi">Hindi</option>
                </select>

                <label className="block text-sm font-semibold text-gray-300 mt-3 mb-1">Length Target</label>
                <input
                  type="text"
                  value={settings.lengthTarget}
                  onChange={(e) => setSettings({ ...settings, lengthTarget: e.target.value })}
                  placeholder="e.g., 500 words"
                  className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                />
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">🎯 Focus Areas</h3>
                <div className="space-y-2">
                  {focusOptions.map(f => (
                    <label key={f} className="flex items-center text-sm text-gray-300">
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

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">🔒 Constraints</h3>
                <div className="space-y-2">
                  {constraintOptions.map(c => (
                    <label key={c} className="flex items-center text-sm text-gray-300">
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

              {settings.taskType === 'classification' && (
                <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                  <h3 className="font-bold text-purple-300 mb-3">📋 Categories</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                      placeholder="Add category..."
                      className="flex-1 p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                    />
                    <button
                      onClick={addCategory}
                      className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {customCategories.map((cat, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-700 p-2 rounded text-sm text-gray-300">
                        <span>{String.fromCharCode(65 + i)}) {cat}</span>
                        <button onClick={() => removeCategory(i)} className="text-red-400 hover:text-red-300">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">💾 Saved Prompts</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    placeholder="Prompt name..."
                    className="flex-1 p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                  />
                  <button
                    onClick={savePrompt}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {savedPrompts.map(saved => (
                    <div key={saved.id} className="flex items-center justify-between bg-gray-700 p-2 rounded text-xs">
                      <div className="flex-1 text-gray-300">
                        <div className="font-semibold">{saved.name}</div>
                        <div className="text-gray-500 text-xs">{saved.timestamp}</div>
                      </div>
                      <button
                        onClick={() => loadPrompt(saved)}
                        className="text-blue-400 mr-1 hover:text-blue-300 text-xs px-1"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deletePrompt(saved.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
                  Your Prompt
                </h3>
                <textarea
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Enter your base prompt here..."
                  className="w-full p-3 bg-gray-700 text-gray-200 border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none resize-none font-mono text-sm h-32"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={improvePrompt}
                    disabled={!inputPrompt.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
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
                    className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                <h3 className="font-bold text-purple-300 mb-3">📝 Custom Instructions</h3>
                <textarea
                  value={settings.customInstructions}
                  onChange={(e) => setSettings({ ...settings, customInstructions: e.target.value })}
                  placeholder="Add any additional custom instructions here..."
                  className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none resize-none text-sm h-20"
                />
              </div>

              {settings.technique === 'fewshot' && (
                <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                  <h3 className="font-bold text-purple-300 mb-3">📚 Few-Shot Examples</h3>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={newExample.input}
                      onChange={(e) => setNewExample({ ...newExample, input: e.target.value })}
                      placeholder="Input example..."
                      className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={newExample.output}
                      onChange={(e) => setNewExample({ ...newExample, output: e.target.value })}
                      placeholder="Output example..."
                      className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                    />
                    <button
                      onClick={addExample}
                      className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Example
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {examples.map((ex, i) => (
                      <div key={i} className="bg-gray-700 p-2 rounded text-sm text-gray-300">
                        <div><strong className="text-purple-300">In:</strong> {ex.input}</div>
                        <div><strong className="text-purple-300">Out:</strong> {ex.output}</div>
                        <button
                          onClick={() => removeExample(i)}
                          className="text-red-400 text-xs mt-1 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {settings.technique === 'variables' && (
                <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                  <h3 className="font-bold text-purple-300 mb-3">🔤 Variables</h3>
                  <div className="space-y-2 mb-3">
                    <input
                      type="text"
                      value={newVariable.name}
                      onChange={(e) => setNewVariable({ ...newVariable, name: e.target.value })}
                      placeholder="Variable name..."
                      className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={newVariable.description}
                      onChange={(e) => setNewVariable({ ...newVariable, description: e.target.value })}
                      placeholder="Variable description..."
                      className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm"
                    />
                    <button
                      onClick={addVariable}
                      className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Variable
                    </button>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {variables.map((v, i) => (
                      <div key={i} className="bg-gray-700 p-2 rounded text-sm text-gray-300">
                        <div><strong className="text-purple-300">{`{${v.name}}`}:</strong> {v.description}</div>
                        <button
                          onClick={() => removeVariable(i)}
                          className="text-red-400 text-xs mt-1 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {settings.technique === 'prefill' && (
                <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                  <h3 className="font-bold text-purple-300 mb-3">✍️ Response Prefill</h3>
                  <textarea
                    value={settings.prefillResponse}
                    onChange={(e) => setSettings({ ...settings, prefillResponse: e.target.value })}
                    placeholder="Start the AI's response with..."
                    className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg text-sm h-16"
                  />
                </div>
              )}

              {analysis && (
                <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                  <h3 className="font-bold text-purple-300 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Analysis
                  </h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-green-900 to-green-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-300">Quality Score</div>
                      <div className="text-3xl font-bold text-green-400">{analysis.score}/100</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-300">Features</div>
                      <div className="text-3xl font-bold text-blue-400">{analysis.features.length}</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-300">Words</div>
                      <div className="text-3xl font-bold text-purple-400">{analysis.wordCount}</div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-900 to-pink-800 p-3 rounded-lg">
                      <div className="text-sm text-gray-300">Characters</div>
                      <div className="text-3xl font-bold text-pink-400">{analysis.characterCount}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-300 mb-2">Active Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.features.map((f, i) => (
                        <span key={i} className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {improvedPrompt && (
                <div className="bg-gray-800 rounded-lg shadow-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-purple-300 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-green-400" />
                      Optimized Prompt
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(improvedPrompt);
                          alert('Copied to clipboard!');
                        }}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 flex items-center transition"
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </button>
                      <button
                        onClick={exportPrompt}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 flex items-center transition"
                      >
                        <Download className="w-4 h-4 mr-1" /> Export
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border-2 border-purple-500 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono text-xs text-gray-300">
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