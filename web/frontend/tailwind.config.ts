import type { Config } from "tailwindcss";

export default {
  content: {
    files: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./data/*.{json}"
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
