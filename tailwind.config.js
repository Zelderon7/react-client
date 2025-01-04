/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "from-gray-800",
    "to-black",
    "from-gray-500",
    "to-gray-800",
    "from-yellow-700",
    "via-yellow-800",
    "to-yellow-950",
    "from-yellow-500",
    "to-yellow-800",
    "from-blue-700",
    "to-yellow-900",
    "from-blue-500",
    "via-green-500",
    "to-blue-300",
    "from-purple-400",
    "via-red-500",
    "to-pink-500",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
        third: "var(--color-bg-third)",
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
        navbar_bg: "var(--color-navbar-bg)",
        logo_color: "var(--color-logo)",
        shadow_primary: "var(--color-shadow-primary)",
        class_bg: "var(--color-class-bg)",
        textDanger: "var(--color-text-danger)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        body: {
          backgroundColor: theme("colors.primary"),
          color: theme("colors.textPrimary"),
        },
        a: {
          color: theme("colors.accent"),
        },
      });
    }),
  ],
};
