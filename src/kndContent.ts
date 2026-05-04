import { defaultContent } from './content'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

const client = {
  name: 'KND Law Firm',
  shortName: 'KND',
  possessive: "KND Law Firm's",
  location: 'Personal injury litigation',
  leadName: 'Kent Doll',
  primary: 'Kent',
  secondary: 'Katie',
  teamPhrase: 'Kent, Katie, and the team',
  teamPhraseWithKey: 'Kent, Katie, and key team members',
}

const proposal = {
  id: 'knd',
  prepared: 'May 2026',
  preparedShort: 'May 2026',
  version: 'v1',
  kind: 'AI litigation workflow sprint',
}

export const kndContent = {
  ...defaultContent,
  client,
  proposal,
  pricing: {
    ...defaultContent.pricing,
    sprintShort: '$4.8K',
    sprintFull: '$4,800',
    buildRange: '$7K-$15K',
  },
  nav: {
    ...defaultContent.nav,
    topMetaLeft: `Prepared for ${client.name}`,
    topMetaRight: [`Proposal · ${proposal.version}`, proposal.prepared],
    brandPair: `${defaultContent.agency.name} × ${client.name}`,
    ctaApprove: 'Schedule Kickoff Call',
    ctaHref: calendarHref,
  },
  hero: {
    ...defaultContent.hero,
    eyebrowEmphasis: 'A focused AI assistant',
    eyebrowMetaLines: [`${client.name} · ${client.location}`, proposal.kind],
    headlineLines: ['A focused', 'AI assistant', `for ${client.name}.`],
    subheadline:
      'A practical workflow layer for stronger brief review, sharper opposing-brief analysis, cleaner discovery extraction, and controlled experimentation with local or open-weight AI.',
    body:
      'The clearest opportunity is a small, useful litigation support tool that helps experienced attorneys move faster while keeping judgment, privacy, and review at the center.',
    ctaPrimary: 'Schedule Kickoff Call →',
    ctaPrimaryHref: calendarHref,
    ctaSecondary: 'View litigation workflows',
    figLabelRight: 'Review workflow',
  },
  whatWeHeard: {
    ...defaultContent.whatWeHeard,
    headline: 'The first sprint should create clarity around the highest-value workflow.',
    bodyParagraph:
      'The goal is to identify where AI can create the most reliable lift: review, revision, extraction, issue spotting, and second-pass analysis. A focused assistant can support that work with more control, stronger source awareness, and less noise.',
    needsIntro: 'The sprint should explore:',
  },
  pointOfView: {
    ...defaultContent.pointOfView,
    headline: 'The first win should make the review process sharper and easier to trust.',
    paragraphs: [
      'The first tool should help review drafts, pressure-test arguments, extract useful material from large files, and organize matter knowledge in a way that improves human judgment.',
      'A strong system can learn the firm\'s preferences over time: writing standards, recurring logical gaps, bad faith indicators worth surfacing, and the boundaries that keep AI in a supporting role.',
      'The sprint should define those standards clearly enough to prototype the workflow, test it with real materials, and decide what is worth building first.',
    ],
    pullQuote: '"Use AI as a second set of eyes for the work that still belongs to the lawyer."',
  },
  dashboardPreview: {
    ...defaultContent.dashboardPreview,
    headline: 'A litigation review workspace, roughly pictured.',
    subheadline:
      'A rough look at how briefs, opposing briefs, discovery, claims files, and matter memory could come together in a focused review interface.',
    urlBar: 'knd.app / matters / bad-faith-review',
    footnote:
      "Illustrative only. The real interface would be tailored to KND Law Firm's litigation workflow, file sources, review standards, and security preferences during the sprint.",
  },
  dashboardMock: {
    matters: [
      { num: '2026-0184', type: 'Bad faith', name: 'Morgan v. Alpine Mutual', status: 'Claims file review · Policy extraction', active: true, badge: null },
      { num: '2026-0172', type: 'PI defense', name: 'Ramos v. Northline Transport', status: 'Opposition brief due', active: false, badge: '2 flags' },
      { num: '2026-0169', type: 'PI plaintiff', name: 'Delaney v. Ridge Medical', status: 'Medical records review', active: false, badge: null },
      { num: '2026-0158', type: 'Coverage', name: 'Hart Policy Review', status: 'Certified policy pending', active: false, badge: null },
      { num: '2026-0144', type: 'Research', name: 'Bad faith standards memo', status: 'Research project open', active: false, badge: null },
    ],
    strengths: [
      'Certified policy language supports the coverage position identified in review.',
      'Claims notes show repeated delay after complete medical records were received.',
      'Insured correspondence is clustered and ready for attorney review.',
    ],
    weaknesses: [
      'Record citation for the March 12 call needs source confirmation.',
      'OCR confidence is low across scanned adjuster notes from pages 318-344.',
      'Opposition brief cites a timeline that should be checked against the claim log.',
    ],
    docTypes: [
      ['Claims file', '842'],
      ['Medical records', '1,284'],
      ['Correspondence', '196'],
      ['Briefs + research', '38'],
    ],
    upcoming: [
      ['Opposition brief review', 'Logic and citation pass', 'Mon · May 4'],
      ['Policy extraction', 'Certified copy section ready', 'Tue · May 5'],
      ['Bad faith issue list', 'Attorney review packet', 'Wed · May 6'],
    ],
    insights: [
      {
        label: 'Citation check',
        tinted: true,
        confidence: 'High confidence',
        body: 'Opposing brief relies on a treatment-gap assertion that conflicts with records dated Feb 18 and Mar 3.',
        cta: 'Open excerpts',
        meta: 'Source bundle ready',
      },
      {
        label: 'Draft review',
        body: 'Draft brief has 12 suggested clarity edits, 4 typo catches, and 3 tone notes for judicial readability.',
        cta: 'Review edits',
        meta: 'Attorney approval required',
      },
      {
        label: 'Bad faith signal',
        body: 'Claims log shows 47 days between receipt of complete records and the next substantive carrier response.',
        meta: 'Claims file · p. 214',
      },
      {
        label: 'OCR attention',
        body: 'Scanned adjuster notes need a cleaner OCR pass before reliable extraction.',
        meta: 'Pages 318-344',
      },
    ],
    searchPlaceholder: 'Search briefs, claims files, records, policies...',
    newInsightsLabel: '4 review insights',
    avatarInitials: 'KD',
    matterId: '2026-0184',
    caseTitle: 'Morgan v. Alpine Mutual',
    caseMeta: [
      ['Matter', 'Bad faith assessment'],
      ['Opened', 'May 1, 2026'],
      ['Review', 'Attorney-led'],
    ],
    status: 'Active · Review',
    tabs: [
      { label: 'Overview' },
      { label: 'Documents', badge: '2,360' },
      { label: 'Brief review' },
      { label: 'Extraction' },
      { label: 'Issue flags', pulse: true },
      { label: 'Timeline' },
      { label: 'Matter memory' },
    ],
    summaryMeta: 'Drafted from selected claims file, briefs, and medical records · 12 min ago',
    caseSummary:
      'This workspace brings together the carrier claims file, certified policy language, insured correspondence, medical records, and opposing brief assertions. It is designed to help verify citations, extract key excerpts, and surface bad faith issues for attorney review.',
    documentCount: '2,360',
    documentSubLabel: '2,360 · 84 scanned',
    intelligenceUpdated: 'Updated 8 min ago',
    intelligenceIntro:
      'Observations from selected claims file materials, brief drafts, medical records, and firm review standards.',
  },
  phaseOne: {
    ...defaultContent.phaseOne,
    eyebrowEmphasis: 'Brief review + opposition analysis sprint',
    metaPrice: '$4,800',
    headline: 'Brief Review + Opposition Analysis Sprint.',
    bodyParagraphs: [
      'Two focused weeks to define and prototype the first AI workflow around the highest-confidence starting point: reviewing draft briefs and analyzing opposing briefs.',
      'You leave with high-fidelity screens, a clickable prototype, prompt and review logic, and a development-ready plan for the first build. The sprint creates a concrete path before committing to a larger system.',
    ],
    investmentValue: '$4.8K',
  },
  phaseTwo: {
    ...defaultContent.phaseTwo,
    body:
      'Once the design sprint is complete, we will quote the first build phase around the selected workflow, expected document volume, preferred model setup, security requirements, and file-source approach.',
    rangeValue: '$7K-$15K',
    rangeNote:
      'The range depends on final scope, document volume, OCR needs, local or cloud model choices, Clio or file-source access, security requirements, and whether the first build is a prototype or a reusable internal tool.',
    rangeDisclaimer: 'Final quote follows the design sprint.',
  },
  featuresSection: {
    ...defaultContent.featuresSection,
    headline: 'Litigation support paths.',
    subheadline:
      'These directions prioritize internal litigation quality, review speed, privacy, and controlled use of AI.',
  },
  scope: {
    ...defaultContent.scope,
    eyebrow: '§ 06 — First focus',
    headline: 'Start with the workflow that can earn trust fastest.',
    paragraphs: [
      'The strongest first move is a narrow workflow with clear inputs, clear outputs, and human review built into the habit of use.',
      'We recommend centering the first sprint on draft brief review and opposing brief analysis, then expanding into discovery extraction, matter memory, and local-model exploration as confidence builds.',
    ],
    notFirst: {
      label: 'Future edges',
      headline: 'Keep in view for later phases.',
    },
    betterFirst: {
      label: 'First focus',
      headline: 'Begin where the value is clearest.',
    },
  },
  security: {
    ...defaultContent.security,
    headline: 'Sensitive records deserve a controlled workflow.',
    intro:
      'Large medical records, claims files, plaintiff and defense matters, and confidential client material should be handled with clear privacy choices from the start, including cloud settings, local-file workflows, open-weight model options, permissions, and human review checkpoints.',
    closingQuote:
      'The goal is confident experimentation: useful enough to matter, controlled enough to trust, and clear enough for the team to understand what the system can access.',
  },
  advantage: {
    ...defaultContent.advantage,
    headline: 'AI can help create sharper review, cleaner records, and stronger attorney judgment.',
    paragraphs: [
      'A focused internal tool can help catch typos, tighten arguments, find unsupported assertions, extract key records, and surface issues worth a closer human look.',
      'The value is cumulative: better drafts, cleaner review, faster file understanding, and more attorney attention available for strategy.',
      'The larger opportunity is a review layer that becomes more useful as the firm learns which workflows, model choices, and security boundaries create the most value.',
    ],
    pullQuote: '"Better review, clearer records, stronger judgment."',
    equation: ['Clear inputs', '+', 'human judgment', '+', 'focused AI', '=', 'stronger work'],
  },
  clientExperience: {
    ...defaultContent.clientExperience,
    eyebrow: '§ 09 — Practice impact',
    headline: 'Clients may never see the tool. They will feel the quality of the work.',
    paragraphs: [
      'The most relevant value for KND starts inside the litigation workflow: faster review, clearer file understanding, and more consistent issue spotting.',
      'That internal clarity can show up externally through stronger writing, better-prepared strategy, cleaner records, and more confidence in the work product.',
    ],
    figLabelLeft: 'Fig. 03 — From review to result',
    figLabelRight: 'Internal clarity, client value',
    internalLabel: 'Litigation workflow',
    internalHeadline: 'Inside the file.',
    clientLabel: 'Client value',
    clientHeadline: 'What improves.',
    closingNote:
      'The right system helps attorneys spend more energy on judgment and less energy wrestling with scattered records, repeated review loops, and avoidable drafting cleanup.',
  },
  integrationsSection: {
    ...defaultContent.integrationsSection,
    headline: 'Built around the systems and sources that matter most.',
    intro:
      'The first version can work with a controlled document set before deeper connections. Future phases can explore Clio, document storage, legal research, OCR, local files, and open-weight model infrastructure where access and terms allow.',
    figLabelRight: 'Start with controlled files',
    centerName: client.name,
    centerTagline: 'litigation intelligence layer',
    mobilePossibleLabel: 'Possible sources',
    footnote: '* Where access, terms, security requirements, and model limits allow.',
    mapNodes: [
      {
        variants: [{ label: 'Practice mgmt', name: 'Clio' }],
        style: { top: '27%', left: '6%' },
        line: { x: 180, y: 230 },
        floatDelay: '0s',
        floatDuration: '7s',
      },
      {
        variants: [{ label: 'Drafting', name: 'Brief drafts' }],
        style: { top: '8%', left: '24%' },
        line: { x: 420, y: 120 },
        floatDelay: '1.2s',
        floatDuration: '8.5s',
      },
      {
        variants: [{ label: 'Opposition', name: 'Opposing briefs' }],
        style: { top: '8%', right: '24%' },
        line: { x: 780, y: 120 },
        floatDelay: '2.4s',
        floatDuration: '7.8s',
      },
      {
        variants: [{ label: 'Research', name: 'CoCounsel / Westlaw*' }],
        style: { top: '27%', right: '6%' },
        line: { x: 1020, y: 230 },
        floatDelay: '0.6s',
        floatDuration: '8s',
      },
      {
        variants: [{ label: 'Records', name: 'Medical records' }],
        style: { bottom: '27%', left: '6%' },
        line: { x: 180, y: 450 },
        floatDelay: '3s',
        floatDuration: '9s',
      },
      {
        variants: [{ label: 'Extraction', name: 'OCR / PDFs' }],
        style: { bottom: '8%', left: '24%' },
        line: { x: 420, y: 560 },
        floatDelay: '1.8s',
        floatDuration: '7.4s',
      },
      {
        variants: [{ label: 'Claims files', name: 'Bad faith files' }],
        style: { bottom: '8%', right: '24%' },
        line: { x: 780, y: 560 },
        floatDelay: '0.3s',
        floatDuration: '8.2s',
      },
      {
        variants: [{ label: 'Model options', name: 'Cloud / local AI' }],
        style: { bottom: '27%', right: '6%' },
        line: { x: 1020, y: 450 },
        floatDelay: '2.1s',
        floatDuration: '7.6s',
      },
    ],
  },
  ownership: {
    ...defaultContent.ownership,
    headline: `This can become proprietary to the way ${client.name} reviews litigation work.`,
    introParagraph:
      'The strongest long-term opportunity is a tool that reflects the firm\'s litigation judgment: brief standards, claims-file review patterns, bad faith indicators, and the way matter knowledge should carry forward.',
    disclaimerLines: [
      'Brief standards',
      'Opposition analysis',
      'Bad faith indicators',
    ],
    closingParagraph:
      'Over time, that becomes a practical memory layer for the firm: a system that helps new matters benefit from the judgment built in prior matters.',
    shapeLabel: 'A tool shaped around -',
    pullQuote: '"The firm\'s judgment becomes easier to reuse."',
  },
  nextStepSection: {
    ...defaultContent.nextStepSection,
    metaRight: `Prepared ${proposal.prepared}`,
    headline: 'If this sounds aligned, let’s talk through kickoff.',
    bodyParagraphs: [
      'The next step is a kickoff conversation: confirm the review workflow, talk through the first document set, and make sure the sprint feels clear before anything begins.',
      'From there, we can move into the two-week Brief Review + Opposition Analysis sprint and shape the first prototype around the workflow most likely to create reliable value first.',
    ],
    investmentValue: '$4.8K',
    ctaPrimary: 'Schedule Kickoff Call →',
    ctaPrimaryHref: calendarHref,
    ctaSecondary: '',
  },
  closing: {
    ...defaultContent.closing,
    metaRight: 'A sharper review layer for a careful firm',
    headline: 'Start with one trusted workflow, then let the system grow from real use.',
    paragraphs: [
      'The next step is a focused tool that helps attorneys review, revise, extract, and spot issues with more clarity and control.',
      'From there, the system can grow around the workflows that prove most useful in real matter work.',
    ],
    bestPathSteps: ['Strengthen brief review,', 'learn from real matter work,', 'then expand with confidence.'],
    closingLine: 'A sharper review layer for a careful firm.',
  },
  footer: {
    ...defaultContent.footer,
    preparedFor: `Prepared for ${client.name}`,
    rightLines: [proposal.prepared, `Proposal · ${proposal.version}`],
  },
  approveScreen: {
    ...defaultContent.approveScreen,
    disabled: true,
    eyebrow: 'Review sprint - approved',
    headline: 'We will shape the first workflow from here.',
    confirmationBody:
      'Thank you. This approval signals intent for the review sprint. No invoice is triggered until kickoff is scheduled and confirmed.',
    introBody:
      'We will prepare around the brief review and opposition analysis workflow, then reach out to schedule the first session.',
    introNote:
      'A short confirmation will land in your inbox shortly. If anything changes, reply to it directly - it will come from the Anchovies team.',
    steps: [
      {
        label: 'Step 01',
        title: 'Take the intake',
        body:
          'A short, focused questionnaire so we understand the first document set, review standards, model preferences, and security comfort level.',
      },
      {
        label: 'Step 02',
        title: 'Kickoff scheduled',
        body:
          'We will review your answers and schedule the first strategy session with the right people on your team.',
      },
      {
        label: 'Step 03',
        title: 'Sprint begins',
        body:
          'Two focused weeks. You leave with high-fidelity designs, a clickable prototype, review logic, and a build-ready plan.',
      },
    ],
    preparedForValue: `${client.name} · ${client.location}`,
    ctaIntake: 'Start intake →',
  },
  needs: [
    'Reviewing draft briefs for grammar, clarity, tone, persuasion, and typographical errors',
    'Analyzing opposing briefs for logical gaps, unsupported assertions, circular reasoning, and missing record citations',
    'Extracting key material from large discovery productions, claims files, policies, correspondence, and medical records',
    'Handling OCR limits and image-based PDFs with a clearer workflow for text conversion and review',
    'Assessing insurance bad faith files for issues that deserve closer attorney attention',
    'Creating matter memory so useful context can carry across projects without getting trapped in isolated chats',
    'Exploring local or open-weight AI for privacy-sensitive work and long-document token cost control',
    'Keeping AI in a supporting role with human review before legal reliance, filing, or client-facing use',
  ],
  stages: [
    { label: 'Stage 01', name: 'Matter set', desc: 'Briefs, policies, claims files, medical records, correspondence, notes, and selected research.' },
    { label: 'Stage 02', name: 'Structure', desc: 'OCR, labels, document types, citations, record references, and matter memory.' },
    { label: 'Stage 03', name: 'Review', desc: 'Typos, clarity, persuasive flow, logic gaps, unsupported assertions, and bad faith signals.' },
    { label: 'Stage 04', name: 'Attorney action', desc: 'Issues to inspect, edits to consider, excerpts to verify, and next questions to pursue.' },
  ],
  sprintSteps: [
    { num: '01', name: 'Listen', desc: 'Strategy session with your team around the first review workflow.' },
    { num: '02', name: 'Map', desc: 'Draft brief review, opposing brief analysis, source files, model boundaries, and human review steps.' },
    { num: '03', name: 'Design', desc: 'High-fidelity interface designs and a clickable prototype for the first litigation assistant.' },
    { num: '04', name: 'Estimate', desc: 'Development-ready handoff, model approach, security plan, and first build quote.' },
    { num: '05', name: 'Build', desc: 'First build sprint scoped and ready to begin on your approval.' },
  ],
  deliverables: [
    'Strategy + discovery session',
    'First workflow map',
    'Brief review and opposition analysis logic',
    'Security and model-use recommendations',
    'High-fidelity interface designs',
    'Clickable, testable prototype',
    'Development-ready handoff',
    'First build estimate',
  ],
  features: [
    {
      num: '01',
      name: 'Brief Review + Revision Assistant',
      desc:
        'A focused workflow for reviewing draft briefs for typos, grammar, unclear sentences, tone, persuasive flow, record-reference issues, and attorney-approved revision suggestions.',
    },
    {
      num: '02',
      name: 'Opposing Brief Issue Spotter',
      desc:
        'A second-pass review tool for surfacing unsupported claims, missing citations, circular reasoning, logical gaps, overstatements, and argument threads worth closer attorney attention.',
    },
    {
      num: '03',
      name: 'Discovery Extraction Workflow',
      desc:
        'A way to extract policies, correspondence, insured communications, key records, and other defined materials from large productions while accounting for OCR and image-based PDF limits.',
    },
    {
      num: '04',
      name: 'Bad Faith Assessment Workspace',
      desc:
        'A structured workspace for reviewing claims files, surfacing potential bad faith indicators, organizing supporting excerpts, and giving attorneys a clearer starting point for analysis.',
    },
    {
      num: '05',
      name: 'Matter Memory / Case Wiki',
      desc:
        'A private matter memory layer that connects briefs, records, notes, research, timelines, and strategy so the team can navigate case knowledge beyond isolated chat threads.',
    },
    {
      num: '06',
      name: 'Local or Open-Weight AI Exploration',
      desc:
        'A practical evaluation of where local models, controlled files, and open-weight AI can support privacy-sensitive review while reducing long-document token cost exposure.',
    },
  ],
  notFirst: [
    'Full Clio replacement',
    'Firm-wide automation across every matter',
    'Broad business operations tooling',
    'Client portal expansion',
    'Unreviewed legal drafting',
    'Large-scale integrations before the review workflow is proven',
  ],
  betterFirst: [
    'Draft brief review',
    'Opposing brief analysis',
    'One controlled matter file set',
    'Clear source citations and excerpts',
    'Human approval checkpoints',
    'A prototype the team can test quickly',
  ],
  securityConsiderations: [
    'Confidential medical records and claims files',
    'Cloud model settings and no-training configurations where available',
    'Local-file workflows for sensitive document sets',
    'Open-weight model feasibility for selected tasks',
    'OCR handling for image-based PDFs',
    'User access and matter-level permissions',
    'Human review before legal reliance, filing, or client-facing use',
    'Audit-friendly source references and review history',
  ],
  internalWorkflow: [
    'Sharper brief review',
    'Cleaner opposing-brief analysis',
    'Faster discovery extraction',
    'Better matter memory',
  ],
  clientFacing: [
    'Stronger written work',
    'More prepared strategy',
    'Cleaner use of records',
    'More focused attorney time',
  ],
  buildPaths: [
    'Brief Review + Revision Assistant',
    'Opposing Brief Issue Spotter',
    'Discovery Extraction Workflow',
    'Bad Faith Assessment Workspace',
    'Matter Memory / Case Wiki',
    'Local or Open-Weight AI Pilot',
  ],
  integrations: [
    { label: 'Practice mgmt', name: 'Clio' },
    { label: 'Drafting', name: 'Brief drafts' },
    { label: 'Opposition', name: 'Opposing briefs' },
    { label: 'Research', name: 'CoCounsel / Westlaw*' },
    { label: 'Records', name: 'Medical records' },
    { label: 'Extraction', name: 'OCR / PDFs' },
    { label: 'Claims files', name: 'Bad faith files' },
    { label: 'Model options', name: 'Cloud / local AI' },
  ],
  ownershipShape: [
    'How briefs are reviewed',
    'How unsupported assertions are spotted',
    'How records are extracted',
    'How bad faith issues are surfaced',
    'How matter memory is preserved',
    'How local and cloud AI are used responsibly',
  ],
  nextSteps: [
    'Schedule a product strategy session with the right people on your team',
    'Select the first draft brief and opposing brief workflow',
    'Confirm source files, privacy requirements, and model comfort level',
    'Map the review steps and attorney checkpoints',
    'Design the first prototype screens',
    'Quote the first build sprint',
  ],
}
