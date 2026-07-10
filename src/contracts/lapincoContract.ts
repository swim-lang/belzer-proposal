import type { ContractData } from './types'

export const lapincoContract: ContractData = {
  slug: 'lapinco',
  title: 'Brand, Messaging, Website, and Portal Readiness',
  preparedDate: 'June 8, 2026',
  agencySignedDate: 'June 8, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after this Contract is signed and the kickoff invoice is paid',
  timeline: '6 to 8 weeks',
  fee: '$20,000',
  client: {
    name: 'Villa CP',
    label: 'Client',
    contactName: 'Andre Navas',
  },
  agency: {
    name: 'Anchovies LLC',
    label: 'Agency',
    address: 'Colorado limited liability company',
  },
  paymentMilestones: [
    {
      amount: '$10,000',
      label: 'Due at project kickoff',
      body: 'Project starts when the kickoff invoice is paid.',
    },
    {
      amount: '$5,000',
      label: 'Due after identity presentation',
      body: 'Once the brand identity has been presented and approved.',
    },
    {
      amount: '$5,000',
      label: 'Due before final handoff',
      body: 'Before the final asset handoff and launch support.',
    },
  ],
  revisionRounds: [
    'Discovery and positioning: 1 round of revisions on the strategy summary, creative direction, and website structure recommendation.',
    'Brand identity: 2 rounds of refinement after the identity direction is presented.',
    'Messaging and copy direction: 1 round of refinement on the website messaging foundation and core language.',
    'Website design: 2 rounds of revisions on the website design direction.',
    'Website development: 1 round of implementation fixes before launch.',
    'Brand guide and final handoff: 1 round of cleanup edits before final asset delivery.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Discovery, positioning, and stakeholder alignment',
      price: '$2,500',
      timing: 'Week 1 to Week 2',
      includes: [
        'Founder and partner discovery',
        'Stakeholder input process',
        'Investment philosophy discussion',
        'Category and competitor scan',
        'Audience and stakeholder review',
        'Regulatory sensitivity discussion',
        'Website structure planning',
      ],
      deliverable:
        'A brand direction summary, creative moodboard, positioning and messaging foundation, and website structure recommendation.',
    },
    {
      label: 'B',
      title: 'Brand identity and visual system',
      price: '$7,000',
      timing: 'Week 3 to Week 4',
      includes: [
        'Primary logo and secondary lockup',
        'Symbol or brand mark',
        'Premium typeface selection and licensing guidance',
        'Color palette and graphic language',
        'Layout and art direction principles',
        'Motion direction',
        'Brand applications and mockups',
      ],
      deliverable:
        'A refined identity system that gives Lapinco a recognizable and repeatable design language across website, print, digital, and future investor-facing materials.',
    },
    {
      label: 'C',
      title: 'Messaging and copy direction',
      price: 'Included',
      timing: 'Week 3 to Week 6',
      includes: [
        'Brand narrative direction',
        'Positioning and investment philosophy language',
        'Website copywriting support',
        'Capabilities and team language',
        'Portfolio introduction language',
        'Contact and CTA language',
        'Messaging guidance for future materials',
      ],
      deliverable:
        'A clear messaging foundation that supports the website and gives Lapinco a more polished way to describe the firm, its approach, and its capabilities.',
    },
    {
      label: 'D',
      title: 'Website design and development',
      price: '$9,000',
      timing: 'Week 5 to Week 8',
      includes: [
        'Site strategy and architecture',
        'Homepage, About, Portfolio, and Contact pages',
        'Desktop and mobile design',
        'Responsive development',
        'Contact form and foundational SEO',
        'Basic analytics and launch support',
        'Subtle motion and interaction direction',
      ],
      deliverable:
        'A focused, polished website that gives Lapinco a stronger digital presence and a flexible foundation for future growth.',
    },
    {
      label: 'E',
      title: 'Investor portal readiness',
      price: 'Included',
      timing: 'Week 5 to Week 8',
      includes: [
        'Navigation planning for future portal access',
        'High-level portal integration considerations',
        'Site structure that accommodates secure login',
        'Design system decisions that extend into portal UI',
        'Recommendations for future portal planning',
        'Role-based access considerations',
        'CRM and back-office integration touchpoints',
      ],
      deliverable:
        'A public website and brand system that can support a future investor portal without forcing a major visual reset.',
    },
    {
      label: 'F',
      title: 'Brand guide and launch handoff',
      price: '$1,500',
      timing: 'Week 8',
      includes: [
        'Logo usage and system',
        'Color and typography rules',
        'Visual language and art direction',
        'Website direction and components',
        'Messaging guidance',
        'Exported logo and web-ready assets',
        'Template-ready files and launch handoff',
      ],
      deliverable:
        'A practical brand guide and organized asset handoff with logo usage, typography, color, visual language, and template-ready assets.',
    },
  ],
  optionalSupport: [
    'Investor portal strategy and working prototype',
    'Investor materials and pitch decks',
    'Project summary templates',
    'Fund or strategy overview documents',
    'Dubai office materials',
    'Digital reporting experiences',
    'Event or conference collateral',
    'Animated brand assets',
    'Investor workflow automation',
    'Internal knowledge tools',
    'Portal feature tooling and integrations',
  ],
  additionalTerms: [
    {
      title: 'Breef Payment Platform',
      body:
        'All payments under this Agreement are to be made through Breef Inc ("Breef"). Breef is a third party vendor acting as a "payment platform" for the purposes of this Agreement.',
    },
  ],
}
