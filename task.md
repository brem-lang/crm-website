# Task: Send demo credentials via Telegram instead of email/SMTP — DONE

Implemented as described below. Summary of what shipped:
- `demo_requests.email` dropped, replaced with required `telegram_username` (migration
  `2026_09_01_000001_...`).
- Public form (`final-cta.tsx`) now collects Telegram username instead of email.
- `demo_request_sent_emails` table renamed to `demo_request_sent_credentials`
  (migration `2026_09_01_000002_...`); model renamed `DemoRequestSentEmail` →
  `DemoRequestSentCredential` (`login_email` column kept as-is — it's the CRM login
  username, unrelated to contact channel).
- `DemoRequestCredentialsMail` mailable + its Blade view deleted; admin's
  `sendEmail()` action renamed `sendCredentials()` — no longer sends mail, just logs
  the send. Route renamed `admin.demo-requests.send-credentials`.
- Admin UI shows the Telegram handle with a "Message on Telegram" (`t.me/<handle>`)
  link on the index table, view dialog, and show page; the "send credentials" dialog
  now says to message the lead directly and just records the send.
- CSV export and search updated to use `telegram_username`.
- Tests updated/renamed accordingly; full suite passes (2 unrelated pre-existing
  failures in `SecurityTest` re: passkeys, untouched by this change).

---


## Corrected understanding
After a lead books a demo, an **admin manually messages them their login credentials on
Telegram** — replacing today's automated SMTP email (`DemoRequestCredentialsMail`), not a
bot alert to the team. This is a person-to-person send, so no Telegram Bot API / webhook is
needed — just capture how to reach the lead on Telegram and give the admin a fast way to open
that chat.

## Current flow (being replaced)
- `app/Http/Controllers/Admin/DemoRequestController.php::sendEmail()` — admin fills in a form
  (URL, login email, password) and it calls
  `Mail::to($demoRequest->email)->send(new DemoRequestCredentialsMail(...))` via SMTP.
- Each send is logged via `DemoRequestSentEmail` (`app/Models/DemoRequestSentEmail.php`) —
  `url`, `login_email` per send.
- UI: `resources/js/pages/admin/demo-requests/show.tsx` has the "send credentials" form/dialog.

## Plan

### 1. Replace `email` with `telegram_username` as the booking contact method
- Migration: add `telegram_username` (string, required) to `demo_requests`; drop the `email`
  column (or make it nullable first, backfill/decide on historical rows, then drop — see
  Open items).
- `app/Models/DemoRequest.php`: swap `email` for `telegram_username` in `$fillable`.
- `app/Http/Requests/StoreDemoRequestRequest.php`: remove the `email` rule, add
  `telegram_username` as `required|string|max:255` (plus a regex to validate the `@handle`
  format — Telegram usernames are 5-32 chars, letters/digits/underscores, may be entered with
  or without a leading `@`).
- Public form `resources/js/components/sections/final-cta.tsx`: **remove the Email input**,
  add a **required** "Telegram Username" input in its place (alongside name/company/phone),
  with client-side validation matching the backend rule.
- Also update: CSV export (`Admin\DemoRequestController::export`) and the admin
  index/show pages — replace the `email` column with `telegram_username` wherever it's
  currently listed.

### 2. Surface it to the admin
- `resources/js/pages/admin/demo-requests/index.tsx` and `show.tsx`: display the
  `telegram_username` value on the lead's row/detail page.
- Add a **"Message on Telegram"** button/link next to it → `https://t.me/<handle>` (strip any
  leading `@` before building the link). Opens Telegram (app or web) with that person's chat
  ready — admin types and sends the credentials themselves, same as they would compose an
  email today.

### 3. Replace the "send credentials" action
- Update the admin UI flow/dialog: drop the "login email" field (there's no lead email to send
  to anymore), keep URL + password (or whatever credential fields still apply). On submit:
  - Remove the call to `Mail::to(...)->send(new DemoRequestCredentialsMail(...))` entirely.
  - Instead, just record the send (repurpose `DemoRequestSentEmail` → rename to
    `DemoRequestSentCredential`, drop the `login_email` column) and show the admin a copy-ready
    message plus a pre-filled `https://t.me/<handle>?text=...` link so they can send it
    straight in the Telegram chat.
  - Delete `DemoRequestCredentialsMail` (`app/Mail/DemoRequestCredentialsMail.php`) and its
    Blade view (`resources/views/emails/demo-request-credentials.blade.php`) — no longer used.
  - `MAIL_*`/SMTP config in `config/mail.php`/`.env.example` can stay for any *other* app email
    (e.g. password resets, if any) — only remove it if this was its sole use.

### 4. Data migration / naming cleanup (do alongside #3)
- Rename `demo_request_sent_emails` table/model → `demo_request_sent_credentials` (drop the
  `login_email` column's email-specific framing since credentials are always sent via
  Telegram now) so the history/audit trail keeps working.

### 5. Testing
- Feature test: submitting the public form now requires `telegram_username` and rejects a
  missing/invalid one; no `email` field accepted/expected anymore.
- Feature test: admin "send credentials" action no longer triggers `Mail::fake()` assertions
  for an email send; instead asserts the new send-record is created.
- Manual check: book a demo with a Telegram handle, confirm the admin panel shows the contact
  and the "Message on Telegram" link opens the right chat.

## Open items
- **Historical data**: existing `demo_requests` rows only have `email`, no
  `telegram_username`. Decide: backfill with a placeholder, leave the column nullable for old
  rows only (enforce "required" at the app/validation layer for new submissions, not a DB
  constraint), or just accept old rows show blank/"—" for Telegram contact. Recommend: make the
  DB column nullable, enforce "required" via form validation only — avoids a painful backfill.
