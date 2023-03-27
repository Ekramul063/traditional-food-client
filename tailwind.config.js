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
        //primary:'#fdd670',
        primary:'#014001',
        secondary:'#BA0000'
      },
    }]
  },
  plugins: [require("daisyui")],
}
