import { TasteDemo, LightingDemo, ModernLeafTimeline } from './ModernLeafDemos'
import { useEffect, type ReactNode } from 'react'
const sections = [['outcomes','Outcomes'],['scope','Scope'],['experience','Added Experiences'],['work','Selected Work'],['timeline','Timeline'],['investment','Investment'],['next','Next Steps']]
const calendar = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const review = `mailto:sean@anchovies.agency?subject=${encodeURIComponent('Modern Leaf: proposal feedback')}`
const investment = [{label:'Brand strategy',amount:2000},{label:'Naming',amount:3500},{label:'Complete brand identity',amount:6500},{label:'Website, copy, and both releases',amount:5900},{label:'SEO & measurement',amount:2000}]
const total = investment.reduce((sum,item)=>sum+item.amount,0)
const money = (n:number) => '$'+n.toLocaleString('en-US')
const scope = [
  {
    "title": "Website improvements now",
    "intro": "A better first impression while we build the next chapter.",
    "items": [
      "A focused pass on the existing Squarespace homepage, gallery, services, about, and contact experience. Keep the current name and recognizable assets for this first release.",
      "Refine the strongest copy and imagery, simplify navigation, and clarify the paths for homeowners and builders or designers. Replace the $0 service-booking presentation with a considered consultation path.",
      "Improve mobile layouts, inquiry fields, page titles, and key calls to action. Test inquiry delivery and establish available analytics and Search Console baselines.",
      "Reuse suitable copy, project information, and inquiry planning in the final website. One consolidated refinement round before this release."
    ],
    "note": "Target: 7–10 business days from access and approved content. This is a focused improvement sprint on the current site, followed by the complete website below."
  },
  {
    "title": "Brand strategy",
    "intro": "Give the right clients a clear reason to choose you.",
    "items": [
      "In-person discovery and a shop visit with Stephanie and Dave, supported by a review of the business, strongest projects, and growth priorities.",
      "Positioning for luxury residential clients and professional partners, including the different reasons each audience chooses a cabinetry company.",
      "A focused competitor review, including Tharp and Three Creeks, alongside the European design references discussed in discovery.",
      "A positioning statement, short brand introduction, tagline, three core messages, and tone-of-voice guidance. Translate craftsmanship, custom capability, and reliable delivery into reasons to choose the business."
    ],
    "note": "A premium presence should communicate fit and confidence while remaining approachable to the builders and designers you want to work with."
  },
  {
    "title": "Naming",
    "intro": "Choose a name that can carry the business forward.",
    "items": [
      "Evaluate Modern Leaf against the agreed positioning, differentiation, pronunciation, and room for future growth.",
      "Collaborative naming moodboards to align on associations and personality before focused exploration.",
      "One recommended name presented with rationale and examples of it working alongside the identity.",
      "Initial domain and social-handle availability checks and preliminary screening for obvious conflicts. Refine the recommendation with your consolidated feedback."
    ],
    "note": "Naming is included, with the final decision informed by discovery. Legal clearance, trademark registration, company registration changes, and domain purchases are separate. Availability can change."
  },
  {
    "title": "Complete brand identity",
    "intro": "Make the quality of the work visible before the first conversation.",
    "items": [
      "Collaborative visual moodboarding followed by one developed creative direction, presented with the name, story, and real applications together.",
      "Primary logo, alternate lockup, supporting mark, typography, color palette, graphic language, and photography direction.",
      "Applications across the website, project presentation, signage, and a vehicle or trailer concept so the identity is tested beyond the logo.",
      "Print-ready business card design; editable letterhead and proposal-cover template; team email-signature design; social profile assets and four reusable social templates.",
      "Brand guidelines and organized vector, print, and digital assets, with a handoff walkthrough. Three consolidated rounds of refinement across strategy, naming, and identity."
    ],
    "note": "Signage and vehicle applications are concept mockups. Vendor-ready wraps, fabrication, printing, installation, photography production, and paid font or asset licenses are separate."
  },
  {
    "title": "Complete website and launch",
    "intro": "An online experience that matches the caliber of your cabinetry.",
    "items": [
      "Custom copy, desktop and mobile design, and development for eight core pages: Home, Residential, For Professionals, Projects, Process, About, Ideas, and Contact. Include standard privacy and confirmation pages using approved wording.",
      "A reusable project-story template populated with three approved projects. Show the setting, design decisions, distinctive details, and finished work rather than an unexplained image gallery.",
      "An editable Ideas section with an article template and two initial stories developed from your input. Give lighting, inventive storage, and future concepts a place to attract clients who share your vision.",
      "A guided inquiry path, content editing, analytics, browser and accessibility checks, launch support, and a recorded editing walkthrough.",
      "If the name or domain changes, map redirects, preserve useful URLs and search signals, and create a clear transition from the old identity. Keep the existing banner’s destination working and agree on phased replacement of physical materials."
    ],
    "note": "Eight core pages, three project stories, and two Ideas stories are the initial content allowance. Two consolidated website refinement rounds are included. We’ll confirm the platform and editing workflow before building; third-party subscriptions are separate."
  },
  {
    "title": "SEO & measurement",
    "intro": "Be easier to find. Know which visits become worthwhile conversations.",
    "items": [
      "Map service and location intent to the agreed pages, informed by competitor research and available Search Console data. Write titles, descriptions, headings, and internal links; check indexing, sitemap, canonical URLs, performance, and relevant structured data.",
      "Build crawlable service, project, and Ideas content. Review Google Business Profile consistency and prepare recommended updates. Plan redirects and monitor indexing if the name or domain changes.",
      "Track inquiry starts, completed inquiries, moodboard completion, and traffic sources with agreed consent settings. Provide a lead-review sheet for qualification, consultations, proposals, and won project value; keep private inquiry content out of analytics.",
      "Include a 30-day post-launch review, up to three small copy or call-to-action adjustments, and fixes for launch defects during that period. Judge progress by inquiry quality and consultation rates alongside visibility."
    ],
    "note": "Revenue reporting depends on your team recording outcomes. Ongoing content, link acquisition, paid advertising, monthly SEO, and extended optimization are separate. Agent-assisted work is reviewed by Anchovies before publication."
  }
]
const outcomes = [
  [
    "Attract better-fit projects",
    "Help more of the right homeowners, builders, and designers recognize that your level of custom work fits what they want to achieve."
  ],
  [
    "Give buyers a reason beyond price",
    "Make the craftsmanship, creative possibilities, and delivery experience easier to value before a bid is compared with another cabinet maker."
  ],
  [
    "Build confidence before a visit",
    "Use project stories, considered presentation, and guided discovery to make the experience more tangible before someone steps into the shop."
  ],
  [
    "Start better conversations",
    "Learn what matters to a prospective client earlier, so your team spends less time interpreting scattered references and correcting mismatched expectations."
  ],
  [
    "Turn attention into opportunity",
    "Give traffic from the banner, referrals, and search a clearer path toward a qualified consultation."
  ],
  [
    "Build a business that stands on its own",
    "Create a recognizable identity and repeatable communication tools that support growth beyond the founders and a future ownership transition."
  ]
]
const work = [
  [
    "Soft Hours",
    "Naming and identity for a premium restwear brand.",
    "https://anchovies.agency/work/soft-hours"
  ],
  [
    "Arc 88",
    "Identity and website for an industrial design studio.",
    "https://anchovies.agency/work/arc88"
  ],
  [
    "206",
    "Identity and website for an architecture studio.",
    "https://anchovies.agency/work/206"
  ],
  [
    "Seed",
    "A rebrand with motion for a storytelling company.",
    "https://anchovies.agency/work/seed"
  ],
  [
    "Within",
    "Naming and identity centered on personal wellbeing.",
    "https://anchovies.agency/work/within"
  ],
  [
    "Museum",
    "Naming and identity for a custom furniture maker.",
    "https://anchovies.agency/work/museum"
  ],
  [
    "Lex Politica",
    "Institutional character with contemporary clarity.",
    "https://anchovies.agency/work/lex-politica"
  ],
  [
    "Maven",
    "A contemporary identity and website for public affairs.",
    "https://anchovies.agency/work/maven"
  ],
  [
    "LTBa",
    "An architecture branding presentation.",
    "https://pitch.com/v/ltba-pitch-yyygha"
  ]
]
function Section({ id, number, title, children, dark = false }: { id: string; number: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-16 md:px-16 lg:px-[120px] lg:py-24 ${dark ? 'bg-ink text-paper' : ''}`}><span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>§ {number} · {title}</span><h2 id={`${id}-title`} className="display mb-10 mt-8 text-[48px] md:text-[72px]">{title}</h2>{children}</section>
}
export function ModernLeafProposal() {
 useEffect(()=>{document.title='Anchovies × Modern Leaf · Brand & Website';document.querySelector('meta[name="description"]')?.setAttribute('content','A phased branding and website proposal for Modern Leaf: naming, identity, search, and a more personal inquiry experience.')},[])
 return <div className="bg-paper text-ink">
 <a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
 <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm"><div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16"><a href="#overview" aria-label="Modern Leaf proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto"/><span className="hidden text-[13px] sm:inline">Anchovies × Modern Leaf</span></a><a href="#investment" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium hover:bg-ink hover:text-paper">View investment</a></div><nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">{sections.map(([id,label])=><a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}</nav></header>
 <main>
 <section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 md:py-24 lg:px-[120px]"><div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row"><span className="eyebrow text-ink-2">Prepared for Stephanie & Dave</span><span className="eyebrow text-ink-2">October 20, 2026</span></div><h1 className="display max-w-[1100px] pb-10 text-[56px] tracking-[-0.028em] sm:text-[80px] md:text-[104px] lg:text-[116px]">Bring the right projects to your door.</h1><div className="grid gap-8 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20"><p className="serif max-w-[640px] text-[30px] leading-[1.3] md:text-[38px]">A brand and website that show clients what your work makes possible.</p><div className="space-y-6"><p className="text-[15px] leading-7 text-ink-2">Your capabilities go well beyond standard cabinetry. From custom dimensions and materials to integrated lighting and inventive storage, the work deserves a presence that makes its value clear.</p><p className="text-[15px] leading-7 text-ink-2">We’ll improve the current website first, then develop the name, identity, and complete website thoughtfully. One engagement, two releases, and a more personal way to begin each client relationship.</p><p className="eyebrow">{money(total)} · 6–8 week target</p></div></div></section>
 <Section id="outcomes" number="01" title="Outcomes"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">{outcomes.map(([title,body])=><div key={title} className="border-t border-[var(--color-rule)] pt-6"><h3 className="serif mb-5 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div><p className="serif mt-12 max-w-[900px] text-[32px] leading-snug">The goal is more of the work you want, with clients who understand why it is worth choosing you.</p><p className="mt-5 max-w-[850px] text-[14px] leading-7 text-ink-2">These are the outcomes we’ll design toward and measure together. Results also depend on demand, project capacity, photography, and your sales follow-through; specific lead volumes, rankings, revenue, or a future sale value are not guaranteed.</p></Section>
 <Section id="scope" number="02" title="Scope"><p className="mb-10 max-w-[850px] text-[17px] leading-7 text-ink-2">Start making a stronger impression now. Build a distinctive brand and complete website for the longer term.</p>{scope.map(item=><div key={item.title} className="grid gap-6 border-t border-[var(--color-rule)] py-9 lg:grid-cols-[1fr_1.5fr] lg:gap-16"><div><h3 className="serif mb-4 text-[30px]">{item.title}</h3><p className="text-[15px] leading-7 text-ink-2">{item.intro}</p></div><div><ul className="list-disc space-y-4 pl-5 text-[15px] leading-7 text-ink-2">{item.items.map(x=><li key={x}>{x}</li>)}</ul><p className="mt-6 border-t border-[var(--color-rule)] pt-5 text-[13px] leading-6 text-ink-2">{item.note}</p></div></div>)}</Section>
 <Section id="experience" number="03" title="Added Experiences"><p className="serif mb-6 max-w-[850px] text-[34px] leading-snug">A little of the showroom experience, wherever your clients are.</p><p className="mb-12 max-w-[800px] text-[15px] leading-7 text-ink-2">Included in the engagement: a more personal way to discover a client’s taste, and a more vivid way to show what your work makes possible. These small previews illustrate the direction.</p>
 <div className="ml-experiences grid gap-12 lg:grid-cols-2"><div><TasteDemo/><h3 className="serif mb-4 mt-8 text-[32px]">Begin with their taste.</h3><p className="text-[15px] leading-7 text-ink-2">Clients choose the images that speak to them, bring their own references, and share what matters. You receive a visual brief, with an AI-assisted summary to review before the first conversation.</p><details className="ml-details"><summary>What’s included</summary><p>One guided consultation flow, up to six prompts and 24 curated images, inspiration links, up to five uploads, and project details. A saved private brief, team notification, simple staff view, and export are included. Original answers stay alongside the summary; inquiries still arrive if AI is unavailable. Include consent, basic spam protection, and agreed retention settings.</p><p>Clients can also make a simple inquiry. This is not a full portal, room planner, or automated quotation system. Board imports, CRM integration, and generated room renders are separate.</p></details></div>
 <div><LightingDemo/><h3 className="serif mb-4 mt-8 text-[32px]">Let the details come to life.</h3><p className="text-[15px] leading-7 text-ink-2">A quiet change in lighting can say more than a paragraph. One signature interaction will show how integrated light changes a space, supported by restrained motion throughout the website.</p><p className="mt-5 text-[13px] text-ink-2"><a href="https://heyoasis.com/" target="_blank" rel="noreferrer" className="underline underline-offset-4">Oasis: the reference from our conversation ↗</a></p><details className="ml-details"><summary>What’s included</summary><p>One approved scene with up to three lighting states, prepared from suitable supplied imagery. Lightweight transitions, mobile controls, and reduced-motion support. Illustrative treatments are labeled as concepts; this is not a lighting simulation, 3D configurator, or new photo/video production.</p><p>The editable Ideas section gives concepts like an architectural herb cabinet or inventive storage a home, clearly distinguished from completed work.</p></details></div></div></Section>
 <Section id="work" number="04" title="Selected Work"><p className="mb-10 max-w-[850px] text-[17px] leading-7 text-ink-2">A selection spanning architecture, furniture, lifestyle, and contemporary professional brands. Each shows a different way to make a business distinctive.</p><div className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">{work.map(([name,description,url])=><a key={name} href={url} target="_blank" rel="noreferrer" className="group border-t border-[var(--color-rule)] py-7"><h3 className="serif mb-3 text-[32px] group-hover:underline underline-offset-4">{name} <span aria-hidden="true">↗</span></h3><p className="text-[14px] leading-6 text-ink-2">{description}</p><span className="mt-5 block text-[12px] text-ink-2">{name==='LTBa'?'View architecture presentation':'View project'}</span></a>)}</div><a href="https://anchovies.agency/work" target="_blank" rel="noreferrer" className="mt-7 inline-block underline underline-offset-4">Explore all work, with filters for industry and style ↗</a></Section>
 <Section id="timeline" number="05" title="Timeline"><p className="serif mb-10 text-[36px]">6–8 weeks, with an earlier first release.</p><ModernLeafTimeline/><p className="mt-7 text-[14px] leading-7 text-ink-2">Timing starts once access and the initial content are ready. We’ll need approved photography, project details, prompt consolidated feedback, and timely naming decisions. Photography production, legal name review, and delayed approvals may move the launch date. We’ll agree on the schedule together at kickoff.</p></Section>
 <Section id="investment" number="06" title="Investment" dark><span className="eyebrow text-paper/60">Complete engagement</span><p className="display mb-7 mt-6 text-[76px] md:text-[112px]">{money(total)}</p><p className="mb-10 max-w-[850px] text-[17px] leading-7 text-paper/80">Brand strategy, naming, identity, and both website releases, including the guided taste-discovery tool, lighting interaction, search foundations, and 30-day review.</p>{investment.map(item=><div key={item.label} className="flex items-start justify-between gap-5 border-t border-paper/25 py-5"><span className="text-[15px]">{item.label}</span><span className="shrink-0 serif text-[25px]">{money(item.amount)}</span></div>)}<p className="mt-6 max-w-[900px] text-[14px] leading-7 text-paper/75">The guided consultation and lighting experience are included, with no separate project fee. We’ve made room in this fee for the early website sprint and the added experiences because we value the relationship and want to give the business a strong start. The allocation describes one connected engagement, rather than separate purchase options.</p><div className="mt-12 grid gap-8 md:grid-cols-3">{[['50%','At kickoff',total*.5],['25%','At identity approval',total*.25],['25%','Before final launch & handoff',total*.25]].map(([percent,label,amount])=><div key={label} className="border-t border-paper/25 pt-5"><span className="eyebrow text-paper/60">{percent} · {label}</span><p className="serif mt-4 text-[36px]">{money(amount as number)}</p></div>)}</div><p className="mt-10 max-w-[900px] text-[13px] leading-7 text-paper/70">Hosting, domains, AI/API usage, email delivery, paid fonts/assets, production photography, printing, fabrication, and legal services are separate. We’ll confirm the required services and recurring costs before purchase. Extra pages, integrations, new creative directions after approval, and ongoing support require an agreed scope and price.</p></Section>
 <Section id="next" number="07" title="Next Steps"><p className="serif mb-7 max-w-[850px] text-[36px] leading-snug">A stronger first impression now. A brand built for where you want to go.</p><p className="mb-9 max-w-[850px] text-[15px] leading-7 text-ink-2">Review the scope together, share your questions, and we’ll agree on the first release and kickoff date. The early website work gives us room to make the bigger brand decisions carefully.</p><div className="flex flex-wrap gap-4"><a href={review} className="rounded-full bg-ink px-6 py-4 text-[14px] text-paper">Share your thoughts</a><a href={calendar} target="_blank" rel="noreferrer" className="rounded-full border border-ink px-6 py-4 text-[14px]">Review the proposal together</a></div><p className="mt-10 text-[14px] text-ink-2">Sean Ashlow · Anchovies · <a href="mailto:sean@anchovies.agency" className="underline underline-offset-4">sean@anchovies.agency</a></p></Section>
 </main><footer className="px-6 py-8 text-[12px] text-ink-2 md:px-16">Prepared for Modern Leaf Woodworks · Anchovies · October 20, 2026</footer>
 </div>
}
