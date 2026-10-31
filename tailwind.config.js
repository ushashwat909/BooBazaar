/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0B0813',
          dark: '#07050C',
          surface: '#151022',
          card: '#151022',
          cardHover: '#1B152B',
          glass: 'rgba(21, 16, 34, 0.75)',
        },
        pumpkin: {
          light: '#FFA654',
          DEFAULT: '#FF8A2B',
          dark: '#E06B0F',
          glow: 'rgba(255, 138, 43, 0.25)',
        },
        coven: {
          light: '#9D4EDD',
          DEFAULT: '#7B2CBF',
          dark: '#5A189A',
          glow: 'rgba(123, 44, 191, 0.25)',
        },
        potion: {
          emerald: '#2EC4B6',
          teal: '#20A495',
          gold: '#FFD166',
          rose: '#EF476F',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          muted: '#EAE1D8',
        },
        lavender: {
          muted: '#A39BB5',
          subtle: '#6A637C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'potion-glow': '0 0 25px -5px rgba(255, 138, 43, 0.3)',
        'coven-glow': '0 0 25px -5px rgba(123, 44, 191, 0.35)',
        'emerald-glow': '0 0 20px -5px rgba(46, 196, 182, 0.4)',
      },
      borderColor: {
        'potion-subtle': 'rgba(255, 145, 48, 0.16)',
        'coven-subtle': 'rgba(123, 44, 191, 0.25)',
      }
    },
  },
  plugins: [],
}

