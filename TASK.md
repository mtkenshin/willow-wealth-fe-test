

Build the WillowWealth investor onboarding flow: a new user creates an account, answers a short series of investor-profile and regulatory questions, and lands on a final screen ready to invest.

# Flow

[0] Create your account
     |
     v
(A) Interstitial: "Welcome to Willow Wealth, <FirstName>"
     |
     v
[A1] Household income --> [A2] Net worth --> [A3] Qualified purchaser
     |
     v
(B) Interstitial: "A few more questions to complete your account set-up"
     |
     v
[B1] Citizenship --> [B2] Tax residence --> [B3] Employment
     |
     v
[✓] "You're ready to invest" ----> POST /api/onboarding

One question per screen, grouped into two sections, each opened by an interstitial. Question screens share a common layout shell: a top nav with the brand wordmark, a back arrow, and a step progress indicator.



# Screen 0 - CREATE YOUR ACCOUNT 

+--------------------------------------------------------+
|                      WillowWealth                       |
|                                                         |
|                  Create your account                    |
|        Start building a portfolio tailored to           |
|                   your objectives.                      |
|                                                         |
|   [ First name                                      ]   |
|   [ Last name                                       ]   |
|   [ Email address                                   ]   |
|   [ Password                                   (o)  ]   |
|                                                         |
|   [ ] I have read and accepted the Privacy Policy,      |
|       Electronic Disclosure and Consent and Terms of    |
|       Service and I consent to the use of electronic    |
|       records in connection with this application.      |
|                                                         |
|   [==================  Continue  ===================]   |
|                                                         |
|           Already have an account?  Log in              |
+--------------------------------------------------------+

## Screen Requirements
- All fields required; 
- Password field has a show/hide toggle (o). 
- "Log in" is a dead link.


# Interstitial A — Welcome

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|                                                         |
|  +--------------+                                       |
|  |              |    Welcome to Willow Wealth,          |
|  | illustration |    <FirstName>                        |
|  |              |                                       |
|  |              |    Let's begin setting up your        |
|  |              |    individual account. Next, we'll    |
|  |              |    ask a few quick questions to       |
|  |              |    better understand your investor    |
|  |              |    profile.                           |
|  |              |                                       |
|  |              |    [ Continue ]                       |
|  +--------------+                                       |
+--------------------------------------------------------+

## Screen Requirements
<FirstName> is the first name entered on Screen 0. The illustration can be any placeholder.

## Screen A1 — Household income

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|   <                                              x / x  |
|                                                         |
|         What is your annual household income?           |
|     Please include all sources of income, such as       |
|     salary, bonuses, rental properties and              |
|     investments. If you have a spouse or spousal        |
|     equivalent, please choose your joint income level.  |
|                                                         |
|        +----------------------------------------+       |
|        |  Under $200,000                        |       |
|        +----------------------------------------+       |
|        |  $201,000 - $500,000                   |       |
|        +----------------------------------------+       |
|        |  $501,000 - $1,000,000                 |       |
|        +----------------------------------------+       |
|        |  $1,000,000+                           |       |
|        +----------------------------------------+       |
+--------------------------------------------------------+


## Screen A2 — Net worth

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|   <                                              x / x  |
|                                                         |
|                 What is your net worth?                  |
|     Please include all your assets, minus your          |
|     primary residence and liabilities. If you have      |
|     a spouse or spousal equivalent, please choose       |
|     your joint net worth.                               |
|                                                         |
|        +----------------------------------------+       |
|        |  $0 - $500,000                         |       |
|        +----------------------------------------+       |
|        |  $500,001 - $1,000,000                 |       |
|        +----------------------------------------+       |
|        |  $1,000,001 - $5,000,000               |       |
|        +----------------------------------------+       |
|        |  $5,000,001+                           |       |
|        +----------------------------------------+       |
+--------------------------------------------------------+
## Screen A3 — Qualified purchaser

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|   <                                              x / x  |
|                                                         |
|            Are you a qualified purchaser?               |
|     Individual qualified purchasers own $5,000,000      |
|     in investments, but you are not required to be      |
|     one to invest on Willow Wealth.                     |
|                                                         |
|        +----------------------------------------+       |
|        |  Yes                                   |       |
|        |  I meet the qualified purchaser        |       |
|        |  requirements                          |       |
|        +----------------------------------------+       |
|        |  No                                    |       |
|        |  I do not meet the qualified purchaser |       |
|        |  requirements                          |       |
|        +----------------------------------------+       |
|                                                         |
|        (?) What is a qualified purchaser?               |
+--------------------------------------------------------+

