Please enhance the WillowWealth investor onboarding wizard with subtle, smooth page transitions between screens using CSS/SCSS Module animation utilities (or Framer Motion if light animation components are preferred).

Requirements & Architectural Guidelines:

1. Transition Behavior & Aesthetic:
   - Apply clean, modern, high-performance visual transitions (e.g., slight horizontal slide + fade-in) when advancing forward (`NEXT_STEP`) or moving backward (`PREV_STEP`).
   - Keep transition durations tight and responsive (between 200ms and 300ms) with clean cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`) so the form feel remains snappy and non-blocking.
   - Avoid heavy, distracting layout jumps or complex multi-layer animations.

2. Directional Awareness (Optional / Recommended):
   - When moving forward (`nextStep`), screens slide in slightly from the right and fade in.
   - When moving backward (`prevStep`), screens slide in from the left and fade in.

3. Accessibility & Accessibility Safety:
   - Wrap transitions in a `prefers-reduced-motion` media query so users with motion sensitivity receive an instant opacity cross-fade without horizontal displacement.

4. Component Integration:
   - Implement the transition wrapper directly inside `LayoutShell.tsx` or as a lightweight `AnimatedStepContainer.tsx` wrapper so individual step screens do not need duplicated animation logic.
