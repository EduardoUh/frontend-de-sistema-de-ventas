/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				"fade-out": {
					'25%': { opacity: '0.75' },
					'50%': { opacity: '0.50' },
					'75%': { opacity: '0.25' },
					'100%': { opacity: '0', display: 'none' }
				},
				"fade-in": {
					'0%': { opacity: '0' },
					'25%': { opacity: '0.25' },
					'50%': { opacity: '0.50' },
					'75%': { opacity: '0.75' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				"fade-out": 'fade-out 1000ms ease-in-out forwards',
				"fade-in": 'fade-in 1500ms ease-in-out'
			}
		},
	},
	plugins: [],
}

