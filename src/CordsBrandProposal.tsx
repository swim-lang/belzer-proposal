import { useEffect, type ReactNode } from 'react'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const reviewHref = `mailto:sean@anchovies.agency?subject=${encodeURIComponent('New jewelry brand + Anchovies: proposal feedback')}`

const sections = [
  ['goals', 'Goals'], ['scope', 'Scope'], ['process', 'Process'],
  ['work', 'Selected Work'], ['timeline', 'Timeline'], ['investment', 'Investment'], ['next', 'Next Steps'],
]
const investment = [
  { label: 'Brand strategy', amount: 1000 },
  { label: 'Naming', amount: 3500 },
  { label: 'Brand identity', amount: 5499 },
]
const total = investment.reduce((sum, item) => sum + item.amount, 0)
const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 }).format(amount)
const payments = [
  { label: 'At kickoff', percent: 50 },
  { label: 'At identity approval', percent: 25 },
  { label: 'Before final handoff', percent: 25 },
]
const scope = [
  {
    title: 'Brand strategy',
    intro: 'Make it clear who the brand is for, why the jewelry fits their lives, and what makes it worth choosing.',
    items: ['A focused discovery conversation to align on the brand’s purpose, personality, audience, and priorities', 'A concise positioning statement and audience profile, centered on women athletes ages 20–40: college students fitting training between classes, women pursuing a new 5K goal, and committed competitors across sports', 'A messaging framework connecting approved product benefits to training, competition, and life beyond sport', 'A clear point of difference informed by the competitive review', 'A final tagline, short brand introduction, and three core messages your team can use consistently', 'Tone-of-voice guidance and example headlines for product, website, social, and email use'],
    note: 'Product claims, including durability, hypoallergenic materials, and resistance to tarnishing, will use facts approved by your team. Women athletes lead the positioning, with room for the men’s chain line identified in your brief.',
  },
  {
    title: 'Naming',
    intro: 'An intentional naming process that gives you a clear rationale and a confident decision.',
    items: ['Naming criteria informed by the strategy, the audience, and the relationship to Cords Club', 'Collaborative naming moodboards to explore the associations, language, and kinds of names that resonate with both founders', 'Focused name exploration and screening, developed alongside the visual identity', 'One recommended name presented with its strategic rationale, meaning, audience fit, and room to grow', 'Initial domain and social handle availability checks for the recommended name, plus a preliminary review for obvious name conflicts', 'The name shown as part of one developed brand solution, with refinement following your feedback'],
    note: 'Strategy sets the direction. Naming and identity develop together, so the recommendation works as a complete brand. Availability is checked at the time of review; legal clearance, registration, and domain purchases are separate.',
  },
  {
    title: 'Brand identity',
    intro: 'A complete identity, shown working across the website, packaging, social, email, and merchandise. These applications are part of how we develop and test the brand, with usable examples and templates included in the final handoff.',
    items: ['Collaborative visual moodboarding, with individual input from both founders, to align on the creative direction', 'One developed creative direction showing the selected name, story, and identity together', 'Primary logo, secondary lockup, small-format mark, and social avatar', 'Color palette, typography, supporting graphics, and layout examples that combine athletic confidence with playful color and personality', 'Product and lifestyle photography direction centered on women athletes: focused, hardworking, and expressive, with room for the fun of sport and life outside training', 'A foundational brand book covering logo use, color, type, imagery, messaging, and applications', 'Organized vector, print, and digital logo assets in SVG, PDF, PNG, and JPG formats',
      'Website concept mockups: a homepage and product page, with a mobile homepage example showing how the identity translates to a smaller screen', 'Packaging mockups for a jewelry backing card and a mailer or box, showing the product and unboxing experience', 'Social profile assets and four editable templates: two feed posts and two stories', 'Two editable email layout examples: a welcome email and a product launch email', 'Two merchandise mockups, such as a T-shirt and tote, showing how the brand extends beyond the jewelry', 'Editable source files for the mockups and templates, plus a walkthrough of the brand book and asset folder'],
    note: 'One developed direction and three rounds of consolidated refinement are included across the engagement. Website, packaging, and merchandise examples demonstrate the brand in context. Full website design, development, clickable prototypes, production-ready packaging, manufacturing, email coding, photography production, font licenses, and ongoing campaigns are separate. Entirely new directions after approval are scoped separately. This proposal covers the jewelry brand only.',
  },
]
const phases = [
  ['01', 'Discovery', 'Understand the athletes you want to reach, what is already working in your marketing, and the product advantages behind the brand. Establish the positioning and creative priorities.'],
  ['02', 'Ideation & moodboarding', 'Gather input from both founders through visual and naming moodboards. Explore personality, language, color, and associations, then align on the territory we will develop.'],
  ['03', 'The pitch', 'Present one developed solution: name, rationale, messaging, and identity, shown across website, packaging, and other relevant mockups. You see the brand as a whole.'],
  ['04', 'Refinement & handoff', 'Use your feedback to refine the solution, complete the applications and templates, and deliver the brand book and organized assets. Walk your team through putting the brand to work.'],
]
const namedBrands = [
  [
    "Notably",
    "Standout hires for growing teams.",
    "Recruiting"
  ],
  [
    "Runway",
    "Elevating confidence.",
    "Medical Aesthetics"
  ],
  [
    "Heartwood",
    "Team health is business health.",
    "Workplace Wellness"
  ],
  [
    "Off Menu",
    "Re-plating daily supplements.",
    "Health & Wellness"
  ],
  [
    "Within",
    "Strength from within.",
    "Gym & Wellness"
  ],
  [
    "Good Measure",
    "Get it right.",
    "Home Services"
  ],
  [
    "Soft",
    "Soft inside.",
    "Food & Bakery"
  ],
  [
    "Undefeated",
    "How to win.",
    "Legal"
  ],
  [
    "Moat",
    "None dare cross.",
    "Security"
  ],
  [
    "Day One",
    "You never forget your first.",
    "Car Club"
  ],
  [
    "Out There",
    "Unseen perspectives.",
    "Video Production"
  ],
  [
    "No Walls",
    "Creative real estate marketing.",
    "Real Estate"
  ],
  [
    "Smell The Roses",
    "Enjoy the moment.",
    "Children’s Clothing"
  ],
  [
    "Public Library",
    "Return often.",
    "Café"
  ],
  [
    "Layers",
    "Your business has depth.",
    "Consulting"
  ],
  [
    "Odd Feather",
    "Unique heritage-raised chickens.",
    "Food & Beverage"
  ],
  [
    "The Passenger",
    "A global cuisine journey.",
    "Hospitality"
  ],
  [
    "Nylo",
    "Family wellness activities.",
    "Education"
  ],
  [
    "Weather Pattern",
    "Predictable comfort.",
    "HVAC"
  ],
  [
    "Green Nomad",
    "Out of this world vacation rentals.",
    "Travel"
  ],
  [
    "Parachute",
    "Advice you can’t live without.",
    "Consulting"
  ],
  [
    "Midnight Oil",
    "Women’s workwear.",
    "Fashion"
  ],
  [
    "Lattice",
    "Assemble your future.",
    "Education"
  ],
  [
    "Museum",
    "Furniture as art.",
    "Manufacturing"
  ],
  [
    "Remastered",
    "Skin, only better.",
    "Wellness"
  ],
  [
    "The Work",
    "In order to achieve invention.",
    "Cannabis"
  ],
  [
    "Nymph",
    "Adult fly fishing.",
    "Outdoors"
  ],
  [
    "Italic",
    "Emphasize your event.",
    "Hospitality"
  ],
  [
    "Lost Dog",
    "Find your way home.",
    "Real Estate"
  ],
  [
    "Copper Coyote",
    "Lost days found in Austin.",
    "Fashion"
  ],
  [
    "Ceremony",
    "Reviving grooming traditions.",
    "Beauty"
  ],
  [
    "Middlemist",
    "Rare floristry, a delivery away.",
    "Retail"
  ]
]
const work = [
  { name: 'Wild Hare', tag: 'Bold & feminine', slug: 'wild-hare', image: 'wild-hare.jpg', body: 'A confident, feminine identity with vivid pink and a bold personality. A reference for making a specific audience feel the brand is unmistakably theirs.' },
  { name: 'Freddie', tag: 'Health with personality', slug: 'freddie', image: 'freddie.jpg', body: 'A playful sleep-glasses brand that moves beyond sterile, performance-first health branding. A useful example of bringing humor and humanity to a functional product.' },
  { name: 'Nymph', tag: 'A distinct point of view', slug: 'nymph', image: 'nymph.png', body: 'The work that caught your attention in our conversation. A bold outdoor identity with a memorable name and unmistakable personality, showing how far a clear point of view can carry a brand.' },
  { name: 'Molly Engels', tag: 'Color & personality', slug: 'molly-engles', image: 'molly-engles.jpg', body: 'A playful identity built around a personal story. A useful reference for the color and character you responded to.' },
  { name: 'Rhythm', tag: 'Fitness & movement', slug: 'rhythm', image: 'rhythm.jpg', body: 'A vibrant fitness identity carried across graphics, motion, and signage. Athletic energy with a welcoming personality.' },
  { name: 'Moat', tag: 'World-building', slug: 'moat', image: 'moat.png', body: 'A modern castle became the world behind this smart-lock brand. The name, story, and visual identity share one idea, giving packaging, print, and the website meaning beyond aesthetics.' },
]

