import type { Config } from "tailwindcss";

export default {
  content: {
    files: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./data/*.{json}"
    ],
  },
  theme: {
    extend: {
      colors: {
        'teal': 'var(--color-teal, #50C9B4)',
        'warm-coral': 'var(--color-warm-coral, #F2685E)',
        'muted-brick-red': 'var(--color-muted-brick-red, #C24D53)',
        'deep-black': 'var(--color-deep-black, #000000)',
        'retro-teal': 'var(--color-retro-teal, #4D7A7F)',
        'soft-cream': 'var(--color-soft-cream, #EFE5D5)',
        'charcoal-gray': 'var(--color-charcoal-gray, #4E5664)',
        'marigold-yellow': 'var(--color-marigold-yellow, #EAA221)',
        'white': 'var(--color-white, #FFFFFF)',
      },
      backgroundImage: {
        'gradient-tech': 'linear-gradient(135deg, #50C9B4 0%, #4D7A7F 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F2685E 0%, #EAA221 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #EFE5D5 0%, #FFFFFF 100%)',
        'gradient-radial-teal': 'radial-gradient(circle at 50% 0%, rgba(80, 201, 180, 0.2) 0%, transparent 70%)',
        'gradient-radial-coral': 'radial-gradient(circle at 50% 0%, rgba(242, 104, 94, 0.2) 0%, transparent 70%)',
      },
    }
  },
  plugins: [],
} satisfies Config;
