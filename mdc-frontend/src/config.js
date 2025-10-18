export const config = {
  environment: import.meta.env.MODE === 'production' ? 'production' : 'development',
  api: {
    development: '/api', // via Vite proxy
    production: '/api', // use same-origin in prod; Vercel rewrite proxies to backend
  },
  get apiBase() {
    return this.api[this.environment]
  },
}
