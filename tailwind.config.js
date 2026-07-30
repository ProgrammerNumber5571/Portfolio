/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08070A',
          900: '#0B0A0E',
          850: '#100E14',
          800: '#15131A',
        },
        accent: {
          DEFAULT: '#A855F7',
          soft: '#C9A9FF',
          deep: '#7C3AED',
        },
        spark: '#C6F24E',
        fg: '#EAE5EC',
        muted: '#8E8A93',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-rev': 'marquee-rev 32s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.45, transform: 'scale(0.82)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
