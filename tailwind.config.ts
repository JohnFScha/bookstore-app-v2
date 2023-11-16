import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    screens: {
      'lg': '1024px',
      'md': '768px',
      'xs': '425px'
    },
  },
  daisyui: {
    themes: ["retro", "coffee"]
  },
  plugins: [require('daisyui')],
});