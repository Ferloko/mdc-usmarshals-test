const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    console.log('🔍 Origen de la petición:', origin);
    
    // Permitir todas las solicitudes durante el desarrollo
    if (!origin) {
      console.log('✅ Permitiendo petición sin origen (desarrollo)');
      return callback(null, true);
    }

    const allowedOrigins = [
      'https://mdc-usmarshals-test-git-main-ferlokos-projects.vercel.app',
      'https://mdc-usmarshals-test.vercel.app',
      'https://mdc-usmarshals-test-r5hgkcnki-ferlokos-projects.vercel.app',
      'https://mdc-usmarshals-test-q5jzmill2-ferlokos-projects.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ];

    // Permitir todos los subdominios de Vercel para este proyecto
    const isVercelDomain = origin && (
      origin.includes('mdc-usmarshals-test') && 
      origin.includes('vercel.app')
    );

    // Permitir todos los dominios de Vercel temporalmente para debug
    const isAnyVercelDomain = origin && origin.includes('vercel.app');

    if (allowedOrigins.indexOf(origin) !== -1 || isVercelDomain || isAnyVercelDomain || !origin) {
      console.log('✅ Origen permitido por CORS:', origin);
      callback(null, true);
    } else {
      console.log('🚫 Origen bloqueado por CORS:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.use(cors(corsOptions));

// Middleware adicional para manejar preflight requests
app.options('*', (req, res) => {
  console.log('🔄 Petición OPTIONS (preflight) recibida desde:', req.headers.origin);
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mdc_database';

console.log('🔗 Configuración de conexión:');
console.log('📊 MONGODB_URI:', MONGODB_URI ? 'Configurada desde .env' : 'Usando configuración local por defecto');
console.log('🌐 Puerto:', process.env.PORT || 3000);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Schema para ficha gubernamental
const fichaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    identificacion: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    residencia: {
        type: String,
        required: true,
        trim: true
    },
    raza: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true,
        default: ''
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Actualizar fechaActualizacion antes de guardar
fichaSchema.pre('save', function(next) {
    this.fechaActualizacion = Date.now();
    next();
});

const Ficha = mongoose.model('Ficha', fichaSchema);

// Schema para reporte de arresto
const arrestoSchema = new mongoose.Schema({
    // Información del arrestado
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    identificacion: {
        type: String,
        required: true,
        trim: true
    },
    edad: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    
    // Detalles del arresto
    fechaArresto: {
        type: Date,
        required: true
    },
    horaArresto: {
        type: String,
        required: true,
        trim: true
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    codigoArresto: {
        type: String,
        required: true,
        trim: true
    },
    
    // Información del oficial
    oficialNombre: {
        type: String,
        required: true,
        trim: true
    },
    oficialPlaca: {
        type: String,
        required: true,
        trim: true
    },
    departamento: {
        type: String,
        required: true,
        enum: ['LSPD', 'BCSO', 'SAHP', 'USMS']
    },
    cargos: [{
        cargoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cargo',
            required: true
        },
        codigo: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        }
    }],
    
    // Descripción del incidente
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    
    // Soporte de evidencia
    soporteEvidencia: {
        type: String,
        trim: true,
        default: ''
    },
    
    // Metadatos
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Actualizar fechaActualizacion antes de guardar
arrestoSchema.pre('save', function(next) {
    this.fechaActualizacion = Date.now();
    next();
});

const Arresto = mongoose.model('Arresto', arrestoSchema);

// Schema para cargos penales
const cargoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Felonía', 'Misdemeanor', 'Infracción'],
        default: 'Misdemeanor'
    },
    activo: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Cargo = mongoose.model('Cargo', cargoSchema);

// Schema para ByC (Be on the Lookout) - Nueva versión simplificada
const bycSchema = new mongoose.Schema({
    // Información de la persona
    identificacion: {
        type: String,
        required: true,
        trim: true
    },
    nombreCompleto: {
        type: String,
        required: true,
        trim: true
    },
    descripcionHechos: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Resuelto', 'Cancelado'],
        default: 'Activo'
    },
    
    // Metadatos
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

bycSchema.pre('save', function(next) {
    this.fechaActualizacion = Date.now();
    next();
});

const ByC = mongoose.model('ByC', bycSchema);

// Schema para BOLO (Be On the Lookout)
const boloSchema = new mongoose.Schema({
    // Información del BOLO
    tipo: {
        type: String,
        required: true,
        enum: ['Persona', 'Vehículo'],
        trim: true
    },
    genero: {
        type: String,
        trim: true,
        default: ''
    },
    raza: {
        type: String,
        trim: true,
        default: ''
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: String,
        required: true,
        trim: true
    },
    tiempo: {
        type: String,
        required: true,
        trim: true
    },
    callsign: {
        type: String,
        required: true,
        trim: true
    },
    
    // Estado y fechas
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Expirado', 'Resuelto', 'Cancelado'],
        default: 'Activo'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaExpiracion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Actualizar fechaActualizacion antes de guardar
boloSchema.pre('save', function(next) {
    this.fechaActualizacion = Date.now();
    next();
});

const BOLO = mongoose.model('BOLO', boloSchema);

// Schema para Anotaciones
const anotacionSchema = new mongoose.Schema({
    // Información de la persona
    identificacion: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    
    // Contenido de la anotación
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    contenido: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['General', 'Comportamiento', 'Antecedentes', 'Observaciones', 'Alertas'],
        default: 'General'
    },
    
    // Información del oficial que crea la anotación
    oficialNombre: {
        type: String,
        required: true,
        trim: true
    },
    oficialPlaca: {
        type: String,
        required: true,
        trim: true
    },
    departamento: {
        type: String,
        required: true,
        enum: ['LSPD', 'BCSO', 'SAHP', 'USMS']
    },
    
    // Metadatos
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

anotacionSchema.pre('save', function(next) {
    this.fechaActualizacion = Date.now();
    next();
});

const Anotacion = mongoose.model('Anotacion', anotacionSchema);

// Rutas API

// Crear nueva ficha
app.post('/api/fichas', async (req, res) => {
    try {
        const nuevaFicha = new Ficha(req.body);
        const fichaGuardada = await nuevaFicha.save();
        res.status(201).json({
            success: true,
            message: 'Ficha creada exitosamente',
            data: fichaGuardada
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: 'Ya existe una ficha con esta identificación'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Error al crear la ficha',
                error: error.message
            });
        }
    }
});

// Obtener todas las fichas
app.get('/api/fichas', async (req, res) => {
    try {
        const fichas = await Ficha.find().sort({ fechaCreacion: -1 });
        res.json({
            success: true,
            count: fichas.length,
            data: fichas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las fichas',
            error: error.message
        });
    }
});

// Obtener ficha por ID
app.get('/api/fichas/:id', async (req, res) => {
    try {
        const ficha = await Ficha.findById(req.params.id);
        if (!ficha) {
            return res.status(404).json({
                success: false,
                message: 'Ficha no encontrada'
            });
        }
        res.json({
            success: true,
            data: ficha
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la ficha',
            error: error.message
        });
    }
});

// Buscar ficha por identificación
app.get('/api/fichas/buscar/:identificacion', async (req, res) => {
    try {
        const ficha = await Ficha.findOne({ identificacion: req.params.identificacion });
        if (!ficha) {
            return res.status(404).json({
                success: false,
                message: 'Ficha no encontrada'
            });
        }
        res.json({
            success: true,
            data: ficha
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar la ficha',
            error: error.message
        });
    }
});

// Actualizar ficha
app.put('/api/fichas/:id', async (req, res) => {
    try {
        const fichaActualizada = await Ficha.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!fichaActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Ficha no encontrada'
            });
        }
        res.json({
            success: true,
            message: 'Ficha actualizada exitosamente',
            data: fichaActualizada
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la ficha',
            error: error.message
        });
    }
});

// Eliminar ficha
app.delete('/api/fichas/:id', async (req, res) => {
    try {
        const fichaEliminada = await Ficha.findByIdAndDelete(req.params.id);
        if (!fichaEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Ficha no encontrada'
            });
        }
        res.json({
            success: true,
            message: 'Ficha eliminada exitosamente',
            data: fichaEliminada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la ficha',
            error: error.message
        });
    }
});

// ==================== RUTAS PARA ARRESTOS ====================

// Crear nuevo reporte de arresto
app.post('/api/arrestos', async (req, res) => {
    try {
        const nuevoArresto = new Arresto(req.body);
        const arrestoGuardado = await nuevoArresto.save();
        res.status(201).json({
            success: true,
            message: 'Reporte de arresto creado exitosamente',
            data: arrestoGuardado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el reporte de arresto',
            error: error.message
        });
    }
});

// Obtener todos los arrestos
app.get('/api/arrestos', async (req, res) => {
    try {
        const arrestos = await Arresto.find().sort({ fechaCreacion: -1 });
        res.json({
            success: true,
            count: arrestos.length,
            data: arrestos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los arrestos',
            error: error.message
        });
    }
});

// Obtener arresto por ID
app.get('/api/arrestos/:id', async (req, res) => {
    try {
        const arresto = await Arresto.findById(req.params.id);
        if (!arresto) {
            return res.status(404).json({
                success: false,
                message: 'Reporte de arresto no encontrado'
            });
        }
        res.json({
            success: true,
            data: arresto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el reporte de arresto',
            error: error.message
        });
    }
});

// Buscar arrestos por identificación del arrestado
app.get('/api/arrestos/buscar/:identificacion', async (req, res) => {
    try {
        const arrestos = await Arresto.find({ identificacion: req.params.identificacion }).sort({ fechaCreacion: -1 });
        res.json({
            success: true,
            count: arrestos.length,
            data: arrestos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar arrestos',
            error: error.message
        });
    }
});

// Buscar arrestos por oficial
app.get('/api/arrestos/oficial/:placa', async (req, res) => {
    try {
        const arrestos = await Arresto.find({ oficialPlaca: req.params.placa }).sort({ fechaCreacion: -1 });
        res.json({
            success: true,
            count: arrestos.length,
            data: arrestos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar arrestos por oficial',
            error: error.message
        });
    }
});

// Actualizar reporte de arresto
app.put('/api/arrestos/:id', async (req, res) => {
    try {
        const arrestoActualizado = await Arresto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!arrestoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Reporte de arresto no encontrado'
            });
        }
        res.json({
            success: true,
            message: 'Reporte de arresto actualizado exitosamente',
            data: arrestoActualizado
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el reporte de arresto',
            error: error.message
        });
    }
});

