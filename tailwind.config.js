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
          DEFAULT: '#090610',
          dark: '#05030A',
          surface: '#120D1D',
          card: '#140E20',
          cardHover: '#1B132B',
          glass: 'rgba(18, 13, 29, 0.85)',
        },
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#C5A059',
          bright: '#E5C158',
          dark: '#8C6D37',
          glow: 'rgba(197, 160, 89, 0.28)',
        },
        bronze: {
          DEFAULT: '#A77044',
          dark: '#684323',
        },
        pumpkin: {
          light: '#FFA654',
          DEFAULT: '#FF8A2B',
          dark: '#D97706',
          glow: 'rgba(255, 138, 43, 0.25)',
        },
        coven: {
          light: '#9D4EDD',
          DEFAULT: '#7B2CBF',
          dark: '#481373',
          glow: 'rgba(123, 44, 191, 0.25)',
        },
        potion: {
          emerald: '#2EC4B6',
          teal: '#20A495',
          gold: '#FFD166',
          rose: '#EF476F',
        },
        cream: {
          DEFAULT: '#F7F3EE',
          muted: '#E5DFD6',
        },
        lavender: {
          muted: '#A59DB6',
          subtle: '#6A627B',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        editorial: ['"Cinzel"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -4px rgba(197, 160, 89, 0.35)',
        'potion-glow': '0 0 25px -5px rgba(255, 138, 43, 0.3)',
        'coven-glow': '0 0 25px -5px rgba(123, 44, 191, 0.35)',
        'emerald-glow': '0 0 20px -5px rgba(46, 196, 182, 0.4)',
      },
      borderColor: {
        'gold-subtle': 'rgba(197, 160, 89, 0.22)',
        'potion-subtle': 'rgba(255, 145, 48, 0.16)',
        'coven-subtle': 'rgba(123, 44, 191, 0.25)',
      }
    },
  },
  plugins: [],
}
