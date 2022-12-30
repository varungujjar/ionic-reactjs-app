module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
		},
		fontSize: {
			sm: [
				'13px',
				{
					lineHeight: '20px',
					letterSpacing: '-0.01em',
					fontWeight: '500',
				},
			],
			base: [
				'15px',
				{
					lineHeight: '24px',
					letterSpacing: '-0.01em',
					fontWeight: '400',
				},
			],
			xl: [
				'18px',
				{
					lineHeight: '20px',
					letterSpacing: '-0.01em',
					fontWeight: '500',
				},
			],
			'2xl': [
				'22px',
				{
					lineHeight: '32px',
					letterSpacing: '-0.01em',
				},
			],
		},
		extend: {},
	},
	plugins: [],
};
