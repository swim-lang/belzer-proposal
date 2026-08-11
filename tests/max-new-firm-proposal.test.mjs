import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const app = read('src/App.tsx')
const manifest = read('src/proposalManifest.json')
const proposal = read('src/MaxNewFirmProposal.tsx')

test('registers the protected Max new-firm proposal route', () => {
  assert.match(app, /MaxNewFirmProposal/)
  assert.match(app, /case 'max-new-firm'/)
  assert.match(manifest, /"href": "\/proposal\/max-new-firm"/)
  assert.match(manifest, /"sourceFile": "src\/MaxNewFirmProposal\.tsx"/)
})

test('keeps the uncertain firm name provisional', () => {
  assert.match(
    proposal,
    /Firm name remains provisional pending confirmation and legal[\s\S]*clearance\./,
  )
  assert.match(proposal, /firm name and URL will be finalized after naming/)
  assert.doesNotMatch(proposal, /Nachshon Law|Nahshon Law/)
})

test('separates the three scope parts from the payment schedule', () => {
  assert.match(proposal, /Temporary Website/)
  assert.match(proposal, /Brand Strategy \+ Identity/)
  assert.match(proposal, /Website Design \+ Development/)
  assert.match(proposal, /\$7,000/)
  assert.match(proposal, /\$14,000/)
  assert.match(proposal, /50% at kickoff/)
  assert.match(proposal, /25% after brand approval/)
  assert.match(proposal, /25% before launch/)
  assert.match(proposal, /\$3,500/)
})

test('defines the temporary site and six-week full timeline', () => {
  assert.match(proposal, /One-page responsive website/)
  assert.match(proposal, /Week one/)
  assert.match(proposal, /Approximately six weeks/)
  assert.match(proposal, /included at no additional project fee/i)
})

test('defines seven core pages and the custom technical foundation', () => {
  for (const page of [
    'Home',
    'Mission + Model',
    'Cases + Initiatives',
    'Capabilities',
    'Team + Culture',
    'Insights',
    'Contact',
  ]) {
    assert.match(proposal, new RegExp(page.replace('+', '\\+')))
  }
  for (const term of [
    'React',
    'TypeScript',
    'Supabase',
    'Vercel',
    'GitHub',
    'Agent-assisted development',
    'custom admin',
  ]) {
    assert.match(proposal, new RegExp(term, 'i'))
  }
})

test('includes legal work links and the primary CTAs', () => {
  assert.match(proposal, /https:\/\/www\.avodahlegal\.com\//)
  assert.match(proposal, /https:\/\/lexpolitica\.com\//)
  assert.match(proposal, /https:\/\/pitch\.com\/v\/anchovies-press-zwdsbn/)
  assert.match(proposal, /Schedule a proposal review/)
  assert.match(proposal, /https:\/\/anchovies\.agency\/work/)
  assert.match(proposal, /lawyerist\.com\/news\/best-law-firm-websites-2023-2/)
  assert.match(
    proposal,
    /lawyerist\.com\/news\/good-vs-great-what-best-law-firm-websites-get-right/,
  )
  assert.match(proposal, /lawyerist\.com\/news\/best-law-firm-websites-2026/)
})

test('contains no em dashes', () => {
  assert.equal(proposal.includes('—'), false)
})
