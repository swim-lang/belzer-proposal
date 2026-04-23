import { needs } from '../content'
import { Reveal } from './Reveal'

export function WhatWeHeard() {
  return (
    <section id="heard" className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <Reveal className="flex flex-col gap-8 lg:w-[520px] shrink-0">
          <span className="eyebrow text-ink-2">§ 02 — What we heard</span>
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[56px] md:leading-[56px] lg:text-[64px] lg:leading-[64px] tracking-[-0.022em] max-w-[500px]">
            You are not looking for AI theater.
          </h2>
          <p className="text-[15px] leading-[24px] text-ink-2 max-w-[460px]">
            You have already looked at tools that feel built for larger firms, broader use cases, or generic chatbot-style demos. The problem is not that AI is uninteresting. The problem is that most tools are not shaped closely enough around the way your firm actually works.
          </p>
          <p className="text-[15px] leading-[24px] text-ink max-w-[460px]">
            From our conversation, the clearest needs were:
          </p>
        </Reveal>
        <Reveal className="flex-1 border-t border-[var(--color-rule)]">
          {needs.map((need, i) => (
            <div
              key={i}
              className={`flex items-start gap-6 py-5 ${i < needs.length - 1 ? 'border-b border-[var(--color-rule)]' : ''}`}
            >
              <span className="eyebrow text-ink-2 w-10 shrink-0 pt-0.5">
                N–{String(i + 1).padStart(2, '0')}
              </span>
              <span className="serif text-[20px] leading-[28px] md:text-[22px] md:leading-[30px] text-ink flex-1">
                {need}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
