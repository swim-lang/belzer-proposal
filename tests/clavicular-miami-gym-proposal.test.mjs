import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Clavicular Miami gym proposal is registered in the shared proposal system', () => {
  const app = read('src/App.tsx')
  const manifest = JSON.parse(read('src/proposalManifest.json'))
  const proposal = read('src/ClavicularMiamiGymProposal.tsx')
  const entry = manifest.find((item) => item.id === 'clavicular-miami-gym')

  assert.ok(entry)
  assert.equal(entry.href, '/proposal/clavicular-miami-gym')
  assert.deepEqual(entry.paths, ['/proposal/clavicular-miami-gym'])
  assert.equal(entry.sourceFile, 'src/ClavicularMiamiGymProposal.tsx')
  assert.equal(entry.access, 'active')
  assert.match(app, /ClavicularMiamiGymProposal/)
  assert.match(app, /case 'clavicular-miami-gym'/)
  assert.match(app, /withProposalGate\(<ClavicularMiamiGymProposal \/>\)/)
  assert.match(proposal, /Prepared for Braden Peters \/ Clavicular/)
  assert.doesNotMatch(proposal, /Brennan Peters/)
})

test('Clavicular proposal preserves the commercial terms and scope boundaries', () => {
  const proposal = read('src/ClavicularMiamiGymProposal.tsx')

  assert.match(proposal, /Comparable full-scope value: \$70,000/)
  assert.match(proposal, /Proposed agency fee/)
  assert.match(proposal, /Premium typeface licenses/)
  assert.match(proposal, /Custom member portals or advanced platform integrations/)
  assert.match(proposal, /noindex, nofollow/)
  assert.match(proposal, /https:\/\/pitch\.com\/v\/clav-rckauc/)
  assert.match(proposal, /https:\/\/anchovies\.agency\/about/)
})

test('Clavicular proposal covers ownership, case-study rights, revisions, and future paid work', () => {
  const proposal = read('src/ClavicularMiamiGymProposal.tsx')

  assert.match(proposal, /own all approved final project deliverables/)
  assert.match(proposal, /select design publications, awards, and journals/)
  assert.match(proposal, /Revisions within scope/)
  assert.match(proposal, /Mutual exit/)
  assert.match(proposal, /Future paid work/)
})

test('Clavicular proposal uses direct language and keeps the streaming premise specific', () => {
  const proposal = read('src/ClavicularMiamiGymProposal.tsx')

  assert.match(proposal, /The stream changes the brief/)
  assert.match(proposal, /without turning the gym into a space only for creators/)
  assert.match(proposal, /Have a clear point of view/)
  assert.match(proposal, /Scope and process/)
  assert.match(proposal, />One month\.<\/h2>/)
  assert.match(proposal, /Brand strategy with business context/)
  assert.match(proposal, /Built for the stream\. Ready for real-world revenue\.\s*<\/h1>/)
  assert.match(proposal, /A free-access model can still be commercially valuable/)
  assert.match(proposal, /without forcing a traditional membership model/)
  assert.match(proposal, /recurring setting for his own streams/)
  assert.doesNotMatch(proposal, /Build the world/)
  assert.doesNotMatch(proposal, /Make it usable/)
  assert.doesNotMatch(proposal, /Small team\. Wide range/)
  assert.doesNotMatch(proposal, /In closing/)
  assert.doesNotMatch(proposal, /No wasted theater/)
})
