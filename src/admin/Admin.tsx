import { useState } from 'react'
import { ContentProvider, useContentControl } from '../context/ContentContext'
import { Proposal } from '../Proposal'
import { Section, TextField, ArrayField, ObjectArrayField } from './fields'

const DEFAULT_PIN = '1234' // Simple gate — change before sharing the URL

function Gate({ children }: { children: React.ReactNode }) {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const pin = params.get('pin')
  const expected = (import.meta as unknown as { env?: { VITE_ADMIN_PIN?: string } }).env?.VITE_ADMIN_PIN ?? DEFAULT_PIN
  if (pin !== expected) {
    return (
      <div className="min-h-screen bg-paper text-ink flex items-center justify-center p-8">
        <div className="max-w-[420px] flex flex-col gap-4 text-center">
          <span className="eyebrow text-ink-2">Admin</span>
          <h1 className="serif text-[36px] leading-[40px] tracking-[-0.02em]">Restricted.</h1>
          <p className="text-[14px] text-ink-2">
            Add <code className="text-[12px] bg-ink/[0.06] px-1.5 py-0.5 rounded">?pin=YOUR_PIN</code> to the URL to
            continue. Default pin is <code className="text-[12px] bg-ink/[0.06] px-1.5 py-0.5 rounded">1234</code> —
            override with the <code className="text-[12px] bg-ink/[0.06] px-1.5 py-0.5 rounded">VITE_ADMIN_PIN</code>{' '}
            env var.
          </p>
        </div>
      </div>
    )
  }
  return <>{children}</>
}

function SyncBadge() {
  const { syncStatus, pullLatest } = useContentControl()
  let tone: string
  let dot: string
  let label: string
  let hint: string | null = null
  switch (syncStatus.kind) {
    case 'loading':
      tone = 'text-ink-2'
      dot = '#4A4A4A'
      label = 'Connecting…'
      break
    case 'ready':
      tone = 'text-ink-2'
      dot = '#1E3FE5'
      label = syncStatus.remote ? 'Shared · Synced' : 'Local only'
      hint = syncStatus.updatedAt ? `Updated ${new Date(syncStatus.updatedAt).toLocaleString()}` : null
      break
    case 'saving':
      tone = 'text-ink-2'
      dot = '#1E3FE5'
      label = 'Saving…'
      break
    case 'saved':
      tone = 'text-ink'
      dot = '#1E3FE5'
      label = 'Saved'
      hint = `Updated ${new Date(syncStatus.updatedAt).toLocaleTimeString()}`
      break
    case 'offline':
      tone = 'text-ink-2'
      dot = '#4A4A4A'
      label = 'Offline · Local only'
      hint = 'Shared store not configured'
      break
    case 'error':
      tone = 'text-ink'
      dot = '#b94a48'
      label = 'Error'
      hint = syncStatus.message
      break
    default:
      tone = 'text-ink-2'
      dot = '#4A4A4A'
      label = ''
  }
  return (
    <div className="flex items-center gap-2" title={hint ?? undefined}>
      <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
      <span className={`text-[11px] ${tone}`}>{label}</span>
      <button
        type="button"
        onClick={pullLatest}
        className="text-[10px] text-ink-2 hover:text-ink transition-colors"
        title="Pull latest draft from server"
      >
        ↻
      </button>
    </div>
  )
}

function Toolbar() {
  const { exportJSON, reset, content } = useContentControl()
  const [copied, setCopied] = useState(false)

  const download = () => {
    const blob = new Blob([exportJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${content.proposal.id || 'proposal'}-content.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exportJSON())
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* noop */
    }
  }

  return (
    <div className="flex flex-col gap-2 px-5 py-4 border-b border-[var(--color-rule)]/20 bg-paper sticky top-0 z-10">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Anchovies · Admin</span>
          <span className="text-[13px]">
            Editing <span className="font-medium">{content.client.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copy}
            className="px-3 py-1.5 border border-[var(--color-rule)]/30 hover:border-ink rounded-full text-[11px] text-ink-2 hover:text-ink transition-colors"
          >
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button
            type="button"
            onClick={download}
            className="px-3 py-1.5 rounded-full text-[11px] text-paper transition-colors"
            style={{ backgroundColor: 'var(--color-mac)' }}
          >
            Download JSON
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all edits and reload defaults? This clears shared and local drafts.')) reset()
            }}
            className="px-3 py-1.5 text-[11px] text-ink-2 hover:text-ink transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      <SyncBadge />
    </div>
  )
}

