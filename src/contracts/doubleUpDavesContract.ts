import type { ContractData } from './types'

export const doubleUpDavesContract: ContractData = {
  slug: 'double-up-daves',
  title: 'Website Design and Development Engagement',
  preparedDate: 'August 6, 2026',
  agencySignedDate: 'August 6, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after this Contract is signed, the kickoff invoice is paid, and the initial content and access are provided',
  timeline: 'approximately 2 weeks',
  fee: '$2,400',
  client: {
    name: 'Double Up Daves',
    label: 'Client',
  },
  agency: {
    name: 'Anchovies LLC',
    label: 'Agency',
    address: 'Colorado limited liability company',
  },
  paymentMilestones: [
    {
      amount: '$1,440',
      label: 'Due at project kickoff',
      body: 'This 60% payment reserves the project window and begins website strategy, copywriting, design, and development.',
    },
    {
      amount: '$960',
      label: 'Due before launch',
      body: 'This 40% balance is due when the agreed website is launch-ready and before domain connection, public launch, and final handoff.',
    },
  ],
  revisionRounds: [
    'Website structure and content direction: 1 focused round of refinement on the sitemap, priority content, Device Finder structure, and calls to action.',
    'Website design and development: 1 consolidated round of refinement on the core page design and responsive experience.',
    'Launch-ready website: 1 round of cleanup edits and bug fixes before launch.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Website foundation and content',
      price: 'Included',
      timing: 'Week 1',
      includes: [
        'Website structure and content strategy',
        'Five-page sitemap: Home, Buy Sell Trade and Repair, Device Finder, About Dave, and Contact',
        'Conversion-focused copywriting across five pages',
        'Value proposition, outcomes, and offer language',
        'Founder-led story and trust signals',
        'Offer consultation as the business evolves',
        'Repair and partner-supported service framing',
        'Photography direction and priority shot list',
      ],
      deliverable:
        'An approved website structure, content direction, and page plan that clearly explains the offer and gives customers a useful next step.',
    },
    {
      label: 'B',
      title: 'Website design and development',
      price: '$2,400',
      timing: 'Week 1 to Week 2',
      includes: [
        'Responsive website design and development',
        'Home page',
        'Buy, Sell, Trade and Repair page',
        'Device Finder page',
        'About Dave page',
        'Contact page',
        'Device Finder with up to 30 priority entries',
        'Search, category, brand, and use-case filters',
        'Inquiry forms and calls to action',
        'Foundational on-page SEO',
        'Analytics and Search Console basics',
        'Responsive QA and launch support',
      ],
      deliverable:
        'A responsive, launch-ready five-page website that helps people find Double Up Daves, understand the value, and inquire about buying, selling, trading, repair, or sourcing.',
    },
  ],
  optionalSupport: [
    'Brand identity sprint',
    'SEO expansion and additional researched Device Finder entries',
    'Social media templates or ongoing social management',
    'Photography production, editing, or retouching',
    'Shopping cart, checkout, live inventory sync, or marketplace functionality',
    'Additional pages, templates, or product entry beyond the included scope',
    'Hosting, premium software, paid integrations, or other third-party services',
    'Ongoing website support, content production, paid media, or advanced SEO',
  ],
  contractOverrides: {
    reviewTitle: 'Website Review and Included Revisions',
    reviewTerms:
      'The Agency will deliver the listed website scope and provide the included revision process. Payment covers the professional time, process, and deliverables produced. Requests beyond the agreed scope or included revisions are handled through Section 5.',
    milestonesEarned:
      'The kickoff payment is earned when work begins. The final milestone is earned when the agreed website scope is launch-ready. Upon termination, the Client remains responsible for earned milestones, work performed through the termination effective date, and approved expenses.',
    paymentOnTermination:
      'If the Contract is terminated, the Client will pay for work performed and earned milestones through the termination effective date, plus preapproved, noncancellable expenses. No unearned future milestone becomes due solely because the Contract ends, and no refund is owed for completed work or time already spent.',
  },
  sectionNine: {
    title: 'Website Content and Launch',
    clauses: [
      {
        label: 'Client Content and Approvals',
        body:
          'The Client will confirm product facts, service details, availability, pricing, contact information, claims, and other business information before launch. The Client is responsible for the accuracy and legality of Client-supplied content and final approved website content.',
      },
      {
        label: 'Device Finder',
        body:
          'The Device Finder describes products, categories, and services that Double Up Daves works with or may be able to source. It does not represent live inventory and does not claim that every listed item is currently available.',
      },
      {
        label: 'Launch Dependencies',
        body:
          'The estimated schedule assumes timely access, materials, decisions, and consolidated feedback. Domain access, hosting access, third-party approvals, and Client delays may affect the launch date without changing when the final payment becomes due once the Agency scope is launch-ready.',
      },
    ],
  },
  additionalTerms: [
    {
      title: 'Third-Party Services and Costs',
      body:
        'Domain registration, hosting, paid fonts, stock assets, premium software, plugins, integrations, subscriptions, and other third-party costs are not included unless expressly listed in Section 18. The Client owns and pays for its continuing third-party accounts and services.',
    },
    {
      title: 'Search and Business Outcomes',
      body:
        'The work includes foundational on-page SEO and basic Search Console setup. Search rankings, indexing speed, traffic, inquiries, sales, and other business outcomes are not guaranteed.',
    },
    {
      title: 'Browser and Device Support',
      body:
        'The Agency will test the website in current major desktop and mobile browsers. Support for obsolete browsers, unsupported devices, or later third-party platform changes is outside the initial scope.',
    },
  ],
}
