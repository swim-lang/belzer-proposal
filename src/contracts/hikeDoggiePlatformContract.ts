import { hikeDoggieContract } from './hikeDoggieContract'
import type { ContractData } from './types'

export const hikeDoggiePlatformContract: ContractData = {
  ...hikeDoggieContract,
  slug: 'hike-doggie-platform',
  title: 'Operating Foundation + Training Platform Engagement',
  preparedDate: 'July 31, 2026',
  agencySignedDate: 'July 31, 2026',
  timeline:
    'approximately 3 weeks for Phases 1 and 2, followed by a production schedule confirmed from the approved prototype and targeted at approximately 6 to 8 weeks',
  fee: '$22,000 project value; $15,333.33 Client cash commitment',
  monthlyRetainer: undefined,
  paymentMilestones: [
    {
      amount: '$9,000',
      label: 'Due at project kickoff',
      body:
        'This kickoff payment reserves the working window and covers the substantial front-loaded work across source review, SOP extraction, organization, standardization, data mapping, and prototype preparation.',
    },
    {
      amount: '$3,000',
      label: 'Due at final Phase 2 delivery',
      body:
        'Due when Anchovies presents the clickable prototype, walkthrough, and approved production scope as ready for review and handoff. This payment is not dependent on beginning Phase 3.',
    },
    {
      amount: '$3,333.33',
      label: 'Due at Phase 3 kickoff',
      body:
        'This is Hike Doggie\'s cash contribution toward the $10,000 Phase 3 project value and is due when the partners authorize production development and the definitive product-venture documents described in Section 19 are signed. Sean Ashlow contributes the remaining $6,666.67 through discounted or uncompensated product-design and development services.',
    },
  ],
  revisionRounds: [
    ...hikeDoggieContract.revisionRounds,
    'Production platform: 2 consolidated quality-assurance and refinement rounds against the approved prototype and production scope.',
    'App Store submission: 1 initial submission package and 1 consolidated response cycle for review questions or corrections within the approved scope.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Operating Foundation: Build the Source of Truth',
      price: '$5,500',
      timing: 'Weeks 1 to 2',
      includes: [
        'Full inventory and audit of existing SOP materials made available during the Week 1 inventory window',
        'Delight Tree content extraction and organization of identified spreadsheets, documents, and drives',
        'De-duplication, cleanup, and standardization of the approved SOP source set',
        'One consistent SOP structure, editable master template, named owners, and completion cadences',
        'Review and mapping of selected CRM data, sales-call information, inquiries, and existing operational tools',
        'Sales-call recording and tracking workflow',
        'Inquiry aggregation plan for Typeform and other approved sources',
        'Source-of-truth architecture that may reference or connect approved third-party systems',
        'Baseline measurement definitions for training and SOP completion',
      ],
      deliverable:
        'One complete, consistent, portable SOP library based on the approved source set, together with its inventory, editable template, ownership and cadence structure, recording workflow, data-source map, source-of-truth architecture, and measurement definitions.',
    },
    {
      label: 'B',
      title: 'Training Prototype: Design and Prove the Experience',
      price: '$6,500',
      timing: 'Week 3',
      includes: [
        'Feature and workflow decisions workshop based on Phase 1 findings',
        'Prototype scope and core trainee and operator journeys',
        'Screen and interaction design for desktop and mobile',
        'Real Hike Doggie SOP content flowed into the prototype',
        'Voice-capture opportunities for notes, context, and task creation',
        'Email-draft workflows that require human review before sending',
        'Agent-supported SOP organization, assignment, review, and maintenance concepts',
        'Clickable prototype for team review and testing',
        'Prototype walkthrough, editable source files, and confirmed production scope',
      ],
      deliverable:
        'A usable, clickable desktop and mobile training prototype built from the approved SOP and operating context, together with editable project files, a team walkthrough, and the confirmed scope for Phase 3.',
    },
    {
      label: 'C',
      title: 'Production Platform: Build and Release',
      price: '$10,000 project value',
      timing: 'Approximately 6 to 8 weeks after Phase 2 approval',
      includes: [
        'Responsive production web platform for desktop and mobile',
        'Installable mobile web experience',
        'User access and agreed role controls',
        'SOP, assignment, and agent-management controls within the approved prototype scope',
        'Approved email-draft and voice-capture workflows',
        'Selected CRM, call, inquiry, or third-party data connections confirmed in the production scope',
        'Testing, launch preparation, and working beta',
        'iPhone packaging, App Store metadata preparation, initial submission, and one consolidated review-response cycle',
        'Production handoff and operating-cost summary',
      ],
      deliverable:
        'A working Hike Doggie platform available as a responsive desktop and installable mobile web app, plus an iPhone App Store submission when the product is eligible and ready. The web platform is the guaranteed production delivery; App Store acceptance remains under Apple control.',
    },
  ],
  optionalSupport: [
    'Additional App Store responses, resubmissions, or new features requested by Apple after the included response cycle',
    'Materially new integrations, unavailable APIs, custom data migration, or vendor-specific work not confirmed in the production scope',
    'Ongoing hosting, storage, AI model usage, voice transcription, messaging, analytics, and third-party subscriptions',
    'Ongoing product support, maintenance, feature development, or commercial operations after the stabilization window',
  ],
  subjectiveReviewTerms:
    'Operating-system design, agent workflows, prototypes, and production software involve professional judgment and iterative collaboration. Payment is for the professional time, process, and listed deliverables produced. Subjective dissatisfaction does not create a refund right or constitute breach, provided Anchovies delivers the listed scope and offers the included review process.',
  sectionNine: {
    title: 'Data, Agents, and Automated Workflows',
    clauses: [
      {
        label: 'Client Authority and Accuracy',
        body:
          'Hike Doggie represents that it has the right to provide the SOPs, CRM records, call data, inquiries, credentials, recordings, and other materials supplied for the project. Hike Doggie remains responsible for the accuracy, legality, safety, and operational use of its source material and final SOP content.',
      },
      {
        label: 'Limited Project Use',
        body:
          'Anchovies may access and process Client-supplied materials only as reasonably needed to perform this Contract. Anchovies will not use Hike Doggie confidential materials to train a public or generally available AI model.',
      },
      {
        label: 'Human Review',
        body:
          'Agent features may organize information, suggest SOP updates, transcribe voice input, extract actions, and prepare email drafts. Unless separately approved in writing after an operational and risk review, the system will not autonomously send external communications or make consequential operational decisions. Hike Doggie remains responsible for reviewing generated output before use.',
      },
      {
        label: 'Third-Party Processing',
        body:
          'Approved AI, voice, hosting, analytics, and integration providers may process data as required to operate selected features. Provider terms, privacy settings, retention options, and available security controls will be reviewed during production planning. No provider can be treated as risk-free or guaranteed continuously available.',
      },
      {
        label: 'Integration Conditions',
        body:
          'Connections to a CRM, Typeform, call systems, or other services depend on timely credentials, available APIs, vendor terms, data quality, and provider stability. Material migrations, unavailable APIs, custom scraping, or connectors added after production scope approval require a written change order.',
      },
    ],
  },
  additionalTerms: [
    {
      title: 'Ownership of Phase 1 and Phase 2 Work',
      body:
        'Upon full payment of the first $12,000, Hike Doggie owns the project-specific inventory, audit, extracted and standardized SOP library, editable SOP template, measurement definitions, recording workflow documentation, prototype screens and flows, clickable prototype, editable prototype source files, and organized project files created in Phases 1 and 2. Hike Doggie may use and repurpose those materials for its own business and clients. Anchovies retains only its pre-existing tools, methods, frameworks, and other Background IP, subject to the license in Section 8.4.',
    },
    {
      title: 'Separate Product Venture',
      body:
        'The parties intend to place the production platform and its commercial product rights in a separate venture owned in equal one-third interests by Sean Ashlow, Kath Allen, and Bill Allen. No interest in Hike Doggie itself is included. This Contract records the intended business structure but does not itself form an entity or issue equity. Before Phase 3 begins, all three intended owners will sign definitive documents prepared or reviewed by counsel covering formation, ownership, contributions, governance, voting, distributions, expenses, intellectual property, confidentiality, transfers, dilution, departures, deadlock, dissolution, and tax treatment.',
    },
    {
      title: 'Production Platform Ownership',
      body:
        'Subject to the definitive venture documents, project-specific production code, product designs, product documentation, and commercial platform assets created in Phase 3 will be assigned to the separate product venture after all required cash payments and contributions are completed. Hike Doggie retains a continuing right to use the platform for its own operations under terms established in the definitive venture documents. Pre-existing Background IP and third-party materials remain owned by their respective owners.',
    },
    {
      title: 'Development Contribution and Production Payment',
      body:
        'Phase 3 has a fixed project value of $10,000. Hike Doggie will pay $3,333.33 in cash at Phase 3 kickoff, and Sean Ashlow will contribute the remaining $6,666.67 through discounted or uncompensated product-design and development services. The intended owners acknowledge that these initial contributions are intentionally unequal while ownership remains equal at one-third each. The definitive venture documents will record these cash and in-kind contributions and state how any future capital or labor contributions are approved and treated.',
    },
    {
      title: 'Production Usage and Operating Costs',
      body:
        'The project fee includes Anchovies internal development tools and reasonable build-time testing usage. Production hosting, storage, AI model tokens, voice transcription, messaging, analytics, Apple Developer Program fees, and third-party API or software charges are operating expenses of the product venture or Hike Doggie, as the definitive documents provide. Actual usage can vary by feature, provider, model, data volume, and user activity. Anchovies will provide a reasonable prelaunch estimate, identify material recurring services, and configure practical usage controls where available. No substantial third-party expense will be incurred without written approval.',
    },
    {
      title: 'App Store Review and Fallback Delivery',
      body:
        'Anchovies will use commercially reasonable efforts to prepare and submit an eligible iPhone version and includes one consolidated response cycle within the approved scope. Apple alone controls App Store policy, review timing, requests, rejection, and acceptance. Anchovies does not guarantee acceptance and is not responsible for delay or rejection caused by Apple policy, account standing, Client content, legal or privacy requirements, business-model requirements, third-party services, or requested scope changes. Corrections required because the delivered software fails the approved production scope are included. New features, repeated review cycles, policy changes, or material rework are handled through a written change order. Phase 3 payment and production delivery are not contingent on App Store acceptance. If the app is delayed or rejected, the responsive, installable web app and desktop platform remain the completed delivery.',
    },
    {
      title: 'Client Accounts and Submission Materials',
      body:
        'Hike Doggie or the product venture will maintain the Apple Developer account and other production accounts, pay their fees, and timely provide entity information, agreements, privacy disclosures, support details, content rights, test credentials, and other materials required for review. Delays or deficiencies in those items extend the schedule and do not constitute Agency delay.',
    },
    {
      title: 'Schedule, Acceptance, and Stabilization',
      body:
        'The timing estimate assumes timely access, decisions, source materials, consolidated feedback, and approvals. Client, partner, vendor, or App Store delays move delivery dates accordingly. Phase 3 includes a 30-day stabilization period beginning when the production web platform is delivered. During that period, Anchovies will correct reproducible defects against the approved scope. New features, changed workflows, new integrations, and App Store requests outside the included response cycle are not stabilization work.',
    },
    {
      title: 'Counsel Review and Definitive Documents',
      body:
        'The parties acknowledge that the product venture introduces legal, tax, intellectual-property, privacy, and governance questions outside Anchovies creative and development services. Each intended owner may obtain independent legal and tax advice. The definitive venture documents control if they conflict with the business intent summarized in this Contract.',
    },
  ],
}
