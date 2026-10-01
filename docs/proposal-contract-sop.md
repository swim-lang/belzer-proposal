# Proposal agreement operating procedure

## Agency signature and date

Sean authorized these defaults on October 1, 2026:

- Client-ready proposal agreements include Sean Ashlow's existing saved signature (`/signatures/sean-ashlow-signature.png`), name, and title, Founder, Anchovies.
- Set `agencySignedDate` explicitly to the actual date the agreement is prepared for release, using Sean's America/Denver date. Never copy another client's date or use a date that changes whenever someone views the page.
- Leave the client's signature empty until the client signs. Do not sign on their behalf.
- Draft-only agreements stay unsigned. Use `agencySignaturePending` only when Sean explicitly requests an unsigned agency draft.
- Do not change historical agreement dates or overwrite already saved signed copies.

## Client signature and backend copy

- Every client signature submission must save the full signed document HTML snapshot, signature data, consent, signer name/title, client date, and server receipt timestamp in the backend.
- Success requires an API receipt with `ok: true`, `saved: true`, and an event ID. An email, console log, or local browser copy is not sufficient.
- If saving fails, show an error and allow retry. Do not show successful signing or a signed-PDF download while saving or after a failed save.
- Generate downloads from the confirmed snapshot. Preserve same-tab refresh recovery without relying on browser storage as the authoritative copy.
- The backend stores the complete signed HTML plus signature metadata. PDFs are generated from that saved copy, including through the admin contract-events screen; a separate PDF binary is not currently archived.

## Release checks

- Confirm the agency signature image loads and the explicit agency date is correct.
- Test delayed and failed storage responses, successful storage, refresh recovery, and PDF download in a real browser.
- Use clearly marked QA signers and a unique QA slug. Never submit test signatures under a real client's contract slug or send test client emails.
- Read the test record back from the backend and compare the saved document to what was submitted. Delete only the exact QA records created by the test.
- Verify desktop/mobile, route protection, noindex, tests, build, and the final production deployment.
