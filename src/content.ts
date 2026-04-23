/**
 * Single source of truth for proposal copy.
 *
 * Everything a reader sees — client name, headlines, body copy, list items,
 * CTAs — lives in this file. To re-skin the proposal for a different firm,
 * edit the `client` object and most mentions update automatically; run
 * through section copy for any voice-specific phrasing that should change.
 *
 * Structured data (sprint steps, features, integration nodes) lives at the
 * bottom of the file under `lists`.
 */

// ——— CLIENT ———
export const client = {
  name: 'Belzer Law',
  shortName: 'Belzer',
  possessive: "Belzer Law's",
  location: 'Colorado',
  leadName: 'Aaron Belzer',
  primary: 'Aaron',
  secondary: 'Britt',
  teamPhrase: 'Aaron, Britt, and the team',
  teamPhraseWithKey: 'Aaron, Britt, and key team members',
}

// ——— AGENCY ———
export const agency = {
  name: 'Anchovies',
  email: 'alexis@anchovies.agency',
  mailSubject: 'Design Sprint Approved',
}

// ——— PROPOSAL META ———
export const proposal = {
  id: 'belzer',
  prepared: 'April 2026',
  preparedShort: 'April 2026',
  version: 'v1',
  kind: 'Strategy + Interface Design',
}

// ——— PRICING ———
export const pricing = {
  sprintShort: '$6.5K',
  sprintFull: '$6,500',
  sprintTimeline: '2 weeks',
  sprintTimelineLong: '~2 weeks from kickoff.',
  buildRange: '$10K–$15K',
}

