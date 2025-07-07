import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'noto-serif': ['Noto Serif', 'serif'],
				'kameron': ['Kameron', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Couleurs DishTrad spécifiques
				'cameroon-green': 'hsl(var(--cameroon-green))',
				'cameroon-red': 'hsl(var(--cameroon-red))',
				'cameroon-yellow': 'hsl(var(--cameroon-yellow))',
				'cameroon-orange': 'hsl(var(--cameroon-orange))',
				'paper-white': 'hsl(var(--paper-white))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Bordures organiques camerounaises
				'organic': '12px 12px 12px 0',
				'organic-sm': '8px 8px 8px 0',
				'organic-lg': '16px 16px 16px 0',
			},
			boxShadow: {
				'cameroon': 'var(--shadow-cameroon)',
				'warm': 'var(--shadow-warm)',
				'elegant': 'var(--shadow-elegant)',
			},
			backgroundImage: {
				'hero-gradient': 'var(--gradient-hero)',
				'warm-gradient': 'var(--gradient-warm)',
				'vibrant-gradient': 'var(--gradient-vibrant)',
				'pattern-wax': 'var(--pattern-wax)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'fade-in-sequence': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-cameroon': {
					'0%, 100%': { 
						transform: 'scale(1)', 
						boxShadow: 'var(--shadow-cameroon)' 
					},
					'50%': { 
						transform: 'scale(1.05)', 
						boxShadow: 'var(--shadow-warm)' 
					}
				},
				'bounce-gentle': {
					'0%, 100%': { 
						transform: 'translateY(-25%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': { 
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'slide-in-left': 'slide-in-left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'scale-up': 'scale-up 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'fade-in-sequence': 'fade-in-sequence 0.5s ease-out forwards',
				'pulse-cameroon': 'pulse-cameroon 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-gentle': 'bounce-gentle 1s infinite',
			},
			transitionDuration: {
				'350': '350ms',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'112': '28rem',
				'144': '36rem',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
