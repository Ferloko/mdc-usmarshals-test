// Vercel Serverless Function adapter that mounts the Express API
// from server/server.js so all /api routes are handled locally.
// This normalizes the incoming path to ensure '/api' prefix exists,
// matching the routes defined in server/server.js.

const apiApp = require('../server/server.js')

module.exports = (req, res) => {
  try {
    // If the incoming URL doesn't start with '/api', prefix it so Express
    // routes like '/api/fichas' match regardless of how Vercel forwarded it.
    if (req.url && !req.url.startsWith('/api')) {
      req.url = req.url.startsWith('/') ? `/api${req.url}` : `/api/${req.url}`
    }
    return apiApp(req, res)
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, message: 'API adapter error', error: String(err && err.message || err) }))
  }
}
