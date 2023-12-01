/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgDark: '#010409',
        bgMedium: '#0a0c10',
        bgLight: '#5a5f63',
        textLight: '#f0f3f6',
        textDark: '#9ea7b3',
        lineDark: '#7a828e'
      }
    }
  },
  plugins: []
}
