Please build the Option-Card Question screens (A1: Household Income, A2: Net Worth, A3: Qualified Purchaser) for the WillowWealth onboarding wizard in React + TypeScript with SCSS Modules.

Requirements & Architectural Guidelines:

1. Reusable Card Selection Component (`src/components/OptionCardStep.tsx`):
   - Accepts title, subtitle/disclaimer body copy, an array of options (value + label + description), and onSelect callback.
   - Option Cards: Large clickable card elements with hover, active, and focus states.
   - Auto-Advance Interaction (Crucial): Picking an option card immediately updates state and advances to the next step WITHOUT requiring a "Continue" button.

2. Screen Specifications:
   - **Screen A1 (Household Income):**
     - Title: "What is your annual household income?"
     - Body: "Please include all sources of income, such as salary, bonuses, rental properties and investments. If you have a spouse or spousal equivalent, please choose your joint income level."
     - Options: "Under $200,000", "$201,000 - $500,000", "$501,000 - $1,000,000", "$1,000,000+"
   - **Screen A2 (Net Worth):**
     - Title: "What is your net worth?"
     - Body: "Please include all your assets, minus your primary residence and liabilities. If you have a spouse or spousal equivalent, please choose your joint net worth."
     - Options: "$0 - $500,000", "$500,001 - $1,000,000", "$1,000,001 - $5,000,000", "$5,000,001+"
   - **Screen A3 (Qualified Purchaser):**
     - Title: "Are you a qualified purchaser?"
     - Body: "Individual qualified purchasers own $5,000,000 in investments, but you are not required to be one to invest on Willow Wealth."
     - Options:
       - "Yes" (Subtitle: "I meet the qualified purchaser requirements")
       - "No" (Subtitle: "I do not meet the qualified purchaser requirements")
     - **SEC Info Hint (`(?) What is a qualified purchaser?`):** Surface as an accessible, clean inline collapsible drawer/accordion that expands to explain the SEC definition ($5M+ in portfolio investments) without opening a blocking modal.
