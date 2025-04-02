# Rollercoaster.dev Design System

## Color System

### Primary Colors
- **Soothing Blue**
  - Light Mode: `#7B9EB3` (Primary)
  - Dark Mode: `#9DB8CC` (Primary)
  - Variations:
    - Light: `#A3B8C9`
    - Lighter: `#C9D6E0`
    - Dark: `#5C7A8C`
    - Darker: `#3D5261`

- **Calming Green**
  - Light Mode: `#7FA885` (Secondary)
  - Dark Mode: `#9DB8A3` (Secondary)
  - Variations:
    - Light: `#A3C0A9`
    - Lighter: `#C9D6CC`
    - Dark: `#5C7A61`
    - Darker: `#3D523F`

### Neutral Colors
- **Light Mode**
  - Background: `#F8F9FA` (Primary)
  - Surface: `#FFFFFF` (Secondary)
  - Text: `#2C3E50` (Primary)
  - Text Secondary: `#6C757D`
  - Border: `#E9ECEF`

- **Dark Mode**
  - Background: `#1A1B1E` (Primary)
  - Surface: `#2C2E33` (Secondary)
  - Text: `#E9ECEF` (Primary)
  - Text Secondary: `#ADB5BD`
  - Border: `#3D4147`

### Semantic Colors
- **Success**
  - Light: `#7FA885`
  - Dark: `#9DB8A3`

- **Warning**
  - Light: `#E9C46A`
  - Dark: `#F4D03F`

- **Error**
  - Light: `#E76F51`
  - Dark: `#F4A261`

- **Info**
  - Light: `#7B9EB3`
  - Dark: `#9DB8CC`

## Typography

### Font Family
- **Primary Font**: Inter
  - Clean, modern sans-serif
  - Excellent readability
  - Good support for various weights
  - Dyslexia-friendly characteristics

- **Secondary Font**: OpenDyslexic
  - Specifically designed for dyslexia
  - Available as an optional alternative
  - Can be toggled in user preferences

### Font Sizes
```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
```

### Line Heights
```css
:root {
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
}
```

## Spacing System
```css
:root {
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
}
```

## Component Guidelines

### Buttons
- **Primary Button**
  - Background: Primary Blue
  - Text: White
  - Hover: Lighter Blue
  - Focus: Subtle outline
  - Disabled: Muted version

- **Secondary Button**
  - Background: Transparent
  - Border: Primary Blue
  - Text: Primary Blue
  - Hover: Light Blue background
  - Focus: Subtle outline

### Cards
- **Light Mode**
  - Background: White
  - Border: Light gray
  - Shadow: Subtle elevation

- **Dark Mode**
  - Background: Dark surface
  - Border: Darker border
  - Shadow: Subtle elevation

### Input Fields
- **Light Mode**
  - Background: White
  - Border: Light gray
  - Focus: Primary Blue outline

- **Dark Mode**
  - Background: Dark surface
  - Border: Dark border
  - Focus: Light Blue outline

### Badges
- **Achievement Badge**
  - Circular design
  - Primary Blue background
  - White icon
  - Subtle shadow

- **Progress Badge**
  - Circular progress indicator
  - Calming Green for completion
  - Light gray for incomplete

## Animation Guidelines

### Transitions
```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
  --transition-bounce: 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Motion Preferences
- Respect user's `prefers-reduced-motion` setting
- Provide option to disable animations
- Use subtle transitions
- Avoid sudden movements

## Accessibility Guidelines

### Focus States
- Visible focus indicators
- High contrast outlines
- Consistent styling
- Keyboard navigation support

### Color Contrast
- Maintain WCAG 2.1 AA standards
- Minimum contrast ratio: 4.5:1 for text
- Minimum contrast ratio: 3:1 for large text
- Minimum contrast ratio: 3:1 for UI components

### Interactive Elements
- Minimum touch target size: 44x44px
- Clear hover states
- Consistent interaction patterns
- Clear active states

## Responsive Breakpoints
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## Implementation Notes

### CSS Variables
- Use CSS custom properties for all design tokens
- Support theme switching
- Enable runtime customization
- Maintain consistent naming

### Component Library
- Build on accessibility-first principles
- Support keyboard navigation
- Include ARIA attributes
- Provide clear documentation

### Theme Switching
- Support system preferences
- Allow manual override
- Persist user preferences
- Smooth transition between themes 