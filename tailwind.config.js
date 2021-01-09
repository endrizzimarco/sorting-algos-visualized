module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-navy': '#7360ff',
        'sky-blue': '#00d8ff',
        'dark-sky-blue': '#00bcf5',
        'light-pink': '	#ffc2e9'
      },
      transitionDuration: {
        '2000': '2000ms'
      },
      screens: {
        xs: { min: '350px', max: '640px' },
        'overflow-fix': { min: '767px', max: '890px' }
      },
      padding: {
        '130-p': '130%',
        '45-p': '45%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
