/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			oswald: 'Oswald, sans-serif',
			urbanist: 'Urbanist, sans-seri',
		},
		extend: {
			transitionDuration: {
				slow: '1000ms',
				normal: '500ms',
				fast: '300ms',
			},
		},
	},
	plugins: [],
};
