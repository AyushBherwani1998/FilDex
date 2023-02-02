/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "slight-black": "#111215",
        "grey-font": "#6E747A",
        "input-fill": "#191B1E",
        "placeholder-dark-text": "#47494B",
        "divider-dark": "#1B1B1B",
        "hover-fill": "#1F2226",
        "hover-stroke": "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
