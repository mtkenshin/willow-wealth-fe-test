# `RegulatoryQuestions.tsx` guide

Source: [`src/screens/RegulatoryQuestions/RegulatoryQuestions.tsx`](../../src/screens/RegulatoryQuestions/RegulatoryQuestions.tsx)

## Purpose

`RegulatoryQuestions` renders citizenship (step `6`), tax residence (step `7`), or employment status (step `8`) questions. It is controlled by the parent through `OnboardingRegulatory` values and change callbacks. Continue is disabled until the current response passes validation.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `step` | `RegulatoryQuestionStep` (`6 \| 7 \| 8`) | Selects the question to render. |
| `regulatory` | `OnboardingRegulatory` | Current citizenship, tax-residence, and employment values. |
| `onCitizenshipChange` | `(citizenship: string[]) => void` | Supplies the updated citizenship list. |
| `onTaxResidenceChange` | `(taxResidence: string) => void` | Supplies the selected tax-residence country. |
| `onEmploymentStatusChange` | `(employmentStatus: string) => void` | Supplies the selected employment status. |
| `onContinue` | `() => void` | Invoked by Continue when the answer is valid. |

## Events and validation

- Citizenship country changes replace the corresponding array entry. Additional entries can be added and removed.
- Citizenship must include at least one non-empty, unique country.
- Tax residence and employment status require a non-empty selection.
- Continue is disabled until the current step's validation passes.

## Usage

```tsx
<RegulatoryQuestions
  step={6}
  regulatory={state.regulatory}
  onCitizenshipChange={(citizenship) =>
    dispatch({ type: 'UPDATE_REGULATORY', payload: { citizenship } })
  }
  onTaxResidenceChange={(taxResidence) =>
    dispatch({ type: 'UPDATE_REGULATORY', payload: { taxResidence } })
  }
  onEmploymentStatusChange={(employmentStatus) =>
    dispatch({ type: 'UPDATE_REGULATORY', payload: { employmentStatus } })
  }
  onContinue={() => dispatch({ type: 'NEXT_STEP' })}
/>
```

## Recommended unit-test scenarios

- For step `6`, verify initial values, country changes, adding/removing entries, and that empty or duplicate countries disable Continue.
- Verify countries already selected in another row are not offered as options.
- For step `7`, verify country selection calls `onTaxResidenceChange` and enables Continue only for a non-empty value.
- For step `8`, verify employment selection calls `onEmploymentStatusChange` and enables Continue only for a non-empty value.
- Verify Continue is disabled for invalid answers and invokes `onContinue` for valid answers.
- Verify labels are associated with their inputs and generated IDs remain unique across instances.

## Room for improvement

- Move country and employment lists to shared domain data if they are needed elsewhere.
- Validate the country list and regulatory rules with the product/compliance source of truth.
- Consider adding user-facing guidance when an answer is invalid, in addition to disabling Continue.
