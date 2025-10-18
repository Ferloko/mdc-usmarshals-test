// Vercel Serverless Function to proxy all /api/* requests to the backend
// Configure a stable backend base via env BACKEND_BASE, e.g.
// BACKEND_BASE=https://mdc-usmarshals-api.vercel.app/api

const DEFAULT_BACKEND_BASE = 'https://mdc-usmarshals-test-r5hgkcnki-ferlokos-projects.vercel.app/api'

module.exports = async (req, res) => {
  try {
    const backendBase = process.env.BACKEND_BASE || DEFAULT_BACKEND_BASE

    // Extract path and query after '/api'
    const originalUrl = req.url || ''
    const idx = originalUrl.indexOf('/api')
    const suffix = idx >= 0 ? originalUrl.substring(idx + 4) : originalUrl
    const targetUrl = backendBase.replace(/\/$/, '') + suffix

    // Clone headers excluding hop-by-hop and host related headers
    const incomingHeaders = req.headers || {}
    const forwardHeaders = {}
    for (const [k, v] of Object.entries(incomingHeaders)) {
      const key = k.toLowerCase()
      if (
        key === 'host' ||
        key === 'content-length' ||
        key === 'accept-encoding' ||
        key === 'connection' ||
        key === 'cf-connecting-ip' ||
        key === 'x-real-ip'
      ) continue
      forwardHeaders[key] = v
    }

    // Prepare fetch options
    const method = (req.method || 'GET').toUpperCase()
    let body
    if (method !== 'GET' && method !== 'HEAD') {
      // Read raw body from request
      body = await new Promise((resolve, reject) => {
        const chunks = []
        req.on('data', (c) => chunks.push(c))
        req.on('end', () => resolve(Buffer.concat(chunks)))
        req.on('error', reject)
      })
    }

    const resp = await fetch(targetUrl, {
      method,
      headers: forwardHeaders,
      body: body && body.length ? body : undefined,
    })

    // Forward status and headers
    res.status(resp.status)
    // Copy selected headers to avoid duplicates or restricted ones
    resp.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'content-length') return
      res.setHeader(key, value)
    })

    const buf = Buffer.from(await resp.arrayBuffer())
    res.send(buf)
  } catch (err) {
    res.status(502).json({ success: false, message: 'Proxy error', error: String(err && err.message || err) })
  }
}
