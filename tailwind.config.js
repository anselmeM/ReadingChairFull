/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#7351fb",
                "background-light": "#f6f5f8",
                "background-dark": "#0D0D0F", // Updated to match user request
                "surface-dark": "#18181b",
                "surface-highlight": "#232328",
                "electric-violet": "#8F00FF",
                "card-overlay": "rgba(13, 13, 15, 0.7)",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            backgroundImage: {
                'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(115, 81, 251, 0.15) 0%, rgba(13, 13, 15, 0) 70%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 7s ease-in-out 1s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
