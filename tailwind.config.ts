// tailwind.config.ts (Tailwind v4)
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px'
      }
    }
  },
  plugins: [],
}
