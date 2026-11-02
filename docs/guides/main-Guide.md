# `main.tsx` guide

Source: [`src/main.tsx`](../../src/main.tsx)

## Purpose

The application entry point imports global styles, finds the HTML root element, and mounts `App` using React `createRoot` inside `StrictMode`.

## Props

There is no component API or props. This is a bootstrap module, not a rendered component.

## Events

There are no user-facing events handled here. React owns rendering after the root is mounted.

## Usage

Vite loads this module through `index.html`. The core mount operation is:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Render onboarding screens through `App` rather than mounting a second application root.

## Recommended unit-test scenarios

- With a DOM root present, verify the initial app content mounts.
- Verify the entry point mounts `App` in `StrictMode`.
- If missing-root handling is made explicit, verify it produces the intended actionable error.

## Room for improvement

- Replace the non-null assertion on `getElementById('root')` with a clear runtime guard so an invalid HTML shell fails with a useful message.
- Keep bootstrap-specific tests minimal; most behavior belongs in `App` and screen tests.
