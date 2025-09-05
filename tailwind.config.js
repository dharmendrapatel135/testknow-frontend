
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // adjust according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3AB0FF',
          DEFAULT: '#008CFF',
          dark: '#005B99',
        },
        secondary: '#F97316',
        accent: '#10B981',
        danger: '#EF4444',
        neutral: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
}
