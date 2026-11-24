/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        royal: {
          dark: '#151515',       // Primary background
          charcoal: '#202020',   // Secondary background
          surface: '#262626',    // Card / surface background
          gold: {
            DEFAULT: '#C6A15B',  // Brand Gold Accent
            light: '#DFBE79',    // Hover gold
            dark: '#A37F39',     // Deep gold
            subtle: 'rgba(198, 161, 91, 0.15)',
          },
          cream: '#F8F5EF',      // Light cream background
          muted: '#B8B8B8',      // Secondary text
          darkText: '#252525',   // Dark text on cream
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 4px 20px -2px rgba(198, 161, 91, 0.25)',
        'luxury': '0 10px 30px -5px rgba(0, 0, 0, 0.6)',
      },
      borderColor: {
        'gold-subtle': 'rgba(198, 161, 91, 0.2)',
      },
    },
  },
  plugins: [],
};