// Eliminar reporte de arresto
app.delete('/api/arrestos/:id', async (req, res) => {
    try {
        const arrestoEliminado = await Arresto.findByIdAndDelete(req.params.id);
        if (!arrestoEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Reporte de arresto no encontrado'
            });
        }
        res.json({
            success: true,
            message: 'Reporte de arresto eliminado exitosamente',
            data: arrestoEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el reporte de arresto',
            error: error.message
        });
    }
});

// ==================== RUTAS PARA BOLOS ====================

// Crear nuevo BOLO
app.post('/api/bolos', async (req, res) => {
    try {
        console.log('📥 Datos recibidos del BOLO:', req.body);

        const nuevoBOLO = new BOLO(req.body);
        const boloGuardado = await nuevoBOLO.save();

        console.log('✅ BOLO guardado exitosamente:', boloGuardado);

        res.status(201).json({
            success: true,
            message: 'BOLO creado exitosamente',
            data: boloGuardado
        });
    } catch (error) {
        console.error('❌ Error al crear BOLO:', error);
        res.status(400).json({
            success: false,
            message: 'Error al crear el BOLO',
            error: error.message
        });
    }
});

// Obtener todos los BOLOs activos
app.get('/api/bolos/activos', async (req, res) => {
    try {
        const ahora = new Date();
        const bolosActivos = await BOLO.find({
            estado: 'Activo',
            fechaExpiracion: { $gt: ahora }
        }).sort({ fechaCreacion: -1 });

        console.log(`📋 Encontrados ${bolosActivos.length} BOLOs activos`);

        res.json({
            success: true,
            count: bolosActivos.length,
            data: bolosActivos
        });
    } catch (error) {
        console.error('❌ Error al obtener BOLOs activos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los BOLOs activos',
            error: error.message
        });
    }
});

// Obtener BOLO por ID
app.get('/api/bolos/:id', async (req, res) => {
    try {
        const bolo = await BOLO.findById(req.params.id);
        if (!bolo) {
            return res.status(404).json({
                success: false,
                message: 'BOLO no encontrado'
            });
        }
        res.json({
            success: true,
            data: bolo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el BOLO',
            error: error.message
        });
    }
});

// Resolver BOLO
app.put('/api/bolos/:id/resolver', async (req, res) => {
    try {
        const boloResuelto = await BOLO.findByIdAndUpdate(
            req.params.id,
            {
                estado: 'Resuelto',
                fechaActualizacion: new Date()
            },
            { new: true }
        );

        if (!boloResuelto) {
            return res.status(404).json({
                success: false,
                message: 'BOLO no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'BOLO marcado como resuelto',
            data: boloResuelto
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al resolver el BOLO',
            error: error.message
        });
    }
});

// Obtener todos los BOLOs (incluyendo expirados)
app.get('/api/bolos', async (req, res) => {
    try {
        const bolos = await BOLO.find().sort({ fechaCreacion: -1 });
        res.json({
            success: true,
            count: bolos.length,
            data: bolos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los BOLOs',
            error: error.message
        });
    }
});

// ==================== RUTAS PARA BYC ====================

// Obtener todos los cargos activos
app.get('/api/cargos', async (req, res) => {
    try {
        const cargos = await Cargo.find({ activo: true }).sort({ codigo: 1 });
        res.json({
            success: true,
            count: cargos.length,
            data: cargos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los cargos',
            error: error.message
        });
    }
});

// Crear nuevo cargo
app.post('/api/cargos', async (req, res) => {
    try {
        const nuevoCargo = new Cargo(req.body);
        const cargoGuardado = await nuevoCargo.save();
        res.status(201).json({
            success: true,
            message: 'Cargo creado exitosamente',
            data: cargoGuardado
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: 'Ya existe un cargo con este código'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Error al crear el cargo',
                error: error.message
            });
        }
    }
});

