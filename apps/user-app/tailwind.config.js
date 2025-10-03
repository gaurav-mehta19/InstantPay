/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,jsx,tsx,mdx}"
  ],
  safelist: [
    'text-accent-emerald',
    'text-accent-teal', 
    'text-accent-pink',
    'text-accent-coral',
    'bg-accent-emerald',
    'bg-accent-teal',
    'bg-accent-pink',
    'bg-accent-coral',
    'border-accent-emerald',
    'border-accent-teal',
    'border-accent-pink',
    'border-accent-coral',
    'from-accent-emerald',
    'to-accent-teal',
    'from-accent-pink',
    'to-accent-coral',
    'animate-fade-in',
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animate-float',
    'animate-bounce-gentle',
    'animate-pulse-slow',
    'animate-gradient-shift'
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Modern Blue Gradient
        primary: {
          DEFAULT: '#667eea',
          dark: '#4c63d2',
          light: '#8fa4f3',
          lighter: '#b8c5f2',
          muted: '#e1e8ff',
          50: '#f0f4ff',
          100: '#e1e8ff',
          200: '#c9d6ff',
          300: '#a5b8ff',
          400: '#8fa4f3',
          500: '#667eea',
          600: '#4c63d2',
          700: '#3b4ba0',
          800: '#2d3a80',
          900: '#1e2a5e',
        },
        // Secondary Colors - Purple Gradient
        secondary: {
          DEFAULT: '#764ba2',
          light: '#9575cd',
          medium: '#8e6ba8',
          dark: '#5e3981',
          darker: '#4a2c6a',
          50: '#f3f0ff',
          100: '#e9e2ff',
          200: '#d6ccff',
          300: '#b8a5ff',
          400: '#9575cd',
          500: '#764ba2',
          600: '#5e3981',
          700: '#4a2c6a',
          800: '#382352',
          900: '#281a3d',
        },
        // Accent Colors
        accent: {
          pink: '#f093fb',
          coral: '#f5576c',
          emerald: '#10b981',
          teal: '#14b8a6',
          purple: '#a855f7',
          indigo: '#6366f1',
        },
        // Individual accent colors for easier use
        'accent-pink': '#f093fb',
        'accent-coral': '#f5576c',
        'accent-emerald': '#10b981',
        'accent-teal': '#14b8a6',
        'accent-purple': '#a855f7',
        'accent-indigo': '#6366f1',
        // Status Colors - More vibrant
        status: {
          error: '#ef4444',
          warning: '#f59e0b',
          pending: '#eab308',
          success: '#22c55e',
          info: '#3b82f6',
        },
        // Neutral Colors - Warmer tones
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-slow': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'flash': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'flash': 'flash 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