function RenameClientButton() {
  const { content, renameAcrossContent, updateField } = useContentControl()
  const onClick = () => {
    const oldName = content.client.name
    const oldShort = content.client.shortName
    const oldPoss = content.client.possessive
    const oldLoc = content.client.location
    const oldLead = content.client.leadName
    const oldPrimary = content.client.primary
    const oldSecondary = content.client.secondary

    const newName = prompt('New client full name', oldName)?.trim()
    if (!newName) return
    const newShort = prompt('New client short name', oldShort)?.trim() ?? oldShort
    const newPoss = prompt(`Possessive form (e.g. "${newName}'s")`, `${newName}'s`)?.trim() ?? oldPoss
    const newLoc = prompt('Location', oldLoc)?.trim() ?? oldLoc
    const newLead = prompt('Lead full name', oldLead)?.trim() ?? oldLead
    const newPrimary = prompt('Primary contact first name', oldPrimary)?.trim() ?? oldPrimary
    const newSecondary = prompt('Secondary contact first name', oldSecondary)?.trim() ?? oldSecondary
    const newTeamPhrase = `${newPrimary}, ${newSecondary}, and the team`
    const newTeamPhraseWithKey = `${newPrimary}, ${newSecondary}, and key team members`

    // Longest strings first so partials don't get clobbered (e.g. possessive before name).
    const replacements = [
      { from: `${oldPrimary}, ${oldSecondary}, and the team`, to: newTeamPhrase },
      { from: `${oldPrimary}, ${oldSecondary}, and key team members`, to: newTeamPhraseWithKey },
      { from: oldPoss, to: newPoss },
      { from: oldLead, to: newLead },
      { from: oldName, to: newName },
      { from: oldShort, to: newShort },
      { from: oldLoc, to: newLoc },
      { from: oldPrimary, to: newPrimary },
      { from: oldSecondary, to: newSecondary },
    ]
    const count = renameAcrossContent(replacements)

    // Ensure the client fields themselves are set to new values
    updateField('client.name', newName)
    updateField('client.shortName', newShort)
    updateField('client.possessive', newPoss)
    updateField('client.location', newLoc)
    updateField('client.leadName', newLead)
    updateField('client.primary', newPrimary)
    updateField('client.secondary', newSecondary)
    updateField('client.teamPhrase', newTeamPhrase)
    updateField('client.teamPhraseWithKey', newTeamPhraseWithKey)

    alert(`Renamed. ${count} string replacement${count === 1 ? '' : 's'} across all content.`)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 rounded-full text-[11px] font-medium text-paper transition-colors self-start"
      style={{ backgroundColor: 'var(--color-mac)' }}
    >
      Rename client across proposal
    </button>
  )
}

