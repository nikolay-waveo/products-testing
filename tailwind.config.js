const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      shopify: {
        warning: "#FFF5EA",
        subdued: "#6D7175",
        disabled: "#8C9196",
        critical: "#D72C0D",
        success: "#008060",
        highlight: "#347C84",
        warning: "#916A00",
        interactive: "#2C6ECB",
        disabled: "#BDC1CC",
        focused: "#458FFF",
      },
      shopify_banner: {
        status: "#e3f5f9",
        warning: "#fff5ea",
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
