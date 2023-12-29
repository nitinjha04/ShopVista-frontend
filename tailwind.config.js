/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      colors: {
        personalColour: "#ffff",
        navColour: "#457b9d",
        cardColour: "#cad2c5",
        userOrderColor: "#cad2c5",
        // userOrderColor: "#caf0f8",
      },
      dropShadow: {
        "10xl": "-10px -10px 17px 0px rgba(255,255,255,0.75)",
        // -webkit-box-shadow: -10px -10px 17px 0px rgba(255,255,255,0.75);
        // -moz-box-shadow: -10px -10px 17px 0px rgba(255,255,255,0.75);'
      },
     
    },
  },
  plugins: ["@tailwindcss/aspect-ratio", "@tailwindcss/forms"],
};
