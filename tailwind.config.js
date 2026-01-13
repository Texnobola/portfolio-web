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
        bg: '#0B0F0C',
        'bg-light': '#FFFFFF',
        card: '#121917',
        'card-light': '#3B82F6',
        primary: '#00FF88',
        text: '#E6FFF3',
        'text-light': '#1E40AF',
        muted: '#7FAF9A',
        'muted-light': '#60A5FA',
        border: '#1A1A1A',
        'border-light': '#2563EB',
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1-desktop': ['56px', '64px'],
        'h1-tablet': ['48px', '56px'],
        'h1-mobile': ['36px', '44px'],
        'h2-desktop': ['40px', '48px'],
        'h2-tablet': ['32px', '40px'],
        'h2-mobile': ['28px', '36px'],
        'h3-desktop': ['28px', '36px'],
        'h3-tablet': ['24px', '32px'],
        'h3-mobile': ['20px', '28px'],
        'body-desktop': ['16px', '24px'],
        'body-tablet': ['15px', '23px'],
        'body-mobile': ['14px', '22px'],
        'small': ['12px', '18px'],
      },
      spacing: {
        'xxs': '4px',
        'xs': '8px',
        's': '12px',
        'm': '16px',
        'l': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      borderRadius: {
        'none': '0',
        's': '6px',
        'm': '12px',
        'l': '16px',
        'round': '999px',
      },
      boxShadow: {
        'soft': '0 6px 20px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}