import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Double Up Daves proposal is routed and registered', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')

  assert.match(app, /DoubleUpDavesProposal/)
  assert.match(app, /case 'double-up-daves'/)
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
  assert.match(proposal, /50% \/ 50%/)
  assert.match(proposal, /about two weeks/)
  assert.match(proposal, /planned across four weeks/)
  assert.match(proposal, /Choose a direction/)
  assert.match(proposal, /Schedule a proposal review/)
  assert.match(proposal, /sean@anchovies\.agency/)
  assert.match(proposal, /cal\.com\/anchovies\/30min/)
  assert.doesNotMatch(proposal, /fake inventory/i)
  assert.doesNotMatch(proposal, /Double Up Dave's/)
  assert.doesNotMatch(proposal, /—/)
})
