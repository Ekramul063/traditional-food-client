/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui:{
    themes:[
      {
      traditionalFoodieTheme:{
        primary:'#fdd670',
        secondary:'#40BFFF'
      },
    }]
  },
  plugins: [require("daisyui")],
}
