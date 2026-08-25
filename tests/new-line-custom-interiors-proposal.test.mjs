import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('New Line Custom Interiors proposal is routed and registered', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')

  assert.match(app, /NewLineCustomInteriorsProposal/)
  assert.match(app, /case 'new-line-custom-interiors'/)
  assert.match(manifest, /"name": "New Line Custom Interiors"/)
  assert.match(manifest, /"href": "\/proposal\/new-line-custom-interiors"/)
  assert.match(manifest, /"sourceFile": "src\/NewLineCustomInteriorsProposal\.tsx"/)
})

test('New Line Custom Interiors proposal preserves scope, timing, pricing, and payment terms', () => {
  const proposal = read('src/NewLineCustomInteriorsProposal.tsx')

  for (const expected of [
    'Brad Drummond',
    'New Line Custom Interiors',
    'Aurora, Colorado',
    'Custom Homes',
    'Remodeling + Interiors',
    'Projects',
    'Process',
    'About',
    'Contact',
    'Local search foundation',
    'Project-led authority',
    'AI discovery readiness',
    'Up to 10 priority projects',
    'two weeks',
    '$6,500',
    '$3,250',
    '50%',
    'At kickoff',
    'At launch',
    'Start the website',
    'Review together',
  ]) {
    assert.match(proposal, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))
  }

  assert.match(proposal, /type="range"/)
  assert.match(proposal, /min="10000"/)
  assert.match(proposal, /step="10000"/)
  assert.match(proposal, /\$10K/)
  assert.match(proposal, /websiteCost = 6500/)
  assert.match(proposal, /not a profit calculation or a promise/i)
  assert.match(proposal, /Search rankings, AI citations, traffic, inquiries, and project wins cannot be guaranteed/)
  assert.doesNotMatch(proposal, /bg-\[#d9ddcf\]/)
  assert.doesNotMatch(proposal, /work Brad wants|how Brad works|Brad will have|Brad supplies|Ready when Brad is|Use Brad's own/)
  assert.doesNotMatch(proposal, /WordPress[^.]*included/i)
  assert.doesNotMatch(proposal, /—/)
})

test('New Line Custom Interiors proposal features the selected websites in the requested order', () => {
  const proposal = read('src/NewLineCustomInteriorsProposal.tsx')
  const expected = [
    ['GoDuo', 'https://goduo.co/', '/work/new-line/goduo.webp'],
    ['No Walls Real Estate', 'https://nowallsrealestate.com/', '/work/new-line/no-walls.webp'],
    ['ERC', 'https://erc.com/', '/work/new-line/erc.webp'],
    ['Ren Homes', 'https://renhomes.flywheelsites.com/', '/work/new-line/ren-homes.webp'],
    ['Lex Politica', 'https://lexpolitica.com/', '/work/new-line/lex-politica.webp'],
  ]

  let lastIndex = -1
  for (const [name, href, image] of expected) {
    const index = proposal.indexOf(`name: '${name}'`)
    assert.ok(index > lastIndex, `${name} should follow the requested work order`)
    lastIndex = index
    assert.match(proposal, new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    assert.match(proposal, new RegExp(image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }

  assert.doesNotMatch(proposal, /arc88studio/)
})
