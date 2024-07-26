/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        extraLg: "480px",
      },
      height: {
        extraLg: "480px",
      },
      colors: {
        primary: {
          200: "#A8A4FF",
          300: "#635FC7",
        },
        shades: {
          purple: "rgb(99, 95, 199,0.1)",
          greyish: "rgb(130, 143, 163,0.25)",
        },
        grey: {
          50: "#F4F7FD",
          100: "#E4EBFA",
          150: "#E9EFFA",
          200: "#828FA3",
          300: "#3E3F4E",
          400: "#2B2C37",
          500: "#20212C",
          600: "#000112",
        },
        redish: {
          200: "#FF9898",
          300: "#EA5555",
        },
      },
      keyframes: {
        toggleDark: {
          "0%,100%": { transform: "translateX(100%)" },
        },
        toggleLight: {
          "100%,0%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        toggleDark: "toggleDark 3s ease-in-out infinite",
        toggleLight: "toggleLight 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
