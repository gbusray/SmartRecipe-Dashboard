/** @type {import('tailwindcss').Config} */
module.exports = {
  // Rationale: Enabling class-based dark mode allows explicit user control over the application theme via DOM manipulation.
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Rationale: Fresh, health-oriented green serving as the secondary thematic color (30%).
        freshGreen: {
          50: '#F0FDF4', // Tint for subtle backgrounds
          500: '#22C55E', // Base hue
        },
        // Rationale: Vibrant purple serving as the high-contrast accent color (10%) for CTAs and critical interactions.
        aiPurple: {
          500: '#A855F7',
          600: '#9333EA',
        }
      }
    },
  },
  plugins: [],
}