import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Humana AI proposal 2 is registered as a revised proposal', () => {
  const app = read('src/App.tsx')
  const dashboard = read('src/admin/Dashboard.tsx')
  const proposal = read('src/HumanaAIProposal2.tsx')

  assert.match(app, /HumanaAIProposal2/)
  assert.match(app, /\/proposal\/humana-ai-2/)
  assert.match(app, /\/proposal\/humanaai/)
  assert.match(dashboard, /Humana AI/)
  assert.match(dashboard, /\/proposal\/humana-ai-2/)

  assert.match(proposal, /Prepared for Humana AI/)
  assert.match(proposal, /Anchovies[\s\S]*Humana AI/)
  assert.match(proposal, /A human-first foundation for the future of learning\./)
  assert.match(proposal, /Brand · Site · Prototype · Social/)
  assert.match(proposal, /Strategy, naming, and direction/)
  assert.match(proposal, /High-fidelity app prototype/)
  assert.match(proposal, /Social launch package/)
  assert.match(proposal, /Full production app development/)
  assert.match(proposal, /Trademark and legal clearance/)
  assert.match(proposal, /\$6,500/)
  assert.match(proposal, /\$2,600/)
  assert.match(proposal, /\$1,900/)
  assert.match(proposal, /\$1,500/)
  assert.match(proposal, /\$500/)
  assert.match(proposal, /75% to begin, 25% before final handoff/)
  assert.match(proposal, /Four to six weeks/)
  assert.match(proposal, /<h1 className="display/)
  assert.doesNotMatch(proposal, /HAAI/)
  assert.doesNotMatch(proposal, /Prepared for HumanaAI|Anchovies × HumanaAI|HumanaAI has|HumanaAI's/)
  assert.doesNotMatch(proposal, /PerlaVi/)
  assert.doesNotMatch(proposal, /Newsreader/)
})
