// Specific API route for fichas endpoint
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
    console.log('🔍 Fichas API Request:', {
      method: req.method,
      url: req.url,
      originalUrl: req.originalUrl
    })

    // Set the URL to the fichas endpoint
    req.url = '/api/fichas'
    
    // Set Vercel environment variable
    process.env.VERCEL = '1'
    
    return apiApp(req, res)
  } catch (err) {
    console.error('❌ Fichas API error:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, message: 'Fichas API error', error: String(err && err.message || err) }))
  }
}