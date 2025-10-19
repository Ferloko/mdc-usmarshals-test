// Vercel Serverless Function adapter that mounts the Express API
// from server/server.js so all /api routes are handled locally.
// This normalizes the incoming path to ensure '/api' prefix exists,
// matching the routes defined in server/server.js.

const apiApp = require('../server/server.js')

module.exports = async (req, res) => {
  try {
    // Set CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    // Debug logging
    console.log('🔍 API Request:', {
      method: req.method,
      url: req.url,
      originalUrl: req.originalUrl,
      path: req.path
    })

    // If the incoming URL doesn't start with '/api', prefix it so Express
    // routes like '/api/fichas' match regardless of how Vercel forwarded it.
    if (req.url && !req.url.startsWith('/api')) {
      const newUrl = req.url.startsWith('/') ? `/api${req.url}` : `/api/${req.url}`
      console.log('🔄 URL transformed:', req.url, '->', newUrl)
      req.url = newUrl
    }

    // Set Vercel environment variable so the server knows it's running on Vercel
    process.env.VERCEL = '1'
    
    return apiApp(req, res)
  } catch (err) {
    console.error('❌ API adapter error:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, message: 'API adapter error', error: String(err && err.message || err) }))
  }
}
