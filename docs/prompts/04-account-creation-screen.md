Please build the Screen 0 Account Creation component (`src/screens/AccountStep.tsx`) for the WillowWealth investor onboarding flow using React, TypeScript, and SCSS/CSS Modules.

Requirements & Architectural Guidelines:

1. State & Form Inputs:
   - Fields: First name, Last name, Email address, Password.
   - Include a Password Visibility Toggle button (eye icon or (o) toggle) directly inside or adjacent to the password input field.
   - Terms & Disclosures Checkbox: "I have read and accepted the Privacy Policy, Electronic Disclosure and Consent and Terms of Service and I consent to the use of electronic records in connection with this application."

2. Validation & Submissions:
   - Perform standard client-side validation on submit:
     - All text fields required (non-empty after trimming).
     - Valid email format (regex check).
     - Password minimum length check (e.g., at least 8 characters).
     - Checkbox must be checked.
   - Display clear inline or summary error messages when validation fails.
   - Submit Action: Save account data using `dispatch({ type: 'UPDATE_ACCOUNT', payload: ... })` and immediately advance to Interstitial A.

3. UI & Footer Details:
   - Display brand header text: "Create your account" and subtitle: "Start building a portfolio tailored to your objectives."
   - Main CTA: Prominent full-width `[ Continue ]` button.
   - Footer link: "Already have an account? Log in" (rendered as a styled non-navigating link or disabled state).
