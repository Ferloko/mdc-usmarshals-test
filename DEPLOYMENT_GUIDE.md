# 🚀 Guía de Deployment - MDC Los Santos Courts

Esta guía te muestra cómo desplegar tu aplicación en la nube **GRATIS** para que funcione sin localhost.

## 🎯 Opciones de Deployment (Todas GRATIS)

### ✅ Opción 1: Render.com (RECOMENDADO - MÁS FÁCIL)

**Ventajas:**
- ✅ 100% Gratis
- ✅ Muy fácil de configurar
- ✅ Soporta Node.js y MongoDB
- ✅ HTTPS automático
- ✅ No requiere tarjeta de crédito

**Pasos:**

#### 1. Preparar el código

Ya está todo listo. Solo necesitas subir tu código a GitHub.

#### 2. Crear cuenta en Render

1. Ve a https://render.com/
2. Haz clic en "Get Started"
3. Regístrate con GitHub (recomendado) o email

#### 3. Desplegar el Backend

1. En Render Dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Name**: `mdc-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Variables de entorno** (Environment Variables):
   - Click en "Advanced"
   - Agrega:
     - `MONGODB_URI`: Tu URI de MongoDB Atlas
     - `PORT`: 3000

5. Haz clic en **"Create Web Service"**

6. Espera 5-10 minutos. Render te dará una URL como:
   ```
   https://mdc-backend.onrender.com
   ```

#### 4. Desplegar el Frontend

**Opción A: GitHub Pages (Gratis)**

1. Sube tu código a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main`
4. Guarda

**Opción B: Netlify (Más fácil)**

1. Ve a https://netlify.com/
2. Arrastra la carpeta completa (excepto `server`)
3. Listo! Te da una URL como: `https://tu-app.netlify.app`

#### 5. Actualizar la URL del API

Edita `script.js` y cambia:

```javascript
// Antes:
const API_URL = 'http://localhost:3000/api';

// Después:
const API_URL = 'https://mdc-backend.onrender.com/api';
```

---

### ✅ Opción 2: Railway.app

**Ventajas:**
- ✅ Gratis ($5 de crédito mensual)
- ✅ Muy rápido
- ✅ Deploy automático desde GitHub

**Pasos:**

1. Ve a https://railway.app/
2. Regístrate con GitHub
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Selecciona tu repositorio
6. Railway detecta automáticamente Node.js
7. Agrega variables de entorno:
   - `MONGODB_URI`: Tu URI de MongoDB Atlas
8. Deploy automático!

URL resultante: `https://tu-app.up.railway.app`

---

### ✅ Opción 3: Vercel (Para el Backend)

**Ventajas:**
- ✅ Gratis
- ✅ Muy rápido
- ✅ Ideal para frontend

**Pasos:**

1. Instala Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. En la carpeta `server`:
   ```bash
   cd server
   vercel
   ```

3. Sigue las instrucciones
4. Te dará una URL como: `https://mdc-backend.vercel.app`

---

## 📊 Comparación de Opciones

| Servicio | Facilidad | Velocidad | Límites | Recomendado |
|----------|-----------|-----------|---------|-------------|
| **Render** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 750 hrs/mes | ✅ SÍ |
| **Railway** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $5/mes gratis | ✅ SÍ |
| **Vercel** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 100 GB/mes | Para frontend |
| **Netlify** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 100 GB/mes | Para frontend |

---

## 🗂️ Preparar para GitHub

### 1. Crear repositorio en GitHub

1. Ve a https://github.com/
2. Haz clic en "New repository"
3. Nombre: `mdc-los-santos-courts`
4. Descripción: "Sistema de gestión de fichas gubernamentales"
5. Público o Privado (tu elección)
6. Haz clic en "Create repository"

### 2. Subir tu código

En tu terminal (en la carpeta del proyecto):

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - MDC System"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/mdc-los-santos-courts.git

# Subir el código
git push -u origin main
```

---

## 🔧 Configuración de MongoDB Atlas para Producción

### 1. Whitelist de IPs

En MongoDB Atlas:

1. Ve a **Network Access**
2. Haz clic en **"Add IP Address"**
3. Selecciona **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Confirma

### 2. Obtener Connection String

1. Ve a **Database** → **Connect**
2. Selecciona **"Connect your application"**
3. Copia la URI:
   ```
   mongodb+srv://usuario:contraseña@cluster.mongodb.net/mdc_database?retryWrites=true&w=majority
   ```

---

## 📝 Checklist de Deployment

### Antes de desplegar:

- [ ] Código subido a GitHub
- [ ] MongoDB Atlas configurado
- [ ] IP whitelist configurada (0.0.0.0/0)
- [ ] Variables de entorno preparadas
- [ ] `.gitignore` incluye `.env` y `node_modules`

### Durante el deployment:

- [ ] Backend desplegado en Render/Railway
- [ ] URL del backend obtenida
- [ ] Frontend actualizado con nueva URL del API
- [ ] Frontend desplegado en Netlify/Vercel

### Después del deployment:

- [ ] Probar crear una ficha
- [ ] Probar buscar una ficha
- [ ] Verificar que se guarda en MongoDB
- [ ] Compartir URL con otros usuarios

---

## 🌐 URLs Finales

Después del deployment, tendrás:

**Backend API:**
```
https://mdc-backend.onrender.com/api
```

**Frontend:**
```
https://mdc-los-santos.netlify.app
```

**MongoDB:**
```
MongoDB Atlas (cloud)
```

---

## 🚨 Solución de Problemas

### Error: "Cannot connect to MongoDB"

**Solución:**
1. Verifica que la URI de MongoDB esté correcta
2. Verifica que tu IP esté en la whitelist
3. Verifica que la contraseña no tenga caracteres especiales

### Error: "CORS policy"

**Solución:**
En `server.js`, asegúrate de tener:
```javascript
const cors = require('cors');
app.use(cors());
```

### El backend se "duerme" después de inactividad

**Solución:**
Render.com pone a dormir las apps gratuitas después de 15 minutos de inactividad.
- Primera carga puede tardar 30 segundos
- Considera usar Railway.app si esto es un problema

---

## 💰 Costos

**TODO ES GRATIS:**

- ✅ Render.com: Gratis (750 hrs/mes)
- ✅ Railway.app: Gratis ($5 crédito/mes)
- ✅ MongoDB Atlas: Gratis (512 MB)
- ✅ Netlify: Gratis (100 GB/mes)
- ✅ Vercel: Gratis (100 GB/mes)

**Total: $0/mes** 🎉

---

## 📞 Siguiente Paso

**RECOMENDACIÓN:**

1. **Usa Render.com para el backend** (más fácil)
2. **Usa Netlify para el frontend** (arrastra y suelta)
3. **Usa MongoDB Atlas** (ya lo tienes configurado)

**Tiempo estimado:** 30 minutos

¿Necesitas ayuda con algún paso específico?
