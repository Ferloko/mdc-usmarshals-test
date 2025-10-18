export const config = {
  environment: import.meta.env.MODE === 'production' ? 'production' : 'development',
  api: {
    development: '/api', // via Vite proxy
    // In production prefer explicit backend base via env; fallback to /api if not provided
    production: import.meta.env.VITE_API_BASE || '/api',
  },
  get apiBase() {
    return this.api[this.environment]
  },
}
