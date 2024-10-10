import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        aquamarine: '#18F2B2',
        turquoise: '#2FE6DE',
        prussianblue: "#1C3041", 
        claret: "#89043D",
        periwinkle: "#B2ABF2",
        caribbean: "#3C6E71",
        indigodye: '#284B63',
        jet: '#353535',
        plantinum: '#D9D9D9',
        uranianblue: '#ACD2ED',
        straw: '#E1E289',
        darkgreen: '#0A210F',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
