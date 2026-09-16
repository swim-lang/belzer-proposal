import puppeteer from 'puppeteer-core';
import handler from '../api/signed-contract-pdf.ts';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.QA_BASE || 'http://127.0.0.1:4187';
const out='/tmp/bennett-contract-qa'; mkdirSync(out,{recursive:true});
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
 const page=await browser.newPage(); const events=[]; let pdfSaved=false;
 await page.setRequestInterception(true);
 page.on('request',async req=>{
  if(req.url().endsWith('/api/contract-events')) {if(req.postData())events.push(JSON.parse(req.postData()));return req.respond({status:200,contentType:'application/json',body:'{"ok":true,"id":"qa-only-not-persisted"}'});}
  if(req.url().endsWith('/api/signed-contract-pdf')) {
   const payload=JSON.parse(req.postData());
   assert.ok(payload.signedDocumentHtml.includes('QA TEST ONLY'));
   assert.ok(payload.signedDocumentHtml.includes('sean-ashlow-signature.png'));
   if(process.env.QA_BASE) {
    const r=await fetch(req.url(),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    const bytes=Buffer.from(await r.arrayBuffer()); assert.equal(r.status,200); assert.equal(bytes.subarray(0,5).toString(),'%PDF-');
    writeFileSync(out+'/signed-test.pdf',bytes);pdfSaved=true;return req.respond({status:200,contentType:'application/pdf',body:bytes});
   }
   const headers={};let status=200;
   return handler({method:'POST',body:payload},{setHeader:(k,v)=>headers[k]=v,status:(s)=>{status=s;return {send:b=>{assert.equal(status,200);writeFileSync(out+'/signed-test.pdf',b);pdfSaved=true;return req.respond({status,headers,body:b});},json:o=>req.respond({status,contentType:'application/json',body:JSON.stringify(o)})};}});
  }
  return req.continue();
 });
 await page.goto(base+'/proposal/bennett/contract');
 const source=readFileSync('src/components/ProposalGate.tsx','utf8');
 await page.type('input[type=password]',source.match(/PROPOSAL_PASSWORD = '([^']+)'/)[1]);
 await page.click('button[type=submit]');
 await page.waitForSelector('.agency-signature-line img');
 assert.ok(await page.$eval('.agency-signature-line img',i=>i.complete&&i.naturalWidth>0));
 const labels=await page.$$('label');
 for(const l of labels){const text=await l.evaluate(e=>e.textContent);if(text.includes('Signer name'))await(await l.$('input')).type('QA TEST ONLY');if(text==='Title')await(await l.$('input')).type('Test - not a client signature');}
 for(const b of await page.$$('button'))if(await b.evaluate(e=>e.textContent)==='Type signature')await b.click();
 await page.type('.signature-typed-input','QA TEST ONLY'); await page.click('input[type=checkbox]');
 for(const b of await page.$$('button'))if(await b.evaluate(e=>e.textContent)==='Sign and Submit')await b.click();
 await page.waitForFunction(()=>document.body.innerText.includes('Contract signed and submitted.'));
 for(const b of await page.$$('button'))if(await b.evaluate(e=>e.textContent)==='Download signed PDF'){await b.click();break;}
 for(let i=0;i<60&&!pdfSaved;i++)await new Promise(r=>setTimeout(r,500));
 assert.ok(pdfSaved,'PDF downloaded');
 await page.screenshot({path:out+'/signed-page.png',fullPage:true});
 console.log(JSON.stringify({base,pdfSaved,eventTypes:events.map(e=>e.eventType),realSignatureEventsPersisted:0}));
} finally {await browser.close();}
