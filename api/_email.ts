// HTML + plain-text email generator for the intake report.
// Kept self-contained so the edge function stays dependency-free.

type Answer =
  | { type: 'multi'; selected: string[]; other?: string }
  | { type: 'single'; selected: string | null; other?: string; followUp?: string }
  | { type: 'rating'; value: number | null }
  | { type: 'text'; value: string }

type QuestionMeta = {
  id: string
  section: { num: number; title: string }
  title: string
  type: 'multi' | 'single' | 'rating' | 'text'
}

// Printable subset of the question schema — kept in sync with src/intake/questions.ts.
// We only need id, section, title, and type for formatting the email.
export const QUESTION_META: QuestionMeta[] = [
  { id: 'q1', type: 'multi', section: { num: 1, title: 'Who should this be built around?' }, title: 'Who will be the primary people using this tool?' },
  { id: 'q2', type: 'multi', section: { num: 1, title: 'Who should this be built around?' }, title: 'Who should be involved in the first product strategy session?' },
  { id: 'q3', type: 'single', section: { num: 1, title: 'Who should this be built around?' }, title: 'Who feels the pain of the current workflow most often?' },
  { id: 'q4', type: 'multi', section: { num: 2, title: 'What should we solve first?' }, title: 'Which areas feel most worth exploring first?' },
  { id: 'q6', type: 'single', section: { num: 2, title: 'What should we solve first?' }, title: 'What kind of first sprint would feel most useful?' },
  { id: 'q7', type: 'single', section: { num: 2, title: 'What should we solve first?' }, title: 'Do you have a recent case or workflow that would make a good example for the first sprint?' },
  { id: 'q8', type: 'multi', section: { num: 3, title: 'Document review + case intelligence' }, title: 'What types of documents would this tool most likely need to help with?' },
  { id: 'q9', type: 'multi', section: { num: 3, title: 'Document review + case intelligence' }, title: 'What should the tool ideally help you do with documents?' },
  { id: 'q10', type: 'single', section: { num: 3, title: 'Document review + case intelligence' }, title: 'How large are the document sets you would want help with?' },
  { id: 'q11', type: 'single', section: { num: 3, title: 'Document review + case intelligence' }, title: 'How important is source visibility?' },
  { id: 'q12', type: 'multi', section: { num: 3, title: 'Document review + case intelligence' }, title: 'What should the tool never do without human review?' },
  { id: 'q13', type: 'rating', section: { num: 4, title: 'Motions bank + internal knowledge' }, title: 'How valuable would a motions bank be to the firm?' },
  { id: 'q14', type: 'multi', section: { num: 4, title: 'Motions bank + internal knowledge' }, title: 'What would make a motions bank most useful?' },
  { id: 'q15', type: 'multi', section: { num: 4, title: 'Motions bank + internal knowledge' }, title: 'Where does this prior work currently live?' },
  { id: 'q16', type: 'single', section: { num: 5, title: 'Internal wiki + project management' }, title: 'Would an internal wiki be useful for the firm?' },
  { id: 'q17', type: 'single', section: { num: 5, title: 'Internal wiki + project management' }, title: 'Would you want this tool to include task or project management features?' },
  { id: 'q18', type: 'multi', section: { num: 5, title: 'Internal wiki + project management' }, title: 'If task management is useful, what should it help with?' },
  { id: 'q19', type: 'multi', section: { num: 5, title: 'Internal wiki + project management' }, title: 'How does the team currently track internal work?' },
  { id: 'q20', type: 'single', section: { num: 6, title: 'Client experience' }, title: 'Should the first version focus only on internal use, or should we consider client-facing pieces too?' },
  { id: 'q21', type: 'multi', section: { num: 6, title: 'Client experience' }, title: 'Which client experience improvements would be most valuable?' },
  { id: 'q22', type: 'multi', section: { num: 6, title: 'Client experience' }, title: 'What kinds of client updates happen often enough that they might be worth streamlining?' },
  { id: 'q23', type: 'multi', section: { num: 7, title: 'Systems + integrations' }, title: 'Which systems would this tool potentially need to work with now or later?' },
  { id: 'q25', type: 'single', section: { num: 7, title: 'Systems + integrations' }, title: 'Where would you prefer the first version to live?' },
  { id: 'q27', type: 'single', section: { num: 8, title: 'Security + permissions' }, title: 'Who should be able to access the first version?' },
  { id: 'q29', type: 'multi', section: { num: 9, title: 'Success + next step' }, title: 'What would make the first sprint feel successful?' },
  { id: 'q30', type: 'single', section: { num: 9, title: 'Success + next step' }, title: 'How quickly would you want to move after the design sprint?' },
  { id: 'q31', type: 'text', section: { num: 9, title: 'Success + next step' }, title: 'Anything else we should know before the strategy session?' },
]

