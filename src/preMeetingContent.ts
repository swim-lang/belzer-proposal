import { defaultContent, type Content } from './content'

export const scheduleConversationHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

export const preMeetingComparison = {
  eyebrow: 'A different starting point',
  headline: 'This is not off-the-shelf software.',
  bodyParagraphs: [
    'Most software asks your team to adapt to the product.',
    'Our approach starts with the opposite question: how does your firm already think, work, review, organize, communicate, and make decisions?',
    'From there, we can design a focused tool around the workflows that matter most.',
  ],
  leftTitle: 'Standard software',
  leftItems: [
    'Built for broad use',
    'Comes with features you may not need',
    'Moves on someone else’s roadmap',
    'Often requires your team to adapt',
  ],
  rightTitle: 'Custom internal tool',
  rightItems: [
    'Built around your workflow',
    'Starts with the highest-value need',
    'Can connect to the tools you already use',
    'Can evolve as your firm learns',
  ],
  pullQuote: '“The tool should adapt to the firm, not the other way around.”',
}

export const preMeetingFitPrompt = {
  eyebrow: 'A good first question',
  headline: 'Where does your firm lose time, clarity, or leverage?',
  body:
    'That is usually where the right first tool is hiding. It may be document review. It may be a motions bank. It may be client communication. It may be internal project management. It may be something specific to how your team works that no generic platform would ever prioritize.',
  questions: [
    'What work feels repetitive but still requires judgment?',
    'What information is hard to find when you need it?',
    'What does your team do manually that should probably have a system?',
    'What client communication could be clearer or more consistent?',
    'What prior work could be easier to reuse?',
  ],
}

function cleanFirmName(firmName: string | null | undefined) {
  const cleaned = firmName?.trim()
  return cleaned || 'Your Firm'
}

