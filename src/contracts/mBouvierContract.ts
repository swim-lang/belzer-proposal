import type { ContractData } from './types'

export const mBouvierContract: ContractData = {
  slug: 'm-bouvier',
  agencySignaturePending: true,
  requireSavedSubmission: true,
  title: 'Brand Identity and Nine-Page Website',
  preparedDate: 'October 1, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after both parties sign this Contract and the kickoff invoice is paid',
  timeline: 'approximately 5 to 7 weeks from kickoff to handoff, with the start date and schedule confirmed together',
  fee: '$9,900',
  depositHref: 'https://next.waveapps.com/a/invoices/5f3aecf9-dd9d-45fe-804f-bdcf03c3d6fe/public/2624248677186782877/9515bd4215d34381973f6796afe72418',
  client: { name: 'M. Bouvier Law', label: 'Client', contactName: 'Meaghan Bouvier', email: 'Meaghan.Bouvier@gmail.com' },
  agency: { name: 'Anchovies LLC', label: 'Agency', address: 'Colorado limited liability company' },
  paymentMilestones: [
    { amount: '$4,950', label: '50% at kickoff', body: 'To reserve the project and begin discovery.' },
    { amount: '$2,475', label: '25% at identity approval', body: 'After the identity presentation and approval.' },
    { amount: '$2,475', label: '25% before final handoff', body: 'Before final files are delivered and the website launches.' },
  ],
  revisionRounds: [
    'One developed creative direction, presented in realistic applications and refined together with the Client. No numerical limit on refinement rounds was specified in the accepted proposal.',
    'Website copy, design, and materials are reviewed with the Client within the agreed scope. Additional work or scope changes will be priced and approved before proceeding.',
  ],
  contractOverrides: {
    milestonesEarned: 'Payment milestones follow Section 3: kickoff, identity presentation and approval, and before final handoff. The identity-approval payment is not due before the Client approves the identity.',
  },
  scopePhases: [
    { label: 'A', title: 'Brand identity & everyday materials', price: '$4,000', timing: 'Discovery in Week 1, identity in Weeks 2 to 3, materials in Weeks 3 to 6',
      includes: ['A focused discovery conversation and visual moodboard to align on your story, taste, and the clients you want to serve', 'Primary logo, secondary lockup, and a supporting monogram or mark where appropriate', 'Typography, color palette, and a supporting graphic language', 'One developed creative direction shown across the website and printed materials, followed by refinement together', 'Print-ready business card design and editable letterhead and client correspondence template', 'One email signature, social profile image and cover, and three reusable social post templates', 'A concise brand guide covering logo, type, color, layout, and image use', 'Organized vector, print, and web logo files, plus editable templates'],
      deliverable: 'A complete identity, practical stationery and digital templates, concise brand guide, and organized vector, print, and web logo assets. Discovery is part of design. M. Bouvier Law is the agreed name; naming and a separate strategy engagement are not included.',
    },
    { label: 'B', title: 'Nine-page website, copy & launch', price: '$5,900', timing: 'Website and materials in Weeks 3 to 6, testing and launch in Weeks 5 to 7',
      includes: ['A nine-page structure, with clear paths for criminal defense, family law, and mediation', 'Concise copywriting for all nine pages, based on your interview, background, and approved service information', 'Custom desktop and mobile design, followed by responsive development', 'A firm introduction and approach that show who clients will work with directly', 'An Insights listing and reusable article template; ongoing article writing is separate', 'A contact form routed to your email, clear phone and email links, and a confirmation message', 'Foundational search setup: page titles, descriptions, headings, sitemap, and indexing', 'Analytics and Search Console setup using firm-owned accounts', 'Browser, mobile, form, and basic accessibility checks before launch', 'Domain connection, launch support, and a walkthrough for routine content updates'],
      deliverable: 'Nine responsive website pages with copy, an Insights listing and reusable article template, working contact form, foundational search setup, analytics, testing, domain connection, launch support, and a walkthrough for routine content updates.',
    },
  ],
  optionalSupport: [],
  additionalTerms: [
    { title: 'Website Page Outline', body: 'The proposed nine pages are Home, About the Firm, Criminal Defense, Family Law, Mediation, Working Together, Insights, FAQs, and Contact. Service labels and priorities will be confirmed before writing. Pages can be exchanged within the nine-page scope. Privacy and disclaimer text may sit within those pages or a shared footer panel. Separate legal or additional service pages may be exchanged within the nine pages or quoted separately. The reusable Insights article template is included; ongoing article writing is separate.' },
    { title: 'Timeline and Client Input', body: 'The five-to-seven-week schedule is a target, with overlapping work where practical. The parties will confirm the start date and schedule together. Timely feedback, approved copy, and access to the domain and selected photography support this schedule. The Client reviews credentials, services, and legal content before launch and provides approved privacy and disclaimer wording.' },
    { title: 'Third-Party Costs and Exclusions', body: 'Hosting, domains, paid licenses, photography production, printing, ongoing SEO, paid advertising, client portals, payment systems, and custom integrations are separate. Third-party costs will be identified before purchase. Additional work or changes to scope will be priced and approved before proceeding.' },
    { title: 'Agency Countersignature', body: 'The agency signature remains pending. Client submission does not sign on behalf of Anchovies or represent that Anchovies has countersigned. The effective date is the date both parties have signed.' },
  ],
}
