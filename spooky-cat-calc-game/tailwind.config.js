//This is the configuration file for Tailwind CSS. 
// You'll use this to define your custom "spooky" theme, 
// such as pumpkin-orange colors, your 'Creepster' font, 
// and other design-related settings.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'spooky': ['Creepster', 'cursive'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
