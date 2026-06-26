import { defaultContent } from './content'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const choosePilotHref = 'mailto:sean@anchovies.agency?subject=Belzer%20Pilot%20Proposal'

const client = {
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

const proposal = {
  id: 'belzer-pilot',
  prepared: 'June 2026',
  preparedShort: 'June 2026',
  version: 'v2',
  kind: 'Focused Workflow Pilot',
}

const pricing = {
  sprintShort: '$3,500',
  sprintFull: '$3,500',
  sprintTimeline: '1 to 2 weeks',
  sprintTimelineLong: '1 to 2 weeks from kickoff, depending on the chosen pilot and access to materials.',
  buildRange: 'Quoted only after the pilot',
}

export const belzerPilotContent = {
  ...defaultContent,
  client,
  proposal,
  pricing,
  navSections: [
    { id: 'overview', label: 'Overview' },
    { id: 'heard', label: 'What We Heard' },
    { id: 'sprint', label: 'Pilot' },
    { id: 'features', label: 'Options' },
    { id: 'security', label: 'Controls' },
    { id: 'investment', label: 'Next' },
  ],
  nav: {
    ...defaultContent.nav,
    topMetaLeft: `Prepared for ${client.name}`,
    topMetaRight: [`Proposal · ${proposal.version}`, proposal.prepared],
    brandPair: `${defaultContent.agency.name} × ${client.name}`,
    ctaApprove: 'Choose a pilot',
    ctaHref: choosePilotHref,
  },
  hero: {
    ...defaultContent.hero,
    eyebrowSection: 'Section 01 / Proposal',
    eyebrowEmphasis: 'Belzer Law: Focused Workflow Pilot',
    eyebrowMetaLines: [`${client.name} · ${client.location}`, proposal.kind],
    headlineLines: ['Start with', 'one useful', 'workflow.'],
    subheadline:
      'Pick one painful workflow, prove the value, then decide what is worth building next.',
    body:
      'The first proposal showed the larger possibility. This version lowers the risk. Instead of asking Belzer Law to commit to a bigger system, we start with one practical pilot that produces a useful work product.',
    ctaPrimary: 'Choose a pilot',
    ctaPrimaryHref: choosePilotHref,
    ctaSecondary: 'Schedule a proposal review',
    ctaSecondaryHref: calendarHref,
    figLabelLeft: 'Fig. 01 / Pilot shape',
    figLabelRight: 'Four steps',
  },
  stages: [
    { label: 'Step 01', name: 'Choose', desc: 'Select the one workflow that feels most useful right now.' },
    { label: 'Step 02', name: 'Map', desc: 'Define the materials, users, decisions, and useful output.' },
    { label: 'Step 03', name: 'Make', desc: 'Create a practical pilot deliverable the team can review.' },
    { label: 'Step 04', name: 'Decide', desc: 'Use the result to decide what should happen next, if anything.' },
  ],
  whatWeHeard: {
    ...defaultContent.whatWeHeard,
    eyebrow: 'Section 02 / What we heard',
    headline: 'The next version needs to feel clearer, smaller, and easier to trust.',
    bodyParagraph:
      'The idea is interesting, but the first step needs to be more concrete. Belzer Law should know exactly what the pilot is meant to produce, how it helps the firm, and why it does not require a large software commitment upfront.',
    needsIntro: 'The pilot should answer a simpler question:',
  },
  needs: [
    'Which single workflow would create the clearest first win?',
    'What materials or examples should be used to prove it?',
    'What deliverable would Aaron, Britt, and the team actually review?',
    'What would make the work faster, clearer, or easier to explain?',
    'What should stay human, attorney-led, and carefully reviewed?',
    'What is worth building next only after the pilot proves itself?',
  ],
  pointOfView: {
    ...defaultContent.pointOfView,
    eyebrow: 'Section 03 / Our point of view',
    metaRight: `${defaultContent.agency.name} · Practical first step`,
    headline: 'Do one useful thing before deciding on a bigger system.',
    paragraphs: [
      'The strongest first move is not a platform. It is a focused pilot with a visible output.',
      'That pilot should be narrow enough to control and concrete enough to judge. It should help the team see whether this kind of work can save time, improve clarity, or create a better client experience.',
      'If the pilot is useful, the next step becomes easier to scope. If it is not useful, Belzer Law has not been pushed into a larger commitment.',
    ],
    pullQuoteLabel: 'Plain version',
    pullQuote: '"Start with one workflow that can earn its way into the firm."',
  },
  dashboardPreview: {
    ...defaultContent.dashboardPreview,
    eyebrow: 'Section 03b / Example output',
    headline: 'A pilot output, roughly pictured.',
    subheadline:
      'The exact format depends on the option Belzer chooses. The goal is a useful, reviewable work product, not a big system on day one.',
    urlBar: 'belzer-pilot.app / chosen-workflow',
    chromeBadge: 'Pilot',
    footnote:
      'Illustrative only. The pilot deliverable would be shaped around the selected option, available materials, and attorney review needs.',
  },
  dashboardMock: {
    matters: [
      { num: 'Pilot 01', type: 'Review', name: 'Document review set', status: 'Index, summaries, and issue tags', active: true, badge: null },
      { num: 'Pilot 02', type: 'Client', name: 'Matter update structure', status: 'Plain-English next steps', active: false, badge: null },
      { num: 'Pilot 03', type: 'Library', name: 'Motions bank sample', status: 'Reusable work organized', active: false, badge: null },
    ],
    strengths: [
      'The pilot has a defined input set and a defined output.',
      'Attorney review remains part of every important step.',
      'The result is small enough to judge before a larger build is discussed.',
    ],
    weaknesses: [
      'The pilot does not replace existing case management tools.',
      'The first pass depends on the quality and completeness of the materials provided.',
      'Any next build should be quoted only after this first result is reviewed.',
    ],
    docTypes: [
      ['Materials', 'Defined set'],
      ['Summaries', 'Drafted'],
      ['Tags', 'Reviewable'],
      ['Next step', 'Optional'],
    ],
    upcoming: [
      ['Pick pilot', 'Confirm the selected option', 'Step 01'],
      ['Gather materials', 'Share the working set', 'Step 02'],
      ['Review output', 'Discuss what worked', 'Step 03'],
    ],
    insights: [
      {
        label: 'Pilot boundary',
        tinted: true,
        confidence: 'Low-risk start',
        body: 'One selected workflow, one defined materials set, one useful deliverable for the team to review.',
        cta: 'Choose option',
        meta: 'Flat fee',
      },
      {
        label: 'Client clarity',
        body: 'The client-facing option turns complex matter updates into clearer explanations of what happened, what it means, and what comes next.',
        meta: 'Attorney review required',
      },
      {
        label: 'Reuse value',
        body: 'The motions library option helps organize prior work so strong arguments and useful language are easier to find later.',
        meta: 'Internal use',
      },
    ],
    searchPlaceholder: 'Search pilot outputs, issues, summaries...',
    newInsightsLabel: '3 pilot options',
    avatarInitials: 'AB',
    matterId: 'Pilot',
    caseTitle: 'Focused Workflow Pilot',
    caseMeta: [
      ['Price', '$3,500'],
      ['Timeline', '1 to 2 weeks'],
      ['Scope', 'One workflow'],
    ],
    status: 'Ready to choose',
    tabs: [
      { label: 'Options' },
      { label: 'Inputs' },
      { label: 'Output' },
      { label: 'Review' },
      { label: 'Next step', pulse: true },
    ],
    summaryMeta: 'Structured around one selected workflow',
    caseSummary:
      'The pilot is designed to produce one useful, reviewable deliverable. Belzer Law chooses the workflow, Anchovies maps the process, and the team reviews the output before any larger build is discussed.',
    documentCount: '1',
    documentSubLabel: 'One selected pilot',
    intelligenceUpdated: 'Pilot scoped first',
    intelligenceIntro:
      'A practical preview of how one workflow can become clearer, faster, or easier to explain.',
  },
  phaseOne: {
    ...defaultContent.phaseOne,
    eyebrowSection: 'Section 04 / Pilot',
    eyebrowEmphasis: 'One selected workflow',
    metaTimeline: pricing.sprintTimeline,
    metaPrice: pricing.sprintFull,
    headline: 'Focused Workflow Pilot.',
    bodyParagraphs: [
      'A small pilot for one selected workflow. We map the use case, review the available materials, create the pilot deliverable, and meet to decide whether it is useful enough to expand.',
      'This is meant to be concrete. Belzer Law should leave with something the team can look at, react to, and use to make a better decision about what should happen next.',
    ],
    figLabelLeft: 'Fig. 02 / Pilot process',
    figLabelRight: 'Four steps',
    deliverablesLabel: 'Deliverables',
    investmentLabel: 'Pilot fee',
    investmentValue: '$3,500',
    timelineLabel: 'Timeline',
    timelineValue: pricing.sprintTimelineLong,
    timelineNote: 'Timeline depends on access to materials and review availability.',
  },
  sprintSteps: [
    { num: '01', name: 'Pick', desc: 'Choose one of the three pilot options.' },
    { num: '02', name: 'Define', desc: 'Confirm the exact workflow, materials, and useful output.' },
    { num: '03', name: 'Create', desc: 'Build the pilot deliverable for review.' },
    { num: '04', name: 'Review', desc: 'Discuss what worked, what did not, and what is worth doing next.' },
  ],
  deliverables: [
    'One selected pilot track',
    'Workflow map',
    'Defined material set or example set',
    'Practical pilot deliverable',
    'Review meeting',
    'Clear next-step recommendation',
    'Credit promise if the pilot does not produce a useful agreed deliverable',
  ],
  featuresSection: {
    ...defaultContent.featuresSection,
    eyebrow: 'Section 05 / Three options',
    headline: 'Choose the first useful win.',
    subheadline:
      'Each option is intentionally narrow. The goal is to prove value through one clear deliverable before discussing a larger build.',
  },
  features: [
    {
      num: '01',
      name: 'Document Review + Exhibit Organizer',
      desc:
        'Outcome: turn a defined set of case materials into a clearer review workspace. Deliverables include a searchable document index, plain-language summaries, issue tags, key facts, and possible exhibit groupings. Value: a faster first pass through messy materials and less time spent hunting for what matters.',
    },
    {
      num: '02',
      name: 'Client Clarity System',
      desc:
        'Outcome: improve the client-facing experience around updates, decisions, next steps, and expectations. Deliverables include attorney-reviewed update templates, plain-English status summaries, next-step prompts, and a repeatable structure for explaining risks, costs, deadlines, and open questions. Value: clients feel more informed, less confused, and more confident in the process.',
    },
    {
      num: '03',
      name: 'Motions Bank / Case Knowledge Library',
      desc:
        'Outcome: organize Belzer Law past work into a searchable internal reference system. Deliverables include categorized motions, issue tags, reusable argument summaries, factual patterns, results where known, and reusable language candidates. Value: faster drafting, better reuse of strong work, and less time rebuilding from scratch.',
    },
  ],
  scope: {
    ...defaultContent.scope,
    eyebrow: 'Section 06 / Boundaries',
    headline: 'Keep the pilot useful and contained.',
    paragraphs: [
      'A lower-risk pilot only works if the boundary is clear. We choose one option, define one useful output, and keep the work focused enough to judge quickly.',
      'The pilot should not become a full platform build, a replacement for existing tools, or an open-ended technology engagement.',
    ],
    notFirst: {
      label: 'Not included',
      headline: 'Keep these outside the pilot.',
    },
    betterFirst: {
      label: 'Included',
      headline: 'Make one output clear.',
    },
  },
  notFirst: [
    'No full platform build included',
    'No replacement of PracticePanther, Box, or other core tools',
    'No integrations unless separately agreed',
    'No broad client portal',
    'No open-ended document universe',
    'No fully automated legal output',
  ],
  betterFirst: [
    'One selected pilot',
    'One defined workflow or document set',
    'One practical deliverable',
    'One review meeting',
    'One recommendation for what should happen next',
  ],
  security: {
    ...defaultContent.security,
    eyebrow: 'Section 07 / Controls',
    headline: 'Useful still needs to be careful.',
    intro:
      'Because the work may involve sensitive legal materials, the pilot should use only the materials Belzer Law chooses to share and should keep attorney review at the center.',
    considerationsLabel: 'Controls',
    closingQuote:
      'Human legal review remains required. The pilot helps organize and draft work for review. It does not replace legal judgment.',
  },
  securityConsiderations: [
    'Human legal review remains required',
    'Use only the agreed material set',
    'No-training model configurations where available',
    'Clear boundaries around what the pilot can access',
    'No client-facing output sent without attorney approval',
    'Future security or integration needs scoped only after the pilot',
  ],
  advantage: {
    ...defaultContent.advantage,
    eyebrow: 'Section 08 / Why this helps',
    metaRight: 'Smaller first step · Clearer value',
    headline: 'A small pilot can still create real leverage.',
    paragraphs: [
      'The value is not in having a big technology story. The value is in removing friction from work the firm already does.',
      'A document review pilot can make messy materials easier to navigate. A client clarity pilot can make the firm feel more responsive and easier to understand. A motions library can make strong prior work easier to reuse.',
      'Each option helps Belzer Law test the value through a concrete outcome instead of a vague promise.',
    ],
    pullQuoteLabel: 'Principle',
    pullQuote: '"Small enough to try. Useful enough to matter."',
    equation: ['One workflow', '+', 'clear output', '=', 'better decision'],
  },
  clientExperience: {
    ...defaultContent.clientExperience,
    eyebrow: 'Section 09 / Client experience',
    headline: 'One option is directly about what clients feel.',
    paragraphs: [
      'Some improvements happen behind the scenes. Faster review. Cleaner organization. Better reuse of past work.',
      'But the client clarity option is more visible. It helps translate legal progress into plain-English updates, clearer next steps, and more confidence in the process.',
    ],
    figLabelLeft: 'Fig. 03 / Internal work to client clarity',
    figLabelRight: 'Two sides',
    internalLabel: 'Inside the firm',
    internalHeadline: 'Cleaner workflow.',
    clientLabel: 'For the client',
    clientHeadline: 'Clearer experience.',
    closingNote:
      "This matches the promise Belzer Law already makes publicly: clients should feel heard, guided, and clear on what happens next.",
  },
  internalWorkflow: [
    'Faster first review',
    'Cleaner document organization',
    'Reusable prior work',
    'Better issue visibility',
  ],
  clientFacing: [
    'Clearer status updates',
    'Plain-English next steps',
    'Better deadline and risk explanations',
    'More confidence in the process',
  ],
  phaseTwo: {
    ...defaultContent.phaseTwo,
    eyebrowSection: 'Section 10 / After the pilot',
    eyebrowEmphasis: 'Only if the pilot proves useful',
    metaRight: 'Quoted after review',
    headline: 'Decide from evidence.',
    body:
      'After the pilot review, we can decide whether the selected workflow should become a larger tool, stay as a lightweight process, or stop there.',
    buildPathsLabel: 'Possible next steps',
    rangeLabel: 'Future work',
    rangeValue: 'Quoted later',
    rangeNote:
      'Any larger build is quoted only after the pilot shows what is useful, what Belzer Law actually wants, and what boundaries matter.',
    rangeDisclaimer: 'The pilot does not require a future build commitment.',
  },
  buildPaths: [
    'Expand the selected pilot',
    'Turn the output into a reusable internal tool',
    'Apply the same method to another workflow',
    'Keep the deliverable as a lightweight process',
    'Stop after the pilot if the value is not clear',
  ],
  integrationsSection: {
    ...defaultContent.integrationsSection,
    eyebrow: 'Section 11 / What this is not',
    headline: 'No big system required to start.',
    intro:
      'The pilot can be useful without connecting every system. If integrations become necessary later, they should be discussed only after the first workflow proves value.',
    figLabelLeft: 'Fig. 04 / Pilot boundary',
    figLabelRight: 'One workflow first',
    centerLabel: 'Pilot',
    centerName: 'Belzer Law',
    centerTagline: 'one selected workflow',
    mobilePossibleLabel: 'Future possibilities',
    footnote: 'Future integrations are optional and separately scoped.',
  },
  integrations: [
    { label: 'Materials', name: 'Defined file set' },
    { label: 'Review', name: 'Attorney approval' },
    { label: 'Output', name: 'Pilot deliverable' },
    { label: 'Optional later', name: 'PracticePanther' },
    { label: 'Optional later', name: 'Box' },
    { label: 'Optional later', name: 'Email workflows' },
    { label: 'Optional later', name: 'Client portal' },
    { label: 'Optional later', name: 'Internal tools' },
  ],
  ownership: {
    ...defaultContent.ownership,
    eyebrow: 'Section 12 / Why custom still matters',
    metaRight: 'Fit before scale',
    headline: 'The pilot should fit the way Belzer Law actually works.',
    introParagraph:
      'The point is not to add another generic tool. The point is to make one piece of work easier, clearer, or more repeatable in a way that fits the firm.',
    disclaimerLines: [
      'Not a giant first build.',
      'Not a chatbot for everything.',
      'Not a commitment to a larger system.',
    ],
    closingParagraph:
      'If the pilot works, the next step can be scoped with more confidence. If it does not, the experiment stays contained.',
    shapeLabel: 'A pilot shaped around',
    pullQuote: '"Fit comes before scale."',
  },
  ownershipShape: [
    'How the team reviews documents',
    'How clients understand progress',
    'How past motions become reusable',
    'How attorney review stays central',
    'How risk stays controlled',
    'How the next step gets decided',
  ],
  nextStepSection: {
    ...defaultContent.nextStepSection,
    eyebrowSection: 'Section 13 / Next step',
    eyebrowEmphasis: 'Choose one pilot',
    metaRight: `Prepared ${proposal.prepared}`,
    headline: 'Pick the first workflow.',
    bodyParagraphs: [
      'Belzer Law does not need to commit to a large platform to test the value. Choose one of the three pilot options, confirm the materials, and review the deliverable together.',
      'If the selected pilot does not produce a useful agreed deliverable, we will credit the pilot fee toward a revised pilot direction or the next agreed step.',
    ],
    stepsLabel: 'Next steps',
    investmentLabel: 'Pilot fee',
    investmentValue: '$3,500',
    timelineLabel: 'Timeline',
    timelineValue: '1 to 2 weeks',
    ctaPrimary: 'Choose a pilot',
    ctaPrimaryHref: choosePilotHref,
    ctaSecondary: 'Schedule a proposal review',
    ctaSecondaryHref: calendarHref,
  },
  nextSteps: [
    'Choose one pilot option',
    'Confirm the workflow and material set',
    'Review the pilot deliverable',
    'Decide whether anything should be built next',
  ],
  closing: {
    ...defaultContent.closing,
    eyebrow: 'Section 14 / Closing',
    metaRight: 'Lower risk, clearer outcome',
    headline: 'The first step should make the value obvious.',
    paragraphs: [
      'This proposal is intentionally smaller than the first version. The goal is not to sell Belzer Law a big system before the value is clear.',
      'The goal is to create one useful deliverable, review it honestly, and use that evidence to decide what should happen next.',
    ],
    bestPathLabel: 'The best path',
    bestPathSteps: ['Choose one workflow,', 'prove it through a real deliverable,', 'then decide from there.'],
    closingLine: 'Small first. Useful first. Clear next.',
  },
  footer: {
    ...defaultContent.footer,
    preparedFor: `Prepared for ${client.name}`,
    rightLines: [proposal.prepared, `Proposal · ${proposal.version}`],
  },
  approveScreen: {
    ...defaultContent.approveScreen,
    disabled: true,
    eyebrow: 'Pilot selected',
    headline: 'Start with one workflow.',
    confirmationLabel: '$3,500 pilot',
    confirmationBody:
      'This pilot covers one selected option, one defined workflow or material set, and one practical deliverable for review.',
    introLabel: 'What happens next',
    introBody:
      'Email the selected pilot, then we will confirm the materials, kickoff timing, and review path.',
    introNote:
      'If the pilot does not produce a useful agreed deliverable, the pilot fee is credited toward a revised pilot direction or the next agreed step.',
    preparedForValue: `${client.name} · ${client.location}`,
    ctaBack: 'Back to proposal',
    ctaIntake: 'Email selected pilot',
    intakeHref: choosePilotHref,
  },
}
