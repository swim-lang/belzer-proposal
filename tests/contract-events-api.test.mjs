import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const api = readFileSync(new URL('../api/contract-events.ts', import.meta.url), 'utf8')
const pdfApi = readFileSync(new URL('../api/signed-contract-pdf.ts', import.meta.url), 'utf8')
const contractPage = readFileSync(new URL('../src/contracts/ContractPage.tsx', import.meta.url), 'utf8')
const contractAdmin = readFileSync(new URL('../src/admin/ContractEventsView.tsx', import.meta.url), 'utf8')

test('contract event API has a direct Supabase REST persistence fallback', () => {
  assert.match(api, /function supabaseDirectOrNull/)
  assert.match(api, /runtime: 'nodejs'/)
  assert.match(api, /nodeRequestToWebRequest/)
  assert.match(api, /async function saveViaSupabaseContractEvents/)
  assert.match(api, /async function saveViaSupabaseRestContractEvents/)
  assert.match(api, /store: 'supabase-contract-events'/)
  assert.match(api, /store: 'supabase-rest-contract-events'/)
  assert.match(api, /\/rest\/v1\/contract_events/)
  assert.match(api, /async function saveViaSupabaseRestTable/)
  assert.match(api, /async function readSupabaseRestTableEvent/)
  assert.match(api, /async function listSupabaseRestTableEvents/)
  assert.match(api, /store: 'supabase-rest-firm-pages'/)
  assert.match(api, /\/rest\/v1\/firm_pages/)
  assert.match(api, /requiresPersistence\(event\.eventType\)/)
  assert.match(api, /Contract event logged but not persisted/)
  assert.doesNotMatch(api, /supabaseConfigSummary/)
})

test('signed contracts download as real PDF files for clients and admins', () => {
  assert.match(pdfApi, /content-type', 'application\/pdf'/)
  assert.match(pdfApi, /content-disposition'/)
  assert.match(pdfApi, /page\.pdf/)
  assert.match(pdfApi, /cache-control', 'private, no-store'/)
  assert.match(pdfApi, /signedDocumentHtml\.includes\('contract-document'\)/)
  assert.match(contractPage, /fetch\('\/api\/signed-contract-pdf'/)
  assert.match(contractPage, /Download signed PDF/)
  assert.match(contractPage, /downloadBlob/)
  assert.match(contractPage, /flushSync\(\(\) => setSubmittedSignature\(nextSignature\)\)/)
  assert.match(contractPage, /signedDocumentHtml,/)
  assert.match(contractAdmin, /Download signed PDF/)
})
