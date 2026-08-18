import type { ContractData } from './types'

export const belzerSystemsContract: ContractData = {
  slug: 'belzer-systems',
  title: 'Belzer Firm Workflow Pilot Agreement',
  preparedDate: 'August 18, 2026',
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
  },
  agency: {
    name: 'Anchovies LLC',
    label: 'Agency',
    address: 'Colorado limited liability company',
  },
  paymentMilestones: [
    {
      amount: '$4,740',
      label: 'Due at project kickoff',
      body: 'This 60% payment reserves the project window and begins observation, technical setup, workspace configuration, and development.',
    },
    {
      amount: '$1,580',
      label: 'Due after approval of the first working version and core workflow',
      body: 'This 20% payment is due after Belzer Law approves the first working version and its core workflow.',
    },
    {
      amount: '$1,580',
      label: 'Due at team onboarding and pilot launch',
      body: 'This final 20% payment is due when the pilot is ready for team onboarding and launch.',
    },
  ],
  revisionRounds: [
    'First working version and core workflow: 1 consolidated feedback round after the initial working presentation.',
    'Pilot refinement and launch: 1 consolidated feedback round before team onboarding and pilot launch.',
    'A 30-day stabilization period after launch covers bugs and small launch adjustments within the agreed scope.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Belzer Firm Workflow Pilot',
      price: '$7,900',
      timing: 'Approximately six weeks',
      includes: [
        'Private, self-hosted firm workspace configured for Belzer Law',
        'One shared view of active matters, tasks, priorities, owners, dates, and items requiring review',
        'Firm contacts and matter relationships connected to relevant tasks, communications, dates, and files',
        'Selected email and calendar information brought into the workspace where access permits',
        'Connections or direct links to Box, PracticePanther, and other approved tools based on available integration methods',
        'Central firm memory for processes, templates, roles, decisions, recurring instructions, and approved matter context',
        'Voice or chat instructions converted into proposed tasks, assignments, follow-ups, and draft communications',
        'Email triage, action extraction, and reply drafts prepared with connected firm context and human review',
        'A review queue for agent-prepared work before it changes a calendar, sends a message, or creates an external action',
        'Deadline suggestions prepared from triggering dates and firm-approved rules, with the source and calculation visible',
        'Britt or attorney approval before any suggested deadline is added to a calendar',
        'A foundation for gradually bringing selected third-party workflows into the private workspace',
        'Focused workflow observation, configuration, two structured feedback rounds, team onboarding, and practical handoff',
        'A 30-day stabilization period for bugs and small launch adjustments',
      ],
      deliverable:
        'A working first release of Belzer Law\'s private firm workspace, configured around the agreed workflow and connected context, together with team onboarding and practical handoff.',
    },
  ],
  optionalSupport: [
    'Client-facing application or portal',
    'Motions bank or large document-review system',
    'Replacement of the firm\'s complete case-management, document-management, billing, or docketing systems',
    'Deeper integrations or migration of additional third-party workflows beyond the agreed first release',
    'Ongoing support, hosting, maintenance, subscriptions, or agent usage after the included stabilization period',
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
    reviewTitle: 'Pilot Review and Included Revisions',
    reviewTerms:
      'the Agency will deliver the listed pilot scope, provide two structured feedback rounds, and correct reproducible defects during the included stabilization period. Payment covers the professional time, implementation work, and project-specific deliverables produced. Requests beyond the agreed first release or included feedback rounds are handled through Section 5.',
    milestonesEarned:
      'The kickoff milestone is earned when work begins. The second milestone is earned after approval of the first working version and core workflow. The final milestone is earned when team onboarding and pilot launch are ready.',
    paymentOnTermination:
      'If the Contract is terminated, the Client will pay earned milestones and preapproved, noncancellable expenses through the effective termination date. No unearned future milestone becomes due solely because the Contract ends.',
    transferOfOwnership:
      'Upon full payment of all amounts due, the Agency assigns to the Client all right, title, and interest in the project-specific Deliverables and work product, including project-specific source code, configurations, documentation, and firm-specific system content created under this Contract.',
    workingFiles:
      'Project-specific source code, configuration files, implementation documentation, and organized handoff materials are included upon full payment. The Agency retains ownership of its pre-existing tools, reusable methods, general templates, frameworks, and other Background IP, subject to the license in Section 8.4.',
    portfolioRights:
      'Because the system may involve confidential firm operations, the Agency may share only a high-level, non-confidential description of the engagement after receiving the Client\'s written approval. Client data, matter information, internal workflows, screenshots, and private system details will not be used in the Agency\'s portfolio without written permission.',
  },
  sectionNine: {
    title: 'AI Systems, Firm Data, and Third-Party Services',
    clauses: [
      {
        label: 'Client Materials and Access',
        body:
          'Belzer Law represents that it has the right to provide the accounts, documents, data, templates, credentials, and other materials used for this engagement. Belzer Law remains responsible for the accuracy, legality, retention, and professional use of its information.',
      },
      {
        label: 'Human Review and Legal Responsibility',
        body:
          'The system prepares proposed work for human review. It does not provide legal advice, autonomous legal analysis, or legal research. No email, client communication, external action, or suggested legal deadline will be sent or published without review and approval by Britt or an attorney designated by Belzer Law.',
      },
      {
        label: 'Third-Party Services',
        body:
          'Anchovies is responsible for its own implementation work, but not for outages, policy or API changes, access restrictions, discontinued features, compatibility decisions, pricing changes, or other conduct of independent platforms such as Google, Microsoft, Box, PracticePanther, OpenAI, Anthropic, or similar providers. Anchovies will make reasonable efforts to adapt integrations within the agreed scope, but cannot guarantee third-party availability or permanent compatibility.',
      },
      {
        label: 'Accounts, Access, and Provider Costs',
        body:
          'Belzer Law will control its provider accounts and approve all access. No recurring monthly fee to Anchovies is included in the project fee. Any third-party software, hosting, storage, or agent subscription is contracted and paid for separately by Belzer Law.',
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
      title: 'Systems of Record and Integration Boundary',
      body:
        'Box, PracticePanther, Gmail, and existing calendars remain the systems of record unless the parties separately agree in writing to replace a specific function. Connections are limited to methods confirmed during technical setup. When a direct connection is not practical, the workspace may link to the applicable system and organize the work that must be completed there.',
    },
  ],
}
