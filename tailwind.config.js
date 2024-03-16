/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "barlow-condensed": ["Barlow Condensed", "sans-serif"],
        preahvihear: ["Preahvihear", "sans-serif"],
        "dancing-script": ["Dancing Script", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        "permanent-marker": ["Permanent Marker", "cursive"],
        "saira-condensed": ["Saira Condensed", "sans-serif"],
        "happy-monkey": ["Happy Monkey", "system-ui"],
      },
    },
  },
  plugins: [],
};
