export const config = {
  environment: import.meta.env.MODE === 'production' ? 'production' : 'development',
  api: {
    development: '/api', // via Vite proxy
    production: 'https://tu-backend.onrender.com/api',
  },
  get apiBase() {
    return this.api[this.environment]
  },
}
