import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const api = readFileSync(new URL('../api/contract-events.ts', import.meta.url), 'utf8')

test('contract event API has a direct Supabase REST persistence fallback', () => {
  assert.match(api, /function supabaseDirectOrNull/)
  assert.match(api, /async function saveViaSupabaseRestTable/)
  assert.match(api, /async function readSupabaseRestTableEvent/)
  assert.match(api, /async function listSupabaseRestTableEvents/)
  assert.match(api, /store: 'supabase-rest-firm-pages'/)
  assert.match(api, /\/rest\/v1\/firm_pages/)
  assert.match(api, /requiresPersistence\(event\.eventType\)/)
})
