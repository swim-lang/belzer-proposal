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
  { num: '01', name: 'Listen', desc: 'Product strategy session with Aaron, Britt, and key stakeholders.' },
  { num: '02', name: 'Map', desc: 'Priority use-cases, feature hierarchy, user flow.' },
  { num: '03', name: 'Design', desc: 'Low-to-mid fidelity wireframes and interface direction.' },
  { num: '04', name: 'Estimate', desc: 'Technical considerations and development estimate for the first build.' },
  { num: '05', name: 'Build', desc: 'First sprint recommendation, scoped and ready to quote.' },
]

export const deliverables = [
  'Product strategy session',
  'Priority use-case mapping',
  'Feature hierarchy',
  'User flow',
  'Low-to-mid fidelity wireframes',
  'Interface direction',
  'First sprint recommendation',
  'Dev estimate for build',
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
  'Schedule a product strategy session with Aaron, Britt, and key team members',
  'Confirm the first-priority use case',
  'Map the workflow',
  'Design the key screens',
  'Review the prototype direction',
  'Quote the first build sprint',
]

export const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'sprint', label: 'Sprint' },
  { id: 'features', label: 'Features' },
  { id: 'security', label: 'Security' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]
