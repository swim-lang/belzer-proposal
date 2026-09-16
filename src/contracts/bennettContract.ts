import type { ContractData } from './types'

// Draft only: no signature or invoice URL is supplied on behalf of either party.
export const bennettContract: ContractData = {
  slug: 'bennett',
  title: 'Brand Strategy, Naming, Identity, Website, and Launch Materials',
  draftOnly: true,
  preparedDate: 'September 16, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after this Contract is signed and the kickoff invoice is paid',
  timeline: 'approximately 5 to 7 weeks from kickoff, subject to the schedule confirmed after discovery and agreement on the website page inventory',
  fee: '$39,500',
  client: { name: 'Bennett Law Office', label: 'Client', contactName: 'Duncan McMullin and Thad Brinkman', email: 'McMullin@bennettlawofficepc.com' },
  agency: { name: 'Anchovies LLC', label: 'Agency', address: 'Colorado limited liability company' },
  paymentMilestones: [
    { amount: '$19,750', label: '50% at kickoff', body: 'To reserve the project and begin discovery.' },
    { amount: '$9,875', label: '25% at identity approval', body: 'After the identity presentation and approval.' },
    { amount: '$9,875', label: '25% before final handoff', body: 'Before final files are delivered and the website launches.' },
  ],
  revisionRounds: [
    'The Agency will present one developed creative direction and refine that direction with the Client, as described in the accepted proposal.',
    'Naming includes refinement with both partners before a final decision. No numerical limit on refinement rounds was specified in the proposal.',
    'Additional work or changes to the agreed scope will be priced and approved before proceeding.',
  ],
  contractOverrides: {
    milestonesEarned: 'Payment milestones follow Section 3: kickoff, identity presentation and approval, and before final handoff. This provision does not accelerate the identity-approval payment before approval.',
  },
  scopePhases: [
    {
      label: 'A', title: 'Brand strategy', price: '$3,000', timing: 'Week 1',
      includes: [
        'Discovery with both partners, including an in-person visit to Missoula',
        'Separate taste and moodboard input from each partner, followed by alignment',
        'Audience, competitor, and positioning review',
        'Core messaging, a short firm introduction, and guidance on tone',
      ],
      deliverable: 'A shared strategic foundation for the identity, website, and client experience.',
    },
    {
      label: 'B', title: 'Naming', price: '$3,000', timing: 'Weeks 1 to 3',
      includes: [
        'Naming criteria informed by the brand strategy',
        'Focused name exploration and a recommended name',
        'Supporting rationale and examples of the name in use',
        'Refinement with both partners before a final decision',
      ],
      deliverable: 'A recommended name with supporting rationale and examples. Final legal clearance and registration remain with the firm.',
    },
    {
      label: 'C', title: 'Brand identity', price: '$13,000', timing: 'Weeks 2 to 3',
      includes: [
        'Primary logo, secondary lockups, and supporting mark',
        'Typography, color palette, and supporting graphics',
        'Layout and image direction for consistent future materials',
        'One developed creative direction, presented in realistic applications',
        'Brand guidelines and organized logo and design assets',
      ],
      deliverable: 'A complete visual identity, refined together following discovery and presentation of one considered solution.',
    },
    {
      label: 'D', title: 'Website design & build', price: '$14,000', timing: 'Weeks 3 to 7',
      includes: [
        'Website structure and page inventory agreed during discovery',
        'Copywriting based on partner interviews and existing firm information',
        'Custom desktop and mobile design, followed by responsive development',
        'Service information, team profiles, and clear contact paths',
        'Contact forms, foundational SEO, analytics, testing, and launch support',
      ],
      deliverable: 'A tested, responsive website and launch support. The firm reviews service descriptions and legal content before launch. Custom portals, payment systems, and operational software are outside this engagement.',
    },
    {
      label: 'E', title: 'Launch materials & handoff', price: '$6,500', timing: 'Weeks 3 to 7',
      includes: [
        'Print-ready business card and letterhead designs',
        'Email signature system for the team',
        'Editable client welcome, process overview, and correspondence templates',
        'Social profile assets and reusable post templates',
        'Exterior sign and office entry artwork for vendor production',
        'Event and merchandise concepts for dealer, auction, and collector settings',
        'Organized final assets, editable templates, and a team walkthrough',
      ],
      deliverable: 'Stationery, client templates, social assets, and signage artwork are finished deliverables. Event and merchandise work is concept-level. Printing, fabrication, installation, and architectural services are separate.',
    },
  ],
  optionalSupport: [],
  additionalTerms: [
    { title: 'Included Travel', body: 'The $39,500 fixed project fee includes the Missoula discovery visit and associated agency travel. These included costs will not be billed separately under Section 4.' },
    { title: 'Timeline', body: 'The five-to-seven-week schedule is a target from kickoff to handoff, with overlapping work where practical. The schedule will be confirmed after discovery and agreement on the website page inventory. Partner availability, feedback, and content approvals affect timing. Signage fabrication, installation, and the office renovation follow their own schedules and do not need to hold up the website launch.' },
    { title: 'Third-Party Costs', body: 'Hosting, domains, paid licenses, printing, sign production, and other third-party costs are separate and will be identified before purchase. Additional work or changes to the agreed scope will be priced and approved before proceeding.' },
    { title: 'Legal Content', body: 'The Client is responsible for reviewing and approving service descriptions and legal content before publication, and for final legal clearance and registration of the name.' },
  ],
}