function firmSlug(firmName: string) {
  if (firmName === 'Your Firm') return 'your-firm'
  return firmName
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function createPreMeetingContent(firmName?: string | null): Content {
  const firm = cleanFirmName(firmName)
  const firmForHeading = firm === 'Your Firm' ? 'your firm' : firm

  return {
    ...defaultContent,
    client: {
      ...defaultContent.client,
      name: firm,
      shortName: firm,
      possessive: firm === 'Your Firm' ? 'your firm’s' : `${firm}’s`,
      location: '',
      leadName: '',
      primary: '',
      secondary: '',
      teamPhrase: 'your team',
      teamPhraseWithKey: 'your team and key stakeholders',
    },
    proposal: {
      ...defaultContent.proposal,
      id: 'pre-meeting-general-ai-legal-page',
      kind: 'Pre-meeting overview',
    },
    pricing: {
      ...defaultContent.pricing,
      sprintShort: 'Starting at $4.9K',
      sprintFull: 'Starting at $4.9K',
      sprintTimeline: '2 weeks',
      sprintTimelineLong: '2 weeks, depending on feedback and meeting availability.',
      buildRange: 'Quoted after scope is defined',
    },
    navSections: [
      { id: 'overview', label: 'Overview' },
      { id: 'features', label: 'Opportunities' },
      { id: 'systems', label: 'Systems' },
      { id: 'ownership', label: 'Ownership' },
      { id: 'next', label: 'Pricing' },
    ],
    nav: {
      ...defaultContent.nav,
      topMetaLeft: 'Custom AI tools for law firms',
      topMetaRight: ['Pre-meeting overview', defaultContent.proposal.prepared],
      brandPair: `${defaultContent.agency.name} × ${firm}`,
      ctaApprove: 'Schedule a Conversation',
      ctaHref: scheduleConversationHref,
    },
    hero: {
      ...defaultContent.hero,
      eyebrowSection: '§ 01 — Hero',
      eyebrowEmphasis: 'Custom AI tools for law firms',
      eyebrowMetaLines: ['Pre-meeting overview', defaultContent.proposal.prepared],
      headlineLines: ['A custom-built', 'legal intelligence', `tool for ${firmForHeading}.`],
      subheadline:
        'We help law firms explore, design, and build custom AI-powered tools for documents, workflows, internal knowledge, client communication, and the work generic software rarely fits perfectly.',
      body:
        'This is not another legal AI product to log into and work around. It is a way to think about what your firm needs, what your team already does well, and where a focused internal tool could remove friction.',
      ctaPrimary: 'Schedule a Conversation',
      ctaSecondary: '',
      ctaPrimaryHref: scheduleConversationHref,
      figLabelLeft: 'Fig. 01 — Where a focused tool can help',
      figLabelRight: 'Four starting points',
    },
    stages: [
      { label: 'Start 01', name: 'Documents', desc: 'Pleadings, exhibits, research, notes, records, and the universe of material your team already works with.' },
      { label: 'Start 02', name: 'Workflow', desc: 'The repeated steps, decisions, reviews, and handoffs that make the work move.' },
      { label: 'Start 03', name: 'Knowledge', desc: 'Prior work, internal standards, file conventions, motion patterns, and firm-specific judgment.' },
      { label: 'Start 04', name: 'Client experience', desc: 'Updates, record sharing, matter visibility, and the moments clients feel the firm’s organization.' },
    ],
    pointOfView: {
      ...defaultContent.pointOfView,
      eyebrow: '§ 02 — The shift',
      metaRight: 'The landscape has changed',
      headline: 'Useful internal tools are more reachable than they used to be.',
      paragraphs: [
        'A few years ago, building custom internal software often meant large budgets, long timelines, and a lot of technical overhead.',
        'That has changed. AI, better development workflows, and faster prototyping now make it possible to design and build focused tools around specific firm problems without starting with a massive software initiative.',
        'The key is knowing what to build first, what not to build yet, and how to keep the system flexible as the tools continue to change.',
      ],
      pullQuoteLabel: 'The useful constraint',
      pullQuote: '“Everything is possible. The work is deciding what is worth building first.”',
    },
    dashboardPreview: {
      ...defaultContent.dashboardPreview,
      eyebrow: '§ 03 — Working example',
      headline: 'A dashboard, roughly pictured.',
      subheadline: `A rough look at how ${firmForHeading} documents, matters, workflows, and firm knowledge could come together in a single view.`,
      urlBar: `${firmSlug(firm)}.app / matters / working-preview`,
      chromeBadge: 'Preview',
      footnote:
        'Illustrative only. The real interface would be tailored to the firm’s workflows, priorities, and visual direction — defined together during the design sprint.',
    },
    featuresSection: {
      ...defaultContent.featuresSection,
      eyebrow: '§ 04 — Potential directions',
      headline: 'A few places this can start.',
      subheadline:
        'The first version does not need to do everything. In most cases, the smartest move is to choose one useful workflow, design it well, and expand once the team has something real to react to.',
    },
    features: [
      {
        num: '01',
        name: 'Case Intelligence Wiki',
        desc: 'A searchable space for case materials, notes, pleadings, research, timelines, and strategy, structured in a way that helps related information connect.',
      },
      {
        num: '02',
        name: 'Document Review + Organization',
        desc: 'A tool to help summarize large document sets, identify patterns, organize files, label materials, and support review workflows.',
      },
      {
        num: '03',
        name: 'Motions Bank',
        desc: 'A reusable internal library of prior motions, legal issues, arguments, fact patterns, and useful starting points from past work.',
      },
      {
        num: '04',
        name: 'Research + Gap Finder',
        desc: 'A workflow that helps identify factual gaps, missing documents, deposition questions, strengths, weaknesses, and useful research directions.',
      },
      {
        num: '05',
        name: 'Client Communication Assistant',
        desc: 'A system to help draft routine updates, filing notices, record-sharing emails, and other client communications for human review before sending.',
      },
      {
        num: '06',
        name: 'Internal Workflow Hub',
        desc: 'A focused place to manage internal tasks, case flow, team knowledge, checklists, and recurring firm processes.',
      },
    ],
    integrationsSection: {
      ...defaultContent.integrationsSection,
      eyebrow: '§ 05 — Modular system map',
      headline: 'Built to connect, but not all at once.',
      intro:
        'A custom tool can start focused and later connect to the systems your firm already uses. The first step is not connecting everything. The first step is identifying which connection would create the most immediate value.',
      figLabelLeft: 'Fig. 02 — Modular system map',
      figLabelRight: 'Start with one connection',
      centerLabel: 'Custom tool',
      centerName: firm,
      centerTagline: 'legal intelligence layer',
      footnote: '*Where access and terms allow.',
      mapNodes: [
        {
          variants: [
            { label: 'Storage', name: 'Box' },
            { label: 'Document Mgmt', name: 'NetDocuments / iManage' },
          ],
          style: { top: '27%', left: '6%' },
          line: { x: 180, y: 230 },
          floatDelay: '0s',
          floatDuration: '7s',
        },
        {
          variants: [
            { label: 'Practice Mgmt', name: 'PracticePanther' },
            { label: 'Practice Mgmt', name: 'Clio / MyCase / Filevine' },
          ],
          style: { top: '8%', left: '24%' },
          line: { x: 420, y: 120 },
          floatDelay: '1.2s',
          floatDuration: '8.5s',
        },
        {
          variants: [
            { label: 'Productivity', name: 'Microsoft 365' },
            { label: 'Productivity', name: 'Google Workspace' },
          ],
          style: { top: '8%', right: '24%' },
          line: { x: 780, y: 120 },
          floatDelay: '2.4s',
          floatDuration: '7.8s',
        },
        {
          variants: [
            { label: 'Legal Research', name: 'Westlaw*' },
            { label: 'Legal Research', name: 'LexisNexis' },
          ],
          style: { top: '27%', right: '6%' },
          line: { x: 1020, y: 230 },
          floatDelay: '0.6s',
          floatDuration: '8s',
        },
        {
          variants: [
            { label: 'Comms', name: 'Email workflows' },
            { label: 'Client Updates', name: 'Status + filing updates' },
          ],
          style: { bottom: '27%', left: '6%' },
          line: { x: 180, y: 450 },
          floatDelay: '3s',
          floatDuration: '9s',
        },
        {
          variants: [
            { label: 'Operations', name: 'Billing / timekeeping' },
            { label: 'Payments + Accounting', name: 'LawPay / QuickBooks' },
          ],
          style: { bottom: '8%', left: '24%' },
          line: { x: 420, y: 560 },
          floatDelay: '1.8s',
          floatDuration: '7.4s',
        },
        {
          variants: [{ label: 'eDiscovery', name: 'Relativity / Everlaw / DISCO' }],
          style: { bottom: '8%', right: '24%' },
          line: { x: 780, y: 560 },
          floatDelay: '0.3s',
          floatDuration: '8.2s',
        },
        {
          variants: [{ label: 'Internal', name: 'File conventions' }],
          style: { bottom: '27%', right: '6%' },
          line: { x: 1020, y: 450 },
          floatDelay: '2.1s',
          floatDuration: '7.6s',
        },
      ],
    },
    ownership: {
      ...defaultContent.ownership,
      eyebrow: '§ 06 — Why custom matters',
      headline: 'This can become proprietary to the way your firm works.',
      introParagraph:
        'One of the most interesting parts of this approach is that the system can reflect the firm’s actual thinking.',
      shapeLabel: 'A tool shaped around',
    },
    nextStepSection: {
      ...defaultContent.nextStepSection,
      eyebrowSection: '§ 07 — How it usually starts',
      eyebrowEmphasis: 'A focused first step',
      metaRight: 'Pre-meeting overview',
      headline: 'Start small. Build with purpose.',
      bodyParagraphs: [
        'Most firms do not need to start with a giant build.',
        'The better first step is a Product Strategy + Interface Design sprint. We define the highest-value use case, map the workflow, design the key screens, and create a clearer path for what should be built next.',
        'This gives everyone something real to react to before committing to a larger development phase.',
      ],
      stepsLabel: 'Typical path',
      investmentLabel: 'Design sprint',
      investmentValue: 'Starting at $4.9K',
      timelineLabel: 'Typical timeline',
      timelineValue: '2 weeks',
      buildLabel: 'Build sprint',
      buildValue: 'Quoted after scope is defined',
      ctaPrimary: 'Schedule a Conversation',
      ctaSecondary: '',
      ctaPrimaryHref: scheduleConversationHref,
    },
    nextSteps: [
      'Talk through the firm’s current workflows and pain points',
      'Identify the most useful first use case',
      'Map the workflow and required screens',
      'Design a working prototype or product direction',
      'Estimate the first build sprint',
      'Expand only when the next step is clear',
    ],
    scope: {
      ...defaultContent.scope,
      eyebrow: '§ 08 — Scope discipline',
      headline: 'Do not build the whole universe on day one.',
      paragraphs: [
        'The fastest way to make this expensive, messy, or risky is to connect everything before we know what matters most.',
        'We recommend starting with one clear workflow, one useful interface, and one meaningful improvement to how the team works.',
      ],
      notFirst: {
        label: 'Not first',
        headline: 'Avoid the giant first build.',
      },
      betterFirst: {
        label: 'Better first',
        headline: 'Start controlled.',
      },
    },
    notFirst: [
      'Replace every tool',
      'Connect every file',
      'Automate every decision',
      'Build a client portal for everything',
      'Assume AI should touch every part of the firm',
    ],
    betterFirst: [
      'Choose one painful workflow',
      'Define the document universe',
      'Set clear rules',
      'Design the interface',
      'Test with real use',
      'Then decide what deserves to come next',
    ],
    clientExperience: {
      ...defaultContent.clientExperience,
      eyebrow: '§ 09 — Beyond internal efficiency',
      headline: 'Clients may never see the system. They will feel the difference.',
      paragraphs: [
        'Some value shows up behind the scenes: faster review, cleaner organization, better internal visibility, fewer dropped balls.',
        'Some of it can directly improve the client experience: faster updates, clearer communication, easier record sharing, better matter visibility, and a more premium feeling of organization.',
      ],
      closingNote: 'Use AI to remove the friction, not the humanity.',
    },
    closing: {
      ...defaultContent.closing,
      eyebrow: '§ 11 — Closing',
      metaRight: 'Custom AI tools for law firms',
      closingLine: 'Build around the firm. Not around the software.',
      ctaPrimary: 'Schedule a Conversation',
    },
    footer: {
      ...defaultContent.footer,
      preparedFor: 'Custom AI tools for law firms',
      rightLines: [defaultContent.proposal.prepared, 'Pre-meeting overview'],
    },
  } as Content
}

export function getPreMeetingFirmNameFromURL() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('firm') || params.get('firmName') || params.get('client')
}
