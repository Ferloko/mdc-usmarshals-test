// Vercel Serverless Function adapter that mounts the Express API
// from server/server.js so all /api routes are handled locally.
// This wrapper mounts the app on both root and /api to handle either
// Vercel path forwarding style.

const express = require('express')
const apiApp = require('../server/server.js')

// Create a wrapper app that mounts the exported Express app under both
// root and '/api'. This avoids 404/405 if the path is trimmed or includes '/api'.
const wrapper = express()
wrapper.use(apiApp)       // handles '/api/*' as defined in server/server.js
wrapper.use('/api', apiApp) // handles if Vercel trims the '/api' prefix

module.exports = wrapper
