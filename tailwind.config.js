/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7F77DD",
        primarylight: "#EEEDFE",
        primarydark: "#534AB7",
        muted: "#AFA9EC",
      },
    },
  },
  plugins: [],
}