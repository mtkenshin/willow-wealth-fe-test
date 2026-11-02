Update the existing `ReadyStep` component to handle path selection submissions, mock API calls, and temporary toast notifications.

### Requirements:

1. **Submission Logic on Card Click:**

- Attach click handlers to both path selection cards inside `ReadyStep`.
- On selection, construct the full onboarding JSON payload (e.g., including `userId`, `selectedPath`, `stepData`, `timestamp`).
- Mock a `POST /api/onboarding` network request with a brief delay (500–1000ms) to simulate loading state.
2. **Success vs. Failure Simulation:**

- **First Card (Success):** Mock a successful response (`HTTP 200 OK`).
- **Second Card (Failure):** Mock a failed response (`HTTP 400` / `500` Error).
3. **Top-Right Notification (Toast):**

- Display a notification fixed in the **top-right corner** of the viewport based on the request result:

- **Success:** Green toast indicating onboarding completed successfully.
- **Failure:** Red toast indicating the submission failed.
- **Auto-Dismiss:** Notification automatically dismisses after **5 seconds**.
- Include a manual dismiss button ("X") on the toast.
4. **UI/UX Details:**

- Disable card interactions or show a loading state while the request is in flight to prevent duplicate submissions.
