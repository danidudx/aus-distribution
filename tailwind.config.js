module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF3366",
        secondary: "#FDC500",
        accent: "#FDF4E3",
        textPrimary: "#1B1F3B",
        textSecondary: "#6B7280",
        background: "#FEF9F3",
        navbackground: "#08212B",
        navborder: "#0B2F3D",
        footer: "#012A36",
        buttonyellow: "#FFC914",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        tropiline: ["Tropiline", "sans-serif"],
      },
    },
  },
  plugins: [],
};
