import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        ink: 'var(--color-ink)',
        red: {
          DEFAULT: 'var(--color-red)',
          700: 'var(--color-red-700)',
        },
        n100: 'var(--color-n100)',
        n600: 'var(--color-n600)',
        n700: 'var(--color-n700)',
        n800: 'var(--color-n800)',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'Archivo', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.12' },
        },
        'grain-shift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '30%': { transform: 'translate(3%, 2%)' },
          '50%': { transform: 'translate(-1%, 4%)' },
          '70%': { transform: 'translate(2%, -2%)' },
          '90%': { transform: 'translate(-3%, 1%)' },
        },
      },
      animation: {
        blink: 'blink 2.4s ease-in-out infinite',
        'grain-shift': 'grain-shift 0.8s steps(1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
