/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'Fraunces', 'Georgia', 'serif'],
        display: ['Fraunces', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        canvas: {
          DEFAULT: '#0e0d0b',
          light: '#f8f7f4',
        },
        surface: {
          DEFAULT: '#161512',
          light: '#ffffff',
          elevated: '#1e1c18',
          'elevated-light': '#f0ede6',
        },
        accent: {
          DEFAULT: '#ff6a2b',
          hover: '#ff7e45',
          dark: '#e05316',
          muted: 'rgba(255, 106, 43, 0.15)',
        },
        ink: {
          DEFAULT: '#f2efe8',
          light: '#141311',
          muted: '#9a968d',
          'muted-light': '#6b665c',
          faint: '#656157',
          'faint-light': '#a19c91',
        },
        hairline: {
          DEFAULT: '#24221e',
          light: '#e4e1db',
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};
