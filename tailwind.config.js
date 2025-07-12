/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          50: '#fef9c3',   // sunlight
          100: '#fef3c7',  // warm glow
          200: '#fde68a',  // golden
          300: '#fcd34d',  // amber
          400: '#f59e0b',  // orange
          500: '#d97706',  // deep orange
          600: '#b45309',  // bronze
          700: '#92400e',  // dark bronze
          800: '#78350f',  // brown
          900: '#451a03',  // dark brown
        },
        sky: {
          50: '#f0f9ff',   // lightest sky
          100: '#e0f2fe',  // fog
          200: '#bae6fd',  // light blue
          300: '#7dd3fc',  // sky blue
          400: '#38bdf8',  // bright blue
          500: '#0ea5e9',  // blue
          600: '#0284c7',  // deep blue
          700: '#0369a1',  // darker blue
          800: '#075985',  // navy
          900: '#0c4a6e',  // dark navy
        },
        rose: {
          50: '#fdf2f8',   // lightest pink
          100: '#fce7f3',  // soft pink
          200: '#fbcfe8',  // light pink
          300: '#f9a8d4',  // pink
          400: '#f472b6',  // bright pink
          500: '#ec4899',  // magenta
          600: '#db2777',  // deep pink
          700: '#be185d',  // darker pink
          800: '#9d174d',  // burgundy
          900: '#831843',  // dark burgundy
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
