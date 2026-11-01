# Prompt — Complete Onboarding Review

Please review the complete WillowWealth onboarding application for responsive layout, accessibility, and validation edge cases.

Verification Tasks:

1. Navigation & State Checks:
   - Verify hitting "Back" on A1 jumps past Interstitial A directly to Screen 0.
   - Verify hitting "Back" on B1 jumps past Interstitial B directly to Screen A3.
   - Verify the progress indicator counter `x/x` renders as 1/6–3/6 on screens A1–A3, and 4/6–6/6 on screens B1–B3, while hiding on Screen 0, Interstitials A & B, and the final Ready screen.

2. Responsive CSS Check:
   - Mobile verification (375px width): Cards stack cleanly, touch targets are at least 44px tall, input fields don't cause horizontal layout overflow.
   - Tablet/Desktop verification (768px+ width): Forms and option cards stay centered with readable line-lengths.

3. Complete Automated Docs Update:
   - Mark all tasks in `PLAN.md` as completed (`[x]`).
   - Append a final summary to `AI_WORKFLOW.md` highlighting key architectural decisions, verification steps performed, and accepted vs. rejected AI code suggestions.
