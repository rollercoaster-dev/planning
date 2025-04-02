# Accessibility Guidelines for Interactive Elements

## Core Principles

1. **Clarity and Predictability**
   - All interactive elements must have clear, visible states
   - Changes in state must be predictable and consistent
   - Provide clear visual feedback for all interactions
   - Maintain consistent interaction patterns

2. **Reduced Cognitive Load**
   - Minimize required decisions
   - Provide clear, concise labels
   - Use familiar patterns
   - Break complex interactions into steps

3. **Sensory Considerations**
   - Avoid overwhelming visual effects
   - Provide alternatives to sound
   - Support reduced motion preferences
   - Allow customization of visual feedback

## Button Guidelines

### Visual Design
```scss
.button {
  // Minimum size for touch targets
  min-height: 44px;
  min-width: 44px;
  
  // Clear visual hierarchy
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius);
  
  // High contrast text
  color: var(--color-surface);
  background-color: var(--color-primary);
  
  // Clear focus state
  &:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  // Clear hover state
  &:hover {
    background-color: var(--color-primary-dark);
  }
  
  // Clear active state
  &:active {
    transform: translateY(1px);
  }
  
  // Disabled state
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
```

### HTML Structure
```html
<!-- Primary Button -->
<button 
  class="button button--primary"
  aria-label="Submit form"
  type="submit"
>
  Submit
</button>

<!-- Icon Button -->
<button 
  class="button button--icon"
  aria-label="Close dialog"
  type="button"
>
  <span class="icon" aria-hidden="true">×</span>
</button>

<!-- Toggle Button -->
<button 
  class="button button--toggle"
  aria-pressed="false"
  aria-label="Toggle notifications"
  type="button"
>
  Notifications
</button>
```

### Best Practices
1. **Size and Spacing**
   - Minimum touch target size: 44x44px
   - Adequate spacing between buttons (minimum 8px)
   - Clear visual separation from other elements

2. **States**
   - Default: Clear background and border
   - Hover: Slight color change
   - Focus: Visible outline
   - Active: Visual feedback
   - Disabled: Clear visual indication

3. **Labels**
   - Use clear, action-oriented text
   - Include aria-labels for icon buttons
   - Maintain consistent labeling patterns
   - Avoid ambiguous terms

## Form Field Guidelines

### Visual Design
```scss
.form-field {
  // Clear visual structure
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-2);
  
  // Clear focus state
  &:focus-visible {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.2);
  }
  
  // Error state
  &.error {
    border-color: var(--color-error);
    
    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.2);
    }
  }
  
  // Success state
  &.success {
    border-color: var(--color-success);
    
    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(var(--color-success-rgb), 0.2);
    }
  }
}

.form-label {
  // Clear visual hierarchy
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-1);
  
  // Required field indicator
  &.required::after {
    content: "*";
    color: var(--color-error);
    margin-left: 2px;
  }
}

.form-error {
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-1);
}
```

### HTML Structure
```html
<!-- Text Input -->
<div class="form-group">
  <label for="username" class="form-label required">
    Username
  </label>
  <input
    type="text"
    id="username"
    name="username"
    class="form-field"
    aria-required="true"
    aria-describedby="username-error"
    aria-invalid="false"
  />
  <div id="username-error" class="form-error" role="alert">
    Please enter a valid username
  </div>
</div>

<!-- Select Input -->
<div class="form-group">
  <label for="country" class="form-label">
    Country
  </label>
  <select
    id="country"
    name="country"
    class="form-field"
    aria-describedby="country-help"
  >
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </select>
  <div id="country-help" class="form-help">
    Choose your country of residence
  </div>
</div>

<!-- Checkbox Group -->
<fieldset class="form-group">
  <legend class="form-label">Interests</legend>
  <div class="checkbox-group">
    <label class="checkbox-label">
      <input
        type="checkbox"
        name="interests"
        value="coding"
        class="checkbox"
      />
      <span class="checkbox-text">Coding</span>
    </label>
    <!-- Additional checkboxes -->
  </div>
</fieldset>
```

### Best Practices
1. **Labels and Instructions**
   - Clear, visible labels
   - Required field indicators
   - Helpful placeholder text
   - Error messages and validation

2. **Input Types**
   - Use appropriate input types
   - Provide clear validation feedback
   - Support autocomplete
   - Include clear error states

3. **Grouping**
   - Logical form structure
   - Clear visual hierarchy
   - Related field grouping
   - Clear section headings

## Focus Management

### Focus Styles
```scss
// Global focus styles
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

// Skip link
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  z-index: 100;
  
  &:focus {
    top: 0;
  }
}
```

### Focus Trapping
```typescript
class FocusTrap {
  private element: HTMLElement;
  private focusableElements: HTMLElement[];
  
  constructor(element: HTMLElement) {
    this.element = element;
    this.focusableElements = this.getFocusableElements();
    this.setupFocusTrap();
  }
  
  private getFocusableElements(): HTMLElement[] {
    return Array.from(
      this.element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }
  
  private setupFocusTrap(): void {
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        this.handleTab(e.shiftKey);
      }
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }
  
  private handleTab(shiftKey: boolean): void {
    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];
    
    if (shiftKey) {
      if (document.activeElement === first) {
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
      }
    }
  }
  
  private close(): void {
    // Close modal or dialog
  }
}
```

## Keyboard Navigation

### Keyboard Shortcuts
```typescript
class KeyboardShortcuts {
  private shortcuts: Map<string, () => void>;
  
  constructor() {
    this.shortcuts = new Map();
    this.setupShortcuts();
  }
  
  private setupShortcuts(): void {
    // Navigation shortcuts
    this.shortcuts.set('g h', () => this.navigateToHome());
    this.shortcuts.set('g p', () => this.navigateToProfile());
    
    // Action shortcuts
    this.shortcuts.set('?', () => this.showHelp());
    this.shortcuts.set('k', () => this.openSearch());
    
    // Listen for keyboard events
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
  }
  
  private handleKeyPress(e: KeyboardEvent): void {
    // Handle keyboard shortcuts
  }
}
```

## Testing Checklist

1. **Visual Testing**
   - [ ] All interactive elements have clear visual states
   - [ ] Focus indicators are visible and consistent
   - [ ] Color contrast meets WCAG requirements
   - [ ] Text remains readable in all states

2. **Keyboard Testing**
   - [ ] All interactive elements are focusable
   - [ ] Focus order is logical
   - [ ] Focus trapping works in modals
   - [ ] Keyboard shortcuts are documented

3. **Screen Reader Testing**
   - [ ] All elements have appropriate ARIA labels
   - [ ] Form fields have associated labels
   - [ ] Error messages are announced
   - [ ] Dynamic content updates are announced

4. **Interaction Testing**
   - [ ] All click/touch targets are large enough
   - [ ] Touch targets have adequate spacing
   - [ ] Interactive elements have clear feedback
   - [ ] Forms provide clear validation feedback

## Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/) 