/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html" ],      
  theme: {
    extend: {  colors: {
      primary: '#9AB3A5', 
      secondary: '#D9D9D9', 
      third: '#1E3D2F', 
      fourth: '#BFBFBF', 
    }},
  },
  plugins: [],
}

