import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'
import './corrigan-ussery.css'
const outcomes = [
 ['Confirm the referral','When someone hears your names, give them a clear, credible place to verify the team, experience, and relationships behind the recommendation.'],
 ['Represent the firm accurately','Make the depth of your work visible without burying visitors in detail. Make your defense-focused government affairs and lobbying expertise clear, supported by approved credentials and client relationships.'],
 ['Remove doubt from the first impression','Present the same care and judgment online that clients expect from you in person. Clear content, disciplined design, and reliable performance should reinforce confidence.'],
 ['Make room for the right opportunities','Give prospective clients and partners enough information to recognize a relevant fit and start a conversation. Measure how people use the site so future decisions rest on evidence.'],
]
const pages = [
 ['Home','A concise introduction to your government affairs and lobbying work, a clear defense focus, selected credibility signals, and a direct route to the team.'],
 ['The Firm','How Corrigan & Ussery works across industry, Congress, and the executive branch. A high-level account of the firm’s approach and value.'],
 ['Our Team','Bios and approved credentials for Joe and Jeremy, with space for other agreed team members on the same page.'],
 ['Capabilities & Clients','Broad areas of expertise and approved client names or logos. Confirm how civil works, land, and military protection should be represented during discovery.'],
 ['Contact','A clear way to reach the firm through the agreed shared or individual email addresses, with a short inquiry form if useful.'],
]
// Corrigan content fitted to Genesi's Approach and Deliverables layouts.
const engagement = [
 { title: 'Brand identity.', body: 'Develop a simpler, more distinctive identity that sets the direction for the website and gives the firm a consistent presence in everyday use.', note: 'We start with a working session and collaborative moodboard, present one developed direction on the website and business materials, then refine it through two consolidated review rounds.', includes: ['Primary logo and alternate lockup', 'Simplified mark for small spaces', 'Primary and supporting typefaces', 'Color palette and supporting graphics', 'Small-size, one-color, light and dark checks'] },
 { title: 'Business materials & handoff.', body: 'Apply the identity to the tools your team actually uses, then package the files and guidance so the system stays consistent.', note: 'Business cards and email signatures cover up to three team members. Handoff includes editable templates, a concise usage guide, organized logo assets, print and digital color values, and card artwork for one agreed printer specification.', includes: ['Business cards', 'Letterhead and two-page briefing template', 'Email signature layout and setup', 'LinkedIn company image and banner', 'Coordinating personal LinkedIn banner', 'Favicon and social sharing image'] },
 { title: 'Website content & design.', body: 'We take the first pass on structure, copy, and design. You review for accuracy, emphasis, and judgment. Five considered pages make the team, expertise, and client relationships easy to understand.', note: 'Copy is developed from discovery, supplied bios, and approved sources. Two consolidated review rounds cover copy and design before development. We will also explore Jeremy’s industry, Congress, and executive branch connection as a restrained graphic or lightweight motion treatment.', includes: ['Kickoff, content inventory, and sitemap', 'Page outlines and website copy', 'Credentials and client information hierarchy', 'Five desktop and mobile page layouts', 'Image direction and reusable components', 'Clear navigation and readable team bios'] },
 { title: 'Development, search & launch.', body: 'Build a fast, dependable site that is easy to find and understand. Test the paths visitors use, coordinate launch, and hand over access without creating an administrative burden.', note: 'We verify that inquiries reach the right inbox, coordinate the domain without disrupting your email, and provide site access, a recorded walkthrough, and a short update guide.', includes: ['Contact links or one spam-protected form', 'Image optimization and browser testing', 'Keyboard, contrast, and form-label checks', 'Search setup and accurate firm information', 'Clear content for search and AI assistants', 'Visitor analytics and inquiry tracking', 'Final approval, launch, and live verification'] },
]
const deliverableGroups = [
 { title: 'Identity & business materials', items: ['Visual direction moodboard', 'Primary logo and alternate lockup', 'Simplified small-format mark', 'Typography and color palette', 'Supporting graphic elements', 'Business cards for up to three staff', 'Editable letterhead', 'Two-page briefing or capabilities template', 'Email signatures for up to three staff', 'LinkedIn company image and banner', 'Personal LinkedIn banner', 'Favicon and social sharing image', 'Concise identity usage guide', 'Organized assets and editable source files'] },
 { title: 'Website & launch', items: ['Content inventory and five-page sitemap', 'Page outlines and website copy', 'Five-page desktop and mobile design', 'Industry / Congress / executive branch graphic exploration', 'Reusable website components', 'Responsive website development', 'Contact links or one inquiry form', 'Accessibility and browser checks', 'Foundational search setup', 'Clear firm information for search and AI assistants', 'Visitor analytics and inquiry tracking', 'Domain coordination and launch verification', 'Website ownership and access', 'Recorded walkthrough and update guide'] },
]
const work = [
 ['Genesi','Government affairs · Beta','A beta website for government affairs and strategic advocacy. Shared as work in progress, with content and details still being refined.','https://genesi.anchovies.space','/work/emergences/genesi.webp'],
 ['TPLG','Political law · Brand presentation','The original identity presentation for The Political Law Group, exploring an American visual character across typography, color, brand applications, and website direction.','https://swim-lang.github.io/tplg-deck/#3','/work/corrigan/tplg.jpg'],
 ['Maven Defense','Defense advisory · Website','A website presenting defense and national security expertise with a clear, assured presence.','https://mavendefense.com/','/work/corrigan/maven-defense.jpg'],
 ['Maven Advocacy','Government affairs · Website','A website for a government affairs and advocacy team, making its experience and capabilities clear.','https://mavenadvocacy.com/','/work/corrigan/maven-advocacy.jpg'],
 ['Lex Politica','Law, policy & regulation','Institutional credibility paired with clear, modern communication.','https://anchovies.agency/work/lex-politica','/work/new-line/lex-politica.webp'],
 ['Koplow','Brand identity','A focused identity for a defense practice. Included as a reference for visual discipline and character.','https://anchovies.agency/work/koplow','/work/corrigan/koplow.webp'],
]
const feedbackHref = 'mailto:sean@anchovies.agency?subject=Corrigan%20%26%20Ussery%20website%20proposal'
const reviewHref = 'https://anchovies.agency/book'
const navSections = [['outcomes','Outcomes'],['identity','Identity'],['scope','Scope'],['deliverables','Deliverables'],['work','Work'],['timeline','Timeline'],['investment','Investment']]
const pillars = [
 {title:'Identity',body:'A focused visual system that gives the website and the firm’s everyday materials a stronger starting point.'},
 {title:'Website',body:'Five considered pages that introduce the team, establish your expertise, and make contact straightforward.'},
 {title:'Materials',body:'Business cards, letterhead, email signatures, and LinkedIn assets that present the firm consistently.'},
 {title:'Handoff',body:'Organized files, practical guidance, and website access so your team can use what we create.'},
]
const timeline = [
 ['Week 1','Discovery & alignment','Learn more about the business, audiences, and priorities. Review references and build a collaborative moodboard to align on taste before design begins.'],
 ['Weeks 1–2','Identity direction','Present one developed identity direction, then refine it with your feedback. Establish the visual system that will guide the website and materials.'],
 ['Weeks 2–3','Website design & build','Develop the five-page structure and copy, review the website design, then build the approved pages and business materials.'],
 ['Weeks 3–4','Refine & test','Work through consolidated revisions. Check content, mobile layouts, accessibility, speed, search setup, analytics, and contact delivery.'],
 ['Week 4','Approve & launch','Secure final approval, coordinate the domain, and verify the live site. Hand over identity files, templates, site access, and update guidance.'],
]

