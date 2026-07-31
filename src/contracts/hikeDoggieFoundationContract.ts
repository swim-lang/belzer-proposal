import { hikeDoggieContract } from './hikeDoggieContract'
import type { ContractData } from './types'

export const hikeDoggieFoundationContract: ContractData = {
  ...hikeDoggieContract,
  slug: 'hike-doggie-foundation',
  title: 'Operating Foundation + Training Prototype Engagement',
  preparedDate: 'July 31, 2026',
  agencySignedDate: 'July 31, 2026',
  timeline: 'approximately 3 weeks of active work',
  fee: '$12,000',
  paymentMilestones: [
    {
      amount: '$9,000',
      label: 'Due at project kickoff',
      body:
        'This reserves the project window and funds the concentrated discovery, source review, organization, design, agent usage, and prototype work required early in the engagement.',
    },
    {
      amount: '$3,000',
      label: 'Due at final Phase 2 delivery',
      body:
        'Due when the completed operating foundation, clickable prototype, editable source files, and organized handoff are delivered, subject to the client-delay terms in this Contract.',
    },
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Operating Foundation: Build the Source of Truth',
      price: '$5,500',
      timing: 'Weeks 1 to 2',
      includes: [
        'Full inventory and audit of the SOP materials made available during the Week 1 inventory window',
        'Delight Tree extraction and organization of identified spreadsheets, documents, and drives',
        'De-duplication, cleanup, and standardization of the approved SOP source set',
        'One editable SOP template with named owners and completion cadences',
        'Reformatting of the approved existing SOP library',
        'Review and mapping of selected CRM data and existing operational tools',
        'Sales-call recording, storage, and tracking workflow',
        'Initial aggregation of inquiries from Typeform and other approved sources where available access or exports permit',
        'Source-of-truth structure that may reference or link to approved third-party systems',
        'Baseline measurement definitions for training and SOP completion',
      ],
      deliverable:
        'One complete, consistent, portable operating foundation based on the approved source set, including the SOP inventory and library, editable template, ownership and cadence structure, call-tracking workflow, initial inquiry aggregation, data-source map, source-of-truth structure, and measurement definitions.',
    },
    {
      label: 'B',
      title: 'Training Prototype: Design and Prove the Experience',
      price: '$6,500',
      timing: 'Week 3',
      includes: [
        'Feature and workflow decisions workshop based on Phase 1 findings',
        'Prototype scope and core trainee and operator journeys',
        'Desktop and mobile screen and interaction design',
        'Real Hike Doggie SOP content flowed into the prototype',
        'Voice-capture concepts for notes, context, and task creation',
        'Email-draft concepts that require human review before sending',
        'Agent-supported SOP organization, assignment, review, and maintenance concepts',
        'Clickable prototype for team review and testing',
        'Prototype walkthrough, editable source files, and organized handoff',
      ],
      deliverable:
        'A usable, clickable desktop and mobile prototype built from the approved SOP and operating context, together with editable project files, a team walkthrough, and the information needed to evaluate a separately contracted production build.',
    },
  ],
  optionalSupport: [
    'Production app or web-platform development',
    'Product-venture formation, equity issuance, or operating-agreement preparation',
    'App Store preparation, submission, review, or distribution',
    'Production integrations, automated data syncing, hosting, AI usage, voice transcription, storage, or third-party subscriptions',
    'New SOP creation or substantial source materials added after the approved Week 1 inventory',
    'Ongoing SOP maintenance, content updates, training operations, or implementation support',
  ],
  sectionNine: {
    title: 'Client Content, Data, and Prototype Use',
    clauses: [
      {
        label: 'Client-Supplied Materials',
        body:
          'Hike Doggie represents that it has the right to provide the SOPs, CRM exports, inquiry data, recordings, credentials, documents, and other materials supplied for this engagement. Hike Doggie remains responsible for the accuracy, legality, safety, and operational use of its source material and final SOP content.',
      },
      {
        label: 'Limited Project Use',
        body:
          'Anchovies may access and process Client-supplied materials only as reasonably needed to perform this Contract. Anchovies will not use Hike Doggie confidential materials to train a public or generally available AI model.',
      },
      {
        label: 'Data-Source Boundary',
        body:
          'Phase 1 includes review, mapping, organization, and initial aggregation using available exports or reasonable access. Continuous production syncing, unavailable APIs, custom scraping, large-scale migration, new software development, and ongoing data operations are not included.',
      },
      {
        label: 'Prototype Boundary',
        body:
          'Phase 2 demonstrates approved voice, email-draft, SOP-agent, desktop, and mobile concepts through a design prototype. It is not production software and will not autonomously send communications, operate live agents, or connect continuously to production systems.',
      },
    ],
  },
  additionalTerms: [
    {
      title: 'Complete Phase 1 and Phase 2 Ownership',
      body:
        'Upon full payment of the $12,000 fee, Hike Doggie owns the project-specific inventory, audit, extracted and standardized SOP library, editable SOP template, measurement definitions, recording workflow documentation, data-source map, initial inquiry aggregation, source-of-truth structure, prototype screens and flows, clickable prototype, editable prototype source files, exports, and organized project files created under this Contract. Hike Doggie may use and repurpose those materials for its own business and clients. Anchovies retains only its pre-existing tools, methods, frameworks, and other Background IP, subject to the license in Section 8.4.',
    },
    {
      title: 'No Product Equity Included',
      body:
        'This Contract does not form a product venture, issue equity, transfer any interest in Hike Doggie, or authorize production app development. Signing this Contract does not obligate Hike Doggie, Kath Allen, or Bill Allen to proceed with the product venture or production build. Any future product partnership, production build, ownership arrangement, or App Store work requires a separate written agreement.',
    },
    {
      title: 'Schedule and Source Set',
      body:
        'The three-week estimate assumes timely access, decisions, source materials, consolidated feedback, and approvals. Client-side delays or substantial additions after the Week 1 source set is approved move delivery dates accordingly. Materially new sources or unavailable data may require a written change order.',
    },
  ],
}
