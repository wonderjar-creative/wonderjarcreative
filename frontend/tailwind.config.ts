import type { Config } from "tailwindcss";

export default {
  content: {
    files: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // Vertical alignment classes for columns/column blocks and color classes
    safelist: [
      'size-full',
      'items-start', 'items-center', 'items-end', 'items-stretch',
      'self-start', 'self-center', 'self-end', 'self-stretch',
      'text-teal', 'text-warm-coral', 'text-muted-brick-red', 'text-deep-black',
      'text-retro-teal', 'text-soft-cream', 'text-charcoal-gray', 'text-marigold-yellow',
      'bg-teal', 'bg-warm-coral', 'bg-muted-brick-red', 'bg-deep-black',
      'bg-retro-teal', 'bg-soft-cream', 'bg-charcoal-gray', 'bg-marigold-yellow',
      'border-teal', 'border-warm-coral', 'border-muted-brick-red', 'border-deep-black',
      'border-retro-teal', 'border-soft-cream', 'border-charcoal-gray', 'border-marigold-yellow',
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
      }
    }
  },
  plugins: [],
} satisfies Config;
