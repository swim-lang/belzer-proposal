import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('HumanaAI proposal shows updated 3.5k investment', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const proposal = read('src/HAAIProposal.tsx')

  assert.match(app, /HumanaAIProposal/)
  assert.match(manifest, /HumanaAI/)
  assert.match(manifest, /\/proposal\/humanaai/)
  assert.match(manifest, /\/proposal\/haai/)
  assert.match(proposal, /Prepared for HumanaAI/)
  assert.match(proposal, /Anchovies × HumanaAI/)
  assert.match(proposal, /\$3,500/)
  assert.match(proposal, /\$1,400/)
  assert.match(proposal, /\$1,100/)
  assert.match(proposal, /\$500/)
  assert.match(proposal, /\$3,500 · Three weeks · Full scope/)
  assert.doesNotMatch(proposal, /\$6,450/)
  assert.doesNotMatch(proposal, /\$2,600/)
  assert.doesNotMatch(proposal, /\$2,000/)
  assert.doesNotMatch(proposal, /\$850/)
  assert.doesNotMatch(proposal, /\$1,000/)
  assert.doesNotMatch(proposal, /Prepared for HAAI/)
})
