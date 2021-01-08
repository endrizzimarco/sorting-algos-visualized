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
        'overflow-fix': { min: '767px', max: '890px' }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
