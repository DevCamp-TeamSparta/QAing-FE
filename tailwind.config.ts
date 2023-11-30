import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        sementic: {
          danger: '#F63B28',
          check: '#0D7EFF',
          disabled: '#C2C2C2',
        },
        brand: {
          default: '#00CCCC',
          hover: '#6DDBD9',
          pressed: '#00C1C4',
          background: '#EDFBFB',
        },
        gray: {
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#DEDEDE',
          500: '#C2C2C2',
          600: '#979797',
          700: '#818181',
          800: '#606060',
          900: '#3C3C3C',
        },
        extra: {
          black: '#1B1B1B',
          white: '#FFFFFF',
          record: '#FF5847',
        },
      },
    },
  },
  plugins: [],
  styles: ['/src/app/globals.css'],
}
export default config
