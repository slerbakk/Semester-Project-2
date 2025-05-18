/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*.{html,js}"],
  safelist: ["text-ah-ctahover", "bg-red-800", "bg-green-800"],
  theme: {
    extend: {
      colors: {
        ah: {
          header: "#FCF5EB",
          cta: "#AC6230",
          ctahover: "#833E15",
          blue: "#264251",
          50: "#FDF8F1",
          100: "#F7E7D3",
          200: "#d1b8a9",
          300: "#bb957f",
          400: "#a47154",
          500: "#8d4e29",
          600: "#713e21",
          700: "#552f19",
          800: "#381f10",
          900: "#1c1008",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        helvetica: ['"Helvetica Neue"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
