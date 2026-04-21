/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nfs-yellow': '#FFD000',
        'nfs-orange': '#FF6B00',
        'nfs-cyan': '#00F0FF',
        'nfs-black': '#0A0A0A',
        'nfs-dark': '#151518',
        'nfs-gray': '#252530',
        'yellow': '#FFD000',
        'orange': '#FF6B00',
        'cyan': '#00F0FF',
      },
      fontFamily: {
        'exo': ['Exo 2', 'sans-serif'],
        'russo': ['Russo One', 'sans-serif'],
      },
      animation: {
        'garage-light': 'garageLightPulse 7s ease-in-out infinite',
        'car-shadow': 'shadowShift 7s ease-in-out infinite',
        'dust-float': 'dustFloat 8s ease-in-out infinite',
        'spotlight': 'spotlight 6s ease-in-out infinite',
      },
      keyframes: {
        garageLightPulse: {
          '0%, 100%': { opacity: '0.45', filter: 'brightness(0.9)' },
          '50%': { opacity: '0.75', filter: 'brightness(1.2)' },
        },
        shadowShift: {
          '0%, 100%': { transform: 'translateX(-5px) scaleX(0.95)', opacity: '0.4' },
          '50%': { transform: 'translateX(5px) scaleX(1.05)', opacity: '0.6' },
        },
        dustFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.3' },
          '25%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0.5' },
          '50%': { transform: 'translateY(-40px) translateX(-5px)', opacity: '0.3' },
          '75%': { transform: 'translateY(-20px) translateX(15px)', opacity: '0.5' },
        },
        spotlight: {
          '0%, 100%': { transform: 'scale(1) translateY(0)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1) translateY(10px)', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}