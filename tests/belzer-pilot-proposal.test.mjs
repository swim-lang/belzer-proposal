import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Belzer pilot proposal is registered as a low-risk three-option pilot', () => {
  const app = read('src/App.tsx')
  const dashboard = read('src/admin/Dashboard.tsx')
  const proposal = read('src/belzerPilotContent.ts')

  assert.match(app, /belzerPilotContent/)
  assert.match(app, /\/proposal\/belzer-pilot/)
  assert.match(app, /initialContent=\{belzerPilotContent\}/)
  assert.match(app, /\/proposal\/belzer/)

  assert.match(dashboard, /Belzer Law: Focused Workflow Pilot/)
  assert.match(dashboard, /\/proposal\/belzer-pilot/)

  assert.match(proposal, /id: 'belzer-pilot'/)
  assert.match(proposal, /Focused Workflow Pilot/)
  assert.match(proposal, /\$3,500/)
  assert.match(proposal, /Pick one painful workflow, prove the value, then decide what is worth building next\./)
  assert.match(proposal, /Document Review \+ Exhibit Organizer/)
  assert.match(proposal, /Client Clarity System/)
  assert.match(proposal, /Motions Bank \/ Case Knowledge Library/)
  assert.match(proposal, /If the selected pilot does not produce a useful agreed deliverable/)
  assert.match(proposal, /credit the pilot fee toward a revised pilot direction or the next agreed step/)
  assert.match(proposal, /No full platform build included/)
  assert.match(proposal, /Human legal review remains required/)
  assert.match(proposal, /mailto:sean@anchovies\.agency\?subject=Belzer%20Pilot%20Proposal/)

  assert.doesNotMatch(proposal, /\$6,500/)
  assert.doesNotMatch(proposal, /\$6\.5K/)
  assert.doesNotMatch(proposal, /\$10K–\$15K/)
  assert.doesNotMatch(proposal, /custom-built legal intelligence tool/)
  assert.doesNotMatch(proposal, /\u2014/)
})
