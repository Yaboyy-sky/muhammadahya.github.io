/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#020b07',
          900: '#05140d',
          850: '#081d14',
          800: '#0b261b',
          700: '#103828',
          600: '#164d37',
        },
        aurora: {
          tosca: '#10b981',
          toscaHover: '#059669',
          purple: '#8b5cf6',
          purpleHover: '#7c3aed',
          cyan: '#06b6d4',
          violet: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'fog-slow': 'fogMove 25s linear infinite',
        'fog-reverse': 'fogMoveRev 35s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fogMove: {
          '0%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) scaleY(1.1)' },
          '100%': { transform: 'translateX(0) scaleY(1)' },
        },
        fogMoveRev: {
          '0%': { transform: 'translateX(-20%)' },
          '50%': { transform: 'translateX(10%)' },
          '100%': { transform: 'translateX(-20%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(16,185,129,0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.5))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glow-tosca': '0 0 25px -5px rgba(16, 185, 129, 0.4), 0 0 10px -2px rgba(16, 185, 129, 0.2)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4), 0 0 10px -2px rgba(139, 92, 246, 0.2)',
        'glow-mixed': '0 0 30px -5px rgba(16, 185, 129, 0.35), 0 0 30px -5px rgba(139, 92, 246, 0.35)',
      }
    },
  },
  plugins: [],
}
