/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#781e8a',
        'tertiary': {
          '50': '#fcf4ff',
          '100': '#f7e9fe',
          '200': '#f0d2fc',
          '300': '#e7aef9',
          '400': '#da7ef4',
          '500': '#c13de6',
          '600': '#ac2dcc',
          '700': '#9122a9',
          '800': '#781e8a',
          '900': '#661e71',
          '950': '#41074b',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}