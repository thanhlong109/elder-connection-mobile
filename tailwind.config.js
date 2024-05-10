/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#161622',
        secondary: {
          DEFAULT: '#FF9C01',
          100: '#FF9001',
          200: '#FF8E01',
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533',
        },
        gray: {
          100: '#CDCDE0',
        },
      },
      fontFamily: {
        pthin: ['Poppins-Thin', 'sans-serif'],
        pextralight: ['Poppins-ExtraLight', 'san-serif'],
        plight: ['Poppins-Light', 'san-serif'],
        pregular: ['Poppins-Regular', 'san-serif'],
        pmedium: ['Poppins-Medium', 'san-serif'],
        psemibold: ['Poppins-SemiBold', 'san-serif'],
        pbold: ['Poppins-Bold', 'san-serif'],
        pblack: ['Poppins-Black', 'san-serif'],
      },
    },
  },
  plugins: [],
};
