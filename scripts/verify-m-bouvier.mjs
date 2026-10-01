// Explicit QA only: no client signatures and no email transport.
import puppeteer from 'puppeteer-core'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import assert from 'node:assert/strict'
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'
import pdfHandler from '../api/signed-contract-pdf.ts'

// Production secrets are not exported; QA uses the deployed API with a distinct test slug.
delete process.env.RESEND_API_KEY
const nativeFetch = globalThis.fetch
globalThis.fetch = (url, options) => {
  if (String(url).includes('resend.com')) throw new Error('Email forbidden in QA')
  return nativeFetch(url, options)
}
const base = process.env.QA_BASE || 'http://127.0.0.1:4188'
const out = process.env.QA_OUT || '/tmp/m-bouvier-contract-qa'
mkdirSync(out, { recursive: true })
const slug = `qa-m-bouvier-${Date.now()}`
const ids = []
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
let failSave = true, delaySave = false, pdfSaved = false, expectedHtml = '', storedEvent
try {
 const page = await browser.newPage()
 page.setDefaultTimeout(60000)
 await page.setViewport({width:1280,height:900})
 const errors=[]; page.on('pageerror', e=>errors.push(String(e)))
 await page.setRequestInterception(true)
 page.on('request', async req => {
  try {
   if (req.url().includes('/api/contract-events')) {
    const payload=JSON.parse(req.postData() || '{}')
    // Suppress view/download analytics to avoid any live client events.
    if (payload.eventType !== 'contract_signed') return req.respond({status:200,contentType:'application/json',body:'{"ok":true,"saved":true}'})
    assert.equal(payload.signerName,'QA TEST ONLY')
    assert.ok(payload.signedDocumentHtml.includes('sean-ashlow-signature.png'))
    if (delaySave) await new Promise(r=>setTimeout(r,1800))
    if (failSave) return req.respond({status:200,contentType:'application/json',body:'{"ok":true,"saved":false,"id":"qa-not-saved"}'})
    payload.contractSlug=slug
    payload.pageUrl=`https://qa.invalid/${slug}`
    payload.signedDocumentHtml=payload.signedDocumentHtml.replaceAll('M. Bouvier Law','QA TEST AGREEMENT - NOT EXECUTED')
    expectedHtml=payload.signedDocumentHtml
    const response=await nativeFetch('https://anchovies.pro/api/contract-events',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)})
    const result=await response.json()
    assert.equal(result.saved,true,`Persistence failed: ${result.storeError}`)
    assert.equal(result.emailed,false)
    ids.push(result.id)
    writeFileSync(out+'/receipt.json',JSON.stringify({id:result.id,store:result.store,testSlug:slug,htmlSha256:createHash('sha256').update(expectedHtml).digest('hex')},null,2))
    return req.respond({status:response.status,contentType:'application/json',body:JSON.stringify(result)})
   }
   if (req.url().endsWith('/api/signed-contract-pdf')) {
    const payload=JSON.parse(req.postData())
    assert.ok(payload.signedDocumentHtml.includes('QA TEST ONLY'))
    assert.ok(payload.signedDocumentHtml.includes('sean-ashlow-signature.png'))
    payload.contractSlug=slug
    payload.signedDocumentHtml=expectedHtml
    if(base.startsWith('https:')) {
      const response=await nativeFetch(req.url(),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)})
      const bytes=Buffer.from(await response.arrayBuffer());assert.equal(response.status,200);assert.equal(bytes.subarray(0,5).toString(),'%PDF-')
      writeFileSync(out+'/qa-signed-contract.pdf',bytes);pdfSaved=true
      return req.respond({status:200,contentType:'application/pdf',body:bytes})
    }
    const headers={}; let status=200
    return pdfHandler({method:'POST',body:payload},{setHeader:(k,v)=>headers[k]=v,status:n=>{status=n;return {send:bytes=>{assert.equal(status,200);assert.equal(bytes.subarray(0,5).toString(),'%PDF-');writeFileSync(out+'/qa-signed-contract.pdf',bytes);pdfSaved=true;return req.respond({status,headers,body:bytes})},json:o=>req.respond({status,contentType:'application/json',body:JSON.stringify(o)})}}})
   }
   return req.continue()
  } catch(e) {console.error(String(e));errors.push(String(e));return req.respond({status:500,body:'QA assertion failed'})}
 })
 await page.goto(base+'/proposal/m-bouvier/contract')
 await page.waitForSelector('input[type=password]')
 const gate=readFileSync('src/components/ProposalGate.tsx','utf8').match(/PROPOSAL_PASSWORD = '([^']+)'/)[1]
 await page.type('input[type=password]',gate);await page.click('button[type=submit]')
 await page.waitForSelector('.contract-document')
 assert.ok(await page.$('.agency-signature-line img'))
 assert.match(await page.$eval('.agency-signature-line', e=>e.parentElement.innerText), /Date: October 1, 2026/)
 await page.waitForFunction(()=>{const img=document.querySelector('.agency-signature-line img');return img?.complete && img.naturalWidth>0})
 const text=await page.$eval('.contract-document',e=>e.innerText)
 for(const value of ['$9,900','$4,950','$2,475','$4,000','$5,900','Insights','About the Firm','5 to 7'])assert.ok(text.includes(value),value)
 for(const label of await page.$$('label')) {
  const text=await label.evaluate(e=>e.textContent)
  if(text.includes('Signer name'))await(await label.$('input')).type('QA TEST ONLY')
  if(text==='Title')await(await label.$('input')).type('TEST - NOT A CLIENT SIGNATURE')
 }
 const click=async label=>{for(const b of await page.$$('button'))if(await b.evaluate(e=>e.textContent)===label){await b.click();return}throw Error('Missing '+label)}
 await click('Type signature');await page.type('.signature-typed-input','QA TEST ONLY')
 await page.click('input[type=checkbox]')
 delaySave=true;await click('Sign and Submit')
 await new Promise(r=>setTimeout(r,300))
 assert.equal(await page.evaluate(()=>document.body.innerText.includes('Contract signed and submitted.')),false,'No premature success')
 await page.waitForFunction(()=>document.body.innerText.includes('Something went wrong while submitting.'))
 assert.equal(await page.evaluate(()=>document.body.innerText.includes('Download signed PDF')),false,'No download for failed save')
 failSave=false;delaySave=false;await click('Sign and Submit')
 await page.waitForFunction(()=>document.body.innerText.includes('Contract signed and submitted.'))
 await page.reload();await page.waitForFunction(()=>document.body.innerText.includes('Contract signed and submitted.'))
 await click('Download signed PDF')
 for(let i=0;i<120&&!pdfSaved;i++)await new Promise(r=>setTimeout(r,500))
 assert.ok(pdfSaved)
 await page.setViewport({width:390,height:844})
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
 await page.screenshot({path:out+'/mobile-submitted.png'})
 assert.deepEqual(errors,[])
 console.log(JSON.stringify({base,failedSaveRejected:true,noPrematureSuccess:true,persistenceConfirmed:true,readBackRequiresDatabaseCheck:true,refreshRecovery:true,pdfSaved,mobileOverflow:false,agencySignaturePreloaded:true,clientSigned:false,emailsSent:0}))
} finally {
 await browser.close()
 // Delete only IDs created by this QA run, guarded by the unique QA contract slug.
 if(ids.length && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  const db=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY)
  const {error}=await db.from('contract_events').delete().eq('contract_slug',slug).in('id',ids)
  if(error)throw error
  const {data,error:readError}=await db.from('contract_events').select('id').eq('contract_slug',slug).in('id',ids)
  assert.equal(readError,null);assert.equal(data.length,0)
  console.log('QA records removed and absence verified.')
 }
}
