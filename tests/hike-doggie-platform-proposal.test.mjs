import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const proposal = read('src/HikeDoggiePlatformProposal.tsx')
const contract = read('src/contracts/hikeDoggiePlatformContract.ts')
const originalProposal = read('src/HikeDoggieProposal.tsx')
const originalContract = read('src/contracts/hikeDoggieContract.ts')
const app = read('src/App.tsx')
const manifest = read('src/proposalManifest.json')

test('registers the new Hike Doggie platform proposal and contract without replacing v1', () => {
  assert.match(app, /case 'hike-doggie-platform'/)
  assert.match(app, /case 'hike-doggie-platform-contract'/)
  assert.match(app, /case 'hike-doggie'/)
  assert.match(app, /case 'hike-doggie-contract'/)
  assert.match(manifest, /"href": "\/proposal\/hike-doggie-platform"/)
  assert.match(manifest, /"href": "\/proposal\/hike-doggie-platform\/contract"/)
  assert.match(manifest, /"href": "\/proposal\/hike-doggie"/)
  assert.match(manifest, /"href": "\/proposal\/hike-doggie\/contract"/)
  assert.match(originalProposal, /const PRICE_TOTAL = '\$12,000'/)
  assert.match(originalContract, /title: 'SOP Foundation \+ Training Prototype Engagement'/)
})

test('keeps phases one and two and makes the production platform concrete', () => {
  assert.match(proposal, /Build the source of truth/)
  assert.match(proposal, /Design and prove the experience/)
  assert.match(proposal, /Build the platform/)
  assert.match(proposal, /\$5,500/)
  assert.match(proposal, /\$6,500/)
  assert.match(proposal, /\$10,000/)
  assert.match(proposal, /\$22,000/)
  assert.match(contract, /fee: '\$22,000 project value; \$15,333\.33 Client cash commitment'/)
})

test('defines the expanded source of truth and agent capabilities', () => {
  for (const phrase of [
    'CRM',
    'sales-call',
    'Typeform',
    'Voice-capture',
    'Email-draft',
    'Agent-supported SOP',
    'Human Review',
  ]) {
    assert.match(contract, new RegExp(phrase, 'i'))
  }
})

test('sets App Store responsibility and web fallback clearly', () => {
  assert.match(contract, /Apple alone controls App Store policy, review timing, requests, rejection, and acceptance/)
  assert.match(contract, /does not guarantee acceptance/)
  assert.match(contract, /Phase 3 payment and production delivery are not contingent on App Store acceptance/)
  assert.match(contract, /installable web app and desktop platform remain the completed delivery/)
})

test('states variable production usage costs and approval controls', () => {
  assert.match(contract, /AI model tokens/)
  assert.match(contract, /voice transcription/)
  assert.match(contract, /Actual usage can vary/)
  assert.match(contract, /No substantial third-party expense will be incurred without written approval/)
})

test('separates Hike Doggie ownership from the new one-third product venture', () => {
  assert.match(contract, /No interest in Hike Doggie itself is included/)
  assert.match(contract, /equal one-third interests by Sean Ashlow, Kath Allen, and Bill Allen/)
  assert.match(contract, /does not itself form an entity or issue equity/)
  assert.match(contract, /definitive venture documents/)
  assert.match(contract, /Ownership of Phase 1 and Phase 2 Work/)
  assert.match(contract, /Hike Doggie will pay \$3,333\.33 in cash/)
  assert.match(contract, /Sean Ashlow will contribute the remaining \$6,666\.67/)
  assert.match(contract, /initial contributions are intentionally unequal while ownership remains equal/)
})

test('new proposal and contract copy contain no em dashes', () => {
  assert.doesNotMatch(proposal, /—/)
  assert.doesNotMatch(contract, /—/)
})
