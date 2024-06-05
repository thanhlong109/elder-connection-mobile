/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4AB7B6',
        buttonTextPrimary: '#fff',
        textPrimary: '#383838',
        secondary: {
          DEFAULT: '#FDAA5D',
          BG: '#FEF5EE',
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533',
        },
        gray: {
          DEFAULT: '#F7F7F7',
          Text: '#7D8FAB',
          C5: '#C5C5C5',
          F6: '#F6F6F6',
        },
        green: {
          Text: '#005F74',
          B1: '#28DB75',
          B2: '#1CB45D',
          B3: '#008375',
        },
        Type: {
          success: '#7fdf4b',
          error: '#e5342f',
          warning: '#eeba56',
          info: '#468ee5',
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
