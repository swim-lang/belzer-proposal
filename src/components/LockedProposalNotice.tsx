import { useEffect } from 'react'

export function LockedProposalNotice() {
  useEffect(() => {
    document.title = 'Anchovies - Archived Proposal'
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-12 text-ink">
      <section className="w-full max-w-[680px] border border-[var(--color-rule)] bg-paper p-7 sm:p-10 md:p-12">
        <div className="flex items-center justify-between gap-6 border-b border-[var(--color-rule)] pb-6">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[12px] w-auto" />
          <span className="eyebrow text-ink-2">Archived proposal</span>
        </div>
        <div className="py-12 sm:py-16">
          <h1 className="display max-w-[560px] text-[52px] leading-[54px] sm:text-[72px] sm:leading-[72px]">
            This proposal is no longer available.
          </h1>
          <p className="mt-7 max-w-[460px] text-[16px] leading-[26px] text-ink-2">
            This version has been replaced. Contact Anchovies for the current proposal.
          </p>
        </div>
        <div className="flex items-center justify-between gap-6 border-t border-[var(--color-rule)] pt-6">
          <span className="eyebrow text-ink-2">Private client workspace</span>
          <a href="mailto:sean@anchovies.agency" className="text-[13px] text-mac hover:underline">Contact Anchovies</a>
        </div>
      </section>
    </main>
  )
}
