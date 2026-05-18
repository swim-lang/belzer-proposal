import { ContentProvider } from './context/ContentContext'
import { Proposal } from './Proposal'
import { PreMeetingPage } from './PreMeetingPage'
import { QuietHome } from './QuietHome'
import { SavedFirmPage } from './SavedFirmPage'
import { FiberSoftChewProposal } from './FiberSoftChewProposal'
import { GenesiProposal } from './GenesiProposal'
import { HAAIProposal } from './HAAIProposal'
import { LapincoProposal } from './LapincoProposal'
import { LexPoliticaProposal } from './LexPoliticaProposal'
import { SleepGoddessProposal } from './SleepGoddessProposal'
import { SoupToSoftwareProposal } from './SoupToSoftwareProposal'
import { Admin } from './admin/Admin'
import { Intake } from './intake/Intake'
import { ContractPage } from './contracts/ContractPage'
import { genesiContract } from './contracts/genesiContract'
import { createPreMeetingContent, getPreMeetingFirmNameFromURL } from './preMeetingContent'
import { kndContent } from './kndContent'

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const isIntake = pathname === '/intake' || pathname.startsWith('/intake/')
  const isLegacyBelzer = pathname === '/belzer' || pathname.startsWith('/belzer/')
  const isBelzer = pathname === '/proposal/belzer' || pathname.startsWith('/proposal/belzer/')
  const isKND = pathname === '/proposal/knd' || pathname.startsWith('/proposal/knd/')
  const isSleepGoddess =
    pathname === '/proposal/sleep-like-a-goddess' ||
    pathname.startsWith('/proposal/sleep-like-a-goddess/') ||
    pathname === '/sleep-like-a-goddess' ||
    pathname.startsWith('/sleep-like-a-goddess/')
  const isHAAI =
    pathname === '/proposal/haai' ||
    pathname.startsWith('/proposal/haai/') ||
    pathname === '/haai' ||
    pathname.startsWith('/haai/')
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

  if (isSleepGoddess) {
    return <SleepGoddessProposal />
  }

  if (isHAAI) {
    return <HAAIProposal />
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

  if (isFiberSoftChew) {
    return <FiberSoftChewProposal />
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
