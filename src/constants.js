export const personalities = [
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

export const presetModes = [
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

export const taskTypes = [
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

export const rolePresets = {
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

export const techniquesByTier = {
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

export const tiers = [
    { id: 'tier1', label: 'Foundation', color: 'bg-blue-100 border-blue-300', desc: 'Simple, direct communication' },
    { id: 'tier2', label: 'Control', color: 'bg-green-100 border-green-300', desc: 'Precision in responses' },
    { id: 'tier3', label: 'Structure', color: 'bg-purple-100 border-purple-300', desc: 'XML & templates' },
    { id: 'tier4', label: 'Learning', color: 'bg-orange-100 border-orange-300', desc: 'Examples & reasoning' },
    { id: 'tier5', label: 'Advanced', color: 'bg-red-100 border-red-300', desc: 'Complex workflows' }
  ];

export const reasoningTemplates = {
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

export const interestModes = [
    { id: 'none', label: 'None', prefix: '' },
    { id: 'hidden', label: '🔍 Hidden Story', prefix: "What's the hidden story behind" },
    { id: 'alien', label: '👽 Alien Perspective', prefix: "What would an alien anthropologist notice about" },
    { id: 'conspiracy', label: '🕵️ Connect the Dots', prefix: "What's the conspiracy theory version of" },
    { id: 'survival', label: '🧬 Survival Skill', prefix: "How is this secretly a survival skill?" },
    { id: 'extreme', label: '🚀 Logical Extreme', prefix: "What would happen if we took this to its logical extreme?" },
    { id: 'nature', label: '🧠 Human Nature', prefix: "What does this reveal about human nature?" }
  ];

export const perspectiveModes = [
    { id: 'none', label: 'Standard' },
    { id: '10years', label: '10-Year Expert' },
    { id: 'beginner', label: 'Beginner-Friendly' },
    { id: 'skeptic', label: 'Critical Skeptic' },
    { id: 'optimist', label: 'Optimistic Visionary' }
  ];