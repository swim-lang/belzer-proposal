import { useEffect, type ReactNode } from 'react'
import './corrigan-ussery.css'
type ScopeItem = [string, string, string[]?]
const sections = [['outcomes','Outcomes'],['scope','Scope'],['work','Selected Work'],['timeline','Timeline'],['investment','Investment'],['next','Next Steps']]
const outcomes = [
 ['Confirm the referral','When someone hears your names, give them a clear, credible place to verify the team, experience, and relationships behind the recommendation.'],
 ['Represent the firm accurately','Make the depth of your work visible without burying visitors in detail. Lead with defense and government relations, supported by approved credentials and client relationships.'],
 ['Remove doubt from the first impression','Present the same care and judgment online that clients expect from you in person. Clear content, disciplined design, and reliable performance should reinforce confidence.'],
 ['Make room for the right opportunities','Give prospective clients and partners enough information to recognize a relevant fit and start a conversation. Measure how people use the site so future decisions rest on evidence.'],
]
const pages = [
 ['Home','A concise introduction, clear defense focus, selected credibility signals, and a direct route to the team and contact information.'],
 ['The Firm','How Corrigan & Ussery works across industry, Congress, and the executive branch. A high-level account of the firm’s approach and value.'],
 ['Our Team','Bios and approved credentials for Joe and Jeremy, with space for other agreed team members on the same page.'],
 ['Capabilities & Clients','Broad areas of expertise and approved client names or logos. Confirm how civil works, land, and military protection should be represented during discovery.'],
 ['Contact','A clear way to reach the firm through the agreed shared or individual email addresses, with a short inquiry form if useful.'],
]
const scope: ScopeItem[] = [
 ['Direction & content','We take the first pass. You review for accuracy, emphasis, and judgment.',[
  'Kickoff with the team, content inventory, five-page sitemap, and page outlines',
  'Draft and edit website copy from the discovery discussion, supplied bios, and approved source material',
  'Organize credentials and client relationships into a clear information hierarchy',
  'Two consolidated review rounds across copy and design before development',
 ]],
 ['Custom website design','A deliberate presentation suited to the people and institutions you work with.',[
  'Desktop and mobile layouts for five core pages using the existing logo',
  'Typography, color, image direction, and reusable page components for the website',
  'Explore Jeremy’s connection between industry, Congress, and the executive branch as a restrained graphic or lightweight motion treatment',
  'Clear navigation, readable bios, and a considered use of screen space',
 ]],
 ['Development & quality checks','Build a fast, dependable website and test the paths people actually use.',[
  'Responsive React and TypeScript website, with page content rendered into crawlable HTML',
  'Source code in a client-accessible GitHub repository; production hosting on Vercel',
  'Contact links and, if selected, one spam-protected inquiry form routed to the agreed inbox',
  'Image optimization, keyboard navigation, contrast and form-label checks',
  'Mobile and desktop browser checks, link testing, and verified contact delivery before launch',
 ]],
 ['Search, AI readability & measurement','Make the firm easy to find, understand, and reference accurately.',[
  'Page titles, descriptions, canonical URLs, sitemap, and search indexing configuration',
  'Structured organization and person information aligned with approved public facts',
  'Clear headings and accessible text for search engines and AI assistants to interpret',
  'Analytics and Search Console setup, with contact-click and form-submission tracking where applicable',
  'A 30-day review of available traffic, referral sources, page use, and contact activity',
 ]],
 ['Launch & ownership','Get the site online without creating a new administrative burden.',[
  'Domain and DNS coordination while preserving existing email records',
  'Final approval checkpoint, launch checklist, and post-launch verification',
  'Repository and hosting access, a recorded walkthrough, and a short guide to routine updates',
  '30 days of support for defects in the delivered scope',
 ]],
]
const work = [
 ['Maven','Public affairs','A contemporary presentation for a firm working in policy and advocacy.','https://anchovies.agency/work/maven'],
 ['Lex Politica','Law, policy & regulation','Institutional credibility paired with clear, modern communication.','https://anchovies.agency/work/lex-politica'],
 ['Genesi','Government affairs','A website direction for government affairs and strategic advocacy. A reference for a direct, confident presentation.','https://genesi.anchovies.space'],
 ['Koplow','Brand identity','A focused identity for a defense practice. Included as a reference for visual discipline and character.','https://anchovies.agency/work/koplow'],
]
function Section({id,number,title,children,dark=false}:{id:string;number:string;title:string;children:ReactNode;dark?:boolean}){
 return <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-16 md:px-16 lg:px-[120px] lg:py-24 ${dark?'bg-ink text-paper':''}`}><span className={`eyebrow ${dark?'text-paper/60':'text-ink-2'}`}>§ {number} · {title}</span><h2 id={`${id}-title`} className="display mb-10 mt-8 text-[48px] md:text-[72px]">{title}</h2>{children}</section>
}
function ScopeItems({items}:{items:ScopeItem[]}){return <div className="space-y-8">{items.map(([title,body,bullets])=><div key={title}><h4 className="mb-2 text-[15px] font-bold">{title}</h4><p className="text-[15px] leading-7 text-ink-2">{body}</p>{bullets&&<ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-7 text-ink-2">{bullets.map(item=><li key={item}>{item}</li>)}</ul>}</div>)}</div>}
export function CorriganUsseryProposal(){
 useEffect(()=>{document.title='Anchovies × Corrigan & Ussery · Website Proposal';document.querySelector('meta[name="description"]')?.setAttribute('content','A five-page website proposal for Corrigan & Ussery.')},[])
 return <div className="bg-paper text-ink"><a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
 <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm"><div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16"><a href="#overview" aria-label="Corrigan and Ussery proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto"/><span className="text-[12px] sm:text-[13px]">Corrigan &amp; Ussery</span></a><span className="eyebrow text-[10px] text-ink-2">Website proposal</span></div><nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">{sections.map(([id,label])=><a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}</nav></header>
 <main><section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px]"><div className="mb-12 flex flex-wrap justify-between gap-4"><span className="eyebrow text-ink-2">Prepared for Corrigan &amp; Ussery</span><span className="eyebrow text-ink-2">November 10, 2026</span></div><h1 className="display max-w-[1100px] pb-10 text-[52px] leading-[.98] tracking-[-.028em] sm:text-[80px] md:text-[104px]">A reputation earned.<br/>Clearly represented.</h1><div className="grid gap-8 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20"><p className="serif text-[30px] leading-snug md:text-[38px]">A website that meets the standard of your work.</p><div className="space-y-5 text-[15px] leading-7 text-ink-2"><p>Your relationships and results have built the firm. The website’s job is to support that reputation: show who you are, establish where you bring value, and make the next conversation straightforward.</p><p>A concise site still requires careful decisions. What to say, what to leave out, and how to present the team all affect the impression a referral takes away. We’ll handle that work with the same directness and attention to detail you bring to yours.</p><p className="eyebrow text-ink">Five pages · Four weeks · Design through launch</p></div></div></section>
 <Section id="outcomes" number="01" title="Outcomes"><div className="grid gap-10 md:grid-cols-2">{outcomes.map(([title,body])=><div key={title} className="border-t border-[var(--color-rule)] pt-6"><h3 className="serif mb-5 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div><p className="serif mx-auto mt-16 max-w-[900px] text-center text-[32px] leading-snug">When the right people look you up, the website should strengthen their confidence in speaking with you.</p></Section>
 <Section id="scope" number="02" title="Scope"><p className="mb-10 max-w-[820px] text-[17px] leading-7 text-ink-2">One complete website engagement, from organizing the content to verifying the live site. Five core pages keep the presentation focused while giving the firm room to explain its experience.</p><div className="mb-14">{pages.map(([title,body],i)=><div key={title} className="grid gap-3 border-t border-[var(--color-rule)] py-6 md:grid-cols-[45px_180px_1fr]"><span className="eyebrow text-ink-2">0{i+1}</span><h3 className="serif text-[25px]">{title}</h3><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div><p className="mb-12 text-[14px] font-semibold leading-7">The page structure is a starting point. We’ll confirm the final organization with you at kickoff, within the five-page scope.</p><ScopeItems items={scope}/><div className="mt-12 border-t border-[var(--color-rule)] pt-7 text-[13px] leading-7 text-ink-2"><p>This proposal uses the existing logo. Naming, a new brand identity, photography production, custom software, client portals, ongoing content management, and ongoing SEO campaigns are separate. Website design includes the visual choices needed for these pages; it does not include a new identity system.</p><p className="mt-4">You approve bios, credentials, client references, imagery rights, and public descriptions of the work. Detailed client operations and sensitive information stay out of the site. Hosting, domain renewals, paid imagery or fonts, and any form-service subscriptions are separate, with costs agreed before setup.</p><p className="mt-4">Search and AI work improves the clarity and accessibility of public information. Rankings, AI citations, traffic, and inquiry volume are not guaranteed. We’ll establish a baseline and review what the actual data shows.</p></div></Section>
 <Section id="work" number="03" title="Selected Work"><p className="mb-10 max-w-[780px] text-[17px] leading-7 text-ink-2">Experience presenting firms whose judgment and reputation are central to their business. We bring a clear recommendation, take feedback directly, and manage the details through delivery.</p><div className="grid gap-8 md:grid-cols-2">{work.map(([name,tag,body,href])=><a key={name} href={href} target="_blank" rel="noreferrer" className="group border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">{tag}</span><h3 className="serif my-5 text-[32px] group-hover:underline">{name} ↗</h3><p className="text-[14px] leading-7 text-ink-2">{body}</p></a>)}</div><div className="mt-12 border-t border-[var(--color-rule)] pt-6"><p className="eyebrow mb-4 text-ink-2">Independent recognition</p><a className="underline underline-offset-4" href="https://lawyerist.com/news/good-vs-great-what-best-law-firm-websites-get-right/" target="_blank" rel="noreferrer">Lex Politica featured in Lawyerist’s Best Law Firm Websites 2025 ↗</a></div></Section>
 <Section id="timeline" number="04" title="Timeline"><p className="serif mb-10 text-[36px]">Four weeks from kickoff to launch.</p><ol className="cu-timeline">{[
 ['Week 1','Define & draft','Confirm page structure, review the existing logo and source materials, draft copy, and establish the visual direction.'],
 ['Week 2','Design & review','Present the website layouts and connection graphic. Review copy and design together, then resolve consolidated feedback.'],
 ['Week 3','Build & test','Develop the approved pages, configure search and analytics, and test mobile layouts, navigation, and contact delivery.'],
 ['Week 4','Approve & launch','Complete final review, coordinate the domain, launch, and verify the live site. Hand over access and update guidance.'],
].map(([time,title,body],i)=><li key={time} className="cu-milestone"><span className="cu-timeline-dot" aria-hidden="true">0{i+1}</span><p className="eyebrow text-ink-2">{time}</p><h3 className="serif">{title}</h3><p className="cu-timeline-body">{body}</p></li>)}</ol><div className="mt-10 border-t border-[var(--color-rule)] pt-6"><h3 className="serif mb-3 text-[28px]">30 days after launch</h3><p className="max-w-[800px] text-[15px] leading-7 text-ink-2">Review available traffic and contact activity, address any defects covered by launch support, and identify useful next steps.</p></div><p className="mt-8 max-w-[850px] text-[13px] leading-7 text-ink-2">Timing starts once access and initial materials are ready. The four-week target assumes one point of contact and consolidated feedback within two business days at review milestones. We’ll confirm the start date together. Any added branding scope would be scheduled separately.</p></Section>
 <Section id="investment" number="05" title="Investment" dark><p className="eyebrow text-paper/60">Website design & development</p><p className="serif my-7 text-[48px] md:text-[64px]">Fee to be confirmed</p><p className="max-w-[800px] text-[16px] leading-7 text-paper/80">A fixed project fee will cover the five-page scope, content development, custom design, development, search setup, analytics, testing, and launch support described above.</p><p className="mt-6 max-w-[800px] text-[14px] leading-7 text-paper/70">Payment milestones will be confirmed with the final fee. Any separate branding work will be clearly scoped before it is added.</p></Section>
 <Section id="next" number="06" title="Next Steps"><p className="serif mb-8 max-w-[850px] text-[36px] leading-snug">Confirm the scope. Set the start date.</p><p className="mb-9 max-w-[800px] text-[15px] leading-7 text-ink-2">Review the proposed pages and send the existing logo, available bios, and approved client list. We’ll resolve open questions, confirm the investment and schedule, and prepare the agreement. From there, we take the first pass and bring you clear decisions to review.</p><div className="flex flex-wrap gap-4"><a href="mailto:sean@anchovies.agency?subject=Corrigan%20%26%20Ussery%20website%20proposal" className="rounded-full bg-ink px-6 py-4 text-[14px] text-paper">Share your feedback</a><a href="https://cal.com/anchovies/30min?overlayCalendar=true" target="_blank" rel="noreferrer" className="rounded-full border border-ink px-6 py-4 text-[14px]">Review the proposal together</a></div><p className="mt-10 text-[14px] text-ink-2">Sean Ashlow · Anchovies · sean@anchovies.agency</p></Section>
 </main></div>
}
