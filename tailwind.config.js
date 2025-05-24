module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark'], // Or add more: ['light', 'dark', 'cupcake', ...]
  },
};