/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				primary: "#120B48",
				"primary-100": "#B6B3C6",
				"primary-200": "#928FAB",
				"primary-400": "#413C6D",
				"primary-600": "#100A42",
			},
			fontFamily: {
				workSans: ["Work Sans", "sans-serif"],
			},
		},
	},
	plugins: [],
};
