Please build the Dropdown Question screens (B1: Citizenship, B2: Tax Residence, B3: Employment Status) for the WillowWealth onboarding wizard in React + TypeScript with SCSS Modules.

Requirements & Architectural Guidelines:

1. Form & Advancement Rule:
   - Unlike A1–A3, these screens DO NOT auto-advance on selection. They render a primary `[ Continue ]` button that remains disabled until a valid selection is made.

2. Screen Specifications:
   - **Screen B1 (Citizenship - Dynamic Multi-Select):**
     - Title: "What countries are you a citizen of?"
     - Body: "We are required to collect this information for regulatory purposes and determine your account eligibility."
     - Component: Primary country select dropdown defaulting to "United States".
     - Action: "Add another country" button that dynamically appends an additional select field (with an option to remove added fields).
   - **Screen B2 (Tax Residence):**
     - Title: "What is your tax residence?"
     - Body: "Willow Wealth's investments are currently only available for U.S. taxpayers. Please confirm your tax residence is correct."
     - Dropdown options: Select input defaulting or allowing "United States" and other country choices.
   - **Screen B3 (Employment Status):**
     - Title: "What's your employment status?"
     - Body: "We're required to ask for this information for regulatory purposes."
     - Dropdown options: Employed, Self-employed, Retired, Student, Not employed.
