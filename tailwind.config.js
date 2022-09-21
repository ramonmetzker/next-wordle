/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        "scale-up": "scale 0.5s linear"
      },
      keyframes: {
        "scale": {
          "0%, 100%": {transform: 'scale(1)'},
          "50%": {transform: 'scale(1.1)'}
        }
      }
    },
  },
  plugins: [],
}
