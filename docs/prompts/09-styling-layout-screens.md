Please restyle the WillowWealth onboarding wizard with a high-end Glassmorphism aesthetic and update the SCSS design tokens/variables to match the brand color palette from their official landing page screenshot.

1. Extracted Brand Color Palette (SCSS Variables):
   - Primary Background (Canvas): `#F3F3F0` (Soft off-white / light neutral canvas)
   - Deep Primary (Dark Green/Teal): `#0C2B29` (Rich dark pine/teal used in high-contrast cards and primary actions)
   - Accent Mint/Sage: `#95E0BA` (Bright mint accent used for line artwork, highlights, and secondary icons)
   - Secondary Mint/Teal Container: `#163C38` (Slightly lighter dark green for card accents and icon backgrounds)
   - Primary Text: `#0C2B29` (Deep green/dark neutral for titles and high-contrast text)
   - Muted/Secondary Text: `#5A6B68` (Soft muted dark teal/gray for descriptions)
   - Card Border / Highlight: `rgba(255, 255, 255, 0.6)` / `rgba(12, 43, 41, 0.08)`

2. Glassmorphism Styling System:
   - Floating Glass Cards:
     - Background: `rgba(255, 255, 255, 0.65)` (or semi-transparent dark teal `rgba(12, 43, 41, 0.85)` for dark interstitial cards).
     - Backdrop Filter: `backdrop-filter: blur(16px) saturate(180%)`.
     - Border: 1px solid `rgba(255, 255, 255, 0.4)` (with a subtle inner glow/inset shadow).
     - Box Shadow: `0 20px 40px rgba(12, 43, 41, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)`.
   - Ambient Background Accents:
     - Add soft, blurred decorative background gradients or subtle mint (`#95E0BA`) ambient radial glowing circles behind the centered wizard container to accentuate the frosted glass depth.
   - Interactive Elements (Option Cards, Inputs, Buttons):
     - Unselected Cards: Glass effect with subtle hover translation (`transform: translateY(-2px)`) and active mint outline (`#95E0BA`).
     - Selected Cards: High-contrast deep teal background (`#0C2B29`) with white/mint text and crisp shadow.
     - Form Inputs: Translucent white inputs with subtle dark teal border and focused ring (`#95E0BA`).

3. Implementation Details:
   - Update global SCSS variables (`src/styles/variables.scss` or equivalent).
   - Ensure text contrast ratios pass WCAG AA standards over the frosted glass backgrounds.
   - Keep button touch targets at least 44px with smooth transitions (`all 0.25s ease`).