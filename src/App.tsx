import type { ReactNode } from 'react'
import { AvodahProposal } from './AvodahProposal'
import { BapsCharitiesProposal } from './BapsCharitiesProposal'
import { BelzerPilotProposal } from './BelzerPilotProposal'
import { BelzerSystemsProposal } from './BelzerSystemsProposal'
import { BlanchetSearchVisibilityProposal } from './BlanchetSearchVisibilityProposal'
import { CipherProposal } from './CipherProposal'
import { DoubleUpDavesProposal } from './DoubleUpDavesProposal'
import { EmergencesLabsProposal } from './EmergencesLabsProposal'
import { FiberSoftChewProposal } from './FiberSoftChewProposal'
import { GarySpringsteadProposal } from './GarySpringsteadProposal'
import { GenesiProposal } from './GenesiProposal'
import { HikeDoggieBoardOverview } from './HikeDoggieBoardOverview'
import { HikeDoggieFoundationProposal } from './HikeDoggieFoundationProposal'
import { HikeDoggiePlatformProposal } from './HikeDoggiePlatformProposal'
import { HikeDoggieProposal } from './HikeDoggieProposal'
import { HumanaAIProposal } from './HAAIProposal'
import { HomemadeProposal } from './HomemadeProposal'
import { HumanaAIProposal2 } from './HumanaAIProposal2'
import { LapincoProposal } from './LapincoProposal'
import { LexPoliticaProposal } from './LexPoliticaProposal'
import { LittleTechAssociationProposal } from './LittleTechAssociationProposal'
import { MollyEngelsProposal } from './MollyEngelsProposal'
import { OffMenuProposal } from './OffMenuProposal'
import { PathLawGroupProposal } from './PathLawGroupProposal'
import { PreMeetingPage } from './PreMeetingPage'
import { Proposal } from './Proposal'
import { QuietHome } from './QuietHome'
import { SavedFirmPage } from './SavedFirmPage'
import { SleepGoddessProposal } from './SleepGoddessProposal'
import { SoftHoursProposal } from './SoftHoursProposal'
import { SoupToSoftwareProposal } from './SoupToSoftwareProposal'
import { TamrahProposal } from './TamrahProposal'
import { WildflowerBlancProposal } from './WildflowerBlancProposal'
import { Admin } from './admin/Admin'
import { ProposalGate } from './components/ProposalGate'
import { LockedProposalNotice } from './components/LockedProposalNotice'
import { ContentProvider } from './context/ContentContext'
import { ContractPage } from './contracts/ContractPage'
import { avodahContract } from './contracts/avodahContract'
import { cipherContract } from './contracts/cipherContract'
import { fiberSoftChewContract } from './contracts/fiberSoftChewContract'
import { garySpringsteadContract } from './contracts/garySpringsteadContract'
import { genesiContract } from './contracts/genesiContract'
import { hikeDoggieContract } from './contracts/hikeDoggieContract'
import { hikeDoggieFoundationContract } from './contracts/hikeDoggieFoundationContract'
import { hikeDoggiePlatformContract } from './contracts/hikeDoggiePlatformContract'
import { lapincoContract } from './contracts/lapincoContract'
import { mollyEngelsContract } from './contracts/mollyEngelsContract'
import { offMenuContract } from './contracts/offMenuContract'
import { softHoursContract } from './contracts/softHoursContract'
import { wildflowerBlancContract } from './contracts/wildflowerBlancContract'
import { Intake } from './intake/Intake'
import { kndContent } from './kndContent'
import { createPreMeetingContent, getPreMeetingFirmNameFromURL } from './preMeetingContent'
import { findProposalManifestEntry } from './proposalManifest'

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const isIntake = pathname === '/intake' || pathname.startsWith('/intake/')
  const isFirmPage = pathname === '/firm' || pathname.startsWith('/firm/')
  const isPreMeeting =
    pathname === '/ai-legal-tools' ||
    pathname.startsWith('/ai-legal-tools/') ||
    pathname === '/pre-meeting' ||
    pathname.startsWith('/pre-meeting/')
  const isProposalPath = pathname === '/proposal' || pathname.startsWith('/proposal/')
  const proposalEntry = findProposalManifestEntry(pathname)
  const shouldGateProposal = isProposalPath || Boolean(proposalEntry)
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

  if (proposalEntry) {
    if (proposalEntry.access === 'locked') {
      return withProposalGate(<LockedProposalNotice />)
    }

    switch (proposalEntry.id) {
      case 'belzer': {
        if (pathname === '/belzer' || pathname.startsWith('/belzer/')) {
          window.history.replaceState(null, '', '/proposal/belzer')
        }
        document.title = 'Anchovies × Belzer Law - Proposal'
        return withProposalGate(
          <ContentProvider>
            <Proposal />
          </ContentProvider>,
        )
      }
      case 'belzer-pilot':
        return withProposalGate(<BelzerPilotProposal />)
      case 'belzer-systems':
        return withProposalGate(<BelzerSystemsProposal />)
      case 'blanchet-search-visibility':
        return withProposalGate(<BlanchetSearchVisibilityProposal />)
      case 'knd':
        document.title = 'Anchovies × KND Law Firm - Proposal'
        return withProposalGate(
          <ContentProvider initialContent={kndContent}>
            <Proposal />
          </ContentProvider>,
        )
      case 'baps-charities':
        return withProposalGate(<BapsCharitiesProposal />)
      case 'sleep-like-a-goddess':
        return withProposalGate(<SleepGoddessProposal />)
      case 'soft-hours-contract':
        return withProposalGate(<ContractPage contract={softHoursContract} />)
      case 'soft-hours':
        return withProposalGate(<SoftHoursProposal />)
      case 'humanaai':
        return withProposalGate(<HumanaAIProposal />)
      case 'humana-ai-2':
        return withProposalGate(<HumanaAIProposal2 />)
      case 'hike-doggie-board':
        return withProposalGate(<HikeDoggieBoardOverview />)
      case 'hike-doggie-foundation-contract':
        return withProposalGate(<ContractPage contract={hikeDoggieFoundationContract} />)
      case 'hike-doggie-foundation':
        return withProposalGate(<HikeDoggieFoundationProposal />)
      case 'hike-doggie-platform-contract':
        return withProposalGate(<ContractPage contract={hikeDoggiePlatformContract} />)
      case 'hike-doggie-platform':
        return withProposalGate(<HikeDoggiePlatformProposal />)
      case 'hike-doggie-contract':
        return withProposalGate(<ContractPage contract={hikeDoggieContract} />)
      case 'hike-doggie':
        return withProposalGate(<HikeDoggieProposal />)
      case 'lex-politica':
        return withProposalGate(<LexPoliticaProposal />)
      case 'molly-contract':
        return withProposalGate(<ContractPage contract={mollyEngelsContract} />)
      case 'molly':
        return withProposalGate(<MollyEngelsProposal />)
      case 'genesi-contract':
        return withProposalGate(<ContractPage contract={genesiContract} />)
      case 'genesi':
        return withProposalGate(<GenesiProposal />)
      case 'lapinco-contract':
        return withProposalGate(<ContractPage contract={lapincoContract} />)
      case 'lapinco':
        return withProposalGate(<LapincoProposal />)
      case 'fiber-soft-chew-contract':
        return withProposalGate(<ContractPage contract={fiberSoftChewContract} />)
      case 'fiber-soft-chew':
        return withProposalGate(<FiberSoftChewProposal />)
      case 'off-menu-contract':
        return withProposalGate(<ContractPage contract={offMenuContract} />)
      case 'off-menu':
        return withProposalGate(<OffMenuProposal />)
      case 'gary-springstead-contract':
        return withProposalGate(<ContractPage contract={garySpringsteadContract} />)
      case 'gary-springstead':
        return withProposalGate(<GarySpringsteadProposal />)
      case 'wildflower-blanc-contract':
        return withProposalGate(<ContractPage contract={wildflowerBlancContract} />)
      case 'wildflower-blanc':
        return withProposalGate(<WildflowerBlancProposal />)
      case 'cipher-contract':
        return withProposalGate(<ContractPage contract={cipherContract} />)
      case 'cipher':
        return withProposalGate(<CipherProposal />)
      case 'double-up-daves':
        return withProposalGate(<DoubleUpDavesProposal />)
      case 'emergences-labs':
        return withProposalGate(<EmergencesLabsProposal />)
      case 'soup-to-software':
        return withProposalGate(<SoupToSoftwareProposal />)
      case 'homemade':
        return withProposalGate(<HomemadeProposal />)
      case 'avodah-contract':
        return withProposalGate(<ContractPage contract={avodahContract} />)
      case 'avodah':
        return withProposalGate(<AvodahProposal />)
      case 'little-tech-association':
        return withProposalGate(<LittleTechAssociationProposal />)
      case 'tamrah':
        return withProposalGate(<TamrahProposal />)
      case 'path-law-group':
        return withProposalGate(<PathLawGroupProposal />)
    }
  }

  if (isFirmPage) {
    return <SavedFirmPage />
  }

  return shouldGateProposal ? withProposalGate(<QuietHome />) : <QuietHome />
}
