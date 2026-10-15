# TPLG portal proposal: research and review notes

Prepared October 15, 2026. This is a proposal, not an audit of the current application. No source export, tenant settings, workload, data inventory, or user-count evidence has been inspected. TPLG's public website work is a separate project.

## Scope decisions

- Base $3,500, approximately two weeks. Optional agent pilot $2,500, one additional week. Combined $6,000.
- 75% / 25%: base $2,625 / $875; optional $1,875 / $625; combined $4,500 / $1,500.
- Proposed boundaries for Sean/client review: one tenant, up to three roles and three core workflows, one usable records export, in-app activity plus one email notification, one design refinement round, staff pilot, handoff and 14-day introduced-defect window.
- Agent: one workflow, up to two source integrations plus portal. Proposed Outlook email/calendar sources are recommendations, not confirmed client requirements. Human approval for portal writes. Dropbox and billing are illustrative future alternatives, not all included.
- No production publication or portal build has been performed. New route follows existing proposal gate and noindex conventions. That gate is client-side presentation protection, not server-side confidentiality; do not place sensitive source records or tenant credentials in the proposal. PDF stays outside public assets.

## Recommended architecture and open decisions

React/TypeScript with Next.js on Vercel; GitHub source; Supabase PostgreSQL, Auth and optional private Storage. Reuse depends on actual export. No assurance that the GPT Sites source can be moved without adaptation. IT approves service accounts, locations, plans, data classes, retention, and operating budget. Microsoft-only hosting would require a scope review.

Entra single-tenant app through Supabase's Microsoft provider, tenant URL restriction, exact callbacks, PKCE app flow, explicit approved membership. Configure xms_edov and do not infer access from email suffix. IT-owned registration and consent. Entra handles sign-in policies; Supabase sessions need their own lifetime/revocation plan. No promise of automatic Entra-to-Supabase Continuous Access Evaluation or SCIM provisioning. Membership status must be checked at access boundaries, including RLS/storage, not just hidden navigation. Signed file URLs must be short lived and offboarding exposure considered.

Use separate service environments, server-only privileged credentials, minimal grants, row policies and private storage, with positive and negative tests. Database backups exclude file objects; restore testing must account for both. Paid plans may be needed for backup retention and advanced session controls. No recurring dollar estimate until pilot workload/licensing is known.

Teams link is included direction; actual tab/Teams SSO/bot not included. Teams authentication and Graph resource consent are distinct. Optional agent starts with delegated permissions (for selected user sources), no blanket app-only mailbox access. Exact scopes depend on agreed fields: avoid Mail.ReadWrite or Mail.Send for read-only extraction. Background execution/refresh, token storage, consent revocation and least privilege need implementation design at kickoff. Long-running work needs a persisted job/queue pattern, not an assumed indefinitely running Vercel request.

Agent memory is approved conventions and reference context, not unbounded ingestion or model training. Keep user authorization/record boundaries in tool execution. Untrusted document/email text cannot authorize actions. Require review, source provenance, structured tools, duplicate keys, bounded retries, a failure queue and pause control. Confirm model-provider data terms before sending any real client content.

## Official sources reviewed

- https://supabase.com/docs/guides/auth/social-login/auth-azure : app registration, callbacks, tenant URL, xms_edov guidance.
- https://learn.microsoft.com/en-us/entra/identity-platform/single-and-multi-tenant-apps : single-tenant includes directory guests, so tenant restriction alone is not staff authorization.
- https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal : enterprise app user/group assignment and prerequisites.
- https://supabase.com/docs/guides/auth/sessions : JWT/refresh lifetimes, plan-dependent session limits, revocation caveats.
- https://supabase.com/docs/guides/database/postgres/row-level-security : record authorization, exposed schemas, privileged key caveats.
- https://supabase.com/docs/guides/platform/backups : backup plans and separate Storage file recovery.
- https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview : delegated/application permissions and consent.
- https://learn.microsoft.com/en-us/graph/permissions-reference : scope selection follows chosen workflow.
- https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-overview : Teams SSO configuration and client/browser considerations.
- https://vercel.com/docs/functions : server-side application execution.
- https://nextjs.org/docs : React framework for application and server routes.
- https://developers.openai.com/api/docs/guides/agent-builder-safety : untrusted-input risks, structured boundaries and approvals.
- https://supabase.com/changelog.md : checked; upcoming legacy TLS cipher removal does not change this proposed modern-browser architecture. No Supabase implementation performed.

## Validation

Build and existing 70 tests pass. Browser checks cover proposal gate/noindex, pricing, anchors, 320/390/768/1440 widths, and Cords/Thrive/M. Bouvier regression routes. PDF rendered and visually inspected; verify single-page and link annotations before final handoff. Existing large-bundle build warning remains.
