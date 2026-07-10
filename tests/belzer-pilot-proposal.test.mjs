import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Belzer pilot proposal is registered as a low-risk three-option pilot', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const proposal = read('src/BelzerPilotProposal.tsx')

  assert.match(app, /BelzerPilotProposal/)
  assert.match(manifest, /Belzer Law: Focused Workflow Pilot/)
  assert.match(manifest, /\/proposal\/belzer-pilot/)
  assert.match(manifest, /\/proposal\/belzer/)
  assert.match(manifest, /\$4,500 flat/)

  assert.match(proposal, /Focused Workflow Pilot/)
  assert.match(proposal, /\$4,500/)
  assert.match(proposal, /Choose one practical workflow and receive one concrete outcome\./)
  assert.match(proposal, /Here is what we heard/)
  assert.match(proposal, /Here is what we propose/)
  assert.match(proposal, /Document Review \+ Exhibit Organizer/)
  assert.match(proposal, /Client Clarity System/)
  assert.match(proposal, /Motions Bank \/ Case Knowledge Library/)
  assert.match(proposal, /What you receive/)
  assert.match(proposal, /searchable document index/)
  assert.match(proposal, /client update structure/)
  assert.match(proposal, /searchable internal reference library/)
  assert.match(proposal, /If the selected pilot does not produce a useful agreed deliverable/)
  assert.match(proposal, /credit the pilot fee toward a revised pilot direction or the next agreed step/)
  assert.match(proposal, /No full platform build/)
  assert.match(proposal, /Human legal review remains required/)
  assert.match(proposal, /mailto:sean@anchovies\.agency\?subject=Belzer%20Pilot%20Proposal/)

  assert.doesNotMatch(proposal, /belzerPilotContent/)
  assert.doesNotMatch(proposal, /\$3,500/)
  assert.doesNotMatch(proposal, /\$6,500/)
  assert.doesNotMatch(proposal, /\$6\.5K/)
  assert.doesNotMatch(proposal, /\$10K–\$15K/)
  assert.doesNotMatch(proposal, /custom-built legal intelligence tool/)
  assert.doesNotMatch(proposal, /first proposal/)
  assert.doesNotMatch(proposal, /larger possibility/)
  assert.doesNotMatch(proposal, /visible output/)
  assert.doesNotMatch(proposal, /dashboard/)
  assert.doesNotMatch(proposal, /\u2014/)
})
