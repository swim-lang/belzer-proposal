import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const proposal = readFileSync(new URL('../src/HikeDoggieProposal.tsx', import.meta.url), 'utf8')
const contract = readFileSync(new URL('../src/contracts/hikeDoggieContract.ts', import.meta.url), 'utf8')
const contractPage = readFileSync(new URL('../src/contracts/ContractPage.tsx', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const manifest = readFileSync(new URL('../src/proposalManifest.json', import.meta.url), 'utf8')

test('Hike Doggie proposal preserves the selected Phase 1 and 2 quote', () => {
  assert.match(proposal, /const PRICE_SOP_FOUNDATION = '\$5,500'/)
  assert.match(proposal, /const PRICE_PROTOTYPE = '\$6,500'/)
  assert.match(proposal, /const PRICE_TOTAL = '\$12,000'/)
  assert.match(proposal, /const PRICE_ADVISORY = '\$1,500\/mo'/)
  assert.match(proposal, /A build path, priced honestly/)
  assert.doesNotMatch(proposal, /A partner in the room/)
})

test('Hike Doggie proposal includes the 75 and 25 payment schedule', () => {
  assert.match(proposal, /const PRICE_KICKOFF = '\$9,000'/)
  assert.match(proposal, /const PRICE_FINAL = '\$3,000'/)
  assert.match(proposal, /75%/)
  assert.match(proposal, /25%/)
  assert.match(proposal, /Due at kickoff/)
  assert.match(proposal, /Due at final Phase 2 delivery/)
})

test('Hike Doggie timeline accounts for client approvals', () => {
  assert.match(proposal, /depends on timely access, decisions, feedback, and approvals from Hike Doggie/)
  assert.match(proposal, /Client-side delays move the delivery dates accordingly/)
})

test('Hike Doggie proposal links to its active contract', () => {
  assert.match(proposal, /const contractHref = '\/proposal\/hike-doggie\/contract'/)
  assert.match(proposal, /Review contract/)
  assert.doesNotMatch(proposal, /Accept proposal/)
  assert.match(app, /hikeDoggieContract/)
  assert.match(app, /case 'hike-doggie-contract'/)
  assert.match(manifest, /"id": "hike-doggie-contract"/)
  assert.match(manifest, /"href": "\/proposal\/hike-doggie\/contract"/)
})

test('Hike Doggie contract includes only Phase 1 and 2 with 75 and 25 payments', () => {
  assert.match(contract, /fee: '\$12,000'/)
  assert.match(contract, /amount: '\$9,000'/)
  assert.match(contract, /amount: '\$3,000'/)
  assert.match(contract, /SOP Foundation: Extract, Organize, and Standardize/)
  assert.match(contract, /Training Prototype: Design the Real Experience/)
  assert.doesNotMatch(contract, /title: 'Build and beta/)
  assert.match(contract, /The \$12,000 fee covers only Phase 1 and Phase 2/)
  assert.match(contract, /Advisory, production application development/)
})

test('Hike Doggie contract transfers project-specific editable materials and repurposing rights', () => {
  assert.match(contract, /Complete Project Ownership and Repurposing Rights/)
  assert.match(contract, /editable SOP template/)
  assert.match(contract, /editable prototype source files/)
  assert.match(contract, /commercialize, and repurpose those materials/)
  assert.match(contract, /nothing created specifically for Hike Doggie is retained by or licensed back to Anchovies/)
  assert.match(contract, /Client Content, Data, and Prototype Use/)
  assert.match(contract, /not use Hike Doggie confidential materials to train a public or generally available AI model/)
})

test('contract signing controls remain reachable on shorter desktop screens', () => {
  assert.match(contractPage, /lg:max-h-\[calc\(100vh-8rem\)\]/)
  assert.match(contractPage, /lg:overflow-y-auto/)
  assert.match(contractPage, /const \[signedDate, setSignedDate\] = useState\(getTodayInputValue\)/)
})
