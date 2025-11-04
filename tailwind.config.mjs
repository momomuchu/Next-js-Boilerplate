/**
 * Tailwind CSS Configuration
 * @type {import('tailwindcss').Config}
 *
 * This configuration extends Tailwind CSS with custom colors based on CSS custom properties
 * defined in src/styles/theme.css. It allows for dynamic theming through environment variables
 * and CSS custom properties while maintaining type-safe Tailwind utility classes.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * Custom color system based on CSS custom properties
       * These map to the variables defined in src/styles/theme.css
       *
       * Usage examples:
       * - bg-primary, text-primary, border-primary
       * - bg-secondary, text-secondary
       * - bg-hero-foreground, text-hero-foreground
       */
      colors: {
        // Primary brand colors
        'primary': {
          DEFAULT: 'var(--color-primary)',
          strong: 'var(--color-primary-strong)',
          soft: 'var(--color-primary-soft)',
          foreground: 'var(--color-primary-foreground)',
        },

        // Secondary brand colors
        'secondary': {
          DEFAULT: 'var(--color-secondary)',
          strong: 'var(--color-secondary-strong)',
          soft: 'var(--color-secondary-soft)',
          foreground: 'var(--color-secondary-foreground)',
        },

        // Hero section colors
        'hero': {
          foreground: 'var(--color-hero-foreground)',
        },

        // Surface colors for cards, inputs, etc.
        'surface': {
          card: 'var(--color-surface-card)',
          border: 'var(--color-surface-border)',
          input: 'var(--color-surface-input)',
        },

        // Input-specific colors
        'input': {
          border: 'var(--color-input-border)',
        },

        // Text colors for surfaces
        'text-on-surface': 'var(--color-text-on-surface)',
        'text-muted-on-surface': 'var(--color-text-muted-on-surface)',
      },

      /**
       * Custom box shadows based on CSS custom properties
       *
       * Usage examples:
       * - shadow-soft, shadow-elevated, shadow-button
       */
      boxShadow: {
        soft: 'var(--shadow-soft)',
        elevated: 'var(--shadow-elevated)',
        button: 'var(--shadow-button)',
      },

      /**
       * Custom background images for gradients
       *
       * Usage examples:
       * - bg-gradient-hero
       */
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
      },

      /**
       * Custom border radius values
       * Matching the values used in theme.css
       */
      borderRadius: {
        card: 'clamp(1.5rem, 2.5vw, 1.85rem)',
        input: '1rem',
        error: '0.9rem',
      },

      /**
       * Custom backdrop blur values
       */
      backdropBlur: {
        card: '24px',
      },
    },
  },
  plugins: [],
};