function ProposalNav() {
 const [active,setActive] = useState('overview')
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0])setActive(visible[0].target.id)},{rootMargin:'-20% 0px -55% 0px',threshold:[0,.25,.5]})
  document.querySelectorAll('.corrigan-template section[id]').forEach(el=>observer.observe(el))
  return ()=>observer.disconnect()
 },[])
 return <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
 <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-4 md:px-16">
 <a href="#overview" className="flex shrink-0 items-center gap-3" aria-label="Corrigan and Ussery proposal overview"><img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[18px] w-auto"/><span className="text-[13px] text-ink-2">× Corrigan &amp; Ussery</span></a>
 <nav aria-label="Proposal sections" className="hidden items-center gap-4 text-[12px] text-ink-2 min-[1440px]:flex">{navSections.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined} className={`transition-colors hover:text-ink ${active===id?'text-ink':''}`}>{label}</a>)}</nav>
 <div className="flex items-center gap-3"><a href={reviewHref} target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-ink px-4 py-2 text-[12px] font-medium whitespace-nowrap transition-colors hover:bg-ink hover:text-paper">Review together</a><a href={feedbackHref} className="inline-flex rounded-full bg-ink px-4 py-2 text-[12px] font-medium whitespace-nowrap text-paper transition-colors hover:bg-ink-2">Share feedback</a></div>
 </div>
 <nav aria-label="Proposal sections on smaller screens" className="flex gap-5 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16 min-[1440px]:hidden">{navSections.map(([id,label])=><a key={id} href={`#${id}`} className="shrink-0 hover:text-ink" aria-current={active===id?'location':undefined}>{label}</a>)}</nav>
 </header>
}

