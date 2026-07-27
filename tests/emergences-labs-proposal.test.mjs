import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Emergences Labs proposal is routed with the full identity and product system', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const proposal = read('src/EmergencesLabsProposal.tsx')

  assert.match(app, /EmergencesLabsProposal/)
  assert.match(app, /case 'emergences-labs'/)
  assert.match(manifest, /"name": "Emergences Labs"/)
  assert.match(manifest, /\/proposal\/emergences-labs/)
  assert.match(manifest, /\$35,000/)

  assert.match(proposal, /Make human capability impossible to overlook\./)
  assert.match(proposal, /The machine is the context\. The human is the subject\./)
  assert.match(proposal, /Parable, Cosmos Institute, Anthropic, and Lex Politica/)
  assert.match(proposal, /Emergences Labs, NeoWork, and NeoHuman family architecture/)
  assert.match(proposal, /Assessment and results interface studies/)
  assert.match(proposal, /Dashboard and learning-surface studies/)
  assert.match(proposal, /Logo animation/)
  assert.match(proposal, /Two short motion studies/)
  assert.match(proposal, /Merchandise and event concepts/)
  assert.match(proposal, /Research report or publication template/)
  assert.match(proposal, /Figma design system library/)
  assert.match(proposal, /One lead direction/)
  assert.match(proposal, /Full product UX, engineering, and coded websites are not included/)

  assert.match(proposal, /Lex Politica/)
  assert.match(proposal, /Out There/)
  assert.match(proposal, /Freddie/)
  assert.match(proposal, /\/work\/emergences\/lex-politica\.jpg/)
  assert.match(proposal, /\/work\/emergences\/out-there\.svg/)
  assert.match(proposal, /\/work\/emergences\/freddie\.jpg/)

  assert.match(proposal, /\$5,000/)
  assert.match(proposal, /\$14,500/)
  assert.match(proposal, /\$8,500/)
  assert.match(proposal, /\$7,000/)
  assert.match(proposal, /\$35,000/)
  assert.match(proposal, /\$17,500/)
  assert.equal((proposal.match(/\$8,750/g) ?? []).length, 2)
  assert.match(proposal, /50% \/ 25% \/ 25%/)
  assert.match(proposal, /8 to 10 weeks/)

  assert.match(proposal, /Schedule proposal review/)
  assert.match(proposal, /Accept proposal/)
  assert.match(proposal, /mailto:sean@anchovies\.agency/)
  assert.match(proposal, /https:\/\/cal\.com\/anchovies\/30min/)
  assert.doesNotMatch(proposal, /[—–]/)
})
