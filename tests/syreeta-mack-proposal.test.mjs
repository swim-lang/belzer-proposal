import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const app = read('src/App.tsx')
const manifest = read('src/proposalManifest.json')
const proposal = read('src/SyreetaMackProposal.tsx')

test('registers the protected Syreeta Mack proposal route', () => {
  assert.match(app, /SyreetaMackProposal/)
  assert.match(app, /case 'syreeta-mack'/)
  assert.match(manifest, /"href": "\/proposal\/syreeta-mack"/)
  assert.match(manifest, /"sourceFile": "src\/SyreetaMackProposal\.tsx"/)
})

test('preserves the approved total and transparent phase pricing', () => {
  for (const price of ['$500', '$1,350', '$1,400', '$3,750']) {
    assert.match(proposal, new RegExp(price.replace('$', '\\$').replace(',', ',')))
  }
  assert.match(proposal, /50%/)
  assert.match(proposal, /25%/)
  assert.match(proposal, /\$1,875/)
  assert.match(proposal, /\$937\.50/)
})

test('includes strategy, identity, website, social, and print scope', () => {
  for (const term of [
    'Brand Strategy + Positioning',
    'Visual Identity + Brand World',
    'Website Strategy, Design + Development',
    'Launch Toolkit',
    'Light category and audience review',
    'Brand positioning statement',
    'One unifying creative idea',
    'Five-page website architecture',
    'Four flexible social post templates',
    'Business card',
    'One-page capabilities sheet',
    'Event flyer or announcement template',
  ]) {
    assert.match(proposal, new RegExp(term.replaceAll('+', '\\+')))
  }
})

test('defines the five-page website and three-to-four-week delivery', () => {
  for (const page of ['Home', 'Work', 'Services', 'About', 'Contact']) {
    assert.match(proposal, new RegExp(`'${page}'`))
  }
  assert.match(proposal, /Approximately three to four weeks/)
  assert.match(proposal, /Schedule a proposal review/)
})

test('keeps the initial work presentation intentionally flexible', () => {
  assert.match(proposal, /already seen the broader Anchovies portfolio through Contra/)
  assert.match(proposal, /curate the most relevant projects directly into this proposal/)
  assert.match(proposal, /https:\/\/anchovies\.agency\/work/)
})

test('contains no em dashes', () => {
  assert.equal(proposal.includes('—'), false)
})
