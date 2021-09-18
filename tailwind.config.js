module.exports = {
  // Uncomment the line below to enable the experimental Just-in-Time ("JIT") mode.
  // https://tailwindcss.com/docs/just-in-time-mode
  // mode: "jit",
  theme: {
    rotate: {
      360: "360deg",
      "-360": "-360deg",
    },
    extend: {
      // tailwind.config.js
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: {
          50: "#f2f2f3",
          100: "#e5e6e6",
          200: "#caccce",
          300: "#b0b3b5",
          400: "#95999d",
          500: "#7b8084",
          600: "#62666a",
          700: "#4a4d4f",
          800: "#313335",
          900: "#191a1a",
        },
        blue: {
          50: "#e6f5fe",
          100: "#cdeafe",
          200: "#9bd6fd",
          300: "#6ac1fb",
          400: "#38adfa",
          500: "#0698f9",
          600: "#057ac7",
          700: "#045b95",
          800: "#023d64",
          900: "#011e32",
        },
        indigo: {
          50: "#e6e9fe",
          100: "#cdd2fe",
          200: "#9ba5fd",
          300: "#6a78fb",
          400: "#384bfa",
          500: "#061ef9",
          600: "#0518c7",
          700: "#041295",
          800: "#020c64",
          900: "#010632",
        },
        violet: {
          50: "#f0e6fe",
          100: "#e1cdfe",
          200: "#c29bfd",
          300: "#a46afb",
          400: "#8538fa",
          500: "#6706f9",
          600: "#5205c7",
          700: "#3e0495",
          800: "#290264",
          900: "#150132",
        },
        purple: {
          50: "#fce6fe",
          100: "#f9cdfe",
          200: "#f39bfd",
          300: "#ed6afb",
          400: "#e738fa",
          500: "#e106f9",
          600: "#b405c7",
          700: "#870495",
          800: "#5a0264",
          900: "#2d0132",
        },
        pink: {
          50: "#fee6f5",
          100: "#fecdea",
          200: "#fd9bd6",
          300: "#fb6ac1",
          400: "#fa38ad",
          500: "#f90698",
          600: "#c7057a",
          700: "#95045b",
          800: "#64023d",
          900: "#32011e",
        },
        red: {
          50: "#fee6e9",
          100: "#fecdd2",
          200: "#fd9ba5",
          300: "#fb6a78",
          400: "#fa384b",
          500: "#f9061e",
          600: "#c70518",
          700: "#950412",
          800: "#64020c",
          900: "#320106",
        },
        orange: {
          50: "#fef0e6",
          100: "#fee1cd",
          200: "#fdc29b",
          300: "#fba46a",
          400: "#fa8538",
          500: "#f96706",
          600: "#c75205",
          700: "#953e04",
          800: "#642902",
          900: "#321501",
        },
        yellow: {
          50: "#fefce6",
          100: "#fef9cd",
          200: "#fdf39b",
          300: "#fbed6a",
          400: "#fae738",
          500: "#f9e106",
          600: "#c7b405",
          700: "#958704",
          800: "#645a02",
          900: "#322d01",
        },
        lime: {
          50: "#f5fee6",
          100: "#eafecd",
          200: "#d6fd9b",
          300: "#c1fb6a",
          400: "#adfa38",
          500: "#98f906",
          600: "#7ac705",
          700: "#5b9504",
          800: "#3d6402",
          900: "#1e3201",
        },
        green: {
          50: "#e9fee6",
          100: "#d2fecd",
          200: "#a5fd9b",
          300: "#78fb6a",
          400: "#4bfa38",
          500: "#1ef906",
          600: "#18c705",
          700: "#129504",
          800: "#0c6402",
          900: "#063201",
        },
        teal: {
          50: "#e6fef0",
          100: "#cdfee1",
          200: "#9bfdc2",
          300: "#6afba4",
          400: "#38fa85",
          500: "#06f967",
          600: "#05c752",
          700: "#04953e",
          800: "#026429",
          900: "#013215",
        },
        cyan: {
          50: "#e6fefc",
          100: "#cdfef9",
          200: "#9bfdf3",
          300: "#6afbed",
          400: "#38fae7",
          500: "#06f9e1",
          600: "#05c7b4",
          700: "#049587",
          800: "#02645a",
          900: "#01322d",
        },
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/index.html",
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
};
