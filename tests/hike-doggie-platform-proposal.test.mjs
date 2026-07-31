import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const foundationProposal = read('src/HikeDoggieFoundationProposal.tsx')
const foundationContract = read('src/contracts/hikeDoggieFoundationContract.ts')
const platformProposal = read('src/HikeDoggiePlatformProposal.tsx')
const platformContract = read('src/contracts/hikeDoggiePlatformContract.ts')
const originalProposal = read('src/HikeDoggieProposal.tsx')
const originalContract = read('src/contracts/hikeDoggieContract.ts')
const app = read('src/App.tsx')
const manifest = read('src/proposalManifest.json')

test('registers separate foundation and platform proposal-contract pairs while preserving v1', () => {
  for (const id of ['hike-doggie-foundation', 'hike-doggie-foundation-contract', 'hike-doggie-platform', 'hike-doggie-platform-contract', 'hike-doggie', 'hike-doggie-contract']) {
    assert.match(app, new RegExp(`case '${id}'`))
  }
  for (const href of ['/proposal/hike-doggie-foundation', '/proposal/hike-doggie-foundation/contract', '/proposal/hike-doggie-platform', '/proposal/hike-doggie-platform/contract']) {
    assert.match(manifest, new RegExp(`"href": "${href.replaceAll('/', '\\/')}"`))
  }
  assert.match(originalProposal, /const PRICE_TOTAL = '\$12,000'/)
  assert.match(originalContract, /title: 'SOP Foundation \+ Training Prototype Engagement'/)
})

test('foundation documents contain only the ready-to-start Phase 1 and Phase 2 engagement', () => {
  assert.match(foundationProposal, /Build the source of truth/)
  assert.match(foundationProposal, /Design and prove the experience/)
  assert.match(foundationProposal, /\$5,500/)
  assert.match(foundationProposal, /\$6,500/)
  assert.match(foundationProposal, /\$12,000/)
  assert.match(foundationContract, /fee: '\$12,000'/)
  assert.match(foundationContract, /amount: '\$9,000'/)
  assert.match(foundationContract, /amount: '\$3,000'/)
  assert.doesNotMatch(foundationContract, /equal one-third interests/)
  assert.doesNotMatch(foundationContract, /Apple alone controls/)
})

test('foundation scope includes the expanded operational context and prototype concepts', () => {
  for (const phrase of ['CRM', 'Sales-call', 'Typeform', 'source-of-truth', 'Voice-capture', 'Email-draft', 'Agent-supported SOP']) {
    assert.match(foundationContract, new RegExp(phrase, 'i'))
  }
  assert.match(foundationContract, /not production software/)
  assert.match(foundationContract, /does not obligate Hike Doggie, Kath Allen, or Bill Allen/)
  assert.match(foundationContract, /Complete Phase 1 and Phase 2 Ownership/)
})

test('platform documents contain only production development and product partnership terms', () => {
  assert.match(platformProposal, /Build the platform/)
  assert.match(platformProposal, /\$10,000/)
  assert.doesNotMatch(platformProposal, /\$22,000/)
  assert.doesNotMatch(platformProposal, /\$15,333\.33/)
  assert.equal(platformContract.match(/scopePhases:/g)?.length, 1)
  assert.match(platformContract, /Production Platform: Build and Release/)
  assert.doesNotMatch(platformContract, /Operating Foundation: Build the Source of Truth/)
  assert.doesNotMatch(platformContract, /Training Prototype: Design and Prove the Experience/)
})

test('platform contract preserves App Store, usage-cost, and human-review boundaries', () => {
  assert.match(platformContract, /Apple alone controls App Store policy, review timing, requests, rejection, and acceptance/)
  assert.match(platformContract, /does not guarantee acceptance/)
  assert.match(platformContract, /Payment and production delivery are not contingent on App Store acceptance/)
  assert.match(platformContract, /installable web app and desktop platform remain the completed delivery/)
  assert.match(platformContract, /AI model tokens/)
  assert.match(platformContract, /voice transcription/)
  assert.match(platformContract, /Human Review/)
})

test('platform contract separates Hike Doggie from the equal product venture and records contributions', () => {
  assert.match(platformContract, /No interest in Hike Doggie itself is included/)
  assert.match(platformContract, /equal one-third interests by Sean Ashlow, Kath Allen, and Bill Allen/)
  assert.match(platformContract, /does not itself form an entity or issue equity/)
  assert.match(platformContract, /Hike Doggie will pay \$3,333\.33 in cash/)
  assert.match(platformContract, /Sean Ashlow will contribute the remaining \$6,666\.67/)
  assert.match(platformContract, /initial contributions are intentionally unequal while ownership remains equal/)
  assert.match(platformContract, /Signing that agreement does not obligate/)
})

test('all new Hike Doggie copy contains no em dashes', () => {
  for (const source of [foundationProposal, foundationContract, platformProposal, platformContract]) {
    assert.doesNotMatch(source, /—/)
  }
})
