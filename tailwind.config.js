/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import tailwindcssForm from '@tailwindcss/forms'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor': colors.purple[500],
        'secondaryColor': colors.sky[600],
        'error': colors.red[600],
      }
    },
  },
  plugins: [
    tailwindcssForm
  ],
}