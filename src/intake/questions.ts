export type Section = { num: number; title: string }

export type MultiQ = {
  id: string
  type: 'multi'
  section: Section
  title: string
  subtitle?: string
  options: string[]
  maxSelect?: number
  includeOther?: boolean
  optional?: boolean
}

export type SingleQ = {
  id: string
  type: 'single'
  section: Section
  title: string
  subtitle?: string
  options: string[]
  includeOther?: boolean
  pipeFrom?: string // Q5 pipes from Q4
  followUp?: { triggerValue: string; label: string; placeholder?: string }
  optional?: boolean
}

export type RatingQ = {
  id: string
  type: 'rating'
  section: Section
  title: string
  subtitle?: string
  scale: number
  minLabel: string
  maxLabel: string
  tickLabels?: (string | null)[] // length = scale
  optional?: boolean
}

export type TextQ = {
  id: string
  type: 'text'
  section: Section
  title: string
  subtitle?: string
  placeholder?: string
  multiline?: boolean
  maxLength?: number
  optional?: boolean
}

export type Question = MultiQ | SingleQ | RatingQ | TextQ

const S = {
  built: { num: 1, title: 'Who should this be built around?' },
  solve: { num: 2, title: 'What should we solve first?' },
  docs: { num: 3, title: 'Document review + case intelligence' },
  motions: { num: 4, title: 'Motions bank + internal knowledge' },
  wiki: { num: 5, title: 'Internal wiki + project management' },
  client: { num: 6, title: 'Client experience' },
  systems: { num: 7, title: 'Systems + integrations' },
  security: { num: 8, title: 'Security + permissions' },
  success: { num: 9, title: 'Success + next step' },
} as const

