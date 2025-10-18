export const config = {
  environment: import.meta.env.MODE === 'production' ? 'production' : 'development',
  api: {
    development: '/api', // via Vite proxy
    production: 'https://mdc-usmarshals-test-94pmq13pd-ferlokos-projects.vercel.app/api',
  },
  get apiBase() {
    return this.api[this.environment]
  },
}
