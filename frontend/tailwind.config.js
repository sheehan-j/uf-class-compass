/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	fontFamily: {
		sans: ["Inter", "sans-serif"],
	},
	theme: {
		extend: {
			colors: {
				customOrange: {
					DEFAULT: "rgb(235, 120, 23)",
					dark: "rgb(209, 104, 15)",
				},
				customBlue: {
					DEFAULT: "rgb(40, 87, 151)",
					dark: "rgb(27, 69, 128)",
				},
				customGray: {
					DEFAULT: "rgb(235, 235, 235)",
					dark: "rgb(27, 69, 128)",
				},
			},
		},
	},
	plugins: [],
};
