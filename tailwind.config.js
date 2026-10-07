export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        marinho: '#0b2a5b',
        azul: { DEFAULT: '#1456c8', escuro: '#0b2a5b' },
        ciano: { DEFAULT: '#22b8e0', claro: '#e6f6fc' },
      },
      boxShadow: { card: '0 8px 30px rgba(11,42,91,0.10)' },
    },
  },
  plugins: [],
}
