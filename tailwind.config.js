/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'primary': '#2064e7',
                'secondary': '#74a4fe',
                'info': '#f3f7ff'
              },
        },
    },
    plugins: [],
};
