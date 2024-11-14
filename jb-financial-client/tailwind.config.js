const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1025px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
    colors: {
      'primary-950': '#560009',
      'primary-900': '#930010',
      'primary-800': '#BE0015',
      'primary-200': '#FFDADE',
      'neutral-dark': '#444444',
      'neutral-light': '#AAAAAA',
      'neutral-lighter': '#CCCCCC',
      'neutral-lightest': '#EEEEEE',
      'neutral-mid': '#666666',
      'off-white': '#FBFBFD',
      'text-dark' : '#1D1D1F',
      
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}

