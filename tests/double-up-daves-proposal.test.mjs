import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Double Up Daves proposal is routed and registered', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')

  assert.match(app, /DoubleUpDavesProposal/)
  assert.match(app, /case 'double-up-daves'/)
  assert.match(app, /case 'double-up-daves-contract'/)
  assert.match(manifest, /"name": "Double Up Daves"/)
  assert.match(manifest, /"href": "\/proposal\/double-up-daves"/)
  assert.match(manifest, /"sourceFile": "src\/DoubleUpDavesProposal\.tsx"/)
})

test('Double Up Daves proposal preserves the agreed scope, pricing, and paths', () => {
  const proposal = read('src/DoubleUpDavesProposal.tsx')

  assert.match(proposal, /Website Foundation/)
  assert.match(proposal, /Brand Identity Sprint/)
  assert.match(proposal, /SEO Expansion/)
  assert.match(proposal, /Social Starter Kit/)
  assert.match(proposal, /\$2,400/)
  assert.match(proposal, /\+\$1,500/)
  assert.match(proposal, /\+\$600/)
  assert.match(proposal, /\+\$500/)
  assert.match(proposal, /\$3,900/)
  assert.match(proposal, /\$4,500/)
  assert.match(proposal, /\$5,000/)

  for (const page of ['Home', 'Buy, Sell, Trade & Repair', 'Device Finder', 'About Dave', 'Contact']) {
    assert.match(proposal, new RegExp(page.replace('&', '&')))
  }

  assert.match(proposal, /up to 30 priority entries/i)
  assert.match(proposal, /Up to 30 additional researched catalog entries/)
  assert.match(proposal, /does not claim every item is currently in stock/)
  assert.match(proposal, /Primary logo or wordmark/)
  assert.match(proposal, /Photography direction and priority shot list/)
  assert.match(proposal, /Conversion-focused copywriting across five pages/)
  assert.match(proposal, /Offer consultation as the business evolves/)
  assert.match(proposal, /Repair and partner-supported service framing/)
  assert.match(proposal, /higher-touch, more premium position/)
  assert.match(proposal, /60% \/ 40%/)
  assert.match(proposal, /\$1,440 to begin/)
  assert.match(proposal, /\$960 before launch/)
  assert.doesNotMatch(proposal, /before final launch or handoff/)
  assert.match(proposal, /about two weeks/)
  assert.match(proposal, /planned across four weeks/)
  assert.match(proposal, /Review contract/)
  assert.match(proposal, /View our work/)
  assert.match(proposal, /anchovies\.agency\/work/)
  assert.match(proposal, /\/proposal\/double-up-daves\/contract/)
  assert.doesNotMatch(proposal, /mailto:/)
  assert.doesNotMatch(proposal, /Choose a direction<\/AnchorButton>/)
  assert.doesNotMatch(proposal, /fake inventory/i)
  assert.doesNotMatch(proposal, /Double Up Dave's/)
  assert.doesNotMatch(proposal, /—/)
})

test('Double Up Daves website contract matches the selected scope and payment terms', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const contract = read('src/contracts/doubleUpDavesContract.ts')

  assert.match(app, /doubleUpDavesContract/)
  assert.match(manifest, /"href": "\/proposal\/double-up-daves\/contract"/)
  assert.match(manifest, /"sourceFile": "src\/contracts\/doubleUpDavesContract\.ts"/)

  for (const expected of [
    "fee: '$2,400'",
    "amount: '$1,440'",
    "amount: '$960'",
    'This 60% payment',
    'This 40% balance',
    'approximately 2 weeks',
    'Device Finder with up to 30 priority entries',
    'Conversion-focused copywriting across five pages',
    'Analytics and Search Console basics',
    'before domain connection, public launch, and final handoff',
  ]) {
    assert.match(contract, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }

  assert.match(contract, /Brand identity sprint/)
  assert.match(contract, /does not represent live inventory/)
  assert.match(contract, /The final milestone is earned when the agreed website scope is launch-ready/)
  assert.match(contract, /No unearned future milestone becomes due solely because the Contract ends/)
  assert.match(contract, /Search rankings, indexing speed, traffic, inquiries, sales, and other business outcomes are not guaranteed/)
  assert.doesNotMatch(contract, /Brand Identity Sprint'[\s\S]*scopePhases/)
  assert.doesNotMatch(contract, /—/)
})