export const questions: Question[] = [
  // ——— 1. Who should this be built around? ———
  {
    id: 'q1',
    type: 'multi',
    section: S.built,
    title: 'Who will be the primary people using this tool?',
    subtitle: 'Select all that apply. You can change your answers later.',
    options: [
      'Partners',
      'Associates',
      'Paralegals',
      'Firm administrator',
      'Intake team',
      'Billing or operations team',
      'Clients',
      'Not sure yet',
    ],
    includeOther: true,
  },
  {
    id: 'q2',
    type: 'multi',
    section: S.built,
    title: 'Who should be involved in the first product strategy session?',
    subtitle: 'Pick anyone who should be in the room.',
    options: [
      'Aaron',
      'Britt',
      'Sarah',
      'Paralegal team',
      'Associate team',
      'Operations / admin team',
    ],
    includeOther: true,
  },
  {
    id: 'q3',
    type: 'single',
    section: S.built,
    title: 'Who feels the pain of the current workflow most often?',
    options: [
      'Partners',
      'Paralegals',
      'Associates',
      'Admin / operations',
      'Clients',
      'Everyone in different ways',
      'Not sure yet',
    ],
  },

  // ——— 2. What should we solve first? ———
  {
    id: 'q4',
    type: 'multi',
    section: S.solve,
    title: 'Which areas feel most worth exploring first?',
    subtitle: 'Pick up to three.',
    options: [
      'Reviewing and summarizing large document sets',
      'Organizing case documents',
      'Finding factual gaps',
      'Preparing deposition questions',
      'Building a motions bank',
      'Creating a case intelligence wiki',
      'Creating an internal process wiki',
      'Automating routine client updates',
      'Task management / internal project management',
      'File naming, labeling, or exhibit prep',
      'Research support',
      'Timekeeping or billing visibility',
      'Replacing or reducing use of existing software',
    ],
    includeOther: true,
    maxSelect: 3,
  },
  {
    id: 'q5',
    type: 'single',
    section: S.solve,
    title: 'Of those, which one would create the most immediate value?',
    subtitle: 'We\u2019ll show the areas you chose above.',
    options: [],
    pipeFrom: 'q4',
  },
  {
    id: 'q6',
    type: 'single',
    section: S.solve,
    title: 'What kind of first sprint would feel most useful?',
    subtitle: 'Pick the shape that feels closest. We\u2019ll get more specific in the strategy session.',
    options: [
      'A tool that helps us review and understand documents faster',
      'A tool that helps us organize and retrieve firm knowledge',
      'A tool that helps us manage case workflow internally',
      'A tool that improves client communication',
      'A tool that connects a few existing systems into one place',
      'A prototype that helps us see what\u2019s possible before committing',
      'Not sure yet',
    ],
  },
  {
    id: 'q7',
    type: 'single',
    section: S.solve,
    title: 'Do you have a recent case or workflow that would make a good example for the first sprint?',
    options: [
      'Yes, we have a specific example',
      'Yes, but we need to choose the right one',
      'Not yet, but we can think of one',
      'No, we would rather start with a general workflow',
    ],
    followUp: {
      triggerValue: 'Yes, we have a specific example',
      label: 'Briefly describe the example.',
      placeholder: 'Matter name, client, or short description — just enough for us to recognize it in session.',
    },
  },

  // ——— 3. Document review + case intelligence ———
  {
    id: 'q8',
    type: 'multi',
    section: S.docs,
    title: 'What types of documents would this tool most likely need to help with?',
    options: [
      'Pleadings',
      'Motions',
      'Discovery responses',
      'Invoices',
      'Contracts',
      'Emails',
      'Deposition transcripts',
      'Exhibits',
      'Client records',
      'Research memos',
      'Case law',
      'Statutes',
      'Internal notes',
    ],
    includeOther: true,
  },
  {
    id: 'q9',
    type: 'multi',
    section: S.docs,
    title: 'What should the tool ideally help you do with documents?',
    options: [
      'Summarize documents',
      'Categorize documents',
      'Identify key facts',
      'Find missing information',
      'Spot factual gaps',
      'Find contradictions',
      'Build timelines',
      'Suggest deposition questions',
      'Identify strong and weak points',
      'Compare documents against an agreement or legal standard',
      'Label or rename files',
      'Prepare exhibit lists',
      'Pull source citations or references',
    ],
    includeOther: true,
  },
  {
    id: 'q10',
    type: 'single',
    section: S.docs,
    title: 'How large are the document sets you would want help with?',
    options: [
      'Fewer than 100 documents',
      '100 to 500 documents',
      '500 to 2,000 documents',
      '2,000 to 10,000 documents',
      '10,000+ documents',
      'It varies a lot',
      'Not sure',
    ],
  },
  {
    id: 'q11',
    type: 'single',
    section: S.docs,
    title: 'How important is source visibility?',
    subtitle: 'Meaning: should the tool show you where each answer came from?',
    options: [
      'Critical — every answer should point back to the source',
      'Important — but not every answer needs citations',
      'Helpful — but not essential for the first version',
      'Not sure yet',
    ],
  },
  {
    id: 'q12',
    type: 'multi',
    section: S.docs,
    title: 'What should the tool never do without human review?',
    subtitle: 'Tells us where to put explicit approval gates.',
    options: [
      'Send client communications',
      'File anything',
      'Finalize legal conclusions',
      'Create exhibits',
      'Rename or reorganize files',
      'Update case records',
      'Draft external-facing materials',
      'Make recommendations without showing sources',
    ],
    includeOther: true,
  },

  // ——— 4. Motions bank + internal knowledge ———
  {
    id: 'q13',
    type: 'rating',
    section: S.motions,
    title: 'How valuable would a motions bank be to the firm?',
    subtitle: 'A searchable library of prior motions, arguments, and fact patterns — reusable starting points from your own work.',
    scale: 5,
    minLabel: 'Not right now',
    maxLabel: 'Very valuable',
    tickLabels: ['Not right now', null, 'Would be nice', null, 'Very valuable'],
  },
  {
    id: 'q14',
    type: 'multi',
    section: S.motions,
    title: 'What would make a motions bank most useful?',
    options: [
      'Search by legal issue',
      'Search by fact pattern',
      'Search by case name',
      'Search by date',
      'Search by attorney',
      'Search by jurisdiction',
      'Search by outcome',
      'Search by motion type',
      'Search by judge',
      'Surface similar past work automatically',
      'Pull useful language or sections from prior work',
    ],
    includeOther: true,
  },
  {
    id: 'q15',
    type: 'multi',
    section: S.motions,
    title: 'Where does this prior work currently live?',
    options: [
      'Box',
      'PracticePanther',
      'Local folders',
      'Email',
      'Microsoft 365 / SharePoint / OneDrive',
      'Westlaw or research folders',
      'Personal attorney folders',
      'We know it exists but often cannot find it',
    ],
    includeOther: true,
  },

  // ——— 5. Internal wiki + project management ———
  {
    id: 'q16',
    type: 'single',
    section: S.wiki,
    title: 'Would an internal wiki be useful for the firm?',
    options: [
      'Yes — for case flow and internal processes',
      'Yes — for legal strategy and prior work',
      'Yes — for onboarding and training',
      'Maybe, but not a first priority',
      'No, probably not',
    ],
  },
  {
    id: 'q17',
    type: 'single',
    section: S.wiki,
    title: 'Would you want this tool to include task or project management features?',
    options: [
      'Yes — we want a place to manage tasks',
      'Yes — but only for AI-related workflows',
      'Maybe later, not in the first version',
      'No — we already have a task system that works',
      'Not sure',
    ],
  },
  {
    id: 'q18',
    type: 'multi',
    section: S.wiki,
    title: 'If task management is useful, what should it help with?',
    options: [
      'Assigning tasks to team members',
      'Tracking case-related tasks',
      'Tracking document review progress',
      'Creating tasks from emails or notes',
      'Creating tasks from AI findings',
      'Managing filing deadlines',
      'Managing client communication follow-ups',
      'Internal reminders',
      'Status visibility across the team',
    ],
    includeOther: true,
  },
  {
    id: 'q19',
    type: 'multi',
    section: S.wiki,
    title: 'How does the team currently track internal work?',
    options: [
      'PracticePanther',
      'Email',
      'Shared documents',
      'Box folders',
      'Spreadsheets',
      'Verbal updates',
      'Notes apps',
      'A project management tool',
      'We do not have one consistent system',
    ],
    includeOther: true,
  },

  // ——— 6. Client experience ———
  {
    id: 'q20',
    type: 'single',
    section: S.client,
    title: 'Should the first version focus only on internal use, or should we consider client-facing pieces too?',
    options: [
      'Internal only for now',
      'Mostly internal, but client communication matters',
      'Include light client-facing features',
      'We\u2019re interested in a client portal eventually',
      'Not sure yet',
    ],
  },
  {
    id: 'q21',
    type: 'multi',
    section: S.client,
    title: 'Which client experience improvements would be most valuable?',
    options: [
      'Faster filing updates',
      'Clearer status updates',
      'Drafted client emails for attorney review',
      'Easier record sharing',
      'Selected document access',
      'Matter status visibility',
      'Automated reminders',
      'A more premium client portal experience',
      'Not a priority right now',
    ],
    includeOther: true,
  },
  {
    id: 'q22',
    type: 'multi',
    section: S.client,
    title: 'What kinds of client updates happen often enough that they might be worth streamlining?',
    options: [
      'Filing updates',
      '\u201CFor your records\u201D emails',
      'Status check-ins',
      'Document requests',
      'Scheduling updates',
      'Discovery updates',
      'Billing or payment reminders',
      'Case milestone updates',
    ],
    includeOther: true,
  },

  // ——— 7. Systems + integrations ———
  {
    id: 'q23',
    type: 'multi',
    section: S.systems,
    title: 'Which systems would this tool potentially need to work with now or later?',
    options: [
      'Box',
      'PracticePanther',
      'Microsoft 365',
      'Outlook',
      'Gmail',
      'Westlaw',
      'Court filing systems',
      'Alpine Bank or payment records',
      'Local folders',
      'Internal databases',
      'Not sure yet',
    ],
    includeOther: true,
  },
  {
    id: 'q24',
    type: 'single',
    section: S.systems,
    title: 'Which system would create the most value if connected first?',
    options: [
      'Box',
      'PracticePanther',
      'Microsoft 365',
      'Outlook',
      'Westlaw',
      'Local files',
      'None — first version can be standalone',
      'Not sure yet',
    ],
    includeOther: true,
  },
  {
    id: 'q25',
    type: 'single',
    section: S.systems,
    title: 'Where would you prefer the first version to live?',
    options: [
      'Web app',
      'Internal desktop / local tool',
      'Mobile-friendly web app',
      'Private TestFlight app',
      'Not sure — recommend the best fit',
    ],
  },

  // ——— 8. Security + permissions ———
  {
    id: 'q26',
    type: 'single',
    section: S.security,
    title: 'What level of sensitivity should we assume for the first sprint?',
    options: [
      'Low — mostly internal process content',
      'Medium — some case-related content',
      'High — active client matters',
      'Very high — privileged or highly confidential materials',
      'Not sure yet',
    ],
  },
  {
    id: 'q27',
    type: 'single',
    section: S.security,
    title: 'Who should be able to access the first version?',
    options: [
      'Only Aaron',
      'Aaron and Britt',
      'Partners only',
      'Attorneys and paralegals',
      'Full internal team',
      'Certain users by matter',
      'Not sure yet',
    ],
  },
  {
    id: 'q28',
    type: 'single',
    section: S.security,
    title: 'How cautious should the first sprint be with live client data?',
    subtitle: 'Honest answers help us keep the first sprint safe.',
    options: [
      'Use sample or redacted data only',
      'Use old closed matter data',
      'Use limited active matter data',
      'Use live data if access is controlled',
      'Not sure — need your recommendation',
    ],
  },

  // ——— 9. Success + next step ———
  {
    id: 'q29',
    type: 'multi',
    section: S.success,
    title: 'What would make the first sprint feel successful?',
    subtitle: 'Pick up to three.',
    options: [
      'We can see a clear working prototype',
      'We understand what should be built first',
      'We save time on a real workflow',
      'We reduce tedious document review',
      'We improve how we find prior work',
      'We improve client communication',
      'We clarify what is technically possible',
      'We get a realistic build estimate',
      'The team gets excited about using it',
    ],
    includeOther: true,
    maxSelect: 3,
  },
  {
    id: 'q30',
    type: 'single',
    section: S.success,
    title: 'How quickly would you want to move after the design sprint?',
    options: [
      'As soon as the right first build is clear',
      'Within 30 days',
      'Within 60 to 90 days',
      'We want to move carefully and decide after design',
      'Not sure yet',
    ],
  },
  {
    id: 'q31',
    type: 'text',
    section: S.success,
    title: 'Anything else we should know before the strategy session?',
    subtitle: 'Optional — but anything you drop here saves us time in session one.',
    placeholder: 'Ideas, concerns, existing tools you hate, things you wish worked better, workflows that waste time, or anything that feels annoying enough to fix.',
    multiline: true,
    maxLength: 2000,
    optional: true,
  },
]
