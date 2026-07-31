import { hikeDoggieContract } from './hikeDoggieContract'
import type { ContractData } from './types'

export const hikeDoggiePlatformContract: ContractData = {
  ...hikeDoggieContract,
  slug: 'hike-doggie-platform',
  title: 'Production Platform + Product Partnership Engagement',
  preparedDate: 'July 31, 2026',
  agencySignedDate: 'July 31, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart:
    'after the separate Phase 1 and Phase 2 engagement is completed, the prototype is approved, this Contract and the definitive product-venture documents are signed, the Phase 3 invoice is paid, and required production access is available',
  timeline: 'approximately 6 to 8 weeks of active production work after the project-start conditions are satisfied',
  fee: '$10,000 project value; $3,333.33 Client cash contribution',
  monthlyRetainer: undefined,
  paymentMilestones: [
    {
      amount: '$3,333.33',
      label: 'Due at production kickoff',
      body:
        'This is Hike Doggie\'s cash contribution toward the $10,000 production-platform value. Sean Ashlow contributes the remaining $6,666.67 through discounted or uncompensated product-design and development services. The payment is due only after the definitive product-venture documents are signed and the production phase is authorized.',
    },
  ],
  revisionRounds: [
    'Working production build: 2 consolidated quality-assurance and refinement rounds against the approved prototype and production scope.',
    'App Store submission: 1 initial submission package and 1 consolidated response cycle for review questions or corrections within the approved scope.',
    'Stabilization: correction of reproducible defects against the approved scope during the 30-day period after production web delivery.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Production Platform: Build and Release',
      price: '$10,000 project value',
      timing: 'Approximately 6 to 8 weeks',
      includes: [
        'Responsive production web platform for desktop and mobile based on the separately approved prototype',
        'Installable mobile web experience',
        'User access and agreed role controls',
        'SOP, assignment, and agent-management controls within the approved production scope',
        'Approved email-draft workflows that require human review before sending',
        'Approved voice-capture and transcription workflows',
        'Selected CRM, call, inquiry, or third-party data connections confirmed during production planning',
        'Testing, launch preparation, and working beta',
        'iPhone packaging, App Store metadata preparation, initial submission, and one consolidated review-response cycle',
        'Production handoff and operating-cost summary',
      ],
      deliverable:
        'A working platform available as a responsive desktop and installable mobile web app, plus an iPhone App Store submission when the product is eligible and ready. The web platform is the guaranteed production delivery; App Store acceptance remains under Apple control.',
    },
  ],
  optionalSupport: [
    'Any Phase 1 or Phase 2 SOP-foundation, source-of-truth, research, or prototype work',
    'Additional App Store responses, resubmissions, or new features requested by Apple after the included response cycle',
    'Materially new integrations, unavailable APIs, custom data migration, or vendor-specific work not confirmed in the production scope',
    'Ongoing hosting, storage, AI model usage, voice transcription, messaging, analytics, and third-party subscriptions',
    'Ongoing product support, maintenance, feature development, or commercial operations after the stabilization window',
  ],
  subjectiveReviewTerms:
    'Agent workflows and production software involve professional judgment, technical dependencies, and iterative collaboration. Payment is for the professional time, process, and listed deliverables produced. Subjective dissatisfaction does not create a refund right or constitute breach, provided Anchovies delivers the listed scope and offers the included review process.',
  sectionNine: {
    title: 'Data, Agents, and Automated Workflows',
    clauses: [
      {
        label: 'Authority and Accuracy',
        body:
          'Hike Doggie represents that it has the right to provide the SOPs, CRM records, call data, inquiries, credentials, recordings, prototype materials, and other content supplied for production. Hike Doggie remains responsible for the accuracy, legality, safety, and operational use of its source material.',
      },
      {
        label: 'Limited Product Use',
        body:
          'Anchovies may access and process supplied materials only as reasonably needed to perform this Contract. Anchovies will not use Hike Doggie confidential materials to train a public or generally available AI model.',
      },
      {
        label: 'Human Review',
        body:
          'Agent features may organize information, suggest SOP updates, transcribe voice input, extract actions, and prepare email drafts. Unless separately approved in writing after an operational and risk review, the system will not autonomously send external communications or make consequential operating decisions. Users remain responsible for reviewing generated output before use.',
      },
      {
        label: 'Third-Party Processing',
        body:
          'Approved AI, voice, hosting, analytics, and integration providers may process data as required to operate selected features. Provider terms, privacy settings, retention options, and available security controls will be reviewed during production planning. No provider can be treated as risk-free or guaranteed continuously available.',
      },
      {
        label: 'Integration Conditions',
        body:
          'Connections to CRM, Typeform, call systems, and other services depend on timely credentials, available APIs, vendor terms, data quality, and provider stability. Material migrations, unavailable APIs, custom scraping, or connectors added after production scope approval require a written change order.',
      },
    ],
  },
  additionalTerms: [
    {
      title: 'Separate Product Venture',
      body:
        'The parties intend to place the production platform and its commercial product rights in a separate venture owned in equal one-third interests by Sean Ashlow, Kath Allen, and Bill Allen. No interest in Hike Doggie itself is included. This Contract records the intended business structure but does not itself form an entity or issue equity. Before production begins, all three intended owners will sign definitive documents prepared or reviewed by counsel covering formation, ownership, contributions, governance, voting, distributions, expenses, intellectual property, confidentiality, transfers, dilution, departures, deadlock, dissolution, and tax treatment.',
    },
    {
      title: 'Production Platform Ownership',
      body:
        'Notwithstanding Section 8.2, and subject to the definitive venture documents, project-specific production code, product designs, product documentation, and commercial platform assets created under this Contract will be assigned to the separate product venture after required cash payment and contributions are completed. Hike Doggie retains the ownership of its separately created Phase 1 and Phase 2 materials and receives a continuing right to use the production platform for its operations under terms established in the definitive venture documents. Pre-existing Background IP and third-party materials remain owned by their respective owners.',
    },
    {
      title: 'Development Contribution and Production Payment',
      body:
        'The production platform has a fixed project value of $10,000. Hike Doggie will pay $3,333.33 in cash at production kickoff, and Sean Ashlow will contribute the remaining $6,666.67 through discounted or uncompensated product-design and development services. The intended owners acknowledge that these initial contributions are intentionally unequal while ownership remains equal at one-third each. The definitive venture documents will record these cash and in-kind contributions and state how future capital or labor contributions are approved and treated.',
    },
    {
      title: 'Production Usage and Operating Costs',
      body:
        'The project fee includes Anchovies internal development tools and reasonable build-time testing usage. Production hosting, storage, AI model tokens, voice transcription, messaging, analytics, Apple Developer Program fees, and third-party API or software charges are operating expenses of the product venture or Hike Doggie, as the definitive documents provide. Actual usage varies by feature, provider, model, data volume, and user activity. Anchovies will provide a reasonable prelaunch estimate, identify material recurring services, and configure practical usage controls where available. No substantial third-party expense will be incurred without written approval.',
    },
    {
      title: 'App Store Review and Fallback Delivery',
      body:
        'Anchovies will use commercially reasonable efforts to prepare and submit an eligible iPhone version and includes one consolidated response cycle within the approved scope. Apple alone controls App Store policy, review timing, requests, rejection, and acceptance. Anchovies does not guarantee acceptance and is not responsible for delay or rejection caused by Apple policy, account standing, supplied content, legal or privacy requirements, business-model requirements, third-party services, or requested scope changes. Corrections required because delivered software fails the approved production scope are included. New features, repeated review cycles, policy changes, or material rework require a written change order. Payment and production delivery are not contingent on App Store acceptance. If the app is delayed or rejected, the responsive, installable web app and desktop platform remain the completed delivery.',
    },
    {
      title: 'Accounts and Submission Materials',
      body:
        'Hike Doggie or the product venture will maintain the Apple Developer account and other production accounts, pay their fees, and timely provide entity information, agreements, privacy disclosures, support details, content rights, test credentials, and other materials required for review. Delays or deficiencies in those items extend the schedule and do not constitute Agency delay.',
    },
    {
      title: 'Schedule and Stabilization',
      body:
        'The timeline assumes an approved prototype, timely access, decisions, source materials, consolidated feedback, and approvals. Client, partner, vendor, or App Store delays move delivery dates accordingly. The engagement includes a 30-day stabilization period beginning when the production web platform is delivered. Anchovies will correct reproducible defects against the approved scope during that period. New features, changed workflows, new integrations, and App Store requests outside the included response cycle are not stabilization work.',
    },
    {
      title: 'Separate Foundation Engagement',
      body:
        'This Contract covers production development only. The SOP foundation, source-of-truth work, data review, inquiry aggregation, call-tracking setup, and design prototype are governed by a separate Phase 1 and Phase 2 agreement. Signing that agreement does not obligate Hike Doggie, Kath Allen, or Bill Allen to sign this Contract or proceed with the product venture.',
    },
    {
      title: 'Counsel Review and Definitive Documents',
      body:
        'The product venture introduces legal, tax, intellectual-property, privacy, and governance questions outside Anchovies creative and development services. Each intended owner may obtain independent legal and tax advice. The definitive venture documents control if they conflict with the business intent summarized in this Contract.',
    },
  ],
}
