# MiowNation Prompter - Code Structure

## 📁 Folder Organization

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── AnimatedCard.jsx
│   │   ├── Badge.jsx
│   │   ├── CollapsibleSection.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── StatsWidget.jsx
│   │   ├── Tooltip.jsx
│   │   └── index.js     # Barrel export
│   └── layout/          # Layout components (future)
│
├── hooks/               # Custom React hooks
│   ├── useMiowNationLogic.js  # Main application logic
│   ├── usePromptFeatures.js   # Prompt history, scoring, library
│   └── index.js         # Barrel export
│
├── utils/               # Utility functions (future)
│
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── constants.js         # Application constants
```

## 🎯 Import Patterns

### Importing Components
```javascript
// Import individual components
import { Tooltip, Badge, ProgressBar } from './components/common';

// Or import all
import * as CommonComponents from './components/common';
```

### Importing Hooks
```javascript
// Import hooks
import { useMiowNationLogic, usePromptHistory } from './hooks';
```

### Importing Constants
```javascript
import { personalities, presetModes, tiers } from './constants';
```

## 📝 Component Guidelines

### Common Components (`components/common/`)
- **Purpose**: Reusable UI components used throughout the app
- **Characteristics**: 
  - Stateless or minimal state
  - Highly reusable
  - Well-documented props
  - Memoized with React.memo for performance

### Layout Components (`components/layout/`)
- **Purpose**: Page layout and structure components
- **Future additions**: Header, Footer, Sidebar, etc.

## 🔧 Hook Guidelines

### Custom Hooks (`hooks/`)
- **Purpose**: Encapsulate reusable logic
- **Naming**: Always start with `use` prefix
- **Organization**: Group related hooks in same file

## 🚀 Benefits of This Structure

1. **Modularity**: Each component/hook in its own file
2. **Maintainability**: Easy to find and update code
3. **Scalability**: Clear place for new components
4. **Reusability**: Components can be easily imported
5. **Performance**: Memoized components prevent re-renders
6. **Testing**: Easier to test isolated components

## 📦 Future Enhancements

- Add `utils/` for helper functions
- Add `types/` for TypeScript definitions
- Add `services/` for API calls
- Add `contexts/` for React contexts
- Add `styles/` for global styles
