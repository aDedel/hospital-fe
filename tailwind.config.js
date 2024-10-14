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
        error: colors.red[600]
      }
    },
  },
  plugins: [
    tailwindcssForm
  ],
}