function escape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderAnswer(a: Answer | undefined): string {
  if (!a) return '—'
  switch (a.type) {
    case 'multi': {
      const items = [...a.selected]
      if (a.other?.trim()) items.push(`Other: ${a.other.trim()}`)
      if (!items.length) return '—'
      return items.map((v) => escape(v)).join(' · ')
    }
    case 'single': {
      const v = a.selected ?? (a.other?.trim() ? `Other: ${a.other.trim()}` : null)
      const fu = a.followUp?.trim() ? ` — ${a.followUp.trim()}` : ''
      return escape((v ?? '—') + fu)
    }
    case 'rating':
      return a.value != null ? `${a.value} of 5` : '—'
    case 'text':
      return escape(a.value.trim() || '—')
  }
}

function renderAnswerText(a: Answer | undefined): string {
  if (!a) return '—'
  switch (a.type) {
    case 'multi': {
      const items = [...a.selected]
      if (a.other?.trim()) items.push(`Other: ${a.other.trim()}`)
      return items.length ? items.map((v) => `  • ${v}`).join('\n') : '—'
    }
    case 'single': {
      const v = a.selected ?? (a.other?.trim() ? `Other: ${a.other.trim()}` : null)
      const fu = a.followUp?.trim() ? ` — ${a.followUp.trim()}` : ''
      return (v ?? '—') + fu
    }
    case 'rating':
      return a.value != null ? `${a.value} of 5` : '—'
    case 'text':
      return a.value.trim() || '—'
  }
}

type ReportInput = {
  id: string
  client: string
  agencyName?: string
  contactName?: string
  contactEmail?: string
  startedAt: string
  submittedAt: string
  durationSeconds: number
  answers: Record<string, Answer>
  recipient: 'client' | 'agency'
}

