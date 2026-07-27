import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Blanchet search visibility proposal is routed and scoped as a seven-day sprint', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const proposal = read('src/BlanchetSearchVisibilityProposal.tsx')

  assert.match(app, /BlanchetSearchVisibilityProposal/)
  assert.match(app, /case 'blanchet-search-visibility'/)
  assert.match(manifest, /\/proposal\/blanchet-search-visibility/)
  assert.match(manifest, /Search visibility sprint/)
  assert.match(manifest, /\$2,500/)
  assert.match(manifest, /7 days/)

  assert.match(proposal, /Prepared for Blanchet/)
  assert.match(proposal, /Search Visibility Sprint/)
  assert.match(proposal, /Google Search Console/)
  assert.match(proposal, /Address update on the website/)
  assert.match(proposal, /sitemap/)
  assert.match(proposal, /Indexing request for priority pages/)
  assert.match(proposal, /Core legal directory listing pass/)
  assert.match(proposal, /firm-owned setup email/)
  assert.match(proposal, /Two to three short launch or firm-update posts/)
  assert.match(proposal, /Search visibility tracking sheet/)
  assert.match(proposal, /\$2,500/)
  assert.match(proposal, /7 days/)
  assert.match(proposal, /50% to begin, 50% on completion/)
  assert.match(proposal, /Google can take days to weeks to recrawl and reprocess changes/)
  assert.match(proposal, /Accept proposal/)
  assert.match(proposal, /mailto:sean@anchovies\.agency/)
  assert.match(proposal, /https:\/\/cal\.com\/anchovies\/30min/)

  assert.doesNotMatch(proposal, /[—–]/)
  assert.doesNotMatch(proposal, /guarantee a specific ranking/)
})