// Uses Genesi's WhatWeHeard layout for the approved outcome statements.
function Outcomes() {return <section id="outcomes" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
 <div className="grid gap-14 xl:grid-cols-[520px_1fr] lg:gap-20">
 <Reveal className="flex flex-col gap-14"><h2 className="text-[15px] font-medium">Outcomes</h2><p className="display max-w-[560px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[64px] md:leading-[64px]">When the right people look you up, the website should strengthen their confidence in speaking with you.</p><p className="max-w-[460px] text-[15px] leading-[24px] text-ink-2">A concise site still requires careful decisions. What to say, what to leave out, and how to present the team all affect the impression a referral takes away. We’ll handle that work with the same directness and attention to detail you bring to yours.</p></Reveal>
 <Reveal className="flex flex-col">{outcomes.map(([title,body])=><article key={title} className="border-t border-[var(--color-rule)] py-6"><h3 className="serif text-[26px] leading-[32px] tracking-[-0.012em]">{title}</h3><p className="pt-3 text-[14px] leading-[22px] text-ink-2">{body}</p></article>)}</Reveal>
 </div></section>}

function Identity() {return <section id="identity" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
 <h2 className="text-[15px] font-medium text-paper/70">The identity behind the website</h2>
 <Reveal><p className="display max-w-[1200px] py-16 text-[50px] leading-[54px] tracking-[-0.026em] md:text-[78px] md:leading-[78px] lg:text-[96px] lg:leading-[92px]">You came to us for a website. The identity will set its tone.</p></Reveal>
 <div className="grid gap-12 xl:grid-cols-2 lg:gap-20">
 <Reveal className="flex max-w-[580px] flex-col gap-6"><p className="serif text-[26px] leading-[36px] tracking-[-0.012em]">A logo is a working tool. It needs to identify the firm quickly, remain legible, and reproduce reliably.</p><p className="text-[15px] leading-[24px] text-paper/70">A simpler mark will give the website and everyday materials a stronger starting point.</p><div><AnchorButton href="#deliverables" variant="light">View deliverables</AnchorButton></div></Reveal>
 <Reveal className="flex max-w-[560px] flex-col gap-6 text-[15px] leading-[24px] text-paper/70"><p>After reviewing your logo, we recommend a focused identity update as part of the website engagement. The logo, typography, and colors will shape every page, so it is worth getting them right together. The current logo communicates public policy, but its overall treatment feels dated. The overlapping C and U, layered Capitol illustration, and small descriptor also compete for attention. At the scale of a mobile header, email signature, or business card, those details become harder to distinguish.</p><p>Washington has no shortage of Capitol imagery. There is room for an identity that speaks more specifically to your defense experience: disciplined, precise, and assured. We’ll explore that character with you, without relying on military insignia or a generic government seal.</p><p>This is a focused identity engagement, not an exhaustive repositioning exercise. We build a practical visual system around the people, expertise, and reputation already in place.</p></Reveal>
 </div></section>}