export function renderEmail(input: ReportInput): { subject: string; html: string; text: string } {
  const forAgency = input.recipient === 'agency'
  const agencyName = input.agencyName ?? 'Anchovies'

  const subject = forAgency
    ? `${input.client} — Intake submitted${input.contactName ? ` by ${input.contactName}` : ''}`
    : `Your ${agencyName} intake — a copy for your records`

  const duration =
    `${Math.floor(input.durationSeconds / 60)} min ${String(input.durationSeconds % 60).padStart(2, '0')} s`

  // Group questions by section
  const sections = new Map<number, { title: string; items: { q: QuestionMeta; a: Answer | undefined }[] }>()
  for (const q of QUESTION_META) {
    if (!sections.has(q.section.num)) sections.set(q.section.num, { title: q.section.title, items: [] })
    sections.get(q.section.num)!.items.push({ q, a: input.answers[q.id] })
  }

  // ——— HTML ———
  const INK = '#0A0A0A'
  const INK2 = '#4A4A4A'
  const PAPER = '#F6F5F1'
  const RULE = '#1F1912'
  const MAC = '#1E3FE5'
  const SERIF = '"Newsreader", "Source Serif Pro", Georgia, serif'
  const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif'

  const headerLeft = forAgency
    ? `Intake report · ${escape(input.client)}`
    : `${escape(agencyName)} · ${escape(input.client)}`

  const heroLine = forAgency
    ? `${input.contactName ? escape(input.contactName) : 'The team'} just submitted the intake.`
    : `Here is your copy of the ${escape(input.client)} intake.`

  const heroSub = forAgency
    ? 'Full answers below, grouped by section.'
    : 'A full copy of everything you shared, for your records. Reply here and it reaches us directly.'

  const sectionHTML = [...sections.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([num, sec]) => {
      const body = sec.items
        .map(
          ({ q, a }) => `
          <tr>
            <td style="padding:18px 0;border-top:1px solid ${RULE}20;">
              <div style="font-family:${SANS};font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};padding-bottom:6px;">
                ${q.id.toUpperCase()}
              </div>
              <div style="font-family:${SERIF};font-size:17px;line-height:22px;color:${INK};padding-bottom:8px;">
                ${escape(q.title)}
              </div>
              <div style="font-family:${SANS};font-size:13px;line-height:20px;color:${INK};white-space:pre-wrap;">
                ${renderAnswer(a)}
              </div>
            </td>
          </tr>`
        )
        .join('\n')
      return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
          <tr>
            <td style="padding-bottom:8px;">
              <div style="font-family:${SANS};font-size:10px;letter-spacing:1.4px;text-transform:uppercase;color:${MAC};">
                Section ${num}
              </div>
              <div style="font-family:${SERIF};font-size:26px;line-height:32px;color:${INK};letter-spacing:-0.015em;padding-top:4px;">
                ${escape(sec.title)}
              </div>
            </td>
          </tr>
          ${body}
        </table>`
    })
    .join('')

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PAPER};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background-color:${PAPER};">
          <!-- Header bar -->
          <tr>
            <td style="padding:0 0 20px 0;border-bottom:1px solid ${RULE};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-family:${SANS};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};">
                    ${headerLeft}
                  </td>
                  <td align="right" style="font-family:${SANS};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};">
                    ${new Date(input.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:48px 0 32px 0;">
              <div style="font-family:${SANS};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${MAC};padding-bottom:12px;">
                ${forAgency ? 'Submission' : 'Intake — your copy'}
              </div>
              <div style="font-family:${SERIF};font-size:40px;line-height:44px;letter-spacing:-0.02em;color:${INK};padding-bottom:18px;">
                ${heroLine}
              </div>
              <div style="font-family:${SANS};font-size:15px;line-height:24px;color:${INK2};max-width:520px;">
                ${heroSub}
              </div>
            </td>
          </tr>

          <!-- Meta grid -->
          <tr>
            <td style="padding:0 0 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${RULE};border-bottom:1px solid ${RULE};">
                <tr>
                  <td style="padding:18px 0;width:50%;vertical-align:top;">
                    <div style="font-family:${SANS};font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};padding-bottom:4px;">Client</div>
                    <div style="font-family:${SERIF};font-size:20px;color:${INK};letter-spacing:-0.01em;">${escape(input.client)}</div>
                  </td>
                  <td style="padding:18px 0;width:50%;vertical-align:top;">
                    <div style="font-family:${SANS};font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};padding-bottom:4px;">Submitted by</div>
                    <div style="font-family:${SERIF};font-size:20px;color:${INK};letter-spacing:-0.01em;">${escape(input.contactName || 'Not provided')}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:1px solid ${RULE}20;"></td>
                </tr>
                <tr>
                  <td style="padding:18px 0;vertical-align:top;">
                    <div style="font-family:${SANS};font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};padding-bottom:4px;">Submitted</div>
                    <div style="font-family:${SANS};font-size:14px;color:${INK};">
                      ${new Date(input.submittedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </td>
                  <td style="padding:18px 0;vertical-align:top;">
                    <div style="font-family:${SANS};font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};padding-bottom:4px;">Took</div>
                    <div style="font-family:${SANS};font-size:14px;color:${INK};">${escape(duration)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sections -->
          <tr>
            <td>${sectionHTML}</td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;border-top:1px solid ${RULE};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-family:${SANS};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${INK2};">
                    ${escape(agencyName)} × ${escape(input.client)}
                  </td>
                  <td align="right" style="font-family:${SANS};font-size:10px;color:${INK2};">
                    id ${escape(input.id)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  // ——— Plain text ———
  const txtSections = [...sections.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([num, sec]) => {
      const body = sec.items
        .map(({ q, a }) => `${q.id.toUpperCase()} — ${q.title}\n${renderAnswerText(a)}`)
        .join('\n\n')
      return `\n\n[Section ${num}] ${sec.title}\n${'-'.repeat(48)}\n\n${body}`
    })
    .join('')

  const text = [
    forAgency ? `${input.client} — Intake submitted` : `Your ${agencyName} intake — a copy for your records`,
    ''.padEnd(48, '='),
    '',
    `Client:        ${input.client}`,
    `Submitted by:  ${input.contactName || 'Not provided'}${input.contactEmail ? ` <${input.contactEmail}>` : ''}`,
    `Submitted:     ${new Date(input.submittedAt).toLocaleString()}`,
    `Took:          ${duration}`,
    `Submission id: ${input.id}`,
    txtSections,
    '',
    ''.padEnd(48, '='),
    `${agencyName} × ${input.client}`,
  ].join('\n')

  return { subject, html, text }
}
