// Configuración de la aplicación
(function(){
  const isLocal = typeof location !== 'undefined' && (
    location.hostname === 'localhost' || location.hostname === '127.0.0.1'
  )

  const config = {
    // Detección automática del entorno
    environment: isLocal ? 'development' : 'production',

    // URLs del API
    api: {
      development: 'http://localhost:3000/api',
      // En producción usa la misma ruta del dominio desplegado
      production: '/api'
    },

    // Obtener URL actual según el ambiente
    getApiUrl() {
      return this.api[this.environment]
    }
  }

  // Exportar configuración global
  window.CONFIG = config
})()
