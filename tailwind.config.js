const { hero-ui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1B3B2B",
        cream: "#FDFBF7",
        beige: "#F4EFE6",
        rose: "#D4A39A",
        charcoal: "#2C2A29",
      },
    },
  },
  darkMode: "class",
  plugins: [hero-ui()],
};