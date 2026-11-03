import { useEffect, type ReactNode } from 'react'
import './harlow.css'
type ScopeItem = [string, string, string[]?]

const sections = [['outcomes','Outcomes'],['scope','Scope'],['process','Process'],['work','Selected Work'],['timeline','Timeline'],['investment','Investment'],['next','Next Steps']]
const outcomes = [
 ['Make the first hat worth seeking out','Give someone a reason to choose Harlow over another hat: a recognizable point of view, a story they relate to, and a product that feels like part of their life.'],
 ['Build an audience for the next release','Turn interest in workwear, motorcycles, and the culture around them into an audience that wants to keep following Harlow, even between product drops.'],
 ['Test demand before expanding','Use the first release to learn which stories, images, and product details create real interest and purchases before committing to jackets, denim, or a larger collection.'],
 ['Make a small launch feel considered','Create a consistent impression from the first Instagram post to the label, hang tag, and package. One product can still feel like the beginning of a complete brand.'],
 ['Create a direction future products can follow','Establish a visual language and a set of principles that help you decide what belongs in Harlow as the range grows.'],
 ['Launch with fewer avoidable mistakes','Align the brand, samples, imagery, and release plan before spending on production. Give vendors and creative partners a clear brief to work from.'],
]
const strategy: ScopeItem[] = [
 ['Discovery & positioning','A working session on your vision, audience, first hat, and longer-term ambitions. Define who Harlow is for, why they would choose it, and what makes it distinct.'],
 ['Culture & reference research','Explore worn-in workwear, motorcycle culture, vintage tank graphics, and the balance between rugged character and an elevated feel. Use references to develop an original point of view, not imitate another label.'],
 ['Brand story & messaging','A concise positioning statement, brand story, short introduction, tagline, three core messages, and tone-of-voice guidance. Include an Instagram bio and sample launch captions.'],
 ['Launch plan & vendor guidance','A practical order of operations from samples to launch, with a readiness checklist and first-month content outline. Include a vendor briefing checklist covering artwork, materials, minimum quantities, sampling, lead times, and proof approval, plus one review call for a selected supplier’s proof or sample.'],
]
const identity: ScopeItem[] = [
 ['Complete visual identity','A recognizable set of elements that work together, from the smallest label to a full campaign.',[
  'Primary logo, alternate lockup, and small-format brand mark',
  'Primary and supporting typefaces, with a clear type hierarchy',
  'Core and supporting color palette, with print and digital values',
  'Brand patterns, graphic motifs, and supporting design elements',
  'Layout and composition guidance for consistent use',
 ]],
 ['Hat & future-product applications','Test the identity on the product before it goes into production.',[
  'First-hat mockups showing front, side, and back placements',
  'Embroidery-scale legibility check and vector logo artwork',
  'Two future-product mockups, such as a T-shirt and jacket',
 ]],
 ['Packaging & unboxing studies','See how the brand carries through the experience of receiving a Harlow order.',[
  'Four mockups: hang tag, interior label, shipping box or mailer, and insert card',
  'Material, scale, and hierarchy recommendations',
  'Editable hang-tag and insert-card layouts for later adaptation to vendor specifications',
 ]],
 ['Photography & art direction','A practical guide to showing the lifestyle around the hat, as well as the product itself.',[
  'Direction for locations, casting, styling, light, framing, texture, and color treatment',
  'A 12-shot starter list covering product details, the hat in use, and lifestyle imagery',
 ]],
 ['Social & digital examples','Photography leads. Graphics support product details, announcements, and useful information.',[
  'Social profile image and highlight-cover style',
  'Six editable layouts across feed posts and stories',
  'A nine-post example grid using supplied or reference imagery',
  'Desktop and mobile homepage concept mockups',
 ]],
 ['Guidelines & handoff','Everything organized so you and your partners can use the identity confidently.',[
  'Brand guide covering strategy, logo use, color, typefaces, patterns, imagery, and applications',
  'Organized SVG, PDF, PNG, and JPG logo files',
  'Editable template and mockup files, plus a recorded handoff walkthrough',
 ]],
]
const process = [
 ['Discovery','Listen, define the audience, and agree on the first-launch priorities.'],
 ['Moodboards','Explore visual and cultural references together, then align on the direction.'],
 ['Presentation','Present one developed brand solution across the hat, packaging, photography direction, and digital examples.'],
 ['Refinement & handoff','Refine the direction, finish the guide and templates, and walk through the launch plan together.'],
]
const work = [
 ['Soft Hours','Fashion & lifestyle','A restwear label built around quiet personal time. A reference for connecting a product to a way of living.','soft-hours'],
 ['Freddie','Consumer products','Sleep glasses with an approachable lifestyle identity. A reference for making a functional product feel personal.','freddie'],
 ['Off Menu','Consumer products','A daily supplement with flavor and personality at its center. A reference for carrying a brand through packaging and product storytelling.','offmenu'],
 ['Good Measure','Trades & craft','An identity for a business serving roofing contractors. A useful reference for the practical, workwear-adjacent character in Harlow’s references.','good-measure'],
 ['Arc 88','Design & objects','An industrial design studio whose identity connects its thinking with the objects it makes. A reference for a considered, elevated presentation.','arc88'],
 ['Garza','Local character','A law firm identity rooted in South Texas. A reference for drawing personality from a place and its culture.','garza'],
 ['Koplow','Identity & applications','A focused identity for a defense practice, carried through physical applications. A reference for consistency across different touchpoints.','koplow'],
 ['The Work','Product & craft','A cannabis brand centered on the care behind its product. A reference for making craft part of the brand story.','the-work'],
]
function Section({id,number,title,children,dark=false}:{id:string;number:string;title:string;children:ReactNode;dark?:boolean}){
 return <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-16 md:px-16 lg:px-[120px] lg:py-24 ${dark?'bg-ink text-paper':''}`}><span className={`eyebrow ${dark?'text-paper/60':'text-ink-2'}`}>§ {number} · {title}</span><h2 id={`${id}-title`} className="display mb-10 mt-8 text-[48px] md:text-[72px]">{title}</h2>{children}</section>
}
function ScopeItems({items}:{items:ScopeItem[]}){return <div className="space-y-8">{items.map(([title,body,bullets])=><div key={title}><h4 className="mb-2 text-[15px] font-bold">{title}</h4><p className="text-[15px] leading-7 text-ink-2">{body}</p>{bullets&&<ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-7 text-ink-2">{bullets.map(item=><li key={item}>{item}</li>)}</ul>}</div>)}</div>}
export function HarlowProposal(){
 useEffect(()=>{document.title='Anchovies × Harlow · Brand Strategy & Identity';document.querySelector('meta[name="description"]')?.setAttribute('content','A focused brand strategy and identity proposal for Harlow’s first hat release.')},[])
 return <div className="bg-paper text-ink"><a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
 <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm"><div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16"><a href="#overview" aria-label="Harlow proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto"/><span className="text-[13px]">Anchovies × Harlow</span></a><a href="#investment" className="rounded-full border border-ink px-4 py-2 text-[12px] hover:bg-ink hover:text-paper">View investment</a></div><nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">{sections.map(([id,label])=><a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}</nav></header>
 <main><section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px]"><div className="mb-12 flex flex-wrap justify-between gap-4"><span className="eyebrow text-ink-2">Prepared for Daniel Polo</span><span className="eyebrow text-ink-2">November 3, 2026</span></div><h1 className="display max-w-[1100px] pb-10 text-[56px] leading-[.98] tracking-[-.028em] sm:text-[80px] md:text-[104px]">A point of view you can wear.</h1><div className="grid gap-8 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20"><p className="serif text-[30px] leading-snug md:text-[38px]">Brand strategy and identity for Harlow.</p><div className="space-y-5 text-[15px] leading-7 text-ink-2"><p>Harlow starts with one hat, but the ambition is a fashion brand. With a single product, the identity, photography, and story have to do more of the work: express a point of view, earn attention, and give people something to connect with.</p><p>We’ll build around the worn-in workwear, motorcycle culture, and elevated details you’re drawn to, so the first release introduces a brand people want to be part of.</p><p className="eyebrow text-ink">Strategy + identity · 3–4 week target</p></div></div></section>
 <Section id="outcomes" number="01" title="Outcomes"><div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">{outcomes.map(([title,body])=><div key={title} className="border-t border-[var(--color-rule)] pt-6"><h3 className="serif mb-5 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div><p className="serif mx-auto mt-16 max-w-[900px] text-center text-[32px] leading-snug">The goal: prove there is an audience for Harlow, earn the first customers, and give them a reason to come back.</p></Section>
 <Section id="scope" number="02" title="Scope"><p className="mb-12 max-w-[820px] text-[17px] leading-7 text-ink-2">Two connected deliverables. The strategy gives the brand meaning; the identity shows how that meaning works on the product and everywhere people encounter it.</p>{[['Brand strategy','A clear point of view and a plan for the first release.',strategy],['Brand identity','A complete identity, tested in the places it needs to work.',identity]].map(([title,intro,items])=><div key={title as string} className="grid gap-8 border-t border-[var(--color-rule)] py-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16"><div><h3 className="serif mb-4 text-[34px]">{title as string}</h3><p className="text-[15px] leading-7 text-ink-2">{intro as string}</p></div><ScopeItems items={items as ScopeItem[]}/></div>)}<div className="border-t border-[var(--color-rule)] pt-7 text-[13px] leading-7 text-ink-2"><p className="mt-4">Harlow is the working name; naming and trademark clearance are not included. Product, packaging, and website mockups test the identity in context. Full garment design, tech packs, embroidery digitizing, structural packaging, print-ready packaging dielines, website development, photography production, paid fonts and imagery, manufacturing, and ongoing content or ad management are separate.</p><p className="mt-4">Vendor guidance helps you ask better questions and review how the brand is applied. Supplier sourcing, negotiation, factory inspection, production management, and access to the vendor-search app discussed on our call are not included. You select and contract with suppliers.</p></div></Section>
 <Section id="process" number="03" title="Process"><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{process.map(([title,body],i)=><div key={title} className="border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">0{i+1}</span><h3 className="serif my-5 text-[28px]">{title}</h3><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div></Section>
 <Section id="work" number="04" title="Selected Work"><p className="mb-10 max-w-[780px] text-[17px] leading-7 text-ink-2">Examples of product storytelling, distinct identities, and brands with a world of their own. We’ll build Harlow around your references and audience.</p><div className="grid gap-8 md:grid-cols-3">{work.map(([name,tag,body,slug])=><a key={name} href={`https://anchovies.agency/work/${slug}`} target="_blank" rel="noreferrer" className="group border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">{tag}</span><h3 className="serif my-5 text-[32px] group-hover:underline">{name} ↗</h3><p className="text-[14px] leading-7 text-ink-2">{body}</p></a>)}</div><a href="https://anchovies.agency/work" target="_blank" rel="noreferrer" className="mt-10 inline-block underline underline-offset-4">Explore all work ↗</a></Section>
 <Section id="timeline" number="05" title="Timeline"><p className="serif mb-10 text-[36px]">Three to four weeks from kickoff.</p><ol className="harlow-timeline">{[
 ['Week 1','Discovery & direction','Strategy, cultural references, and collaborative moodboards.'],
 ['Weeks 2–3','Identity & presentation','Develop the visual identity and show it across the hat, packaging, and digital applications.'],
 ['Weeks 3–4','Refinement & handoff','Finish the applications, brand guide, and launch plan. Walk through the files together.'],
].map(([time,title,body],i)=><li key={time} className="harlow-milestone"><span className="harlow-timeline-dot" aria-hidden="true">0{i+1}</span><p className="eyebrow text-ink-2">{time}</p><h3 className="serif">{title}</h3><p className="harlow-timeline-body">{body}</p></li>)}</ol><p className="mt-8 max-w-[850px] text-[14px] leading-7 text-ink-2">Proposed timing, with the start date confirmed against our schedule before booking. Prompt consolidated feedback and access to product details and references keep the work moving. This is the branding schedule; sampling, manufacturing, photography, and the sales launch follow their own lead times.</p></Section>
 <Section id="investment" number="06" title="Investment" dark><p className="eyebrow text-paper/60">Brand strategy + complete identity</p><p className="display my-7 text-[80px] md:text-[112px]">$4,500</p><div className="mb-10 max-w-[800px] space-y-5 text-[17px] leading-7 text-paper/80"><p>Our standard fee for this scope is <span className="line-through">$9,000</span>. We’re offering a $4,500 reduction, bringing your project fee to $4,500.</p><p>We share your interest in vintage workwear and motorcycle culture, and we’d like to help bring Harlow to life. This offer keeps the strategy, applications, photography direction, and launch guidance described above in the engagement.</p></div><div className="grid grid-cols-[1fr_70px_70px] gap-x-4 border-t border-paper/25 py-4 text-[11px] text-paper/60 sm:text-[13px]"><span>Scope</span><span>Standard</span><span>Your fee</span></div>{[['Brand strategy','$1,500','$750'],['Complete brand identity','$7,500','$3,750']].map(([label,regular,offer])=><div key={label} className="grid grid-cols-[1fr_70px_70px] gap-x-4 border-t border-paper/25 py-5 text-[14px] sm:text-[16px]"><span>{label}</span><span className="text-paper/60">{regular}</span><span>{offer}</span></div>)}<p className="mt-6 text-[13px] leading-7 text-paper/75">One connected engagement, including all mockups, templates, and guidance listed above. No separate fees for those applications.</p><div className="mt-12 grid gap-8 md:grid-cols-3">{[['50% at kickoff','$2,250'],['25% at identity approval','$1,125'],['25% before final handoff','$1,125']].map(([label,amount])=><div key={label} className="border-t border-paper/25 pt-5"><p className="eyebrow text-paper/60">{label}</p><p className="serif mt-4 text-[34px]">{amount}</p></div>)}</div><p className="mt-10 text-[13px] leading-7 text-paper/70">Production, suppliers, photography, paid licenses, printing, shipping, website services, and advertising spend are separate. Any extra scope or cost will be agreed before work begins.</p></Section>
 <Section id="next" number="07" title="Next Steps"><p className="serif mb-8 max-w-[850px] text-[36px] leading-snug">Let’s give the first release a strong start.</p><p className="mb-9 max-w-[800px] text-[15px] leading-7 text-ink-2">Take a look and tell us what feels right, what’s missing, or where budget or timing needs a conversation. We’ll align on the scope and start date, then prepare the agreement and kickoff invoice.</p><div className="flex flex-wrap gap-4"><a href="mailto:sean@anchovies.agency?subject=Harlow%20proposal%20feedback" className="rounded-full bg-ink px-6 py-4 text-[14px] text-paper">Share your thoughts</a><a href="https://cal.com/anchovies/30min?overlayCalendar=true" target="_blank" rel="noreferrer" className="rounded-full border border-ink px-6 py-4 text-[14px]">Review the proposal together</a></div><p className="mt-10 text-[14px] text-ink-2">Sean Ashlow · Anchovies · sean@anchovies.agency</p></Section>
 </main></div>
}
