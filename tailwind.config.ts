import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'magic-blue': '#1C305C',
        'magic-white': '#F3F3F2',
        'magic-silver': '#C0C0C0',
      },
    },
  },
  plugins: [],
}

export default config