function PagePlan() {return <section id="pages" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
 <div className="grid gap-10 pb-16 xl:grid-cols-[1.2fr_460px] lg:gap-20"><Reveal><h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">The five-page plan.</h2></Reveal><Reveal><p className="pt-2 text-[15px] leading-[24px] text-ink-2">Final page organization confirmed at kickoff within the five-page scope.</p></Reveal></div>
 <Reveal className="border-y border-[var(--color-rule)]"><ol>{pages.map(([title,body])=><li key={title} className="grid gap-3 border-b border-[var(--color-rule)] py-7 last:border-b-0 md:grid-cols-[260px_1fr] md:gap-10"><h3 className="serif text-[24px] leading-[30px]">{title}</h3><p className="text-[14px] leading-[22px] text-ink-2">{body}</p></li>)}</ol></Reveal>
 </section>}

// Portfolio uses Genesi's WorkCreates editorial rows.
function SelectedWork(){return <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
 <Reveal className="pb-12"><h2 className="display text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">Selected Work</h2><p className="max-w-[680px] pt-6 text-[15px] leading-[24px] text-ink-2">Selected brand identity and web design work, showing how a clear visual direction carries through to the finished experience.</p></Reveal>
 <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">{work.map(([name,tag,body,href,image])=><Reveal key={name}><a href={href} target="_blank" rel="noreferrer" className="group block"><div className="mb-6 aspect-[16/10] overflow-hidden bg-ink/5"><img src={image} alt={`${name} project preview`} loading="lazy" width="1440" height="900" className={`h-full w-full object-cover ${name === 'TPLG' ? 'cu-tplg-preview' : 'transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none'}`}/></div><h3 className="serif text-[34px] leading-[40px] group-hover:underline">{name} ↗</h3><p className="pt-3 text-[13px] text-ink-2">{tag}</p><p className="max-w-[540px] pt-4 text-[15px] leading-[24px] text-ink-2">{body}</p></a></Reveal>)}</div>
 <Reveal className="grid gap-10 pt-16 xl:grid-cols-[480px_1fr] lg:gap-14"><h3 className="serif max-w-[400px] text-[32px] leading-[38px]">Lawyerist’s Best Law Firm Websites</h3><div className="grid gap-8 sm:grid-cols-3">{[
 ['2023','Belzer Law Firm','https://lawyerist.com/news/best-law-firm-websites-2023-2/'],
 ['2025','Lex Politica','https://lawyerist.com/news/good-vs-great-what-best-law-firm-websites-get-right/'],
 ['2026','Sidweber Law & Burnham Law','https://lawyerist.com/news/best-law-firm-websites-2026/'],
 ].map(([year,names,href])=><a key={year} href={href} target="_blank" rel="noreferrer" className="hover:underline"><span className="serif text-[32px]">{year} ↗</span><p className="pt-3 text-[14px] leading-[22px] text-ink-2">{names}</p></a>)}</div></Reveal>
 </section>}

function Timeline(){return <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
 <h2 className="text-[15px] font-medium">Timeline</h2><div className="grid gap-10 py-16 xl:grid-cols-[1.2fr_460px] lg:gap-20"><Reveal><p className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">Four weeks, from discovery to launch.</p></Reveal><Reveal><p className="pt-2 text-[15px] leading-[24px] text-ink-2">We begin by understanding the business and aligning on taste. Identity, website design, refinement, and launch follow, with overlapping stages to keep the engagement within a four-week target.</p></Reveal></div>
 <Reveal><ol className="cu-timeline">{timeline.map(([when,phase,body],index)=><li key={phase} className="cu-milestone"><span className="cu-timeline-dot" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><p className="text-[13px] text-ink-2">{when}</p><h3 className="serif mt-5 text-[30px] leading-[36px]">{phase}</h3><p className="mt-4 text-[14px] leading-[24px] text-ink-2">{body}</p></li>)}</ol></Reveal>
 <p className="pt-8 text-[13px] leading-[22px] text-ink-2">Timing starts once access and initial materials are ready. The four-week target assumes one point of contact and consolidated feedback within two business days at review milestones. Identity approval is the first dependency: delays there move website design and launch. We’ll confirm the start date and combined schedule at kickoff.</p>
 </section>}

