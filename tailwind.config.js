import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#45EF34',
          DEFAULT: '#45EF34',
          dark: '#19A10D',
          secondary: '#0AFDE1'
        }
      },
      boxShadow: {
        'brand': '0 4px 12px rgba(204, 252, 1, 0.15)',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
