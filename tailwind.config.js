/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 使用 class 策略
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fbf9f5", // Light Beige
        foreground: "#1a1a1a", // Almost Black
        primary: {
          DEFAULT: "#66b3ff", // Sky Blue
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#ff8f4d", // Orange
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#f0eee9",
          foreground: "#666666",
        },
        border: "#000000", // Black border
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1a1a1a",
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0,0,0,1)',
        'retro-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
}
