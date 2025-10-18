// Configuración de la aplicación
const config = {
    // Cambia esto cuando despliegues en producción
    environment: 'development', // 'development' o 'production'
    
    // URLs del API
    api: {
        development: 'http://localhost:3000/api',
        production: 'https://mdc-usmarshals-production-api.com/api' // <--- New Production API URL // Cambia esto cuando despliegues
    },
    
    // Obtener URL actual según el ambiente
    getApiUrl() {
        return this.api[this.environment];
    }
};

// Exportar configuración
window.CONFIG = config;
