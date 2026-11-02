# `OptionCardStep.tsx` guide

Source: [`src/components/OptionCardStep/OptionCardStep.tsx`](../../src/components/OptionCardStep/OptionCardStep.tsx)

## Purpose

`OptionCardStep` is a reusable choice-question component. It renders a title, subtitle, a group of selectable buttons, optional descriptions, and optional supplemental content.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `string` | Question heading and accessible group label. |
| `subtitle` | `string` | Supporting text shown below the heading. |
| `options` | `readonly OptionCard<Value>[]` | Choice values and labels; each option may also have a description. |
| `onSelect` | `(value: Value) => void` | Callback invoked with the selected option's value. |
| `selectedValue` | `Value \| undefined` | Current selection; controls each button's `aria-pressed` state. |
| `children` | `ReactNode \| undefined` | Optional supplemental content below the choices. |

`OptionCard<Value>` has a required `value: Value`, required `label: string`, and optional `description: string`. `Value` is a string type and can be narrowed by the caller.

## Events

Each choice is a button. Clicking it invokes `onSelect(option.value)`; selection state is controlled by the parent through `selectedValue`.

## Usage

```tsx
<OptionCardStep
  title="Choose an investment path"
  subtitle="Select one option."
  options={[
    { value: 'managed', label: 'Managed portfolio', description: 'A portfolio selected for you.' },
    { value: 'self_directed', label: 'Self-directed' },
  ]}
  selectedValue={selectedPath}
  onSelect={setSelectedPath}
>
  <p>Additional information can go here.</p>
</OptionCardStep>
```

## Recommended unit-test scenarios

- Render title, subtitle, labels, and only the descriptions that are supplied.
- Verify the selected value has `aria-pressed="true"` and other choices have `false`.
- Click each choice and verify `onSelect` receives its corresponding value.
- Verify supplemental children render when supplied and are omitted otherwise.
- Verify the choice buttons are keyboard-operable native buttons.

## Room for improvement

- Add a disabled or busy state if a future question needs to prevent changes during asynchronous work.
- If mutually exclusive choice semantics require stronger assistive-technology signaling, evaluate a native radio group while preserving the card presentation.
