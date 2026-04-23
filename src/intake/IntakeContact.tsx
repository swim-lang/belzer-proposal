export function IntakeContact({
  clientName,
  name,
  email,
  onChangeName,
  onChangeEmail,
}: {
  clientName: string
  name: string
  email: string
  onChangeName: (v: string) => void
  onChangeEmail: (v: string) => void
}) {
  return (
    <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-[120px] pt-10 lg:pt-14 pb-10 gap-8 max-w-[880px] overflow-auto">
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        <span className="text-[11px] tracking-[0.12em] uppercase shrink-0" style={{ color: 'var(--color-mac)' }}>
          Almost done
        </span>
        <span className="block w-1 h-1 rounded-full bg-[var(--color-rule)]/30 shrink-0" />
        <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2 shrink-0">Where should we send your copy?</span>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="serif text-[36px] leading-[42px] md:text-[48px] md:leading-[54px] lg:text-[56px] lg:leading-[60px] tracking-[-0.02em]">
          Where should we send your copy?
        </h1>
        <p className="text-[15px] leading-[23px] text-ink-2 max-w-[640px]">
          We&rsquo;ll send a copy of everything you just answered here, and a copy to Alexis so the team
          can start preparing. Reply to either and it comes straight to us.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-[560px]">
        <label className="flex flex-col gap-2">
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder={`${clientName} contact`}
            autoComplete="name"
            className="serif text-[20px] md:text-[22px] px-5 py-4 bg-white border border-[var(--color-rule)]/20 focus:border-ink outline-none rounded-[10px] transition-colors placeholder:italic placeholder:text-ink-2/45"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Email for your copy</span>
          <input
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="you@firm.com"
            autoComplete="email"
            inputMode="email"
            className="serif text-[20px] md:text-[22px] px-5 py-4 bg-white border border-[var(--color-rule)]/20 focus:border-ink outline-none rounded-[10px] transition-colors placeholder:italic placeholder:text-ink-2/45"
          />
        </label>
        <p className="text-[12px] leading-[18px] text-ink-2">
          Only used to send this one email and reach out about the sprint. Nothing else. No list.
        </p>
      </div>
    </div>
  )
}

export function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}
