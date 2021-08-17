
module.exports = {

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './src/composition.json'],

  darkMode: false,

  theme: {
    minWidth: {
      '96': '24rem',
      '20': '5rem'
    },
    maxWidth: {
      'xxs': '15rem'
    },

    extend: {
    },

  },

  variants: {

    extend: {},

  },

  plugins: [],

}