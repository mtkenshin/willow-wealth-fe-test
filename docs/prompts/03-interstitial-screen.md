Please create a reusable Interstitial layout component (`src/screens/InterstitialScreen.tsx`) for the WillowWealth investor onboarding wizard in React + TypeScript with SCSS/CSS Modules.

Requirements & Architectural Guidelines:

1. Reusable Component API (`src/screens/InterstitialScreen.tsx`):
   - Props:
     - `title`: string | React.ReactNode (Supports dynamic interpolation like "Welcome to Willow Wealth, " + firstName)
     - `description`: string (Body copy explaining the section setup)
     - `onContinue`: () => void (Callback invoked when the main action button is clicked)
     - `buttonText`?: string (Optional, defaults to "Continue")

2. Layout & Responsive Structure:
   - Centered 2-column or responsive flex layout matching the ASCII mockup:
     - Left column / block: Clean illustration placeholder (e.g., a styled flex box with a subtle SVG icon, soft background tint, and subtle rounded border).
     - Right column / block: Content stack containing the bold headline, descriptive body copy, and a full-width or prominent high-contrast `[ Continue ]` button.
   - On mobile/small screens, stack the illustration vertically above the content with proper spacing.

3. Design & Styling (SCSS / CSS Modules):
   - Consistent typography using global SCSS variables (deep slate/navy heading text, muted secondary text color).
   - Generous whitespace, clean button hover/focus states, and accessible touch targets.

4. Usage Example:
   - Provide clean integration examples for both:
     - **Interstitial A:** Title: `Welcome to Willow Wealth, ${account.firstName || 'there'}`
     - **Interstitial B:** Title: `A few more questions to complete your account set-up`
