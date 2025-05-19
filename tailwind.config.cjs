module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#234567', // azul escuro
        secondary: '#4F8FCB', // azul claro
        accent: '#E3F0FF', // azul muito claro
        surface: '#F8FAFC', // cinza quase branco
        success: '#4ADE80', // verde suave
        error: '#F87171', // vermelho suave
        blue: {
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        green: {
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #E3F0FF 0%, #F8FAFC 100%)',
        'gradient-nav': 'linear-gradient(90deg, #234567 0%, #4F8FCB 100%)',
        'gradient-btn': 'linear-gradient(90deg, #4F8FCB 0%, #234567 100%)',
      },
    },
  },
  plugins: [],
}; 