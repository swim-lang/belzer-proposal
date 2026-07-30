import type { ContractData } from './types'

export const hikeDoggieContract: ContractData = {
  slug: 'hike-doggie',
  title: 'SOP Foundation + Training Prototype Engagement',
  preparedDate: 'July 30, 2026',
  agencySignedDate: 'July 30, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after this Contract is signed, the kickoff invoice is paid, and the initial materials and access are available',
  timeline: 'approximately 3 weeks of active work',
  fee: '$12,000',
  monthlyRetainer: '$1,500/month',
  client: {
    name: 'Hike Doggie',
    label: 'Client',
  },
  agency: {
    name: 'Anchovies LLC',
    label: 'Agency',
    address: 'Colorado limited liability company',
  },
  paymentMilestones: [
    {
      amount: '$9,000',
      label: 'Due at project kickoff',
      body: 'This reserves the working window and begins the labor-intensive SOP extraction, inventory, organization, and standardization work.',
    },
    {
      amount: '$3,000',
      label: 'Due at final Phase 2 delivery',
      body: 'Due when Anchovies presents the clickable prototype, walkthrough, build scope, and firm estimate as ready for review and handoff. This payment is not dependent on Hike Doggie approving or beginning a future app build, completing an internal rollout, or implementing the prototype.',
    },
  ],
  revisionRounds: [
    'SOP inventory and structure: 1 consolidated review round on the inventory, master template, owner fields, cadence fields, and proposed library structure.',
    'Standardized SOP library: 1 consolidated operational-accuracy pass on the reformatted source set identified during the Week 1 inventory.',
    'Training prototype: 2 focused refinement rounds after the core trainee journey and clickable prototype are presented.',
    'Build scope and estimate: 1 clarification and correction pass before final handoff.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'SOP Foundation: Extract, Organize, and Standardize',
      price: '$5,500',
      timing: 'Weeks 1 to 2',
      includes: [
        'Full inventory and audit of existing SOP materials made available during the Week 1 inventory window',
        'Delight Tree content extraction and organization of identified spreadsheets, documents, and drives',
        'De-duplication, cleanup, and general organization of the approved source set',
        'One consistent SOP structure and editable master template',
        'Reformatting of the existing SOP library identified in the approved inventory',
        'Named owner and completion cadence fields for each SOP',
        'Sales-call recording and storage workflow',
        'Baseline measurement definitions for training and SOP completion',
        'Organized handoff of the inventory, library, templates, and project-specific working files',
      ],
      deliverable:
        'One complete, consistent, portable SOP library based on the approved source set, together with its inventory, editable template, ownership and cadence structure, recording workflow, measurement definitions, and organized project files.',
    },
    {
      label: 'B',
      title: 'Training Prototype: Design the Real Experience',
      price: '$6,500',
      timing: 'Week 3',
      includes: [
        'Feature decisions workshop based on Phase 1 findings',
        'Prototype scope and core trainee journey',
        'Screen and interaction design across the approved journey',
        'Real Hike Doggie SOP content flowed into the prototype',
        'Clickable prototype for team review and testing',
        'Prototype walkthrough and handoff',
        'Editable, project-specific prototype source files and exports',
        'Build scope and firm estimate for any separately authorized production phase',
      ],
      deliverable:
        'A usable, clickable training prototype built from the approved SOP content, plus editable project files, a team walkthrough, and a firm scope and estimate for a possible future app build.',
    },
  ],
  optionalSupport: [
    'Agentic systems advisory at $1,500 per month, month to month, only if separately authorized in writing',
    'Production app, desktop experience, admin backend, integrations, beta testing, and deployment',
    'New SOP creation or substantial late-added source materials outside the approved Week 1 inventory',
    'Ongoing SOP maintenance, content updates, training operations, or implementation support',
    'Third-party platform subscriptions, software fees, hosting, or usage costs',
  ],
  subjectiveReviewTerms:
    'SOP organization, process design, information architecture, and prototype work involve professional judgment and iterative collaboration. Payment is for the professional time, process, and listed deliverables produced. Subjective dissatisfaction does not create a refund right or constitute breach, provided the Agency delivers the listed scope and offers the included review process.',
  sectionNine: {
    title: 'Client Content, Data, and Prototype Use',
    clauses: [
      {
        label: 'Client-Supplied Materials',
        body:
          'Hike Doggie represents that it has the right to provide the SOPs, documents, recordings, platform access, and other materials supplied for the project. Hike Doggie remains responsible for the operational, legal, safety, and factual accuracy of its source materials and final SOP content.',
      },
      {
        label: 'Project Use',
        body:
          'Anchovies may access and process Client-supplied materials only as reasonably needed to perform this Contract. Anchovies will not use Hike Doggie confidential materials to train a public or generally available AI model.',
      },
      {
        label: 'Prototype Boundary',
        body:
          'The Phase 2 deliverable is a design prototype and estimating document, not a production application. Production development, hosting, security, user accounts, integrations, deployment, and ongoing maintenance require a separate written agreement.',
      },
    ],
  },
  additionalTerms: [
    {
      title: 'Complete Project Ownership and Repurposing Rights',
      body:
        'Upon full payment, the project-specific inventory, audit, extracted and standardized SOP library, editable SOP template, measurement definitions, recording workflow documentation, prototype screens and flows, clickable prototype, editable prototype source files, build scope, estimate, exports, and organized project files are expressly included as Deliverables and Working Files transferred to Hike Doggie under Sections 8.2 and 8.3. Hike Doggie may use, modify, copy, distribute, sublicense, commercialize, and repurpose those materials for its own business or other clients. Except for the portfolio and case-study rights in Section 8.5, nothing created specifically for Hike Doggie is retained by or licensed back to Anchovies.',
    },
    {
      title: 'Embedded Background Tools',
      body:
        'Anchovies retains ownership only of pre-existing tools, methods, templates, code, frameworks, and third-party materials not created specifically for Hike Doggie. To the extent any such Background IP is embedded in a Deliverable, Hike Doggie receives a perpetual, worldwide, royalty-free license to use, modify, distribute, sublicense, and commercialize it as reasonably necessary to use and repurpose the Deliverables.',
    },
    {
      title: 'Schedule and Source Set',
      body:
        'The three-week estimate assumes timely access, decisions, consolidated feedback, and approvals from Hike Doggie. Client-side delays, unavailable materials, or substantial additions after the Week 1 inventory move the delivery dates accordingly. Materially new SOPs or repositories identified after the source set is approved may require a written change order.',
    },
    {
      title: 'Future Work Is Separate',
      body:
        'The $12,000 fee covers only Phase 1 and Phase 2. Advisory, production application development, desktop development, admin tools, integrations, beta deployment, hosting, and maintenance are not included and begin only through a separate written authorization.',
    },
  ],
}
