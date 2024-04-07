import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
  theme: {
    extend: {
      colors: {
        deposit: "#35DA9E",
        withdraw: "#f93535",
        swap: "#3F87F4",
      },
    },
  },
};
export default config;
