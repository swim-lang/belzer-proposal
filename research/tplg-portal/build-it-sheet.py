from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from pathlib import Path
out=Path('output/pdf/tplg-portal-it-review.pdf')
c=canvas.Canvas(str(out),pagesize=(612,792));c.setTitle('TPLG | Portal Microsoft Roadmap');c.setAuthor('Anchovies')
ink=HexColor('#202320');muted=HexColor('#565b54');cream=HexColor('#f7f6ef')
c.setFillColor(cream);c.rect(0,0,612,792,fill=1,stroke=0)
styles={
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=9,leading=12,textColor=ink,spaceAfter=5),
 'head':ParagraphStyle('head',fontName='Helvetica-Bold',fontSize=11,leading=14,textColor=ink),
 'tiny':ParagraphStyle('tiny',fontName='Helvetica',fontSize=7.2,leading=9.4,textColor=muted)}
def p(txt,x,y,w,kind='body'):
 a=Paragraph(txt,styles[kind]);_,h=a.wrap(w,900);a.drawOn(c,x,y-h);return y-h-6
c.setFillColor(ink);c.setFont('Helvetica-Bold',9);c.drawString(36,755,'ANCHOVIES  /  TPLG');c.setFont('Helvetica',8);c.drawRightString(576,755,'IT REVIEW  ·  OCTOBER 15, 2026')
c.setFont('Times-Roman',29);c.drawString(36,718,'Portal Microsoft Roadmap')
y=p('For David · Proposed architecture for review, not a completed security assessment. The existing GPT Sites export and tenant configuration have not yet been inspected.',36,700,540)
c.setStrokeColor(HexColor('#b9bcb3'));c.line(36,y,576,y)
y=p('<b>GitHub</b> (owned source) → <b>Vercel</b> (Next.js / React / TypeScript app + server API)<br/><b>Microsoft Entra ID</b> → <b>Supabase Auth</b> → <b>PostgreSQL + private Storage</b>',36,y-12,540)
start=y-8
left=[
('01  Microsoft identity & access', 'Single-tenant Entra app registration, tenant-specific Supabase Azure provider, exact callback allowlist, and PKCE app sign-in. Require assigned staff; exclude unapproved guests and personal accounts. Configure the recommended xms_edov claim and avoid email-domain-only authorization. [1, 2]'),
(None,'David owns consent, MFA and Conditional Access policy (subject to licensing). Use trusted identity IDs and application-controlled roles. Microsoft sign-in does not grant mailbox, calendar, or document access.'),
('02  Data boundaries & offboarding','Enforce active membership and record-level permissions at the API and database using row-level security. Use private file access, server-only privileged secrets, input validation, and redacted logs. Test denied access as well as successful access. [3]'),
(None,'Entra account disablement alone does not immediately invalidate an existing Supabase session. Include a portal-disable/revoke runbook and live membership checks; agree and test session expiry and the offboarding window with IT. [4]'),
('03  Operations & recovery','TPLG owns service accounts and the repository. Separate test/live environments; use non-sensitive pilot data first. Agree regions, retention, service plans, and incident ownership. Keep schema migrations, review deployments, and test restore/rollback. Database backups do not include stored file contents; arrange file recovery separately. [5]')]
right=[
('04  Microsoft Teams & permissions','Base beta: a portal link accessible from Teams. An embedded tab, Teams SSO, bot, or activity feed requires separate Teams app configuration, tenant approval, and desktop/mobile testing. Teams SSO and Graph consent are separate concerns. [6]'),
(None,'Optional agent: start with delegated, read-only access to approved email/calendar sources. Request only the selected workflow’s Graph scopes. Unattended application permissions need separate justification and admin consent; no tenant-wide mailbox access by default. [7]'),
('05  Agent pilot controls','One workflow, up to two approved source integrations, and the portal. Propose tasks first; a person approves writes. Restrict tools and record access, retain source references, prevent duplicates, log actions, bound retries, and provide a pause control. Treat email/document instructions as untrusted content. [8]'),
(None,'IT approves the model provider, data sent to it, retention, and any subprocessors. No email sending, payments, deletions, or autonomous external actions in this pilot.'),
('06  Decisions & acceptance','Confirm export/reuse, pilot users and roles, sensitive data, region/retention, notification sender, service plans, and IT ownership before kickoff. Test sign-in, denied access, offboarding, saves and concurrent edits, notifications, mobile, and recovery. Release to pilot users only after blocking issues are resolved.')]
ys=[]
for x,items in [(36,left),(318,right)]:
 y=start
 for h,b in items:
  if h:y=p(h,x,y,258,'head')
  y=p(b,x,y,258)
 ys.append(y)
y=min(ys)-3
assert y>132, y
c.line(36,y,576,y)
y=p('<b>Next step:</b> Review the proposed architecture with David and confirm tenant requirements, data boundaries, and pilot acceptance checks. Microsoft-only infrastructure or additional controls can be discussed before implementation.',36,y-9,540,'tiny')
sources=[('1 Microsoft auth','https://supabase.com/docs/guides/auth/social-login/auth-azure'),('2 Entra assignment','https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal'),('3 RLS','https://supabase.com/docs/guides/database/postgres/row-level-security'),('4 Sessions','https://supabase.com/docs/guides/auth/sessions'),('5 Backups','https://supabase.com/docs/guides/platform/backups'),('6 Teams SSO','https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-overview'),('7 Graph consent','https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview'),('8 Agent safety','https://developers.openai.com/api/docs/guides/agent-builder-safety')]
y=p('Official references (click to open): '+ ' · '.join(f'<a href="{u}" color="#344e55"><u>{t}</u></a>' for t,u in sources),36,y-3,540,'tiny')
assert y>30,y
c.save()
print(str(out), 'bottom:',round(y))
