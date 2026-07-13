import type { ContractData } from './types'

export const avodahContract: ContractData = {
  slug: 'avodah',
  title: 'Search Foundation + Avodah Website Improvements',
  preparedDate: 'July 13, 2026',
  agencySignedDate: 'July 13, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after this Contract is signed and the kickoff invoice is paid',
  timeline: '9 to 11 weeks',
  fee: '$8,000',
  client: {
    name: 'Avodah Legal',
    label: 'Client',
    contactName: 'Ben Johnson',
  },
  agency: {
    name: 'Anchovies LLC',
    label: 'Agency',
    address: 'Colorado limited liability company',
  },
  paymentMilestones: [
    {
      amount: '$4,000',
      label: 'Due at project kickoff',
      body: 'This reserves the project window and begins the Search Foundation phase.',
    },
    {
      amount: '$4,000',
      label: 'Due at project completion',
      body: 'Due when Anchovies has completed the full contracted scope and presented the work as ready for final publishing and handoff.',
    },
  ],
  revisionRounds: [
    'Search Foundation: 1 focused review round on the findings, priority map, recommended architecture, and implementation roadmap.',
    'Blog design and article system: 1 round of refinement after the responsive blog and primary article direction are presented.',
    'Avodah site improvements: 1 consolidated round of refinement on the agreed practice-page, conversion-path, and technical changes.',
    'Article library: 1 consolidated attorney-review pass per scheduled content batch for factual and legal corrections. New topics or substantial direction changes are handled as added scope.',
    'Publishing and final QA: 1 round of cleanup edits before publishing and handoff.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Search Foundation',
      price: '$3,500',
      timing: 'Weeks 1 to 3',
      includes: [
        'Keyword, competitor, search result, and content-gap research across employment, traffic and criminal, and corporate work',
        'Technical and content audit of avodahlegal.com',
        'Public benchmark review of vaemploymentlawyers.com',
        'Search Console, analytics, inquiry, and lead-quality baseline using available first-party data',
        'Branded-search and audience architecture that protects Avodah as the primary firm experience',
        'Google Search, AI search, YouTube, and LinkedIn opportunity map',
        'Recommendation for what belongs on Avodah and what may later become a focused resource site',
        'Practice-area keyword and page map',
        'Content architecture and internal-linking plan',
        'Measurement plan, prioritized rollout map, and implementation roadmap',
      ],
      deliverable:
        'A research-backed opportunity map, recommended content and search architecture, measurement baseline, and prioritized implementation roadmap for Avodah.',
    },
    {
      label: 'B',
      title: 'Avodah Blog + Site Improvements',
      price: '$4,500',
      timing: 'Weeks 4 to 11',
      includes: [
        'Implementation based on the approved Search Foundation',
        'Blog strategy, responsive design, Framer development, CMS, and article templates',
        'Focused improvements to Avodah practice pages, conversion paths, and technical structure',
        'Fifty original, research-backed articles with source notes and attorney review',
        'Topic clusters, tags, search, and internal linking',
        'Listen to this article audio experience across the library',
        'Author and reviewer attribution, article schema, AI-search structure, and metadata',
        'Main Avodah Google Business Profile setup and Norfolk office addition once details are supplied',
        'Avodah-owned shared marketing account setup for platform access',
        'Analytics, inquiry events, responsive QA, and publishing',
      ],
      deliverable:
        'Avodah\'s first responsive blog and searchable article library, fifty attorney-reviewed articles, focused improvements to the existing site, and the measurement and publishing setup needed to launch the work.',
    },
  ],
  optionalSupport: [
    'Practice-Area Resource Site or other sister-site strategy, design, development, content, and launch',
    'Additional articles, pages, practice areas, or content libraries beyond the listed scope',
    'Ongoing SEO management, content production, reporting, or optimization after handoff',
    'YouTube, LinkedIn, social, or video production',
    'Paid media, paid links, sponsorships, or media placement',
    'Custom applications, advanced integrations, or premium software',
  ],
  additionalTerms: [
    {
      title: 'Attorney Review and Source Materials',
      body:
        'Avodah is responsible for timely attorney review and approval of legal content before publication. Avodah will provide reasonably requested access, source materials, office information, and one consolidated point of contact. Anchovies does not provide legal advice.',
    },
    {
      title: 'Search Outcomes',
      body:
        'The work is intended to improve the quality, structure, usefulness, and measurement of Avodah search content. Search rankings, traffic, leads, and business outcomes are not guaranteed.',
    },
    {
      title: 'Future Sister Site',
      body:
        'The Practice-Area Resource Site described in the proposal is not included in this Contract. Avodah may authorize that work later through a separate written agreement or change order with its own timing and payment schedule.',
    },
  ],
}
