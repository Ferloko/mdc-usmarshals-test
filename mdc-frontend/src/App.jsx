import { useEffect, useMemo, useState } from 'react'
import './index.css'


function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = useMemo(() => {
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }, [now])
  const date = useMemo(() => {
    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const yyyy = now.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  }, [now])
  return { time, date }
}

function clsx(...args) {
  return args.filter(Boolean).join(' ')
}

// Icono bicolor (duotone) en blanco
function Icon({ name, size = 20, className = '' }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: 'text-white ' + className }
  switch (name) {
    case 'start':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-windows" viewBox="0 0 16 16">
          <path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z" />
        </svg>
      )
    case 'ficha-add':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.616 21q-.691 0-1.153-.462T5 19.385V4.615q0-.69.463-1.152T6.616 3H14.5L19 7.5v3.404q-.498.067-.93.304t-.8.604l-6 5.975V21zm7.038 0v-2.21l5.333-5.307q.148-.13.307-.19q.16-.062.32-.062q.165 0 .334.064q.17.065.298.194l.925.944q.123.148.188.308q.064.159.064.319t-.061.322t-.19.31L15.863 21zm5.96-4.985l.925-.956l-.925-.943l-.95.95zM14 8h4l-4-4l4 4l-4-4z" /></svg>
      )
    case 'search':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.504 19.308q1.18 0 1.992-.816q.812-.815.812-1.996t-.816-1.992t-1.996-.812t-1.992.816t-.812 1.996t.816 1.992t1.996.812m5.451 2.646q-.139.14-.354.14t-.355-.14l-2.423-2.443q-.487.389-1.08.593t-1.243.204q-1.586 0-2.697-1.111t-1.11-2.697t1.11-2.697t2.697-1.11t2.697 1.11t1.11 2.697q0 .65-.203 1.243t-.593 1.08l2.443 2.423q.14.139.14.353q0 .215-.139.355M5.615 21q-.69 0-1.152-.462T4 19.385V4.615q0-.69.463-1.152T5.616 3h7.213q.331 0 .632.13t.518.349L17.52 7.02q.217.218.348.518t.131.632v1.431q0 .354-.266.59q-.267.237-.64.17l-.296-.036q-.144-.018-.298-.018q-2.758 0-4.48 1.894t-1.724 4.323q0 .87.253 1.752q.253.883.828 1.698q.235.337.078.68q-.157.345-.534.345zM13 4v3.2q0 .34.23.57t.57.23H17zl4 4z" /></svg>
      )
    case 'arrest':
      return (
        <svg {...props}>
          <path d="M12 3c2 2 5 2 7 2v6c0 5.25-3.5 8.5-7 10-3.5-1.5-7-4.75-7-10V5c2 0 5 0 7-2z" fill="currentColor" opacity=".28" />
          <path d="M12 8l1.76 3.57 3.94.57-2.85 2.78.67 3.92L12 17l-3.52 1.84.67-3.92-2.85-2.78 3.94-.57L12 8z" fill="currentColor" />
        </svg>
      )
    case 'book':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.885 9.592v-.93q.806-.408 1.726-.612t1.889-.204q.554 0 1.064.071q.509.072 1.052.202v.908q-.524-.167-1.02-.232q-.498-.064-1.096-.064q-.97 0-1.892.218q-.924.218-1.724.643m0 5.462v-.97q.768-.407 1.717-.611t1.899-.204q.554 0 1.064.072q.509.07 1.052.201v.908q-.524-.167-1.02-.232q-.498-.064-1.096-.064q-.97 0-1.892.235q-.924.234-1.724.665m0-2.712v-.969q.806-.408 1.726-.611t1.89-.204q.554 0 1.063.07q.51.072 1.052.203v.908q-.523-.168-1.02-.232q-.497-.065-1.095-.065q-.97 0-1.892.238q-.924.237-1.724.662M12.5 17.32q1.216-.678 2.453-.98t2.547-.3q.9 0 1.618.111t1.267.296q.23.096.423-.029t.192-.394V7.008q0-.173-.096-.308q-.096-.134-.327-.23q-.825-.293-1.501-.4T17.5 5.961q-1.31 0-2.613.386q-1.304.387-2.387 1.16zm-.5 1.45q-1.22-.834-2.62-1.282T6.5 17.04q-.78 0-1.534.13q-.753.131-1.466.42q-.544.217-1.022-.131T2 16.496V6.831q0-.371.195-.689t.547-.442q.887-.383 1.836-.56T6.5 4.962q1.47 0 2.866.423q1.398.423 2.634 1.23q1.237-.807 2.634-1.23t2.866-.423q.973 0 1.922.178q.95.177 1.836.56q.352.125.547.442t.195.689v9.665q0 .614-.516.943q-.517.328-1.1.111q-.693-.27-1.418-.39q-.724-.121-1.466-.121q-1.48 0-2.88.448T12 18.769" /></svg>
      )
    case 'compass':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
      )
    case 'megaphone':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
  <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
  <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
</svg>
      )
    case 'chart':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" opacity=".2" />
          <path d="M8 17v-6M12 17v-9M16 17v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...props}>
          <path d="M12 3a5 5 0 0 0-5 5v3.5c0 .7-.28 1.37-.78 1.87L5 15h14l-1.22-1.63a2.65 2.65 0 0 1-.78-1.87V8a5 5 0 0 0-5-5z" fill="currentColor" opacity=".28" />
          <path d="M9 18a3 3 0 0 0 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" fill="currentColor" opacity=".28" />
          <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'id-card':
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" opacity=".28" />
          <circle cx="9" cy="12" r="2" fill="currentColor" />
          <path d="M7 16c1.2-2 4.8-2 6 0M14 11h5M14 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'close':
      return (
        <svg {...props}>
          <path fill="currentColor" d="m8.054 16.673l-.727-.727L11.273 12L7.327 8.079l.727-.727L12 11.298l3.921-3.946l.727.727L12.702 12l3.946 3.946l-.727.727L12 12.727z"/>
        </svg>
      )
    default:
      return null
  }
}

function useNotifications() {
  const [items, setItems] = useState([])
  const push = (title, message, type = 'info', duration = 5000) => {
    const id = crypto.randomUUID()
    setItems((prev) => [...prev, { id, title, message, type }])
    if (duration > 0) {
      setTimeout(() => {
        setItems((prev) => prev.filter((n) => n.id !== id))
      }, duration)
    }
  }
  const remove = (id) => setItems((prev) => prev.filter((n) => n.id !== id))
  return { items, push, remove }
}

// Servicios mínimos (usa proxy /api → http://localhost:3000 en vite.config.js)

// Registro de eventos (logs) persistente en localStorage
function useLogs() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mdc.logs') || '[]') } catch { return [] }
  })
  useEffect(() => {
    try { localStorage.setItem('mdc.logs', JSON.stringify(items)) } catch { }
  }, [items])
  const add = (tipo, titulo, detalle = '', meta = null) => {
    const entry = { id: crypto.randomUUID(), ts: Date.now(), tipo, titulo, detalle, meta }
    setItems((prev) => [entry, ...prev].slice(0, 1000))
  }
  const clear = () => setItems([])
  const remove = (id) => setItems((prev) => prev.filter((e) => e.id !== id))
  return { items, add, clear, remove }
}

import { api } from './services'


