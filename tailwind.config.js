/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f7f1',
          100: '#e9efe2',
          200: '#d2dfbe',
          300: '#b3c89a',
          400: '#9db07e',
          500: '#8A9A5B', // sage green
          600: '#707e4a',
          700: '#5c683d',
          800: '#465130',
          900: '#323b22',
        },
        secondary: {
          50: '#f9f6f3',
          100: '#f2ede7',
          200: '#e3d7ca',
          300: '#d1ba9e',
          400: '#c09e79',
          500: '#8B5A2B', // earthy brown
          600: '#7a4f26',
          700: '#654121',
          800: '#4d321a',
          900: '#3a2613',
        },
        accent: {
          50: '#fdfdf6',
          100: '#fbfced',
          200: '#f7f9d9',
          300: '#f4f6c7',
          400: '#f1f2b6',
          500: '#FFFDD0', // cream
          600: '#d9d7b1',
          700: '#b4b393',
          800: '#8c8c74',
          900: '#656654',
        },
        gold: {
          50: '#fbf8e9',
          100: '#f7f2d3',
          200: '#eee4a7',
          300: '#e6d57c',
          400: '#dcc750',
          500: '#D4AF37', // soft gold
          600: '#b3912f',
          700: '#917427',
          800: '#705a1f',
          900: '#524017',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
};