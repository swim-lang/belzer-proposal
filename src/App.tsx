import type { ReactNode } from 'react'
import { ContentProvider } from './context/ContentContext'
import { Proposal } from './Proposal'
import { PreMeetingPage } from './PreMeetingPage'
import { QuietHome } from './QuietHome'
import { SavedFirmPage } from './SavedFirmPage'
import { BapsCharitiesProposal } from './BapsCharitiesProposal'
import { CipherProposal } from './CipherProposal'
import { FiberSoftChewProposal } from './FiberSoftChewProposal'
import { GarySpringsteadProposal } from './GarySpringsteadProposal'
import { GenesiProposal } from './GenesiProposal'
import { HumanaAIProposal } from './HAAIProposal'
import { HumanaAIProposal2 } from './HumanaAIProposal2'
import { LapincoProposal } from './LapincoProposal'
import { LexPoliticaProposal } from './LexPoliticaProposal'
import { MollyEngelsProposal } from './MollyEngelsProposal'
import { OffMenuProposal } from './OffMenuProposal'
import { SleepGoddessProposal } from './SleepGoddessProposal'
import { SoftHoursProposal } from './SoftHoursProposal'
import { SoupToSoftwareProposal } from './SoupToSoftwareProposal'
import { WildflowerBlancProposal } from './WildflowerBlancProposal'
import { BelzerPilotProposal } from './BelzerPilotProposal'
import { ProposalGate } from './components/ProposalGate'
import { Admin } from './admin/Admin'
import { Intake } from './intake/Intake'
import { ContractPage } from './contracts/ContractPage'
import { cipherContract } from './contracts/cipherContract'
import { fiberSoftChewContract } from './contracts/fiberSoftChewContract'
import { genesiContract } from './contracts/genesiContract'
import { mollyEngelsContract } from './contracts/mollyEngelsContract'
import { offMenuContract } from './contracts/offMenuContract'
import { softHoursContract } from './contracts/softHoursContract'
import { wildflowerBlancContract } from './contracts/wildflowerBlancContract'
import { createPreMeetingContent, getPreMeetingFirmNameFromURL } from './preMeetingContent'
import { kndContent } from './kndContent'

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const isIntake = pathname === '/intake' || pathname.startsWith('/intake/')
  const isLegacyBelzer = pathname === '/belzer' || pathname.startsWith('/belzer/')
  const isBelzer = pathname === '/proposal/belzer' || pathname.startsWith('/proposal/belzer/')
  const isBelzerPilot =
    pathname === '/proposal/belzer-pilot' ||
    pathname.startsWith('/proposal/belzer-pilot/')
  const isKND = pathname === '/proposal/knd' || pathname.startsWith('/proposal/knd/')
  const isBapsCharities =
    pathname === '/proposal/baps-charities' ||
    pathname.startsWith('/proposal/baps-charities/')
  const isSleepGoddess =
    pathname === '/proposal/sleep-like-a-goddess' ||
    pathname.startsWith('/proposal/sleep-like-a-goddess/') ||
    pathname === '/sleep-like-a-goddess' ||
    pathname.startsWith('/sleep-like-a-goddess/')
  const isSoftHours =
    pathname === '/proposal/soft-hours' ||
    pathname.startsWith('/proposal/soft-hours/') ||
    pathname === '/soft-hours' ||
    pathname.startsWith('/soft-hours/')
  const isSoftHoursContract = pathname === '/proposal/soft-hours/contract'
  const isHumanaAI =
    pathname === '/proposal/humanaai' ||
    pathname.startsWith('/proposal/humanaai/') ||
    pathname === '/humanaai' ||
    pathname.startsWith('/humanaai/') ||
    pathname === '/proposal/haai' ||
    pathname.startsWith('/proposal/haai/') ||
    pathname === '/haai' ||
    pathname.startsWith('/haai/')
  const isHumanaAIProposal2 =
    pathname === '/proposal/humana-ai-2' ||
    pathname.startsWith('/proposal/humana-ai-2/')
  const isLexPolitica =
    pathname === '/proposal/lex-politica' ||
    pathname.startsWith('/proposal/lex-politica/')
  const isMolly =
    pathname === '/proposal/molly' ||
    pathname.startsWith('/proposal/molly/')
  const isMollyContract = pathname === '/proposal/molly/contract'
  const isGenesi =
    pathname === '/proposal/genesi' ||
    pathname.startsWith('/proposal/genesi/')
  const isGenesiContract = pathname === '/proposal/genesi/contract'
  const isLapinco =
    pathname === '/proposal/lapinco' ||
    pathname.startsWith('/proposal/lapinco/')
  const isFiberSoftChew =
    pathname === '/proposal/fiber-soft-chew' ||
    pathname.startsWith('/proposal/fiber-soft-chew/')
  const isFiberSoftChewContract = pathname === '/proposal/fiber-soft-chew/contract'
  const isOffMenu =
    pathname === '/proposal/off-menu' ||
    pathname.startsWith('/proposal/off-menu/')
  const isOffMenuContract = pathname === '/proposal/off-menu/contract'
  const isGarySpringstead =
    pathname === '/proposal/gary-springstead' ||
    pathname.startsWith('/proposal/gary-springstead/')
  const isWildflowerBlanc =
    pathname === '/proposal/wildflower-blanc' ||
    pathname.startsWith('/proposal/wildflower-blanc/')
  const isWildflowerBlancContract = pathname === '/proposal/wildflower-blanc/contract'
  const isCipher =
    pathname === '/proposal/cipher' ||
    pathname.startsWith('/proposal/cipher/')
  const isCipherContract = pathname === '/proposal/cipher/contract'
  const isSoupToSoftware =
    pathname === '/proposal/soup-to-software' ||
    pathname.startsWith('/proposal/soup-to-software/')
  const isFirmPage = pathname === '/firm' || pathname.startsWith('/firm/')
  const isPreMeeting =
    pathname === '/ai-legal-tools' ||
    pathname.startsWith('/ai-legal-tools/') ||
    pathname === '/pre-meeting' ||
    pathname.startsWith('/pre-meeting/')
  const isProposalPath = pathname === '/proposal' || pathname.startsWith('/proposal/')
  const isLegacyProposalPath =
    isLegacyBelzer ||
    pathname === '/sleep-like-a-goddess' ||
    pathname.startsWith('/sleep-like-a-goddess/') ||
    pathname === '/soft-hours' ||
    pathname.startsWith('/soft-hours/') ||
    pathname === '/humanaai' ||
    pathname.startsWith('/humanaai/') ||
    pathname === '/haai' ||
    pathname.startsWith('/haai/')
  const shouldGateProposal = isProposalPath || isLegacyProposalPath
  const withProposalGate = (children: ReactNode) =>
    shouldGateProposal ? <ProposalGate>{children}</ProposalGate> : children

  if (isAdmin) {
    return <Admin />
  }

  if (isIntake) {
    return (
      <ContentProvider syncRemote>
        <Intake />
      </ContentProvider>
    )
  }

  if (isPreMeeting) {
    return (
      <ContentProvider initialContent={createPreMeetingContent(getPreMeetingFirmNameFromURL())}>
        <PreMeetingPage />
      </ContentProvider>
    )
  }

  if (isBelzer) {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies × Belzer Law - Proposal'
    }
    return withProposalGate(
      <ContentProvider>
        <Proposal />
      </ContentProvider>,
    )
  }

  if (isBelzerPilot) {
    return withProposalGate(<BelzerPilotProposal />)
  }

  if (isKND) {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies × KND Law Firm - Proposal'
    }
    return withProposalGate(
      <ContentProvider initialContent={kndContent}>
        <Proposal />
      </ContentProvider>,
    )
  }

  if (isBapsCharities) {
    return withProposalGate(<BapsCharitiesProposal />)
  }

  if (isSleepGoddess) {
    return withProposalGate(<SleepGoddessProposal />)
  }

  if (isSoftHoursContract) {
    return withProposalGate(<ContractPage contract={softHoursContract} />)
  }

  if (isSoftHours) {
    return withProposalGate(<SoftHoursProposal />)
  }

  if (isHumanaAI) {
    return withProposalGate(<HumanaAIProposal />)
  }

  if (isHumanaAIProposal2) {
    return withProposalGate(<HumanaAIProposal2 />)
  }

  if (isLexPolitica) {
    return withProposalGate(<LexPoliticaProposal />)
  }

  if (isMollyContract) {
    return withProposalGate(<ContractPage contract={mollyEngelsContract} />)
  }

  if (isMolly) {
    return withProposalGate(<MollyEngelsProposal />)
  }

  if (isGenesiContract) {
    return withProposalGate(<ContractPage contract={genesiContract} />)
  }

  if (isGenesi) {
    return withProposalGate(<GenesiProposal />)
  }

  if (isLapinco) {
    return withProposalGate(<LapincoProposal />)
  }

  if (isFiberSoftChewContract) {
    return withProposalGate(<ContractPage contract={fiberSoftChewContract} />)
  }

  if (isFiberSoftChew) {
    return withProposalGate(<FiberSoftChewProposal />)
  }

  if (isOffMenuContract) {
    return withProposalGate(<ContractPage contract={offMenuContract} />)
  }

  if (isOffMenu) {
    return withProposalGate(<OffMenuProposal />)
  }

  if (isGarySpringstead) {
    return withProposalGate(<GarySpringsteadProposal />)
  }

  if (isWildflowerBlancContract) {
    return withProposalGate(<ContractPage contract={wildflowerBlancContract} />)
  }

  if (isWildflowerBlanc) {
    return withProposalGate(<WildflowerBlancProposal />)
  }

  if (isCipherContract) {
    return withProposalGate(<ContractPage contract={cipherContract} />)
  }

  if (isCipher) {
    return withProposalGate(<CipherProposal />)
  }

  if (isSoupToSoftware) {
    return withProposalGate(<SoupToSoftwareProposal />)
  }

  if (isLegacyBelzer) {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/proposal/belzer')
    }
    return withProposalGate(
      <ContentProvider>
        <Proposal />
      </ContentProvider>,
    )
  }

  if (isFirmPage) {
    return <SavedFirmPage />
  }

  return <QuietHome />
}
