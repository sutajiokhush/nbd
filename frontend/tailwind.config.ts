import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // New Aesthetic Palette
            colors: {
                'midnight-navy': '#132440',
                'romantic-pink': '#FDB5CE',
                'ethereal-teal': '#3B9797',
                'ocean-blue': '#16476A',
                // Keep aliases for easier refactoring
                'pale-pink': '#132440',   // Map old background to new navy
                'deep-pink': '#FDB5CE',   // Map old primary to new pink
                'peach-glow': '#3B9797',  // Map old secondary to teal
                'soft-yellow': '#FDB5CE', // Map old highlight to pink (or ocean-blue depending on context)
            },
            fontFamily: {
                'script': ['"Spicy Sale"', '"Great Vibes"', 'cursive'],
                'serif': ['"Crimson Text"', 'serif'],
                'sans': ['"Inter"', 'sans-serif'],
                'beachday': ['"Beachday"', 'cursive'],
            },

            animation: {
                'float': 'float 6s ease-in-out infinite',
                'unfold': 'unfold 0.8s ease-out forwards',
                'sparkle': 'sparkle 1.5s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                unfold: {
                    '0%': { transform: 'rotateX(90deg) scale(0.5)', opacity: '0' },
                    '50%': { transform: 'rotateX(45deg) scale(0.8)', opacity: '0.5' },
                    '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
                },
                sparkle: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
