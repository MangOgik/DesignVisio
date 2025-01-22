/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["Poppins", "sans-serif"],
  			poppins: ["Poppins", "sans-serif"]
  		},
  		colors: {
  			customBluePrimary: '#4681f4',
  			customBlueSecondary: '#3566c1',
			customRed: '#bd4242',
  			geekBlue: '#5B8FF9',
  			brilliantRed: '#f5222d',
  			brilliantRedDarker: '#d81b24',
  			brilliantBlue: '##108ee9',
  			brilliantLightBlue: '#2db7f5',
  			brilliantGreen: '#52c41a',
			polarGreen: {
				'1': '#f6ffed',
				'2': '#d9f7be',
				'3': '#b7eb8f',
				'4': '#95de64',
				'5': '#73d13d',
				'6': '#52c41a',
				'7': '#389e0d',
				'8': '#237804',
				'9': '#135200',
				'10': '#092b00',
			},
  			color: {
  				'50': '#f8f5ee',
  				'100': '#efe7d2',
  				'200': '#e1cda7',
  				'300': '#cfad75',
  				'400': '#c0914f',
  				'500': '#b17d41',
  				'600': '#966135',
  				'700': '#7a4a2e',
  				'800': '#673e2c',
  				'900': '#59362a',
  				'950': '#331b15',
				//   '50': '#f3f7f8',
				//   '100': '#e1eaec',
				//   '200': '#c7d7da',
				//   '300': '#a0bbc0',
				//   '400': '#71969f',
				//   '500': '#567a84',
				//   '600': '#4a6670',
				//   '700': '#40555e',
				//   '800': '#3a4950',
				//   '900': '#343f45',
				//   '950': '#1f282d',
  				'alternative-black': '#262322',
  				'alternative-gray': '#6C6764',
				'alternative-gray2': '#FCFCFA',
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				accent: 'hsl(var(--sidebar-accent))',
  				accentForeground: 'white',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			fadeInUp: 'fadeInUp 0.3s ease-in-out'
  		}
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require('tailwind-scrollbar'),
],
}

