module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        bodyBg: '#fff',
        textColor: 'rgba(255, 255, 255, 0.87)',
        darkBg: '#242424',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        'screen-lg': '860px',
      },
      spacing: {
        'padding-root': '2rem',
      }
    },
  },
  plugins: [],
};
