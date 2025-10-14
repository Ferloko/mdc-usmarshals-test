import { config } from './config'

const base = config.apiBase

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${base}${path}`
  const headers = {
    ...(options.headers || {}),
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
  }
  const res = await fetch(url, { ...options, headers })
  const ct = res.headers.get('content-type') || ''
  const isJson = ct.includes('application/json')
  const body = isJson ? await res.json() : await res.text()
  if (!res.ok) {
    const msg = typeof body === 'string' ? body : body?.message || `HTTP ${res.status}`
    throw new Error(msg)
  }
  return body
}

const get = (p) => request(p)
const post = (p, d) => request(p, { method: 'POST', body: JSON.stringify(d) })
const put = (p, d) => request(p, { method: 'PUT', body: JSON.stringify(d) })
const del = (p) => request(p, { method: 'DELETE' })

export const api = {
  fichas: {
    list: () => get('/fichas'),
    create: (data) => post('/fichas', data),
  },
  cargos: {
    list: () => get('/cargos'),
  },
  arrestos: {
    create: (data) => post('/arrestos', data),
    byIdentificacion: (id) => get(`/arrestos/buscar/${id}`),
  },
  byc: {
    create: (data) => post('/byc', data),
    byIdentificacion: (id) => get(`/byc/persona/${id}`),
    update: (id, data) => put(`/byc/${id}`, data),
  },
  bolos: {
    create: (data) => post('/bolos', data),
    activos: () => get('/bolos/activos'),
  },
  anotaciones: {
    create: (data) => post('/anotaciones', data),
    update: (id, data) => put(`/anotaciones/${id}`, data),
    remove: (id) => del(`/anotaciones/${id}`),
    byIdentificacion: (id) => get(`/anotaciones/persona/${id}`),
  },
  admin: {
    db: {
      status: () => get('/admin/db/status'),
      start: () => post('/admin/db/start', {}),
      stop: () => post('/admin/db/stop', {}),
      restart: () => post('/admin/db/restart', {}),
      reload: () => post('/admin/db/reload', {}),
    }
  }
}