import type { ContractData } from './types'

export const emergencesLabsContract: ContractData = {
  slug: 'emergences-labs',
  title: 'Three-Brand Identity and Product Design System',
  preparedDate: 'August 6, 2026',
  agencySignedDate: 'August 6, 2026',
  effectiveDate: '[date both parties sign]',
  projectStart: 'after this Contract is signed and the kickoff invoice is paid',
  timeline: '6 weeks of active work',
  fee: '$45,000',
  client: {
    name: 'Emergences Labs',
    label: 'Client',
  },
  agency: {
    name: 'Anchovies LLC',
    label: 'Agency',
    address: 'Colorado limited liability company',
  },
  paymentMilestones: [
    {
      amount: '$22,500',
      label: 'Due at project kickoff',
      body:
        'This nonrefundable kickoff payment reserves the project window and begins discovery, alignment, creative strategy, and identity development.',
    },
    {
      amount: '$11,250',
      label: 'Due after written approval of the Emergences Labs master identity direction',
      body:
        'This milestone is not due while a no-cost creative reset under Section 6 remains in progress.',
    },
    {
      amount: '$11,250',
      label: 'Due before final handoff',
      body:
        'Due when the final identity family, product expression, Figma library, brand guide, and organized handoff are ready for delivery.',
    },
  ],
  revisionRounds: [
    'Discovery and alignment: one consolidated refinement round on the success criteria, family architecture, creative brief, and guided moodboard.',
    'Emergences Labs master identity: two structured refinement rounds are the standard path after the identity presentation.',
    'Creative reset assurance: if the master direction remains fundamentally wrong against the agreed brief and desired outcome, Anchovies will diagnose the miss, revisit the connecting big idea, and develop a materially distinct new territory at no additional creative fee.',
    'NeoWork and NeoHuman identities: two structured refinement rounds on the focused product identities after the Emergences Labs master identity is approved.',
    'Product expression and launch system: two consolidated refinement rounds across the representative product surfaces, templates, motion, mockups, and handoff system.',
  ],
  scopePhases: [
    {
      label: 'A',
      title: 'Discovery and creative strategy',
      price: '$5,000',
      timing: 'Week 1',
      includes: [
        'Founder and stakeholder working session',
        'Existing survey and reference synthesis',
        'Category and visual landscape audit',
        'Audience, product, and brand architecture review',
        'Success criteria and creative brief',
        'Guided interactive moodboard',
      ],
      deliverable:
        'A shared creative brief, success criteria, brand-family architecture, and visual alignment that define what the work must accomplish without prescribing its final form.',
    },
    {
      label: 'B',
      title: 'Emergences Labs master identity',
      price: '$17,500',
      timing: 'Weeks 2 to 4',
      includes: [
        'Connecting creative concept and narrative',
        'Primary logo or wordmark',
        'Ownable brand mark',
        'Responsive lockups and submarks',
        'Typography and color system',
        'Graphic, image, and editorial language',
        'One complete identity presentation',
        'Two structured refinement rounds as the standard path',
        'No-cost creative reset and materially distinct territory if the direction fundamentally misses the agreed outcome',
      ],
      deliverable:
        'One complete and approved master identity for Emergences Labs, built around a clear central idea and ready to guide the two product identities and every later expression.',
    },
    {
      label: 'C',
      title: 'NeoWork and NeoHuman identities',
      price: '$13,000',
      timing: 'Weeks 3 to 5',
      includes: [
        'Emergences Labs, NeoWork, and NeoHuman family architecture',
        'NeoWork product identity and logo system',
        'NeoHuman product identity and logo system',
        'Product-specific color, type, and graphic expression',
        'Digital design tokens and component direction',
        'Current product environment and backend software review',
        'Product-site homepage direction',
        'Assessment, results, dashboard, and learning-surface studies',
        'Representative navigation, forms, tables, cards, empty states, and notifications',
        'Responsive desktop and mobile product mockups',
        'Figma design system library',
      ],
      deliverable:
        'Two focused product identities and a representative digital expression system that feel distinct, useful, and unmistakably related to the Emergences Labs master brand.',
    },
    {
      label: 'D',
      title: 'Digital expression, launch, and handoff',
      price: '$9,500',
      timing: 'Weeks 5 to 6',
      includes: [
        'Research report or publication template',
        'Presentation deck template',
        'Social content starter system',
        'Profile and launch assets',
        'Email, event badge, signage, and document mockups',
        'Logo animation and two short motion studies',
        'Merchandise and event concepts',
        'Digital brand guide and asset library',
        'Team handoff session',
        '30 days of launch support',
      ],
      deliverable:
        'A broad launch-ready world, organized final files, editable templates, Figma library, brand guide, team handoff, and 30 days of support for small launch adjustments.',
    },
  ],
  optionalSupport: [
    'Full product UX architecture or additional product workflows',
    'Engineering, coded websites, or production software development',
    'Additional campaigns, applications, or collateral beyond the listed scope',
    'Ongoing design support after the included 30-day launch period',
  ],
  contractOverrides: {
    changeOrders:
      'A creative reset under Section 6 is included and is not an additional revision round or chargeable direction shift. A written change order applies only when the Client changes the approved scope, business strategy, product names, agreed brief, required deliverables, schedule, or decision-maker group in a way that causes material rework.',
    reviewWindow:
      'For each deliverable or deliverable set, the Client will provide one consolidated set of feedback within 10 calendar days of receipt. Approval of the Emergences Labs master identity must be express and in writing. Silence does not constitute approval of that master direction.',
    revisionDefinition:
      'The listed rounds describe the expected path, not a limit on the master identity assurance. Before written approval of the Emergences Labs master identity, the Agency will continue reasonable refinement or create a materially distinct territory at no additional creative fee when the presented direction fundamentally misses the agreed brief and desired outcome.',
    directionChanges:
      'If the first master identity direction fundamentally misses the agreed outcome, the Agency will begin with a reset conversation and written diagnosis of why it missed. The parties will revisit the problem, success criteria, and connecting big idea before the Agency develops a materially distinct new territory. The second approach will not simply recombine the same visual elements. After the Client approves the master identity in writing, a later request to replace that approved direction is handled through Section 5.',
    reviewTitle: 'Creative Direction Assurance',
    reviewTerms:
      'the Agency is confident it can reach an approvable master identity within the agreed brief. The two structured rounds are the standard path, but there is no additional creative fee or preset round cap before master identity approval while the Client provides timely, consolidated feedback from the agreed decision-makers and the scope and brief remain materially unchanged. The process continues until the Client approves the master direction or elects the direction-stage exit in Section 7.',
    projectContinuity:
      'No master identity direction is deemed accepted by silence. Once the Client approves the master identity in writing, the Agency may proceed with the product identities and remaining phases. Later requests to replace the approved master direction are treated as a direction change under Section 6.3.',
    terminationForConvenience:
      'The Client may terminate for any reason by written notice. Before written approval of the Emergences Labs master identity direction, the Client may end the engagement immediately through the direction-stage exit described below. The Agency may terminate only for material breach, nonpayment, unlawful requests, 30 consecutive days of Client inactivity after written notice, or mutual written agreement.',
    milestonesEarned:
      'The kickoff milestone is earned when work begins. The second milestone is earned only upon written approval of the Emergences Labs master identity direction. The final milestone is earned when the final handoff is ready. A milestone is not earned merely because work on a related phase has begun.',
    paymentOnTermination:
      'If the Client elects to end the engagement before written approval of the Emergences Labs master identity direction, the Agency retains the $22,500 kickoff payment and the Client owes no additional project fee. If termination occurs after written approval, the Client owes only milestones earned under Section 7.3 and preapproved, noncancellable expenses. No unearned future milestone becomes due solely because the Contract ends.',
    transferOfOwnership:
      'Upon full payment of all amounts then due, the Agency assigns to the Client all right, title, and interest in the project-specific Deliverables created through that date. If the Client uses the direction-stage exit, retention of the paid kickoff amount satisfies the payment condition for the project-specific work created through the termination date.',
    workingFiles:
      'At final handoff, or within 10 business days after a direction-stage exit, the Agency will provide the project-specific presentations, concepts, moodboards, briefs, and available source files created through that date in their then-current form. Pre-existing Agency tools, methods, templates, and licensed third-party materials remain Background IP.',
    portfolioRights:
      'After public launch, the Agency may display the final, selected Deliverables in its portfolio. The Agency will not publish, sell, repurpose, or use an unselected or abandoned territory, or any Client-confidential strategy or learning, for another client without the Client\'s written permission. General skills, methods, and experience remain Agency Background IP.',
  },
  sectionNine: {
    title: 'Naming and Trademark',
    clauses: [
      {
        label: 'Trademark Review',
        body:
          'The Client is responsible for legal trademark clearance, registration, and enforcement for Emergences Labs, NeoWork, NeoHuman, and all marks. The Agency does not provide legal advice or guarantee availability or registrability.',
      },
    ],
  },
  additionalTerms: [
    {
      title: 'Confirmed Three-Brand Scope',
      body:
        'The $45,000 project fee covers the complete three-brand engagement described in Section 18: the Emergences Labs master identity, the NeoWork identity, the NeoHuman identity, and the shared family and product expression system. This is not an Emergences Labs-only engagement.',
    },
    {
      title: 'Named Working Team and Primary Contact',
      body:
        'Sean Ashlow, Kira Knoop, and Logan Causey will remain the working Anchovies team throughout the engagement. Sean is the creative lead and the Client\'s primary Agency contact for email and meetings, and will remain directly involved in all regular client reviews and decisions. Additional team members may participate where helpful. Any permanent substitution of the named team requires the Client\'s written approval, except for temporary illness, emergency, or scheduling coverage disclosed to the Client.',
    },
    {
      title: 'Decision-Maker Continuity',
      body:
        'Anyone with final approval authority should participate in discovery and early visual alignment. The Client will designate one day-to-day lead and provide one consolidated response at each review. If new decision-makers or materially conflicting feedback require completed work to be restarted, the parties will first agree in writing on any resulting schedule or scope change.',
    },
    {
      title: 'Schedule if a Creative Reset Is Needed',
      body:
        'The six-week schedule is the target for the standard review path. If the Client requests a creative reset under Section 6, the parties will agree in writing on the additional time reasonably needed for diagnosis, a materially distinct territory, review, and refinement. The reset does not add a creative fee.',
    },
    {
      title: 'Specific Terms Control',
      body:
        'The creative direction assurance, approval-gated payments, direction-stage exit, ownership, confidentiality, and team commitments stated in this Contract are specific negotiated terms. If a general provision could reasonably be read to conflict with one of these specific terms, the specific term controls.',
    },
  ],
}