// ——— NAV ———
export const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'sprint', label: 'Sprint' },
  { id: 'features', label: 'Features' },
  { id: 'security', label: 'Security' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

export const nav = {
  topMetaLeft: `Prepared for ${client.name}`,
  topMetaRight: [`Proposal · ${proposal.version}`, proposal.prepared],
  brandName: agency.name,
  brandPair: `${agency.name} × ${client.name}`,
  ctaApprove: 'Approve Sprint',
}

// ——— HERO ———
export const hero = {
  eyebrowSection: '§ 01 — Proposal',
  eyebrowEmphasis: 'A custom-built legal intelligence tool',
  eyebrowMetaLines: [
    `${client.name} · ${client.location}`,
    proposal.kind,
  ],
  headlineLines: ['A custom-built', 'legal intelligence', `tool for ${client.name}.`],
  subheadline:
    'Most software asks firms to adapt to the platform. This does the opposite, creating a proprietary tool around your workflows, documents, standards, and the way your team practices.',
  body: 'After our conversation, one thing was clear: the need is not another generic AI product. The need is something useful, controlled, and shaped around the work you already do.',
  ctaPrimary: 'Begin with the first sprint →',
  ctaSecondary: 'View proposed features',
  figLabelLeft: 'Fig. 01 — How the system moves',
  figLabelRight: 'Four stages',
}

// ——— § 02 WHAT WE HEARD ———
export const whatWeHeard = {
  eyebrow: '§ 02 — What we heard',
  headline: 'You are not looking for AI theater.',
  bodyParagraph:
    'You have already looked at tools that feel built for larger firms, broader use cases, or generic chatbot-style demos. The problem is not that AI is uninteresting. The problem is that most tools are not shaped closely enough around the way your firm actually works.',
  needsIntro: 'From our conversation, the clearest needs were:',
}

// ——— § 03 POINT OF VIEW ———
export const pointOfView = {
  eyebrow: '§ 03 — Our point of view',
  metaRight: `${agency.name} · Philosophy`,
  headline: 'The value is that it is thoughtfully yours.',
  paragraphs: [
    'The best version of this is not a product with a thousand features. It is a focused system built around your documents, your process, your judgment, your preferences, and your way of practicing.',
    'Off-the-shelf software has value. It can be tested, documented, and supported at scale. But it also comes with tradeoffs: features you do not need, workflows you may not want, and a roadmap you do not control.',
    `This approach starts in a different place: what does ${client.name} actually need to do better, faster, clearer, or with less friction?`,
  ],
  pullQuoteLabel: 'Pull quote',
  pullQuote: '“The tool should adapt to the firm, not the other way around.”',
}

// ——— § 03b DASHBOARD PREVIEW ———
export const dashboardPreview = {
  eyebrow: '§ 03b — Working example',
  headline: 'A dashboard, roughly pictured.',
  subheadline: `A rough look at how ${client.possessive} documents, cases, and firm knowledge could come together in a single view.`,
  urlBar: `${client.shortName.toLowerCase()}.app / matters / holloway-v-metro`,
  chromeBadge: 'Preview',
  footnote: `Illustrative only. The real interface would be tailored to ${client.possessive} voice, workflows, and visual direction — defined together during the design sprint.`,
}

// ——— § 04 PHASE 1 ———
export const phaseOne = {
  eyebrowSection: '§ 04 — Phase 1',
  eyebrowEmphasis: 'Product strategy + interface design',
  metaTimeline: `Est. ${pricing.sprintTimeline}`,
  metaPrice: pricing.sprintFull,
  headline: 'Product Strategy + Interface Design Sprint.',
  bodyParagraphs: [
    'Two focused weeks to turn the idea into a real product — designed, prototyped, and ready to build.',
    'You leave the sprint with high-fidelity interface designs, a clickable prototype you can test with the team, and a development-ready handoff the first engineer can start building from on day one. Not a thought exercise — a product in motion.',
  ],
  figLabelLeft: 'Fig. 02 — Sprint process',
  figLabelRight: 'Five steps',
  deliverablesLabel: 'Deliverables',
  investmentLabel: 'Estimated investment',
  investmentValue: pricing.sprintShort,
  timelineLabel: 'Timeline',
  timelineValue: pricing.sprintTimelineLong,
  timelineNote: 'Depending on feedback and meeting availability.',
}

// ——— § 05 FEATURES ———
export const featuresSection = {
  eyebrow: '§ 05 — Potential build paths',
  headline: 'A tool in the toolbox.',
  subheadline:
    'Based on the conversation, these are the most relevant feature directions to explore.',
}

// ——— § 06 SCOPE ———
export const scope = {
  eyebrow: '§ 06 — Scope discipline',
  headline: 'Do not build the whole universe on day one.',
  paragraphs: [
    'The fastest way to make this expensive, messy, or risky is to connect everything before we know what matters most.',
    'We recommend avoiding a giant first build. Instead, we start with the clearest high-value workflow, test it, learn from it, and expand from there.',
  ],
  notFirst: {
    label: 'A — Not first',
    headline: 'Avoid on day one.',
  },
  betterFirst: {
    label: 'B — Better first',
    headline: 'Start with one useful thing.',
  },
}

// ——— § 07 SECURITY ———
export const security = {
  eyebrow: '§ 07 — Risk matters',
  headline: 'Nimble does not mean careless.',
  intro:
    'Because this involves sensitive legal work, the system should be designed with security, permissions, and review in mind from the beginning.',
  considerationsLabel: 'Considerations',
  closingQuote:
    'The goal is not to move recklessly. The goal is to move intelligently, with the right level of control for the sensitivity of the work.',
}

// ——— § 08 STRATEGIC ADVANTAGE ———
export const advantage = {
  eyebrow: '§ 08 — Strategic advantage',
  metaRight: 'Smaller · Sharper · More human',
  headline: 'AI can help a smaller firm feel even more capable.',
  paragraphs: [
    'A smaller firm can already offer something many larger firms struggle with: direct attention, lower overhead, clearer communication, and a more personal experience.',
    'The right internal tools can strengthen that advantage.',
    'AI should not replace the human value of the firm. It should remove more of the repetitive work so the team can spend more time on judgment, strategy, communication, and the parts of the work clients actually feel.',
  ],
  pullQuoteLabel: 'Pull quote',
  pullQuote: '“Use AI to remove the friction, not the humanity.”',
  equation: ['Less friction', '+', 'more judgment', '=', 'better client experience'],
}

// ——— § 09 CLIENT EXPERIENCE ———
export const clientExperience = {
  eyebrow: '§ 09 — Beyond internal efficiency',
  headline: 'Clients may never see the system. They will feel the difference.',
  paragraphs: [
    'Some of the value may show up behind the scenes. Faster review. Cleaner organization. Better internal visibility. Fewer dropped balls.',
    'But some of it can directly improve the client experience.',
  ],
  figLabelLeft: 'Fig. 03 — From internal to felt',
  figLabelRight: 'Two columns, one outcome',
  internalLabel: 'Internal workflow',
  internalHeadline: 'Behind the scenes.',
  clientLabel: 'Client-facing',
  clientHeadline: 'What the client feels.',
  closingNote:
    'The right system can make the firm feel more responsive, more buttoned up, and more intentional.',
}

// ——— § 10 PHASE 2 ———
export const phaseTwo = {
  eyebrowSection: '§ 10 — Phase 2',
  eyebrowEmphasis: 'Build sprint',
  metaRight: 'Quoted after design sprint',
  headline: 'Build Sprint.',
  body:
    'Once the design sprint is complete, we will quote the first build phase based on the chosen feature set.',
  buildPathsLabel: 'Possible first build directions',
  rangeLabel: 'Estimated build range',
  rangeValue: pricing.buildRange,
  rangeNote:
    'The range depends on final scope, integrations, model usage, security requirements, file sources, user permissions, and whether the tool is web-only or includes mobile access through TestFlight.',
  rangeDisclaimer: 'Note — this is an estimate, not a final quote.',
}

// ——— § 11 INTEGRATIONS ———
export const integrationsSection = {
  eyebrow: '§ 11 — Future considerations',
  headline: 'Built to connect, but not all at once.',
  intro:
    'Potential integrations or data sources could include a handful of known systems — the first step is not connecting everything, it is identifying which connection would create the most immediate value.',
  figLabelLeft: 'Fig. 04 — Modular system map',
  figLabelRight: 'Start with one connection',
  centerLabel: 'Custom tool',
  centerName: client.name,
  centerTagline: 'legal intelligence layer',
  mobilePossibleLabel: 'Possible connections',
  footnote: '* Where access and terms allow.',
}

// ——— § 12 OWNERSHIP ———
export const ownership = {
  eyebrow: '§ 12 — Why custom matters',
  metaRight: 'Ownership · Flexibility',
  headline: `This can become proprietary to the way ${client.name} works.`,
  introParagraph: `One of the most interesting parts of this approach is that the system can reflect the firm's actual thinking.`,
  disclaimerLines: [
    'Not just generic legal AI.',
    'Not just a chatbot.',
    'Not just another subscription.',
  ],
  closingParagraph:
    'Over time, that becomes more valuable because it is not just software. It is the firm’s process made visible.',
  shapeLabel: 'A tool shaped around —',
  pullQuote: '“Your process is the product.”',
}

// ——— § 13 NEXT STEP ———
export const nextStepSection = {
  eyebrowSection: '§ 13 — Next step',
  eyebrowEmphasis: 'Recommended path forward',
  metaRight: `Prepared ${proposal.prepared}`,
  headline: 'Start with the design sprint.',
  bodyParagraphs: [
    'Begin with the Product Strategy + Interface Design sprint — two weeks, one flat fee, a real product on the other side.',
    `You leave with high-fidelity designs, a working prototype, and a development-ready handoff. ${client.teamPhrase} stays aligned throughout, and nobody commits to the larger build until the shape of the tool is clear and agreed on.`,
  ],
  stepsLabel: 'Next steps',
  investmentLabel: 'Investment',
  investmentValue: pricing.sprintShort,
  timelineLabel: 'Timeline',
  timelineValue: pricing.sprintTimeline,
  ctaPrimary: 'Approve Design Sprint →',
  ctaSecondary: 'Schedule Review Call',
}

// ——— § 14 CLOSING ———
export const closing = {
  eyebrow: '§ 14 — Closing',
  metaRight: 'A smarter tool for a sharper firm',
  headline: 'Everything is possible. The work is deciding what is worth building first.',
  paragraphs: [
    'The constraints have changed. Things that used to require major software budgets, long timelines, or highly specialized teams are now much more reachable.',
    'That does not mean everything should be built at once.',
  ],
  bestPathLabel: 'The best path',
  bestPathSteps: ['Solve one meaningful problem,', 'learn from real use,', 'then build from there.'],
  closingLine: 'A smarter tool for a sharper firm.',
}

// ——— FOOTER ———
export const footer = {
  brand: agency.name,
  preparedFor: `Prepared for ${client.name}`,
  rightLines: [proposal.prepared, `Proposal · ${proposal.version}`],
}

// ——— APPROVE SCREEN ———
export const approveScreen = {
  eyebrow: 'Design sprint — approved',
  headline: 'We’ve got it from here.',
  confirmationLabel: 'Confirmation',
  confirmationBody:
    'Thank you. This approval signals intent — no invoice is triggered until kickoff is scheduled and confirmed.',
  introLabel: 'What happens next',
  introBody:
    'We’ll prepare, align, and reach out to schedule the first session. No further action needed on your side for now.',
  introNote: `A short confirmation will land in your inbox shortly. If anything changes, reply to it directly — it’ll come from the ${agency.name} team.`,
  steps: [
    {
      label: 'Step 01',
      title: 'Kickoff scheduling',
      body: `We’ll reach out within the day to schedule the strategy session with ${client.teamPhrase}.`,
    },
    {
      label: 'Step 02',
      title: 'A short intake',
      body: 'We’ll send a brief intake document covering priority use-cases, documents to focus on, and any access questions we should map early.',
    },
    {
      label: 'Step 03',
      title: 'Sprint begins',
      body: 'Two focused weeks. You leave with high-fidelity designs, a clickable prototype, and a development-ready handoff — ready to build the moment you are.',
    },
  ],
  preparedForLabel: 'Prepared for',
  preparedForValue: `${client.name} · ${client.location}`,
  ctaBack: 'Back to proposal',
  ctaReach: 'Reach the team →',
  mailTo: `mailto:${agency.email}?subject=${encodeURIComponent(client.name)}%20%E2%80%94%20${encodeURIComponent(agency.mailSubject)}`,
}

// ——— STRUCTURED LISTS (the "facts" of the proposal) ———

export const needs = [
  'Reviewing and organizing large document sets',
  'Summarizing case materials',
  'Finding factual gaps',
  'Identifying strengths and weaknesses',
  'Helping prepare for depositions',
  'Building a motions bank',
  'Creating a useful internal wiki',
  'Reducing tedious communication and filing updates',
  'Exploring how AI can support a smaller, more efficient, higher-touch firm',
]

export const stages = [
  { label: 'Stage 01', name: 'Documents', desc: 'Pleadings, exhibits, research, notes — the universe as it exists today.' },
  { label: 'Stage 02', name: 'Structure', desc: 'Labels, timelines, relationships, a shape the firm can actually navigate.' },
  { label: 'Stage 03', name: 'Insight', desc: 'Gaps, strengths, patterns — what the materials are telling you.' },
  { label: 'Stage 04', name: 'Action', desc: 'Motions, drafts, client updates, deposition prep — work the firm can use.' },
]

export const sprintSteps = [
  { num: '01', name: 'Listen', desc: `Strategy + discovery session with ${client.teamPhrase}.` },
  { num: '02', name: 'Map', desc: 'Priority use-cases, feature architecture, end-to-end user flow.' },
  { num: '03', name: 'Design', desc: 'High-fidelity interface designs and a clickable prototype.' },
  { num: '04', name: 'Estimate', desc: 'Development-ready handoff, technical plan, and build quote.' },
  { num: '05', name: 'Build', desc: 'First sprint scoped and ready to begin — on your approval.' },
]

export const deliverables = [
  'Strategy + discovery session',
  'Priority use-case mapping',
  'Feature architecture',
  'End-to-end user flow',
  'High-fidelity interface designs',
  'Clickable, testable prototype',
  'Interface system + visual direction',
  'Development-ready handoff + build estimate',
]

export const features = [
  {
    num: '01',
    name: 'Case Intelligence Wiki',
    desc: 'A searchable, structured space for case materials, notes, pleadings, motions, research, timelines, and strategy. Think of it like a private case wiki that connects related information instead of leaving it buried in folders.',
  },
  {
    num: '02',
    name: 'Document Review + Organization',
    desc: 'A workflow for uploading or connecting document sets, summarizing materials, identifying patterns, labeling files, and preparing materials for review or exhibits.',
  },
  {
    num: '03',
    name: 'Motions Bank',
    desc: 'A reusable internal library of past motions, legal issues, arguments, fact patterns, and related materials, designed to help the team find useful starting points from prior work.',
  },
  {
    num: '04',
    name: 'Research Gap Finder',
    desc: 'A tool that reviews a defined universe of pleadings, facts, research, and case documents to help identify factual gaps, deposition questions, missing documents, potential weaknesses, and areas of strength.',
  },
  {
    num: '05',
    name: 'Client Communication Assistant',
    desc: 'A lightweight system to help draft filing updates, status notes, record-sharing emails, and other routine client communications for review before sending.',
  },
  {
    num: '06',
    name: 'Internal Process Wiki',
    desc: 'A living internal knowledge base for case flow, firm processes, recurring tasks, and team training as the firm grows.',
  },
]

export const notFirst = [
  'Full replacement of PracticePanther',
  'Full replacement of Box',
  'Broad client portal for every matter',
  'Every possible integration',
  'Fully automated legal output without review',
  'Anything that creates unnecessary risk before the workflow is proven',
]

export const betterFirst = [
  'One clear internal workflow',
  'One defined document universe',
  'One useful interface',
  'One meaningful improvement to the way the team works',
]

export const securityConsiderations = [
  'Data retention settings',
  'No-training model configurations where available',
  'User access and permissions',
  'Local or controlled file storage where appropriate',
  'Clear boundaries around what the system can access',
  'Human review before sending, filing, or relying on outputs',
  'Auditability where needed',
  'Security and integration partners if the project requires deeper infrastructure support',
]

export const internalWorkflow = [
  'Faster review',
  'Cleaner organization',
  'Better internal visibility',
  'Fewer dropped balls',
]

export const clientFacing = [
  'Faster filing updates',
  'Clearer record-sharing emails',
  'More consistent communication',
  'Easier access to selected materials',
  'Better matter-status visibility',
  'A more premium feeling of organization',
]

export const buildPaths = [
  'Case Intelligence Wiki',
  'Motions Bank',
  'Document Review workflow',
  'Research Gap Finder',
  'Client Communication Assistant',
  'Internal Process Wiki',
  'A focused combination of the above',
]

export const integrations = [
  { label: 'Storage', name: 'Box' },
  { label: 'Practice mgmt', name: 'PracticePanther' },
  { label: 'Productivity', name: 'Microsoft 365' },
  { label: 'Legal research', name: 'Westlaw*' },
  { label: 'Comms', name: 'Email workflows' },
  { label: 'Operations', name: 'Billing / timekeeping' },
  { label: 'Storage systems', name: 'Document storage' },
  { label: 'Internal', name: 'File conventions' },
]

export const ownershipShape = [
  'How you name files',
  'How you review facts',
  'How you prepare for depositions',
  'How you reuse past work',
  'How you communicate with clients',
  'How you make strategic decisions',
]

export const nextSteps = [
  `Schedule a product strategy session with ${client.teamPhraseWithKey}`,
  'Confirm the first-priority use case',
  'Map the workflow',
  'Design the key screens',
  'Review the prototype direction',
  'Quote the first build sprint',
]