function Investment(){return <section id="investment" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
 <h2 className="display text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">Investment</h2><Reveal className="py-12"><p className="display text-[64px] leading-[70px] md:text-[96px] md:leading-[100px]">$16,999</p><p className="max-w-[780px] pt-6 text-[16px] leading-[26px] text-paper/75">A fixed project fee for the focused identity, business materials, five-page website, content development, search setup, analytics, testing, and launch support.</p></Reveal>
 <Reveal className="border-t border-paper/20">{[
 ['Focused identity & business materials','Logo system, typography, color, business materials, usage guidance, and organized final assets.','$6,499'],
 ['Website, copy & launch','Five-page website, content development, search setup, analytics, testing, and launch support.','$10,500'],
 ].map(([title,body,amount])=><div key={title} className="grid gap-4 border-b border-paper/20 py-7 xl:grid-cols-[320px_1fr_180px] lg:gap-8"><h3 className="serif text-[24px] leading-[30px] tracking-[-0.012em]">{title}</h3><p className="text-[13px] leading-[20px] text-paper/70">{body}</p><span className="serif text-[34px] leading-[38px] tracking-[-0.018em] lg:text-right">{amount}</span></div>)}</Reveal>
 <Reveal className="mt-14"><h3 className="mb-6 text-[15px] font-medium">Payment structure</h3><div className="cu-payments grid grid-cols-3 gap-4 md:gap-8">{[
 ['50%','At kickoff','$8,499.50'],['25%','At website design approval','$4,249.75'],['25%','Before launch & final handoff','$4,249.75'],
 ].map(([percent,title,amount])=><div key={title} className="border-t border-paper/20 pt-6"><span className="display block text-[36px] leading-[40px] tracking-[-0.026em] sm:text-[48px] sm:leading-[52px] md:text-[64px] md:leading-[68px]">{percent}</span><h4 className="serif pt-3 text-[16px] leading-[21px] md:text-[22px] md:leading-[28px]">{title}</h4><p className="pt-3 text-[12px] leading-[18px] sm:text-[15px] sm:leading-[22px] text-paper/70">{amount}</p></div>)}</div></Reveal>
 </section>}

function NextStep(){return <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
 <h2 className="text-[15px] font-medium">Next Steps</h2><Reveal className="mt-12"><h3 className="display max-w-[1000px] text-[48px] leading-[52px] tracking-[-0.026em] md:text-[80px] md:leading-[80px]">Make the next introduction count.</h3><div className="max-w-[760px] space-y-5 pt-8 text-[16px] leading-[26px] text-ink-2"><p>You’ve built the relationships and earned the trust. Let’s give the firm a presence that carries that same confidence into every first impression.</p><p>We’d welcome the opportunity to build this with you. Share your thoughts on the proposal, or book a call to walk through it together. From there, we’ll confirm the scope, agree on a start date, and prepare the agreement.</p></div>
 <div className="flex flex-wrap gap-4 pt-8"><AnchorButton href={feedbackHref}>Share your feedback</AnchorButton><AnchorButton href={reviewHref} variant="outline">Review the proposal together</AnchorButton></div></Reveal>
 </section>}

