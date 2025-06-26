/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#232733',
        'bg-card': '#1a1c22',
        'bg-sidebar': '#1a1c22',
        'accent-green': '#22e584',
        'accent-yellow': '#f6c945',
        'accent-red': '#ff5c5c',
        'accent-blue': '#3b82f6',
        'text-main': '#fff',
        'text-muted': '#a0aec0',
        'border-dark': '#232733',
        'chip-completed': '#22e584',
        'chip-pending': '#f6c945',
        'chip-failed': '#ff5c5c',
      },
      borderRadius: {
        'xl': '1.25rem',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