### Screen Requirements A1-A3
- Option-card screens (A1–A3) have no Continue button — picking a card advances to the next screen. < is back, x / x is the step progress indicator.
- (?) hints at the SEC definition — how (or whether) you surface it is up to you.



# Interstitial B — A few more questions

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|                                                         |
|  +--------------+                                       |
|  |              |    A few more questions to            |
|  | illustration |    complete your account set-up       |
|  |              |                                       |
|  |              |    As the last step in identity       |
|  |              |    verification, FINRA, our           |
|  |              |    regulator, requires us to ask      |
|  |              |    about citizenship, employment      |
|  |              |    and potential conflicts of         |
|  |              |    interest.                          |
|  |              |                                       |
|  |              |    [ Continue ]                       |
|  +--------------+                                       |
+--------------------------------------------------------+

## Screen B1 — Citizenship

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|   <                                              x / x  |
|                                                         |
|          What countries are you a citizen of?           |
|     We are required to collect this information for     |
|     regulatory purposes and determine your account      |
|     eligibility.                                        |
|                                                         |
|        [ Country of citizenship             v ]         |
|                                                         |
|                  Add another country                    |
|                                                         |
|        [_______________ Continue ______________]        |
+--------------------------------------------------------+

## Screen B2 — Tax residence

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|   <                                              x / x  |
|                                                         |
|               What is your tax residence?               |
|     Willow Wealth's investments are currently only      |
|     available for U.S. taxpayers. Please confirm        |
|     your tax residence is correct.                      |
|                                                         |
|        [ Country of tax residence           v ]         |
|                                                         |
|        [_______________ Continue ______________]        |
+--------------------------------------------------------+

## Screen B3 — Employment

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|   <                                              x / x  |
|                                                         |
|             What's your employment status?              |
|     We're required to ask for this information for      |
|     regulatory purposes.                                |
|                                                         |
|        [ Employment status                  v ]         |
|                                                         |
|        [_______________ Continue ______________]        |
+--------------------------------------------------------+

## Screen Requirements B1-B3 

- Pick sensible status options (e.g. Employed / Self-employed / Retired / Student / Not employed).
- Any static country list is fine. Dropdown screens (B1–B3) advance via the Continue button.

# Final screen — You're ready to invest

+--------------------------------------------------------+
| WillowWealth                                            |
+--------------------------------------------------------+
|                                                         |
|  +--------------+   (v)  You're ready to invest         |
|  |              |        on Willow Wealth               |
|  | illustration |                                       |
|  |              |   Choose the path that's best for     |
|  |              |   you below, whether you prefer to    |
|  |              |   hand-pick your investment           |
|  |              |   portfolio or let Willow Wealth      |
|  |              |   do the work for you.                |
|  |              |                                       |
|  |              |   +-----------------------------+     |
|  |              |   | Select your own investments |     |
|  |              |   | Explore a wide range of     |     |
|  |              |   | curated private markets     |     |
|  |              |   | investments spanning real   |     |
|  |              |   | estate, private credit,     |     |
|  |              |   | private equity, and more.   |     |
|  |              |   +-----------------------------+     |
|  |              |   | Set up a Managed Portfolio  |     |
|  |              |   | Select a strategy, and      |     |
|  |              |   | we'll assemble a portfolio  |     |
|  |              |   | of diversified funds from   |     |
|  |              |   | prominent asset managers.   |     |
|  |              |   +-----------------------------+     |
|  +--------------+                                       |
+--------------------------------------------------------+

Clicking either path card submits the full onboarding payload as JSON to a fake endpoint (POST /api/onboarding — mock it however you like: MSW, a stub handler, a promise with a delay). Handle both success and failure visibly.