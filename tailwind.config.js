/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a1a',
        secondary: '#1a1a2e',
        accent1: '#00f5ff',
        accent2: '#9d4edd',
        accent3: '#ff0055',
        text: '#e2e8f0'
      },
      backdropBlur: {
        sm: '4px'
      }
    }
  },
  plugins: []
}