function Section({ id, number, title, children, dark = false }: { id: string; number: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px] ${dark ? 'bg-ink text-paper' : ''}`}>
    <div className="flex items-center justify-between gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>§ {number} · {title}</span>
      <span className={`eyebrow hidden sm:block ${dark ? 'text-paper/60' : 'text-ink-2'}`}>Anchovies × TBD Brand</span>
    </div>
    <h2 id={`${id}-title`} className="display mb-12 mt-10 text-[48px] md:text-[72px]">{title}</h2>
    {children}
  </section>
}

export function CordsBrandProposal() {
  useEffect(() => {
    document.title = 'Anchovies × TBD Brand · Proposal'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Naming, brand strategy, and a complete identity with applied mockups for a new athletic jewelry brand.')
  }, [])

  return <div className="bg-paper text-ink">
    <a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
    <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16">
        <a href="#overview" aria-label="TBD Brand proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" /><span className="hidden text-[13px] sm:inline">Anchovies × TBD Brand</span></a>
        <a href="#investment" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium transition-colors hover:bg-ink hover:text-paper">View investment</a>
      </div>
      <nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}
      </nav>
    </header>
    <main>
      <section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24">
        <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row"><span className="eyebrow text-ink-2">Strategy · Naming · Brand identity</span><span className="eyebrow text-ink-2">Prepared for Ben & the Cords Club team</span></div>
        <h1 className="display max-w-[1100px] pb-12 text-[56px] tracking-[-0.028em] sm:text-[80px] md:text-[104px] lg:text-[128px]">New brand proposal.</h1>
        <div className="grid gap-10 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <p className="serif max-w-[680px] text-[28px] leading-[1.3] md:text-[36px]">Build the jewelry brand she brings to every challenge.</p>
          <div className="space-y-6"><p className="text-[15px] leading-6 text-ink-2">You’ve already seen athletes respond to the product and your fitness-focused creative. Now the brand needs to match that demand. We’re speaking to women who train hard, care about their goals, and bring their own style to sport. From training between classes to chasing a new personal best, she wants performance, personality, and the freedom to enjoy it.</p><div className="flex flex-wrap gap-x-8 gap-y-3"><span className="eyebrow">TBD · Name to be developed</span><span className="eyebrow">{money(total)} · Fixed project fee</span></div></div>
        </div>
      </section>

      <Section id="goals" number="01" title="Goals">
        <p className="mb-12 max-w-[760px] text-[17px] leading-7 text-ink-2">The outcomes we’re working toward: stronger preference, clearer reasons to buy, and a brand that earns a place in her life as an athlete.</p>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ['Become her first choice', 'Give women athletes a clear reason to choose this jewelry for training and everything that follows. Connect practical product advantages with a brand she wants to wear.'],
            ['Turn attention into demand', 'Build on the response you’ve already seen from fitness audiences. Make the promise clear from the first ad through the product page, helping interest become a reason to buy.'],
            ['Be recognized across sport', 'Create a name, look, and voice she remembers, whether she discovers you at the gym, on a teammate, or in her feed. Build recognition that belongs to this brand.'],
            ['Make performance personal', 'Bring ambition, color, and personality together. Speak to women who take their sport seriously and still want it to be fun, from a first 5K to competitive training.'],
            ['Give her a brand to come back to', 'Build an identity she can grow attached to beyond a single pair of earrings. Create a consistent point of view that supports future collections, repeat purchases, and recommendations.'],
            ['Compete as a distinct brand', 'Establish a clear place for athletic jewelry beyond conventional luxury styling. Give the sister brand its own appeal while building on the product experience behind Cords Club.'],
          ].map(([title, body], i) => <div key={title} className="border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-5 mt-6 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-6 text-ink-2">{body}</p></div>)}
        </div>
      </Section>

      <section aria-labelledby="outcome-title" className="border-b border-[var(--color-rule)] px-6 py-16 md:px-16 lg:px-[120px] lg:py-20">
        <h2 id="outcome-title" className="eyebrow mb-7 text-ink-2">The outcome</h2>
        <p className="serif max-w-[1050px] text-[34px] leading-[1.25] md:text-[48px]">Turn proven demand into a brand women athletes seek out, wear with pride, and come back to.</p>
      </section>

      <Section id="scope" number="02" title="Scope">
        <p className="mb-12 max-w-[680px] text-[17px] leading-7 text-ink-2">One connected brand, from strategy to examples of the first unboxing. You’ll receive the identity, messaging, and templates, plus mockups that show how it all works together.</p>
        {scope.map((group, i) => <div key={group.title} className="grid gap-8 border-t border-[var(--color-rule)] py-10 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-5 mt-4 text-[34px] leading-tight md:text-[40px]">{group.title}</h3><p className="max-w-[430px] text-[15px] leading-6 text-ink-2">{group.intro}</p></div>
          <div><ul className="space-y-4">{group.items.map(item => <li key={item} className="flex gap-4 text-[15px] leading-6"><span aria-hidden="true" className="text-ink-2">↗</span><span>{item}</span></li>)}</ul><p className="mt-8 border-t border-ink/15 pt-5 text-[13px] leading-6 text-ink-2">{group.note}</p></div>
        </div>)}
      </Section>

      <Section id="process" number="03" title="Process" dark>
        <p className="mb-12 max-w-[760px] font-normal text-[24px] leading-[1.4] text-paper/85">We agree on the direction together, then develop one complete creative solution. Your feedback shapes the refinements.</p>
        <div className="grid gap-10 md:grid-cols-2">{phases.map(([n, title, body]) => <div key={n} className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">{n}</span><h3 className="serif mb-4 mt-5 text-[34px]">{title}</h3><p className="max-w-[500px] text-[15px] leading-6 text-paper/75">{body}</p></div>)}</div>
      </Section>

      <Section id="work" number="04" title="Selected Work">
        <p className="mb-10 max-w-[740px] text-[17px] leading-7 text-ink-2">A few relevant examples from the work you’ve already explored. These show how we build an identity around each business, then carry it into everyday use.</p>
        <div className="grid gap-10 md:grid-cols-3">{work.map(item => <a key={item.slug} href={`https://anchovies.agency/work/${item.slug}`} target="_blank" rel="noreferrer" className="group block">
          <img src={`/images/cords-proposal/${item.image}`} alt={`${item.name} brand identity by Anchovies`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <p className="eyebrow mt-6 text-ink-2">{item.tag}</p><h3 className="serif mb-4 mt-3 text-[32px] group-hover:underline">{item.name} ↗</h3><p className="text-[14px] leading-6 text-ink-2">{item.body}</p>
        </a>)}</div>
        <div className="mt-14 border-t border-[var(--color-rule)] pt-10">
          <div className="mb-8 grid gap-6 md:grid-cols-[1fr_2fr]">
            <div><p className="display text-[72px] leading-none md:text-[96px]">{namedBrands.length}</p><h3 className="serif mt-4 text-[30px]">Brands we’ve named.</h3></div>
            <p className="max-w-[650px] self-end text-[16px] leading-7 text-ink-2">From gyms and wellness brands to fashion, hospitality, and technology, we’ve helped businesses find names with a point of view. Each one connects a business to an idea people can remember.</p>
          </div>
          <table className="block w-full border-collapse text-left sm:table">
            <caption className="sr-only">32 brands named by Anchovies, with their brand idea and industry.</caption>
            <thead className="hidden sm:table-header-group"><tr className="border-b border-ink/40"><th scope="col" className="eyebrow w-[25%] pb-4 pr-5">Name</th><th scope="col" className="eyebrow w-[48%] pb-4 pr-5">Brand idea</th><th scope="col" className="eyebrow pb-4">Industry</th></tr></thead>
            <tbody className="block sm:table-row-group">{namedBrands.map(([name, idea, industry]) => <tr key={name} className="block border-b border-[var(--color-rule)] py-5 sm:table-row sm:py-0">
              <th scope="row" className="block text-[18px] font-medium sm:table-cell sm:py-5 sm:pr-5 sm:text-[16px]">{name}</th>
              <td className="block pt-2 text-[14px] leading-6 text-ink-2 sm:table-cell sm:py-5 sm:pr-5">{idea}</td>
              <td className="block pt-2 text-[12px] leading-5 text-ink-2 sm:table-cell sm:py-5 sm:text-[13px]">{industry}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="mt-12 border-t border-[var(--color-rule)] pt-8"><a href="https://anchovies.agency/work" target="_blank" rel="noreferrer" className="inline-block border-b border-ink py-3 text-[15px]">Explore and filter our work ↗</a><p className="mt-4 text-[14px] leading-6 text-ink-2">Use the portfolio filters to explore more industries and types of work.</p></div>
      </Section>

      <Section id="timeline" number="05" title="Timeline">
        <div className="mb-12 grid gap-6 lg:grid-cols-2"><p className="serif text-[36px]">Four weeks.</p><p className="max-w-[550px] text-[15px] leading-6 text-ink-2">Four weeks from kickoff to final handoff. We’ll agree on the start date together. Consolidated feedback from both founders, timely name approval, product information, and reference photography help keep the work moving. Website production, packaging production, and launch scheduling sit outside this branding timeline.</p></div>
        {[
          ['Week 1', 'Discovery & moodboarding', 'Strategy, founder input, and collaborative naming and visual moodboards.'],
          ['Week 2', 'Development & pitch', 'Name and identity development, presented as one solution with applied mockups.'],
          ['Week 3', 'Refinement & applications', 'Refine the solution and complete website, packaging, and merchandise examples, plus social and email templates.'],
          ['Week 4', 'Final files & handoff', 'Final identity assets, brand guidelines, editable examples, and a team walkthrough.'],
        ].map(([time, title, body]) => <div key={time} className="grid gap-3 border-t border-[var(--color-rule)] py-7 md:grid-cols-[120px_1fr_1.5fr] md:gap-8"><span className="eyebrow text-ink-2">{time}</span><h3 className="serif text-[25px]">{title}</h3><p className="text-[14px] leading-6 text-ink-2">{body}</p></div>)}
      </Section>

      <Section id="investment" number="06" title="Investment" dark>
        <p className="display mb-5 text-[76px] md:text-[112px]">{money(total)}</p>
        <p className="mb-10 max-w-[760px] text-[17px] leading-7 text-paper/80">One complete engagement for brand strategy, naming, and brand identity, including the mockups, guidelines, and templates described above. The breakdown shows how the fixed project fee is allocated; these are connected parts of the engagement, not separate purchase options.</p>
        {investment.map(item => <div key={item.label} className="flex justify-between gap-6 border-t border-paper/25 py-6 text-[16px]"><span>{item.label}</span><span className="shrink-0 tabular-nums">{money(item.amount)}</span></div>)}
        <div className="mt-12 grid gap-8 md:grid-cols-3">{payments.map(payment => <div key={payment.label} className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">{payment.percent}% · {payment.label}</span><p className="serif mt-4 text-[40px]">{money(total * payment.percent / 100)}</p></div>)}</div>
        <p className="mt-10 max-w-[800px] text-[14px] leading-6 text-paper/75">Third-party costs and additional work will be identified and approved before proceeding.</p>
      </Section>

      <Section id="next" number="07" title="Next Steps">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="serif mb-6 text-[32px] leading-[1.3]">Let’s review the scope.</p>
            <p className="max-w-[530px] text-[15px] leading-7 text-ink-2">Let us know how this scope fits your plans and where you’d like to adjust it. Once the scope, investment, and timing are agreed, we’ll prepare the agreement and kickoff invoice.</p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <a href={reviewHref} className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-center text-[14px] font-medium text-paper transition-colors hover:bg-ink-2 sm:w-auto">Share feedback</a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full border border-ink px-6 py-4 text-center text-[14px] font-medium transition-colors hover:bg-ink hover:text-paper sm:w-auto">Review the proposal together</a>
          </div>
        </div>
      </Section>
    </main>
    <footer className="flex flex-col justify-between gap-5 px-6 py-10 md:flex-row md:px-16 lg:px-[120px]"><img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-fit" /><span className="eyebrow text-ink-2">Prepared for Cords Club · October 12, 2026</span><a href="#overview" className="text-[12px]">Back to top ↑</a></footer>
  </div>
}
