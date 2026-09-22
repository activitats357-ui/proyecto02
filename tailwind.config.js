/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Azul petróleo — color primario de marca (base exacta #0F4C81 en el tono 700)
        primary: {
          50: '#eef4fa',
          100: '#d7e6f4',
          200: '#b0cde9',
          300: '#83b0db',
          400: '#5590c8',
          500: '#2f74b3',
          600: '#175f9c',
          700: '#0f4c81',
          800: '#0c3c68',
          900: '#0a2f52',
          950: '#051a2e',
        },
        // Verde turquesa — color secundario y de acento (base exacta #0D9488 en el tono 600,
        // coincide con la escala "teal" estándar de Tailwind)
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2c',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(15, 76, 129, 0.14)',
        softer: '0 2px 10px -2px rgba(15, 76, 129, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
