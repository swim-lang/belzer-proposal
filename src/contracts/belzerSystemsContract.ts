import type { ContractData } from './types'

export const belzerSystemsContract: ContractData = {
  slug: 'belzer-systems',
  title: 'Firm Workflow Pilot Agreement',
  preparedDate: 'August 2026',
  agencySignedDate: 'August 18, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after this Contract is signed and the kickoff invoice is paid',
  timeline: 'approximately six weeks, with a first working version presented within 7 to 10 business days',
  fee: '$7,900',
  client: {
    name: 'Belzer Law',
    label: 'Client',
    address: '737 29th Street, Suite 100A, Boulder, CO 80303',
    contactName: 'Aaron Belzer',
    email: 'aaron@belzerlawfirm.com',
  },
  agency: {
    name: 'Anchovies LLC',
    label: 'Agency',
    address: 'Colorado limited liability company',
  },
  paymentMilestones: [
    {
      amount: '$4,740',
      label: 'Due at kickoff',
      body: 'This 60% payment begins the pilot and reserves the working period.',
    },
    {
      amount: '$1,580',
      label: 'Due after approval of the first working version and core workflow',
      body: 'This 20% payment is due after the Client approves the first working version and core workflow.',
    },
    {
      amount: '$1,580',
      label: 'Due at team onboarding and pilot launch',
      body: 'This final 20% payment is due when the team onboarding and pilot launch are ready.',
    },
  ],
  revisionRounds: [
    'First working version: 1 consolidated feedback round after the initial workspace and core workflow are presented.',
    'Pilot completion: 1 consolidated feedback round covering the approved workflow, team onboarding, and practical handoff.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Belzer Firm Workflow Pilot',
      price: '$7,900',
      timing: 'Approximately six weeks',
      includes: [
        'Private, self-hosted firm workspace configured for Belzer Law',
        'Shared view of active matters, tasks, priorities, owners, dates, and items requiring review',
        'Firm contacts and matter relationships connected to relevant tasks, communications, dates, and files',
        'Selected email and calendar information brought into the workspace where access permits',
        'Connections or direct links to Box, PracticePanther, and other approved tools based on available integration methods',
        'Central firm memory for processes, templates, roles, decisions, recurring instructions, and approved matter context',
        'Voice or chat instructions converted into proposed tasks, assignments, follow-ups, calendar items, and draft communications',
        'Email triage, action extraction, and reply drafts prepared with connected firm context and human review',
        'Review queue for agent-prepared work before any external action',
        'Deadline suggestions with visible sources and calculations, subject to Britt or attorney approval',
        'Workflow observation, configuration, team onboarding, practical handoff, and 30 days of stabilization support',
      ],
      deliverable:
        'A working first release that gives Belzer Law one shared view of active work and connected context, with agent-prepared tasks, follow-ups, drafts, and deadline suggestions held for human review.',
    },
  ],
  optionalSupport: [
    'Client-facing application',
    'Motions bank or broad case-knowledge library',
    'Large document-review engine',
    'Complete replacement of case-management, document-management, billing, or docketing systems',
    'Deeper integrations or new workflows beyond the agreed pilot',
    'Ongoing support after the included 30-day stabilization period',
  ],
  contractOverrides: {
    changeOrders:
      'New workflows, additional systems, deeper integrations, accelerated timing, or work that materially expands the agreed pilot will be handled through a written change estimate approved by the Client before work begins.',
    reviewWindow:
      'The Client will provide one consolidated set of feedback within 10 calendar days of each structured review. If the Client needs more time, the parties may adjust the schedule in writing.',
    revisionDefinition:
      'Revisions refine the agreed workspace and core workflow. A new workflow, new system, or material expansion is handled through Section 5.',
    directionChanges:
      'If the Client requests a materially different system direction after approving the core workflow, the parties will confirm the resulting scope, timing, and cost in writing before that work begins.',
    reviewTitle: 'Technical Functionality and Third-Party Limitations',
    reviewTerms:
      'the Agency will deliver the project-specific work described in Section 18 and correct reproducible defects during the included stabilization period. The Agency does not guarantee uninterrupted operation or permanent compatibility of independent third-party services, and does not guarantee a particular business, legal, or efficiency outcome.',
    milestonesEarned:
      'The kickoff milestone is earned when work begins. The second milestone is earned after approval of the first working version and core workflow. The final milestone is earned when team onboarding and pilot launch are ready.',
    paymentOnTermination:
      'If the Contract is terminated, the Client will pay earned milestones and preapproved, noncancellable expenses through the effective termination date. No unearned future milestone becomes due solely because the Contract ends.',
    transferOfOwnership:
      'Upon full payment of all amounts due, the Agency assigns to the Client all right, title, and interest in the project-specific Deliverables, including project-specific source code, configurations, documentation, and firm-specific system content created under this Contract.',
    workingFiles:
      'Project-specific source code, configuration files, implementation documentation, and handoff materials are included. The Agency retains ownership of its pre-existing tools, reusable methods, general templates, and other Background IP, subject to the license in Section 8.4.',
    portfolioRights:
      'Because the system may involve confidential firm operations, the Agency may share only a high-level, non-confidential description of the engagement after receiving the Client\'s written approval. Client data, matter information, internal workflows, screenshots, and private system details will not be used in the Agency\'s portfolio without written permission.',
  },
  sectionNine: {
    title: 'AI Systems and Third-Party Services',
    clauses: [
      {
        label: 'Human Review and Legal Responsibility',
        body:
          'The system prepares proposed work for human review. It does not provide legal advice or autonomous legal analysis. No client communication, external action, or legal deadline will be sent or published without the Client\'s review and approval.',
      },
      {
        label: 'Third-Party Services',
        body:
          'The Agency is responsible for its own implementation work, but is not responsible for outages, policy or API changes, access restrictions, discontinued features, compatibility decisions, pricing changes, or other conduct of independent platforms such as Google, Microsoft, Box, PracticePanther, OpenAI, Anthropic, or similar providers. The Agency will make reasonable efforts to adapt agreed integrations within scope, but cannot guarantee third-party availability or permanent compatibility.',
      },
      {
        label: 'Accounts, Access, and Provider Costs',
        body:
          'The Client will control its provider accounts and approve all access. No recurring monthly fee to Anchovies is included in the project fee. Any third-party software, hosting, storage, or AI-agent subscription is contracted and paid for separately by the Client.',
      },
    ],
  },
  additionalTerms: [
    {
      title: 'Proposal Alignment',
      body:
        'This Contract implements the Belzer Firm Workflow Pilot accepted by Aaron Belzer. The total investment, payment schedule, approximately six-week timeline, first working version, two structured feedback rounds, and 30-day stabilization period match the accepted proposal.',
    },
    {
      title: 'Systems of Record',
      body:
        'Box, PracticePanther, Gmail, and existing calendars remain the systems of record unless the parties separately agree in writing to replace a specific function. When a direct connection is not practical, the workspace may link to the applicable system and organize the work that must be completed there.',
    },
  ],
}
