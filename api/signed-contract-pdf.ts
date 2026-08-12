import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

export const config = { runtime: 'nodejs', maxDuration: 60 }

const PDF_STYLES = `
  :root { --ink: #0a0a0a; --muted: #555; --rule: #d8d3c8; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: #fff; color: var(--ink); }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 9.6pt; line-height: 1.38; }
  .contract-document { width: 100%; margin: 0; padding: 0; background: #fff; box-shadow: none; }
  .contract-document p { display: block; margin: 0 0 7pt; break-inside: avoid; page-break-inside: avoid; }
  .contract-header { display: grid; grid-template-columns: 1fr 1.7in; gap: .25in; padding-bottom: .18in; margin-bottom: .2in; border-bottom: 1px solid var(--rule); break-after: avoid; }
  .contract-header h1 { max-width: none; margin: 5pt 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22pt; font-weight: 400; line-height: 1.02; }
  .eyebrow, .contract-meta { font-size: 7.4pt; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
  .contract-meta { display: flex; flex-direction: column; gap: 4pt; }
  .contract-section { padding-top: .13in; margin-top: .13in; border-top: 1px solid #e3ded4; }
  .contract-section h2 { margin: 0 0 .06in; font-family: Georgia, 'Times New Roman', serif; font-size: 13.5pt; font-weight: 400; line-height: 1.12; break-after: avoid; }
  .contract-document h3 { margin: 0 0 .04in; font-family: Georgia, 'Times New Roman', serif; font-size: 11.5pt; font-weight: 400; line-height: 1.2; break-after: avoid; }
  .contract-document ul { margin: 0 0 .08in 20px; padding: 0; }
  .contract-document li { display: list-item; margin-bottom: 2pt; break-inside: avoid; page-break-inside: avoid; }
  .signature-section { padding: .16in 0; margin-top: .16in; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); break-inside: avoid; }
  .signature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .3in; margin-top: .1in; }
  .signature-grid > div, .scope-phase { break-inside: avoid; }
  .signature-line { display: flex; align-items: flex-end; min-height: .38in; margin: .1in 0 .06in; border-bottom: 1px solid var(--rule); }
  .signature-script { font-family: Georgia, 'Times New Roman', serif; font-size: 19pt; line-height: 1; }
  .client-drawn-signature, .agency-signature-line img { width: 2.4in; max-height: .38in; object-fit: contain; object-position: left bottom; }
  .agency-signature-line img { margin-bottom: .05in; }
  .scope-phase { padding-top: .1in; margin-top: .1in; border-top: 1px solid #ece6dc; }
  @page { size: letter; margin: .55in; }
`

function sanitizeSignedHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<(?:iframe|object|embed|form)\b[^>]*>[\s\S]*?<\/(?:iframe|object|embed|form)>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
    .replace(/(?:src|href)=(['"])javascript:[\s\S]*?\1/gi, '')
    .replace(/src=(['"])\/signatures\//gi, 'src=$1https://anchovies.pro/signatures/')
}

function documentHtml(contractHtml: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${PDF_STYLES}</style></head><body>${sanitizeSignedHtml(contractHtml)}</body></html>`
}

function executablePath(): Promise<string> | string {
  if (process.platform === 'darwin') return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  return chromium.executablePath()
}

function launchArgs(): string[] {
  return process.platform === 'darwin' ? ['--no-sandbox', '--disable-setuid-sandbox'] : chromium.args
}

function safeFilename(slug: string): string {
  return `${slug.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-')}-signed-contract.pdf`
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const contractSlug = typeof body?.contractSlug === 'string' ? body.contractSlug : ''
  const signedDocumentHtml = typeof body?.signedDocumentHtml === 'string' ? body.signedDocumentHtml : ''

  if (!/^[a-z0-9-]{2,80}$/.test(contractSlug) || !signedDocumentHtml.includes('contract-document')) {
    res.status(400).json({ error: 'A valid signed contract snapshot is required' })
    return
  }
  if (signedDocumentHtml.length > 2_500_000) {
    res.status(413).json({ error: 'Signed contract snapshot is too large' })
    return
  }

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null
  try {
    browser = await puppeteer.launch({
      args: launchArgs(),
      defaultViewport: chromium.defaultViewport,
      executablePath: await executablePath(),
      headless: true,
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      const url = request.url()
      if (url.startsWith('data:') || url.startsWith('https://anchovies.pro/signatures/')) {
        request.continue()
      } else {
        request.abort()
      }
    })
    await page.setContent(documentHtml(signedDocumentHtml), { waitUntil: 'domcontentloaded' })
    await page.evaluate(async () => {
      const images = Array.from(document.images)
      await Promise.race([
        Promise.all(
          images.map(
            (image) =>
              image.complete ||
              new Promise<void>((resolve) => {
                image.addEventListener('load', () => resolve(), { once: true })
                image.addEventListener('error', () => resolve(), { once: true })
              })
          )
        ),
        new Promise<void>((resolve) => window.setTimeout(resolve, 5_000)),
      ])
    })
    const pdf = await page.pdf({
      format: 'letter',
      printBackground: true,
      preferCSSPageSize: true,
    })

    res.setHeader('content-type', 'application/pdf')
    res.setHeader('content-disposition', `attachment; filename="${safeFilename(contractSlug)}"`)
    res.setHeader('cache-control', 'private, no-store')
    res.status(200).send(Buffer.from(pdf))
  } catch (error) {
    console.error('signed-contract-pdf', error)
    res.status(500).json({ error: 'Could not generate the signed PDF' })
  } finally {
    await browser?.close()
  }
}
