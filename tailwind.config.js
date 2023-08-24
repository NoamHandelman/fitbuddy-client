/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        120: '30rem',
      },
      animation: {
        scale: 'scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['focus'],
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'input.autofill:-webkit-autofill': {
          boxShadow: '0 0 0px 1000px white inset',
        },
      });
    },
  ],
};
