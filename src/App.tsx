import { ContentProvider } from './context/ContentContext'
import { Proposal } from './Proposal'
import { PreMeetingPage } from './PreMeetingPage'
import { QuietHome } from './QuietHome'
import { SavedFirmPage } from './SavedFirmPage'
import { BapsCharitiesProposal } from './BapsCharitiesProposal'
import { FiberSoftChewProposal } from './FiberSoftChewProposal'
import { GarySpringsteadProposal } from './GarySpringsteadProposal'
import { GenesiProposal } from './GenesiProposal'
import { HikeDoggieProposal } from './HikeDoggieProposal'
import { HumanaAIProposal } from './HAAIProposal'
import { LapincoProposal } from './LapincoProposal'
import { LexPoliticaProposal } from './LexPoliticaProposal'
import { OffMenuProposal } from './OffMenuProposal'
import { SleepGoddessProposal } from './SleepGoddessProposal'
import { SoftHoursProposal } from './SoftHoursProposal'
import { SoupToSoftwareProposal } from './SoupToSoftwareProposal'
import { WildflowerBlancProposal } from './WildflowerBlancProposal'
import { Admin } from './admin/Admin'
import { Intake } from './intake/Intake'
import { ContractPage } from './contracts/ContractPage'
import { fiberSoftChewContract } from './contracts/fiberSoftChewContract'
import { genesiContract } from './contracts/genesiContract'
import { offMenuContract } from './contracts/offMenuContract'
import { createPreMeetingContent, getPreMeetingFirmNameFromURL } from './preMeetingContent'
import { kndContent } from './kndContent'

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const isIntake = pathname === '/intake' || pathname.startsWith('/intake/')
  const isLegacyBelzer = pathname === '/belzer' || pathname.startsWith('/belzer/')
  const isBelzer = pathname === '/proposal/belzer' || pathname.startsWith('/proposal/belzer/')
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
  const isHumanaAI =
    pathname === '/proposal/humanaai' ||
    pathname.startsWith('/proposal/humanaai/') ||
    pathname === '/humanaai' ||
    pathname.startsWith('/humanaai/') ||
    pathname === '/proposal/haai' ||
    pathname.startsWith('/proposal/haai/') ||
    pathname === '/haai' ||
    pathname.startsWith('/haai/')
  const isHikeDoggie =
    pathname === '/proposal/hike-doggie' ||
    pathname.startsWith('/proposal/hike-doggie/')
  const isLexPolitica =
    pathname === '/proposal/lex-politica' ||
    pathname.startsWith('/proposal/lex-politica/')
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
  const isSoupToSoftware =
    pathname === '/proposal/soup-to-software' ||
    pathname.startsWith('/proposal/soup-to-software/')
  const isFirmPage = pathname === '/firm' || pathname.startsWith('/firm/')
  const isPreMeeting =
    pathname === '/ai-legal-tools' ||
    pathname.startsWith('/ai-legal-tools/') ||
    pathname === '/pre-meeting' ||
    pathname.startsWith('/pre-meeting/')

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
    return (
      <ContentProvider>
        <Proposal />
      </ContentProvider>
    )
  }

  if (isKND) {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies × KND Law Firm - Proposal'
    }
    return (
      <ContentProvider initialContent={kndContent}>
        <Proposal />
      </ContentProvider>
    )
  }

  if (isBapsCharities) {
    return <BapsCharitiesProposal />
  }

  if (isSleepGoddess) {
    return <SleepGoddessProposal />
  }

  if (isSoftHours) {
    return <SoftHoursProposal />
  }

  if (isHumanaAI) {
    return <HumanaAIProposal />
  }

  if (isHikeDoggie) {
    return <HikeDoggieProposal />
  }

  if (isLexPolitica) {
    return <LexPoliticaProposal />
  }

  if (isGenesiContract) {
    return <ContractPage contract={genesiContract} />
  }

  if (isGenesi) {
    return <GenesiProposal />
  }

  if (isLapinco) {
    return <LapincoProposal />
  }

  if (isFiberSoftChewContract) {
    return <ContractPage contract={fiberSoftChewContract} />
  }

  if (isFiberSoftChew) {
    return <FiberSoftChewProposal />
  }

  if (isOffMenuContract) {
    return <ContractPage contract={offMenuContract} />
  }

  if (isOffMenu) {
    return <OffMenuProposal />
  }

  if (isGarySpringstead) {
    return <GarySpringsteadProposal />
  }

  if (isWildflowerBlanc) {
    return <WildflowerBlancProposal />
  }

  if (isSoupToSoftware) {
    return <SoupToSoftwareProposal />
  }

  if (isLegacyBelzer) {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/proposal/belzer')
    }
    return (
      <ContentProvider>
        <Proposal />
      </ContentProvider>
    )
  }

  if (isFirmPage) {
    return <SavedFirmPage />
  }

  return <QuietHome />
}
