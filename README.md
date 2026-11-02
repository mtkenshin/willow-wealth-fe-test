# Willow Wealth Onboarding

A React and TypeScript onboarding flow built with Vite. It includes account creation, investor profile and regulatory questions, and a final investment-path selection.

## Tools used

- OpenAI Codex
- Visual Studio Code

## Requirements

- **Node.js:** 20.19 or later, or 22.12 or later (required by Vite 8). Node.js 22.12+ is recommended.
- **npm:** 10 or later is recommended. The repository includes an npm lockfile so dependencies can be installed reproducibly.

Check your installed versions:

```sh
node --version
npm --version
```

## Install and run

From the repository root, install the locked dependencies and start the Vite development server:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite in your browser (normally `http://localhost:5173`).

## Other commands

| Command | Description |
| --- | --- |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally; run `npm run build` first. |
| `npm run lint` | Run ESLint across the project. |

There is currently no test script, test runner, or committed TSX test file. The unit-test scenarios in the component guides are recommendations for future automated tests; they are not tests that can currently be run from this repository.

## Project planning and workflow

- [Project plan](PLAN.md)
- [Task list](TASK.md)
- [AI workflow](AI_WORKFLOW.md)
- [Agent guidance](AGENT.md)

## Component and TSX guides

Each TSX file has a guide describing its purpose, props and events, usage, recommended unit-test scenarios, and room for improvement.

| TSX file | Guide |
| --- | --- |
| `src/App.tsx` | [App guide](docs/guides/App-Guide.md) |
| `src/main.tsx` | [main guide](docs/guides/main-Guide.md) |
| `src/components/LayoutShell/LayoutShell.tsx` | [LayoutShell guide](docs/guides/LayoutShell-Guide.md) |
| `src/components/OptionCardStep/OptionCardStep.tsx` | [OptionCardStep guide](docs/guides/OptionCardStep-Guide.md) |
| `src/screens/AccountStep/AccountStep.tsx` | [AccountStep guide](docs/guides/AccountStep-Guide.md) |
| `src/screens/Interstitial/InterstitialScreen.tsx` | [InterstitialScreen guide](docs/guides/InterstitialScreen-Guide.md) |
| `src/screens/Interstitial/InterstitialIllustration.tsx` | [InterstitialIllustration guide](docs/guides/InterstitialIllustration-Guide.md) |
| `src/screens/InvestorProfileQuestions.tsx` | [InvestorProfileQuestions guide](docs/guides/InvestorProfileQuestions-Guide.md) |
| `src/screens/RegulatoryQuestions/RegulatoryQuestions.tsx` | [RegulatoryQuestions guide](docs/guides/RegulatoryQuestions-Guide.md) |
| `src/screens/ReadyStep/ReadyStep.tsx` | [ReadyStep guide](docs/guides/ReadyStep-Guide.md) |