// Inicializar cargos por defecto (solo ejecutar una vez)
app.post('/api/cargos/inicializar', async (req, res) => {
    try {
        const cargosExistentes = await Cargo.countDocuments();
        if (cargosExistentes > 0) {
            return res.json({
                success: true,
                message: 'Los cargos ya están inicializados',
                count: cargosExistentes
            });
        }

        const cargosIniciales = [
            // Artículo 1 - Infracciones de tránsito
            { codigo: 'Art. 1.1', descripcion: 'Exceso de velocidad', categoria: 'Infracción' },
            { codigo: 'Art. 1.2', descripcion: 'Estacionamiento indebido', categoria: 'Infracción' },
            { codigo: 'Art. 1.3', descripcion: 'Carreras ilegales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.4', descripcion: 'Conducción temeraria', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.5', descripcion: 'Maniobrar sin las medidas de seguridad pertinentes', categoria: 'Infracción' },
            { codigo: 'Art. 1.6', descripcion: 'Portar neones prendidos en circulación', categoria: 'Infracción' },
            { codigo: 'Art. 1.7', descripcion: 'Conducir sin licencia', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.8', descripcion: 'Conducir en dirección contraria', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.9', descripcion: 'Licencias de piloto', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.10', descripcion: 'Operación imprudente de una aeronave', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.11', descripcion: 'Zonas de vuelo restringidas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.12', descripcion: 'Conducir en estado de ebriedad, estupefacientes o distracción', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.13', descripcion: 'Conducción temeraria aérea o marítima', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.14', descripcion: 'Evasión de la justicia causando perjuicios', categoria: 'Felonía' },
            { codigo: 'Art. 1.15', descripcion: 'Maniobrar sin la licencia de conducción pertinente', categoria: 'Misdemeanor' },
            
            // Artículo 2 - Delitos contra la propiedad
            { codigo: 'Art. 2.1', descripcion: 'Hurto', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.2', descripcion: 'Robo', categoria: 'Felonía' },
            { codigo: 'Art. 2.3', descripcion: 'Robo a establecimiento leve', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.4', descripcion: 'Robo a establecimiento moderado', categoria: 'Felonía' },
            { codigo: 'Art. 2.5', descripcion: 'Robo a establecimiento grave', categoria: 'Felonía' },
            { codigo: 'Art. 2.6', descripcion: 'Robo a la propiedad pública', categoria: 'Felonía' },
            { codigo: 'Art. 2.7', descripcion: 'Impago de deudas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.8', descripcion: 'Robo a propiedad privada', categoria: 'Felonía' },
            { codigo: 'Art. 2.9', descripcion: 'Allanamiento de morada', categoria: 'Felonía' },
            { codigo: 'Art. 2.10', descripcion: 'Fraude/Estafa', categoria: 'Felonía' },
            { codigo: 'Art. 2.11', descripcion: 'Robo a sucursal bancaria', categoria: 'Felonía' },
            { codigo: 'Art. 2.12', descripcion: 'Daños a la propiedad pública', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.13', descripcion: 'Tráfico de objetos robados', categoria: 'Felonía' },
            { codigo: 'Art. 2.14', descripcion: 'Daños a la propiedad privada', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.15', descripcion: 'Vandalismo', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.16', descripcion: 'Evasión de pago en multas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.17', descripcion: 'Evasión de impuestos sobre las ventas', categoria: 'Felonía' },
            { codigo: 'Art. 2.18', descripcion: 'Uso indebido de material proporcionado por el Estado', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.19', descripcion: 'Robo a mano armada', categoria: 'Felonía' },
            { codigo: 'Art. 2.20', descripcion: 'Juego ilegal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.21', descripcion: 'Robo de vehículo', categoria: 'Felonía' },
            { codigo: 'Art. 2.22', descripcion: 'Daños a la propiedad intelectual', categoria: 'Misdemeanor' },
            
            // Artículo 3 - Delitos contra el orden público
            { codigo: 'Art. 3.1', descripcion: 'Exhibicionismo', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.2', descripcion: 'Abuso o profanación de un cadáver', categoria: 'Felonía' },
            { codigo: 'Art. 3.3', descripcion: 'Complicidad de delito', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.4', descripcion: 'Manifestación ilegal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.5', descripcion: 'Mal uso de las frecuencias de radio o líneas directas de seguridad pública o gubernamentales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.6', descripcion: 'Rostro oculto', categoria: 'Infracción' },
            { codigo: 'Art. 3.7', descripcion: 'Incitar un motín', categoria: 'Felonía' },
            { codigo: 'Art. 3.8', descripcion: 'Cómplice de un motín', categoria: 'Felonía' },
            { codigo: 'Art. 3.9', descripcion: 'Asamblea ilegal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.10', descripcion: 'Alteración del orden público', categoria: 'Misdemeanor' },
            
            // Artículo 4 - Delitos contra la vida
            { codigo: 'Art. 4.1', descripcion: 'Crueldad animal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 4.2', descripcion: 'Extorsión o Coacción', categoria: 'Felonía' },
            { codigo: 'Art. 4.3', descripcion: 'Tentativa de asesinato', categoria: 'Felonía' },
            { codigo: 'Art. 4.4', descripcion: 'Homicidio', categoria: 'Felonía' },
            { codigo: 'Art. 4.5', descripcion: 'Homicidio de primer grado', categoria: 'Felonía' },
            { codigo: 'Art. 4.6', descripcion: 'Homicidio de segundo grado', categoria: 'Felonía' },
            { codigo: 'Art. 4.7', descripcion: 'Homicidio de tercer grado', categoria: 'Felonía' },
            { codigo: 'Art. 4.8', descripcion: 'Asesinato', categoria: 'Felonía' },
            { codigo: 'Art. 4.9', descripcion: 'Intento de secuestro', categoria: 'Felonía' },
            { codigo: 'Art. 4.10', descripcion: 'Agresión sexual', categoria: 'Felonía' },
            { codigo: 'Art. 4.11', descripcion: 'Secuestro', categoria: 'Felonía' },
            { codigo: 'Art. 4.12', descripcion: 'Tortura', categoria: 'Felonía' },
            { codigo: 'Art. 4.13', descripcion: 'Violación', categoria: 'Felonía' },
            
            // Artículo 5 - Delitos contra las personas
            { codigo: 'Art. 5.1', descripcion: 'Agresión', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.2', descripcion: 'Amenazas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.3', descripcion: 'Evasión de responsabilidades', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.5', descripcion: 'Acoso', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.6', descripcion: 'Omisión al deber de socorro', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.7', descripcion: 'Peleas callejeras o ilegales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.8', descripcion: 'Injurias y Calumnias', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.9', descripcion: 'Chantaje', categoria: 'Felonía' },
            { codigo: 'Art. 5.10', descripcion: 'Suplantación de identidad', categoria: 'Felonía' },
            { codigo: 'Art. 5.11', descripcion: 'Falsedad documental', categoria: 'Felonía' },
            
            // Artículo 6 - Delitos contra la salud pública
            { codigo: 'Art. 6.1', descripcion: 'Venta de alcohol a menores de edad', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.2', descripcion: 'Comercialización ilegal de alcohol', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.3', descripcion: 'Posesión de tejido corporal humano', categoria: 'Felonía' },
            { codigo: 'Art. 6.4', descripcion: 'Posesión ilegal de sustancias estupefacientes', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.5', descripcion: 'Posesión ilegal de sustancias estupefacientes con intención de venta', categoria: 'Felonía' },
            { codigo: 'Art. 6.6', descripcion: 'Venta de drogas ilegales', categoria: 'Felonía' },
            { codigo: 'Art. 6.7', descripcion: 'Contaminación en la vía pública', categoria: 'Infracción' },
            { codigo: 'Art. 6.8', descripcion: 'Transitar bajo la influencia de una sustancia controlada', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.9', descripcion: 'Intoxicación pública', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.10', descripcion: 'Tráfico de drogas', categoria: 'Felonía' },
            
            // Artículo 7 - Delitos contra la administración de justicia
            { codigo: 'Art. 7.1', descripcion: 'Vigilantismo', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.2', descripcion: 'Ignorar citaciones judiciales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.3', descripcion: 'Hacer caso omiso a las indicaciones judiciales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.4', descripcion: 'Denuncia falsa', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.5', descripcion: 'Falso testimonio', categoria: 'Felonía' },
            { codigo: 'Art. 7.6', descripcion: 'Realizar un ejercicio sin la titulación pertinente', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.7', descripcion: 'Soborno', categoria: 'Felonía' },
            { codigo: 'Art. 7.8', descripcion: 'Agresión a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 7.9', descripcion: 'Irrumpir en infraestructuras gubernamentales', categoria: 'Felonía' },
            { codigo: 'Art. 7.10', descripcion: 'Encubrimiento de un delito', categoria: 'Felonía' },
            { codigo: 'Art. 7.11', descripcion: 'Intento de soborno', categoria: 'Felonía' },
            { codigo: 'Art. 7.13', descripcion: 'Huida de la justicia', categoria: 'Felonía' },
            { codigo: 'Art. 7.14', descripcion: 'Resistencia al arresto', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.15', descripcion: 'Desobediencia a la justicia', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.16', descripcion: 'Obstrucción de la justicia', categoria: 'Felonía' },
            { codigo: 'Art. 7.17', descripcion: 'Resistencia a la identificación', categoria: 'Misdemeanor' },
            
            // Artículo 8 - Delitos federales
            { codigo: 'Art. 8.1', descripcion: 'Robo a sucursal bancaria federal', categoria: 'Felonía' },
            { codigo: 'Art. 8.2', descripcion: 'Lavado de dinero', categoria: 'Felonía' },
            { codigo: 'Art. 8.3', descripcion: 'Manipulación de pruebas', categoria: 'Felonía' },
            { codigo: 'Art. 8.4', descripcion: 'Crimen organizado', categoria: 'Felonía' },
            { codigo: 'Art. 8.5', descripcion: 'Fuga de una estructura penitenciaria', categoria: 'Felonía' },
            { codigo: 'Art. 8.6', descripcion: 'Homicidio a funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.7', descripcion: 'Tentativa de asesinato a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.8', descripcion: 'Asesinato múltiple', categoria: 'Felonía' },
            { codigo: 'Art. 8.9', descripcion: 'Homicidio múltiple', categoria: 'Felonía' },
            { codigo: 'Art. 8.10', descripcion: 'Fabricación de narcóticos', categoria: 'Felonía' },
            { codigo: 'Art. 8.11', descripcion: 'Tráfico de estupefacientes', categoria: 'Felonía' },
            { codigo: 'Art. 8.12', descripcion: 'Poseer un lugar con el propósito de vender o distribuir', categoria: 'Felonía' },
            { codigo: 'Art. 8.13', descripcion: 'Terrorismo', categoria: 'Felonía' },
            { codigo: 'Art. 8.14', descripcion: 'Tentativa de asesinato múltiple', categoria: 'Felonía' },
            { codigo: 'Art. 8.15', descripcion: 'Malversación de fondos económicos o desfalco', categoria: 'Felonía' },
            { codigo: 'Art. 8.16', descripcion: 'Estafa sistemática', categoria: 'Felonía' },
            { codigo: 'Art. 8.17', descripcion: 'Suplantación de identidad gubernamental', categoria: 'Felonía' },
            { codigo: 'Art. 8.18', descripcion: 'Conspiración', categoria: 'Felonía' },
            { codigo: 'Art. 8.19', descripcion: 'Irrumpir en infraestructuras federales', categoria: 'Felonía' },
            { codigo: 'Art. 8.20', descripcion: 'Espionaje', categoria: 'Felonía' },
            { codigo: 'Art. 8.21', descripcion: 'Asesinato a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.22', descripcion: 'Secuestro a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.23', descripcion: 'Tortura a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.24', descripcion: 'Porte de armas largas de fuego', categoria: 'Felonía' },
            { codigo: 'Art. 8.25', descripcion: 'Esclavitud', categoria: 'Felonía' },
            { codigo: 'Art. 8.26', descripcion: 'Tráfico de influencias', categoria: 'Felonía' },
            { codigo: 'Art. 8.27', descripcion: 'Abuso de autoridad', categoria: 'Felonía' },
            { codigo: 'Art. 8.28', descripcion: 'Venta de material gubernamental', categoria: 'Felonía' },
            { codigo: 'Art. 8.29', descripcion: 'Desertar del servicio militar', categoria: 'Felonía' },
            { codigo: 'Art. 8.30', descripcion: 'Absentismo del servicio militar', categoria: 'Misdemeanor' },
            { codigo: 'Art. 8.31', descripcion: 'Falso testimonio', categoria: 'Felonía' },
            { codigo: 'Art. 8.32', descripcion: 'Proxenetismo', categoria: 'Felonía' },
            { codigo: 'Art. 8.33', descripcion: 'Falsificación de documentos gubernamentales', categoria: 'Felonía' },
            { codigo: 'Art. 8.34', descripcion: 'Robo a instituciones federales', categoria: 'Felonía' },
            { codigo: 'Art. 8.35', descripcion: 'Aceptación de soborno', categoria: 'Felonía' },
            { codigo: 'Art. 8.36', descripcion: 'Manipulación de pruebas', categoria: 'Felonía' },
            { codigo: 'Art. 8.37', descripcion: 'Negligencia médica', categoria: 'Felonía' },
            { codigo: 'Art. 8.38', descripcion: 'Difusión de información confidencial', categoria: 'Felonía' },
            { codigo: 'Art. 8.39', descripcion: 'Encubrimiento de un delito por parte del funcionariado', categoria: 'Felonía' },
            { codigo: 'Art. 8.40', descripcion: 'Omisión al deber de socorro', categoria: 'Felonía' },
            { codigo: 'Art. 8.41', descripcion: 'Consumo de alcohol o sustancias estupefacientes en servicio', categoria: 'Felonía' },
            { codigo: 'Art. 8.42', descripcion: 'Intento de secuestro a un funcionario público', categoria: 'Felonía' }
        ];

        const cargosCreados = await Cargo.insertMany(cargosIniciales);
        res.status(201).json({
            success: true,
            message: 'Cargos inicializados exitosamente',
            count: cargosCreados.length,
            data: cargosCreados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al inicializar los cargos',
            error: error.message
        });
    }
});

// Limpiar y reinicializar todos los cargos
app.post('/api/cargos/reinicializar', async (req, res) => {
    try {
        // Eliminar todos los cargos existentes
        await Cargo.deleteMany({});
        console.log('Cargos existentes eliminados');

        const cargosIniciales = [
            // Artículo 1 - Infracciones de tránsito
            { codigo: 'Art. 1.1', descripcion: 'Exceso de velocidad', categoria: 'Infracción' },
            { codigo: 'Art. 1.2', descripcion: 'Estacionamiento indebido', categoria: 'Infracción' },
            { codigo: 'Art. 1.3', descripcion: 'Carreras ilegales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.4', descripcion: 'Conducción temeraria', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.5', descripcion: 'Maniobrar sin las medidas de seguridad pertinentes', categoria: 'Infracción' },
            { codigo: 'Art. 1.6', descripcion: 'Portar neones prendidos en circulación', categoria: 'Infracción' },
            { codigo: 'Art. 1.7', descripcion: 'Conducir sin licencia', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.8', descripcion: 'Conducir en dirección contraria', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.9', descripcion: 'Licencias de piloto', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.10', descripcion: 'Operación imprudente de una aeronave', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.11', descripcion: 'Zonas de vuelo restringidas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.12', descripcion: 'Conducir en estado de ebriedad, estupefacientes o distracción', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.13', descripcion: 'Conducción temeraria aérea o marítima', categoria: 'Misdemeanor' },
            { codigo: 'Art. 1.14', descripcion: 'Evasión de la justicia causando perjuicios', categoria: 'Felonía' },
            { codigo: 'Art. 1.15', descripcion: 'Maniobrar sin la licencia de conducción pertinente', categoria: 'Misdemeanor' },
            
            // Artículo 2 - Delitos contra la propiedad
            { codigo: 'Art. 2.1', descripcion: 'Hurto', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.2', descripcion: 'Robo', categoria: 'Felonía' },
            { codigo: 'Art. 2.3', descripcion: 'Robo a establecimiento leve', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.4', descripcion: 'Robo a establecimiento moderado', categoria: 'Felonía' },
            { codigo: 'Art. 2.5', descripcion: 'Robo a establecimiento grave', categoria: 'Felonía' },
            { codigo: 'Art. 2.6', descripcion: 'Robo a la propiedad pública', categoria: 'Felonía' },
            { codigo: 'Art. 2.7', descripcion: 'Impago de deudas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.8', descripcion: 'Robo a propiedad privada', categoria: 'Felonía' },
            { codigo: 'Art. 2.9', descripcion: 'Allanamiento de morada', categoria: 'Felonía' },
            { codigo: 'Art. 2.10', descripcion: 'Fraude/Estafa', categoria: 'Felonía' },
            { codigo: 'Art. 2.11', descripcion: 'Robo a sucursal bancaria', categoria: 'Felonía' },
            { codigo: 'Art. 2.12', descripcion: 'Daños a la propiedad pública', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.13', descripcion: 'Tráfico de objetos robados', categoria: 'Felonía' },
            { codigo: 'Art. 2.14', descripcion: 'Daños a la propiedad privada', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.15', descripcion: 'Vandalismo', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.16', descripcion: 'Evasión de pago en multas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.17', descripcion: 'Evasión de impuestos sobre las ventas', categoria: 'Felonía' },
            { codigo: 'Art. 2.18', descripcion: 'Uso indebido de material proporcionado por el Estado', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.19', descripcion: 'Robo a mano armada', categoria: 'Felonía' },
            { codigo: 'Art. 2.20', descripcion: 'Juego ilegal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 2.21', descripcion: 'Robo de vehículo', categoria: 'Felonía' },
            { codigo: 'Art. 2.22', descripcion: 'Daños a la propiedad intelectual', categoria: 'Misdemeanor' },
            
            // Artículo 3 - Delitos contra el orden público
            { codigo: 'Art. 3.1', descripcion: 'Exhibicionismo', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.2', descripcion: 'Abuso o profanación de un cadáver', categoria: 'Felonía' },
            { codigo: 'Art. 3.3', descripcion: 'Complicidad de delito', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.4', descripcion: 'Manifestación ilegal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.5', descripcion: 'Mal uso de las frecuencias de radio o líneas directas de seguridad pública o gubernamentales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.6', descripcion: 'Rostro oculto', categoria: 'Infracción' },
            { codigo: 'Art. 3.7', descripcion: 'Incitar un motín', categoria: 'Felonía' },
            { codigo: 'Art. 3.8', descripcion: 'Cómplice de un motín', categoria: 'Felonía' },
            { codigo: 'Art. 3.9', descripcion: 'Asamblea ilegal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 3.10', descripcion: 'Alteración del orden público', categoria: 'Misdemeanor' },
            
            // Artículo 4 - Delitos contra la vida
            { codigo: 'Art. 4.1', descripcion: 'Crueldad animal', categoria: 'Misdemeanor' },
            { codigo: 'Art. 4.2', descripcion: 'Extorsión o Coacción', categoria: 'Felonía' },
            { codigo: 'Art. 4.3', descripcion: 'Tentativa de asesinato', categoria: 'Felonía' },
            { codigo: 'Art. 4.4', descripcion: 'Homicidio', categoria: 'Felonía' },
            { codigo: 'Art. 4.5', descripcion: 'Homicidio de primer grado', categoria: 'Felonía' },
            { codigo: 'Art. 4.6', descripcion: 'Homicidio de segundo grado', categoria: 'Felonía' },
            { codigo: 'Art. 4.7', descripcion: 'Homicidio de tercer grado', categoria: 'Felonía' },
            { codigo: 'Art. 4.8', descripcion: 'Asesinato', categoria: 'Felonía' },
            { codigo: 'Art. 4.9', descripcion: 'Intento de secuestro', categoria: 'Felonía' },
            { codigo: 'Art. 4.10', descripcion: 'Agresión sexual', categoria: 'Felonía' },
            { codigo: 'Art. 4.11', descripcion: 'Secuestro', categoria: 'Felonía' },
            { codigo: 'Art. 4.12', descripcion: 'Tortura', categoria: 'Felonía' },
            { codigo: 'Art. 4.13', descripcion: 'Violación', categoria: 'Felonía' },
            
            // Artículo 5 - Delitos contra las personas
            { codigo: 'Art. 5.1', descripcion: 'Agresión', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.2', descripcion: 'Amenazas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.3', descripcion: 'Evasión de responsabilidades', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.5', descripcion: 'Acoso', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.6', descripcion: 'Omisión al deber de socorro', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.7', descripcion: 'Peleas callejeras o ilegales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.8', descripcion: 'Injurias y Calumnias', categoria: 'Misdemeanor' },
            { codigo: 'Art. 5.9', descripcion: 'Chantaje', categoria: 'Felonía' },
            { codigo: 'Art. 5.10', descripcion: 'Suplantación de identidad', categoria: 'Felonía' },
            { codigo: 'Art. 5.11', descripcion: 'Falsedad documental', categoria: 'Felonía' },
            
            // Artículo 6 - Delitos contra la salud pública
            { codigo: 'Art. 6.1', descripcion: 'Venta de alcohol a menores de edad', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.2', descripcion: 'Comercialización ilegal de alcohol', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.3', descripcion: 'Posesión de tejido corporal humano', categoria: 'Felonía' },
            { codigo: 'Art. 6.4', descripcion: 'Posesión ilegal de sustancias estupefacientes', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.5', descripcion: 'Posesión ilegal de sustancias estupefacientes con intención de venta', categoria: 'Felonía' },
            { codigo: 'Art. 6.6', descripcion: 'Venta de drogas ilegales', categoria: 'Felonía' },
            { codigo: 'Art. 6.7', descripcion: 'Contaminación en la vía pública', categoria: 'Infracción' },
            { codigo: 'Art. 6.8', descripcion: 'Transitar bajo la influencia de una sustancia controlada', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.9', descripcion: 'Intoxicación pública', categoria: 'Misdemeanor' },
            { codigo: 'Art. 6.10', descripcion: 'Tráfico de drogas', categoria: 'Felonía' },
            
            // Artículo 7 - Delitos contra la administración de justicia
            { codigo: 'Art. 7.1', descripcion: 'Vigilantismo', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.2', descripcion: 'Ignorar citaciones judiciales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.3', descripcion: 'Hacer caso omiso a las indicaciones judiciales', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.4', descripcion: 'Denuncia falsa', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.5', descripcion: 'Falso testimonio', categoria: 'Felonía' },
            { codigo: 'Art. 7.6', descripcion: 'Realizar un ejercicio sin la titulación pertinente', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.7', descripcion: 'Soborno', categoria: 'Felonía' },
            { codigo: 'Art. 7.8', descripcion: 'Agresión a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 7.9', descripcion: 'Irrumpir en infraestructuras gubernamentales', categoria: 'Felonía' },
            { codigo: 'Art. 7.10', descripcion: 'Encubrimiento de un delito', categoria: 'Felonía' },
            { codigo: 'Art. 7.11', descripcion: 'Intento de soborno', categoria: 'Felonía' },
            { codigo: 'Art. 7.13', descripcion: 'Huida de la justicia', categoria: 'Felonía' },
            { codigo: 'Art. 7.14', descripcion: 'Resistencia al arresto', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.15', descripcion: 'Desobediencia a la justicia', categoria: 'Misdemeanor' },
            { codigo: 'Art. 7.16', descripcion: 'Obstrucción de la justicia', categoria: 'Felonía' },
            { codigo: 'Art. 7.17', descripcion: 'Resistencia a la identificación', categoria: 'Misdemeanor' },
            
            // Artículo 8 - Delitos federales
            { codigo: 'Art. 8.1', descripcion: 'Robo a sucursal bancaria federal', categoria: 'Felonía' },
            { codigo: 'Art. 8.2', descripcion: 'Lavado de dinero', categoria: 'Felonía' },
            { codigo: 'Art. 8.3', descripcion: 'Manipulación de pruebas', categoria: 'Felonía' },
            { codigo: 'Art. 8.4', descripcion: 'Crimen organizado', categoria: 'Felonía' },
            { codigo: 'Art. 8.5', descripcion: 'Fuga de una estructura penitenciaria', categoria: 'Felonía' },
            { codigo: 'Art. 8.6', descripcion: 'Homicidio a funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.7', descripcion: 'Tentativa de asesinato a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.8', descripcion: 'Asesinato múltiple', categoria: 'Felonía' },
            { codigo: 'Art. 8.9', descripcion: 'Homicidio múltiple', categoria: 'Felonía' },
            { codigo: 'Art. 8.10', descripcion: 'Fabricación de narcóticos', categoria: 'Felonía' },
            { codigo: 'Art. 8.11', descripcion: 'Tráfico de estupefacientes', categoria: 'Felonía' },
            { codigo: 'Art. 8.12', descripcion: 'Poseer un lugar con el propósito de vender o distribuir', categoria: 'Felonía' },
            { codigo: 'Art. 8.13', descripcion: 'Terrorismo', categoria: 'Felonía' },
            { codigo: 'Art. 8.14', descripcion: 'Tentativa de asesinato múltiple', categoria: 'Felonía' },
            { codigo: 'Art. 8.15', descripcion: 'Malversación de fondos económicos o desfalco', categoria: 'Felonía' },
            { codigo: 'Art. 8.16', descripcion: 'Estafa sistemática', categoria: 'Felonía' },
            { codigo: 'Art. 8.17', descripcion: 'Suplantación de identidad gubernamental', categoria: 'Felonía' },
            { codigo: 'Art. 8.18', descripcion: 'Conspiración', categoria: 'Felonía' },
            { codigo: 'Art. 8.19', descripcion: 'Irrumpir en infraestructuras federales', categoria: 'Felonía' },
            { codigo: 'Art. 8.20', descripcion: 'Espionaje', categoria: 'Felonía' },
            { codigo: 'Art. 8.21', descripcion: 'Asesinato a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.22', descripcion: 'Secuestro a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.23', descripcion: 'Tortura a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.24', descripcion: 'Porte de armas largas de fuego', categoria: 'Felonía' },
            { codigo: 'Art. 8.25', descripcion: 'Esclavitud', categoria: 'Felonía' },
            { codigo: 'Art. 8.26', descripcion: 'Tráfico de influencias', categoria: 'Felonía' },
            { codigo: 'Art. 8.27', descripcion: 'Abuso de autoridad', categoria: 'Felonía' },
            { codigo: 'Art. 8.28', descripcion: 'Venta de material gubernamental', categoria: 'Felonía' },
            { codigo: 'Art. 8.29', descripcion: 'Desertar del servicio militar', categoria: 'Felonía' },
            { codigo: 'Art. 8.30', descripcion: 'Absentismo del servicio militar', categoria: 'Misdemeanor' },
            { codigo: 'Art. 8.31', descripcion: 'Falso testimonio', categoria: 'Felonía' },
            { codigo: 'Art. 8.32', descripcion: 'Proxenetismo', categoria: 'Felonía' },
            { codigo: 'Art. 8.33', descripcion: 'Falsificación de documentos gubernamentales', categoria: 'Felonía' },
            { codigo: 'Art. 8.34', descripcion: 'Robo a instituciones federales', categoria: 'Felonía' },
            { codigo: 'Art. 8.35', descripcion: 'Aceptación de soborno', categoria: 'Felonía' },
            { codigo: 'Art. 8.36', descripcion: 'Manipulación de pruebas', categoria: 'Felonía' },
            { codigo: 'Art. 8.37', descripcion: 'Negligencia médica', categoria: 'Felonía' },
            { codigo: 'Art. 8.38', descripcion: 'Difusión de información confidencial', categoria: 'Felonía' },
            { codigo: 'Art. 8.39', descripcion: 'Encubrimiento de un delito por parte del funcionariado', categoria: 'Felonía' },
            { codigo: 'Art. 8.40', descripcion: 'Omisión al deber de socorro', categoria: 'Felonía' },
            { codigo: 'Art. 8.41', descripcion: 'Consumo de alcohol o sustancias estupefacientes en servicio', categoria: 'Felonía' },
            { codigo: 'Art. 8.42', descripcion: 'Intento de secuestro a un funcionario público', categoria: 'Felonía' },
            { codigo: 'Art. 8.43', descripcion: 'Tráfico de drogas a gran escala', categoria: 'Felonía' },
            { codigo: 'Art. 8.44', descripcion: 'Tráfico de armas de fuego de gran calibre', categoria: 'Felonía' },
            { codigo: 'Art. 8.45', descripcion: 'Uso indebido de material gubernamental por parte de un funcionario público', categoria: 'Felonía' },
        
            // Artículo 9 - Delitos federales

            { codigo: 'Art. 9.1', descripcion: 'Exhibir un arma de fuego o un arma blanca', categoria: 'Misdemeanor' },
            { codigo: 'Art. 9.2', descripcion: 'Portar un arma de fuego o algún componente relacionado', categoria: 'Misdemeanor' },
            { codigo: 'Art. 9.3', descripcion: 'Posesión de modificaciones de armas', categoria: 'Felonía' },
            { codigo: 'Art. 9.4', descripcion: 'Posesión de una armadura corporal ilegal', categoria: 'Felonía' },
            { codigo: 'Art. 9.5', descripcion: 'Posesión de una armadura corporal para fines delictivos', categoria: 'Felonía' },
            { codigo: 'Art. 9.6', descripcion: 'Asalto con arma mortal', categoria: 'Felonía' },
            { codigo: 'Art. 9.7', descripcion: 'Posesión de armas de fuego ilegales', categoria: 'Felonía' },
            { codigo: 'Art. 9.8', descripcion: 'Transferencia o venta ilegal de un arma de fuego', categoria: 'Felonía' },
            { codigo: 'Art. 9.9', descripcion: 'Tráfico de armas de fuego', categoria: 'Felonía' },
            { codigo: 'Art. 9.10', descripcion: 'Posesión de un arma blanca superior a 2 pulgadas', categoria: 'Misdemeanor' },
            { codigo: 'Art. 9.11', descripcion: 'Portar un arma de fuego bajo efectos de embriaguez y/o sustancias estupefacientes', categoria: 'Felonía' }

        ];


        const cargosCreados = await Cargo.insertMany(cargosIniciales);
        res.status(201).json({
            success: true,
            message: 'Todos los cargos han sido reinicializados exitosamente',
            count: cargosCreados.length,
            data: cargosCreados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al reinicializar los cargos',
            error: error.message
        });
    }
});

// ==================== RUTAS PARA ByC ====================

// Crear nuevo ByC
app.post('/api/byc', async (req, res) => {
    try {
        console.log('📝 Creando nuevo ByC:', req.body);
        const nuevoByC = new ByC(req.body);
        const bycGuardado = await nuevoByC.save();
        console.log('✅ ByC creado exitosamente:', bycGuardado._id);
        res.status(201).json({
            success: true,
            message: 'ByC creado exitosamente',
            data: bycGuardado
        });
    } catch (error) {
        console.error('❌ Error al crear ByC:', error);
        res.status(400).json({
            success: false,
            message: 'Error al crear el ByC',
            error: error.message
        });
    }
});

// Obtener ByC por identificación
app.get('/api/byc/persona/:identificacion', async (req, res) => {
    try {
        console.log('🔍 Buscando ByC para identificación:', req.params.identificacion);
        const bycs = await ByC.find({ identificacion: req.params.identificacion }).sort({ fechaCreacion: -1 });
        console.log(`📋 Encontrados ${bycs.length} ByC para ${req.params.identificacion}`);
        res.json({
            success: true,
            count: bycs.length,
            data: bycs
        });
    } catch (error) {
        console.error('❌ Error al obtener ByC:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los ByC',
            error: error.message
        });
    }
});

// Obtener ByC activos
app.get('/api/byc/activos', async (req, res) => {
    try {
        console.log('📋 Obteniendo ByC activos');
        const bycsActivos = await ByC.find({ estado: 'Activo' }).sort({ fechaCreacion: -1 });
        console.log(`✅ Encontrados ${bycsActivos.length} ByC activos`);
        res.json({
            success: true,
            count: bycsActivos.length,
            data: bycsActivos
        });
    } catch (error) {
        console.error('❌ Error al obtener ByC activos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los ByC activos',
            error: error.message
        });
    }
});

// Obtener ByC inactivos (resueltos y cancelados)
app.get('/api/byc/inactivos', async (req, res) => {
    try {
        console.log('📋 Obteniendo ByC inactivos');
        const bycsInactivos = await ByC.find({
            estado: { $in: ['Resuelto', 'Cancelado'] }
        }).sort({ fechaCreacion: -1 });
        console.log(`✅ Encontrados ${bycsInactivos.length} ByC inactivos`);
        res.json({
            success: true,
            count: bycsInactivos.length,
            data: bycsInactivos
        });
    } catch (error) {
        console.error('❌ Error al obtener ByC inactivos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los ByC inactivos',
            error: error.message
        });
    }
});

// Obtener estadísticas de ByC
app.get('/api/byc/estadisticas', async (req, res) => {
    try {
        console.log('📊 Obteniendo estadísticas de ByC');
        const totalByCs = await ByC.countDocuments();
        const activos = await ByC.countDocuments({ estado: 'Activo' });
        const resueltos = await ByC.countDocuments({ estado: 'Resuelto' });
        const cancelados = await ByC.countDocuments({ estado: 'Cancelado' });

        const estadisticas = {
            total: totalByCs,
            activos: activos,
            resueltos: resueltos,
            cancelados: cancelados,
            activos: activos,
            inactivos: resueltos + cancelados
        };

        console.log('📊 Estadísticas calculadas:', estadisticas);
        res.json({
            success: true,
            data: estadisticas
        });
    } catch (error) {
        console.error('❌ Error al obtener estadísticas de ByC:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las estadísticas de ByC',
            error: error.message
        });
    }
});

// Obtener ByC por ID
app.get('/api/byc/:id', async (req, res) => {
    try {
        console.log('🔍 Obteniendo ByC por ID:', req.params.id);
        console.log('🔍 Tipo de ID:', typeof req.params.id);
        console.log('🔍 Longitud del ID:', req.params.id.length);
        
        // Verificar si el ID es válido para MongoDB
        if (!req.params.id || req.params.id.length !== 24) {
            console.log('❌ ID inválido para MongoDB');
            return res.status(400).json({
                success: false,
                message: 'ID de ByC inválido'
            });
        }
        
        const byc = await ByC.findById(req.params.id);
        console.log('🔍 Resultado de la búsqueda:', byc);
        
        if (!byc) {
            console.log('❌ ByC no encontrado en la base de datos');
            
            // Buscar todos los ByC para debug
            const allByCs = await ByC.find({});
            console.log('🔍 Todos los ByC en la base de datos:', allByCs.map(b => ({ id: b._id, nombre: b.nombreCompleto })));
            
            return res.status(404).json({
                success: false,
                message: 'ByC no encontrado',
                debug: {
                    searchedId: req.params.id,
                    totalByCs: allByCs.length,
                    availableIds: allByCs.map(b => b._id)
                }
            });
        }
        
        console.log('✅ ByC encontrado:', byc._id, byc.nombreCompleto);
        res.json({
            success: true,
            data: byc
        });
    } catch (error) {
        console.error('❌ Error al obtener ByC por ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el ByC',
            error: error.message
        });
    }
});

// Actualizar estado de ByC
app.put('/api/byc/:id', async (req, res) => {
    try {
        console.log('🔄 Actualizando ByC:', req.params.id, 'con datos:', req.body);
        const bycActualizado = await ByC.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!bycActualizado) {
            return res.status(404).json({
                success: false,
                message: 'ByC no encontrado'
            });
        }
        console.log('✅ ByC actualizado exitosamente:', bycActualizado._id);
        res.json({
            success: true,
            message: 'ByC actualizado exitosamente',
            data: bycActualizado
        });
    } catch (error) {
        console.error('❌ Error al actualizar ByC:', error);
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el ByC',
            error: error.message
        });
    }
});

// Marcar ByC como completado
app.put('/api/byc/:id/completar', async (req, res) => {
    try {
        console.log('✅ Marcando ByC como completado:', req.params.id);
        const bycActualizado = await ByC.findByIdAndUpdate(
            req.params.id,
            { estado: 'Resuelto', fechaActualizacion: new Date() },
            { new: true, runValidators: true }
        );
        if (!bycActualizado) {
            return res.status(404).json({
                success: false,
                message: 'ByC no encontrado'
            });
        }
        console.log('✅ ByC marcado como completado:', bycActualizado._id);
        res.json({
            success: true,
            message: 'ByC marcado como completado exitosamente',
            data: bycActualizado
        });
    } catch (error) {
        console.error('❌ Error al marcar ByC como completado:', error);
        res.status(400).json({
            success: false,
            message: 'Error al marcar el ByC como completado',
            error: error.message
        });
    }
});

// Ruta de diagnóstico para verificar MongoDB
app.get('/api/debug/byc', async (req, res) => {
    try {
        console.log('🔧 Diagnóstico de MongoDB - ByC');
        
        // Verificar conexión a MongoDB
        const mongoose = require('mongoose');
        const connectionState = mongoose.connection.readyState;
        console.log('🔍 Estado de conexión MongoDB:', connectionState);
        
        // Contar todos los ByC
        const totalByCs = await ByC.countDocuments();
        console.log('📊 Total de ByC en la base de datos:', totalByCs);
        
        // Obtener todos los ByC
        const allByCs = await ByC.find({});
        console.log('📋 Todos los ByC:', allByCs.map(b => ({ 
            id: b._id, 
            nombre: b.nombreCompleto,
            estado: b.estado,
            fechaCreacion: b.fechaCreacion
        })));
        
        // Buscar el ByC específico que está fallando
        const specificByC = await ByC.findById('68eb9508fd34f9b67acc5d53');
        console.log('🔍 ByC específico encontrado:', specificByC);
        
        res.json({
            success: true,
            debug: {
                mongoConnectionState: connectionState,
                totalByCs: totalByCs,
                allByCs: allByCs.map(b => ({ 
                    id: b._id, 
                    nombre: b.nombreCompleto,
                    estado: b.estado,
                    fechaCreacion: b.fechaCreacion
                })),
                specificByCFound: specificByC ? true : false,
                specificByC: specificByC
            }
        });
    } catch (error) {
        console.error('❌ Error en diagnóstico:', error);
        res.status(500).json({
            success: false,
            message: 'Error en diagnóstico',
            error: error.message
        });
    }
});

// ==================== RUTAS PARA BOLO ====================

// Crear nuevo BOLO
app.post('/api/bolos', async (req, res) => {
    try {
        console.log('📝 Creando nuevo BOLO:', req.body);
        const nuevoBolo = new BOLO(req.body);
        const boloGuardado = await nuevoBolo.save();
        console.log('✅ BOLO creado exitosamente:', boloGuardado._id);
        res.status(201).json({
            success: true,
            message: 'BOLO creado exitosamente',
            data: boloGuardado
        });
    } catch (error) {
        console.error('❌ Error al crear BOLO:', error);
        res.status(400).json({
            success: false,
            message: 'Error al crear el BOLO',
            error: error.message
        });
    }
});

// Obtener todos los BOLOs activos
app.get('/api/bolos/activos', async (req, res) => {
    try {
        console.log('📋 Obteniendo BOLOs activos');
        const bolos = await BOLO.find({ estado: 'Activo' }).sort({ fechaCreacion: -1 });
        console.log(`✅ Encontrados ${bolos.length} BOLOs activos`);
        res.json({
            success: true,
            count: bolos.length,
            data: bolos
        });
    } catch (error) {
        console.error('❌ Error al obtener BOLOs activos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los BOLOs activos',
            error: error.message
        });
    }
});

// Obtener BOLO por ID
app.get('/api/bolos/:id', async (req, res) => {
    try {
        console.log('🔍 Obteniendo BOLO por ID:', req.params.id);
        const bolo = await BOLO.findById(req.params.id);
        
        if (!bolo) {
            console.log('❌ BOLO no encontrado');
            return res.status(404).json({
                success: false,
                message: 'BOLO no encontrado'
            });
        }
        
        console.log('✅ BOLO encontrado:', bolo._id, bolo.nombreCompleto);
        res.json({
            success: true,
            data: bolo
        });
    } catch (error) {
        console.error('❌ Error al obtener BOLO por ID:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el BOLO',
            error: error.message
        });
    }
});

// Buscar BOLOs por identificación
app.get('/api/bolos/persona/:identificacion', async (req, res) => {
    try {
        console.log('🔍 Buscando BOLOs para identificación:', req.params.identificacion);
        const bolos = await BOLO.find({ 
            identificacion: req.params.identificacion,
            estado: 'Activo'
        }).sort({ fechaCreacion: -1 });
        console.log(`📋 Encontrados ${bolos.length} BOLOs para ${req.params.identificacion}`);
        res.json({
            success: true,
            count: bolos.length,
            data: bolos
        });
    } catch (error) {
        console.error('❌ Error al buscar BOLOs:', error);
        res.status(500).json({
            success: false,
            message: 'Error al buscar BOLOs',
            error: error.message
        });
    }
});

// Actualizar BOLO
app.put('/api/bolos/:id', async (req, res) => {
    try {
        console.log('🔄 Actualizando BOLO:', req.params.id, 'con datos:', req.body);
        const boloActualizado = await BOLO.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!boloActualizado) {
            return res.status(404).json({
                success: false,
                message: 'BOLO no encontrado'
            });
        }
        console.log('✅ BOLO actualizado exitosamente:', boloActualizado._id);
        res.json({
            success: true,
            message: 'BOLO actualizado exitosamente',
            data: boloActualizado
        });
    } catch (error) {
        console.error('❌ Error al actualizar BOLO:', error);
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el BOLO',
            error: error.message
        });
    }
});

// Marcar BOLO como resuelto
app.put('/api/bolos/:id/resolver', async (req, res) => {
    try {
        console.log('✅ Marcando BOLO como resuelto:', req.params.id);
        const boloActualizado = await BOLO.findByIdAndUpdate(
            req.params.id,
            { estado: 'Resuelto', fechaActualizacion: new Date() },
            { new: true, runValidators: true }
        );
        if (!boloActualizado) {
            return res.status(404).json({
                success: false,
                message: 'BOLO no encontrado'
            });
        }
        console.log('✅ BOLO marcado como resuelto:', boloActualizado._id);
        res.json({
            success: true,
            message: 'BOLO marcado como resuelto exitosamente',
            data: boloActualizado
        });
    } catch (error) {
        console.error('❌ Error al marcar BOLO como resuelto:', error);
        res.status(400).json({
            success: false,
            message: 'Error al marcar el BOLO como resuelto',
            error: error.message
        });
    }
});

// Eliminar BOLO
app.delete('/api/bolos/:id', async (req, res) => {
    try {
        const boloEliminado = await BOLO.findByIdAndDelete(req.params.id);
        if (!boloEliminado) {
            return res.status(404).json({
                success: false,
                message: 'BOLO no encontrado'
            });
        }
        res.json({
            success: true,
            message: 'BOLO eliminado exitosamente',
            data: boloEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el BOLO',
            error: error.message
        });
    }
});

// ==================== RUTAS PARA ANOTACIONES ====================

// Crear nueva anotación
app.post('/api/anotaciones', async (req, res) => {
    try {
        const nuevaAnotacion = new Anotacion(req.body);
        const anotacionGuardada = await nuevaAnotacion.save();
        res.status(201).json({
            success: true,
            message: 'Anotación creada exitosamente',
            data: anotacionGuardada
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la anotación',
            error: error.message
        });
    }
});

// Obtener anotaciones por identificación
app.get('/api/anotaciones/persona/:identificacion', async (req, res) => {
    try {
        const anotaciones = await Anotacion.find({ identificacion: req.params.identificacion }).sort({ fechaCreacion: -1 });
        res.json({
            success: true,
            count: anotaciones.length,
            data: anotaciones
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las anotaciones',
            error: error.message
        });
    }
});

// Actualizar anotación
app.put('/api/anotaciones/:id', async (req, res) => {
    try {
        const anotacionActualizada = await Anotacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!anotacionActualizada) {
            return res.status(404).json({
                success: false,
                message: 'Anotación no encontrada'
            });
        }
        res.json({
            success: true,
            message: 'Anotación actualizada exitosamente',
            data: anotacionActualizada
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la anotación',
            error: error.message
        });
    }
});

// Eliminar anotación
app.delete('/api/anotaciones/:id', async (req, res) => {
    try {
        const anotacionEliminada = await Anotacion.findByIdAndDelete(req.params.id);
        if (!anotacionEliminada) {
            return res.status(404).json({
                success: false,
                message: 'Anotación no encontrada'
            });
        }
        res.json({
            success: true,
            message: 'Anotación eliminada exitosamente',
            data: anotacionEliminada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la anotación',
            error: error.message
        });
    }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Servidor funcionando correctamente',
        timestamp: new Date()
    });
});

//

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Base de datos: ${MONGODB_URI}`);
});
