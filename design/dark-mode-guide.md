# Dark Mode Implementation Guide

## Overview

This guide outlines the implementation of dark mode in Rollercoaster.dev, focusing on creating a comfortable, accessible experience for neurodivergent users. We support both automatic system preference detection and manual theme switching.

## Implementation Approaches

### 1. CSS Variables Approach

```scss
// _variables.scss
:root {
  // Light mode (default)
  --color-background: #{$background};
  --color-surface: #{$surface};
  --color-text: #{$text};
  --color-text-secondary: #{$text-secondary};
  --color-border: #{$border};
  --color-primary: #{$primary};
  --color-secondary: #{$secondary};
  // ... other color variables
}

// Dark mode
[data-theme="dark"] {
  --color-background: #{$dark-background};
  --color-surface: #{$dark-surface};
  --color-text: #{$dark-text};
  --color-text-secondary: #{$dark-text-secondary};
  --color-border: #{$dark-border};
  --color-primary: #{adjust-color($primary, $lightness: 10%)};
  --color-secondary: #{adjust-color($secondary, $lightness: 10%)};
  // ... other color variables
}

// System preference detection
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-background: #{$dark-background};
    --color-surface: #{$dark-surface};
    --color-text: #{$dark-text};
    --color-text-secondary: #{$dark-text-secondary};
    --color-border: #{$dark-border};
    --color-primary: #{adjust-color($primary, $lightness: 10%)};
    --color-secondary: #{adjust-color($secondary, $lightness: 10%)};
    // ... other color variables
  }
}
```

### 2. Theme Switching Implementation

```typescript
// theme.ts
type Theme = 'light' | 'dark' | 'system';

class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'system';
  private themeChangeListeners: ((theme: Theme) => void)[] = [];

  private constructor() {
    // Initialize theme from localStorage or system preference
    this.initializeTheme();
    // Listen for system theme changes
    this.setupSystemThemeListener();
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  private setupSystemThemeListener(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.currentTheme === 'system') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme === 'system' ? this.getSystemTheme() : theme);
    this.notifyListeners(theme);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  addThemeChangeListener(listener: (theme: Theme) => void): void {
    this.themeChangeListeners.push(listener);
  }

  private notifyListeners(theme: Theme): void {
    this.themeChangeListeners.forEach(listener => listener(theme));
  }
}

export const themeManager = ThemeManager.getInstance();
```

### 3. React Component Implementation

```tsx
// ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { themeManager } from './theme';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState(themeManager.getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
      setThemeState(newTheme);
    };

    themeManager.addThemeChangeListener(handleThemeChange);
    return () => {
      themeManager.removeThemeChangeListener(handleThemeChange);
    };
  }, []);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    themeManager.setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### 4. Theme Toggle Component

```tsx
// ThemeToggle.tsx
import React from 'react';
import { useTheme } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="theme-toggle-button"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <button
        onClick={() => setTheme('system')}
        className="theme-toggle-system"
        aria-label="Use system theme"
      >
        💻
      </button>
    </div>
  );
};
```

## Usage Examples

### 1. Basic Component Styling

```scss
// _components.scss
.card {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button {
  background-color: var(--color-primary);
  color: white;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
}
```

### 2. React Component Usage

```tsx
// App.tsx
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <ThemeToggle />
        </header>
        {/* Rest of your app */}
      </div>
    </ThemeProvider>
  );
};
```

## Best Practices

1. **Smooth Transitions**
   - Always include transition properties for color changes
   - Use appropriate transition timing (250ms recommended)
   - Apply transitions to background-color and color properties

2. **Accessibility**
   - Maintain WCAG contrast ratios in both themes
   - Provide clear visual indicators for interactive elements
   - Support keyboard navigation
   - Include appropriate ARIA labels

3. **Performance**
   - Use CSS variables for theme colors
   - Minimize repaints during theme switching
   - Cache theme preference in localStorage
   - Use system preference as default

4. **User Experience**
   - Provide clear theme toggle controls
   - Support system preference detection
   - Persist user preferences
   - Show loading states during theme transition

## Testing

1. **Visual Testing**
   - Test all components in both themes
   - Verify contrast ratios
   - Check for any visual artifacts
   - Ensure smooth transitions

2. **Functional Testing**
   - Test theme persistence
   - Verify system preference detection
   - Check theme switching performance
   - Test with different browsers

3. **Accessibility Testing**
   - Verify contrast ratios
   - Test with screen readers
   - Check keyboard navigation
   - Validate ARIA attributes

## Troubleshooting

1. **Common Issues**
   - Flash of incorrect theme
   - Inconsistent theme application
   - Performance issues during switching
   - System preference not detected

2. **Solutions**
   - Add theme script to head
   - Use CSS variables consistently
   - Optimize transition properties
   - Implement proper event listeners

## Additional Resources

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WCAG: Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 