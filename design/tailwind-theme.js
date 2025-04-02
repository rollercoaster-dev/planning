/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Primary Colors
        blue: {
          DEFAULT: '#7B9EB3',
          light: '#A3B8C9',
          lighter: '#C9D6E0',
          dark: '#5C7A8C',
          darker: '#3D5261',
          // Dark mode variations
          darkMode: {
            DEFAULT: '#9DB8CC',
            light: '#B3C5D4',
            lighter: '#C9D6E0',
            dark: '#7B9EB3',
            darker: '#5C7A8C',
          },
        },
        green: {
          DEFAULT: '#7FA885',
          light: '#A3C0A9',
          lighter: '#C9D6CC',
          dark: '#5C7A61',
          darker: '#3D523F',
          // Dark mode variations
          darkMode: {
            DEFAULT: '#9DB8A3',
            light: '#B3C5BD',
            lighter: '#C9D6CC',
            dark: '#7FA885',
            darker: '#5C7A61',
          },
        },
        // Neutral Colors
        neutral: {
          // Light mode
          light: {
            background: '#F8F9FA',
            surface: '#FFFFFF',
            text: '#2C3E50',
            'text-secondary': '#6C757D',
            border: '#E9ECEF',
          },
          // Dark mode
          dark: {
            background: '#1A1B1E',
            surface: '#2C2E33',
            text: '#E9ECEF',
            'text-secondary': '#ADB5BD',
            border: '#3D4147',
          },
        },
        // Semantic Colors
        success: {
          light: '#7FA885',
          dark: '#9DB8A3',
        },
        warning: {
          light: '#E9C46A',
          dark: '#F4D03F',
        },
        error: {
          light: '#E76F51',
          dark: '#F4A261',
        },
        info: {
          light: '#7B9EB3',
          dark: '#9DB8CC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.25' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.75' }],
        'xl': ['1.25rem', { lineHeight: '1.75' }],
        '2xl': ['1.5rem', { lineHeight: '2' }],
        '3xl': ['1.875rem', { lineHeight: '2.25' }],
        '4xl': ['2.25rem', { lineHeight: '2.5' }],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For better form styling
    require('@tailwindcss/typography'), // For rich text content
    require('@tailwindcss/aspect-ratio'), // For responsive media
  ],
} 