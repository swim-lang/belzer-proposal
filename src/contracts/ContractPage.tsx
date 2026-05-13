import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ContractData } from './types'

type ContractPageProps = {
  contract: ContractData
}

const agencySignature = {
  name: 'Sean Ashlow',
  title: 'Founder, Anchovies',
  date: 'May 13, 2026',
  image: '/signatures/sean-ashlow-signature.png',
}

function todayForInput() {
  return new Date().toISOString().slice(0, 10)
}

function formatDate(value: string) {
  if (!value) return '____________'
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(year, month - 1, day))
}

function trackContractEvent(input: {
  contractSlug: string
  eventType: 'view' | 'download_pdf'
  signerName?: string
  signerTitle?: string
  signedDate?: string
}) {
  const payload = JSON.stringify({
    ...input,
    pageUrl: window.location.href,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/contract-events', new Blob([payload], { type: 'application/json' }))
    return
  }

  fetch('/api/contract-events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    /* Event tracking should never block contract review. */
  })
}

function PrintButton({
  onBeforePrint,
}: {
  onBeforePrint?: () => void
}) {
  const handlePrint = () => {
    document.documentElement.classList.add('contract-print-mode')
    onBeforePrint?.()
    window.setTimeout(() => window.print(), 100)
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-paper transition-colors hover:bg-ink-2"
    >
      Download PDF
    </button>
  )
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow text-ink-2">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-none border border-[var(--color-rule)] bg-paper px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-ink-2/55 focus:border-ink"
      />
    </label>
  )
}

function SignaturePanel({
  clientName,
  signerName,
  setSignerName,
  signerTitle,
  setSignerTitle,
  signedDate,
  setSignedDate,
  proposalHref,
  onBeforePrint,
}: {
  clientName: string
  signerName: string
  setSignerName: (value: string) => void
  signerTitle: string
  setSignerTitle: (value: string) => void
  signedDate: string
  setSignedDate: (value: string) => void
  proposalHref: string
  onBeforePrint: () => void
}) {
  return (
    <aside className="no-print border border-[var(--color-rule)] bg-paper p-6 lg:sticky lg:top-28 lg:self-start">
      <div className="flex flex-col gap-2 border-b border-[var(--color-rule)] pb-5">
        <span className="eyebrow text-ink-2">Ready to proceed</span>
        <h2 className="serif text-[32px] leading-[36px] tracking-[-0.016em]">Sign on page.</h2>
        <p className="text-[13px] leading-[20px] text-ink-2">
          Type the authorized signer information below, then download the finished agreement as a PDF.
        </p>
      </div>
      <div className="flex flex-col gap-4 py-5">
        <TextField label="Signer name" value={signerName} onChange={setSignerName} placeholder="Chad Mayes" />
        <TextField label="Title" value={signerTitle} onChange={setSignerTitle} placeholder={`Authorized signer, ${clientName}`} />
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-ink-2">Date</span>
          <input
            type="date"
            value={signedDate}
            onChange={(event) => setSignedDate(event.target.value)}
            className="rounded-none border border-[var(--color-rule)] bg-paper px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink"
          />
        </label>
      </div>
      <div className="flex flex-col gap-3 border-t border-[var(--color-rule)] pt-5">
        <PrintButton onBeforePrint={onBeforePrint} />
        <a href={proposalHref} className="inline-flex justify-center rounded-full border border-[var(--color-rule)] px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper">
          Back to proposal
        </a>
      </div>
    </aside>
  )
}

function ContractSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="contract-section">
      <h2>
        {number}. {title}
      </h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function ContractPage({ contract }: ContractPageProps) {
  const isPrintParam = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('print') === '1'
  const [signerName, setSignerName] = useState(contract.client.contactName || '')
  const [signerTitle, setSignerTitle] = useState(`Authorized signer, ${contract.client.name}`)
  const [signedDate, setSignedDate] = useState(todayForInput())
  const [isPrintMode, setIsPrintMode] = useState(isPrintParam)
  const displayedDate = useMemo(() => formatDate(signedDate), [signedDate])
  const proposalHref = `/proposal/${contract.slug}`

  useEffect(() => {
    document.title = `Anchovies × ${contract.client.name} — Contract`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', `Service agreement between ${contract.client.name} and Anchovies.`)
    }

    const removePrintMode = () => {
      if (!isPrintParam) {
        setIsPrintMode(false)
      }
    }
    window.addEventListener('afterprint', removePrintMode)
    return () => {
      window.removeEventListener('afterprint', removePrintMode)
      document.documentElement.classList.remove('contract-print-mode')
    }
  }, [contract.client.name, isPrintParam])

  useEffect(() => {
    document.documentElement.classList.toggle('contract-print-mode', isPrintMode)
  }, [isPrintMode])

  useEffect(() => {
    if (isPrintParam) return
    trackContractEvent({ contractSlug: contract.slug, eventType: 'view' })
  }, [contract.slug, isPrintParam])

  const preparePrint = () => {
    trackContractEvent({
      contractSlug: contract.slug,
      eventType: 'download_pdf',
      signerName,
      signerTitle,
      signedDate,
    })
    setIsPrintMode(true)
  }

  return (
    <main className="contract-page bg-paper text-ink">
      {!isPrintMode && (
        <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 px-6 py-4 backdrop-blur-sm md:px-16">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6">
            <a href={proposalHref} className="flex items-center gap-3">
              <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
              <span className="hidden text-[13px] text-ink-2 sm:inline">
                <span className="text-ink">Anchovies</span>
                <span className="mx-2">×</span>
                {contract.client.name}
              </span>
            </a>
            <div className="flex items-center gap-3">
              <a href={proposalHref} className="hidden rounded-full px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper sm:inline-flex">
                Proposal
              </a>
              <PrintButton onBeforePrint={preparePrint} />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-10 md:px-16 lg:grid-cols-[1fr_340px] lg:py-14">
        <article className="contract-document bg-white px-7 py-8 shadow-[0_20px_80px_rgba(10,10,10,0.08)] md:px-12 md:py-12">
          <header className="contract-header">
            <div>
              <p className="eyebrow text-ink-2">Service Agreement</p>
              <h1>{contract.title}</h1>
            </div>
            <div className="contract-meta">
              <span>{contract.preparedDate}</span>
              <span>{contract.client.name}</span>
              <span>{contract.agency.name}</span>
            </div>
          </header>

          <p>
            This Contract is between {contract.client.name} (the &quot;Client&quot;) and Anchovies, a Colorado limited
            liability company (the &quot;Agency&quot;).
          </p>
          <p>
            <strong>Client Contact:</strong> {contract.client.contactName} · {contract.client.email}
            <br />
            <strong>Client Address:</strong> {contract.client.address}
            <br />
            <strong>Effective Date:</strong> {contract.effectiveDate}
          </p>

          <ContractSection number="1" title="Scope of Work">
            <p>
              <strong>1.1 Project.</strong> The Client is hiring the Agency to perform the services described in Section
              18 (Scope and Deliverables), including the deliverables, process, and investment summary.
            </p>
            <p>
              <strong>1.2 Priority of Documents.</strong> If there is any conflict between this Contract and Section 18,
              this Contract controls first, then Section 18. Any external links, emails, or prior discussions are
              superseded unless expressly incorporated into this Contract in writing.
            </p>
          </ContractSection>

          <ContractSection number="2" title="Schedule and Collaboration">
            <p>
              <strong>2.1 Start Date and Timeline.</strong> The Agency will begin work {contract.projectStart}. The
              overall timeline is estimated at {contract.timeline} and may adjust based on feedback speed, scheduling,
              and availability.
            </p>
            <p>
              <strong>2.2 Client Responsibilities.</strong> The Client agrees to provide timely feedback, decisions, and
              approvals; provide necessary materials in a reasonable timeframe; and maintain one primary point of contact
              authorized to consolidate and provide feedback.
            </p>
            <p>
              <strong>2.3 Pauses and Re-Scheduling.</strong> If the Client&apos;s feedback or scheduling delays materially
              pause the project, the Agency may adjust the timeline, resequence work, and invoice for work completed to
              date. If the project is resumed after a pause, the parties may agree in writing to updated dates and, if
              needed, updated costs.
            </p>
          </ContractSection>

          <ContractSection number="3" title="Fees and Payment">
            <p>
              <strong>3.1 Project Fee.</strong> The Client will pay the Agency {contract.fee} (USD). This reflects the
              full {contract.originalValue} recommended engagement with an {contract.accommodation} budget
              accommodation.
            </p>
            <p>
              <strong>3.2 Milestone Invoicing Schedule.</strong>
            </p>
            <ul>
              {contract.paymentMilestones.map((milestone) => (
                <li key={milestone.label}>
                  {milestone.amount} — {milestone.label}. {milestone.body}
                </li>
              ))}
            </ul>
            <p>
              <strong>3.3 Payment Terms.</strong> The Client agrees to pay each invoice within 5 calendar days of
              receipt.
            </p>
            <p>
              <strong>3.4 Late Fees.</strong> Late payments accrue interest at 2.0% per month or the maximum rate
              permitted by law, whichever is less, on the unpaid balance.
            </p>
            <p>
              <strong>3.5 Suspension for Nonpayment.</strong> If an invoice is not paid when due, the Agency may pause
              work until the account is current. Any pause extends the timeline accordingly. The Agency is not responsible
              for missed deadlines caused by a payment pause.
            </p>
          </ContractSection>

          <ContractSection number="4" title="Expenses">
            <p>
              <strong>4.1 Preapproval Required.</strong> The Client will reimburse preapproved, reasonable out-of-pocket
              expenses. Expenses must be approved in writing before they are incurred.
            </p>
            <p>
              <strong>4.2 No Surprise Costs.</strong> The Agency will not incur substantial third-party costs without
              preapproval.
            </p>
          </ContractSection>

          <ContractSection number="5" title="Change Orders and Out-of-Scope Work">
            <p>
              <strong>5.1 Scope Boundary.</strong> Anything not listed in Section 18 (Scope and Deliverables) is out of
              scope.
            </p>
            <p>
              <strong>5.2 Change Orders.</strong> If the Client requests additional deliverables, additional revision
              rounds beyond what is included, added pages or templates, major direction shifts, accelerated timelines, or
              work that materially expands the scope, the Agency will provide a written change estimate. Work begins on
              changes only after written approval.
            </p>
            <p>
              <strong>5.3 Good-Faith Extras.</strong> If the Agency performs incidental extra work without issuing a
              change order, that does not waive the Agency&apos;s right to treat similar future requests as out of scope.
            </p>
          </ContractSection>

          <ContractSection number="6" title="Review, Acceptance, and Revisions">
            <p>
              <strong>6.1 Review Window.</strong> For each deliverable or deliverable set, the Client will provide
              feedback within 10 calendar days of receipt. If the Client does not respond within 10 days, the deliverable
              is deemed accepted.
            </p>
            <p>
              <strong>6.2 Included Revisions by Phase.</strong>
            </p>
            <BulletList items={contract.revisionRounds} />
            <p>
              Revisions mean refining the agreed direction, not restarting the project. New directions or substantial
              rework are handled via Section 5.
            </p>
            <p>
              <strong>6.3 Direction Changes.</strong> If the Client requests a new direction after approving a prior
              direction, or requests substantial rework not tied to the agreed scope, that work is out of scope and
              handled via Section 5.
            </p>
            <p>
              <strong>6.4 No Satisfaction Guarantee and No Refund for Subjective Preference.</strong> The Client
              acknowledges that branding and creative services involve professional judgment and subjective preferences.
              Payment is for professional time, process, and deliverables produced. Subjective dissatisfaction does not
              create a refund right and does not constitute breach, provided the Agency delivers the listed deliverables
              and offers the included revision process.
            </p>
            <p>
              <strong>6.5 Delivery vs Presentation.</strong> The Agency may withhold delivery of final export files and
              handoff packages until all invoices due are paid in full.
            </p>
            <p>
              <strong>6.6 Deemed Acceptance and Project Continuity.</strong> If a deliverable is deemed accepted under
              Section 6.1, the Agency may proceed to the next phase. Later requests to revisit a deemed-accepted phase are
              treated as a direction change under Section 6.3.
            </p>
          </ContractSection>

          <ContractSection number="7" title="Term and Termination">
            <p>
              <strong>7.1 Term.</strong> This Contract continues until the work is completed or terminated under this
              Section.
            </p>
            <p>
              <strong>7.2 Termination for Convenience.</strong> Either party may terminate for any reason by providing
              written notice. Termination becomes effective 7 days after notice is sent.
            </p>
            <p>
              <strong>7.3 Milestones Earned.</strong> Milestones are earned upon commencement of the applicable phases
              associated with that milestone, not upon subjective approval. Upon termination, the Client remains
              responsible for paying all milestones earned through the effective termination date, plus any approved
              expenses.
            </p>
            <p>
              <strong>7.4 Payment on Termination.</strong> If the Contract is terminated, the Client will pay for all
              work performed and milestones earned through the termination effective date; reimburse any preapproved,
              noncancellable expenses; and no refunds are owed for completed work or time already spent.
            </p>
          </ContractSection>

          <ContractSection number="8" title="Ownership, Deliverables, and Portfolio Rights">
            <p>
              <strong>8.1 Definitions.</strong> &quot;Deliverables&quot; means the final, client-facing outputs listed
              in Section 18. &quot;Working Files&quot; means drafts, exploratory concepts, internal notes, intermediate
              files, raw working documents, and design source files unless Section 18 explicitly includes them.
            </p>
            <p>
              <strong>8.2 Transfer of Ownership.</strong> Upon the Client&apos;s full payment of all amounts due, the
              Agency assigns to the Client all right, title, and interest in the Deliverables created specifically for the
              Client.
            </p>
            <p>
              <strong>8.3 Working Files.</strong> Working Files are not transferred unless explicitly included in Section
              18 or purchased via a written change order.
            </p>
            <p>
              <strong>8.4 Background IP.</strong> The Agency may use pre-existing tools, templates, methods, fonts
              properly licensed, code, or frameworks not created specifically for the Client (&quot;Background IP&quot;).
              The Agency retains ownership of Background IP. Upon full payment, the Agency grants the Client a
              non-exclusive, worldwide license to use any Background IP solely as incorporated into the Deliverables.
            </p>
            <p>
              <strong>8.5 Portfolio Rights.</strong> The Client grants the Agency a perpetual, non-exclusive right to
              display the Deliverables for portfolio, website, awards, and promotional purposes after public launch. If
              the Client requests that a specific item be kept private for legitimate confidentiality reasons, the parties
              will agree in writing to a limited exception.
            </p>
          </ContractSection>

          <ContractSection number="9" title="Naming and Trademark">
            <p>
              <strong>9.1 Trademark Clearance and Registration.</strong> The Client is responsible for trademark
              clearance, registration, and enforcement. The Agency does not provide legal advice, does not guarantee
              trademark availability, and does not guarantee registrability.
            </p>
          </ContractSection>

          <ContractSection number="10" title="Confidentiality">
            <p>
              <strong>10.1 Confidential Information.</strong> Each party may receive confidential information from the
              other. Each party will protect the other&apos;s confidential information using reasonable care and will use
              it only for performing under this Contract.
            </p>
          </ContractSection>

          <ContractSection number="11" title="Non-Solicitation">
            <p>
              <strong>11.1 Non-Solicit.</strong> During the term of this Contract and for 12 months after termination,
              neither party will solicit for hire the other party&apos;s employees or contractors who were directly
              involved in the project, except through general public postings not targeted at the other party.
            </p>
          </ContractSection>

          <ContractSection number="12" title="Representations and Warranties">
            <p>
              <strong>12.1 Authority.</strong> Each party represents it has authority to enter this Contract.
            </p>
            <p>
              <strong>12.2 Original Work.</strong> The Agency represents that the Deliverables are original to the Agency
              or properly licensed, to the best of the Agency&apos;s knowledge.
            </p>
            <p>
              <strong>12.3 No Guaranteed Outcomes.</strong> The Agency does not guarantee business outcomes, rankings,
              conversion metrics, public relations outcomes, or legislative outcomes.
            </p>
          </ContractSection>

          <ContractSection number="13" title="Limitation of Liability">
            <p>
              <strong>13.1 Liability Cap.</strong> To the maximum extent permitted by law, each party&apos;s total
              liability arising out of or related to this Contract is capped at the total fees actually paid under this
              Contract.
            </p>
            <p>
              <strong>13.2 Excluded Damages.</strong> Neither party is liable for indirect, incidental, special,
              consequential, exemplary, or punitive damages, including lost profits, lost business, or reputational harm.
            </p>
          </ContractSection>

          <ContractSection number="14" title="Indemnity">
            <p>
              <strong>14.1 Agency Indemnity.</strong> The Agency will defend and indemnify the Client against third-party
              claims alleging that the Deliverables, as delivered by the Agency, infringe third-party intellectual
              property rights, provided the Client promptly notifies the Agency and cooperates in the defense.
            </p>
            <p>
              <strong>14.2 Client Indemnity.</strong> The Client will defend and indemnify the Agency against third-party
              claims arising from Client-supplied materials or Client misuse of Deliverables.
            </p>
            <p>
              <strong>14.3 Indemnity and Liability Cap.</strong> The liability cap in Section 13 applies to the indemnity
              obligations in this Section 14 to the maximum extent permitted by law.
            </p>
          </ContractSection>

          <ContractSection number="15" title="Notices">
            <p>
              <strong>15.1 Delivery Methods.</strong> Notices must be in writing and delivered by personal delivery,
              email, or certified mail.
            </p>
            <p>
              <strong>15.2 Email Notice.</strong> Email notice is deemed received when sent to the last email address
              provided by the receiving party, absent an automated bounce or delivery failure notice.
            </p>
          </ContractSection>

          <ContractSection number="16" title="Dispute Resolution">
            <p>
              <strong>16.1 Mandatory Arbitration.</strong> Any dispute arising out of or related to this Contract shall
              be resolved by binding arbitration administered by the American Arbitration Association under its commercial
              rules, unless the parties agree in writing to litigate in court.
            </p>
            <p>
              <strong>16.2 Arbitration Location.</strong> Unless the parties agree otherwise in writing, arbitration will
              take place in Denver, Colorado or virtually by agreement.
            </p>
            <p>
              <strong>16.3 Injunctive Relief.</strong> Either party may seek injunctive relief in court to protect
              confidential information or intellectual property.
            </p>
          </ContractSection>

          <ContractSection number="17" title="General">
            <p>
              <strong>17.1 Independent Contractor.</strong> The Agency is an independent contractor.
            </p>
            <p>
              <strong>17.2 Assignment.</strong> Neither party may assign this Contract without the other party&apos;s
              written consent, except that the Client may assign in connection with a merger, acquisition, or sale of
              substantially all assets, provided the assignee assumes all obligations.
            </p>
            <p>
              <strong>17.3 Severability.</strong> If any provision is unenforceable, the remainder remains in effect.
            </p>
            <p>
              <strong>17.4 Entire Agreement.</strong> This Contract and Section 18 are the entire agreement and supersede
              prior discussions.
            </p>
            <p>
              <strong>17.5 Governing Law.</strong> Colorado law governs.
            </p>
            <p>
              <strong>17.6 Signatures.</strong> Electronic signatures are valid and binding.
            </p>
          </ContractSection>

          <section className="signature-section">
            <p>THE PARTIES AGREE TO THE FOREGOING AS EVIDENCED BY THEIR SIGNATURES BELOW.</p>
            <div className="signature-grid">
              <div>
                <p>
                  <strong>Client:</strong> {contract.client.name}
                </p>
                <div className="signature-line signature-script">{signerName || '_______________________'}</div>
                <p>
                  <strong>Signature:</strong> {signerName || '_______________________'}
                </p>
                <p>
                  <strong>Name / Title:</strong> {signerName || '____________'} · {signerTitle || '____________'}
                </p>
                <p>
                  <strong>Date:</strong> {displayedDate}
                </p>
              </div>
              <div>
                <p>
                  <strong>Agency:</strong> {contract.agency.name}
                </p>
                <div className="signature-line agency-signature-line">
                  <img src={agencySignature.image} alt={agencySignature.name} />
                </div>
                <p>
                  <strong>Signature:</strong> {agencySignature.name}
                </p>
                <p>
                  <strong>Name / Title:</strong> {agencySignature.name} · {agencySignature.title}
                </p>
                <p>
                  <strong>Date:</strong> {agencySignature.date}
                </p>
              </div>
            </div>
          </section>

          <ContractSection number="18" title="Scope and Deliverables">
            {contract.scopePhases.map((phase) => (
              <div key={phase.label} className="scope-phase">
                <h3>
                  {phase.label}) {phase.title}, {phase.price} ({phase.timing})
                </h3>
                <p>
                  <strong>Includes:</strong>
                </p>
                <BulletList items={phase.includes} />
                <p>
                  <strong>Deliverables:</strong> {phase.deliverable}
                </p>
              </div>
            ))}
            <div className="scope-phase">
              <h3>Investment Summary</h3>
              <p>
                Recommended engagement value: {contract.originalValue}. Budget accommodation: -{contract.accommodation}.
                Project fee: {contract.fee}.
              </p>
            </div>
            <div className="scope-phase">
              <h3>Optional Ongoing Support</h3>
              <p>
                After launch, the Client may request optional monthly retainer support starting at{' '}
                {contract.monthlyRetainer}. Retainer timing, monthly focus, and start date will be confirmed in writing
                before any recurring support begins.
              </p>
              <BulletList items={contract.optionalSupport} />
            </div>
          </ContractSection>
        </article>

        {!isPrintMode && (
          <SignaturePanel
            clientName={contract.client.name}
            signerName={signerName}
            setSignerName={setSignerName}
            signerTitle={signerTitle}
            setSignerTitle={setSignerTitle}
            signedDate={signedDate}
            setSignedDate={setSignedDate}
            proposalHref={proposalHref}
            onBeforePrint={preparePrint}
          />
        )}
      </div>
    </main>
  )
}
