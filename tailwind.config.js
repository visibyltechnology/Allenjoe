/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tech: ['Space Grotesk', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Allenjoe Brand Palette
        brandOrange:   '#f58220',   // Primary color
        brandOrangeDim:'rgba(245, 130, 32, 0.1)',
        brandOrangeGlow:'rgba(245, 130, 32, 0.5)',
        brandRed:      '#f58220',   // Alias mapped to orange for backward compatibility
        brandRedDark:  '#c46516',
        brandRedGlow:  'rgba(245, 130, 32, 0.5)',
        brandBg:       '#050505',   // Deep background
        brandSurface:  '#0a0a0a',   // Card surface
        brandSurface2: '#141414',   // Input/secondary surface
        brandBorder:   '#222222',   // Subtle borders
        brandBorderActive: '#444444',
        brandText:     '#ffffff',   // Primary text
        brandMuted:    '#8a8a8a',   // Muted/placeholder text
        // Legacy aliases
        brandDark:     '#0a0a0a',
        brandBlack:    '#050505',
        brandGreen:    '#f58220',
        brandLime:     '#f58220',
        brandYellow:   '#f58220',
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.5s ease-out forwards',
        'fade-in':       'fadeIn 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'circuit-pulse': 'circuitPulse 3s ease-in-out infinite',
        'spin-slow':     'spin 8s linear infinite',
        'float':         'float 10s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 0 0 rgba(245, 130, 32, 0)' },
          '50%':      { opacity: '1',   boxShadow: '0 0 20px 4px rgba(245, 130, 32, 0.35)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to:   { backgroundPosition: '-200% 0' },
        },
        circuitPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%':      { opacity: '0.7' },
        },
        float: {
          from: { transform: 'translate(0, 0)' },
          to:   { transform: 'translate(20px, -20px)' },
        },
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #f58220 0%, #c46516 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #050505 100%)',
      },
      boxShadow: {
        'red-sm':  '0 2px 8px rgba(245, 130, 32, 0.25)',
        'red-md':  '0 4px 20px rgba(245, 130, 32, 0.35)',
        'red-lg':  '0 8px 40px rgba(245, 130, 32, 0.45)',
        'red-glow': '0 0 30px rgba(245, 130, 32, 0.4)',
      },
    },
  },
  plugins: [],
}