function Forms() {
  return (
    <div className="flex flex-col px-5 pb-16">
      <Section title="Client" defaultOpen>
        <RenameClientButton />
        <TextField path="client.name" label="Name" />
        <TextField path="client.shortName" label="Short name" />
        <TextField path="client.possessive" label="Possessive (e.g. Belzer Law's)" />
        <TextField path="client.location" label="Location" />
        <TextField path="client.leadName" label="Lead (full name)" />
        <TextField path="client.primary" label="Primary contact first name" />
        <TextField path="client.secondary" label="Secondary contact first name" />
        <TextField path="client.teamPhrase" label='Team phrase (e.g. "Aaron, Britt, and the team")' />
        <TextField path="client.teamPhraseWithKey" label="Team phrase (with key members)" />
      </Section>

      <Section title="Agency + Proposal Meta">
        <TextField path="agency.name" label="Agency name" />
        <TextField path="agency.email" label="Reply-to email" />
        <TextField path="agency.mailSubject" label="Approval email subject" />
        <TextField path="proposal.id" label="Proposal id (slug for exports)" />
        <TextField path="proposal.prepared" label="Prepared date" />
        <TextField path="proposal.version" label="Version" />
        <TextField path="proposal.kind" label="Kind" />
      </Section>

      <Section title="Pricing">
        <TextField path="pricing.sprintShort" label="Sprint price (short, e.g. $6.5K)" />
        <TextField path="pricing.sprintFull" label="Sprint price (full, e.g. $6,500)" />
        <TextField path="pricing.sprintTimeline" label="Sprint timeline (short)" />
        <TextField path="pricing.sprintTimelineLong" label="Sprint timeline (long)" />
        <TextField path="pricing.buildRange" label="Build range" />
      </Section>

      <Section title="Nav + Footer">
        <TextField path="nav.topMetaLeft" label="Top meta (left)" />
        <ArrayField path="nav.topMetaRight" label="Top meta (right, two lines)" />
        <TextField path="nav.brandPair" label='Brand pair (e.g. "Anchovies × Belzer Law")' />
        <TextField path="nav.ctaApprove" label="Nav CTA" />
        <TextField path="footer.preparedFor" label="Footer — prepared for" />
        <ArrayField path="footer.rightLines" label="Footer — right lines" />
      </Section>

      <Section title="§ 01 Hero">
        <TextField path="hero.eyebrowSection" label="Section eyebrow" />
        <TextField path="hero.eyebrowEmphasis" label="Emphasis eyebrow" />
        <ArrayField path="hero.eyebrowMetaLines" label="Right meta lines" />
        <ArrayField path="hero.headlineLines" label="Headline (3 lines)" />
        <TextField path="hero.subheadline" label="Subheadline" multiline />
        <TextField path="hero.body" label="Body paragraph" multiline />
        <TextField path="hero.ctaPrimary" label="Primary CTA" />
        <TextField path="hero.ctaSecondary" label="Secondary CTA" />
        <TextField path="hero.figLabelLeft" label="Diagram label (left)" />
        <TextField path="hero.figLabelRight" label="Diagram label (right)" />
      </Section>

      <Section title="§ 01 Stages (diagram)">
        <ObjectArrayField
          path="stages"
          label="Stages"
          emptyItem={{ label: '', name: '', desc: '' }}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'name', label: 'Name' },
            { key: 'desc', label: 'Description', multiline: true },
          ]}
        />
      </Section>

      <Section title="§ 02 What We Heard">
        <TextField path="whatWeHeard.eyebrow" label="Eyebrow" />
        <TextField path="whatWeHeard.headline" label="Headline" />
        <TextField path="whatWeHeard.bodyParagraph" label="Body paragraph" multiline />
        <TextField path="whatWeHeard.needsIntro" label="Needs intro" />
        <ArrayField path="needs" label="Needs list" />
      </Section>

      <Section title="§ 03 Point of View">
        <TextField path="pointOfView.eyebrow" label="Eyebrow" />
        <TextField path="pointOfView.metaRight" label="Meta right" />
        <TextField path="pointOfView.headline" label="Headline" />
        <ArrayField path="pointOfView.paragraphs" label="Paragraphs" />
        <TextField path="pointOfView.pullQuoteLabel" label="Pull quote label" />
        <TextField path="pointOfView.pullQuote" label="Pull quote" multiline />
      </Section>

      <Section title="§ 03b Dashboard Preview">
        <TextField path="dashboardPreview.eyebrow" label="Eyebrow" />
        <TextField path="dashboardPreview.headline" label="Headline" />
        <TextField path="dashboardPreview.subheadline" label="Subheadline" multiline />
        <TextField path="dashboardPreview.urlBar" label="Fake URL bar" />
        <TextField path="dashboardPreview.chromeBadge" label="Browser badge" />
        <TextField path="dashboardPreview.footnote" label="Footnote" multiline />
      </Section>

      <Section title="§ 04 Phase 1">
        <TextField path="phaseOne.eyebrowSection" label="Section eyebrow" />
        <TextField path="phaseOne.eyebrowEmphasis" label="Emphasis eyebrow" />
        <TextField path="phaseOne.metaTimeline" label="Meta timeline" />
        <TextField path="phaseOne.metaPrice" label="Meta price" />
        <TextField path="phaseOne.headline" label="Headline" />
        <ArrayField path="phaseOne.bodyParagraphs" label="Body paragraphs" />
        <TextField path="phaseOne.figLabelLeft" label="Sprint fig label (left)" />
        <TextField path="phaseOne.figLabelRight" label="Sprint fig label (right)" />
        <TextField path="phaseOne.deliverablesLabel" label="Deliverables label" />
        <TextField path="phaseOne.investmentLabel" label="Investment label" />
        <TextField path="phaseOne.investmentValue" label="Investment value" />
        <TextField path="phaseOne.timelineLabel" label="Timeline label" />
        <TextField path="phaseOne.timelineValue" label="Timeline value" />
        <TextField path="phaseOne.timelineNote" label="Timeline note" />
        <ArrayField path="deliverables" label="Deliverables list" />
      </Section>

      <Section title="§ 04 Sprint steps (diagram)">
        <ObjectArrayField
          path="sprintSteps"
          label="Sprint steps"
          emptyItem={{ num: '', name: '', desc: '' }}
          fields={[
            { key: 'num', label: 'Number' },
            { key: 'name', label: 'Name' },
            { key: 'desc', label: 'Description', multiline: true },
          ]}
        />
      </Section>

      <Section title="§ 05 Features">
        <TextField path="featuresSection.eyebrow" label="Eyebrow" />
        <TextField path="featuresSection.headline" label="Headline" />
        <TextField path="featuresSection.subheadline" label="Subheadline" multiline />
        <ObjectArrayField
          path="features"
          label="Feature cards"
          emptyItem={{ num: '', name: '', desc: '' }}
          fields={[
            { key: 'num', label: 'Number' },
            { key: 'name', label: 'Name' },
            { key: 'desc', label: 'Description', multiline: true },
          ]}
        />
      </Section>

      <Section title="§ 06 Scope">
        <TextField path="scope.eyebrow" label="Eyebrow" />
        <TextField path="scope.headline" label="Headline" />
        <ArrayField path="scope.paragraphs" label="Paragraphs" />
        <TextField path="scope.notFirst.label" label="Not first — label" />
        <TextField path="scope.notFirst.headline" label="Not first — headline" />
        <ArrayField path="notFirst" label="Not first items" />
        <TextField path="scope.betterFirst.label" label="Better first — label" />
        <TextField path="scope.betterFirst.headline" label="Better first — headline" />
        <ArrayField path="betterFirst" label="Better first items" />
      </Section>

      <Section title="§ 07 Security">
        <TextField path="security.eyebrow" label="Eyebrow" />
        <TextField path="security.headline" label="Headline" />
        <TextField path="security.intro" label="Intro" multiline />
        <TextField path="security.considerationsLabel" label="Considerations label" />
        <ArrayField path="securityConsiderations" label="Considerations list" />
        <TextField path="security.closingQuote" label="Closing quote" multiline />
      </Section>

      <Section title="§ 08 Strategic Advantage">
        <TextField path="advantage.eyebrow" label="Eyebrow" />
        <TextField path="advantage.metaRight" label="Meta right" />
        <TextField path="advantage.headline" label="Headline" />
        <ArrayField path="advantage.paragraphs" label="Paragraphs" />
        <TextField path="advantage.pullQuoteLabel" label="Pull quote label" />
        <TextField path="advantage.pullQuote" label="Pull quote" multiline />
        <ArrayField path="advantage.equation" label="Equation parts (5 items)" />
      </Section>

      <Section title="§ 09 Client Experience">
        <TextField path="clientExperience.eyebrow" label="Eyebrow" />
        <TextField path="clientExperience.headline" label="Headline" />
        <ArrayField path="clientExperience.paragraphs" label="Paragraphs" />
        <TextField path="clientExperience.figLabelLeft" label="Fig label (left)" />
        <TextField path="clientExperience.figLabelRight" label="Fig label (right)" />
        <TextField path="clientExperience.internalLabel" label="Internal label" />
        <TextField path="clientExperience.internalHeadline" label="Internal headline" />
        <TextField path="clientExperience.clientLabel" label="Client label" />
        <TextField path="clientExperience.clientHeadline" label="Client headline" />
        <TextField path="clientExperience.closingNote" label="Closing note" multiline />
        <ArrayField path="internalWorkflow" label="Internal workflow items" />
        <ArrayField path="clientFacing" label="Client-facing items" />
      </Section>

      <Section title="§ 10 Phase 2 Build">
        <TextField path="phaseTwo.eyebrowSection" label="Section eyebrow" />
        <TextField path="phaseTwo.eyebrowEmphasis" label="Emphasis eyebrow" />
        <TextField path="phaseTwo.metaRight" label="Meta right" />
        <TextField path="phaseTwo.headline" label="Headline" />
        <TextField path="phaseTwo.body" label="Body" multiline />
        <TextField path="phaseTwo.buildPathsLabel" label="Paths label" />
        <TextField path="phaseTwo.rangeLabel" label="Range label" />
        <TextField path="phaseTwo.rangeValue" label="Range value" />
        <TextField path="phaseTwo.rangeNote" label="Range note" multiline />
        <TextField path="phaseTwo.rangeDisclaimer" label="Range disclaimer" />
        <ArrayField path="buildPaths" label="Build paths" />
      </Section>

      <Section title="§ 11 Integrations">
        <TextField path="integrationsSection.eyebrow" label="Eyebrow" />
        <TextField path="integrationsSection.headline" label="Headline" />
        <TextField path="integrationsSection.intro" label="Intro" multiline />
        <TextField path="integrationsSection.figLabelLeft" label="Fig label (left)" />
        <TextField path="integrationsSection.figLabelRight" label="Fig label (right)" />
        <TextField path="integrationsSection.centerLabel" label="Center label" />
        <TextField path="integrationsSection.centerName" label="Center name" />
        <TextField path="integrationsSection.centerTagline" label="Center tagline" />
        <TextField path="integrationsSection.mobilePossibleLabel" label="Mobile: possible label" />
        <TextField path="integrationsSection.footnote" label="Footnote" />
      </Section>

      <Section title="§ 12 Ownership">
        <TextField path="ownership.eyebrow" label="Eyebrow" />
        <TextField path="ownership.metaRight" label="Meta right" />
        <TextField path="ownership.headline" label="Headline" />
        <TextField path="ownership.introParagraph" label="Intro" multiline />
        <ArrayField path="ownership.disclaimerLines" label="Disclaimer lines" />
        <TextField path="ownership.closingParagraph" label="Closing paragraph" multiline />
        <TextField path="ownership.shapeLabel" label="Shape label" />
        <TextField path="ownership.pullQuote" label="Pull quote" />
        <ArrayField path="ownershipShape" label="Shape items" />
      </Section>

      <Section title="§ 13 Next Step">
        <TextField path="nextStepSection.eyebrowSection" label="Section eyebrow" />
        <TextField path="nextStepSection.eyebrowEmphasis" label="Emphasis eyebrow" />
        <TextField path="nextStepSection.metaRight" label="Meta right" />
        <TextField path="nextStepSection.headline" label="Headline" />
        <ArrayField path="nextStepSection.bodyParagraphs" label="Body paragraphs" />
        <TextField path="nextStepSection.stepsLabel" label="Steps label" />
        <TextField path="nextStepSection.investmentLabel" label="Investment label" />
        <TextField path="nextStepSection.investmentValue" label="Investment value" />
        <TextField path="nextStepSection.timelineLabel" label="Timeline label" />
        <TextField path="nextStepSection.timelineValue" label="Timeline value" />
        <TextField path="nextStepSection.ctaPrimary" label="Primary CTA" />
        <TextField path="nextStepSection.ctaSecondary" label="Secondary CTA" />
        <ArrayField path="nextSteps" label="Next steps list" />
      </Section>

      <Section title="§ 14 Closing">
        <TextField path="closing.eyebrow" label="Eyebrow" />
        <TextField path="closing.metaRight" label="Meta right" />
        <TextField path="closing.headline" label="Headline" />
        <ArrayField path="closing.paragraphs" label="Paragraphs" />
        <TextField path="closing.bestPathLabel" label="Best path label" />
        <ArrayField path="closing.bestPathSteps" label="Best path steps" />
        <TextField path="closing.closingLine" label="Closing line" />
      </Section>

      <Section title="Approve Takeover Screen">
        <TextField path="approveScreen.eyebrow" label="Eyebrow" />
        <TextField path="approveScreen.headline" label="Headline" />
        <TextField path="approveScreen.confirmationLabel" label="Confirmation label" />
        <TextField path="approveScreen.confirmationBody" label="Confirmation body" multiline />
        <TextField path="approveScreen.introLabel" label="Intro label" />
        <TextField path="approveScreen.introBody" label="Intro body" multiline />
        <TextField path="approveScreen.introNote" label="Intro note" multiline />
        <ObjectArrayField
          path="approveScreen.steps"
          label="Next-steps (on takeover)"
          emptyItem={{ label: '', title: '', body: '' }}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'title', label: 'Title' },
            { key: 'body', label: 'Body', multiline: true },
          ]}
        />
        <TextField path="approveScreen.ctaBack" label="Back CTA" />
        <TextField path="approveScreen.ctaReach" label="Reach CTA" />
      </Section>
    </div>
  )
}

function PreviewPane() {
  return (
    <div className="flex-1 bg-[#1F1912]/5 overflow-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-3 border-b border-[var(--color-rule)]/20 bg-paper/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Live preview</span>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-ink-2 hover:text-ink transition-colors"
        >
          Open real proposal ↗
        </a>
      </div>
      <div className="p-4">
        <div
          className="mx-auto bg-paper rounded-md shadow-[0_20px_60px_-30px_rgba(10,10,10,0.2)] overflow-hidden"
          style={{ zoom: 0.55 as unknown as number }}
        >
          <Proposal />
        </div>
      </div>
    </div>
  )
}

export function Admin() {
  return (
    <Gate>
      <ContentProvider editable>
        <div className="min-h-screen bg-paper text-ink grid" style={{ gridTemplateColumns: '440px 1fr' }}>
          <aside className="border-r border-[var(--color-rule)]/20 flex flex-col h-screen overflow-hidden">
            <Toolbar />
            <div className="flex-1 overflow-auto">
              <Forms />
            </div>
          </aside>
          <PreviewPane />
        </div>
      </ContentProvider>
    </Gate>
  )
}
