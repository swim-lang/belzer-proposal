import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Belzer client and firm systems proposal is registered with the agreed pricing', () => {
  const app = read('src/App.tsx')
  const manifest = JSON.parse(read('src/proposalManifest.json'))
  const proposal = read('src/BelzerSystemsProposal.tsx')
  const systemsEntry = manifest.find((entry) => entry.id === 'belzer-systems')

  assert.match(app, /BelzerSystemsProposal/)
  assert.match(app, /case 'belzer-systems'/)
  assert.equal(systemsEntry.name, 'Belzer Law: Client + Firm Systems')
  assert.equal(systemsEntry.href, '/proposal/belzer-systems')
  assert.equal(systemsEntry.status, 'Active')
  assert.equal(systemsEntry.access, 'active')

  assert.match(proposal, /Less chasing\. Clearer work\. A better client experience\./)
  assert.match(proposal, /Client Experience App/)
  assert.match(proposal, /Firm Workflow Portal/)
  assert.match(proposal, /\$8,000/)
  assert.match(proposal, /\$16,000/)
  assert.match(proposal, /Approximately six weeks/)
  assert.match(proposal, /Approximately ten weeks/)
  assert.match(proposal, /second can be added later for the same \$8,000 investment/)

  assert.match(proposal, /Private iPhone app distributed through TestFlight/)
  assert.match(proposal, /Initial client onboarding/)
  assert.match(proposal, /client document uploads/)
  assert.match(proposal, /Push notifications/)
  assert.match(proposal, /Matter dashboard with owners, assignments, deadlines, and current priorities/)
  assert.match(proposal, /Email drafts and action extraction, always requiring human approval before sending/)
  assert.match(proposal, /New-client document naming and organization workflow/)
  assert.match(proposal, /firm-approved dates/)

  assert.match(proposal, /Android version/)
  assert.match(proposal, /Public App Store launch/)
  assert.match(proposal, /AI legal advice/)
  assert.match(proposal, /Autonomous legal responses/)
  assert.match(proposal, /Autonomous email sending/)
  assert.match(proposal, /AI legal research/)
  assert.match(proposal, /Automatic legal deadline calculation/)
  assert.match(proposal, /Belzer attorneys remain responsible for all legal judgment/)
})

test('Belzer systems proposal includes milestone payments, support, and transparent value math', () => {
  const proposal = read('src/BelzerSystemsProposal.tsx')

  assert.match(proposal, /50 \/ 25 \/ 25/)
  assert.match(proposal, /At kickoff/)
  assert.match(proposal, /After approval of the working prototype and core experience/)
  assert.match(proposal, /At launch or TestFlight onboarding/)
  assert.match(proposal, /\$4,000 for one system · \$8,000 for both/)
  assert.match(proposal, /\$2,000 for one system · \$4,000 for both/)
  assert.match(proposal, /Two structured feedback rounds/)
  assert.match(proposal, /30-day stabilization period/)

  assert.match(proposal, /16 hours/)
  assert.match(proposal, /32 hours/)
  assert.match(proposal, /\$500 attorney hour/)
  assert.match(proposal, /transparent break-even math, not a guaranteed savings claim/)

  assert.match(proposal, /Schedule a proposal review/)
  assert.match(proposal, /Compare the two systems/)
  assert.match(proposal, /https:\/\/cal\.com\/anchovies\/30min\?overlayCalendar=true/)
  assert.match(proposal, /href="#systems"/)

  assert.doesNotMatch(proposal, /\$4,500/)
  assert.doesNotMatch(proposal, /Document Review \+ Exhibit Organizer/)
  assert.doesNotMatch(proposal, /Client Clarity System/)
  assert.doesNotMatch(proposal, /Motions Bank/)
  assert.doesNotMatch(proposal, /\u2014/)
})

test('both previous Belzer proposals remain recorded but render the locked notice', () => {
  const app = read('src/App.tsx')
  const manifest = JSON.parse(read('src/proposalManifest.json'))
  const notice = read('src/components/LockedProposalNotice.tsx')
  const oldBelzer = manifest.find((entry) => entry.id === 'belzer')
  const oldPilot = manifest.find((entry) => entry.id === 'belzer-pilot')

  assert.deepEqual(oldBelzer.paths, ['/proposal/belzer', '/belzer'])
  assert.equal(oldBelzer.status, 'Archived')
  assert.equal(oldBelzer.access, 'locked')
  assert.equal(oldBelzer.showInDashboard, true)
  assert.equal(oldBelzer.sourceFile, 'src/Proposal.tsx')

  assert.deepEqual(oldPilot.paths, ['/proposal/belzer-pilot'])
  assert.equal(oldPilot.status, 'Archived')
  assert.equal(oldPilot.access, 'locked')
  assert.equal(oldPilot.showInDashboard, true)
  assert.equal(oldPilot.sourceFile, 'src/BelzerPilotProposal.tsx')

  assert.match(app, /if \(proposalEntry\.access === 'locked'\)/)
  assert.match(app, /withProposalGate\(<LockedProposalNotice \/>\)/)
  assert.match(notice, /This proposal is no longer available\./)
  assert.match(notice, /This version has been replaced\. Contact Anchovies for the current proposal\./)
})