function App() {
  const { time, date } = useClock()
  const notifications = useNotifications()
  const logs = useLogs()
  const [dashboardOpen, setDashboardOpen] = useState(false)

  // Estado de paneles/modales
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [searchPanelOpen, setSearchPanelOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [govOpen, setGovOpen] = useState(false)
  const [arrestOpen, setArrestOpen] = useState(false)
  const [bycOpen, setBycOpen] = useState(false)
  const [boloOpen, setBoloOpen] = useState(false)
  const [anotacionOpen, setAnotacionOpen] = useState(false)
  const [bolosActivosOpen, setBolosActivosOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [codigoOpen, setCodigoOpen] = useState(false)
  const [arrestDetail, setArrestDetail] = useState(null)
  const [bycDetail, setBycDetail] = useState(null)
  const [anotDetail, setAnotDetail] = useState(null)

  // Datos
  const [fichas, setFichas] = useState([])
  const [bolosActivos, setBolosActivos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Cargar datos iniciales (fichas/bolos) – requiere proxy /api
    api.fichas.list()
      .then((r) => {
        if (r?.success) setFichas(r.data)
      })
      .catch(() => {
        // Modo offline de ejemplo
        setFichas([
          { _id: '1', nombre: 'Juan', apellido: 'Pérez', identificacion: '12345678' },
          { _id: '2', nombre: 'María', apellido: 'González', identificacion: '87654321' },
          { _id: '3', nombre: 'Carlos', apellido: 'Rodríguez', identificacion: '11223344' },
        ])
        notifications.push('Modo offline', 'Usando datos locales de ejemplo.', 'warning', 4000)
      })

    api.bolos.activos()
      .then((r) => {
        if (r?.success) setBolosActivos(r.data)
      })
      .catch(() => setBolosActivos([]))
    // Mensaje de bienvenida
    const t = setTimeout(() => notifications.push('Sistema iniciado', 'Bienvenido al MDC U.S. Marshals Service', 'info', 3000), 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // ESC para cerrar paneles
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setStartMenuOpen(false)
        setSearchPanelOpen(false)
        setNotificationsOpen(false)
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        setSearchPanelOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filteredFichas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return fichas
      .filter((f) =>
        `${f.nombre} ${f.apellido} ${f.identificacion}`.toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [searchQuery, fichas])

  return (
    <div className="min-h-screen bg-[#0b3eb8] text-white">
      {/* Fondo "escritorio" */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Logo central */}
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center">
          <div className="opacity-20">
            <div className="w-48 h-48 rounded-full bg-slate-800/50 border border-slate-700/50 grid place-items-center text-slate-300 text-center text-sm p-4">
              <div className="text-xs mt-1 opacity-100"><img src="Logo_USMS.png" alt="MDC U.S. Marshals Service" /></div>
            </div>
          </div>
        </div>

        {/* Menú inicio */}
        <StartMenu open={startMenuOpen} onClose={() => setStartMenuOpen(false)} onAction={(action) => {
          if (action === 'crear-ficha') setGovOpen(true)
          if (action === 'buscar-ficha') setSearchPanelOpen(true)
          if (action === 'reporte-arresto') setArrestOpen(true)
          if (action === 'crear-byc') setBycOpen(true)
          if (action === 'crear-bolo') setBoloOpen(true)
          if (action === 'crear-anotacion') setAnotacionOpen(true)
          if (action === 'ver-bolos') setBolosActivosOpen(true)
          if (action === 'codigo-penal') setCodigoOpen(true)
        }} />

        {/* Panel de búsqueda */}
        <SearchPanel
          open={searchPanelOpen}
          onClose={() => setSearchPanelOpen(false)}
          fichas={fichas}
          onPickFicha={(f) => { setProfile(f); setProfileOpen(true); }}
        />

        {/* Notificaciones */}
        <NotificationsPanel
          open={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
          items={notifications.items}
          onRemove={notifications.remove}
        />

        {/* Formulario: Reporte de arresto */}
        <ArrestForm
          open={arrestOpen}
          fichas={fichas}
          onClose={() => setArrestOpen(false)}
          onResult={(type, title, message) => { notifications.push(title, message, type); setNotificationsOpen(true); }}
          onCreated={(data) => { logs.add('arresto', 'Reporte de arresto creado', `ID: ${data?._id || ''} · ${data?.nombre || ''} ${data?.apellido || ''}`, data); setNotificationsOpen(true); setArrestOpen(false) }}
        />

        {/* Formulario: ByC */}
        <ByCForm
          open={bycOpen}
          fichas={fichas}
          onClose={() => setBycOpen(false)}
          onResult={(type, title, message) => { notifications.push(title, message, type); setNotificationsOpen(true); }}
          onCreated={(data) => { logs.add('byc', 'BYC creado', `ID: ${data?._id || ''} · ${data?.nombreCompleto || ''} · Estado: ${data?.estado || ''}`, data); setNotificationsOpen(true); setBycOpen(false) }}
        />

        {/* Formulario: BOLO */}
        <BoloForm
          open={boloOpen}
          onClose={() => setBoloOpen(false)}
          onResult={(type, title, message) => { notifications.push(title, message, type); setNotificationsOpen(true); }}
          onCreated={(data) => { logs.add('bolo', 'BOLO creado', `${data?.tipo || ''} · ${data?.ubicacion || ''} · ${data?.oficialNombre || ''}`, data); setNotificationsOpen(true); setBoloOpen(false) }}
        />

        {/* Formulario: Ficha Gubernamental */}
        <GovernmentForm
          open={govOpen}
          onClose={() => setGovOpen(false)}
          onResult={(type, title, message) => { notifications.push(title, message, type); setNotificationsOpen(true); }}
          onCreated={(ficha) => {
            logs.add('ficha', 'Ficha creada', `Nombre: ${ficha?.nombre} ${ficha?.apellido} · ID: ${ficha?.identificacion}`, ficha)
            setNotificationsOpen(true)
            // refrescar fichas para autocompletar rápido
            setFichas((prev) => [{ _id: ficha._id, nombre: ficha.nombre, apellido: ficha.apellido, identificacion: ficha.identificacion }, ...prev])
          }}
        />

        {/* Formulario: Anotación */}
        <AnotacionForm
          open={anotacionOpen}
          onClose={() => setAnotacionOpen(false)}
          onResult={(type, title, message) => { notifications.push(title, message, type); setNotificationsOpen(true); }}
          onCreated={(data) => { logs.add('anotacion', 'Anotación creada', `${data?.titulo || ''} · ${data?.categoria || ''} · Oficial: ${data?.oficialNombre || ''}`, data); setNotificationsOpen(true); setAnotacionOpen(false) }}
        />

        {/* BOLOs Activos */}
        <BoloActivosModal
          open={bolosActivosOpen}
          onClose={() => setBolosActivosOpen(false)}
          onResult={(type, title, message) => { notifications.push(title, message, type); setNotificationsOpen(true); }}
        />

        {/* Perfil */}
        <ProfileModal
          open={profileOpen}
          ficha={profile}
          onClose={() => setProfileOpen(false)}
          onNewArrest={() => setArrestOpen(true)}
          onNewByC={() => setBycOpen(true)}
          onNewAnotacion={() => setAnotacionOpen(true)}
          onViewArrest={(a) => setArrestDetail(a)}
          onViewByC={(b) => setBycDetail(b)}
          onViewAnotacion={(n) => setAnotDetail(n)}
        />

        {/* Código Penal */}
        <CodigoPenalModal
          open={codigoOpen}
          onClose={() => setCodigoOpen(false)}
          onResult={(type, title, message) => { notifications.push(title, message, type); setNotificationsOpen(true); }}
        />

        {/* Dashboard de logs */}
        <DashboardModal open={dashboardOpen} items={logs.items} onClose={() => setDashboardOpen(false)} onClear={logs.clear} onAction={async (action) => {
          try {
            let r
            if (action === 'status') r = await api.admin.db.status()
            if (action === 'start') r = await api.admin.db.start()
            if (action === 'stop') r = await api.admin.db.stop()
            if (action === 'restart') r = await api.admin.db.restart()
            if (action === 'reload') r = await api.admin.db.reload()
            const msg = typeof r === 'object' ? JSON.stringify(r) : String(r)
            logs.add('admin', `DB ${action}`, msg)
            notifications.push('DB ' + action, msg, 'info', 4000)
            setNotificationsOpen(true)
          } catch (e) {
            const err = e?.message || String(e)
            logs.add('admin', `DB ${action} - error`, err)
            notifications.push('DB ' + action, err, 'error', 6000)
            setNotificationsOpen(true)
          }
        }} />

        {/* Modales de detalle */}
        <ArrestReportModal open={!!arrestDetail} data={arrestDetail} onClose={() => setArrestDetail(null)} />
        <ByCReportModal open={!!bycDetail} data={bycDetail} onClose={() => setBycDetail(null)} />
        <AnotacionDetailModal open={!!anotDetail} data={anotDetail} onClose={() => setAnotDetail(null)} />

        {/* Barra inferior */}
        <Toolbar
          onOpenStart={() => setStartMenuOpen((v) => !v)}
          onOpenCrearFicha={() => setGovOpen(true)}
          onOpenSearch={() => setSearchPanelOpen(true)}
          onOpenArresto={() => setArrestOpen(true)}
          onOpenCodigo={() => setCodigoOpen(true)}
          onOpenByC={() => setBycOpen(true)}
          onOpenVerBolos={() => setBolosActivosOpen(true)}
          onOpenCrearBolo={() => setBoloOpen(true)}
          onOpenDashboard={() => setDashboardOpen(true)}
          onOpenNotifications={() => setNotificationsOpen((v) => !v)}
          time={time}
          date={date}
        />
      </div>
    </div>
  )
}

function Toolbar({ onOpenStart, onOpenCrearFicha, onOpenSearch, onOpenArresto, onOpenCodigo, onOpenByC, onOpenVerBolos, onOpenCrearBolo, onOpenDashboard, onOpenNotifications, time, date }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/90 border-t border-black flex items-center justify-between px-2">
      <div className="flex items-center gap-1">
        <button className="toolbar-btn" title="Inicio" onClick={onOpenStart}><Icon name="start" /></button>
        <button className="toolbar-btn" title="Crear ficha" onClick={onOpenCrearFicha}><Icon name="ficha-add" /></button>
        <button className="toolbar-btn" title="Buscar ficha" onClick={onOpenSearch}><Icon name="search" /></button>
        <button className="toolbar-btn" title="Crear reporte de arresto" onClick={onOpenArresto}><Icon name="arrest" /></button>
        <button className="toolbar-btn" title="Código Penal" onClick={onOpenCodigo}><Icon name="book" /></button>
        <button className="toolbar-btn" title="Crear ByC" onClick={onOpenByC}><Icon name="search" /></button>
        <button className="toolbar-btn" title="Ver BOLOs" onClick={onOpenVerBolos}><Icon name="compass" /></button>
        <button className="toolbar-btn" title="Crear BOLO" onClick={onOpenCrearBolo}><Icon name="megaphone" /></button>
      </div>
      <div className="flex items-center gap-2">
        <button className="toolbar-btn" title="Dashboard" onClick={onOpenDashboard}><Icon name="chart" /></button>
        <button className="toolbar-btn" title="Notificaciones" onClick={onOpenNotifications}><Icon name="bell" /></button>
        <div className="text-right leading-tight text-sm">
          <div className="opacity-90">{date}</div>
          <div className="font-semibold">{time}</div>
        </div>
      </div>
      <style>{`
        .toolbar-btn { height: 2.5rem; width: 2.5rem; display: grid; place-items: center; border-radius: 0.25rem; color: #ffffff; transition: transform 150ms ease, background-color 150ms ease; }
        .toolbar-btn:hover { background-color: rgba(255, 255, 255, 0.12); }
        .toolbar-btn:active { transform: scale(0.95); }
      `}</style>
    </div>
  )
}

function StartMenu({ open, onClose, onAction }) {
  return (
    <div className={clsx(
      'absolute left-2 bottom-16 w-[760px] max-w-[95vw] rounded-xl bg-slate-900/90 backdrop-blur border border-slate-800 shadow-2xl overflow-hidden transition-all',
      open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
    )}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800">
        <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar">≡</button>
        <div className="flex items-center gap-2 text-slate-200">
          <span>🏠</span>
          <span className="font-medium">Inicio</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div>
          <h4 className="text-slate-300 mb-2">Más usados</h4>
          <div className="space-y-2">
            <MenuItemLarge icon="ficha-add" text="Añadir ficha gubernamental" onClick={() => onAction('crear-ficha')} />
            <MenuItemLarge icon="search" text="Buscar ficha gubernamental" onClick={() => onAction('buscar-ficha')} />
            <MenuItemLarge icon="arrest" text="Crear reporte de arresto" onClick={() => onAction('reporte-arresto')} />
            <MenuItemLarge icon="search" text="Crear ByC" onClick={() => onAction('crear-byc')} />
            <MenuItemLarge icon="megaphone" text="Crear BOLO" onClick={() => onAction('crear-bolo')} />
            <MenuItemLarge icon="ficha-add" text="Crear anotación" onClick={() => onAction('crear-anotacion')} />
            <MenuItemLarge icon="compass" text="Ver BOLOs Activos" onClick={() => onAction('ver-bolos')} />
            <MenuItemLarge icon="book" text="Código Penal" onClick={() => onAction('codigo-penal')} />
          </div>
        </div>
        <div>
          <h4 className="text-slate-300 mb-2">Accesos directos</h4>
          <div className="text-sm text-slate-400">(Configurar a medida)</div>
        </div>
      </div>
    </div>
  )
}

function MenuItemLarge({ icon, text, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-3 rounded border border-slate-800 bg-slate-800/40 hover:bg-slate-800/70 transition">
      <div className="h-10 w-10 grid place-items-center rounded bg-slate-700/60 text-white"><Icon name={icon} /></div>
      <span className="text-left">{text}</span>
    </button>
  )
}

function SearchPanel({ open, onClose, fichas, onPickFicha }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [active, setActive] = useState(null) // 'nombre' | 'apellido' | 'ident'

  useEffect(() => {
    if (!open) {
      setNombre('')
      setApellido('')
      setIdentificacion('')
      setActive(null)
    }
  }, [open])

  const sugNombre = useMemo(() => {
    const n = nombre.trim().toLowerCase()
    if (!n) return []
    return (fichas || [])
      .filter((f) => `${f.nombre} ${f.apellido}`.toLowerCase().includes(n))
      .slice(0, 6)
  }, [nombre, fichas])

  const sugApellido = useMemo(() => {
    const a = apellido.trim().toLowerCase()
    if (!a) return []
    return (fichas || [])
      .filter((f) => String(f.apellido || '').toLowerCase().includes(a))
      .slice(0, 6)
  }, [apellido, fichas])

  const sugIdent = useMemo(() => {
    const id = identificacion.trim().toLowerCase()
    if (!id) return []
    return (fichas || [])
      .filter((f) => String(f.identificacion || '').toLowerCase().includes(id))
      .slice(0, 6)
  }, [identificacion, fichas])

  function fillFromFicha(f) {
    setNombre(f.nombre || '')
    setApellido(f.apellido || '')
    setIdentificacion(f.identificacion || '')
    setActive(null)
  }

  function buscar(e) {
    if (e) e.preventDefault()
    setActive(null)
    const id = identificacion.trim().toLowerCase()
    const n = nombre.trim().toLowerCase()
    const a = apellido.trim().toLowerCase()
    let matches = (fichas || [])
    if (id) {
      matches = matches.filter((f) => String(f.identificacion || '').toLowerCase().includes(id))
    } else if (n || a) {
      matches = matches.filter((f) => {
        const fn = String(f.nombre || '').toLowerCase()
        const fa = String(f.apellido || '').toLowerCase()
        const mn = n ? fn.includes(n) : true
        const ma = a ? fa.includes(a) : true
        return mn && ma
      })
    } else {
      matches = []
    }
    if (matches.length === 1) {
      onPickFicha?.(matches[0])
      onClose?.()
    }
  }

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[760px] max-w-[95vw] rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-slate-800">
          <h3 className="font-semibold">Busca una ficha gubernamental</h3>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <div className="px-6 py-5 border-b border-slate-800 text-center text-sm text-slate-300">
          Busca una ficha gubernamental eligiendo cualquiera de las 3 opciones de búsqueda
        </div>
        <form onSubmit={buscar} className="p-6 space-y-3">
          {/* Nombre */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-90 text-white"><Icon name="user" size={16} /></span>
            <input
              className="w-full bg-slate-800/60 border border-slate-700 rounded pl-9 pr-3 py-2 outline-none focus:border-slate-500"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onFocus={() => setActive('nombre')}
            />
            {active === 'nombre' && nombre.trim() && sugNombre.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded border border-slate-700 bg-slate-900 max-h-48 overflow-auto">
                {sugNombre.map((f) => (
                  <button type="button" key={f._id || f.identificacion} onClick={() => fillFromFicha(f)} className="w-full text-left px-3 py-2 hover:bg-slate-800">
                    <div className="font-medium">{f.nombre} {f.apellido}</div>
                    <div className="text-xs text-slate-400">ID: {f.identificacion}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Apellido */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-90 text-white"><Icon name="user" size={16} /></span>
            <input
              className="w-full bg-slate-800/60 border border-slate-700 rounded pl-9 pr-3 py-2 outline-none focus:border-slate-500"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              onFocus={() => setActive('apellido')}
            />
            {active === 'apellido' && apellido.trim() && sugApellido.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded border border-slate-700 bg-slate-900 max-h-48 overflow-auto">
                {sugApellido.map((f) => (
                  <button type="button" key={f._id || f.identificacion} onClick={() => fillFromFicha(f)} className="w-full text-left px-3 py-2 hover:bg-slate-800">
                    <div className="font-medium">{f.nombre} {f.apellido}</div>
                    <div className="text-xs text-slate-400">ID: {f.identificacion}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Identificación */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-90 text-white"><Icon name="id-card" size={16} /></span>
            <input
              className="w-full bg-slate-800/60 border border-slate-700 rounded pl-9 pr-3 py-2 outline-none focus:border-slate-500"
              placeholder="Identificación"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              onFocus={() => setActive('ident')}
            />
            {active === 'ident' && identificacion.trim() && sugIdent.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded border border-slate-700 bg-slate-900 max-h-48 overflow-auto">
                {sugIdent.map((f) => (
                  <button type="button" key={f._id || f.identificacion} onClick={() => fillFromFicha(f)} className="w-full text-left px-3 py-2 hover:bg-slate-800">
                    <div className="font-medium">{f.nombre} {f.apellido}</div>
                    <div className="text-xs text-slate-400">ID: {f.identificacion}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="w-full h-10 rounded bg-amber-400 text-black font-medium hover:bg-amber-300">
            Buscar
          </button>
        </form>
      </div>
    </div>
  )
}

function SearchItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded bg-slate-800/40 border border-slate-800">
      <div className="h-8 w-8 grid place-items-center rounded bg-slate-700/60">{icon}</div>
      <span>{text}</span>
    </div>
  )
}

function NotificationsPanel({ open, onClose, items, onRemove }) {
  return (
    <div className={clsx(
      'absolute top-6 right-6 w-[360px] max-w-[90vw] rounded-xl bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden transition-all',
      open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
    )}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <h3 className="font-medium">Notificaciones</h3>
        <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
      </div>
      <div className="max-h-96 overflow-y-auto p-2 space-y-2">
        {items.length === 0 && (
          <div className="text-sm text-slate-400 p-3">No hay notificaciones</div>
        )}
        {items.map((n) => (
          <div key={n.id} className={clsx(
            'p-3 rounded border',
            n.type === 'success' && 'bg-emerald-900/30 border-emerald-800',
            n.type === 'error' && 'bg-rose-900/30 border-rose-800',
            n.type === 'warning' && 'bg-amber-900/30 border-amber-800',
            (!['success', 'error', 'warning'].includes(n.type)) && 'bg-slate-800/40 border-slate-800'
          )}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-sm opacity-90 whitespace-pre-line">{n.message}</div>
              </div>
              <button className="h-7 w-7 grid place-items-center rounded hover:bg-slate-800/60" onClick={() => onRemove(n.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GovernmentForm({ open, onClose, onResult, onCreated }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    identificacion: '',
    telefono: '',
    edad: '',
    genero: '',
    residencia: '',
    raza: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) {
      setForm({ nombre: '', apellido: '', identificacion: '', telefono: '', edad: '', genero: '', residencia: '', raza: '' })
    }
  }, [open])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    // Validaciones mínimas
    if (!form.nombre || !form.apellido || !form.identificacion || !form.telefono || !form.edad || !form.genero || !form.residencia || !form.raza) {
      onResult?.('warning', 'Validación requerida', 'Completa todos los campos obligatorios.')
      return
    }

    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      identificacion: form.identificacion.trim(),
      telefono: form.telefono.trim(),
      edad: parseInt(form.edad, 10),
      genero: form.genero,
      residencia: form.residencia.trim(),
      raza: form.raza,
    }

    try {
      setSubmitting(true)
      const res = await api.fichas.create(payload)
      setSubmitting(false)
      if (res?.success) {
        onResult?.('success', 'Ficha creada', `Nombre: ${payload.nombre} ${payload.apellido}\nIdentificación: ${payload.identificacion}`)
        onCreated?.(res.data)
        setForm({ nombre: '', apellido: '', identificacion: '', telefono: '', edad: '', genero: '', residencia: '', raza: '' })
        onClose?.()
      } else {
        onResult?.('error', 'Error', res?.message || 'Error desconocido del servidor')
      }
    } catch (err) {
      setSubmitting(false)
      onResult?.('error', 'Error de conexión', `${err.message || err}\nVerifica que el backend esté corriendo.`)
    }
  }

  return (
    <div className={clsx(
      'fixed inset-0 z-40 grid place-items-center transition',
      open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    )}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[980px] max-w-[95vw] max-h-[86vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Agregar ficha gubernamental</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-6">
          {/* Información básica */}
          <section>
            <h3 className="text-slate-300 mb-3">Información básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Field label="Nombre" required>
                <Input value={form.nombre} onChange={update('nombre')} placeholder="Nombre" />
              </Field>
              <Field label="Apellido" required>
                <Input value={form.apellido} onChange={update('apellido')} placeholder="Apellido" />
              </Field>
              <Field label="Identificación (Sin #)" required>
                <Input value={form.identificacion} onChange={update('identificacion')} placeholder="Identificación" />
              </Field>
              <Field label="Número de teléfono" required>
                <Input value={form.telefono} onChange={update('telefono')} placeholder="Teléfono" />
              </Field>
            </div>
          </section>

          {/* Información demográfica */}
          <section>
            <h3 className="text-slate-300 mb-3">Información demográfica</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Field label="Edad" required>
                <Input type="number" min={0} max={150} value={form.edad} onChange={update('edad')} placeholder="Edad" />
              </Field>
              <Field label="Género" required>
                <Select value={form.genero} onChange={update('genero')}>
                  <option value="">Selecciona género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </Select>
              </Field>
              <Field label="Residencia" required>
                <Input value={form.residencia} onChange={update('residencia')} placeholder="Residencia" />
              </Field>
              <Field label="Raza" required>
                <Select value={form.raza} onChange={update('raza')}>
                  <option value="">Selecciona raza</option>
                  <option value="caucasico">Caucasico</option>
                  <option value="afroamericano">Afroamericano</option>
                  <option value="asiatico">Asiático</option>
                  <option value="hispano">Hispano</option>
                </Select>
              </Field>
            </div>
          </section>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={submitting} className="px-4 h-10 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50">
              {submitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block text-sm">
      <span className="block mb-1 text-slate-300">{label} {required && <span className="text-rose-400">*</span>}</span>
      {children}
    </label>
  )
}

function Input(props) {
  return <input {...props} className={clsx('w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500', props.className)} />
}

function Select(props) {
  return <select {...props} className={clsx('w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500', props.className)} />
}

function ArrestForm({ open, onClose, onResult, onCreated, fichas }) {
  const [form, setForm] = useState({
    arrestNombre: '',
    arrestIdentificacion: '',
    fechaArresto: '',
    horaArresto: '',
    ubicacionArresto: '',
    callsign: '',
    oficialNombre: '',
    oficialRango: '',
    oficialPlaca: '',
    descripcionIncidente: '',
    soporteEvidencia: '',
    oficial2Nombre: '',
    oficial2Rango: '',
    oficial2Placa: '',
  })
  const [allCargos, setAllCargos] = useState([])
  const [selectedCargos, setSelectedCargos] = useState([])
  const [cargoFilter, setCargoFilter] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [nameMatches, setNameMatches] = useState([])
  const [hasSecondAgent, setHasSecondAgent] = useState(false)

  const MARSHAL_RANKS = [
    'Basic Deputy U.S. Marshal',
    'Deputy U.S. Marshal I',
    'Deputy U.S. Marshal II',
    'Deputy U.S. Marshal III',
    'Deputy U.S. Marshal IV',
    'Supervisory Deputy U.S. Marshal',
    'Chief Deputy U.S. Marshal',
  ]

  useEffect(() => {
    if (!open) {
      setForm({ arrestNombre: '', arrestIdentificacion: '', fechaArresto: '', horaArresto: '', ubicacionArresto: '', callsign: '', oficialNombre: '', oficialRango: '', oficialPlaca: '', descripcionIncidente: '', soporteEvidencia: '', oficial2Nombre: '', oficial2Rango: '', oficial2Placa: '' })
      setSelectedCargos([])
      setCargoFilter('')
      setShowDropdown(false)
      setNameMatches([])
      setHasSecondAgent(false)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    // Prefijar fecha y hora actuales
    const now = new Date()
    const fecha = now.toISOString().split('T')[0]
    const hora = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    setForm((f) => ({ ...f, fechaArresto: fecha, horaArresto: hora }))

    // Cargar cargos
    api.cargos.list()
      .then((r) => {
        if (r?.success) setAllCargos(r.data)
        else setAllCargos([])
      })
      .catch(() => {
        // Fallback simple
        setAllCargos([
          { _id: '1', codigo: 'Art. 1.1', descripcion: 'Exceso de velocidad' },
          { _id: '2', codigo: 'Art. 2.1', descripcion: 'Robo simple' },
          { _id: '3', codigo: 'Art. 4.1', descripcion: 'Homicidio' },
        ])
      })
  }, [open])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Autocomplete de nombre desde fichas
  useEffect(() => {
    const v = form.arrestNombre.trim().toLowerCase()
    if (!v || !fichas?.length) {
      setNameMatches([])
      return
    }
    const m = fichas
      .filter((p) => `${p.nombre} ${p.apellido}`.toLowerCase().includes(v))
      .slice(0, 6)
    setNameMatches(m)
  }, [form.arrestNombre, fichas])

  function pickFicha(f) {
    setForm((prev) => ({
      ...prev,
      arrestNombre: `${f.nombre} ${f.apellido}`.trim(),
      arrestIdentificacion: f.identificacion || '',
    }))
    setNameMatches([])
  }

  // Multi-select de cargos
  const filteredCargos = useMemo(() => {
    const q = cargoFilter.trim().toLowerCase()
    if (!q) return allCargos
    return allCargos.filter((c) =>
      c.codigo.toLowerCase().includes(q) || c.descripcion.toLowerCase().includes(q)
    )
  }, [cargoFilter, allCargos])

  function toggleCargo(cargo) {
    setSelectedCargos((prev) => {
      const exists = prev.some((c) => c._id === cargo._id)
      return exists ? prev.filter((c) => c._id !== cargo._id) : [...prev, cargo]
    })
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.arrestNombre || !form.arrestIdentificacion || !form.fechaArresto || !form.horaArresto || !form.ubicacionArresto || !form.oficialNombre || !form.oficialRango || !form.oficialPlaca || !form.descripcionIncidente) {
      onResult?.('warning', 'Campos requeridos', 'Completa todos los campos obligatorios.')
      return
    }
    if (selectedCargos.length === 0) {
      onResult?.('warning', 'Validación requerida', 'Debes seleccionar al menos un cargo.')
      return
    }
    if (hasSecondAgent && (!form.oficial2Nombre || !form.oficial2Rango || !form.oficial2Placa)) {
      onResult?.('warning', 'Campos requeridos', 'Completa los datos del segundo agente.')
      return
    }

    const parts = form.arrestNombre.trim().split(' ')
    const nombre = parts[0] || ''
    const apellido = parts.slice(1).join(' ') || 'Sin apellido'

    const payload = {
      nombre,
      apellido,
      identificacion: form.arrestIdentificacion,
      edad: 18,
      fechaArresto: form.fechaArresto,
      horaArresto: form.horaArresto,
      ubicacion: form.ubicacionArresto,
      codigoArresto: form.callsign || 'N/A',
      oficialNombre: form.oficialNombre,
      oficialRango: form.oficialRango,
      oficialPlaca: form.oficialPlaca,
      coOficial: hasSecondAgent ? { nombre: form.oficial2Nombre, rango: form.oficial2Rango, placa: form.oficial2Placa } : undefined,
      departamento: 'LSPD',
      cargos: selectedCargos.map((c) => ({ cargoId: c._id, codigo: c.codigo, descripcion: c.descripcion })),
      descripcion: form.descripcionIncidente,
      soporteEvidencia: form.soporteEvidencia || '',
    }

    try {
      const res = await api.arrestos.create(payload)
      if (res?.success) {
        onResult?.('success', 'Reporte de arresto creado', `Arrestado: ${payload.nombre} ${payload.apellido}\nCódigo: ${payload.codigoArresto}`)
        setForm({ arrestNombre: '', arrestIdentificacion: '', fechaArresto: '', horaArresto: '', ubicacionArresto: '', callsign: '', oficialNombre: '', oficialRango: '', oficialPlaca: '', descripcionIncidente: '', soporteEvidencia: '', oficial2Nombre: '', oficial2Rango: '', oficial2Placa: '' })
        setHasSecondAgent(false)
        setSelectedCargos([])
        setCargoFilter('')
        onCreated?.(res.data)
        onClose?.()
      } else {
        onResult?.('error', 'Error', res?.message || 'Error desconocido del servidor')
      }
    } catch (err) {
      onResult?.('error', 'Error de conexión', `${err.message || err}`)
    }
  }

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[1100px] max-w-[98vw] max-h-[90vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Reporte de arresto</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-6">
          {/* Información del arresto */}
          <section>
            <h3 className="text-slate-300 mb-3">Sección de información</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Fecha" required>
                <Input type="date" value={form.fechaArresto} onChange={update('fechaArresto')} />
              </Field>
              <Field label="Tiempo" required>
                <Input type="time" value={form.horaArresto} onChange={update('horaArresto')} />
              </Field>
              <Field label="Callsign">
                <Input value={form.callsign} onChange={update('callsign')} placeholder="2-ADAM-10" />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <Field label="Nombre del oficial" required>
                <Input value={form.oficialNombre} onChange={update('oficialNombre')} placeholder="Nombre completo del oficial" />
              </Field>
              <Field label="Rango" required>
                <Select value={form.oficialRango} onChange={update('oficialRango')}>
                  <option value="">Selecciona rango</option>
                  {MARSHAL_RANKS.map((r) => (<option key={r} value={r}>{r}</option>))}
                </Select>
              </Field>
              <Field label="Placa del oficial" required>
                <div className="flex items-center gap-2">
                  <Input value={form.oficialPlaca} onChange={update('oficialPlaca')} placeholder="#####" />
                  {!hasSecondAgent && (
                    <button type="button" className="px-3 h-10 rounded bg-emerald-600 hover:bg-emerald-500" title="Agregar segundo agente" onClick={() => setHasSecondAgent(true)}>+</button>
                  )}
                </div>
              </Field>
            </div>
            {hasSecondAgent && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <Field label="Segundo agente - Nombre" required>
                  <Input value={form.oficial2Nombre} onChange={update('oficial2Nombre')} placeholder="Nombre del segundo agente" />
                </Field>
                <Field label="Segundo agente - Rango" required>
                  <Select value={form.oficial2Rango} onChange={update('oficial2Rango')}>
                    <option value="">Selecciona rango</option>
                    {MARSHAL_RANKS.map((r) => (<option key={r} value={r}>{r}</option>))}
                  </Select>
                </Field>
                <Field label="Segundo agente - Placa" required>
                  <div className="flex items-center gap-2">
                    <Input value={form.oficial2Placa} onChange={update('oficial2Placa')} placeholder="#####" />
                    <button type="button" className="px-3 h-10 rounded bg-rose-600 hover:bg-rose-500" title="Quitar segundo agente" onClick={() => { setHasSecondAgent(false); setForm((f) => ({ ...f, oficial2Nombre: '', oficial2Rango: '', oficial2Placa: '' })) }}>−</button>
                  </div>
                </Field>
              </div>
            )}
          </section>

          {/* Sección de arrestos */}
          <section>
            <h3 className="text-slate-300 mb-3">Sección de arrestos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Nombre del sospechoso" required>
                <div className="relative">
                  <Input value={form.arrestNombre} onChange={update('arrestNombre')} placeholder="Nombre Apellido" />
                  {nameMatches.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full rounded border border-slate-700 bg-slate-900 max-h-48 overflow-auto">
                      {nameMatches.map((f) => (
                        <button type="button" key={f._id} onClick={() => pickFicha(f)} className="w-full text-left px-3 py-2 hover:bg-slate-800">
                          <div className="font-medium">{f.nombre} {f.apellido}</div>
                          <div className="text-xs text-slate-400">ID: {f.identificacion}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
              <Field label="Identificación del sospechoso (Sin #)" required>
                <Input value={form.arrestIdentificacion} onChange={update('arrestIdentificacion')} />
              </Field>
              <Field label="Cargos" required>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input value={cargoFilter} onChange={(e) => setCargoFilter(e.target.value)} placeholder="Buscar cargo..." onFocus={() => setShowDropdown(true)} />
                    </div>
                    <button type="button" className="px-3 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={() => setShowDropdown((v) => !v)}>
                      {showDropdown ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                  {/* Opciones */}
                  {showDropdown && (
                    <div className="max-h-48 overflow-auto border border-slate-700 rounded">
                      {filteredCargos.length ? filteredCargos.map((c) => {
                        const selected = selectedCargos.some((s) => s._id === c._id)
                        return (
                          <button type="button" key={c._id} onClick={() => toggleCargo(c)} className={clsx('w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800', selected && 'bg-slate-800')}>
                            <span>{c.descripcion}</span>
                            <span className="text-xs text-slate-400">{c.codigo}</span>
                          </button>
                        )
                      }) : (
                        <div className="px-3 py-2 text-sm text-slate-400">No se encontraron cargos</div>
                      )}
                    </div>
                  )}
                  {/* Seleccionados */}
                  <div className="flex flex-wrap gap-2">
                    {selectedCargos.map((c) => (
                      <span key={c._id} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sm">
                        {c.codigo} - {c.descripcion}
                        <button type="button" className="h-6 w-6 grid place-items-center rounded hover:bg-slate-700" onClick={() => toggleCargo(c)}>✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Narrativa de Arresto" required>
                <textarea className="w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500 min-h-32" value={form.descripcionIncidente} onChange={update('descripcionIncidente')} />
              </Field>
            </div>
          </section>

          {/* Evidencias */}
          <section>
            <h3 className="text-slate-300 mb-3">Sección de evidencias</h3>
            <div className="grid grid-cols-1 gap-3">
              <Field label="Ubicación del arresto" required>
                <Input value={form.ubicacionArresto} onChange={update('ubicacionArresto')} placeholder="Mirror Park, Los Santos" />
              </Field>
              <Field label="Soporte de evidencia">
                <textarea className="w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500 min-h-24" value={form.soporteEvidencia} onChange={update('soporteEvidencia')} />
              </Field>
            </div>
          </section>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 h-10 rounded bg-emerald-600 hover:bg-emerald-500">Crear reporte de arresto</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ByCForm({ open, onClose, onResult, onCreated, fichas }) {
  const [form, setForm] = useState({
    nombreCompleto: '',
    identificacion: '',
    descripcionHechos: '',
  })
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (!open) {
      setForm({ nombreCompleto: '', identificacion: '', descripcionHechos: '' })
      setMatches([])
    }
  }, [open])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  useEffect(() => {
    const v = form.nombreCompleto.trim().toLowerCase()
    if (!v || !fichas?.length) {
      setMatches([])
      return
    }
    const m = fichas.filter((p) => `${p.nombre} ${p.apellido}`.toLowerCase().includes(v)).slice(0, 6)
    setMatches(m)
  }, [form.nombreCompleto, fichas])

  function pick(f) {
    setForm({ nombreCompleto: `${f.nombre} ${f.apellido}`.trim(), identificacion: f.identificacion || '', descripcionHechos: form.descripcionHechos })
    setMatches([])
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.nombreCompleto || !form.identificacion || !form.descripcionHechos) {
      onResult?.('warning', 'Campos requeridos', 'Nombre completo, identificación y descripción son obligatorios.')
      return
    }
    const payload = {
      nombreCompleto: form.nombreCompleto.trim(),
      identificacion: form.identificacion.trim(),
      descripcionHechos: form.descripcionHechos.trim(),
      estado: 'Activo',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    try {
      const res = await api.byc.create(payload)
      if (res?.success) {
        onResult?.('success', 'Búsqueda y captura generada', `Sospechoso: ${payload.nombreCompleto}\nID: ${payload.identificacion}`)
        setForm({ nombreCompleto: '', identificacion: '', descripcionHechos: '' })
        onCreated?.(res.data)
        onClose?.()
      } else {
        onResult?.('error', 'Error', res?.message || 'Error desconocido del servidor')
      }
    } catch (err) {
      onResult?.('error', 'Error de conexión', `${err.message || err}`)
    }
  }

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[900px] max-w-[95vw] max-h-[86vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Generar búsqueda y captura</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-6">
          <section>
            <h3 className="text-slate-300 mb-3">Sospechoso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Nombre Apellido" required>
                <div className="relative">
                  <Input value={form.nombreCompleto} onChange={update('nombreCompleto')} placeholder="Nombre Apellido" />
                  {matches.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full rounded border border-slate-700 bg-slate-900 max-h-48 overflow-auto">
                      {matches.map((p) => (
                        <button type="button" key={p._id} onClick={() => pick(p)} className="w-full text-left px-3 py-2 hover:bg-slate-800">
                          <div className="font-medium">{p.nombre} {p.apellido}</div>
                          <div className="text-xs text-slate-400">ID: {p.identificacion}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
              <Field label="Identificación" required>
                <Input value={form.identificacion} onChange={update('identificacion')} placeholder="Identificación" />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-slate-300 mb-3">Información</h3>
            <Field label="Descripción de los hechos" required>
              <textarea className="w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500 min-h-32" value={form.descripcionHechos} onChange={update('descripcionHechos')} />
            </Field>
          </section>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 h-10 rounded bg-emerald-600 hover:bg-emerald-500">Generar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function BoloForm({ open, onClose, onResult, onCreated }) {
  const [form, setForm] = useState({
    tipo: '', genero: '', raza: '', ubicacion: '', descripcion: '', fecha: '', tiempo: '', callsign: '', oficialNombre: '', oficialPlaca: '', departamento: ''
  })

  useEffect(() => {
    if (!open) {
      setForm({ tipo: '', genero: '', raza: '', ubicacion: '', descripcion: '', fecha: '', tiempo: '', callsign: '', oficialNombre: '', oficialPlaca: '', departamento: '' })
    }
  }, [open])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // Reset de campos específicos cuando el tipo no es Persona
  useEffect(() => {
    if (form.tipo !== 'Persona' && (form.genero || form.raza)) {
      setForm((f) => ({ ...f, genero: '', raza: '' }))
    }
  }, [form.tipo])

  async function submit(e) {
    e.preventDefault()
    const required = ['tipo', 'ubicacion', 'descripcion', 'fecha', 'tiempo', 'callsign', 'oficialNombre', 'oficialPlaca', 'departamento']
    if (required.some((k) => !String(form[k] || '').trim())) {
      onResult?.('warning', 'Campos requeridos', 'Completa todos los campos obligatorios marcados con *.')
      return
    }

    const payload = {
      tipo: form.tipo,
      genero: form.genero || '',
      raza: form.raza || '',
      ubicacion: form.ubicacion.trim(),
      descripcion: form.descripcion.trim(),
      fecha: form.fecha,
      tiempo: form.tiempo,
      callsign: form.callsign.trim(),
      oficialNombre: form.oficialNombre.trim(),
      oficialPlaca: form.oficialPlaca.trim(),
      departamento: form.departamento.trim(),
      estado: 'Activo',
      fechaCreacion: new Date(),
      fechaExpiracion: new Date(Date.now() + 12 * 60 * 60 * 1000),
    }

    try {
      const res = await api.bolos.create(payload)
      if (res?.success) {
        onResult?.('success', 'BOLO creado', `${payload.tipo.toUpperCase()}\nUbicación: ${payload.ubicacion}\nOficial: ${payload.oficialNombre}`)
        setForm({ tipo: '', genero: '', raza: '', ubicacion: '', descripcion: '', fecha: '', tiempo: '', callsign: '', oficialNombre: '', oficialPlaca: '', departamento: '' })
        onCreated?.(res.data)
        onClose?.()
      } else {
        onResult?.('error', 'Error', res?.message || 'Error desconocido del servidor')
      }
    } catch (err) {
      onResult?.('error', 'Error de conexión', `${err.message || err}`)
    }
  }

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[980px] max-w-[95vw] max-h-[86vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold"><span className="mr-2">📣</span>Agregar BOLO</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-6">
          <section>
            <h3 className="text-slate-300 mb-3">Información del Incidente</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Fecha *" required>
                <Input type="date" value={form.fecha} onChange={update('fecha')} />
              </Field>
              <Field label="Hora *" required>
                <Input type="time" value={form.tiempo} onChange={update('tiempo')} />
              </Field>
              <Field label="Callsign/Radio *" required>
                <Input value={form.callsign} onChange={update('callsign')} placeholder="1-Adam-12" />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-slate-300 mb-3">Información del Sujeto</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Field label="Tipo de BOLO *" required>
                <Select value={form.tipo} onChange={update('tipo')}>
                  <option value="">Seleccionar tipo</option>
                  <option value="Persona">Persona</option>
                  <option value="Vehículo">Vehículo</option>
                </Select>
              </Field>
              {form.tipo === 'Persona' && (
                <>
                  <Field label="Género">
                    <Select value={form.genero} onChange={update('genero')}>
                      <option value="">Selecciona género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </Select>
                  </Field>
                  <Field label="Raza/Etnia">
                    <Select value={form.raza} onChange={update('raza')}>
                      <option value="">Selecciona raza</option>
                      <option value="Caucásico">Caucásico</option>
                      <option value="Afroamericano">Afroamericano</option>
                      <option value="Hispano">Hispano</option>
                      <option value="Asiático">Asiático</option>
                      <option value="Otro">Otro</option>
                    </Select>
                  </Field>
                </>
              )}
              <Field label="Última ubicación *" required>
                <Input value={form.ubicacion} onChange={update('ubicacion')} placeholder="Ciudad, dirección o zona específica" />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-slate-300 mb-3">Descripción Detallada</h3>
            <Field label="Descripción del BOLO *" required>
              <textarea className="w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500 min-h-24" value={form.descripcion} onChange={update('descripcion')} />
            </Field>
          </section>

          <section>
            <h3 className="text-slate-300 mb-3">Información del Oficial</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Nombre del oficial *" required>
                <Input value={form.oficialNombre} onChange={update('oficialNombre')} placeholder="Nombre completo del oficial" />
              </Field>
              <Field label="Número de placa *" required>
                <Input value={form.oficialPlaca} onChange={update('oficialPlaca')} placeholder="Número de placa" />
              </Field>
              <Field label="Departamento *" required>
                <Select value={form.departamento} onChange={update('departamento')}>
                  <option value="">Selecciona departamento</option>
                  <option value="LSPD">LSPD</option>
                  <option value="BCSO">BCSO</option>
                  <option value="SAHP">SAHP</option>
                  <option value="USMS">USMS</option>
                </Select>
              </Field>
            </div>
          </section>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 h-10 rounded bg-emerald-600 hover:bg-emerald-500">Crear BOLO</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AnotacionForm({ open, onClose, onResult, onCreated }) {
  const [form, setForm] = useState({
    nombre: '', apellido: '', identificacion: '',
    titulo: '', contenido: '', categoria: '',
    oficialNombre: '', oficialPlaca: '', departamento: ''
  })

  useEffect(() => {
    if (!open) {
      setForm({ nombre: '', apellido: '', identificacion: '', titulo: '', contenido: '', categoria: '', oficialNombre: '', oficialPlaca: '', departamento: '' })
    }
  }, [open])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    const required = ['nombre', 'apellido', 'identificacion', 'titulo', 'contenido', 'categoria', 'oficialNombre', 'oficialPlaca', 'departamento']
    if (required.some((k) => !String(form[k] || '').trim())) {
      onResult?.('warning', 'Campos requeridos', 'Completa todos los campos obligatorios.')
      return
    }
    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      identificacion: form.identificacion.trim(),
      titulo: form.titulo.trim(),
      contenido: form.contenido.trim(),
      categoria: form.categoria,
      oficialNombre: form.oficialNombre.trim(),
      oficialPlaca: form.oficialPlaca.trim(),
      departamento: form.departamento,
      fechaCreacion: new Date(),
    }
    try {
      const res = await api.anotaciones.create(payload)
      if (res?.success) {
        onResult?.('success', 'Anotación creada', `Título: ${payload.titulo}\nCategoría: ${payload.categoria}`)
        setForm({ nombre: '', apellido: '', identificacion: '', titulo: '', contenido: '', categoria: '', oficialNombre: '', oficialPlaca: '', departamento: '' })
        onCreated?.(res.data)
        onClose?.()
      } else {
        onResult?.('error', 'Error', res?.message || 'Error desconocido del servidor')
      }
    } catch (err) {
      onResult?.('error', 'Error de conexión', `${err.message || err}`)
    }
  }

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[980px] max-w-[95vw] max-h-[86vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Crear Anotación</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-6">
          <section>
            <h3 className="text-slate-300 mb-3">Información de la persona</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Nombre" required><Input value={form.nombre} onChange={update('nombre')} placeholder="Nombre" /></Field>
              <Field label="Apellido" required><Input value={form.apellido} onChange={update('apellido')} placeholder="Apellido" /></Field>
              <Field label="Identificación" required><Input value={form.identificacion} onChange={update('identificacion')} placeholder="Identificación" /></Field>
            </div>
          </section>
          <section>
            <h3 className="text-slate-300 mb-3">Detalles de la anotación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Título" required><Input value={form.titulo} onChange={update('titulo')} placeholder="Título de la anotación" /></Field>
              <Field label="Categoría" required>
                <Select value={form.categoria} onChange={update('categoria')}>
                  <option value="">Selecciona categoría</option>
                  <option value="General">General</option>
                  <option value="Comportamiento">Comportamiento</option>
                  <option value="Antecedentes">Antecedentes</option>
                  <option value="Observaciones">Observaciones</option>
                  <option value="Alertas">Alertas</option>
                </Select>
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Contenido" required>
                <textarea className="w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500 min-h-32" value={form.contenido} onChange={update('contenido')} />
              </Field>
            </div>
          </section>
          <section>
            <h3 className="text-slate-300 mb-3">Información del oficial</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Nombre del oficial" required><Input value={form.oficialNombre} onChange={update('oficialNombre')} /></Field>
              <Field label="Número de placa" required><Input value={form.oficialPlaca} onChange={update('oficialPlaca')} /></Field>
              <Field label="Departamento" required>
                <Select value={form.departamento} onChange={update('departamento')}>
                  <option value="">Selecciona departamento</option>
                  <option value="LSPD">LSPD</option>
                  <option value="BCSO">BCSO</option>
                  <option value="SAHP">SAHP</option>
                  <option value="USMS">USMS</option>
                </Select>
              </Field>
            </div>
          </section>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="px-4 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 h-10 rounded bg-emerald-600 hover:bg-emerald-500">Crear Anotación</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function BoloActivosModal({ open, onClose, onResult }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [tipo, setTipo] = useState('')

  function computeRemaining(exp) {
    const now = Date.now()
    const end = new Date(exp).getTime()
    const diff = Math.max(0, end - now)
    const hrs = Math.floor(diff / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    const texto = diff <= 0 ? 'Expirado' : `${hrs}h ${mins}m`
    return { texto, urgente: diff > 0 && diff <= 3600000, proximo: diff > 3600000 && diff <= 3 * 3600000 }
  }

  async function load() {
    try {
      setLoading(true)
      const r = await api.bolos.activos()
      setLoading(false)
      if (r?.success) setItems(r.data)
      else setItems([])
    } catch (err) {
      setLoading(false)
      setItems([])
      onResult?.('error', 'Error', err.message || String(err))
    }
  }

  useEffect(() => { if (open) load() }, [open])

  const filtered = useMemo(() => items.filter((b) => !tipo || b.tipo === tipo), [items, tipo])
  const stats = useMemo(() => {
    let urg = 0, prox = 0
    items.forEach((b) => { const t = computeRemaining(b.fechaExpiracion); if (t.urgente) urg++; else if (t.proximo) prox++; })
    return { total: items.length, urgentes: urg, proximos: prox }
  }, [items])

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[1100px] max-w-[98vw] max-h-[90vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">BOLOs Activos</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-slate-800 border border-slate-700">🧭 Total: {stats.total}</span>
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-amber-900/30 border border-amber-800">⚠️ Urgentes: {stats.urgentes}</span>
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-sky-900/30 border border-sky-800">⏳ Próximos: {stats.proximos}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <select className="bg-slate-800/60 border border-slate-700 rounded px-3 py-2" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Todos los tipos</option>
                <option value="Persona">Persona</option>
                <option value="Vehículo">Vehículo</option>
              </select>
              <button className="px-3 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={load} disabled={loading}>{loading ? '...' : 'Actualizar'}</button>
            </div>
          </div>
          <div className="border border-slate-800 rounded overflow-hidden">
            <div className="grid grid-cols-4 text-sm bg-slate-800/60 border-b border-slate-800">
              <div className="px-3 py-2">Tiempo restante</div>
              <div className="px-3 py-2">Tipo</div>
              <div className="px-3 py-2">Descripción</div>
              <div className="px-3 py-2">Detalle</div>
            </div>
            <div className="divide-y divide-slate-800">
              {filtered.length ? filtered.map((b) => {
                const t = computeRemaining(b.fechaExpiracion)
                return (
                  <div key={b._id} className="grid grid-cols-4 text-sm">
                    <div className={clsx('px-3 py-2', t.urgente && 'text-amber-300', t.proximo && 'text-sky-300')}>{t.texto}</div>
                    <div className="px-3 py-2">{b.tipo}</div>
                    <div className="px-3 py-2">
                      <div className="font-medium">{b.descripcion}</div>
                      <div className="text-xs text-slate-400">📍 {b.ubicacion} · 📞 {b.callsign} · 📅 {b.fecha} {b.tiempo}</div>
                    </div>
                    <div className="px-3 py-2">
                      <button className="px-2 h-8 rounded border border-slate-700 hover:bg-slate-800/60" onClick={() => onResult?.('info', 'BOLO', `ID: ${b._id}`)}>Ver</button>
                    </div>
                  </div>
                )
              }) : (
                <div className="px-3 py-6 text-slate-400 text-center">{loading ? 'Cargando BOLOs activos...' : 'Sin BOLOs activos'}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileModal({ open, ficha, onClose, onNewArrest, onNewByC, onNewAnotacion, onViewArrest, onViewByC, onViewAnotacion }) {
  const ident = ficha?.identificacion
  const [tab, setTab] = useState('arrestos')
  const [stats, setStats] = useState({ arrestos: 0, bycActivos: 0 })
  const [arrestos, setArrestos] = useState([])
  const [byc, setByc] = useState([])
  const [anotaciones, setAnotaciones] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      if (!open || !ident) return
      setLoading(true)
      try {
        const [rArrest, rByc, rAnot] = await Promise.all([
          api.arrestos.byIdentificacion(ident),
          api.byc.byIdentificacion(ident),
          api.anotaciones.byIdentificacion(ident),
        ])
        const arr = rArrest?.success ? rArrest.data : []
        const by = rByc?.success ? rByc.data : []
        const an = rAnot?.success ? rAnot.data : []
        setArrestos(arr)
        setByc(by)
        setAnotaciones(an)
        setStats({ arrestos: (rArrest?.count ?? arr.length) || arr.length, bycActivos: by.filter((b) => b.estado === 'Activo').length })
      } catch (e) {
        setArrestos([]); setByc([]); setAnotaciones([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [open, ident])

  const fotoUrl = useMemo(() => {
    const raw = ficha?.fotoUrl || ficha?.foto || ficha?.imagen || ficha?.image || ''
    if (!raw) return ''
    if (/^https?:/i.test(raw)) return raw
    const id = String(raw).trim()
    return id ? `https://i.imgur.com/${id}.jpg` : ''
  }, [ficha])

  const arrestCount = arrestos.length
  const bycActivos = byc.filter((b) => b.estado === 'Activo').length
  const boloRelacionados = 0

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[1100px] max-w-[98vw] max-h-[90vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Perfil</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        {ficha ? (
          <div className="mt-2">
            {/* Encabezado */}
            <div className="w-full rounded-t-xl bg-amber-400 text-black text-center py-3 font-semibold text-lg">Ficha Gubernamental</div>
            <div className="rounded-b-xl border border-slate-800 bg-black/80 p-4">
              <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
                {/* Columna izquierda: foto + nombre */}
                <div className="flex flex-col items-center">
                  <div className="w-[280px] h-[280px] rounded-sm overflow-hidden border border-slate-700 bg-slate-800/40">
                    {fotoUrl ? (
                      <img src={fotoUrl} alt="Foto de la persona" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-slate-400 text-sm">Sin imagen</div>
                    )}
                  </div>
                  <div className="mt-3 text-2xl font-semibold">{ficha.nombre} {ficha.apellido}</div>
                  <div className="text-slate-300">#{ficha.identificacion}</div>
                </div>

                {/* Columna derecha: información personal + métricas */}
                <div className="space-y-4">
                  <div className="rounded border border-slate-800 bg-slate-900/60">
                    <div className="px-4 py-2 border-b border-slate-800 bg-gradient-to-r from-amber-500/20 to-transparent">
                      <div className="text-amber-400 font-semibold">Información personal</div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="text-slate-300">Identificación</div><div className="text-right font-medium">#{ficha.identificacion || '-'}</div>
                        <div className="text-slate-300">Teléfono</div><div className="text-right font-medium">{ficha.telefono || '0'}</div>
                        <div className="text-slate-300">Género</div><div className="text-right font-medium">{(ficha.genero || '-').toString().charAt(0).toUpperCase() + (ficha.genero || '-').toString().slice(1)}</div>
                        <div className="text-slate-300">Residencia</div><div className="text-right font-medium">{ficha.residencia || 'S/N'}</div>
                        <div className="text-slate-300">Edad</div><div className="text-right font-medium">{ficha.edad ?? '-'}</div>
                        <div className="text-slate-300">Raza</div><div className="text-right font-medium">{ficha.raza || '-'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded border border-slate-800 bg-slate-900/60">
                    <div className="px-4 py-2 border-b border-slate-800 bg-gradient-to-r from-rose-500/20 to-transparent"></div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <div className="text-slate-300">ByC Activos</div><div className="text-right font-medium">{bycActivos}</div>
                        <div className="text-slate-300">BOLO Relacionados</div><div className="text-right font-medium">{boloRelacionados}</div>
                        <div className="text-slate-300">Nº de arrestos</div><div className="text-right font-medium">{arrestCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-6">
                <div className="flex items-center gap-2 border-b border-slate-800 mb-3">
                  {['arrestos', 'byc', 'anotaciones'].map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={clsx('px-4 py-2 rounded-t', tab === t ? 'bg-slate-800/60 text-white border-x border-t border-slate-800' : 'text-slate-300 hover:text-slate-100')}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                  ))}
                </div>
                {loading ? (
                  <div className="text-slate-400">Cargando...</div>
                ) : tab === 'arrestos' ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {arrestos.length ? arrestos.map((a) => (
                      <div key={a._id} className="rounded border border-slate-800 bg-slate-900/60 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <div>📅 {new Date(a.fechaArresto).toLocaleDateString('es-ES')}</div>
                          <div>🕒 {a.horaArresto}</div>
                        </div>
                        <div className="mt-1 text-sm">📞 {a.codigoArresto}</div>
                        <div className="mt-1 text-xs text-slate-400">Cargos: {a.cargos?.length ?? 0}</div>
                        <div className="mt-2"><button className="px-2 h-8 rounded border border-slate-700 hover:bg-slate-800/60" onClick={() => onViewArrest?.(a)}>Ver informe</button></div>
                      </div>
                    )) : <div className="text-slate-400">No hay arrestos</div>}
                  </div>
                ) : tab === 'byc' ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {byc.length ? byc.map((b) => (
                      <div key={b._id} className="rounded border border-slate-800 bg-slate-900/60 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <div>📅 {new Date(b.fechaCreacion).toLocaleDateString('es-ES')}</div>
                          <div className="text-xs px-2 py-0.5 rounded border border-slate-700">{b.estado}</div>
                        </div>
                        <div className="mt-1 text-sm">FUGITIVO - BYC - ...</div>
                        <div className="mt-2"><button className="px-2 h-8 rounded border border-slate-700 hover:bg-slate-800/60" onClick={() => onViewByC?.(b)}>Ver informe</button></div>
                      </div>
                    )) : <div className="text-slate-400">No hay ByC</div>}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {anotaciones.length ? anotaciones.map((n) => (
                      <div key={n._id} className="rounded border border-slate-800 bg-slate-900/60 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="font-medium">{n.titulo}</div>
                          <div className="text-xs px-2 py-0.5 rounded border border-slate-700">{n.categoria}</div>
                        </div>
                        <div className="mt-1 text-sm line-clamp-4 whitespace-pre-line">{n.contenido}</div>
                        <div className="mt-1 text-xs text-slate-400">Oficial: {n.oficialNombre}</div>
                        <div className="mt-2"><button className="px-2 h-8 rounded border border-slate-700 hover:bg-slate-800/60" onClick={() => onViewAnotacion?.(n)}>Ver informe</button></div>
                      </div>
                    )) : <div className="text-slate-400">No hay anotaciones</div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-slate-400 mt-4">Selecciona una ficha.</div>
        )}
      </div>
    </div>
  )
}

function CodigoPenalModal({ open, onClose, onResult }) {
  const [cargos, setCargos] = useState([])
  const [loading, setLoading] = useState(false)
  const [articulo, setArticulo] = useState('')
  const [q, setQ] = useState('')

  useEffect(() => {
    async function load() {
      if (!open) return
      setLoading(true)
      try {
        const r = await api.cargos.list()
        const arr = r?.success ? r.data : []
        setCargos(arr)
        // set default articulo al primero existente
        const arts = uniqueArticulos(arr)
        if (!articulo && arts.length) setArticulo(arts[0])
      } catch (e) {
        setCargos([])
      } finally {
        setLoading(false)
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function parseArticulo(codigo = '') {
    const m = codigo.match(/Art\.?\s*(\d+)/i)
    return m ? m[1] : 'Otros'
  }
  function uniqueArticulos(arr) {
    const set = new Set(arr.map((c) => parseArticulo(c.codigo)))
    return Array.from(set).sort((a, b) => Number(a) - Number(b))
  }

  const articulos = uniqueArticulos(cargos)
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return cargos.filter((c) => {
      const art = parseArticulo(c.codigo)
      const inArt = !articulo || art === articulo
      const inText = !term || c.descripcion?.toLowerCase().includes(term) || c.codigo?.toLowerCase().includes(term)
      return inArt && inText
    })
  }, [cargos, articulo, q])

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[1200px] max-w-[98vw] max-h-[90vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Código Penal</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar">✖</button>
        </div>
        <div className="grid md:grid-cols-[260px_1fr] gap-4 mt-4">
          {/* Sidebar artículos */}
          <div className="rounded border border-slate-800 bg-slate-800/40 p-2">
            <div className="text-slate-300 mb-2">Artículos</div>
            <div className="space-y-1">
              {articulos.length ? articulos.map((a) => (
                <button key={a} onClick={() => setArticulo(a)} className={clsx('w-full text-left px-3 py-2 rounded border border-slate-800', articulo === a ? 'bg-emerald-900/40 text-emerald-200' : 'bg-slate-900/40 hover:bg-slate-800/60')}>
                  Art. {a}
                </button>
              )) : <div className="text-slate-400 text-sm">{loading ? 'Cargando...' : 'Sin datos'}</div>}
            </div>
          </div>

          {/* Contenido */}
          <div className="rounded border border-slate-800 bg-slate-800/40 p-3">
            <div className="flex items-center gap-2 mb-3">
              <input className="flex-1 bg-slate-900/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500" placeholder="Buscar cargo..." value={q} onChange={(e) => setQ(e.target.value)} />
              <button className="px-3 h-10 rounded border border-slate-700 hover:bg-slate-800/60" onClick={() => setQ('')}>Limpiar</button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.length ? filtered.map((c) => (
                <div key={c._id || c.codigo} className="rounded border border-slate-700 bg-slate-900/60 p-3">
                  <div className="text-sm text-slate-400">{c.codigo}</div>
                  <div className="font-medium">{c.descripcion}</div>
                </div>
              )) : (
                <div className="text-slate-400">{loading ? 'Cargando cargos...' : 'No se encontraron cargos'}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardModal({ open, items = [], onClose, onClear, onAction }) {
  const [tipo, setTipo] = useState('')
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('Desconocido')
  const filtered = useMemo(() => {
    const term = String(q || '').trim().toLowerCase()
    return (Array.isArray(items) ? items : []).filter((e) => {
      const matchTipo = !tipo || e?.tipo === tipo
      const titulo = String(e?.titulo || '').toLowerCase()
      const detalle = String(e?.detalle || '').toLowerCase()
      const matchTexto = !term || titulo.includes(term) || detalle.includes(term)
      return matchTipo && matchTexto
    })
  }, [items, tipo, q])
  const stats = useMemo(() => {
    const s = {}
      ; (Array.isArray(items) ? items : []).forEach((e) => { const t = String(e?.tipo || ''); s[t] = (s[t] || 0) + 1 })
    return s
  }, [items])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-[1100px] max-w-[98vw] max-h-[90vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Dashboard · Logs</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 h-9 rounded border border-slate-700 hover:bg-slate-800/60" onClick={onClear}>Limpiar</button>
            <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar">✖</button>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {/* Controles DB */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-3">
            <div className="flex items-center gap-2">
              <div className="font-semibold">Base de datos</div>
              <span className="ml-2 px-2 py-0.5 rounded border border-slate-700 text-xs">Estado: {status}</span>
              <div className="ml-auto flex items-center gap-2">
                <button disabled={busy} className="px-3 h-9 rounded border border-slate-700 hover:bg-slate-800/60 disabled:opacity-50" onClick={async () => { setBusy(true); await onAction?.('status'); setBusy(false) }}>Estado</button>
                <button disabled={busy} className="px-3 h-9 rounded border border-slate-700 hover:bg-slate-800/60 disabled:opacity-50" onClick={async () => { setBusy(true); await onAction?.('start'); setBusy(false); setStatus('Iniciada') }}>Encender</button>
                <button disabled={busy} className="px-3 h-9 rounded border border-slate-700 hover:bg-slate-800/60 disabled:opacity-50" onClick={async () => { setBusy(true); await onAction?.('stop'); setBusy(false); setStatus('Detenida') }}>Apagar</button>
                <button disabled={busy} className="px-3 h-9 rounded border border-slate-700 hover:bg-slate-800/60 disabled:opacity-50" onClick={async () => { setBusy(true); await onAction?.('restart'); setBusy(false); setStatus('Reiniciada') }}>Reiniciar</button>
                <button disabled={busy} className="px-3 h-9 rounded border border-slate-700 hover:bg-slate-800/60 disabled:opacity-50" onClick={async () => { setBusy(true); await onAction?.('reload'); setBusy(false) }}>Releer</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input className="flex-1 bg-slate-900/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500" placeholder="Buscar en títulos o detalles..." value={q} onChange={(e) => setQ(e.target.value)} />
            <select className="bg-slate-900/60 border border-slate-700 rounded px-3 py-2" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Todos</option>
              <option value="ficha">Ficha</option>
              <option value="arresto">Arresto</option>
              <option value="byc">ByC</option>
              <option value="bolo">BOLO</option>
              <option value="anotacion">Anotación</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm flex-wrap">
            {Object.keys(stats).map((k) => (
              <span key={k} className="inline-flex items-center gap-2 px-2 py-1 rounded bg-slate-800 border border-slate-700">{k.toUpperCase()}: {stats[k]}</span>
            ))}
            <span className="ml-auto text-slate-400 text-xs">Total: {(items || []).length}</span>
          </div>
          <div className="border border-slate-800 rounded overflow-hidden">
            <div className="grid grid-cols-[160px_120px_1fr] text-sm bg-slate-800/60 border-b border-slate-800">
              <div className="px-3 py-2">Fecha/Hora</div>
              <div className="px-3 py-2">Tipo</div>
              <div className="px-3 py-2">Detalle</div>
            </div>
            <div className="divide-y divide-slate-800 max-h-[52vh] overflow-auto">
              {filtered.length ? filtered.map((e) => (
                <div key={e.id} className="grid grid-cols-[160px_120px_1fr] text-sm">
                  <div className="px-3 py-2">{new Date(e.ts).toLocaleString('es-ES')}</div>
                  <div className="px-3 py-2">{String(e?.tipo || '').toUpperCase()}</div>
                  <div className="px-3 py-2">
                    <div className="font-medium">{e.titulo}</div>
                    <div className="text-slate-300 whitespace-pre-wrap break-words">{e.detalle}</div>
                  </div>
                </div>
              )) : (
                <div className="px-3 py-6 text-slate-400 text-center">Sin registros</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrestReportModal({ open, data, onClose }) {
  if (!open || !data) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-[900px] max-w-[95vw] max-h-[88vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Informe de Arresto</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose}>✖</button>
        </div>
        <div className="mt-4 space-y-4">
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">📅 {new Date(data.fechaArresto).toLocaleDateString('es-ES')} · 🕒 {data.horaArresto}</div>
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">📞 {data.codigoArresto}</div>
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">📍 {data.ubicacion}</div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40 text-sm">
              <div className="font-medium mb-2">Cargos</div>
              <ul className="list-disc pl-5 space-y-1">
                {(data.cargos || []).map((c, i) => (
                  <li key={c.cargoId || i}>{c.codigo} - {c.descripcion}</li>
                ))}
              </ul>
            </div>
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40 text-sm">
              <div className="font-medium mb-2">Oficial</div>
              <div>👮 {data.oficialNombre} · #{data.oficialPlaca}</div>
            </div>
          </div>
          <div className="rounded border border-slate-800 p-3 bg-slate-800/40 text-sm">
            <div className="font-medium mb-1">Narrativa</div>
            <div className="whitespace-pre-line">{data.descripcion}</div>
          </div>
          {data.soporteEvidencia && (
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40 text-sm">
              <div className="font-medium mb-1">Soporte de evidencia</div>
              <div className="whitespace-pre-line break-words">{data.soporteEvidencia}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ByCReportModal({ open, data, onClose }) {
  const [submitting, setSubmitting] = useState(false)
  if (!open || !data) return null

  const createdAt = data.fechaCreacion ? new Date(data.fechaCreacion) : null
  const createdStr = createdAt ? `${String(createdAt.getDate()).padStart(2,'0')}/${String(createdAt.getMonth()+1).padStart(2,'0')}/${createdAt.getFullYear()} ${String(createdAt.getHours()).padStart(2,'0')}:${String(createdAt.getMinutes()).padStart(2,'0')}` : '-'
  const isActive = String(data.estado || '').toLowerCase() === 'activo'

  async function completar() {
    try {
      setSubmitting(true)
      if (!data._id) throw new Error('ID de ByC no disponible')
      await api.byc.update(data._id, { estado: 'Completado', fechaActualizacion: new Date() })
      setSubmitting(false)
      onClose?.()
    } catch (e) {
      setSubmitting(false)
      alert(e?.message || String(e))
    }
  }

  return (
    <div className={clsx('fixed inset-0 z-40 grid place-items-center transition', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-[980px] max-w-[95vw] max-h-[86vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Informe ByC</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose} title="Cerrar"><Icon name="close" size={18} /></button>
        </div>
        <div className="mt-4 space-y-6">
          <section>
            <h3 className="text-slate-300 mb-3">Sospechoso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Nombre_Apellido">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-90 text-white"><Icon name="user" size={16} /></span>
                  <Input readOnly value={data.nombreCompleto || '-'} className="pl-9" />
                </div>
              </Field>
              <Field label="Identificación">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-90 text-white"><Icon name="id-card" size={16} /></span>
                  <Input readOnly value={data.identificacion || '-'} className="pl-9" />
                </div>
              </Field>
            </div>
          </section>

          <section>
            <h3 className="text-slate-300 mb-3">Información</h3>
            <Field label="Descripción de los hechos">
              <textarea readOnly className="w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 outline-none focus:border-slate-500 min-h-32" value={data.descripcionHechos || ''} />
            </Field>
          </section>

          <section>
            <h3 className="text-slate-300 mb-3">Información del oficial</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Nombre_Apellido">
                <Input readOnly value={data.oficialNombre || data.creadoPorNombre || '-'} />
              </Field>
              <Field label="Identificación">
                <Input readOnly value={data.oficialPlaca || data.creadoPorId || '-'} />
              </Field>
              <Field label="Fecha de creación">
                <Input readOnly value={createdStr} />
              </Field>
            </div>
          </section>

          <div className="pt-2">
            <div className="flex justify-center">
              <button onClick={completar} disabled={!isActive || submitting} className="px-4 h-10 rounded bg-amber-400 text-black font-medium hover:bg-amber-300 disabled:opacity-60">
                {submitting ? 'Marcando...' : 'Marcar como completado'}
              </button>
            </div>
            {!isActive && (
              <div className="mt-2 text-center text-sm text-slate-400">Este ByC ya no está activo.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-[860px] max-w-[95vw] max-h-[88vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Informe ByC</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose}>✖</button>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">📅 {data.fechaCreacion ? new Date(data.fechaCreacion).toLocaleDateString('es-ES') : '-'}</div>
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">🔖 {data.estado}</div>
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">🪪 {data.identificacion}</div>
          </div>
          <div className="rounded border border-slate-800 p-3 bg-slate-800/40">
            <div className="font-medium mb-1">Sospechoso</div>
            <div>{data.nombreCompleto || '-'}</div>
          </div>
          <div className="rounded border border-slate-800 p-3 bg-slate-800/40">
            <div className="font-medium mb-1">Descripción de los hechos</div>
            <div className="whitespace-pre-line">{data.descripcionHechos}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnotacionDetailModal({ open, data, onClose }) {
  if (!open || !data) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-[840px] max-w-[95vw] max-h-[88vh] overflow-auto rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-semibold">Anotación</h2>
          <button className="h-9 w-9 grid place-items-center rounded hover:bg-slate-800/60" onClick={onClose}>✖</button>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">🏷️ {data.titulo}</div>
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">📂 {data.categoria}</div>
            <div className="rounded border border-slate-800 p-3 bg-slate-800/40">👮 {data.oficialNombre}</div>
          </div>
          <div className="rounded border border-slate-800 p-3 bg-slate-800/40">
            <div className="font-medium mb-1">Contenido</div>
            <div className="whitespace-pre-line">{data.contenido}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