export function CorriganUsseryProposal(){
 useEffect(()=>{document.title='Anchovies × Corrigan & Ussery · Identity & Website Proposal';document.querySelector('meta[name="description"]')?.setAttribute('content','A focused brand identity and five-page website proposal for Corrigan & Ussery.')
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-active',e.isIntersecting)),{threshold:.45});document.querySelectorAll('.cu-milestone').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[])
 return <main className="genesi-proposal corrigan-template bg-paper text-ink"><a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a><ProposalNav/><Hero/><Outcomes/><Identity/><Approach/><Deliverables/><PagePlan/><SelectedWork/><Timeline/><Investment/><NextStep/><footer className="flex flex-col gap-5 bg-paper px-6 py-8 text-[13px] text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]"><span>Sean Ashlow · Anchovies · sean@anchovies.agency</span><span>Corrigan &amp; Ussery · November 10, 2026</span></footer></main>
}
function AnchorButton({
  children,
  href = feedbackHref,
  variant = 'dark',
}: {
  children: string
  href?: string
  variant?: 'dark' | 'light' | 'outline'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
        ? 'border border-[var(--color-rule)] text-ink hover:bg-ink hover:text-paper'
        : 'bg-ink text-paper hover:bg-ink-2'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3.5 text-[13px] font-medium max-w-full text-center transition-colors ${classes}`}
    >
      {children}
    </a>
  )
}

function Hero() {
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
      <div className="flex flex-wrap justify-between gap-4 pb-16 text-[13px] text-ink-2 lg:pb-24"><span>Identity &amp; Website Proposal</span><span>November 10, 2026</span></div>
      <Reveal>
        <h1 className="display max-w-[1200px] pb-12 text-[46px] leading-[46px] min-[360px]:text-[54px] min-[360px]:leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[96px] lg:leading-[96px]">
          Let your reputation speak.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            An identity and website that meet the standard of your work.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            Your relationships and results have built a government affairs and lobbying firm with deep defense expertise. The website should make that clear: show the people connecting industry, Congress, and the executive branch, reinforce your credibility, and make the next conversation straightforward.
          </p>

        </Reveal>
      </div>
      <Reveal className="pt-4">

        <div className="cu-pillars">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="cu-pillar">

              <h3 className="serif text-[40px] leading-[44px] tracking-[-0.018em]">{pillar.title}</h3>
              <p className="text-[13px] leading-[20px] text-ink-2">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Approach() {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <h2 className="text-[15px] font-medium">Scope</h2>
      <div className="grid gap-10 py-16 xl:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            From identity to a finished website.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Four connected areas of work. Establish the visual direction, apply it to the materials your team uses, then design, build, and launch the website.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {engagement.map((phase, index) => (
          <Reveal key={phase.title} className="grid gap-8 border-b border-[var(--color-rule)] py-10 xl:grid-cols-[90px_1fr_360px] lg:gap-12">
            <div>
              <span className="serif block text-[56px] leading-[56px] tracking-[-0.02em]">{String(index + 1).padStart(2, '0')}</span>

            </div>
            <div className="max-w-[620px]">
              <h3 className="serif pb-5 text-[34px] leading-[40px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="pb-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
              <p className="text-[13px] leading-[20px] text-ink-2">{phase.note}</p>
            </div>
            <div className="flex flex-col gap-3 pt-2">

              {phase.includes.map((item) => (
                <div key={item} className="flex items-baseline gap-3">
                  <span className="h-px w-[10px] shrink-0 bg-[var(--color-rule)]" />
                  <span className="text-[14px] leading-[22px]">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Deliverables() {
  return (
    <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <h2 className="text-[15px] font-medium">Deliverables</h2>
      <div className="grid gap-10 py-16 xl:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            Everything you receive.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            The finished identity, business materials, and website, organized for your team to use. All included in the project fee.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-10 xl:grid-cols-2 lg:gap-20">
        {deliverableGroups.map((group, groupIndex) => (
          <Reveal key={group.title} className="border-t border-[var(--color-rule)]">
            <div className="flex justify-between gap-6 border-b border-[var(--color-rule)] py-4">
              <span className="eyebrow text-ink-2">{group.title}</span>
              <span className="eyebrow text-ink-2">{group.items.length} items</span>
            </div>
            {group.items.map((item, index) => {
              const number = groupIndex * 14 + index + 1
              return (
                <div key={item} className="grid grid-cols-[54px_1fr] gap-4 border-b border-[#DDD8CD] py-3.5 last:border-b-0">
                  <span className="eyebrow text-ink-2">D-{String(number).padStart(2, '0')}</span>
                  <span className="text-[14px] leading-[20px]">{item}</span>
                </div>
              )
            })}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
