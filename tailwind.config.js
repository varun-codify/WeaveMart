/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'white': '#FDFBF7', // Off-white
          'beige': '#F2F0E9', // Warm beige
          'charcoal': '#2D2D2D', // Deep charcoal
          'indigo': '#4A5D6B', // Muted indigo
          'maroon': '#6B2D2D', // Muted maroon
          'light-gray': '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Elegant serif for headings
      }
    },
  },
  plugins: [],
}
