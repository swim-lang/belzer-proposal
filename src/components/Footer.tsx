import { footer } from '../content'

export function Footer() {
  return (
    <footer className="bg-paper border-t border-[var(--color-rule)] flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 md:px-16 lg:px-[120px] py-10 md:py-12">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-lockup.svg" alt={footer.brand} className="h-[18px] md:h-[20px] w-auto block" />
        <span className="block w-px h-[12px] bg-[var(--color-rule)]" />
        <span className="text-[12px] text-ink-2">{footer.preparedFor}</span>
      </div>
      <div className="flex items-center gap-6">
        {footer.rightLines.map((line) => (
          <span key={line} className="eyebrow text-ink-2">
            {line}
          </span>
        ))}
      </div>
    </footer>
  )
}
