# Exact prompt

Please build the Layout Shell and SCSS typography/variable foundation for the WillowWealth investor onboarding wizard in React + TypeScript.

Requirements & Architectural Guidelines:

1. Styling Setup (SCSS Modules or Global SCSS):
   - Create a clean design system with standard CSS/SCSS variables (colors, typography, spacing, border-radius).
   - Use a modern, crisp financial aesthetic (e.g., deep slate blue primary color, clean neutrals, subtle borders).
   - Responsive container centering with max-width limits for form card balance.

2. Layout Shell Component (`src/components/LayoutShell.tsx`):
   - Top Navigation Header displaying the "WillowWealth" brand wordmark.
   - Include a "Back Arrow" button (`<`) on the left side of the header. Clicking back should invoke an `onBack` callback.
   - Display a step progress indicator (`x / x`) on the right side of the header.

3. Progress Counter Logic Rules (Crucial Judgment Requirement):
   - Display progress ONLY for question screens (A1–A3 as steps 1–3 of 6, and B1–B3 as steps 4–6 of 6).
   - Hide BOTH the back button and the progress indicator (`x / x`) on Screen 0 (Account Creation) and the Final Ready Screen.
   - On Interstitial screens (A & B), hide the progress indicator (`x / x`), but show the brand header.

4. Back Navigation Jump Rules:
   - Provide clean props to allow bypassing transition screens when navigating backward (e.g., going back from A1 skips Interstitial A directly to Screen 0; going back from B1 skips Interstitial B directly to Screen A3).

5. Component Contract:
   - Expose props: `currentQuestionStep?: number` (1-6), `totalQuestionSteps?: number` (6), `onBack?: () => void`, `showBack?: boolean`, `children: React.ReactNode`.
